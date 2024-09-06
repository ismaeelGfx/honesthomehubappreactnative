import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View,ScrollView,TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../../BaseUrl";
import { BackHandler } from "react-native";
import Toast from "react-native-toast-message";

const Phase2 = ({ navigation }: any)=>{

  
   
    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.25;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9; // 80% of the screen width
    const leftOffset = windowWidth * 0.4;
    const [jobID,setjobID]= useState<string | null>(null);
       
     
     


    interface Vendors {
      [x: string]: string;
      vendorId: any;
      Order_Id: string;
      selected_queries: string;
      phase: string;
      _id:string;
      Vendor_Name:string;
      scheduleId:string;
      status:string;
      jobId:string;
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

            handleSignUp()

            Toast.show({
              type:'success',
              text1:'Vendor Selected.'
            })

            handleBackPress()

            // goTo()


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


const goto_vendor_profile= async (e:any)=>{

  console.log(e," Vendor Profile ID")

  

  navigation.navigate('Vendor_Profile', { vendor_id: e });


  // await AsyncStorage.removeItem('async_job_id');

  // AsyncStorage.setItem('async_job_id',  e);

  //     const async_job_id = await AsyncStorage.getItem('async_job_id');

  //     console.log(async_job_id,"async_job_id")

      

}


const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute < 10 ? '0' + minute : minute} ${suffix}`;
};

  
    

    return(

      <View style={{backgroundColor:"#13171B"}}>


            <SafeAreaView>
                
                    
                
        <View  style={[styles.container, { height: windowHeight }]}>

            <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%',alignItems:'center',marginTop:10}}>

              <TouchableOpacity  onPress={handleBackPress}>
              <Image
                source={require('../../assets/images/back-button.png')}  
                style={[styles.logo]}  
                
                
                />
              </TouchableOpacity>
            
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingLeft:40}}>
            Select Vendor
            </Text>

            {/* <TouchableOpacity style={{ left: leftOffset }} >
                <Text style={{color:'#A3A3A3',fontSize:12,fontWeight:'600'}}>
                    Select Vendor
                </Text>
            </TouchableOpacity> */}

            </View>

        <View style={{marginTop:15,paddingBottom}}>
        <ScrollView> 

          

        {/* { Vendors && Vendors.filter(e => e.status === 'pending').map((e, i) =>(


<View  style={[styles.job_container, { width: viewWidth }]} key={i}>
                
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>


    <View style={{flexDirection:'row',alignItems:'center'}}>
    <Image
     
     source={require('../../assets/images/dot.png')}
     style={styles.dot_logo}
     
     />   

    <Text style={[styles.text]} >
    {e.Vendor_Name?e.Vendor_Name:''}
    </Text>
    </View>

  

    <Text style={[styles.text]} >
    {e.selected_queries?e.selected_queries[0]:''}
    </Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
    <Text style={[styles.text1]}>
    Availability :  Within 2hrs
    </Text>

   
</View>


<View style={{flexDirection:'row' , justifyContent:'center', paddingTop:20}}>
<TouchableOpacity style={styles.button  }  onPress={()=>AcceptHandle(e.scheduleId)} >
<Image
source={require('../../assets/images/check.png')}
style={styles.cross_logo}
/>
</TouchableOpacity>

<TouchableOpacity style={styles.button1  }  >
<Image
source={require('../../assets/images/cross.png')}
style={styles.cross_logo}
/>
</TouchableOpacity>
</View>

</View>



                ))} */}




{Vendors.filter(e =>( e.status === 'pending' || e.status === 'accepted' ) && e.jobId === jobID).map((e, i) => (


<View  style={[styles.job_container, { width: viewWidth }]} key={i}>
                
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>


    <View style={{flexDirection:'row',alignItems:'center'}}>
    <Image
     
     source={require('../../assets/images/dot.png')}
     style={styles.dot_logo}
     
     />   

    <Text style={[styles.text]} >
    {e.Vendor_Name?e.Vendor_Name:''}
    </Text>
    </View>

  

    <Text style={[styles.text]} >
    {e.selected_queries?e.selected_queries[0]:''}
    </Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
    <Text style={[styles.text1]}>
    {/* Availability :  {e.date!='2000-01-01'?(formatDate(e.date) formatTime(e.time)):e.cleaning_maintainance_date}   */}

    Availability: {e.date !== '2000-01-01' ? formatDate(e.date) + ' ' + formatTime(e.time) : e.cleaning_maintainance_date}

    </Text>

   
</View>

<View style={{marginTop:10}}>
  <TouchableOpacity onPress={() => goto_vendor_profile(e.vendorId)}>
    <Text  style={{color:'white',fontWeight:'bold'}}>
      View Profile
    </Text>
  </TouchableOpacity>
</View>


<View style={{flexDirection:'row' , justifyContent:'center', paddingTop:20, gap:10}}>
<TouchableOpacity style={styles.button  }  onPress={()=>AcceptHandle(e.scheduleId)} >
<Image
source={require('../../assets/images/check.png')}
style={{
  resizeMode:'contain',
  height:30,
  width:30
}}
/>
</TouchableOpacity>

<TouchableOpacity style={styles.button1  }  >
<Image
source={require('../../assets/images/cross.png')}
style={styles.cross_logo}
/>
</TouchableOpacity>
</View>

</View>



                ))}



         




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
                      
                        backgroundColor: '#1E1E1E',
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
        width:40,
        

      }

  
  });


export default Phase2






// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useEffect, useState } from "react";
// import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { baseurl } from "../../BaseUrl";
// import { useNavigation } from "@react-navigation/native";

// const Phase2 = ({ navigation }: any) => {
     
//     const windowHeight = Dimensions.get('window').height;
//     const paddingBottom = windowHeight * 0.15;
//     const windowWidth = Dimensions.get('window').width;
//     const viewWidth = windowWidth * 0.9; // 80% of the screen width
//     const leftOffset = windowWidth * 0.4;

//     const goto = () => {
//       navigation.navigate('Phase3');
//   };

//     interface Vendor {
//         Order_Id: string;
//         selected_queries: string;
//         phase: string;
//         _id: string;
//         Vendor_Name: string;
//         scheduleId: string;
//         status: string;
//     }

//     const [Vendors, setVendors] = useState<Vendor[]>([]);

//     useEffect(() => {
//         handleSignUp();
//     }, []);

//     const handleSignUp = async () => {
//         const userId = await AsyncStorage.getItem('userId');
//         const requestData = {
//             customerId: userId,
//         };

//         console.log(requestData, "REQ");

//         try {
//             const response = await fetch(`${baseurl}/customer-schedules`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestData),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Success schedules:', data);
//                 setVendors(data.data);
//             } else {
//                 console.error('Error TS:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const AcceptHandle = async (scheduleId: string) => {
//         const requestData = {
//             scheduleId: scheduleId,
//             response: 'accepted',
//         };

//         console.log(requestData, "Accept handle");

//         try {
//             const response = await fetch(`${baseurl}/respond-to-schedule`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestData),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Success schedules:', data);
//                 setVendors(data.data);
//             } else {
//                 console.error('Error TS:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <SafeAreaView>
//             <View style={[styles.container, { height: windowHeight }]}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', marginTop: 10 }}>
//                     <TouchableOpacity onPress={goto}>
//                         <Image
//                             source={require('../../assets/images/back-button.png')}
//                             style={styles.logo}
//                         />
//                     </TouchableOpacity>
//                     <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', paddingLeft: 40 }}>
//                         Step 2
//                     </Text>
//                     <TouchableOpacity style={{ left: leftOffset }} onPress={goto}>
//                         <Text style={{ color: '#A3A3A3', fontSize: 12, fontWeight: '600' }}>
//                             Select Vendor
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={{ marginTop: 15, paddingBottom }}>
//                     <ScrollView>
//                         {Vendors.filter(e => e.status === 'pending').map((e, i) => (
//                             <View style={[styles.job_container, { width: viewWidth }]} key={i}>
//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                         <Image
//                                             source={require('../../assets/images/dot.png')}
//                                             style={styles.dot_logo}
//                                         />
//                                         <Text style={styles.text}>
//                                             {e.Vendor_Name ? e.Vendor_Name : ''}
//                                         </Text>
//                                     </View>
//                                     <Text style={styles.text}>
//                                         {e.selected_queries ? e.selected_queries[0] : ''}
//                                     </Text>
//                                 </View>

//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
//                                     <Text style={styles.text1}>
//                                         Availability: Within 2hrs
//                                     </Text>
//                                 </View>

//                                 <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
//                                     <TouchableOpacity style={styles.button} onPress={() => AcceptHandle(e.scheduleId)}>
//                                         <Image
//                                             source={require('../../assets/images/check.png')}
//                                             style={styles.cross_logo}
//                                         />
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.button1}>
//                                         <Image
//                                             source={require('../../assets/images/cross.png')}
//                                             style={styles.cross_logo}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         ))}


//                     </ScrollView>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     input: {
//         height: 62,
//         width: 335,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//         borderColor: '#4D4D4D',
//         color: 'white',
//         borderRadius: 15,
//     },
//     container: {
//         backgroundColor: '#13171B',
//         alignItems: "center",
//         position: 'relative',
//     },
//     logo: {
//         width: 40,
//         height: 40,
//         resizeMode: "contain",
//         left: 10,
//     },
//     button: {
//         backgroundColor: '#B22235',
//         borderRadius: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 150,
//         height: 40,
//     },
//     button1: {
//         backgroundColor: '#13171B',
//         borderRadius: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 150,
//         height: 40,
//     },
//     buttonText: {
//         color: "white",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     scroll_container: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignContent: 'center',
//         alignItems: 'center',
//     },
//     job_container: {
//         backgroundColor: 'rgba(61, 185, 234, 0.12)',
//         padding: 20,
//         borderRadius: 10,
//         marginTop: 20,
//     },
//     text: {
//         fontSize: 18,
//         color: '#D9D9D9',
//         fontWeight: 'bold',
//     },
//     text1: {
//         fontSize: 12,
//         color: '#D9D9D9',
//     },
//     dot_logo: {
//         width: 20,
//         height: 20,
//         resizeMode: "contain",
//     },
//     cross_logo: {
//         height: 40,
//         width: 40,
//     },
// });

// export default Phase2;