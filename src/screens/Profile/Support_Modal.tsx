import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';


export const SupportModal = ({ isVisible, closeModal ,coupon_code,content,show,redeem_points}:any) => {
  
  
  
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
            <Text style={styles.modalText}>For any Queries You can contact us at:</Text>
            <Text style={styles.modalText}>Email: honesthomehub@gmail.com</Text>
            <Text style={styles.modalText}>Phone No: 469-223-3255</Text>
            <View style={{
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              gap:20
            }}>
 
            </View>

           
            <View
            style={{
              flexDirection:'row',
              gap:20
            }}
            >

          
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
      color:'#B2BEB5',
      marginTop:10
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
  