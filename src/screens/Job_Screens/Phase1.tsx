import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseurl } from "../../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from 'react-native-snap-carousel';
import ImageSlider from "./ImageSlider";

interface JobDetails {
    [x: string]: ReactNode;
    _id: string;
    selected_queries: string;
    phase: string;
    location: string;
    availablity_time: Array<{ date: string, times: Array<string> }>; // Assuming each availability time has a date and times array
    images: Array<string>;
    details: string;
}

const Phase1 = ({ navigation, jobID }: any) => {
    

    const windowHeight = Dimensions.get('window').height;
    const paddingBottom = windowHeight * 0.15;
    const windowWidth = Dimensions.get('window').width;
    const viewWidth = windowWidth * 0.9;
    const leftOffset = windowWidth * 0.4;
    const viewheight = windowHeight * 0.4;

    const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);

    const fetchJobDetails = async () => {
        try {

            const async_job_id = await AsyncStorage.getItem('async_job_id');

            const response = await fetch(`${baseurl}/getjobdetails/${async_job_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success: PHASE 1', data.Job_details);
                setJobDetails(data.Job_details);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchJobDetails();
    }, []);

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


      const renderItem = ({ item }) => (
        <View style={styles.slide}>
          <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
      );



    return (
<View style={{backgroundColor:'#13171B'}}>


        <SafeAreaView>
            <View style={[styles.container, { height: windowHeight }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', marginTop: 10 }}>
                   
                   <TouchableOpacity onPress={handleBackPress}>

                    <Image
                        source={require('../../assets/images/back-button.png')}
                        style={styles.logo}
                    />
                   </TouchableOpacity>
                    <Text style={{ color: '#A3A3A3', fontSize: 20, fontWeight: 'bold', paddingLeft: 40 }}>
                    Create a Job
                    </Text>
                    {/* <TouchableOpacity style={{ left: leftOffset }} onPress={goto}>
                        <Text style={{ color: '#A3A3A3', fontSize: 12, fontWeight: '600' }}>
                            Create a Job
                        </Text>
                    </TouchableOpacity> */}
                </View>

                <View style={[styles.job_container, { marginTop: 15, paddingBottom }]}>
                    {jobDetails && (
                        <>
                        
                        {jobDetails.images?
                    //         ( <Image
                                    

                    //             source={{ uri: jobDetails.images[0] }}
                            

                    //     style={[styles.job_photo, { width: viewWidth, height: viewheight }]}
                    // />

                    
(


    <View style={{height:250}}>

        <ImageSlider images={jobDetails.images} />      

        {/* <Image
      source={{ uri: jobDetails.images[0] }}
      style={{height:150,
        width:150
      }}
/> */}

    </View>
                
                
                
                
                )
                    
                    
                    
                    
                    :( <Image
                                    

                        source={require('../../assets/images/job_photo.png')}
                    

                style={[styles.job_photo, { width: viewWidth, height: viewheight }]}
            />)

} 






 



                           {/*  */}
                        
                            <View style={{ flexDirection: 'column', justifyContent: 'center', paddingLeft: 10, paddingStart: 10 }}>
                                <Text style={{ color: '#D9D9D9', fontSize: 20, fontWeight: 'bold' }}>
                                    {jobDetails.selected_queries}
                                </Text>
                            </View>
                            <ScrollView>
                                <View style={{ flexDirection: 'column', justifyContent: 'center', padding: 20 }}>
                                    <Text style={{ color: '#A3A3A3' }}>
                                        {jobDetails.details}
                                    </Text>
                                    <View style={styles.location_container}>
                                        <Image
                                            source={require('../../assets/images/location.png')}
                                            style={styles.location_logo}
                                        />
                                        <Text style={{ color: '#A3A3A3', fontSize: 18 }}>
                                            {jobDetails.location}
                                        </Text>
                                    </View>
                                    <View style={styles.available_container}>
                                        <Text style={{ color: '#A3A3A3', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                                            Availability:
                                        </Text>
                                        {jobDetails.availablity_time.filter(e=>e.date!="2000-01-01").map((e, i) => (
   

                                            <View style={{ flexDirection: 'row', gap: 20, paddingLeft: 10 }} key={i}>


                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                    <Image
                                                        source={require('../../assets/images/time.png')}
                                                        style={{ width: 30, height: 30 }}
                                                    />
                                                    <Text style={{ color: '#A3A3A3', fontSize: 18 }}>
                                                        {/* {e.times[0]} */}
                                                        {e.date==="2000-01-01"?'---':formatTime(e.times[0])}
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                    <Image
                                                        source={require('../../assets/images/calendar.png')}
                                                        style={{ width: 30, height: 30 }}
                                                    />
                                                    <Text style={{ color: '#A3A3A3', fontSize: 18 }}>
                                                    {e.date==="2000-01-01"?"---":  formatDate(e.date)}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}


                                        <View>
                                            {
                                                jobDetails.availablity_time[0].date==="2000-01-01"
                                                &&  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                <Image
                                                    source={require('../../assets/images/calendar.png')}
                                                    style={{ width: 30, height: 30 }}
                                                />
                                                <Text style={{ color: '#A3A3A3', fontSize: 18 }}>
                                               {jobDetails.amount}
                                                </Text>
                                            </View>
                                            }
                                        </View>


                                    </View>
                                </View>
                            </ScrollView>
                        </>
                    )}
                </View>
            </View>
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
        position: 'relative'
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        left: 10
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

export default Phase1;





 