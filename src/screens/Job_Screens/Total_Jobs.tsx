import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View,ScrollView,TouchableOpacity, ActivityIndicator } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const Total_Jobs = ({ navigation }: any)=>{

  

    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.20;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9;  


    interface Order {
      Order_Id: string;
      selected_queries: string;
      phase: string;
      _id:string;
      emergency: string;
    }

    

    const [orders, setOrders] = useState<Order[]>([]);
    const [uploading, setUploading] = useState(false);

    

      const goto= async (e: any, selected_queries: string,emergency:string)=>{

        console.log(e,selected_queries,"JOB ID TOTAL JOBS")

        
        if(selected_queries==='Landscaping' ||  selected_queries==='Cleaning' || emergency ==="emergency")
          {

            navigation.navigate('Maintainence_Steps', { job_id: e });
          }
          else{

            navigation.navigate('Steps', { job_id: e });
          }



        await AsyncStorage.removeItem('async_job_id');

        AsyncStorage.setItem('async_job_id',  e);

            const async_job_id = await AsyncStorage.getItem('async_job_id');

            console.log(async_job_id,"async_job_id")

            handleSignUp1()

      }




      const handleSignUp1 = async () => {
        try {
    
          


            const jobId = await AsyncStorage.getItem('async_job_id');
            console.log(jobId, "REQ");
    
            if (!jobId) {
                console.error('No jobId found in AsyncStorage');
                return;
            }
    
            const response = await fetch(`${baseurl}/getpaidvendordetails/${jobId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Success: TS', data);

                await AsyncStorage.removeItem('customer_id');
          await AsyncStorage.removeItem('vendor_id');
          await AsyncStorage.removeItem('budget');
          await AsyncStorage.removeItem('Schedule_id');
          await AsyncStorage.removeItem('vendor_name');
    

          AsyncStorage.setItem('budget',  data.data[0].vendorBudget.toString());

          AsyncStorage.setItem('vendor_name',  data.data[0].Vendor_Name.toString());
               
                AsyncStorage.setItem('customer_id',  data.data[0].customerId);
                AsyncStorage.setItem('vendor_id',  data.data[0].vendorId);

                AsyncStorage.setItem('Schedule_id',  data.data[0]._id);
    
    
                const customer_id = await AsyncStorage.getItem('customer_id');
                const vendor_id = await AsyncStorage.getItem('vendor_id');
                const vendorBudget = await AsyncStorage.getItem('budget');
                const schedule_id = await AsyncStorage.getItem('Schedule_id');


                 
                 
    
                console.log(customer_id,vendor_id,"yo",vendorBudget,schedule_id)
                 
    
    
    
                 
            } else {
                console.error('Error TS:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
  
    
    // useEffect(()=>{

    //   handleSignUp()
    // },[])


    useFocusEffect(
      React.useCallback(() => {
        handleSignUp();
      }, [])
    );


    const handleSignUp = async () => {
      const userId = await AsyncStorage.getItem('userId');
      const requestData = {
           
        user_id:userId
          
         
          
  
          
      };
  
      console.log(requestData,"REQ")
  
      try {
          const response = await fetch(`${baseurl}/get-customer-job-by-id`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestData)
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log('Success:', data);

              setUploading(false)

              setOrders(data.data)
  
              // await AsyncStorage.removeItem('userId');
              
  
              
  
           
  
              console.log(userId,"ASYNC STORAGE")
            
          } else {
              console.error('Error TS:', response.statusText);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };
  

  const goto_create_job =()=>{

    navigation.navigate('Create_Job_Post')
  }


  const Delete_Job = async (e:any) => {
     
    const requestData = {
         
      _id:e
        
       
        

        
    };

    console.log(requestData,"REQ")

    try {
        const response = await fetch(`${baseurl}/deletejob`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);

             
            handleSignUp();
            

            Toast.show({
              text1:'Job Deleted Successfully.'
            })

         

            
          
        } else {
            console.error('Error TS:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};







  

    return(


      <View style={{backgroundColor:"#13171B"}}>
            <SafeAreaView>
                
                    
                
        <View  style={[styles.container, { height: windowHeight }]}>

            <View style={{flexDirection:'row', width:'100%',alignItems:'center',marginTop:10,justifyContent:"space-evenly",}}>

              <View style={{flexDirection:'row',alignItems:'center'}}>
{/* 
              <TouchableOpacity onPress={goto}>
              <Image
                source={require('../../assets/images/back-button.png')}  
                style={[styles.logo]}  
                
                
                />
              </TouchableOpacity> */}
            
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',marginRight:150}}>
                Jobs
            </Text>

              </View>




            <TouchableOpacity onPress={goto_create_job}  >
              <Text style={{color:"white"}}> Create Job</Text>
              </TouchableOpacity>

            </View>






        <View style={{marginTop:15,paddingBottom}}>
        <ScrollView> 

          {

            orders.map((e,i)=>(



              <View key={i} style={[styles.job_container, { width: viewWidth }]}>
                
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={[styles.text]} >
        Order ID
        </Text>

        <Text style={[styles.text]} >
        {e.Order_Id}
        </Text>
    </View>

    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={[styles.text1]}>
        Category
        </Text>

        <Text style={[styles.text1]}>
        {e.selected_queries}
        </Text>
    </View>

    <View>
      <Text style={[styles.text1]}>
        {e.phase}
      </Text>
    </View>


<View style={{flexDirection:'row' , justifyContent:'center',gap:20, paddingTop:20}}>
<TouchableOpacity style={styles.button  }   onPress={() => goto(e._id,e.selected_queries,e.emergency)}>
<Text style={styles.buttonText}>View</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.button1  }  onPress={()=>Delete_Job(e._id)}>
<Text style={styles.buttonText}>Cancel</Text>
</TouchableOpacity>
</View>

</View>

            ))
          }
 




</ScrollView>

        </View>
        

          
           
       
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
                      width: 40,  
                      height: 40, 
                       
                      resizeMode: "contain",
                       
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

    }
  
  });


export default Total_Jobs