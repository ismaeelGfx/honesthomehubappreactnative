import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Dimensions, Image, BackHandler, KeyboardAvoidingView, Keyboard } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { baseurl } from '../../BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ReviewScreenProps {
  navigation: any;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ navigation }: any) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');


  const windowHeight = Dimensions.get('window').height;
  const paddingBottom = windowHeight * 0.15;
  const windowWidth = Dimensions.get('window').width;
  const viewWidth = windowWidth * 0.9;
  const leftOffset = windowWidth * 0.4;
  const viewheight = windowHeight * 0.4;

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
  




  const handleSubmit = (): void => {
    if (rating === 0 || review === '') {
      Alert.alert('Error', 'Please provide a rating and a review.');
      return;
    }

    // Handle the submission of the review
    console.log('Rating:', rating);
    console.log('Review:', review);

    // Clear the review and rating after submission
    setRating(0);
    setReview('');
    Alert.alert('Success', 'Thank you for your review!');


    handleSignUp()
  };



  const handleSignUp = async () => {


    const customer_id = await AsyncStorage.getItem('customer_id');
    const vendor_id = await AsyncStorage.getItem('vendor_id');
     
    const schedule_id = await AsyncStorage.getItem('Schedule_id');
    const jobId = await AsyncStorage.getItem('async_job_id');




    const requestData = {
         
         review:review,
         rating:rating,
         JobId: jobId,
         selected_schedule_id: schedule_id
        

        
    };

    console.log(requestData,"REQ")

    try {
        const response = await fetch(`${baseurl}/customer_review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);


            navigation.navigate('Total_Jobs')

             
            

            

           
          
        } else {
            console.error('Error TS:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};








  return (

    <View style={{backgroundColor:"#13171B" }}>

      <SafeAreaView >

        <KeyboardAvoidingView style={[styles.container, { height: windowHeight }]}
        behavior='padding'>


        <View style={{paddingBottom:30 ,justifyContent:'flex-start',alignItems:"center",flexDirection:'row' 
          ,gap:20,width:"100%"
        }}>

        <TouchableOpacity onPress={handleBackPress}>

<Image
    source={require('../../assets/images/back-button.png')}
    style={{height:40,width:40}}
/>
</TouchableOpacity>
        <Text style={{ color: 'white',
    textAlign: 'center',
   
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 24,}}>
        Review The Vendor
        </Text>

         

        </View>



          <View style={{justifyContent:'center',alignItems:'center',
            flexDirection:'column',gap:40,width:"100%"
          }}>

          


        <Text style={styles.title}>How did the Vendor Do?</Text>
        <Stars
          default={0}
          count={5}
          half={true}
          starSize={50}
          update={(val: React.SetStateAction<number>) => setRating(val)}
          fullStar={<Icon name="star" size={50} style={[styles.myStarStyle]} />}
          emptyStar={<Icon name="star-outline" size={50} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
          halfStar={<Icon name="star-half" size={50} style={[styles.myStarStyle]} />}
        />

          <View>
            <Text style={{
              color: '#979797',
              textAlign: 'center',
              fontFamily: 'Urbanist',
              fontSize: 15,
              fontStyle: 'normal',
              fontWeight: '500',
            }}>
            By writing 1-2 short sentences and giving a rating out of 5 you allow us to make sure that we can know who are the best vendors in your area for you and your neighbors.
            </Text>
          </View>


          <TextInput
  style={styles.input}
  placeholder="Please Share your Experience."
  placeholderTextColor="#888"
  
  value={review}
  onChangeText={setReview}
  

/>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: '#13171B',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  myStarStyle: {
    color: '#B22235',
    backgroundColor: 'transparent',
  },
  myEmptyStarStyle: {
    color: '#888',
  },
  input: {
    // height: 80,
    width: '100%',
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
    backgroundColor: '#333',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',


    borderBottomWidth: 2,  // Adjust the width as needed
    borderBottomColor: '#979797'

  },
  button: {
    marginTop: 20,
    backgroundColor: '#B22235',
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewScreen;