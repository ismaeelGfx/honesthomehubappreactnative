

import React from 'react';
import {Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, View,TouchableOpacity,ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import HorizontalLineWithText from './Horizontal_Line';
import { baseurl } from '../../BaseUrl';
import Toast from 'react-native-toast-message';



const Signup = ({ navigation }: any) => {
    const windowHeight = Dimensions.get('window').height;
    const { width, height } = Dimensions.get('window');
    const paddingBottom = windowHeight * 0.09;

  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [Home_Address, onChangeHome_Address] = React.useState('');
  const [reenterpassword, onChangeReenterPassword] = React.useState('');
  const [confirm_password, onChangeConfirmPassword] = React.useState('');
  

  const goTo = () => {
    navigation.navigate('Login');
  };


  const goToBottomNavScreen = () => {
    navigation.navigate('StackScreens'); // Navigate to the screen containing the bottom tab navigator
    navigation.navigate('Home'); // Navigate to the desired screen within the bottom tab navigator
  };


  const handleSignUp = async () => {


    if(password===confirm_password)
      {


        
        
            const requestData = {
                type:'customer',
                email:email.toLowerCase(),
                
                password,
                zipCode:reenterpassword,
                Home_Address,
                Name:name
        
                
            };
        
            console.log(requestData,"REQ")
        
            try {
                const response = await fetch(`${baseurl}/create-customer`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('Success:', data);
        
                    Toast.show({
                      type:'success',
                      text1:'Sign up Successfully'
                    })
                    goTo();
                } else {
                    console.error('Error TS11:', response.statusText);
                    Toast.show({
                      type:'error',
                      text1:'Please Enter All Required Fields.'
                    })
                }
            } catch (error) {
                console.error('Error:', error);
        
                Toast.show({
                  type:'error',
                  text1:'An error occured, Please try again later.'
                })
            }

      }

      else{

        Toast.show({
          type:'error',
          text1:'Incorrect Password'
        })
      }


};
  



  return (

    <KeyboardAvoidingView
      style={[styles.container, { height: windowHeight }]}
      behavior='padding'
    
    >
    <SafeAreaView>

       

<View >

<View style={{justifyContent:'center',alignItems:"center"}}>

<Image
        source={require('../../assets/images/logo.png')} // Replace 'path_to_your_logo.png' with the actual path to your logo image
        style={styles.logo}
      />
</View>


    <ScrollView>
    <View style={{flex:1,alignItems:'center'}}>

       <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>
       Create new Account
         </Text>
         <Text style={{color:'white',fontSize:12,fontWeight:'bold',paddingTop:15,
          paddingLeft:30,paddingRight:30
         }}>
         Set up your username and password! You can change it later.

        </Text>

        

       
        <View  style={[styles.scroll_container,{paddingBottom}]}>


        <KeyboardAvoidingView>

        <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder='Enter Name'
        placeholderTextColor="white"
      />

</KeyboardAvoidingView>


<KeyboardAvoidingView>





      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Enter Email"
        placeholderTextColor="white"
      />

</KeyboardAvoidingView>


<KeyboardAvoidingView>
<TextInput
        style={styles.input}
        onChangeText={onChangePhone}
        value={phone}
        placeholder="Mobile Number"
        placeholderTextColor="white"
      />

</KeyboardAvoidingView>


{/* <KeyboardAvoidingView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeReenterPassword}
        value={reenterpassword}
        placeholder="Zip Code"
        placeholderTextColor="white"
      />


</KeyboardAvoidingView> */}


{/* <KeyboardAvoidingView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeHome_Address}
        value={Home_Address}
        placeholder="Home Address"
        placeholderTextColor="white"
      />

</KeyboardAvoidingView> */}
<KeyboardAvoidingView >
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry={true}
      />

</KeyboardAvoidingView>



 <KeyboardAvoidingView >

<TextInput
        style={styles.input}
        onChangeText={onChangeConfirmPassword}
        value={confirm_password}
        placeholder=" Confirm Password"
        placeholderTextColor="white"
        secureTextEntry={true}
      />
 </KeyboardAvoidingView>

<TouchableOpacity style={styles.button  }  onPress={handleSignUp}>
<Text style={styles.buttonText}>Sign Up</Text>
</TouchableOpacity>


    <View style={{paddingTop:15}}>
      <TouchableOpacity onPress={goTo}>
      <Text style={{color:'#B22235',fontSize:18}}>
Already have an account? Login
</Text>
      </TouchableOpacity>
    
    </View>



</View>












   


 
      

      
        </View>

    </ScrollView>

       





    

    </View>

   
      
    </SafeAreaView>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 62,
    width:335,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'#4D4D4D',
    color:'white',
    borderRadius:15
    
  },

  container: {
            backgroundColor: '#13171B',
           
            alignItems: "center",
         
            position:'relative'
          },
          logo: {
                    width: 200, // Adjust the image width to be 80% of the parent container
                    height: 80, 
                    // aspectRatio: 1, 
                    resizeMode: "contain",
                    // bottom:0,
                    marginTop:20
                   
                    
                  },
       

                  button: {
                    
                    backgroundColor: '#B22235',
                    borderRadius:5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width:320,
                    height:50,
                    
                  },
                
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },


  scroll_container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    
    
    

  }


});

export default Signup;