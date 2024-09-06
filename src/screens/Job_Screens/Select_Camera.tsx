import React from "react";
import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Total_Jobs from "./Total_Jobs";


const Select_Camera = ({ navigation }: any)=>{
  const windowHeight = Dimensions.get('window').height; // Get the height of the window

  

  // Function to handle navigation to the Splash_Screen
  const goToSplashScreen = () => {
    navigation.navigate('Create_Job_Post');
    // navigation.navigate('Direct_Gallery');

    // navigation.navigate('Camera_Stack', { screen: 'Create_Job_Post' });


  };


  const goToSplashScreen1 = () => {

    navigation.navigate('Direct_Camera');

    console.log("Direct Camera")

    // navigation.navigate('Camera', { screen: 'Direct_Camera' });
  };

  const gotoGallery = () => {

    navigation.navigate('Direct_Gallery');

    console.log("Direct_Gallery")

    // navigation.navigate('Camera', { screen: 'Direct_Camera' });
  };

  return (

    <View style={{backgroundColor:'#13171B'}}>

    <SafeAreaView>
         <View style={[styles.container, { height: windowHeight }]}>


 
 
       
 
        <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',gap:25,width:"90%",marginTop:"50%"}}>

        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}  >
            
            </TouchableOpacity> 

        <View style={{flexDirection:"row",gap:10}}>

        <TouchableOpacity onPress={goToSplashScreen1} style={{

          width:100,
          height:100,
          borderColor:'#B22235',

          borderWidth:2,
          borderRadius:50,
          justifyContent:'center',
          alignItems:'center'

        }}>
            <Image
            source={require("../../assets/images/newcamerablue.png")}
            style={{height:50,width:50}}
            
            
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoGallery} style={{

width:100,
height:100,
borderColor:'#860A0D',

borderWidth:2,
borderRadius:50,
justifyContent:'center',
alignItems:'center'

}}>
  <Image
  source={require("../../assets/images/redgalleryicon.png")}
  style={{height:50,width:50}}
  
  
  />
</TouchableOpacity>
        </View>

<View style={{
  justifyContent:'center',
  alignItems:'center'
}}>

        <Text style={{color:'#B2BEB5',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:'bold'}}>

       Take A Image
            </Text>

        <Text style={{
          color: '#A9A9A9',
          textAlign: 'center',
          fontFamily: 'Urbanist',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 18, // Example value
          textTransform: 'capitalize'
        }}>

        Press on camera icon to take a picture of your home service problem
        </Text>
</View>

<Text style={{color:'#B2BEB5',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:'bold'
            }}>

       OR
            </Text>


        <TouchableOpacity style={{justifyContent:'center',
        alignItems:'center',
          backgroundColor:'#B22235',
          width:250,
          height:40,
          borderRadius:10




        }} onPress={goToSplashScreen}>
            <Text style={{color:'white',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:'600',
          
            }}>

       Post Your Job Without a Photo
            </Text>
            </TouchableOpacity>   

        </View>


    </View>
    </SafeAreaView>
    </View>
   
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#13171B',
    // justifyContent: "center",
    alignItems: "center",
 
    position:'relative'
  },
  logo: {
    width: '90%', // Adjust the image width to be 80% of the parent container
    height: undefined, 
    aspectRatio: 1, 
    resizeMode: "contain",
    // marginRight:130,
    
    
   
    
  },
  button: {
    width: '80%', // Make the button width 80% of the parent container
    padding: 13,
    backgroundColor: "#B22235",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Increase the margin for better spacing
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container2: {
    backgroundColor: '#13171B',
    width: '100%', // Make the container width 80% of the parent container
    alignItems: 'center', // Center the contents horizontally
    
    paddingVertical: 20, // Add vertical padding for better spacing
    borderTopLeftRadius:50 , // Add border radius for better appearance,
    borderTopRightRadius:50,
    flex:1,
    flexDirection:'column',
    justifyContent:'center'
    
    
  },
  text1:{
    color:'white',
    textAlign:'center',
    fontSize:25,
    fontStyle:'normal',
    fontWeight:'bold'
  }
  ,
  text_container:{
  
    width:289,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
   


  }
});

export default Select_Camera;
