import * as React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
   withSpring, 
   withDelay,
   interpolateColor,
   useAnimatedProps,
   interpolate, 
   runOnJS,
   runOnUI
} from "react-native-reanimated";
import { Circle,Svg,G } from "react-native-svg";
//import { COLOR } from "../consts";
import { StyleSheet, TextInput,View,Text,Dimensions, ImageBackground } from "react-native";
import { PanGestureHandler } from 'react-native-gesture-handler';
import imageKeys  from "./src/keyText/imageKeys"; //background
import { useEffect } from "react/cjs/react.development";
const HANDLE_WIDTH = 20;

export const clamp = (x, min, max) => {
    "worklet";
    if (x < min) return min;
    if (x > max) return max;
    return x;
  };

  export const AcceptRides = (x,fonct) => {
    "worklet";
    if (x < 0.50) fonct(false);
    if (x > 0.50) fonct(true);
  };

/**
 * Custom slider control that uses gesture handlers
 */

 const AnimatedCircle = Animated.createAnimatedComponent(Circle);
 const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const TextProgres = ({
    progress,
   sliderWidth,
  radius = 150,
  strokeWidth = 10,
  func
}) =>{
      // Derived values



  const CIRCUMFERENCE = 2 * Math.PI * radius;
  const HALF_WIDTH = radius + strokeWidth;
  
    const animatedInputProps = useAnimatedProps(() => {
        // Determine the percent complete.
        const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
        
        AcceptRides(percentComplete,func);
       /* const someWorklet = (greeting) => {
           // 'worklet';
            console.log(greeting, 'From the UI thread');
            if (percentComplete <0.50) func(false);
        }
    
        runOnJS(someWorklet)('Howdy');*/

        if (percentComplete <0.50) func(false);
       
        return {
          // The text value
          text: `${Math.round(100 * percentComplete)}`,
          // The color of the text.
          color: interpolateColor(
            percentComplete,
            [0, 0.5, 1],
            ['red', 'yellow', "green"],
          ),
        };
      });

      const animatedProgressProps = useAnimatedProps(() => {
        const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
        return {
          strokeDashoffset: (1 - percentComplete) * CIRCUMFERENCE,
        };
      });
      const animatedBgProps = useAnimatedProps(() => {
        const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
        return {
          fillOpacity: interpolate(percentComplete, [0, 1], [0.2, 0.75]),
        };
      });

       return (
        <View>
          <View style={{ width: radius * 2, height: radius * 2,marginTop:50 }}>

          <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`${-HALF_WIDTH} ${-HALF_WIDTH} ${2 * HALF_WIDTH} ${
            2 * HALF_WIDTH
          }`}
        >
          <G rotation="-90">
            {/* Progress */}
            <AnimatedCircle
              cx={0}
              cy={0}
              r={radius}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              animatedProps={animatedProgressProps}
              stroke={'#A3A1A1'}
            />
            
            <AnimatedCircle
              cx={0}
              cy={0}
              r={radius}
              stroke="rgb(180,180,180)"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeOpacity="0.1"
              animatedProps={animatedBgProps}
              fill={'#F2B84D'}//'#222222'
            />
          </G>
        </Svg>

            <AnimatedInput
              editable={false}
              defaultValue="0"
              style={[
                StyleSheet.absoluteFill,
                {
                  fontSize: radius / 2,
                  fontWeight: "500",
                  textAlign: "center",
                  textShadowColor: "black",
                  textShadowOffset: { width: 2, height: 2 },
                  textShadowRadius: 4,
                },
              ]}
              animatedProps={animatedInputProps}
            />
          </View>
        </View>
      );
    };

 const CircularProgress = (props) => {
  // Shared values
  const sliderWidth = useSharedValue(0);
  const progress = useSharedValue((Dimensions.get("window").width)/2);
  const [showText, setShowText] = React.useState(true);

  React.useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  /**
   * Animated style for handle, translated based on progress.
   */
  const animatedHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value - HANDLE_WIDTH / 2 }],
    };
  });

  /*
  <
  PanGestureHandlerGestureEvent,
  { startProgress: number }
>
  */
  const panGestureHandler = useAnimatedGestureHandler({
  // On start, make note of the progress value at start of gesture.
  onStart: (_, ctx) => {
    ctx.startProgress = progress.value;
  },
  // On pan, new progress is the starting progress plus change in position
  onActive: (event, ctx) => {
    progress.value = ctx.startProgress + event.translationX;
  },
  // On pan-end, snap back to 0 or sliderWidth if out of bounds.
  onEnd: () => {
    if (progress.value > sliderWidth.value) {
      progress.value = withSpring(sliderWidth.value);
    } else if (progress.value < 0) {
      progress.value = withSpring(0);
    }
  },
});

  
  // For illustrative purposes, we'll update progress on an interval.





  return (
   <View
      style={{
        flex: 1,
        backgroundColor: "#222222",
        justifyContent: "flex-end",
        borderRadius: 10,
      }}
      onLayout={(e) => {
        sliderWidth.value = e.nativeEvent.layout.width;
      }}
    >
    
    <ImageBackground source={imageKeys.background} resizeMode="cover" style={styles.image}> 
        <View style={[{flex:1,alignItems:'center',}, {display: showText ? 'none' : 'flex'}]}>
            <TextProgres progress={progress}  sliderWidth={sliderWidth} func={props.func}/>   
        </View>
    </ImageBackground>
    <View style={{height:'5%',marginBottom:100,backgroundColor:'#F2B84D'}}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View
            style={[
            {
                width: HANDLE_WIDTH,
                backgroundColor: '#3F4D5F',
                borderRadius: 10,
                position: "absolute",
                bottom: -20,
                top: -20,
            },
            animatedHandleStyle,
            ]}
        />
        </PanGestureHandler>
        
      </View>
      
    </View>
    
  );};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
    flex: 1,
      //justifyContent: "center",backgroundColor:'red'
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });

export default CircularProgress;