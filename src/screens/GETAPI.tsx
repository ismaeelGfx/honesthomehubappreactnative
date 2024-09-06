
import React, { useEffect, useState } from 'react';
import {Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import HorizontalLineWithText from './Horizontal_Line';


const GETAPI = ({ navigation }: any) => {
    const windowHeight = Dimensions.get('window').height;
    const { width, height } = Dimensions.get('window');
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  const goTo = () => {
    navigation.navigate('Total_Jobs');
  };

  const Signup = () => {
    navigation.navigate('GetApi');
  };
  const [data, setData] = useState([]);

  const fetchEmails = async () => {
    try {
      

      const response = await fetch('https://alex-email-backend-nazar-production.up.railway.app/get-emails');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log('Response:', responseData);
      setData(responseData);
    } catch (error) {
      console.error('Network Error:', error);
    }
  };


  useEffect(() => {
    fetchEmails();
  }, []);




  return (
    <SafeAreaView>

<View style={[styles.container, { height: windowHeight }]}>

 <View>

    {
        data.map((e,i)=>(

            <>
          
            <Text key={i}>
                {
                    e.subject
                }

            </Text>
         <Text>
            {
                e.request_id
            }
         </Text>

</>

        ))
    }

 </View>

<View style={{flex:1,alignItems:'center'}}>

       <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>
        Welcome Back
         </Text>
         <Text style={{color:'white',fontSize:12,fontWeight:'bold',paddingTop:15}}>
         Resume Your Journey , Login to resolve the home Solutions
        </Text>

        <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder='Email Address'
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Your Password"
        placeholderTextColor="white"
      />

<View style={{ flexDirection: 'row', justifyContent: 'flex-start',width:300 }}>
  <Text style={{ color: 'white',fontWeight:'bold' }}>Forgot Password?</Text>
</View>



<TouchableOpacity style={styles.button  }  onPress={goTo}>
<Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>


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
                    height: 150, 
                    // aspectRatio: 1, 
                    resizeMode: "contain",
                    // bottom:0,
                   
                    
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

export default GETAPI;

