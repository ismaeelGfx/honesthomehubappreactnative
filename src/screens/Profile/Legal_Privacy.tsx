import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View,ScrollView,TouchableOpacity, BackHandler } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../../BaseUrl";

const Legal_Privacy = ({ navigation }: any)=>{

  
   
    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.09;
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

 const goTo=()=>{

    navigation.navigate("Customer_Profile_Section")
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
            
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',paddingLeft:80}}>
            Privacy Policy
            </Text>

            {/* <TouchableOpacity style={{ left: leftOffset }} >
                <Text style={{color:'#A3A3A3',fontSize:12,fontWeight:'600'}}>
                    Select Vendor
                </Text>
            </TouchableOpacity> */}

            </View>

        <View style={{marginTop:15,paddingBottom}}>
        <ScrollView> 

          

 <View>

            <Text style={{color:'#E2E2E2',padding:20,fontSize:14}}>
            Protecting your private information is our priority. This Statement of Privacy applies to honesthomehub.com, and Honest Home Hub and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to Honest Home Hub include honesthomehub.com. The Honest Home Hub website is a Home Services Marketplace site. By using the Honest Home Hub website, you consent to the data practices described in this statement.
            </Text>


            <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20}}>
            Collection of your Personal Information
            </Text>


            <Text style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
            In order to better provide you with products and services offered, Honest Home Hub may collect personally identifiable information, such as your:
            </Text>

            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                First and Last Name
                </Text>

               
            </View>

            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Mailing Address
                </Text>

               
            </View>


            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                E-mail Address
                </Text>

               
            </View>


            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Phone Number
                </Text>

               
            </View>




            <Text style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
            If you purchase Honest Home Hub's products and services, we collect billing and credit card information. This information is used to complete the purchase transaction.
            </Text>

            <Text style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:20}}>
            Honest Home Hub may also collect anonymous demographic information, which is not unique to you, such as your:
            </Text>

            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Age
                </Text>

               
            </View>


            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Gender
                </Text>

               
            </View>



            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
            We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide certain personal information to us when you elect to use certain products or services. These may include: (a) registering for an account; (b) entering a sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special offers from selected third parties; (d) sending us an email message; (e) submitting your credit card or other payment information when ordering and purchasing products and services. To wit, we will use your information for, but not limited to, communicating with you in relation to services and/or products you have requested from us. We also may gather additional personal or non-personal information in the future.
                </Text>



                
            <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
            Use of your Personal Information
            </Text>

            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
            Honest Home Hub collects and uses your personal information to operate and deliver the services you have requested.
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:20}}>
                Honest Home Hub may also use your personally identifiable information to inform you of other products or services available from Honest Home Hub and its affiliates.
                </Text>


                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                Sharing Information with Third Parties
            </Text>

            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:5}}>
            Honest Home Hub does not sell, rent or lease its customer lists to third parties.
                </Text>


                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:5}}>
                Honest Home Hub may, from time to time, contact you on behalf of external business partners about a particular offering that may be of interest to you. In those cases, your unique personally identifiable information (e-mail, name, address, telephone number) is not transferred to the third party. Honest Home Hub may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to Honest Home Hub, and they are required to maintain the confidentiality of your information.
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:5}}>
                Honest Home Hub may disclose your personal information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on Honest Home Hub or the site; (b) protect and defend the rights or property of Honest Home Hub; and/or (c) act under exigent circumstances to protect the personal safety of users of Honest Home Hub, or the public.
                </Text>



                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                Tracking User Behavior
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            Honest Home Hub may keep track of the websites and pages our users visit within Honest Home Hub, in order to determine what Honest Home Hub services are the most popular. This data is used to deliver customized content and advertising within Honest Home Hub to customers whose behavior indicates that they are interested in a particular subject area.


                </Text>





                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                Automatically Collected Information
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            Information about your computer hardware and software may be automatically collected by Honest Home Hub. This information can include: your IP address, browser type, domain names, access times and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the Honest Home Hub website.


                </Text>




                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                Use of Cookies
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            The Honest Home Hub website may use "cookies" to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.

                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
                One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the Web server that you have returned to a specific page. For example, if you personalize Honest Home Hub pages, or register with Honest Home Hub site or services, a cookie helps Honest Home Hub to recall your specific information on subsequent visits. This simplifies the process of recording your personal information, such as billing addresses, shipping addresses, and so on. When you return to the same Honest Home Hub website, the information you previously provided can be retrieved, so you can easily use the Honest Home Hub features that you customized.
                </Text>


                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
                You have the ability to accept or decline cookies. Most Web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the Honest Home Hub services or websites you visit.
                </Text>





                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                Links
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            This website contains links to other sites. Please be aware that we are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.

                </Text>




                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                Right to Deletion
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            Subject to certain exceptions set out below, on receipt of a verifiable request from you, we will:

                </Text>

                <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Delete your personal information from our records.
                </Text>

               
            </View>


            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Direct any service providers to delete your personal information from their records.
                </Text>

               
            </View>

            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
            Please note that we may not be able to comply with requests to delete your personal information if it is necessary to:
                </Text>
                

                <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Complete the transaction for which the personal information was collected, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, provide a good or service requested by you, or reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform a contract between you and us.
                </Text>

               
            </View>
            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity; or prosecute those responsible for that activity.

                </Text>

               
            </View>
            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Debug to identify and repair errors that impair existing intended functionality.
                </Text>

               
            </View>
            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Comply with the California Electronic Communications Privacy Act.
                </Text>

               
            </View>
            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when our deletion of the information is likely to render impossible or seriously impair the achievement of such research, provided we have obtained your informed consent.
                </Text>

               
            </View>
            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Enable solely internal uses that are reasonably aligned with your expectations based on your relationship with us.
                </Text>

               
            </View>
            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Comply with an existing legal obligation.
                </Text>

               
            </View>
            <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
                <Text style={{color:'#E2E2E2',}}>
                •
                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20}}>
                Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which you provided the information.
                </Text>

               
            </View>



            <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
            Children Under Thirteen
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            Honest Home Hub does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this website.

                </Text>


                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                E-mail Communications
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            From time to time, Honest Home Hub may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations, surveys, andor other general communication. In order to improve our Services, we may receive a notification when you open an email from Honest Home Hub or click on a link therein.


                </Text>

                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
                If you would like to stop receiving marketing or promotional communications via email from Honest Home Hub, you may opt out of such communications by honesthomehub@gmail.com.

                </Text>





                
                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                External Data Storage Sites
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            We may store your data on servers provided by third party hosting vendors with whom we have contracted.


                </Text>




                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                Changes to this Statement
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            Honest Home Hub reserves the right to change this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account, by placing a prominent notice on our website, and/or by updating any privacy information. Your continued use of the website and/or Services available after such modifications will constitute your: (a) acknowledgment of the modified Privacy Policy; and (b) agreement to abide and be bound by that Policy.




                </Text>



                <Text style={{color:'#E2E2E2',fontSize:20,paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:20}}>
                Contact Information
            </Text>


            <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
            Honest Home Hub welcomes your questions or comments regarding this Statement of Privacy. If you believe that Honest Home Hub has not adhered to this Statement, please contact Honest Home Hub at:




                </Text>

                 


                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
                Honest Home Hub{'\n'}
704 Wheaton Ct{'\n'}
 
Allen, Texas 75013




                </Text>


                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10}}>
                Email Address:{'\n'}
                honesthomehub@gmail.com{'\n'}
 
 




                </Text>



                <Text  style={{color:'#E2E2E2',fontSize:14,paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:150}}>
                Telephone Number:{'\n'}
                4692233255{'\n'}
 
 




                </Text>
            




 </View>



 


         




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


export default Legal_Privacy