import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Phase1 from "../Job_Screens/Phase1";
import Phase2 from "../Job_Screens/Phase2";
import Phase3 from "../Job_Screens/Phase3";
import { RouteProp, NavigationProp, ParamListBase, useNavigation, useFocusEffect } from '@react-navigation/native';
import { baseurl } from "../../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RouteParams {
    job_id?: string; // Make job_id optional
    // Other properties if there are any
  }

type Props = {
    navigation: NavigationProp<ParamListBase, "Steps">;
    route: RouteProp<ParamListBase, "Steps">;
  };

const Steps: React.FC<Props> = ({ navigation, route }) => {

    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.15;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9;
    const leftOffset = windowWidth * 0.4;
    const viewheight = windowHeight * 0.4;

    const goto = () => {
        navigation.navigate('Phase2');
    }
 
const { job_id }: RouteParams = route.params || {}; 

  console.log(job_id, "Steps");
  const [phase1, setphase1] = useState(false)
    const [phase2, setphase2] = useState(false)
    const [phase3, setphase3] = useState(false)
    const [phase4, setphase4] = useState(false)
    const [phase5, setphase5] = useState(false)
    const [phase6, setphase6] = useState(false)

    const { height } = Dimensions.get('window');
const itemCount = 7;
const gap = (height - (itemCount * 90)) / (itemCount + 1);


      const [orderid,setorderid]=useState()



    const Go_To_Created_Job=()=>{

        navigation.navigate("Phase1",{ job_id:job_id  })

    }

    const Go_To_Visiting_Vendors=()=>{

        navigation.navigate("Phase_Select_Vendor",{ job_id:job_id  })

    }

    const Go_To_Select_Vendor=()=>{

        navigation.navigate("Phase2",{ job_id:job_id  })

    }



    const Go_To_Select_Quotes=()=>{

        navigation.navigate("Phase3",{ job_id:job_id  })

    }



    const Go_To_Payment=()=>{

        navigation.navigate("Payment",{ job_id:job_id  })

    }

    const navigation1 = useNavigation();

    const Go_To_Chat=()=>{

        navigation.navigate("Welcome_Job",{ job_id:job_id  })

    }


    const Go_To_Review=()=>{

        navigation.navigate("ReviewScreen",{ job_id:job_id  })

    }

    const goto1 = () => {
        navigation.navigate('Total_Jobs');
    }






  const handleSignUp = async () => {
    try {
        const response = await fetch(`${baseurl}/getjobdetails/${job_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // No need to include a body for GET requests
        });
    
        if (response.ok) {
            const data = await response.json();
            console.log('Success STEPS:', data.Job_details);
            setorderid(data.Job_details.Order_Id)

              if(data.Job_details.phase==="Currently in Pick a Vendor Phase")
                {
                    setphase2(true)

                }      

                if(data.Job_details.phase==="Currently in a Vendor Visit Phase" || data.Job_details.phase==="Quotes Created"  || data.Job_details.phase==="Quotes Selected")
                    {
                        setphase2(true)
                        setphase3(true)
    
                    }      

                    if(data.Job_details.phase==="Pay the Vendor")
                        {
                           setphase2(false)
                            setphase3(false)
                            setphase4(true)
        
                        }   
                        
                        if(data.Job_details.phase==="Chat Now And Review")
                            {
                                setphase2(false)
                                setphase3(false)
                                setphase4(false)
                                setphase5(true)
                                setphase6(true)
            
                            }    
        
    


           
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

useFocusEffect(
    React.useCallback(() => {
        Fetch_JOb_Records();
    }, [])
  );


const Fetch_JOb_Records = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const requestData = {
         
      user_id:userId
        
       
        

        
    };

    console.log(requestData,"REQ STEPS")

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
            console.log('Success STEPSSS:', data);

             

            

            // await AsyncStorage.removeItem('userId');
            

            

         

            console.log(userId,"ASYNC STORAGE")
          
        } else {
            console.error('Error TS:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};






useEffect(()=>{
        handleSignUp()
       

},[])




  return (
      <View style={[styles.container, { height: windowHeight }]}>
                <SafeAreaView>


                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center' }}>
                    
                    <TouchableOpacity onPress={goto1}>

                    <Image
                        source={require('../../assets/images/back-button.png')}
                        style={styles.logo}
                    />
                    </TouchableOpacity>
                    
                    <Text style={{ color: '#A3A3A3', fontSize: 20, fontWeight: 'bold', paddingLeft: 40 }}>
                        Order ID : {orderid}
                    </Text>
                    {/* <TouchableOpacity style={{ left: leftOffset }} onPress={goto}>
                        <Text style={{ color: '#A3A3A3', fontSize: 12, fontWeight: '600' }}>
                            Create a Job
                        </Text>
                    </TouchableOpacity> */}
                </View>

                <ScrollView>

<View style={{ flexDirection: 'row', width: '100%', alignItems: 'center',display:'flex',justifyContent:'space-between' }}>


{/* <Image

source={require('../../assets/images/ss.png')}
        style={styles.logo1}

/> */}

<View style={{flexDirection:'column' , gap:gap,marginTop:10}}>

    <View  style={{flexDirection:'row'}}>

    <View style={{flexDirection:'column' ,zIndex:1,width:32}}>
        
    <Image

source={require('../../assets/images/Frame48097459.png')}
        style={styles.logo1}

/>
{/* 
<Image

source={require('../../assets/images/danda.png')}
        style={styles.logo}

/> */}

    </View>




<View style={{  flexDirection:'row'}}>
    
<Image

source={require('../../assets/images/arrowpoint.png')}
        style={styles.logo}

/>

 

    <View style={{backgroundColor:'#292626' ,width:270,height:70,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <View style={{flexDirection:'row',width:285,height:60,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <Text style={{color:'#D9D9D9',fontSize:18,fontStyle:"normal",marginTop:10,fontWeight:'bold'}}>
    Create Job
    </Text>

    <View>

    <TouchableOpacity style={{backgroundColor:'#B22235',width:60,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={Go_To_Created_Job}>
    
    <Text style={{color:'white'}}>
        View
    </Text>

    </TouchableOpacity>

    </View>

    </View>


<View style={{justifyContent:'flex-start',flexDirection:'row',paddingBottom:10,paddingLeft:20}}>

    <Text style={{color:'#A3A3A3'}}>
    Successfully created a job
    </Text>
</View>


    </View>



    

    

 




</View>
    </View>





    <View  style={{flexDirection:'row'}}>

    <View style={{flexDirection:'column'  ,zIndex:1,width:32}}>
        
    <Image

source={require('../../assets/images/step2.png')}
        style={styles.logo1}

/>
{/* 
<Image

source={require('../../assets/images/danda.png')}
        style={styles.logo}

/> */}

    </View>



<View style={{ flexDirection:'row'}}>
    
<Image

source={require('../../assets/images/arrowpoint.png')}
        style={styles.logo}

/>

 

    <View style={{backgroundColor:'#292626' ,width:270,height:70,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <View style={{flexDirection:'row',width:285,height:60,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <Text style={{color:'#D9D9D9',fontSize:18,fontStyle:"normal",marginTop:10,fontWeight:'bold'}}>
    Select Vendor
    </Text>

    <View>

        {
            phase2 &&
    <TouchableOpacity style={{backgroundColor:'#B22235',width:60,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={Go_To_Select_Vendor}>
    
    <Text style={{color:'white'}}>
        View
    </Text>

    </TouchableOpacity>
        }


    </View>

    </View>


<View style={{justifyContent:'flex-start',flexDirection:'row',paddingBottom:10,paddingLeft:20}}>

    <Text style={{color:'#A3A3A3'}}>
    Select vendor for your suitablity
    </Text>
</View>


    </View>



    

    

 




</View>

    </View>

    
    <View  style={{flexDirection:'row'}}>

<View style={{flexDirection:'column' ,zIndex:1,width:32}}>
    
<Image

source={require('../../assets/images/1.1.png')}
    style={styles.logo1}

/>
{/* 
<Image

source={require('../../assets/images/danda.png')}
    style={styles.logo}

/> */}

</View>




<View style={{  flexDirection:'row'}}>

<Image

source={require('../../assets/images/arrowpoint.png')}
    style={styles.logo}

/>



<View style={{backgroundColor:'#292626' ,width:270,height:70,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

<View style={{flexDirection:'row',width:285,height:60,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

<Text style={{color:'#D9D9D9',fontSize:18,fontStyle:"normal",marginTop:10,fontWeight:'bold'}}>
Visiting Vendors
</Text>

<View>


{
            phase2 &&
<TouchableOpacity style={{backgroundColor:'#B22235',width:60,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={Go_To_Visiting_Vendors}>

<Text style={{color:'white'}}>
    View
</Text>

</TouchableOpacity>

}

</View>

</View>


<View style={{justifyContent:'flex-start',flexDirection:'row',paddingBottom:10,paddingLeft:20}}>

<Text style={{color:'#A3A3A3'}}>
{/* Successfully created a job */}
</Text>
</View>


</View>












</View>
</View>



    <View  style={{flexDirection:'row'}}>

    <View style={{flexDirection:'column'  ,zIndex:1,width:32}}>
        
    <Image

source={require('../../assets/images/step3.png')}
        style={styles.logo1}

/>
{/* 
<Image

source={require('../../assets/images/danda.png')}
        style={styles.logo}

/> */}

    </View>



<View style={{ flexDirection:'row'}}>
    
<Image

source={require('../../assets/images/arrowpoint.png')}
        style={styles.logo}

/>

 

    <View style={{backgroundColor:'#292626' ,width:270,height:70,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <View style={{flexDirection:'row',width:285,height:60,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <Text style={{color:'#D9D9D9',fontSize:18,fontStyle:"normal",marginTop:10,fontWeight:'bold'}}>
    Quotes Created
    </Text>

    <View>


    {
        phase3 &&

    <TouchableOpacity style={{backgroundColor:'#B22235',width:60,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={Go_To_Select_Quotes}>
    
    <Text style={{color:'white'}}>
        View
    </Text>

    </TouchableOpacity>
    }

    </View>

    </View>


<View style={{justifyContent:'flex-start',flexDirection:'row',paddingBottom:10,paddingLeft:20}}>

    <Text style={{color:'#A3A3A3'}}>
    Decide between Quotes.
    </Text>
</View>


    </View>



    

    

 




</View>

    </View>



    <View  style={{flexDirection:'row'}}>

    <View style={{flexDirection:'column'  ,zIndex:1,width:32}}>
        
    <Image

source={require('../../assets/images/step4.png')}
        style={styles.logo1}

/>
{/* 
<Image

source={require('../../assets/images/danda.png')}
        style={styles.logo}

/> */}

    </View>



<View style={{ flexDirection:'row'}}>
    
<Image

source={require('../../assets/images/arrowpoint.png')}
        style={styles.logo}

/>

 

    <View style={{backgroundColor:'#292626' ,width:270,height:70,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <View style={{flexDirection:'row',width:285,height:60,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <Text style={{color:'#D9D9D9',fontSize:18,fontStyle:"normal",marginTop:10,fontWeight:'bold'}}>
    Pay for the Job
    </Text>

    <View>

        {
            phase4 &&
    <TouchableOpacity style={{backgroundColor:'#B22235',width:60,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={Go_To_Payment}>
    
    <Text style={{color:'white'}}>
        View
    </Text>

    </TouchableOpacity>
        }


    </View>

    </View>


<View style={{justifyContent:'flex-start',flexDirection:'row',paddingBottom:10,paddingLeft:20}}>

    <Text style={{color:'#A3A3A3'}}>
    Payment Goes to Escrow until Job Completion.
    </Text>
</View>


    </View>



    

    

 




</View>

    </View>



    <View  style={{flexDirection:'row'}}>

    <View style={{flexDirection:'column'  ,zIndex:1,width:32}}>
        
    <Image

source={require('../../assets/images/step5.png')}
        style={{
            height:50,
            width:50,
            resizeMode:'contain',
            left: 5,
        zIndex:1
        }}

/>
{/* 
<Image

source={require('../../assets/images/danda.png')}
        style={styles.logo}

/> */}

    </View>



<View style={{ flexDirection:'row'}}>
    
<Image

source={require('../../assets/images/arrowpoint.png')}
        style={styles.logo}

/>

 

    <View style={{backgroundColor:'#292626' ,width:270,height:70,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <View style={{flexDirection:'row',width:285,height:60,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

    <Text style={{color:'#D9D9D9',fontSize:18,fontStyle:"normal",marginTop:10,fontWeight:'bold'}}>
    Chat with Vendor
    </Text>

    <View>


{
    phase5 &&

    <TouchableOpacity style={{backgroundColor:'#B22235',width:60,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={Go_To_Chat}>
    
    <Text style={{color:'white'}}>
        View
    </Text>

    </TouchableOpacity>
}

    </View>

    </View>


<View style={{justifyContent:'flex-start',flexDirection:'row',paddingBottom:10,paddingLeft:20}}>

    <Text style={{color:'#A3A3A3'}}>
   Communicate with vendor about job
    </Text>
</View>


    </View>



    

    

 




</View>

    </View>








    <View  style={{flexDirection:'row'}}>

<View style={{flexDirection:'column'  ,zIndex:1,width:32}}>
    
<Image

source={require('../../assets/images/step6.png')}
    style={styles.logo1}

/>
{/* 
<Image

source={require('../../assets/images/danda.png')}
    style={styles.logo}

/> */}

</View>



<View style={{ flexDirection:'row'}}>

<Image

source={require('../../assets/images/arrowpoint.png')}
    style={styles.logo}

/>



<View style={{backgroundColor:'#292626' ,width:270,height:70,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

<View style={{flexDirection:'row',width:285,height:60,justifyContent:"space-around",borderRadius:2,marginRight:10}}>

<Text style={{color:'#D9D9D9',fontSize:18,fontStyle:"normal",marginTop:10,fontWeight:'bold'}}>
Review The Vendor
</Text>

<View>

    {

        phase6 &&
<TouchableOpacity style={{backgroundColor:'#B22235',width:60,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10}} onPress={Go_To_Review}>

<Text style={{color:'white'}}>
    View
</Text>

</TouchableOpacity>
    }


</View>

</View>


<View style={{justifyContent:'flex-start',flexDirection:'row',paddingBottom:10,paddingLeft:20}}>

<Text style={{color:'#A3A3A3'}}>
How was your experience?
</Text>
</View>


</View>












</View>

</View>






 


</View>








</View>


</ScrollView>

        </SafeAreaView>
                </View>


               
            
  );
};

const styles = StyleSheet.create({
    input: {
        height: 62,
        width: 335,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#4D4D4D',
        color: '#A3A3A3',
        borderRadius: 15
    },
    container: {
        backgroundColor: '#13171B',
        alignItems: "center",
        position: 'relative',
         
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        left: 10
    },
    logo1: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        left: 10,
        zIndex:1
       
    },
    button: {
        backgroundColor: '#B22235',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 40,
    },
    button1: {
        backgroundColor: '#FF5954',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 40,
    },
    buttonText: {
        color: "#A3A3A3",
        fontSize: 16,
        fontWeight: "bold",
    },
    scroll_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    job_container: {
        height: undefined,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: '#A3A3A3',
        fontWeight: 'bold'
    },
    text1: {
        fontSize: 12,
        color: '#A3A3A3'
    },
    job_photo: {
        borderRadius: 10
    },
    location_logo: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        left: 10
    },
    location_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginTop: 10
    },
    available_container: {
        marginTop: 10
    }
});

export default Steps;
