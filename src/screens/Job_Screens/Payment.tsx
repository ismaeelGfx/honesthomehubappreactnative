import React, { ReactNode, useEffect, useState } from 'react';
import { View, Button, Alert, Text, StyleSheet, Dimensions, Image ,TouchableOpacity, BackHandler,TextInput, KeyboardAvoidingView} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { baseurl } from '../../BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
 
 

// Define a type for card details
interface CardDetails {
  complete: boolean;
  brand?: string;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  cvc?: string;
  postalCode?: string;
  number?: string; // Adjusted type to be optional and string for card number
  
}

interface Vendors {
  e: string | undefined;
  gig_image: string | undefined;
  jobtime: any;
  vendorBudget: number;
  Order_Id: string;
  selected_queries: string;
  phase: string;
  _id:string;
  Vendor_Name:string;
  scheduleId:string;
  status:string;
  jobId:string;
}

const Payment: React.FC = ({ navigation }: any) => {
  const [cardComplete, setCardComplete] = useState<CardDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { confirmPayment } = useStripe();
  const [price, setprice] = useState<string | null>(null);
  const [price1, setprice1] = useState<string | any>(null);

  const [price_final, setprice_final] = useState<string | any>(null);
  const [price_final1, setprice_final1] = useState<string | any>(null);
  const [coupon_id, setcoupon_id] = useState<string | null>(null);

  



  const windowHeight = Dimensions.get('window').height;
  const paddingBottom = windowHeight * 0.15;
  const windowWidth = Dimensions.get('window').width;
  const viewWidth = windowWidth * 0.9; // 80% of the screen width
  const leftOffset = windowWidth * 0.4;
  const [jobID,setjobID]= useState<string | null>(null);
  const [Vendors, setVendors] = useState<Vendors[]>([]);
  const [coupon_status,setcoupon_status]=useState(false)

  const [coupon_code, onChangeCouponCode] = React.useState('');
  
  // const goTo =()=>{
  //   navigation.navigate("Steps")
  // }


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




  useEffect(() => {
    const fetchData = async () => {
        try {
        
            const budget = await AsyncStorage.getItem('budget');
            
             
            setprice(budget+"00")
            setprice1(budget)

            console.log(' payment:', price);
             
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
        }
    };

    fetchData();
}, []);

 


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




const updatescheduleandcustomerjob = async () => {

  const schedule_id = await AsyncStorage.getItem('Schedule_id');
  const jobId = await AsyncStorage.getItem('async_job_id');


  const requestData = {
       
     J_ID:jobId,
     schedule_id:schedule_id
      

      
  };

  console.log(requestData,"REQ")

  try {
      const response = await fetch(`${baseurl}/updatescheduleandcustomerjob`, {
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
            text1:'Payment Done Successfully.'
          })


          setTimeout(() => {
          
            navigation.navigate('Total_Jobs')
          }, 1000);
          navigation.navigate("Total_Jobs")

           

         
        
      } else {
          console.error('Error TS:', response.statusText);

           
      }
  } catch (error) {
      console.error('Error:', error);
  }
};


const create_reward = async () => {
  const userId = await AsyncStorage.getItem('userId');
  const schedule_id = await AsyncStorage.getItem('Schedule_id');
  const jobId = await AsyncStorage.getItem('async_job_id');
  const budget = await AsyncStorage.getItem('budget');


  const requestData = {
    Customer_ID:userId,
    Job_ID:jobId,
    budget:budget,   
    voucher_taken:"0"

      
  };

  console.log(requestData,"REQ")

  try {
      const response = await fetch(`${baseurl}/createrewards`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Success Login:', data);

         


        
           

         
        
      } else {
          console.error('Error TS:', response.statusText);

           
      }
  } catch (error) {
      console.error('Error:', error);
  }
};


const check_coupon_code = async () => {
   
  
console.log(coupon_code)
 
   

  const requestData = {
       
    coupon_code:coupon_code
      

      
  };

  console.log(requestData,"REQ")

  try {
    


      const response = await fetch(`${baseurl}/checkcoupon`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Code_STATUS:', data.message);
          if(data.message===true )
          {

            handleRedeem_Coupon(data)
            setcoupon_status(data.message)

            Toast.show({
              type:'success',
              text1:'Code Applied Successfully'
            })


          }
          else if(data.message==="invalid"|| data.message===false){
            Toast.show({
              type:'error',
              text1:'Invalid Or Expire Code.'
            })

          }


          

          // await AsyncStorage.removeItem('userId');
         

          

           

          
        
      } else {
          console.error('Error TS:', response.statusText);
      }
  } catch (error) {
      console.error('Error:', error);
  }
};

const handleRedeem_Coupon=(e:any)=>{

  console.log(e.message,"REDDEM",e.check_valid._id,e.check_valid.budget)

  if(e.message===true)
  {
    // var a=  price1 * (1 - 2.5 / 100)

    var a=  price1 - parseInt(e.check_valid.budget)
    

    var b= Math.floor(a)
    console.log(a,b)
    setprice_final1(b)
    setprice_final(b+"00")
    setcoupon_id(e.check_valid._id)
  }
   

}

const handlePayPress = async () => {
  if (!cardComplete || !cardComplete.complete) {
    Alert.alert('Please enter complete card details');
    return;
  }

  console.log(cardComplete, "Card Details",price_final);

  try {
    // Fetch payment intent client secret from your backend
    const response = await fetch(`${baseurl}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // amount: price,
        amount:price_final!=null?price_final:price,
        // amount : price_final != null ? Math.floor(price_final)+"00" : price,


      }),
    });

    const { clientSecret } = await response.json();
    console.log(clientSecret, "Client Secret");

    // Confirm the payment with the payment method information
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails: {
        address: {
          postalCode: cardComplete.postalCode,
        },
      },
      paymentMethodType: 'Card',
      paymentMethod: {
        card: {
          number: cardComplete.number!,
          expMonth: cardComplete.expMonth!,
          expYear: cardComplete.expYear!,
          cvc: cardComplete.cvc!,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }
    if (paymentIntent) {
      // Alert.alert('Payment Successful');


       

      
      console.log('Payment successful', paymentIntent);

      if(price_final!=null)
      {
        create_reward()
        updatescheduleandcustomerjob()
        expire_coupon()
      }
      else{

        create_reward()
        updatescheduleandcustomerjob()
      }



    }
  } catch (error: any) {
    console.log(error.message);
    setError(error.message);
  }
};



const expire_coupon = async () => {
   
  
  console.log(coupon_code)
   
     
  
    const requestData = {
         
      coupon_id:coupon_id
        
  
        
    };
  
    console.log(requestData,"REQ")
  
    try {
      
  
  
        const response = await fetch(`${baseurl}/expirecoupon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
  
        if (response.ok) {
            const data = await response.json();
            console.log('Code_STATUS:', data.message);
            
  
   
  
  
            
  
            // await AsyncStorage.removeItem('userId');
           
  
            
  
             
  
            
          
        } else {
            console.error('Error TS:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };








  return (


<View style={{backgroundColor:"#13171B"}}>
    <SafeAreaView>




    <View  style={[styles.container1, { height: windowHeight }]}>
    

    <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20,alignItems:'center' }}
            enableAutomaticScroll={true}
            extraScrollHeight={20}  // Adjust this value as needed
            keyboardOpeningTime={250}  // Adjust this value as needed
            style={{
              
            }}
          >

      
    <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%',alignItems:'center',marginTop:10}}>

<TouchableOpacity onPress={handleBackPress} >
<Image
  source={require('../../assets/images/back-button.png')}  
  style={[styles.logo]}  
  
  
  />
</TouchableOpacity>

<Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingLeft:40}}>
  Pay For The Job
</Text>

 

</View>







    <View style={{marginBottom:0,marginTop:20}}>
    {Vendors.filter(e => e.status === 'selected' && e.jobId === jobID).map((e, i) => (

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

<Text style={{color:'#A3A3A3',fontSize:22}}>
{e.Vendor_Name}
</Text>


</View>


<View>
{/* <View style={{backgroundColor:'yellow' ,flexDirection:'row',alignItems:'center',gap:10}}> */}
<View style={{ flexDirection:'row',alignItems:'center',gap:10}}>


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
{/* Price: {e.vendorBudget} */}
Price: {coupon_status===true?price_final1:e.vendorBudget}
</Text>
</View>





</View>






</View>






</View>



</View>

))} 





  

    </View>





      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        
        }}
        cardStyle={{
          backgroundColor: '#D3D3D3',
          textColor: 'black',
          borderRadius:4
        }}
        style={styles.cardField}
        onCardChange={(cardDetails) => {
          console.log('Card Details:', cardDetails);
          setCardComplete(cardDetails.complete ? cardDetails : null); // Set cardComplete to cardDetails only if it's complete
        }}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* <Button onPress={handlePayPress} title="Pay" disabled={!cardComplete || !cardComplete.complete} /> */}


      
<View  style={[styles.job_container, { width: viewWidth }] } >

<Text style={{color:'#A3A3A3',fontSize:16,textAlign:'center'}}>
  The funds are held in escrow and are only released to the vendor upon successful completion of the job.
  </Text>
</View>


<View style={{flexDirection:'row'}}>


<KeyboardAvoidingView style={styles.input}
behavior='padding'>

<TextInput
        style={{width:100,height:50,color:'white',
          alignItems:'center',
          justifyContent:'center',
          paddingBottom:12
        }}
        onChangeText={onChangeCouponCode}
        value={coupon_code}
        placeholder='Enter Code'
        placeholderTextColor="white"
      
        
      />
        </KeyboardAvoidingView>

      <TouchableOpacity onPress={check_coupon_code} style={{
        backgroundColor: '#B22235',
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
        width:80,
        height:40,
        marginTop:20,
      }}>
        <Text style={{
          color:'white',
          fontWeight:"bold",
          
        }}>
          Redeem
          </Text>
      </TouchableOpacity>
</View>










      <TouchableOpacity  style={[styles.button, { width: viewWidth }]}   onPress={handlePayPress} title="Pay" disabled={!cardComplete || !cardComplete.complete}  >
<Text style={styles.buttonText}>Pay Now</Text>
</TouchableOpacity>

</KeyboardAwareScrollView>
    </View>






    </SafeAreaView>

</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor:'#13171B'
  },
  cardField: {
    width: '90%',
    height: 50,
    marginVertical: 30,
    
  },
  vendor_pic: {
    width: 80, // Adjust the image width to be 80% of the parent container
    height: 80, 
    // aspectRatio: 1, 
    resizeMode: "cover",
    // bottom:0,
    left:10,
    borderRadius:10
    
   
    
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },

  input: {
    height: 50,
    width:200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'#4D4D4D',
    color:'white',
    borderRadius:10,
    justifyContent:'center',
    
  
    
    
  },

  container1: {
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
                    marginTop:20
                    
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

export default Payment;