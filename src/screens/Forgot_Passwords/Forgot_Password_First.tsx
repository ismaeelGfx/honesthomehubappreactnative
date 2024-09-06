
import React from 'react';
import {Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, View,TouchableOpacity, ToastAndroid} from 'react-native';
import HorizontalLineWithText from './Horizontal_Line';
import { baseurl } from '../../BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const Forgot_Password_First = ({ navigation ,setUserIsAuthenticated}: any) => {
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
    navigation.navigate('Signup');
  };




  const Send_Otp_Mail = async () => {
    const requestData = {
         
       email: email.toLowerCase(),

       
        
         
        

        
    };
    AsyncStorage.setItem('forgot_email', email);

    console.log(requestData,"REQ")

    try {
        const response = await fetch(`${baseurl}/reset-password-req`, {
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
              text1:'Otp Sent to your Email.'
            })

            
            navigation.navigate('Otp_Screen');

           
          
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
        Forgot Password
         </Text>
         <Text style={{color:'white',fontSize:12,fontWeight:'bold',paddingTop:15,paddingLeft:10
            ,paddingRight:10,textAlign:"center"
         }}>
         The Verification Email will be sent to the mailbox. Please check it!
        </Text>

        <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder='Enter your Email Address'
        placeholderTextColor="white"
      />
      {/* <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Enter Your Password"
        placeholderTextColor="white"
        secureTextEntry={true}
      /> */}

<View style={{ flexDirection: 'row', justifyContent: 'flex-start',width:300 }}>
  {/* <Text style={{ color: 'white',fontWeight:'bold' }}>Forgot Password?</Text> */}
</View>



<TouchableOpacity style={styles.button  }  onPress={Send_Otp_Mail}>
<Text style={styles.buttonText}>Send Email</Text>
</TouchableOpacity>

 





 
 


   

   


 
      

      
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
         
            position:'relative'
          },
          logo: {
                    width: 250, // Adjust the image width to be 80% of the parent container
                    height: 80, 
                    // aspectRatio: 1, 
                    resizeMode: "contain",
                    // bottom:0,
                    alignItems:'center',
                    marginBottom:50
                   
                    
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

export default Forgot_Password_First;

