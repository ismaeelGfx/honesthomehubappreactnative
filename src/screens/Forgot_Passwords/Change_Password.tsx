
import React from 'react';
import {Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, View,TouchableOpacity, ToastAndroid} from 'react-native';
 
import { baseurl } from '../../BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const Change_Password = ({ navigation ,setUserIsAuthenticated}: any) => {
    const windowHeight = Dimensions.get('window').height;
    const { width, height } = Dimensions.get('window');
    
    const [confirmpassword, onchangeconfirmpassword] = React.useState('');
    
    const [password, onChangePassword] = React.useState('');
 


    
        const handleSignUp = async () => {

            if(password===confirmpassword)
                {

                    const email = await AsyncStorage.getItem('forgot_email');
                    const otp = await AsyncStorage.getItem('otp');
                    const requestData = {
                        email:email?.toLowerCase(),
                        otp:otp,
                        newPassword:password,
                        confirmPassword:password
                       
                        
                
                        
                    };
                
                    console.log(requestData,"REQ")
                
                    try {
                        const response = await fetch(`${baseurl}/reset-password-create`, {
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
                              text1:'Password Changed Successfully.'
                            })

                            navigation.navigate("Login")

                            await AsyncStorage.removeItem('forgot_email');
                            await AsyncStorage.removeItem('otp');
                            
                
                             
                
                           
                          
                        } else {
                            console.error('Error TS:', response.statusText);
                
                            
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        
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
        Reset Password
         </Text>
         <Text style={{color:'white',fontSize:12,fontWeight:'bold',paddingTop:15}}>
         Start Your Home Service Solution Today
        </Text>

        <TextInput
        style={styles.input}
        onChangeText={onchangeconfirmpassword}
        value={confirmpassword}
        placeholder='New Password'
        placeholderTextColor="white"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Confirm Password"
        placeholderTextColor="white"
        secureTextEntry={true}
      />

<View style={{ flexDirection: 'row', justifyContent: 'flex-start',width:300 }}>
  {/* <Text style={{ color: 'white',fontWeight:'bold' }}>Forgot Password?</Text> */}
</View>



<TouchableOpacity style={styles.button  }  onPress={handleSignUp}>
<Text style={styles.buttonText}>Reset Password</Text>
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
                    marginBottom:20
                   
                    
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

export default Change_Password;

