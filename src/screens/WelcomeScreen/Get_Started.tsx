// import React from "react";
// import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";


// const Get_Started: React.FC = ({ navigation }: any) => {
//   const windowHeight = Dimensions.get('window').height; // Get the height of the window

//   // Function to handle navigation to the Splash_Screen
//   const goToSplashScreen = () => {
//     navigation.navigate('Signup');
//   };

//   return (

//     <View style={{backgroundColor:"#DC4747"}}> 

//     <SafeAreaView>
//          <View style={[styles.container, { height: windowHeight }]}>
//       <View  style={{zIndex:1,marginTop:10,backgroundColor:'#DC4747'}} > 
//         <Image
//           source={require('../../assets/images/yellowboy.png')}
//           style={styles.logo}
//         />
//       </View>

//       <View style={[styles.container2,{ height: windowHeight * 0.2 }]}>

//             <View style={[styles.text_container]}>

//             <Text style={styles.text1}>
//             Home Services: The Way They Should Be
//             </Text>

//             <Text style={[{color:'white',marginTop:20}]}>
//            Take One Picture, Write One Sentence, Get The Best Price and Best Quality Home Service.
//             </Text>

//             {/* <Image
//           source={require('../../assets/images/Group2.png')}
//            style={{marginTop:20}}
//         /> */}

//           <View style={{flexDirection:'row',gap:10,marginTop:20}}>
//             <View style={{
//               width:55,
//               height:8,
//               backgroundColor:"#B22235",
//               borderRadius:20
              
//               }}>

//             </View>

//             <View style={{flexDirection:'row',gap:5}}>
//             <View style={{
//               width:8,
//               height:8,
//               backgroundColor:"#D9D9D9",
//               borderRadius:20
              
//               }}>

//             </View>
//             <View style={{
//               width:8,
//               height:8,
//               backgroundColor:"#D9D9D9",
//               borderRadius:20
              
//               }}>

//             </View>
//             </View>
//           </View>


//          <TouchableOpacity style={styles.button} onPress={goToSplashScreen}>
//           <Text style={styles.buttonText}>Get Started</Text>
//         </TouchableOpacity>

//             </View>

       
//       </View>
//     </View>
//     </SafeAreaView>

//     </View>
   
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#DC4747',
//     justifyContent: "center",
//     alignItems: "center",
 
//     position:'relative'
//   },
//   logo: {
//     width: '90%', // Adjust the image width to be 80% of the parent container
//     height: undefined, 
//     aspectRatio: 1, 
//     resizeMode: "cover",
//     // marginRight:130,
   
    
//   },
//   button: {
//     width: '80%', // Make the button width 80% of the parent container
//     padding: 13,
//     backgroundColor: "#B22235",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10, // Increase the margin for better spacing
    
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   container2: {
//     backgroundColor: '#13171B',
//     width: '100%', // Make the container width 80% of the parent container
//     alignItems: 'center', // Center the contents horizontally
    
//     // paddingVertical: 20, 
//     borderTopLeftRadius:50 , // Add border radius for better appearance,
//     borderTopRightRadius:50,
//     flex:1,
//     flexDirection:'column',
//     // justifyContent:'center'
    
    
//   },
//   text1:{
//     color:'white',
//     textAlign:'center',
//     fontSize:25,
//     fontStyle:'normal',
//     fontWeight:'bold'
//   }
//   ,
//   text_container:{
  
//     width:289,
//     // flex:1,
//     justifyContent:'center',
//     alignItems:'center',
//     // backgroundColor:'red',

//     paddingTop:"18%"
    

   


//   }
// });

// export default Get_Started;












import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

const Get_Started: React.FC = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const leftLineAnim = useRef(new Animated.Value(0)).current;
  const rightLineAnim = useRef(new Animated.Value(0)).current;
  const lineOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start the animation when the component mounts
    Animated.parallel([
      Animated.timing(leftLineAnim, {
        toValue: -width / 2, // Move left line to the left
        duration: 1400,
        useNativeDriver: true,
      }),
      Animated.timing(rightLineAnim, {
        toValue: width / 2, // Move right line to the right
        duration: 1400,
        useNativeDriver: true,
      }),
      Animated.timing(lineOpacity, {
        toValue: 0, // Gradually decrease opacity to 0
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimationFinished(true); // Reveal the content after the animation finishes
    });
  }, [leftLineAnim, rightLineAnim, lineOpacity]);

  return (
    <View style={styles.container}>
      {/* Render lines during the animation */}
      <Animated.View
        style={[
          styles.line,
          { transform: [{ translateX: leftLineAnim }], opacity: lineOpacity },
        ]}
      />

      <Animated.View
        style={[
          styles.line,
          { transform: [{ translateX: rightLineAnim }], opacity: lineOpacity },
        ]}
      />

      {/* Content to be revealed after animation */}
      {animationFinished && (
        <View style={styles.content}>
          <View style={{ width: 500, height: 900, backgroundColor: 'green' }} />
          <Text style={{ color: 'yellow' }}>TS</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Background color before the lines move
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 10, // Width of the transparent line
    backgroundColor: 'rgba(255, 255, 255, 1)', // Start with full opacity
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Get_Started;
