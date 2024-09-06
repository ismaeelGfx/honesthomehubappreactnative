
import React from 'react';
import {Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, View,TouchableOpacity, ToastAndroid} from 'react-native';
import HorizontalLineWithText from './Horizontal_Line';
import { baseurl } from '../../BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const Login = ({ navigation ,setUserIsAuthenticated}: any) => {
    const windowHeight = Dimensions.get('window').height;
    const { width, height } = Dimensions.get('window');
    
    const [email, onChangeEmail] = React.useState('');
    
    const [password, onChangePassword] = React.useState('');

  const goTo = () => {
    navigation.navigate('Total_Jobs');
  };

  const Signup = () => {
    navigation.navigate('Signup');
  };


  const forgot_password = () => {
    navigation.navigate('Forgot_Password_First');
  };




  const handleSignUp = async () => {
    const requestData = {
         
       email: email.toLowerCase(),
        
        password,
        

        
    };

    console.log(requestData,"REQ")

    try {
        const response = await fetch(`${baseurl}/login-customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success Login:', data);

            Toast.show({
              type:'success',
              text1:'Login Successfully'
            })

            // await AsyncStorage.removeItem('userId');
            AsyncStorage.setItem('userId', data.data.user_id);

            AsyncStorage.setItem('Address', data.data.address);
            // AsyncStorage.setItem('ZipCode', data.data.zipcode.toString());

            const userId = await AsyncStorage.getItem('userId');

            setUserIsAuthenticated(true);

            console.log(userId,"ASYNC STORAGE")

           
          
        } else {
            console.error('Error TS:', response.statusText);

            Toast.show({
              type:'error',
              text1:'Incorrect Email or Password.'
            })
        }
    } catch (error) {
        console.error('Error:', error);
        
    }
};








  return (

    <View style={[styles.container, { height: windowHeight }]}>

    <SafeAreaView>

       

<View >

<View style={{justifyContent:'center',alignItems:"center"}}>

<Image
        source={require('../../assets/images/logo.png')} // Replace 'path_to_your_logo.png' with the actual path to your logo image
        style={styles.logo}
      />
</View>

<View style={{flex:1,alignItems:'center'}}>

       <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>
        Welcome Back
         </Text>
         <Text style={{color:'white',fontSize:12,fontWeight:'bold',paddingTop:15}}>
         Start Your Home Service Solution Today
        </Text>

        <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder='Email Address'
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Enter Your Password"
        placeholderTextColor="white"
        secureTextEntry={true}
      />

<View style={{ flexDirection: 'row', justifyContent: 'flex-start',width:300 }}>
  {/* <Text style={{ color: 'white',fontWeight:'bold' }}>Forgot Password?</Text> */}
</View>



<TouchableOpacity style={styles.button  }  onPress={handleSignUp}>
<Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>

<View>
  <TouchableOpacity onPress={forgot_password}>

 
    <Text style={{color:'#B22235',fontSize:16,fontWeight:"bold" , paddingTop:10}}>
    Forgot your password?
    </Text>
    </TouchableOpacity>
</View>





<View>
<Text style={{color:'white',fontSize:18,fontWeight:"600" , paddingTop:30}}>
    OR
</Text>

</View>

<View>
  <TouchableOpacity onPress={Signup}>

 
    <Text style={{color:'#B22235',fontSize:16,fontWeight:"bold" , paddingTop:10}}>
    New to Honest Home Hub? Sign Up
    </Text>
    </TouchableOpacity>
</View>


   

   


 
      

      
        </View>





    

    </View>

      
    </SafeAreaView>
    </View>
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
         
            position:'relative',
            
          },
          logo: {
                    width: 200, // Adjust the image width to be 80% of the parent container
                    height: 80, 
                    // aspectRatio: 1, 
                    resizeMode: "contain",
                    // bottom:0,
                    alignItems:'center',
                    marginBottom:50,
                    marginTop:20
                   
                    
                  },
       

                  button: {
                    
                    backgroundColor: '#B22235',
                    borderRadius:5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width:320,
                    height:50,
                    marginTop:20
                  },
                
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;

