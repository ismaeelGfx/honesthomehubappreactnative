import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';


export const PopupModal = ({ isVisible, closeModal ,coupon_code,content,show,redeem_points}:any) => {
   
  const copyToClipboard = (e:any) => {
    const textToCopy = e;
    Clipboard.setString(textToCopy);
    console.log(e)
    Toast.show({
      type: 'success',
      text1: 'Code Copied',
    });
  };
  
  
  
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>
       
            </Text>
            <Text style={styles.modalText}>{content}</Text>
            <View style={{
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
              gap:10,
             
            }}>
<TouchableOpacity >

            <Text style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color:'white',
                  fontWeight:'bold',
                  paddingTop:5
            }}>
            {coupon_code}
            </Text>
            
</TouchableOpacity>

{!show&&
<TouchableOpacity
style={{
  backgroundColor:'#B22235',
  height:25,
  width:'auto',
  borderRadius:10,
  padding:5,
  alignItems:'center',
  justifyContent:'center'
}}
onPress={()=>copyToClipboard(coupon_code)}
>
  <Text style={{
    fontSize:12,
    color:'white',
    alignItems:'center'
  }}>
    copy code
  </Text>
</TouchableOpacity>
}
            </View>

            { show &&
            <View
            style={{
              flexDirection:'row',
              gap:20
            }}
            >

            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: '#B22235' }}
              onPress={()=>redeem_points("yes")}
            >
             <Image
             source={require('../../assets/images/whitecheck.png')}
             style={{
              resizeMode:'contain',
              height:20,
              width:20,
             }}
             
             />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: '#B22235' }}
              onPress={closeModal}
            >
             <Image
             source={require('../../assets/images/whitecross.png')}
             style={{
              height:30,
              width:30,
              resizeMode:'contain'
             }}
             
             />
            </TouchableOpacity>

              </View>
            
            }
{/* <Button title="Copy to Clipboard" onPress={()=>copyToClipboard(coupon_code)} /> */}

{
      !show&&      <TouchableOpacity
              style={{ ...styles.button, backgroundColor: '#B22235' }}
              onPress={closeModal}
            >
               <Image
             source={require('../../assets/images/whitecross.png')}
             style={{
              height:30,
              width:30,
              resizeMode:'contain'
             }}
             
             />
            </TouchableOpacity>

}
          </View>
        </View>
      </Modal>
    );
  };
  


  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalView: {
      backgroundColor: '#13171B',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
       width:'90%',
      borderWidth:2,
      borderColor:'#B22235'
    },
    modalText: {
     
      textAlign: 'center',
      fontSize: 18,
      color:'#B2BEB5'
    },
    button: {
      marginTop: 10,
      padding: 10,
      borderRadius: 20,
      width:40,
      height:40,
       
      alignItems: 'center',
      textAlign:'center',
      justifyContent:'center'
    },
    buttonText: {
      color: 'white',
      fontSize: 16
    },
  });
  