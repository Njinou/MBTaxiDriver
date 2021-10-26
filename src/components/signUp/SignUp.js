import React,{useState,useEffect,useRef} from 'react';
import {Image,StyleSheet,View,Dimensions,useWindowDimensions,Text, ScrollView, Pressable,Keyboard,ActivityIndicator,Alert} from 'react-native';
//import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';

import textKeys from '../../keyText/textKeys';

import TaxiButton from '../common/TaxiButton'
import TaxiTextInput from '../common/TaxiTextInput'

import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import SignUpConfirmationCode from './SignUpConfirmationCode';
import database from '@react-native-firebase/database';

import TaxiText from '../common/TaxiText';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
//displayName
//photoURL
//phoneNumber
const SignUp = (props) =>{

  const phoneNumberInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const singUpButton = useRef();
  const confirmPasswordInput = useRef();

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [isportrait,setIsPortrait] = useState(windowWidth <= windowHeight);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [passwordMessage,setPasswordMessage] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [photoURL,setPhotoURL] = useState('');
  const [email,setEmail] = useState('');
  const [error,setError] = useState('');
  const [user,setUser] = useState(null);
  const [creating,setCreating] = useState(false);

  //MEDIA 
  const [uploading, setUploading] = useState(false);
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});


  const [code, setCode] = useState('');
  const [enterCode, setEnterCode] = useState(true);
  const [verificationID, setVerificationID] = useState('');
  
   getCode =(val) =>{setCode(val);console.log('code entre ici... est celui ci.....',val)};

  settingEmail =(val) =>setEmail(val);
  settingPassword =(val) =>{setPassword(val); console.log(val)}
  settingConfirmPassword =  (val) =>{
     setConfirmPassword(val);
    val !== password ? setPasswordMessage("Password different") : setPasswordMessage('')
  }
  settingUsername=(val) =>setUsername(val);
  settingPhoneNumber =(val) =>setPhoneNumber( ''+val);
  settingPhotoURL =(val) =>setPhotoURL(val);
  onSubmitEditing= ()=> Keyboard.dismiss();

  creatingAccount = () => {
    try {
      setCreating(true);
      setEnterCode(!enterCode);
      auth().verifyPhoneNumber(phoneNumber)
      .on('state_changed', (phoneAuthSnapshot) => {
        setVerificationID(phoneAuthSnapshot.verificationId)
        console.log('new snap state ',phoneAuthSnapshot.state)
        if (phoneAuthSnapshot.state == 'verified') console.log("All has been verified....")
      })
      .catch (error => console.log('error in the creating account function... ',error))

    } catch (error) {
      console.error('ERROR CAUGHT',error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
  }

  const onMediaSelect = async (media) => {
    if (!media.didCancel) {
      setUploading(true);
      storage().setMaxOperationRetryTime(10000);
      let uploadUrl = 'profile/' +media.assets[0].fileName;
      const reference = storage().ref('profile/' +media.assets[0].fileName);
      const task = reference.putFile(media.assets[0].uri);
      
      
      task.on('state_changed', (taskSnapshot) => {
        setUploadTaskSnapshot(taskSnapshot);
        if (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes ===1) setUploading(false);
      });

      task.then(async () => {
        console.log('Image uploaded to the bucket!');
        const url = await storage().ref(uploadUrl).getDownloadURL();
        setPhotoURL(url);
      })
      .catch(error => console.log('error uploading the pictures',error))

    }
  };


  const onTakePhoto = () => {launchCamera({ mediaType: 'image' }, onMediaSelect);  console.log("launching camera")}

  const onTakeVideo = () => launchCamera({ mediaType: 'video' }, onMediaSelect);

  const onSelectImagePress = () =>
  {
    launchImageLibrary({ mediaType: 'image' }, onMediaSelect); 
  }

  const onSelectVideoPress = () =>
  launchImageLibrary({ mediaType: 'video' }, onMediaSelect);



  useEffect(() => {
    Dimensions.addEventListener("change", function(ecran) {
       setIsPortrait(ecran.screen.width <=  ecran.screen.height);
     });
  }, []);

  useEffect( () => {
      setUser(auth().currentUser);
  }, []);
  


//once cliquing on signup 
//we verifiy the phone number 
//send the code and verify 
//back to sign up page .... 
// once verified create profile ... 
// on authstateChange.... loggging in.... 
  

async function confirmCode() {
  try {   
        console.log('verificationID',verificationID);
        const provider = auth.PhoneAuthProvider;
        const authCredential = provider.credential(verificationID,
        code);
    console.log("credentials in this case are ",authCredential);

    auth()
    .createUserWithEmailAndPassword(email, password)
    .then( async (user) => {
      const update = {
        displayName: username,
        photoURL: photoURL,    
      };
      auth().currentUser.updateProfile(update);
      await auth().currentUser.updatePhoneNumber(authCredential);
    })
    .then(() => {
      console.log("Updated successfully!"); 
      setCreating(false);
        database()
        .ref('/allUsers')
        .push(JSON.parse(JSON.stringify(auth().currentUser)))
        .then(snapshot => {
        console.log('Creating user : ', snapshot);
      })
      .catch(error => console.error(error))
    }) //setCreating(false);
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
     // if (error.includes('/')) setError(error.code.split('/')[1]) //TO NOT GET the first parth auth
     // if (error.code.includes('\/')) setError(error.code.split('/')[1])
     setError(error.code);
      setCreating(false);
      console.error(error);
    });
  } catch (error) {
    console.log('Invalid code.',error);
  }
}
//func={props.getCode} value={props.code}
//value={code} onChangeText={text => setCode(text)}

if (!enterCode){
return (
  <SignUpConfirmationCode func={confirmCode} code={code} getCode={getCode} navigation={props.navigation}/>
);
}

    return (
        <ScrollView style={{alignSelf:'stretch',}} contentContainerStyle={{alignItems:'center',paddingBottom:54}} >  
         <View style={{alignSelf:'stretch',alignItems:'center'}}>
       
        <Text style={{color:'red',fontSize:22,marginBottom:10,
            //fontFamily:fontKeys.MEBI,
            color:'#F2B84D',marginTop:10,
          textShadowColor: 'rgba(4,80,110,0.5)',
          textShadowOffset: {width: 1, height: 1},
          textShadowRadius: 5
        }}> {textKeys.taxiDriver} </Text>
            <Pressable onPress={onSelectImagePress}>
              {photoURL?<Image
                style={{width:150,height:150,borderRadius:75}}
                source={{
                  uri: photoURL,
                }}
            />:  <Image style={{marginBottom:32,marginTop:49}} source={imageKeys.upload} />
              }
            </Pressable>
            
            {uploading && (
              <View style={styles.uploading}>
                <ActivityIndicator size={20} color="#F2B84D"></ActivityIndicator>
                <Text style={styles.statusText}>Uploading</Text>
                <Text style={styles.statusText}>
                  {`${((uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) * 100).toFixed(2)}%`}
                </Text>
              </View>
            )}
            
            {creating && (
              <View style={{marginTop:10}}>
                <ActivityIndicator size={30} style={{marginTop:5}} color="#F2B84D"></ActivityIndicator>
                <TaxiText text='Creating Account' styleText={{marginBottom:5,fontSize:15,fontWeight:'normal'}}/>
              </View>
            )}

            <TaxiText text={error} styleText={{marginBottom:5,fontSize:18,color:'red',fontWeight:'normal'}}/>

            <TaxiTextInput returnKeyType="next" placeholder={textKeys.fullName} func={settingUsername} value={username}  onSubmitEditing={() => {phoneNumberInput.current.focus(); }}/>
            <TaxiTextInput returnKeyType="next" placeholder={textKeys.phoneNumber} func={settingPhoneNumber} value={phoneNumber} keyboardType='phone-pad' ref={phoneNumberInput} onSubmitEditing={() => {emailInput.current.focus(); }} />
            <TaxiTextInput returnKeyType="next" placeholder={textKeys.email} func={settingEmail} value={email} keyboardType='email-address'  ref={emailInput} onSubmitEditing={() => {passwordInput.current.focus();}}/>
            <TaxiTextInput returnKeyType="next" placeholder={textKeys.password} func={settingPassword} value={password} secureTextEntry={true}  blurOnSubmit={false}  ref={passwordInput} onSubmitEditing={() => {confirmPasswordInput.current.focus()}} />
            <TaxiText text={passwordMessage} styleText={{marginBottom:5,fontSize:16,color:'red',fontWeight:'normal'}}/>
            <TaxiTextInput returnKeyType="next" placeholder={textKeys.signup.confirmPassword} func={settingConfirmPassword} value={confirmPassword} secureTextEntry={true} blurOnSubmit={false} onSubmitEditing={() => {Keyboard.dismiss();}} ref={confirmPasswordInput}/>
            <TaxiButton  text={textKeys.create} func={creatingAccount} disabled={!(confirmPassword === password &&  username && photoURL  && password && confirmPassword && phoneNumber  && email)}/>
       </View>
        </ScrollView>       
    )
}
export default SignUp;

const styles = StyleSheet.create({
    container:{ 
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
    },
    text:{
        color:'#F2B84D',
        fontSize:12,
        //fontFamily:fontKeys.MSB
    },
    center: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
    },
    uploading: {
      marginTop: -30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusText: {
     // marginTop: 20,
      fontSize: 20,
    },

});
