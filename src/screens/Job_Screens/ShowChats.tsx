import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View,ScrollView,TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Show_Chats = ({ navigation }: any)=>{

  

    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.15;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9; // 80% of the screen width

      const goto=()=>{

        navigation.navigate('Customer_Profile_Section');

      }
  
      const Vendors = [
        { id: 11111, category: 'Plumbing',name:'George Wrangler' },
        { id: 22222, category: 'Landscaping',name:'Washington' },
        { id: 33333, category: 'Modeling',name:'Alex Chris' },
        { id: 44444, category: 'Fencing' ,name:'Chris'},
        { id: 55555, category: 'HVAC' ,name:'Azhar'},
        { id: 555552, category: 'Water Heater', name:'Ahti' },
        { id: 11111, category: 'Plumbing',name:'George Wrangler' },
        { id: 22222, category: 'Landscaping',name:'Washington' },
        { id: 33333, category: 'Modeling',name:'Alex Chris' },
        { id: 44444, category: 'Fencing' ,name:'Chris'},
        { id: 55555, category: 'HVAC' ,name:'Azhar'},
        { id: 555552, category: 'Water Heater', name:'Ahti' }
      ];
      
    

    return(

            <SafeAreaView>
                
                    
                
        <View  style={[styles.container, { height: windowHeight }]}>

            <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%',alignItems:'center',marginTop:10}}>

              <TouchableOpacity onPress={goto}>
              {/* <Image
                source={require('../../assets/images/back-button.png')}  
                style={[styles.logo]}  
                
                
                /> */}
              </TouchableOpacity>
            
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingLeft:40}}>
                Chats   
            </Text>

            </View>

        <View style={{marginTop:15,paddingBottom}}>
        <ScrollView> 

          {

Vendors.map((e,i)=>(



              <View key={i} style={[styles.job_container, { width: viewWidth }]}>


                <TouchableOpacity onPress={goto}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'row',gap:10,alignItems:'center'}}>

 <Image
        source={require('../../assets/images/dot.png')}  
        style={[styles.logo]}  
        
        
        />

<Text style={[styles.text]} >
{e.name}
</Text>

</View>

{/* <Text style={[styles.text]} >
{e.id}
</Text> */}
</View>
                </TouchableOpacity>
                
   

    {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={[styles.text1]}>
        Category
        </Text>

        <Text style={[styles.text1]}>
        {e.category}
        </Text>
    </View> */}




</View>

            ))
          }




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
                      width: 20, // Adjust the image width to be 80% of the parent container
                      height: 20, 
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

    }
  
  });


export default Show_Chats