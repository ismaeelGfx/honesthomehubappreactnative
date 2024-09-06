import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View,ScrollView,TouchableOpacity,TextInput } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import CameraScreen from "../Camera/CameraScreen";
import { baseurl } from "../../BaseUrl";
 



interface Customer_Details {

    Home_Address: string,
    Name:string,
    zipCode:number,
    phoneno:number,
    email:string

}


const Edit_Profile = ({ navigation ,setUserIsAuthenticated}: any)=>{

  

    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.19   ;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9; // 80% of the screen width

     
    const [address,setaddress]=useState<string|any>()

    const [name, onChangeName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [phone, onChangePhone] = React.useState('');
    const [Home_Address, onChangeHome_Address] = React.useState('');
    const [zipcode, onChangezipcode] = React.useState('');

    const [Customer_Details,setCustomer_Details]=useState<string|any>([])



      const goto=()=>{

        navigation.navigate('Chats');

      }

      const Logout = async () => {
        console.log("LOG OUT")
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('ZipCode');
        await AsyncStorage.removeItem('Address');

        Toast.show({
          type:'success',
          text1:'LogOut Successfully'
        })

        setTimeout(() => {
          setUserIsAuthenticated(false); 
        }, 1000);
    
         
      }
    
   


    useFocusEffect(
        React.useCallback(() => {
            get_customer_details();
        }, [])
      );



    const goto_legal_privacy=()=>{

      navigation.navigate('Legal_Privacy');

    }

    const goto_terms_condition=()=>{

      navigation.navigate('Terms_Condition');

    }



    
  const get_customer_details = async () => {
    try {

        const userId = await AsyncStorage.getItem('userId');
        const response = await fetch(`${baseurl}/get-customer-profile/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // No need to include a body for GET requests
        });
    
        if (response.ok) {
            const data = await response.json();
            console.log('Success STEPS:', data.data);

          setCustomer_Details(data.data)

                 
        
    


           
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



const handleSignUp = async () => {

    const userId = await AsyncStorage.getItem('userId');


    const requestData = {
     _id:userId,
     Name:name,
     email:email,
     phoneno:phone,
     Home_Address:Home_Address

        
    };

    console.log(requestData,"REQ")

    try {
        const response = await fetch(`${baseurl}/updateuserdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);

            Toast.show({
              type:'success',
              text1:'Profile Edited Successfully'
            })

            get_customer_details()
           
        } else {
            console.error('Error TS11:', response.statusText);
             
        }
    } catch (error) {
        console.error('Error:', error);

        Toast.show({
          type:'error',
          text1:'An error occured, Please try again later.'
        })
    }
};
  

    

    return(

      <View style={{backgroundColor:'#13171B'}}> 

            <SafeAreaView>
                
                    
                
        <View  style={[styles.container, { height: windowHeight }]}>
          

       

            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center',marginTop:10}}>

             
            
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingLeft:40}}>
               
            </Text>

            {/* <TouchableOpacity onPress={goto}>
              <Image
                source={require('../../assets/images/home.png')}  
                style={[styles.home_logo]}  
                
                
                />
              </TouchableOpacity> */}

            </View>


            <View style={{flexDirection:'row',width:'100%',justifyContent:'center'}}>
            <Image
                source={require('../../assets/images/cusotmerprofile.png')}
                style={styles.customerprofile_logo}

            />

                
            </View>

            <View style={{paddingTop:20}}>
            <Text style={{color: '#FFF',
    textAlign: 'center',
    
    fontSize: 30,
     
      // Assuming normal line height is 1:1 ratio of font size
    }}>
                Edit Profile
              </Text>
            </View>



            <ScrollView > 

        <View style={{paddingBottom}}>
        
        <View style={{justifyContent:'center',alignItems:'center',paddingTop:20}}>

        <Text style={{color:'white',fontSize:18}}>
            Name: {Customer_Details.Name}
        </Text>

        <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Change Name"
        placeholderTextColor="white"
      />


        <Text style={{color:'white',fontSize:18}}>
            Email: {Customer_Details.email}
        </Text>


        <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Change Email"
        placeholderTextColor="white"
      />

        

        


        


        <Text style={{color:'white',fontSize:18}}>
            Contact No: {Customer_Details.phoneno}
        </Text>


        <TextInput
        style={styles.input}
        onChangeText={onChangePhone}
        value={phone}
        placeholder="Change Phone No"
        placeholderTextColor="white"
      />


        <Text style={{color:'white',fontSize:18}}>
            Address: {Customer_Details.Home_Address}
        </Text>

        <TextInput
        style={styles.input}
        onChangeText={onChangeHome_Address}
        value={Home_Address}
        placeholder="Change Address"
        placeholderTextColor="white"
      />

        <TouchableOpacity style={{backgroundColor: '#B22235',
                    borderRadius:5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width:320,
                    height:50,marginTop:20}} onPress={handleSignUp}>
            <Text style={{ color: "white",
    fontSize: 16,
    fontWeight: "bold",}}>
                Edit Profile
            </Text>
        </TouchableOpacity>

        </View>




      



 



 
          



                
            

                    
           





        </View>


        </ScrollView>
        

          
           
       
        </View>


   
            </SafeAreaView>
      </View>

       



    )



};

const styles = StyleSheet.create({
    
  
    container: {
              backgroundColor: '#13171B',
             
              alignItems: "center",
           
              position:'relative'
            },
            logo: {
                      width: 30, // Adjust the image width to be 80% of the parent container
                      height: 30, 
                      // aspectRatio: 1, 
                      resizeMode: "contain",
                      // bottom:0,
                      left:10
                      
                     
                      
                    },
         
  
                    button: {
                      
                      backgroundColor: '#B22235',
                      borderRadius:5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width:80,
                      height:40,
                      
                    },
                    button1: {
                      
                        backgroundColor: '#FF5954',
                        borderRadius:5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width:80,
                        height:40,
                        
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
    },
  
    job_container:{
        backgroundColor:'#13171B',
        // width:336,
        height:undefined,
        padding:20,
        borderRadius:10,
        marginTop:20
        
    },
    text:{
      fontSize:18,
      color:'white',
      fontWeight:'bold'
    },

    text1:{
        fontSize:12,
        color:'white'

    },
    home_logo: {
        width: 30, // Adjust the image width to be 80% of the parent container
        height: 30, 
        // aspectRatio: 1, 
        resizeMode: "contain",
        right:30
        
        
       
        
      },
      customerprofile_logo: {
        width: 200, // Adjust the image width to be 80% of the parent container
        height: 200, 
        // aspectRatio: 1, 
        resizeMode: "contain",
        // bottom:0,
        left:10
        
       
        
      },

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
  
  });


export default Edit_Profile