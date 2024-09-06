import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Phase1 from "../Job_Screens/Phase1";
import Phase2 from "../Job_Screens/Phase2";
import Phase3 from "../Job_Screens/Phase3";
import { RouteProp, NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { baseurl } from "../../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RouteParams {
    vendor_id?: string; 
    jobId?:string;// Make job_id optional
    // Other properties if there are any
  }

  interface Vendor_data {

    gig_image: string;
    gig_title: string;
    travelling_cost:string;
    gig_discription:string;


  }

type Props = {
    navigation: NavigationProp<ParamListBase, "Steps">;
    route: RouteProp<ParamListBase, "Steps">;
  };

const View_Quote: React.FC<Props> = ({ navigation, route }) => {

    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.15;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9;
    const leftOffset = windowWidth * 0.4;
    const viewheight = windowHeight * 0.4;

    const [Vendor_data,setVendor_data]=useState<Vendor_data[]>([])

    const goto = () => {
        navigation.navigate('Phase2');
    }
 
const { vendor_id , jobId }: RouteParams = route.params || {}; 

  console.log(vendor_id,jobId, "Vendor_ID Ts");
 

    const { height } = Dimensions.get('window');
const itemCount = 6;
const gap = (height - (itemCount * 90)) / (itemCount + 1);


       



   

    const goto1 = () => {
        navigation.navigate('Phase3');
    }






    const handleSignUp = async () => {
        const requestData = {
             
            vendor_id: vendor_id,
            job_id:jobId
            
    
            
        };
    
        console.log(requestData,"REQ")
    
        try {
            const response = await fetch(`${baseurl}/view_vendor_quote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Quote:', data);

                setVendor_data(data)
    
                
    
                // await AsyncStorage.removeItem('userId');
                 
    
               
              
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
                    
                    <Text style={{ color: '#A3A3A3', fontSize: 20, fontWeight: 'bold', paddingLeft: 20 }}>
                       View Quote
                    </Text>
                   
                </View>

                <ScrollView>

    <View>

    


    <View style={{flexDirection:'column',gap:10,justifyContent:'center',alignItems:'center',padding:20,paddingBottom:paddingBottom}}>

    <Text style={styles.input1}>
         Vendor Name:
        </Text>
        <Text style={styles.input}>
         {Vendor_data.Vendor_Name}
        </Text>

        <Text style={styles.input1}>
         Job Description:
        </Text>

        <Text style={styles.input}>
       {Vendor_data.shedule_descriptions}
        </Text>

        <Text style={styles.input1}>
          Amount Of Time Job Will Take:
        </Text>

        <Text style={styles.input}>
           {Vendor_data.jobtime}
        </Text>

        <Text style={styles.input1}>
           Price: 
        </Text>

        <Text style={styles.input}>
           {Vendor_data.vendorBudget}
        </Text>
    </View>



    </View>


</ScrollView>

        </SafeAreaView>
                </View>


               
            
  );
};

const styles = StyleSheet.create({
    input: {
        fontSize:18,
        color: '#A3A3A3',
         
    },
    input1: {
        fontSize:20,
        color: '#A3A3A3',
        fontWeight:'bold'
         
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

export default View_Quote;
