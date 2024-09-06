import React, { useState } from 'react';
import { Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { baseurl } from '../../BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { OtpInput } from "react-native-otp-entry";

const Otp_Screen = ({ navigation, setUserIsAuthenticated }) => {
  const windowHeight = Dimensions.get('window').height;

  const [email, onChangeEmail] = useState('');
  const [otp, setOtp] = useState('');

  const goTo = () => {
    navigation.navigate('Total_Jobs');
  };

  const Signup = () => {
    navigation.navigate('Signup');
  };

  const forgot_password = () => {
    navigation.navigate('Otp_Screen');
  };

  const Send_Otp_Mail = async () => {

    const email = await AsyncStorage.getItem('forgot_email');
    const requestData = {
      email: email?.toLowerCase
      (),
      otp:otp

    };

    console.log(requestData, "REQ");

    try {
      const response = await fetch(`${baseurl}/reset-password-otp-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success Login:', data);

        if(data.success===true)
            {
                console.log("TRUE")
                navigation.navigate("Change_Password")

                AsyncStorage.setItem('otp', data.data.otp);
            }

        
      } else {
        console.error('Error OTp:', response);

        Toast.show({
          type: 'error',
          text1: 'Incorrect OTP.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const Verify_Otp = async () => {
    // Implement OTP verification logic here
    if (otp.length === 4) {
      // Call your API to verify the OTP
      console.log(`Verifying OTP: ${otp}`);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please enter the 4-digit OTP.',
      });
    }
  };

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <SafeAreaView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            The Verification Email will be sent to the mailbox. Please check it!
          </Text>

<View style={{justifyContent:'center',alignItems:"center",padding:20}}>

<OtpInput
  numberOfDigits={4}
  focusColor="#B22235"
  focusStickBlinkingDuration={500}
  onTextChange={(text) => setOtp(text)}
  onFilled={(text) => console.log(`OTP is ${text}`)}
  theme={{
   containerStyle: styles.container1,
   inputsContainerStyle: styles.inputsContainer,
   pinCodeContainerStyle: styles.pinCodeContainer,
   pinCodeTextStyle: styles.pinCodeText,
//    focusStickStyle: styles.focusStick,
//    focusedPinCodeContainerStyle: styles.activePinCodeContainer
  }}
/>
</View>

         

          <TouchableOpacity style={styles.button} onPress={Send_Otp_Mail}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#13171B',
    alignItems: 'center',
  },
  pinCodeText:{
    color:"white",
     
  }
  ,
  logo: {
    width: 250,
    height: 80,
    resizeMode: 'contain',
    alignItems: 'center',
    marginBottom:20
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  otpContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor:'red'
  },
  otpInputs: {
    width: '100%',
    height: 60,
    backgroundColor:"yellow",
    flexDirection:'row'
  },
  button: {
    backgroundColor: '#B22235',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  pinCodeContainer:{
    // backgroundColor:'green',
    borderRadius:5

  },
  inputsContainer:{
    width:100,
    // backgroundColor:'red',
    gap:10
  },
  container1:{
    // backgroundColor:'pink',
    width:"60%",
    justifyContent:"center"
  }
});

export default Otp_Screen;
