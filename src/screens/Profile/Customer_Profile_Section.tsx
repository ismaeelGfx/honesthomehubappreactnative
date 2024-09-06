import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View,ScrollView,TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import CameraScreen from "../Camera/CameraScreen";
import { baseurl } from "../../BaseUrl";
import { SupportModal } from "./Support_Modal";

const Customer_Profile_Section = ({ navigation ,setUserIsAuthenticated}: any)=>{

  

    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.19   ;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9; // 80% of the screen width

    const [zipcode,setzipcode]=useState<string|any>()
    const [address,setaddress]=useState<string|any>()


    const [user_del_ID,setuser_del_ID]=useState<string|any>()



      const goto=()=>{

        navigation.navigate('Select_Camera');

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
    
  
      useEffect(() => {
        const fetchData = async () => {
            try {
            
                const Zipcode = await AsyncStorage.getItem('ZipCode');
                const Address = await AsyncStorage.getItem('Address');

                const user_ID_DEL = await AsyncStorage.getItem('userId');

                setaddress(Address)
                setzipcode(Zipcode)
                setuser_del_ID(user_ID_DEL)
                
                 
              
    
                
                 
            } catch (error) {
                console.error('Error fetching data from AsyncStorage:', error);
            }
        };
    
        fetchData();
    }, []);



    const goto_legal_privacy=()=>{

      navigation.navigate('Legal_Privacy');

    }

    const goto_terms_condition=()=>{

      navigation.navigate('Terms_Condition');

    }


    const goto_terms_edit_profile=()=>{

      navigation.navigate('Edit_Profile');

    }




    const Delete_User_Data = async () => {
      const requestData = {
           
         _id:user_del_ID  
          
           
          
  
          
      };
  
      console.log(requestData,"REQ")
  
      try {
          const response = await fetch(`${baseurl}/delete_customer_data`, {
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
                text1:'User Data Deleted.'
              })


              Logout()
  
             
            
  
             
            
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
  
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };



    

    return(

      <View style={{backgroundColor:'#13171B'}}>

            <SafeAreaView >
                
                    
                
        <View  style={[styles.container, { height: windowHeight }]}>
          

       

            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center',marginTop:10}}>

             
            
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingLeft:40}}>
                My Profile   
            </Text>

            <TouchableOpacity onPress={goto}>
              <Image
                source={require('../../assets/images/home.png')}  
                style={[styles.home_logo]}  
                
                
                />
              </TouchableOpacity>

            </View>


            <View style={{flexDirection:'row',width:'100%',justifyContent:'center'}}>
            <Image
                source={require('../../assets/images/cusotmerprofile.png')}
                style={styles.customerprofile_logo}

            />
                
            </View>



            <ScrollView > 

        <View style={{paddingBottom}}>
        

       
        <TouchableOpacity>

       

              <View  style={[styles.job_container, { width: viewWidth }]}>
                
    <View style={{flexDirection:'row',justifyContent:'flex-start'}}>

    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',gap:20}}>


         <Image
                source={require('../../assets/images/zipcode.png')}  
                style={[styles.logo]}  
                
                
                />

                <View  >
                <Text style={[styles.text]} >
        Address
        </Text>

        <Text style={{color:'white'}}>
        {address}
        </Text>

                </View>

       

        </View>

        {/* <Text style={[styles.text]} >
        {e.id}
        </Text> */}
    </View>


    

    




</View>

</TouchableOpacity>



<TouchableOpacity>


<View  style={[styles.job_container, { width: viewWidth }]}>
                
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            
                <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',gap:20}}>
            
            
                     <Image
                            source={require('../../assets/images/zipcode.png')}  
                            style={[styles.logo]}  
                            
                            
                            />
            
                            <View  >
                            <Text style={[styles.text]} >
                    Zipcode
                    </Text>
            
                    <Text style={{color:'white'}}>
                    {zipcode}
                    </Text>
            
                            </View>
            
                   
            
                    </View>
            
                    {/* <Text style={[styles.text]} >
                    {e.id}
                    </Text> */}
                </View>
            
            
                
            
                
            
            
            
            
            </View>

            </TouchableOpacity>



<TouchableOpacity onPress={goto_terms_edit_profile}>



            <View  style={[styles.job_container, { width: viewWidth }]}>
                
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            
                <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',gap:20}}>
            
            
                     <Image
                            source={require('../../assets/images/basil_edit-outline.png')}  
                            style={[styles.logo]}  
                            
                            
                            />
            
                            <View  >
                            <Text style={[styles.text]} >
                    Edit My Profile
                    </Text>
            
                    {/* <Text>
                    Lorem ipsum dolor sit amet
                    </Text> */}
            
                            </View>
            
                   
            
                    </View>
            
                    {/* <Text style={[styles.text]} >
                    {e.id}
                    </Text> */}
                </View>
            
            
                
            
                
            
            
            
            
            </View>

            </TouchableOpacity>

            <TouchableOpacity>
             


            {/* <View  style={[styles.job_container, { width: viewWidth }]}>
                
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            
                <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',gap:20}}>
            
            
                     <Image
                            source={require('../../assets/images/ph_lock-bold.png')}  
                            style={[styles.logo]}  
                            
                            
                            />
            
                            <View  >
                            <Text style={[styles.text]} >
                    Change Password
                    </Text>
            
                   
            
                            </View>
            
                   
            
                    </View>
            
                     
                </View>
            
            
                
            
                
            
            
            
            
            </View> */}
   
            </TouchableOpacity>



                    <TouchableOpacity onPress={goto_legal_privacy}>

                    
            <View  style={[styles.job_container, { width: viewWidth }]}>
                
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            
                <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',gap:20}}>
            
            
                     <Image
                            source={require('../../assets/images/iconoir_privacy-policy.png')}  
                            style={[styles.logo]}  
                            
                            
                            />
            
                            <View  >
                            <Text style={[styles.text]} >
                    Privacy Policy
                    </Text>
            
                    {/* <Text>
                    Lorem ipsum dolor sit amet
                    </Text> */}
            
                            </View>
            
                   
            
                    </View>
            
                    {/* <Text style={[styles.text]} >
                    {e.id}
                    </Text> */}
                </View>
            
            
                
            
                
            
            
            
            
            </View>
            </TouchableOpacity>

                    <TouchableOpacity onPress={goto_terms_condition}>

                   
            <View  style={[styles.job_container, { width: viewWidth }]}>
                
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            
                <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',gap:20}}>
            
            
                     <Image
                            source={require('../../assets/images/iconoir_privacy-policy.png')}  
                            style={[styles.logo]}  
                            
                            
                            />
            
                            <View  >
                            <Text style={[styles.text]} >
                    Terms & Conditions
                    </Text>
            
                    {/* <Text>
                    Lorem ipsum dolor sit amet
                    </Text> */}
            
                            </View>
            
                   
            
                    </View>
            
                    {/* <Text style={[styles.text]} >
                    {e.id}
                    </Text> */}
                </View>
            
            
                
            
                
            
            
            
            
            </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>setModalVisible(true)}>

                   
<View  style={[styles.job_container, { width: viewWidth }]}>
    
    <View style={{flexDirection:'row',justifyContent:'flex-start'}}>

    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',gap:20}}>


         <Image
                source={require('../../assets/images/iconoir_privacy-policy.png')}  
                style={[styles.logo]}  
                
                
                />

                <View  >
                <Text style={[styles.text]} >
        Contact Support
        </Text>

        {/* <Text>
        Lorem ipsum dolor sit amet
        </Text> */}

                </View>

       

        </View>

        {/* <Text style={[styles.text]} >
        {e.id}
        </Text> */}
    </View>


    

    




</View>
</TouchableOpacity>


            <TouchableOpacity onPress={Delete_User_Data}>

                   
<View  style={[styles.job_container, { width: viewWidth }]}>
    
    <View style={{flexDirection:'row',justifyContent:'flex-start'}}>

    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly',gap:20}}>


         <Image
                source={require('../../assets/images/iconoir_privacy-policy.png')}  
                style={[styles.logo]}  
                
                
                />

                <View  >
                <Text style={[styles.text]} >
        Delete User Data
        </Text>

        {/* <Text>
        Lorem ipsum dolor sit amet
        </Text> */}

                </View>

       

        </View>

        {/* <Text style={[styles.text]} >
        {e.id}
        </Text> */}
    </View>


    

    




</View>
</TouchableOpacity>
            

                    <TouchableOpacity onPress={Logout}>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',gap:20,paddingTop:20,marginBottom:25}}>

<Image
   source={require('../../assets/images/ant-design_logout-outlined.png')}
   style={styles.logo}

/>           

 <Text style={{color:'#F00',fontSize:20}}>
   Logout
   
   </Text>          
</View>

                    </TouchableOpacity>
           





        </View>


        </ScrollView>
        

          
        <SupportModal isVisible={modalVisible} closeModal={closeModal}/>
       
        </View>


   
            </SafeAreaView>
      </View>

       



    )



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
                      width: 30, // Adjust the image width to be 80% of the parent container
                      height: 30, 
                      // aspectRatio: 1, 
                      resizeMode: "contain",
                      // bottom:0,
                      left:10,
                       
                      
                     
                      
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
        backgroundColor:'#292626',
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
  
  });


export default Customer_Profile_Section