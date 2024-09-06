import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Text, ImageBackground,ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../../BaseUrl";
import { useFocusEffect } from "@react-navigation/native";
import { PopupModal } from "./Modal";
 

interface Rewards{

  Order_Id: String;
  Service: String;
  coupon_code: String;
  voucher_taken: String;
}


const Coming_Soon: React.FC = ({ navigation }: any) => {
  
  const windowHeight = Dimensions.get('window').height;
  const paddingBottom = windowHeight * 0.19   ;// Get the height of the window

  // Function to handle navigation to the Splash_Screen
  const goToSplashScreen = () => {
    navigation.navigate('Signup');
  };

  const [points,setpoints]= useState("0")
  const [dol,setdol]= useState("0")
  const [dol1,setdol1]= useState("0")
  const [Rewards,setRewards]= useState<Rewards[]>([])
  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };


  useFocusEffect(
    React.useCallback(() => {
      Get_Rewards();
      Get_Points();
    }, [])
  );


  const Cal_Dollar_Amounts = async (p: any) => {
    const requestData = {
         
        points:p
        

        
    };

    console.log(requestData,"REQ")

    try {
        const response = await fetch(`${baseurl}/calculate-dollars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dollar Value', data.dollars);
 
            setdol(data.dollars)

            setModalVisible1(true)

           
          
        } else {
            console.error('Error TS:', response.statusText);

             
        }
    } catch (error) {
        console.error('Error:', error);
        
    }
};



  const Get_Rewards = async () => {
    try {

      


        const User_ID = await AsyncStorage.getItem('userId');
        console.log(User_ID, "REQ");

        if (!User_ID) {
            console.error('No jobId found in AsyncStorage');
            return;
        }

        const response = await fetch(`${baseurl}/getrewards/${User_ID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:REWARDS', data.Rewards);

            setRewards(data.Rewards)
     


             
             

            
             



             
        } else {
            console.error('Error TS:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


const Get_Points = async () => {
  try {

    


      const User_ID = await AsyncStorage.getItem('userId');
      console.log(User_ID, "REQ");

      if (!User_ID) {
          console.error('No jobId found in AsyncStorage');
          return;
      }

      const response = await fetch(`${baseurl}/getpoints/${User_ID}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Success:Points', data.Points);



          setpoints(data.Points)
   


           
           

          
           



           
      } else {
          console.error('Error TS:', response.statusText);
      }
  } catch (error) {
      console.error('Error:', error);
  }
};


const [coupon,setcoupon] = useState()


const Show_Reward=(e:any,p:any)=>{

console.log(e,p)

setcoupon(e)

setModalVisible(true)

setdol1(p)


}




const Handle_Redeem_Points = ()=>{

console.log(points.Points,"points")

Cal_Dollar_Amounts(points.Points)


}

const Create_Coupon = async () => {

  const User_ID = await AsyncStorage.getItem('userId');
  const requestData = {
       
      Customer_ID: User_ID,
      budget:dol,
      voucher_taken:"0"
      

      
  };

  console.log(requestData,"REQ")

  try {
      const response = await fetch(`${baseurl}/create-coupon`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Coupon Created', data);

          Get_Rewards()
          Get_Points()
          

         
        
      } else {
          console.error('Error TS:', response.statusText);

           
      }
  } catch (error) {
      console.error('Error:', error);
      
  }
};

 

const Callback_Points_Coupon_Response =(p:any)=>{

  console.log(p,dol,"RS")
  setModalVisible1(false)

  Create_Coupon()

}



  return (

    <View style={[styles.container, { height: windowHeight }]}>
           <SafeAreaView>
       



         
      <PopupModal isVisible={modalVisible} closeModal={closeModal}  coupon_code={coupon} content={`Congratulations! You've won a special coupon code just for you. Apply this code to enjoy a $${dol1} discount on your next job:`}/>
    



      <PopupModal isVisible={modalVisible1} closeModal={closeModal1}  coupon_code={`${dol}$`} content={`Are you Sure you want to redeem ${points.Points} points? You'll be getting this amount.` } show={true}
      redeem_points={Callback_Points_Coupon_Response}
      />



            <View style={{alignItems:'center',justifyContent:'center'}}>

      <View style={{width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:0,paddingRight:10}}>
             <Image
             source={require('../../assets/images/logo.png')}
             style={{width:200,height:80,resizeMode:'contain',marginBottom:10,marginTop:10}}
             />

          

      </View>

    
{/* <View style={{backgroundColor:'yellow',alignItems:'center',width:"100%",justifyContent:'center'}}>

     <ImageBackground
     source={require("../../assets/images/rr.png")}
     style={{width:"95%",height:150,alignItems:'center',marginLeft:20,flexDirection:'column'}}
     >

    <View style={{flexDirection:'column', backgroundColor:'red'}}>
      <Text
      style={{
        color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Urbanist',
    fontSize: 35,
    fontStyle: 'normal',
    fontWeight: 'bold',
      }}
      
      >
      Rewards
      </Text>

      <Text
      style={{
        color: '#FFF',
        fontFamily: 'Urbanist',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '500',
      }}
      
      >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Text>
    </View>


     </ImageBackground>
</View> */}

 

<View style={{backgroundColor:"#B22235",width:"90%",borderRadius:10,
  height:"auto",flexDirection:'row',justifyContent:'space-between',
  padding:20,alignItems:'center'
  
}}>
   
<View>
<Text
style={{
  color: '#FFF',
  textAlign: 'center',
  fontFamily: 'Urbanist',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: '600',
}}

>
{ points.Points?points.Points:"0"}
</Text>


<Text 
style={{
  color: '#FFF',
  textAlign: 'center',
  fontFamily: 'Urbanist', // Ensure this font is correctly linked in your project
  fontSize: 12, // No need for 'px', React Native interprets it as density-independent pixels
  fontStyle: 'normal',
  fontWeight: '500', 
}}
> 
Total Points
</Text>
</View>

<View style={{
  width: 1,           // Width of the line
  height: '100%',     // Height of the line (can also use a specific value)
  backgroundColor: 'white',
}} />



<Image
source={require('../../assets/images/rewardvector.png')}
style={{
  height:40,
  width:40,
  resizeMode:'contain'
}}

/>



<TouchableOpacity onPress={Handle_Redeem_Points}>
  <Text
  style={{
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Urbanist', // Make sure this font is linked correctly in your React Native project
    fontSize: 18, // React Native uses density-independent pixels (DIP) by default, no need for 'px'
    fontStyle: 'normal',
    fontWeight: '600',
  }}>
    Redeem Points
  </Text>
</TouchableOpacity>

</View>


{/* <ScrollView >
<View style={{
  
  gap:10,
  marginTop:10
}}>

{
  Rewards.map((e,i)=>(

  <View key={i} style={{
    width: 300,
    height: 100,
    borderRadius: 10, // border-radius: 10px;
    borderWidth: 1,   // border: 1px solid #B22235;
    borderColor: '#B22235',
    paddingLeft: 10,  // Optional: Add padding for better text positioning
    paddingRight: 10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
     
  }}>

    <View>


    <Text style={{color:'#B2BEB5',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:'bold'
            }}>
      {e.Order_Id}
    </Text>
    <Text style={{color:'#B2BEB5',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:'bold'
            }}>
      {e.Service}
    </Text>


    
      </View>

{
  e.voucher_taken==="0" ?(
    <TouchableOpacity onPress={()=>{Show_Reward(e.coupon_code)}} style={{

      backgroundColor:'#B22235',
      width:60,
      height:32,
      padding:10,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10
    }}>
      <Text style={{color:'white',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:'bold'
            }}>
        Claim
      </Text>
    </TouchableOpacity>
  ):(<TouchableOpacity   style={{

    backgroundColor:'#B2BEB5',
    width:60,
    height:32,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  }}>
    <Text style={{color:'white',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:'bold'
          }}>
      Expired
    </Text>
  </TouchableOpacity>)
   
}
</View>
  ))
}

</View>
  
 




          </ScrollView> */}

<ScrollView contentContainerStyle={{
  marginTop: 20,
  paddingHorizontal: 10, 
  alignItems:'center',
  
  
  
  
  
  
  // Optional: Add horizontal padding for better layout
}}>

  <View  style={{paddingBottom}}>

  
  {
   Rewards!=null && Rewards.filter((e)=>e.voucher_taken=="0").map((e, i) => (
      <View key={i} style={{
        width: '92%', // Use 100% width to occupy full width of ScrollView
        marginBottom: 10, // Optional: Add margin between each item
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#B22235',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <View>
          <Text style={{
            color: '#B2BEB5',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
           Claim your ${e.budget} coupon code
          </Text>
          
        </View>
        {
          e.voucher_taken === "0" ? (
            <TouchableOpacity onPress={() => { Show_Reward(e.coupon_code,e.budget) }} style={{
              backgroundColor: '#B22235',
              width: 60,
              height: 32,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
              <Text style={{
                color: 'white',
                fontSize: 10,
                fontWeight: 'bold',
              }}>
                Claim
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{
              backgroundColor: '#B2BEB5',
              width: 60,
              height: 32,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
              <Text style={{
                color: 'white',
                fontSize: 10,
                fontWeight: 'bold',
              }}>
                Expired
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    ))
  }

  {
    Rewards===null &&
    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',gap:50,width:"95%"}}>

      <Text 
      style={{
        color:'#B2BEB5',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:'bold',textAlign:'justify'
      }}
      >
      Explore your rewards here. Apply for a job to view the exclusive rewards available in this section.
      </Text>

    </View>




    
  }

</View>
</ScrollView>



<Image
source={require('../../assets/images/rewardpicgroup.png')}
style={{
  height:'45%',
  width:'100%'
}}


/>
            </View>

      
    </SafeAreaView>
    </View>
   
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#13171B',
    justifyContent: "center",
    alignItems: "center",
 
    position:'relative'
  },
  logo: {
    width: '90%', // Adjust the image width to be 80% of the parent container
    height: 300, 
    aspectRatio: 1, 
    resizeMode: "contain",
    
    
    // marginRight:130,
   
    
  },
  button: {
    width: '80%', // Make the button width 80% of the parent container
    padding: 13,
    backgroundColor: "#B22235",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Increase the margin for better spacing
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container2: {
    backgroundColor: '#13171B',
    width: '100%', // Make the container width 80% of the parent container
    alignItems: 'center', // Center the contents horizontally
    
    paddingVertical: 20, // Add vertical padding for better spacing
    borderTopLeftRadius:50 , // Add border radius for better appearance,
    borderTopRightRadius:50,
    flex:1,
    flexDirection:'column',
    justifyContent:'center'
    
    
  },
  text1:{
    color:'white',
    textAlign:'center',
    fontSize:25,
    fontStyle:'normal',
    fontWeight:'bold'
  }
  ,
  text_container:{
  
    width:289,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
   


  }
});

export default Coming_Soon;
