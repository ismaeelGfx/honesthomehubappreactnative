
// Create_Job_Post.tsx
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Platform, Button, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Camera from "./Camera";
import { baseurl } from "../../BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment-timezone';
import Toast from "react-native-toast-message";
import Real_Camera from "../Camera/Camera2";
import DropdownComponent from "../../DROPDOWN/Dropdown";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Create_Job_Post = ({ navigation }: any) => {
  const windowHeight = Dimensions.get('window').height ;
  const paddingBottom = windowHeight * 0.15;
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedValue1, setSelectedValue1] = useState<string>('');

  const [selectedValue2, setSelectedValue2] = useState<string>('');

  const [selectedValue3, setSelectedValue3] = useState<string>('');

  const [selectedValue4, setSelectedValue4] = useState<string>('');

  const [emergency, setemergency] = useState<string>('');



  const [date, setDate] = useState<Date>(new Date());
  const [date2, setDate2] = useState<Date>(new Date());
  const [date3, setDate3] = useState<Date>(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [show3, setShow3] = useState<boolean>(false);
  const [numOfPickers, setNumOfPickers] = useState<number>(0);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const [showAmount, setshowAmount] = useState<boolean>(true);

  const [details, onChangeDetails] = React.useState('');
  const [address, onChangeAddress] = React.useState('');
  const [zipcode, onChangeZipcode] = React.useState('');
  // const [amount, onChangeAmount] = React.useState('');
  const [amount, setamount] = useState('');


  

  // const handleInputAmount = (value: string) => {
  //   console.log(value, "TSSS");
  
  //   // Get the current date in MM-DD-YYYY format
  //   const currentDate = new Date();
  //   const formattedCurrentDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
  
  //   // Get dates for the next three days in MM-DD-YYYY format
  //   const oneDayAfter = new Date(currentDate);
  //   oneDayAfter.setDate(currentDate.getDate() + 1);
  //   const formattedOneDayAfter = `${(oneDayAfter.getMonth() + 1).toString().padStart(2, '0')}-${oneDayAfter.getDate().toString().padStart(2, '0')}-${oneDayAfter.getFullYear()}`;

   
  
  //   const twoDaysAfter = new Date(currentDate);
  //   twoDaysAfter.setDate(currentDate.getDate() + 2);
  //   const formattedTwoDaysAfter = `${(twoDaysAfter.getMonth() + 1).toString().padStart(2, '0')}-${twoDaysAfter.getDate().toString().padStart(2, '0')}-${twoDaysAfter.getFullYear()}`;
  
  //   const threeDaysAfter = new Date(currentDate);
  //   threeDaysAfter.setDate(currentDate.getDate() + 3);
  //   const formattedThreeDaysAfter = `${(threeDaysAfter.getMonth() + 1).toString().padStart(2, '0')}-${threeDaysAfter.getDate().toString().padStart(2, '0')}-${threeDaysAfter.getFullYear()}`;
  
  //   console.log(value, "input date", formattedCurrentDate, formattedOneDayAfter, formattedTwoDaysAfter, formattedThreeDaysAfter);
  
  //   // Compare the input date string directly with the formatted dates
  //   if (
  //     value === formattedCurrentDate ||
  //     value === formattedOneDayAfter ||
  //     value === formattedTwoDaysAfter ||
  //     value === formattedThreeDaysAfter
  //     ||
  //     (value.length === 10 && value < currentDate)
  //   ) {
  //     Toast.show({
  //       text1: "Please enter a date that is not the current date or within the next three days."
  //     });
  //     return;
  //   }
  
  //   setamount(value);
  // };

 const handleInputAmount = (value: any) => {
    // Check if value is a valid date string in the format MM-DD-YYYY
    if (value.length === 10) {
        const inputDateParts = value.split('-');
        const inputDate = new Date(`${inputDateParts[2]}-${inputDateParts[0]}-${inputDateParts[1]}`); // YYYY-MM-DD format

        // Current Date and Relevant Dates
        const currentDate = new Date();
        const oneDayAfter = new Date(currentDate);
        oneDayAfter.setDate(currentDate.getDate() + 1);
        const twoDaysAfter = new Date(currentDate);
        twoDaysAfter.setDate(currentDate.getDate() + 2);
        const threeDaysAfter = new Date(currentDate);
        threeDaysAfter.setDate(currentDate.getDate() + 3);
        const oneDayBefore = new Date(currentDate);
        oneDayBefore.setDate(currentDate.getDate() - 1);

        // Format dates for comparison
        const formattedCurrentDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
        const formattedOneDayAfter = `${(oneDayAfter.getMonth() + 1).toString().padStart(2, '0')}-${oneDayAfter.getDate().toString().padStart(2, '0')}-${oneDayAfter.getFullYear()}`;
        const formattedTwoDaysAfter = `${(twoDaysAfter.getMonth() + 1).toString().padStart(2, '0')}-${twoDaysAfter.getDate().toString().padStart(2, '0')}-${twoDaysAfter.getFullYear()}`;
        const formattedThreeDaysAfter = `${(threeDaysAfter.getMonth() + 1).toString().padStart(2, '0')}-${threeDaysAfter.getDate().toString().padStart(2, '0')}-${threeDaysAfter.getFullYear()}`;
        const formattedOneDayBefore = `${(oneDayBefore.getMonth() + 1).toString().padStart(2, '0')}-${oneDayBefore.getDate().toString().padStart(2, '0')}-${oneDayBefore.getFullYear()}`;

        // Validation check
        if (
            value === formattedCurrentDate ||
            value === formattedOneDayAfter ||
            value === formattedTwoDaysAfter ||
            value === formattedThreeDaysAfter ||
            inputDate < currentDate
        ) {
          Toast.show({
            type: 'error',
            text1: 'Please select a date that is at least',
            text2: 'three days away from today.',
            text2Style: {
              fontSize: 11,
              textAlign: 'left', // Ensure the text is left-aligned
              color:'black',
              fontWeight:'bold'
            },
            text1Style: {
              fontSize: 12,
              textAlign: 'left', // Ensure the text is left-aligned
              color:'black',
              fontWeight:'bold'
            },
          },
        
        
        );
            return; // Stop further processing if the condition is met
        }
    }

    // Allow updating the amount if validation passes
    setamount(value);
};

  

  // const handleInputAmount = (value: string) => {
  //   console.log(value, "TSSS");
  
  //   // Get the current date in MM-DD-YYYY format
  //   const currentDate = new Date();
  //   const formattedCurrentDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
  
  //   // Get dates for the next three days in MM-DD-YYYY format
  //   const oneDayAfter = new Date(currentDate);
  //   oneDayAfter.setDate(currentDate.getDate() + 1);
  //   const formattedOneDayAfter = `${(oneDayAfter.getMonth() + 1).toString().padStart(2, '0')}-${oneDayAfter.getDate().toString().padStart(2, '0')}-${oneDayAfter.getFullYear()}`;
  
  //   const twoDaysAfter = new Date(currentDate);
  //   twoDaysAfter.setDate(currentDate.getDate() + 2);
  //   const formattedTwoDaysAfter = `${(twoDaysAfter.getMonth() + 1).toString().padStart(2, '0')}-${twoDaysAfter.getDate().toString().padStart(2, '0')}-${twoDaysAfter.getFullYear()}`;
  
  //   const threeDaysAfter = new Date(currentDate);
  //   threeDaysAfter.setDate(currentDate.getDate() + 3);
  //   const formattedThreeDaysAfter = `${(threeDaysAfter.getMonth() + 1).toString().padStart(2, '0')}-${threeDaysAfter.getDate().toString().padStart(2, '0')}-${threeDaysAfter.getFullYear()}`;
  
  //   console.log(value, "input date", formattedCurrentDate, formattedOneDayAfter, formattedTwoDaysAfter, formattedThreeDaysAfter);
  
  //   // Compare the input date string directly with the formatted dates
  //   if (
  //     value === formattedCurrentDate ||
  //     value === formattedOneDayAfter ||
  //     value === formattedTwoDaysAfter ||
  //     value === formattedThreeDaysAfter
  //   ) {
  //     Toast.show({
  //       text1: "Please enter a date that is not the current date or within the next three days."
  //     });
  //     return;
  //   }
  
  //   // Handle cases where the input date is earlier than the current date
  //   const [inputMonth, inputDay, inputYear] = value.split('-').map(Number);
  //   const inputDate = new Date(inputYear, inputMonth - 1, inputDay);
  
  //   if (inputDate < currentDate) {
  //     Toast.show({
  //       text1: "Please enter a date that is not earlier than the current date."
  //     });
  //     return;
  //   }
  
  //   setamount(value);



  const [note, onChangeNote] = React.useState('');

  const goto = () => {
    navigation.navigate('Total_Jobs');
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;

    

    setShow(false);
    setDate(currentDate);
  };

 




  const onChange3 = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date3;
    setShow3(false);
    setDate3(currentDate);
  };

  const onChange2 = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date2;
    setShow2(false);
    setDate2(currentDate);
    const formattedTime = date2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log("Selected time:", formattedTime);




  };

  // const showMode = (currentMode: 'date' | 'time') => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showMode2 = (currentMode: 'date' | 'time') => {
  //   setShow2(true);
  //   setMode(currentMode);
  // };
  // const showMode3 = (currentMode: 'date' | 'time') => {
  //   setShow3(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  // const showDatepicker2 = () => {
  //   showMode2('date');
  // };

  // const showTimepicker2 = () => {
  //   showMode2('time');
  //   console.log(date2)
  // };

  
  // const showDatepicker3 = () => {
  //   showMode3('date');
  // };

  // const showTimepicker3 = () => {
  //   showMode3('time');
  //   console.log(date3)
  // };

  const handleUploadComplete = (urls: string[]) => {
    setUploadedImageUrls(urls);
    // You can now send these URLs to the backend when the form is submitted
  };


  const Upload_job =()=>{

    if(selectedValue1==="Cleaning" ||selectedValue1==="Landscaping" || emergency==="emergency" )
      {
        post_land_clean_job()
      }
      else{
    
        post_job()
      }

  }




//   const post_job=async ()=>{

//     const userId = await AsyncStorage.getItem('userId');

   



//     console.log( date.toISOString(), date2.toISOString(),"POPPO")


//     const formData={
      
//       user_id: userId,
//       type:"Customer",
//       selected_queries: selectedValue1,
//       details:details,
//       location:address,
//       zipcode:zipcode,
//       phase:"Job Created",
//       available: [
//         {
//           date: date, // Convert Date object to ISO string
//           times: `${date.getHours()}:${date.getMinutes()}` // Split the ISO string to get the time part
//         },
//         {
//           date: date2, // Convert Date object to ISO string
//           times: `${date2.getHours()}:${date2.getMinutes()}` // Split the ISO string to get the time part
//         },
//         {
//           date: date3, // Convert Date object to ISO string
//           times: `${date3.getHours()}:${date3.getMinutes()}` // Split the ISO string to get the time part
//         }
//       ],
//       images:uploadedImageUrls.length>0?uploadedImageUrls:null,
//       choose_service:selectedValue,
//       amount:amount


//   }


//   console.log(formData,"formdata")

// if(selectedValue1==='')
//   {
//     Toast.show({
//       type:'error',
//       text1:'Please Select Home Service.'
//     })
//   }
//   else{

//     try {
//       const response = await fetch(`${baseurl}/create-customer-job`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(formData)
//       });
  
//       if (response.ok) {
//           const data = await response.json();
//           console.log('Success:', data);
  
//           Toast.show({
//             type:'success',
//             text1:'Job Posted Succesfully'
//           })
  
//           navigation.navigate('Total_Jobs')
  
           
         
  
         
  
         
        
//       } else {
//           console.error('Error TS:', response.statusText);
  
//           Toast.show({
//             type:'error',
//             text1:"Please Try Again Later."
//           })
  
  
  
//       }
//   } 

//   catch (error) {
//       console.error('Error:', error);
//   }
//   }








//   }

 

const post_job = async () => {
  const userId = await AsyncStorage.getItem('userId');

  // Calculate the current date and the date three days from today
  const today = new Date();
  const threeDaysFromToday = new Date(today);
  threeDaysFromToday.setDate(today.getDate() + 3);

  // Check if the selected date is at least three days from today
  if (date < threeDaysFromToday || date2 < threeDaysFromToday  || date3 < threeDaysFromToday  ) {
    Toast.show({
      type: 'error',
      text1: 'Please select a date that is at least',
      text2: 'three days away from today.',
      text2Style: {
        fontSize: 11,
        textAlign: 'left', // Ensure the text is left-aligned
        color:'black',
        fontWeight:'bold'
      },
      text1Style: {
        fontSize: 12,
        textAlign: 'left', // Ensure the text is left-aligned
        color:'black',
        fontWeight:'bold'
      },
    },
  
  
  );
    return; // Exit the function if the date is not valid
  }

  // Prepare formData
  const formData = {
    user_id: userId,
    type: "Customer",
    selected_queries: selectedValue1,
    details: details,
    location: address,
    zipcode: zipcode,
    phase: "Job Created",
    emergency:emergency,
    note:note,
    available: [
      {
        date: date.toISOString(), // Convert Date object to ISO string
        times: `${date.getHours()}:${date.getMinutes()}`, // Split the ISO string to get the time part
      },
      {
        date: date2.toISOString(), // Convert Date object to ISO string
        times: `${date2.getHours()}:${date2.getMinutes()}`, // Split the ISO string to get the time part
      },
      {
        date: date3.toISOString(), // Convert Date object to ISO string
        times: `${date3.getHours()}:${date3.getMinutes()}`, // Split the ISO string to get the time part
      },
    ],
    images: uploadedImageUrls.length > 0 ? uploadedImageUrls : null,
    choose_service: selectedValue,
    amount: amount,
  };

  console.log(formData, "formdata");

  if (selectedValue1 === '') {
    Toast.show({
      type: 'error',
      text1: 'Please Select Home Service.',
    });
  } else {
    try {
      const response = await fetch(`${baseurl}/create-customer-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);

        Toast.show({
          type: 'success',
          text1: 'Job Posted Successfully',
        });

        navigation.navigate('Total_Jobs');
      } else {
        console.error('Error TS:', response.statusText);

        Toast.show({
          type: 'error',
          text1: 'Please Try Again Later.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};



  const post_land_clean_job=async ()=>{

    const userId = await AsyncStorage.getItem('userId');

   
    const myDate = new Date('1999-12-31');


    console.log( date.toISOString(), date2.toISOString(),"POPPO")


    const formData={
      
      user_id: userId,
      type:"Customer",
      selected_queries: selectedValue1,
      details:details,
      location:address,
      zipcode:zipcode,
      phase:"Job Created",
      emergency:emergency,
      note:note,
      available: [
        {
          date: myDate, // Convert Date object to ISO string
          times: " " // Split the ISO string to get the time part
        },
        // {
        //   date: date2, // Convert Date object to ISO string
        //   times: `${date2.getHours()}:${date2.getMinutes()}` // Split the ISO string to get the time part
        // },
        // {
        //   date: date3, // Convert Date object to ISO string
        //   times: `${date3.getHours()}:${date3.getMinutes()}` // Split the ISO string to get the time part
        // }
      ],
      images:uploadedImageUrls.length>0?uploadedImageUrls:null,
      choose_service:selectedValue,
      amount:amount


  }


  console.log(formData,"formdata")

if(selectedValue1==='')
  {
    Toast.show({
      type:'error',
      text1:'Please Select Home Service.'
    })
  }
  else{

    try {
      const response = await fetch(`${baseurl}/create-customer-job`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });
  
      if (response.ok) {
          const data = await response.json();
          console.log('Success:', data);
  
          Toast.show({
            type:'success',
            text1:'Job Posted Succesfully'
          })
  

          setTimeout(() => {
            
            navigation.navigate('Total_Jobs')
          }, 1000);
  
           
         
  
         
  
         
        
      } else {
          console.error('Error TS:', response.statusText);
  
          Toast.show({
            type:'error',
            text1:"Please Try Again Later."
          })
  
  
  
      }
  } 

  catch (error) {
      console.error('Error:', error);
  }
  }








  }



  const data = [
    { label: 'Plumbing', value: 'Plumbing' },
    { label: 'Heating, Ventilation, Air Conditioning', value: 'Heating, Ventilation, Air Conditioning' },
    { label: 'Water Heater', value: 'Water Heater' },
    { label: 'Remodeling', value: 'Remodeling' },
    { label: 'Landscaping', value: 'Landscaping' },
    { label: 'Cleaning', value: 'Cleaning' },
    { label: 'Fencing', value: 'Fencing' },
    { label: 'Handyman', value: 'Handyman' },
    { label: 'Roofing', value: 'Roofing' },
  ];
  
  const anotherData = [
    { label: 'Maintainence', value: 'Maintainence' },
    { label: 'Repair', value: 'Repair' },
    { label: 'Installation', value: 'Installation' },
  ];



//   const handleSelect = (selectedValue:any) => {
//     console.log('Selected value:', selectedValue);
//     // You can perform any action with the selected value here

//     setSelectedValue1(selectedValue)
//     console.log(selectedValue,"SELECTED QUERIES")


//     if (selectedValue==="Landscaping" || selectedValue ==="Cleaning" ) 
//       {
//         setshowAmount(false)
        
//       }

// else if(selectedValue==="Maintainence" || selectedValue ==="Repair" || selectedValue ==="Service")
//   {
//     setSelectedValue(selectedValue)
    
//   }

//       else{
//         setshowAmount(true)
//       }

//   };

const handleSelect = (selectedValue: any) => {
  console.log('Selected value:', selectedValue);
  // You can perform any action with the selected value here

  // Handle cases for Landscaping and Cleaning
  if (selectedValue === "Landscaping" || selectedValue === "Cleaning") {
    setSelectedValue1(selectedValue);
    setshowAmount(false);
  }
  // Handle cases for Maintainence, Repair, and Service
  else if (selectedValue === "Maintainence" || selectedValue === "Repair" || selectedValue === "Installation") {
    setSelectedValue(selectedValue);
  }
  // Handle all other cases
  else {
    setSelectedValue1(selectedValue);
    setshowAmount(true);
  }
};




//  
const [showDatePicker, setShowDatePicker] = useState(false);
const [showTimePicker, setShowTimePicker] = useState(false);
 

// Function to show date picker
const showDatePickerHandler = () => {
  setShowDatePicker(true);
  setShowTimePicker(false); // Ensure time picker is hidden
};

// Function to show time picker
const showTimePickerHandler = () => {
  setShowTimePicker(true);
  setShowDatePicker(false); // Ensure date picker is hidden
};
const handleConfirm = () => {
  setShowDatePicker(false); 
  setShowTimePicker(false);
  console.log('Selected Date/Time:', date);
 
};

//


//2
const [showDatePicker2, setShowDatePicker2] = useState(false);
const [showTimePicker2, setShowTimePicker2] = useState(false);
 

// Function to show date picker
const showDatePickerHandler2 = () => {
  setShowDatePicker2(true);
  setShowTimePicker2(false); // Ensure time picker is hidden
};

// Function to show time picker
const showTimePickerHandler2 = () => {
  setShowTimePicker2(true);
  setShowDatePicker2(false); // Ensure date picker is hidden
};
const handleConfirm2 = () => {
  setShowDatePicker2(false); 
  setShowTimePicker2(false);
  console.log('Selected Date/Time:', date2);
 
};



//2




//3
const [showDatePicker3, setShowDatePicker3] = useState(false);
const [showTimePicker3, setShowTimePicker3] = useState(false);
 

// Function to show date picker
const showDatePickerHandler3 = () => {
  setShowDatePicker3(true);
  setShowTimePicker3(false); // Ensure time picker is hidden
};

// Function to show time picker
const showTimePickerHandler3 = () => {
  setShowTimePicker3(true);
  setShowDatePicker3(false); // Ensure date picker is hidden
};
const handleConfirm3 = () => {
  setShowDatePicker3(false); 
  setShowTimePicker3(false);
  console.log('Selected Date/Time:', date3);
 
};



//3








// Function to handle date/time change
const onChangeNEW = (event:any, selectedDate:any) => {
  const currentDate = selectedDate || date;
  setShowDatePicker(Platform.OS === 'ios'); // For iOS, showDatePickerHandler handles visibility
  setShowTimePicker(Platform.OS === 'ios'); // For iOS, showTimePickerHandler handles visibility
  setDate(currentDate);
};


const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
 



const [isPressed, setIsPressed] = useState(false);

  // const handlePressIn = () => {

  //   console.log("press")
  //   setIsPressed(true);
  // };

  // const handlePressOut = () => {
  //   console.log("out")
  //   setIsPressed(false);
  // };

  const handlePress = () => {
    setIsPressed(prevState => !prevState);
    console.log(isPressed)

    if(isPressed===false)
      {
        setemergency("emergency")

        console.log(emergency,"done")

        setshowAmount(false)
      }
      else{
        setemergency("")
        console.log("false")


        setshowAmount(true)
      }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showMode2 = (currentMode: 'date' | 'time') => {
    setShow2(true);
    setMode(currentMode);
  };
  const showMode3 = (currentMode: 'date' | 'time') => {
    setShow3(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };

  const showTimepicker2 = () => {
    showMode2('time');
    console.log(date2)
  };

  
  const showDatepicker3 = () => {
    showMode3('date');
  };

  const showTimepicker3 = () => {
    showMode3('time');
    console.log(date3)
  };
  


  return (

//     <View style={[styles.container, { height: windowHeight }]}>

//     <KeyboardAvoidingView 
//     behavior='padding'>
//         <SafeAreaView>

//         <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', marginTop: 10 }}>
//           <TouchableOpacity onPress={goto}>
//             <Image source={require('../../assets/images/back-button.png')} style={styles.logo} />
//           </TouchableOpacity>
//           <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', paddingLeft: 40 }}>
//             Create a Job Post
//           </Text>
//         </View>
//     <ScrollView>


//         <View style={{ marginTop: 15,marginBottom:100 }}>
//           <ScrollView>
//             <View>
//               {/* <Camera onUploadComplete={handleUploadComplete} /> */}

//               <Real_Camera  onUploadComplete={handleUploadComplete}/>

//             <View style={{justifyContent:'center',alignItems:'center',gap:10,marginBottom:10}}>


//               {/* <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={selectedValue1}
//                 onValueChange={(itemValue, itemIndex) => {
//                   setSelectedValue1(itemValue);
                
//                   if (itemValue === "Cleaning" || itemValue === "Landscaping") {
                     
//                     setshowAmount(false);
//                     setNumOfPickers(0) // Assuming setCleaningSelected is your state update function
//                   } 
//                   else{
//                     setshowAmount(true)
//                   }
//                 }}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Type Of Home Service" value="" />
//                 <Picker.Item label="Plumbing" value="Plumbing" />
//                 <Picker.Item label="Water Heater" value="Water Heater" />
//                 <Picker.Item label="Heating, Ventilation, Air Conditioning" value="Heating, Ventilation, Air Conditioning" />
//                 <Picker.Item label="Remodeling" value="Remodeling" />
//                 <Picker.Item label="Roofing" value="Roofing" />
//                 <Picker.Item label="Handyman" value="Handyman" />
//                 <Picker.Item label="Landscaping" value="Landscaping" />
//                 <Picker.Item label="Cleaning" value="Cleaning" />
//                 <Picker.Item label="Fencing" value="Fencing" />
//               </Picker>

//               </View> */}


// <View style={{width:340}}>

// <DropdownComponent data={data} placeholder={"Type of Home Service"} onSelect={handleSelect} />
// </View>



// <KeyboardAvoidingView>
//               <TextInput
//                 style={styles.input}
//                 placeholder="One Sentence Description"
//                 placeholderTextColor="white"
//                 value={details}
//                 onChangeText={onChangeDetails}
//               />
//               </KeyboardAvoidingView>

//               <KeyboardAvoidingView>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Address"
//                 placeholderTextColor="white"
//                 value={address}
//                 onChangeText={onChangeAddress}
//               />


// </KeyboardAvoidingView>


// <KeyboardAvoidingView>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Zip Code"
//                 placeholderTextColor="white"
//                 value={zipcode}
//                 onChangeText={onChangeZipcode}
//               />

// </KeyboardAvoidingView>

// {
//   !showAmount &&
//   <>
  
//   <Text style={{color:'white'}}>
//     Date & Time Format (MM-DD-YYYY) (hh:mm AM/PM)
//   </Text>

//   <KeyboardAvoidingView style={{backgroundColor:'red'}}>

// <TextInput
//                 style={styles.input}
//                 placeholder="Date/Time"
//                 placeholderTextColor="white"
//                 value={amount}
//                 onChangeText={onChangeAmount}
//               />

// </KeyboardAvoidingView>
//               </>

// }


// {
//    showAmount &&




// <View style={{width:340}}>

// <DropdownComponent data={anotherData} placeholder={"Choose Service"} onSelect={handleSelect}/>
// </View>


// }
//             </View>


           



// {
//   showAmount &&<>
  
//     <View>
//       <Text  style={styles.picker1}>
//       Choose Three Availabilities :
//       </Text>
//     </View>


//  {/* new */}

// <View style={{flexDirection:'row',justifyContent:'center'}}>
// <Text style={{color:"white",fontSize:16,fontWeight:'bold'}}>
//           1.
//         </Text>
//  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 
//       <View style={{ marginBottom: 20 }}>
        
    

//         <TouchableOpacity onPress={showDatePickerHandler}>
//           <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
//           <Image
//             source={require("../../assets/images/calendar.png")}
//             style={{height:30,width:30}}
//           />
//           <Text style={{fontSize:16,color:"white"}}>
//             Select Date
//           </Text>
//           </View>
//         </TouchableOpacity>
        


//       </View>
//       {showDatePicker && (
      
//           <DateTimePicker
//             value={date}
//             mode="date" // Set mode to 'date' for date picker
//             display="spinner"
//             onChange={onChange}
//             textColor="white"
//           />
      
//       )}
//       <View style={{ marginBottom: 20 }}>
//         {/* <Button title="Select Time" onPress={showTimePickerHandler} /> */}

//         <TouchableOpacity onPress={showTimePickerHandler}>
//           <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
//           <Image
//             source={require("../../assets/images/time.png")}
//             style={{height:30,width:30}}
//           />
//           <Text style={{fontSize:16,color:"white"}}>
//             Select Time
//           </Text>
//           </View>
//         </TouchableOpacity>



//       </View>
//       {showTimePicker && (
//         <DateTimePicker
//           value={date}
//           mode="time" // Set mode to 'time' for time picker
//           is24Hour={true} // Display time in 24-hour format
//           display="spinner"
//           onChange={onChange}
//           textColor="white"
//         />
//       )}
//       {(showDatePicker || showTimePicker) && (
//         <View style={{ marginTop: 20 }}>
          
//           <TouchableOpacity onPress={handleConfirm} style={{backgroundColor:"#B22235",width:60,justifyContent:"center",alignItems:'center',height:20,borderRadius:4}}>
//             <Text style={{color:'black',fontSize:12}}>
//               Confirm
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//         <View style={{flexDirection:'row',gap:20,marginTop:20}}> 
//         <Text style={{color:"white"}}>
//         Date: {formatDate(date)}
//         </Text>


//         <Text style={{color:"white"}}>
//         Time:  {date.toLocaleTimeString()}
//         </Text>
//         </View>



//     </View>
// </View>

// <View style={{flexDirection:'row',justifyContent:'center' ,marginTop:15}}>
// <Text style={{color:"white",fontSize:16,fontWeight:'bold'}}>
//           2.
//         </Text>
//  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 
//       <View style={{ marginBottom: 20 }}>
        
    

//         <TouchableOpacity onPress={showDatePickerHandler2}>
//           <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
//           <Image
//             source={require("../../assets/images/calendar.png")}
//             style={{height:30,width:30}}
//           />
//           <Text style={{fontSize:16,color:"white"}}>
//             Select Date
//           </Text>
//           </View>
//         </TouchableOpacity>
        


//       </View>
//       {showDatePicker2 && (
      
//           <DateTimePicker
//             value={date}
//             mode="date" // Set mode to 'date' for date picker
//             display="spinner"
//             onChange={onChange2}
//             textColor="white"
//           />
      
//       )}
//       <View style={{ marginBottom: 20 }}>
//         {/* <Button title="Select Time" onPress={showTimePickerHandler} /> */}

//         <TouchableOpacity onPress={showTimePickerHandler2}>
//           <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
//           <Image
//             source={require("../../assets/images/time.png")}
//             style={{height:30,width:30}}
//           />
//           <Text style={{fontSize:16,color:"white"}}>
//             Select Time
//           </Text>
//           </View>
//         </TouchableOpacity>



//       </View>
//       {showTimePicker2 && (
//         <DateTimePicker
//           value={date2}
//           mode="time" // Set mode to 'time' for time picker
//           is24Hour={true} // Display time in 24-hour format
//           display="spinner"
//           onChange={onChange2}
//           textColor="white"
//         />
//       )}
//       {(showDatePicker2 || showTimePicker2) && (
//         <View style={{ marginTop: 20 }}>
          
//           <TouchableOpacity onPress={handleConfirm2} style={{backgroundColor:"#B22235",width:60,justifyContent:"center",alignItems:'center',height:20,borderRadius:4}}>
//             <Text style={{color:'black',fontSize:12}}>
//               Confirm
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//         <View style={{flexDirection:'row',gap:20,marginTop:20}}> 
//         <Text style={{color:"white"}}>
//         Date: {formatDate(date2)}
//         </Text>


//         <Text style={{color:"white"}}>
//         Time:  {date2.toLocaleTimeString()}
//         </Text>
//         </View>



//     </View>
// </View>



// <View style={{flexDirection:'row',justifyContent:'center',marginTop:15}}>
// <Text style={{color:"white",fontSize:16,fontWeight:'bold'}}>
//           3.
//         </Text>
//  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 
//       <View style={{ marginBottom: 20 }}>
        
    

//         <TouchableOpacity onPress={showDatePickerHandler3}>
//           <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
//           <Image
//             source={require("../../assets/images/calendar.png")}
//             style={{height:30,width:30}}
//           />
//           <Text style={{fontSize:16,color:"white"}}>
//             Select Date
//           </Text>
//           </View>
//         </TouchableOpacity>
        


//       </View>
//       {showDatePicker3 && (
      
//           <DateTimePicker
//             value={date3}
//             mode="date" // Set mode to 'date' for date picker
//             display="spinner"
//             onChange={onChange3}
//             textColor="white"
//           />
      
//       )}
//       <View style={{ marginBottom: 20 }}>
//         {/* <Button title="Select Time" onPress={showTimePickerHandler} /> */}

//         <TouchableOpacity onPress={showTimePickerHandler3}>
//           <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
//           <Image
//             source={require("../../assets/images/time.png")}
//             style={{height:30,width:30}}
//           />
//           <Text style={{fontSize:16,color:"white"}}>
//             Select Time
//           </Text>
//           </View>
//         </TouchableOpacity>



//       </View>
//       {showTimePicker3 && (
//         <DateTimePicker
//           value={date3}
//           mode="time" // Set mode to 'time' for time picker
//           is24Hour={true} // Display time in 24-hour format
//           display="spinner"
//           onChange={onChange3}
//           textColor="white"
//         />
//       )}
//       {(showDatePicker3 || showTimePicker3) && (
//         <View style={{ marginTop: 20 }}>
          
//           <TouchableOpacity onPress={handleConfirm3} style={{backgroundColor:"#B22235",width:60,justifyContent:"center",alignItems:'center',height:20,borderRadius:4}}>
//             <Text style={{color:'black',fontSize:12}}>
//               Confirm
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//         <View style={{flexDirection:'row',gap:20,marginTop:20}}> 
//         <Text style={{color:"white"}}>
//          Date: {formatDate(date3)}
//         </Text>


//         <Text style={{color:"white"}}>
//         Time:  {date3.toLocaleTimeString()}
//         </Text>
//         </View>



//     </View>
// </View>


 

//  {/* new */}


  
// {/* <View>
//   <View style={styles.dateTimePickerContainer}>
//     <TouchableOpacity onPress={showDatepicker} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Date</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={showTimepicker} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Time</Text>
//     </TouchableOpacity>
//   </View>
//   {show &&  (

//     <>
//     <DateTimePicker
//       value={date}
//       mode={mode}
//       // is12Hour={true}
//       display="spinner"
//       onChange={onChange}
//       textColor="white"
//     />

// <Button title="OK" onPress={handleConfirm} />
//     </>
//   )}
//    <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'center'}}>

// <Text style={styles.selectedDateText}> Date: {date.toLocaleDateString()}</Text>
// <Text style={styles.selectedTimeText}>Time: {date.toLocaleTimeString()}</Text>

// </View>
// </View> */}



 


  
// {/* <View>
//   <View style={styles.dateTimePickerContainer}>
//     <TouchableOpacity onPress={showDatepicker2} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Date</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={showTimepicker2} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Time</Text>
//     </TouchableOpacity>
//   </View>
//   {show2 &&  (
//     <DateTimePicker
//     value={date}
//     mode={mode}
//     // is12Hour={true}
//     display="spinner"
//     onChange={onChange}
//     textColor="white"
//   />
//   )}
//   <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'center'}}>

// <Text style={styles.selectedDateText}> Date: {date2.toLocaleDateString()}</Text>
// <Text style={styles.selectedTimeText}>Time: {date2.toLocaleTimeString()}</Text>

// </View>
// </View> */}





 

  
// {/* <View>
//   <View style={styles.dateTimePickerContainer}>
//     <TouchableOpacity onPress={showDatepicker3} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Date</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={showTimepicker3} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Time</Text>
//     </TouchableOpacity>
//   </View>
//   {show3 &&  (
//    <DateTimePicker
//    value={date}
//    mode={mode}
//    // is12Hour={true}
//    display="spinner"
//    onChange={onChange}
//    textColor="white"
//  />
//   )}
//   <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'center'}}>

//   <Text style={styles.selectedDateText}> Date: {date3.toLocaleDateString()}</Text>
//   <Text style={styles.selectedTimeText}>Time: {date3.toLocaleTimeString()}</Text>

//   </View>
// </View> */}








// {/* <View>
//   <View style={styles.dateTimePickerContainer}>
//     <TouchableOpacity onPress={showDatepicker2} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Date</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={showTimepicker2} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Time</Text>
//     </TouchableOpacity>
//   </View>
//   {show2 && (
//     <DateTimePicker
//       value={date2}
//       mode={mode}
//       // is24Hour={true}
//       display="default"
//       onChange={onChange2}
//     />
//   )}
//   <Text style={styles.selectedDateText}>Selected Date: {date2.toLocaleDateString()}</Text>
//   <Text style={styles.selectedTimeText}>Selected Time: {date2.toLocaleTimeString()}</Text>
// </View>

// <View>
//   <View style={styles.dateTimePickerContainer}>
//     <TouchableOpacity onPress={showDatepicker3} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Date</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={showTimepicker3} style={styles.dateTimePickerButton}>
//       <Text style={styles.dateTimePickerText}>Select Time</Text>
//     </TouchableOpacity>
//   </View>
//   {show3 && (
//     <DateTimePicker
//       value={date3}
//       mode={mode}
//       // is24Hour={true}
//       display="default"
//       onChange={onChange3}
//     />
//   )}
//   <Text style={styles.selectedDateText}>Selected Date: {date3.toLocaleDateString()}</Text>
//   <Text style={styles.selectedTimeText}>Selected Time: {date3.toLocaleTimeString()}</Text>
// </View> */}
//   </>
// }






//               {/* Show uploaded image URLs */}
//               {/* {uploadedImageUrls.length > 0 && (
//                 <View>
//                   <Text style={{ color: 'white', marginBottom: 10 }}>Uploaded Image URLs:</Text>
//                   {uploadedImageUrls.map((url, index) => (
//                     <Text key={index} style={{ color: 'white' }}>{url}</Text>
//                   ))}
//                 </View>
//               )} */}



// <View style={{ justifyContent:'center',alignItems:'center'}}>
// <TouchableOpacity  onPress={Upload_job} style={{backgroundColor:'#B22235',  
//      width: 200,
//     height: 50,
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexShrink: 0,
//     borderRadius:10,
//     flexDirection:'row',
//     gap:10,
//     marginTop:20
    
    
//     }}>
//         <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}>
//             Post Job
//           </Text>
//         </TouchableOpacity>
// </View>

//             </View>
//           </ScrollView>
//         </View>

        

//         </ScrollView>
//     </SafeAreaView>
//       </KeyboardAvoidingView>
//     </View>


<View style={[styles.container, { height: windowHeight }]}>
      
        <SafeAreaView>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity onPress={goto}>
              <Image source={require('../../assets/images/back-button.png')} style={styles.logo} />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', paddingLeft: 40 }}>
              Create a Job Post
            </Text>
          </View>

          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            enableAutomaticScroll={true}
            extraScrollHeight={20}  // Adjust this value as needed
            keyboardOpeningTime={250}  // Adjust this value as needed
          >
            <View style={{ marginTop: 15, marginBottom: 100 }}>
              <View>
                <Real_Camera onUploadComplete={handleUploadComplete} />

                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <View style={{ width: 340 }}>
                    <DropdownComponent data={data} placeholder={"Type of Home Service"} onSelect={handleSelect} />
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder="One Sentence Description"
                    placeholderTextColor="white"
                    value={details}
                    onChangeText={onChangeDetails}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor="white"
                    value={address}
                    onChangeText={onChangeAddress}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Zip Code"
                    placeholderTextColor="white"
                    value={zipcode}
                    onChangeText={onChangeZipcode}
                  />

                  {!showAmount && (
                    <>
                      <Text style={{ color: 'white' }}>
                        Date & Time Format (MM-DD-YYYY) (hh:mm AM/PM)
                      </Text>

                      <TextInput
                        style={styles.input}
                        placeholder="Date/Time"
                        placeholderTextColor="white"
                        value={amount}
                        onChangeText={handleInputAmount}
                      />
                    </>
                  )}

                  {showAmount && (
                    <View style={{ width: 340 }}>
                      <DropdownComponent data={anotherData} placeholder={"Choose Service"} onSelect={handleSelect} />
                    </View>
                  )}
                </View>

<View style={{justifyContent:'center',alignItems:'center',paddingBottom:20, flexDirection:'column',gap:10}}>

                <TouchableOpacity
        style={[styles.button1, { backgroundColor: isPressed ? 'brown' : 'grey' }]}
       onPress={handlePress}
      >
        <Text style={styles.buttonText}>Emergency</Text>
      </TouchableOpacity>

{
    isPressed===true &&
      <TextInput
                        style={styles.input}
                        placeholder="Note"
                        placeholderTextColor="white"
                        value={note}
                        onChangeText={onChangeNote}
                      />
}
</View>







                {showAmount && (
                  <>
                    <View>
                      <Text style={styles.picker1}>
                        Choose Three Availabilities:
                      </Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center' ,width:'90%',marginLeft:'auto',marginRight:'auto',paddingBottom:20}}>

<Text  style={{
                        color:'white',
                        textAlign:'center',
                        alignItems:'center',
                        
                      }}>
                      A Quote Date is a Date and Time that a Vendor comes to your house and gives you a quote. We recommend that you pick three times to get three different quotes.
                      </Text>
</View>
                     
                    { /* Availability selection views */ }


  {/* new */}
{Platform.OS === 'ios' ? (
<View>

<View style={{flexDirection:'row',justifyContent:'center'}}>
 <Text style={{color:"white",fontSize:16,fontWeight:'bold'}}>
           1.
        </Text>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 
       <View style={{ marginBottom: 20 }}>
        
    

        <TouchableOpacity onPress={showDatePickerHandler}>
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>     
               <Image
            source={require("../../assets/images/calendar.png")}
            style={{height:30,width:30}}
          />
          <Text style={{fontSize:16,color:"white"}}>
            Select Date
          </Text>
          </View>
        </TouchableOpacity>
        


      </View>
      {showDatePicker && (
      
          <DateTimePicker
            value={date}
            mode="date" // Set mode to 'date' for date picker
            display="spinner"
            onChange={onChange}
            textColor="white"
          />
      
      )}
      <View style={{ marginBottom: 20 }}>
        {/* <Button title="Select Time" onPress={showTimePickerHandler} /> */}

        <TouchableOpacity onPress={showTimePickerHandler}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
          <Image
            source={require("../../assets/images/time.png")}
            style={{height:30,width:30}}
          />
          <Text style={{fontSize:16,color:"white"}}>
            Select Time
          </Text>
          </View>
        </TouchableOpacity>



      </View>
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time" // Set mode to 'time' for time picker
          is24Hour={true} // Display time in 24-hour format
          display="spinner"
          onChange={onChange}
          textColor="white"
        />
      )}
      {(showDatePicker || showTimePicker) && (
        <View style={{ marginTop: 20 }}>
          
          <TouchableOpacity onPress={handleConfirm} style={{backgroundColor:"#B22235",width:60,justifyContent:"center",alignItems:'center',height:20,borderRadius:4}}>
            <Text style={{color:'black',fontSize:12}}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}

        <View style={{flexDirection:'row',gap:20,marginTop:20}}> 
        <Text style={{color:"white"}}>
        Date: {formatDate(date)}
        </Text>


        <Text style={{color:"white"}}>
        Time:  {date.toLocaleTimeString()}
        </Text>
        </View>



    </View>
</View>

<View style={{flexDirection:'row',justifyContent:'center' ,marginTop:15}}>
<Text style={{color:"white",fontSize:16,fontWeight:'bold'}}>
          2.
        </Text>
 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 
      <View style={{ marginBottom: 20 }}>
        
    

        <TouchableOpacity onPress={showDatePickerHandler2}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
          <Image
            source={require("../../assets/images/calendar.png")}
            style={{height:30,width:30}}
          />
          <Text style={{fontSize:16,color:"white"}}>
            Select Date
          </Text>
          </View>
        </TouchableOpacity>
        


      </View>
      {showDatePicker2 && (
      
          <DateTimePicker
            value={date}
            mode="date" // Set mode to 'date' for date picker
            display="spinner"
            onChange={onChange2}
            textColor="white"
          />
      
      )}
      <View style={{ marginBottom: 20 }}>
        {/* <Button title="Select Time" onPress={showTimePickerHandler} /> */}

        <TouchableOpacity onPress={showTimePickerHandler2}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
          <Image
            source={require("../../assets/images/time.png")}
            style={{height:30,width:30}}
          />
          <Text style={{fontSize:16,color:"white"}}>
            Select Time
          </Text>
          </View>
        </TouchableOpacity>



      </View>
      {showTimePicker2 && (
        <DateTimePicker
          value={date2}
          mode="time" // Set mode to 'time' for time picker
          is24Hour={true} // Display time in 24-hour format
          display="spinner"
          onChange={onChange2}
          textColor="white"
        />
      )}
      {(showDatePicker2 || showTimePicker2) && (
        <View style={{ marginTop: 20 }}>
          
          <TouchableOpacity onPress={handleConfirm2} style={{backgroundColor:"#B22235",width:60,justifyContent:"center",alignItems:'center',height:20,borderRadius:4}}>
            <Text style={{color:'black',fontSize:12}}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}

        <View style={{flexDirection:'row',gap:20,marginTop:20}}> 
        <Text style={{color:"white"}}>
        Date: {formatDate(date2)}
        </Text>


        <Text style={{color:"white"}}>
        Time:  {date2.toLocaleTimeString()}
        </Text>
        </View>



    </View>
</View>



<View style={{flexDirection:'row',justifyContent:'center',marginTop:15}}>
<Text style={{color:"white",fontSize:16,fontWeight:'bold'}}>
          3.
        </Text>
 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 
      <View style={{ marginBottom: 20 }}>
        
    

        <TouchableOpacity onPress={showDatePickerHandler3}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
          <Image
            source={require("../../assets/images/calendar.png")}
            style={{height:30,width:30}}
          />
          <Text style={{fontSize:16,color:"white"}}>
            Select Date
          </Text>
          </View>
        </TouchableOpacity>
        


      </View>
      {showDatePicker3 && (
      
          <DateTimePicker
            value={date3}
            mode="date" // Set mode to 'date' for date picker
            display="spinner"
            onChange={onChange3}
            textColor="white"
          />
      
      )}
      <View style={{ marginBottom: 20 }}>
        {/* <Button title="Select Time" onPress={showTimePickerHandler} /> */}

        <TouchableOpacity onPress={showTimePickerHandler3}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
          <Image
            source={require("../../assets/images/time.png")}
            style={{height:30,width:30}}
          />
          <Text style={{fontSize:16,color:"white"}}>
            Select Time
          </Text>
          </View>
        </TouchableOpacity>



      </View>
      {showTimePicker3 && (
        <DateTimePicker
          value={date3}
          mode="time" // Set mode to 'time' for time picker
          is24Hour={true} // Display time in 24-hour format
          display="spinner"
          onChange={onChange3}
          textColor="white"
        />
      )}
      {(showDatePicker3 || showTimePicker3) && (
        <View style={{ marginTop: 20 }}>
          
          <TouchableOpacity onPress={handleConfirm3} style={{backgroundColor:"#B22235",width:60,justifyContent:"center",alignItems:'center',height:20,borderRadius:4}}>
            <Text style={{color:'black',fontSize:12}}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}

        <View style={{flexDirection:'row',gap:20,marginTop:20}}> 
        <Text style={{color:"white"}}>
         Date: {formatDate(date3)}
        </Text>


        <Text style={{color:"white"}}>
        Time:  {date3.toLocaleTimeString()}
        </Text>
        </View>



    </View>
</View>
</View>
        
      ) : (
        <>
        
        {
  showAmount &&<>
  
     


 


  
<View>
  <View style={styles.dateTimePickerContainer}>
    <TouchableOpacity onPress={showDatepicker} style={styles.dateTimePickerButton}>
      <Text style={styles.dateTimePickerText}>Select Date</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={showTimepicker} style={styles.dateTimePickerButton}>
      <Text style={styles.dateTimePickerText}>Select Time</Text>
    </TouchableOpacity>
  </View>
  {show &&  (
    <DateTimePicker
      value={date}
      mode={mode}
      // is12Hour={true}
      display="default"
      onChange={onChange}
    />
  )}
   <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'center'}}>

<Text style={styles.selectedDateText}> Date: {date.toLocaleDateString()}</Text>
<Text style={styles.selectedTimeText}>Time: {date.toLocaleTimeString()}</Text>

</View>
</View>



 


  
<View>
  <View style={styles.dateTimePickerContainer}>
    <TouchableOpacity onPress={showDatepicker2} style={styles.dateTimePickerButton}>
      <Text style={styles.dateTimePickerText}>Select Date</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={showTimepicker2} style={styles.dateTimePickerButton}>
      <Text style={styles.dateTimePickerText}>Select Time</Text>
    </TouchableOpacity>
  </View>
  {show2 &&  (
    <DateTimePicker
      value={date2}
      mode={mode}
      // is12Hour={true}
      display="default"
      onChange={onChange2}
    />
  )}
  <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'center'}}>

<Text style={styles.selectedDateText}> Date: {date2.toLocaleDateString()}</Text>
<Text style={styles.selectedTimeText}>Time: {date2.toLocaleTimeString()}</Text>

</View>
</View>





 

  
<View>
  <View style={styles.dateTimePickerContainer}>
    <TouchableOpacity onPress={showDatepicker3} style={styles.dateTimePickerButton}>
      <Text style={styles.dateTimePickerText}>Select Date</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={showTimepicker3} style={styles.dateTimePickerButton}>
      <Text style={styles.dateTimePickerText}>Select Time</Text>
    </TouchableOpacity>
  </View>
  {show3 &&  (
    <DateTimePicker
      value={date3}
      mode={mode}
      // is12Hour={true}
      display="default"
      onChange={onChange3}
    />
  )}
  <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'center'}}>

  <Text style={styles.selectedDateText}> Date: {date3.toLocaleDateString()}</Text>
  <Text style={styles.selectedTimeText}>Time: {date3.toLocaleTimeString()}</Text>

  </View>
</View>






 
  </>
}
        
        
        </>
      )}

 

  {/* new */}

                  </>
                )}

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={Upload_job} style={{backgroundColor:'#B22235',  
     width: 200,
    height: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius:10,
    flexDirection:'row',
    gap:10,
    marginTop:20
    
    
    }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                      Post Job
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
    
    </View>
  );
};

const styles = StyleSheet.create({

  
  button: {
                    
    height:50

    
  },
  input: {
    height: 62,
    width: 300,
    // margin: 12,
     
    padding: 10,
    
    color: 'white',
    


    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'gray',
  },
  container: {
    backgroundColor: '#13171B',
    alignItems: "center",
    position: 'relative',
    justifyContent:'center'
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    left: 10
  },
  picker: {
    width: 335,
    height: 50,
    // backgroundColor: 'gray',
    // borderWidth: 5,
    // borderColor: 'white',
    // borderRadius: 20,
    // marginBottom: 10,
    // paddingHorizontal: 10,
    fontSize: 16,
    color: 'white',
    
  },
  picker1: {
    width: 335,
    height: 50,
    fontWeight:'bold',
     
     
    borderRadius: 8,
    // marginBottom: 10,
    paddingHorizontal: 22,
    fontSize: 16,
    color: 'white',
  },
  dateTimePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  dateTimePickerButton: {
    backgroundColor: '#B22235',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  dateTimePickerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDateText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 5,
  },
  selectedTimeText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 5,
  },
  
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 300, 
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'gray',
    // shadowColor: 'rgba(251, 86, 7, 0.25)',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 4,
    elevation: 4,
    

   
  },

  button1: {
    padding: 10,
    borderRadius: 5,
    width:'70%',
    

    
  },
  buttonNormal: {
    backgroundColor: 'blue',
  },
  buttonPressed: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign:'center',
    fontWeight:'bold'
  },
});

export default Create_Job_Post;
 

 
































































