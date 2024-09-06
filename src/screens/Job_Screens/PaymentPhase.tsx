import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View,ScrollView,TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../../BaseUrl";
import Payment from "./Payment";

const PaymentPhase = ({ navigation }: any)=>{

  
   
    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.15;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9; // 80% of the screen width
    const leftOffset = windowWidth * 0.4;
    const [jobID,setjobID]= useState<string | null>(null);
       
     
     


    interface Vendors {
      Order_Id: string;
      selected_queries: string;
      phase: string;
      _id:string;
      Vendor_Name:string;
      scheduleId:string;
      status:string;
      jobId:string;
    }

 
    const goTo =()=>{
      navigation.navigate("Steps")
    }
    const [Vendors, setVendors] = useState<Vendors[]>([]);


   


    useEffect(()=>{
      handleSignUp()
    },[])

    const handleSignUp = async () => {
      const userId = await AsyncStorage.getItem('userId');

      const jobId = await AsyncStorage.getItem('async_job_id');

      setjobID(jobId)
      
    
     
       

      const requestData = {
           
        customerId:userId
          
  
          
      };
  
      console.log(requestData,"REQ")
  
      try {
        


          const response = await fetch(`${baseurl}/customer-schedules`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestData)
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log('Success schedules:', data);

              setVendors(data.data)
  
              // await AsyncStorage.removeItem('userId');
             
  
              
  
               
  
              console.log(userId,"ASYNC STORAGE")
            
          } else {
              console.error('Error TS:', response.statusText);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };
  



  const AcceptHandle = async (e:any) => {
    const userId = await AsyncStorage.getItem('userId');
    const requestData = {
         
      scheduleId:e,
      response:'accepted'      


        

        
    };

    console.log(requestData,"Accept handle")

    try {
        const response = await fetch(`${baseurl}/respond-to-schedule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success schedules:', data);

            goTo()


            //  goto()

            // await AsyncStorage.removeItem('userId');
           

            

             

            console.log(userId,"ASYNC STORAGE")
          
        } else {
            console.error('Error TS:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  
    

    return(

            <SafeAreaView>
                
                    
                
        <View  style={[styles.container, { height: windowHeight }]}>

            <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%',alignItems:'center',marginTop:10}}>

              <TouchableOpacity  >
              <Image
                source={require('../../assets/images/back-button.png')}  
                style={[styles.logo]}  
                
                
                />
              </TouchableOpacity>
            
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingLeft:40}}>
                Step 2
            </Text>

            <TouchableOpacity style={{ left: leftOffset }} >
                <Text style={{color:'#A3A3A3',fontSize:12,fontWeight:'600'}}>
                    Select Vendor
                </Text>
            </TouchableOpacity>

            </View>

        <View style={{marginTop:15,paddingBottom}}>
        <ScrollView> 

        <View style={{width:300}}>

           

        </View>

 



 


         




</ScrollView>

        </View>
        

          
           
       
        </View>


   
            </SafeAreaView>
       



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
                      width: 40, // Adjust the image width to be 80% of the parent container
                      height: 40, 
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
                      width:150,
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
        backgroundColor:'rgba(61, 185, 234, 0.12)',
        // width:336,
        height:undefined,
        padding:20,
        borderRadius:10,
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

      }

  
  });


export default PaymentPhase