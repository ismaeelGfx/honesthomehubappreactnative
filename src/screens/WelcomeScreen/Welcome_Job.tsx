import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View,ScrollView,TouchableOpacity, BackHandler } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome_Job = ({ navigation }: any)=>{

  

    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.15;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9; // 80% of the screen width
    const leftOffset = windowWidth * 0.4;
    const [jobID,setjobID]= useState<string | null>(null);

      const goto=()=>{

        navigation.navigate('Chat');

      }
  
      const handleBackPress = () => {
        // Go back to the previous screen
        navigation.goBack();
        return true;
      };
    
      useEffect(() => {
        // Add event listener for the hardware back button
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          handleBackPress
        );
    
        // Cleanup event listener on component unmount
        return () => backHandler.remove();
      }, []);



    interface Vendors {
      Order_Id: string;
      selected_queries: string;
      phase: string;
      _id:string;
      Vendor_Name:string;
      scheduleId:string;
      status:string;
      vendorBudget:string;
      jobId:string;
      gig_image:string;
      jobtime:string;
    }

    // const [orders,setorders]=useState([])

    const [Vendors, setVendors] = useState<Vendors[]>([]);


 
  
    

    return(

      
      
      
      <View  style={[styles.container, { height: windowHeight }]}>
          <SafeAreaView>

            <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%',alignItems:'center',marginTop:10,gap:20}}>

              <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../assets/images/back-button.png')}  
                style={[styles.logo1]}  
                
                
                />
              </TouchableOpacity>
            
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
               Chat With Vendor
            </Text>


            

            

            </View>

        <View style={{marginTop:30,paddingBottom}}>
        <ScrollView> 

          
              <View style={{width:'100%',alignItems:'center'}}>
              <Image
                source={require('../../assets/images/topa.png')}  
                style={[styles.logo]}  
                
                
                />


                <View style={{justifyContent:'center',alignItems:'center',gap:20,marginTop:20}}>
                <Text style={{
                  color: '#D9D9D9',
    fontFamily: 'Urbanist',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
     }}>
                Payment Successful
                </Text>


                <Text style={{
                  color: '#979797',
                  textAlign: 'center',
                  fontFamily: 'Urbanist',
                  fontSize: 15,
                  fontStyle: 'normal',
                  fontWeight: '500',
                }}>
                Chat with vendor and discuss your project.
                </Text>

                </View>


                
              <TouchableOpacity onPress={goto} style={{width:150,height:50,backgroundColor:'#B22235',justifyContent:'center',alignItems:'center',marginTop:30,borderRadius:10}}>
             <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>
                Chat Now
             </Text>
              </TouchableOpacity>
              </View>
         

         




</ScrollView>

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
                      width: 380, // Adjust the image width to be 80% of the parent container
                      height: 380, 
                      // aspectRatio: 1, 
                      resizeMode: "contain",
                      // bottom:0,
                      
                      
                     
                      
                    },
                    logo1: {
                      width: 40,
                      height: 40,
                      resizeMode: "contain",
                      left: 10
                  },
         
  
                    button: {
                      
                      backgroundColor: '#B22235',
                      borderBottomLeftRadius:5,
                      borderBottomRightRadius:5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    //   width:150,
                      height:40,
                      
                    },
                    button1: {
                      
                        backgroundColor: '#13171B',
                        borderRadius:5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width:150,
                        height:40,
                        
                      },
                  
    buttonText: {
      color: "#13171B",
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
        padding:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        marginTop:20
        
    },
    text:{
      fontSize:18,
      color:'#D9D9D9',
      fontWeight:'bold'
    },

    text1:{
        fontSize:12,
        color:'#D9D9D9'

    },

    dot_logo: {
        width: 20, // Adjust the image width to be 80% of the parent container
        height: 20, 
        // aspectRatio: 1, 
        resizeMode: "contain",
        // bottom:0,
       
        
       
        
      },

      cross_logo:{
        height:40,
        width:40

      },

      vendor_pic: {
        width: 80, // Adjust the image width to be 80% of the parent container
        height: 80, 
        // aspectRatio: 1, 
        resizeMode: "contain",
        // bottom:0,
        left:10
        
       
        
      },


  
  });


export default Welcome_Job