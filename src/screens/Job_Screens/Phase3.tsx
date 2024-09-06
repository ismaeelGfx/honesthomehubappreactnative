import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View,ScrollView,TouchableOpacity, BackHandler } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Phase3 = ({ navigation }: any)=>{

  

    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.15;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9; // 80% of the screen width
    const leftOffset = windowWidth * 0.4;
    const [jobID,setjobID]= useState<string | null>(null);

      const goto=()=>{

        navigation.navigate('Total_Jobs');

      }
  
   



    interface Vendors {
      vendorId: any;
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

    AsyncStorage.setItem('Vendor_Id',e.vendorId );


    const requestData = {
         
      scheduleId:e,
      response:'selected'      


        

        
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

            goto()


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


const goto_view_quote= async (e: any, jobId: string)=>{

  console.log(e,jobId," View Quote")

  

  navigation.navigate('View_Quote', { vendor_id: e ,jobId:jobId});


  // await AsyncStorage.removeItem('async_job_id');

  // AsyncStorage.setItem('async_job_id',  e);

  //     const async_job_id = await AsyncStorage.getItem('async_job_id');

  //     console.log(async_job_id,"async_job_id")

      

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
  
    

    return(
 
      <View  style={{backgroundColor:'#13171B'}}>

            <SafeAreaView>
                
                    
                
        <View  style={[styles.container, { height: windowHeight }]}>

            <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%',alignItems:'center',marginTop:10}}>

              <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../assets/images/back-button.png')}  
                style={[styles.logo]}  
                
                
                />
              </TouchableOpacity>
            
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingLeft:40}}>
                Select Quotes
            </Text>

            {/* <TouchableOpacity style={{ left: leftOffset }} onPress={goto}>
                <Text style={{color:'#A3A3A3',fontSize:12,fontWeight:'600'}}>
                    Select Quotes
                </Text>
            </TouchableOpacity> */}

            </View>

        <View style={{marginTop:15,paddingBottom}}>
        <ScrollView> 

          

        {Vendors.filter(e => e.status === 'accepted' && e.jobId === jobID).map((e, i) => (

                    <View key={i}>

                 


<View  style={[styles.job_container, { width: viewWidth }]} >

    <View style={{flexDirection:'column'}}>



    {/* <View style={{backgroundColor:'green',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10}}> */}
    <View style={{ flexDirection:'row',alignItems:'center',paddingBottom:10,justifyContent:'space-between'}}>

<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:20}}>

<Image
     source={{ uri: e.gig_image }}
    style={styles.vendor_pic}
/>

<View style={{
  gap:10
}}>
 
 <Text 
    style={{
        color: '#A3A3A3',
        fontSize: 18,
    }}
    numberOfLines={1} // Limits the text to a single line and adds ellipsis if it overflows
>
    {e.Vendor_Name.length > 20 ? e.Vendor_Name.substring(0, 18) + '...' : e.Vendor_Name}
</Text>


<View>
    {/* <View style={{backgroundColor:'yellow' ,flexDirection:'row',alignItems:'center',gap:10}}> */}
    <View style={{ flexDirection:'row',alignItems:'center',gap:10}}>
    

    <TouchableOpacity onPress={() => goto_view_quote(e.vendorId,e.jobId)}>
    <Text  style={{color:'white',fontWeight:'bold'}}>
      View Quote
    </Text>
  </TouchableOpacity>

    <Text style={{color:'#0E87CC',fontSize:12}}>
    
    </Text>
    </View>

    <View>
        {/* <Text>
            Note:
        </Text>
        
        <Text>
        Lorem ipsum dolor sit amet, ctetur adipiscing elit. 
        </Text> */}

    </View>
    
</View>
</View>
</View>




</View>

<View style={{flexDirection:'row',justifyContent:'space-around',}}>

    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
    <Image
        source={require('../../assets/images/time.png')}
        style={{width:20,height:20}}
    />
    <Text style={{color:'#A3A3A3',fontSize:12}}>
    Job Duration : {e.jobtime?e.jobtime:'---'}
    </Text>
    </View>


    <View style={{flexDirection:'row',alignItems:'center',gap:5}}> 
    <Image
        source={require('../../assets/images/money.png')}
        style={{width:20,height:20}}
    />
    <Text style={{color:'#A3A3A3',fontSize:12}}>
   Price: {e.vendorBudget}
    </Text>
    </View>
   




</View>

    




    </View>
                
    




</View>

<TouchableOpacity  style={[styles.button, { width: viewWidth }]} onPress={()=>AcceptHandle(e.scheduleId)}  >
<Text style={styles.buttonText}>Select</Text>
</TouchableOpacity>

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


export default Phase3