// import React, { useState, useEffect, ReactNode } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet,TouchableOpacity, Image, SafeAreaView, Dimensions, BackHandler, KeyboardAvoidingView, Platform } from 'react-native';
// import socketService from './Socket_Service';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { baseurl } from '../BaseUrl';
 

// interface Message {
//   message: ReactNode;
//   sender: string;
 
//   text: string;
//   senderId: string;
//   receiverId: string;
//   _id:string;
// }

// const Chat: React.FC = ( {navigation }: any) => {

//   const windowHeight = Dimensions.get('window').height;
//   const paddingBottom = windowHeight * 0.15;
//   const windowWidth = Dimensions.get('window').width;
//   const viewWidth = windowWidth * 0.9;
//   const leftOffset = windowWidth * 0.4;
//   const viewheight = windowHeight * 0.4;




//   const [message, setMessage] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [senderId,setsenderid] = useState<string| null>(); // Example sender ID, replace with actual logic
//   const [receiverId,setrecieverid] = useState<string | null>();
//   const [vendor_name,setvendor_name] = useState<string | null>(); // Example receiver ID, replace with actual logic

// //   useEffect(() => {
// //     socketService.connect();

// //     // Listen for previous messages
// //     socketService.on("previous_messages", (previousMessages: Message[]) => {
// //       setMessages(previousMessages);
// //         console.log(messages,"MESSAGES")


// //     });

// //     // Listen for new messages
// //     // socketService.on('previous_messages', (msg: Message) => {
// //     //   setMessages((prevMessages) => [...prevMessages, msg]);
// //     // });

// //     // Request previous messages when the component mounts
// //     socketService.emit("get_previous_messages", {
// //       sender: senderId,
// //       receiver: receiverId,
// //     });

// //     return () => {
// //       socketService.disconnect();
// //     };
// //   }, [senderId, receiverId]);

// //   const sendMessage = () => {
// //     if (message.trim()) {
// //       const newMessage: Message = {
// //           _id: Math.random().toString(36).substr(2, 9),
// //           text: message,
// //           senderId,
// //           receiverId,
          
// //       };
// //       socketService.emit('send_message', newMessage);
// //       setMessage('');
// //       setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the new message to the state
// //     }
// //   };



// const handleBackPress = () => {
//   // Go back to the previous screen
//   navigation.goBack();
//   return true;
// };

// useEffect(() => {
//   // Add event listener for the hardware back button
//   const backHandler = BackHandler.addEventListener(
//     'hardwareBackPress',
//     handleBackPress
//   );

//   // Cleanup event listener on component unmount
//   return () => backHandler.remove();
// }, []);




// useEffect(() => {

 
//     socketService.connect();
  
//     // Listen for previous messages
//     socketService.on("previous_messages", (previousMessages: Message[]) => {
//       setMessages(previousMessages);
//     //   console.log(messages, "MESSAGES");
//     });
  
//     // Request previous messages when the component mounts
//     socketService.emit("get_previous_messages", {
//       sender: senderId,
//       receiver: receiverId,
//     });
  
//     // This effect will run again whenever messages state changes
//   }, [messages]);

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
        
//             const vendorname1 = await AsyncStorage.getItem('vendor_name');
            
//             setvendor_name(vendorname1)
             

            
             
//         } catch (error) {
//             console.error('Error fetching data from AsyncStorage:', error);
//         }
//     };

//     fetchData();
// }, []);

  


//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const customer_id = await AsyncStorage.getItem('customer_id');
//             const vendor_id = await AsyncStorage.getItem('vendor_id');
//             console.log('Customer ID:', customer_id);
//             setsenderid(customer_id)
//             setrecieverid(vendor_id)
//             console.log('Vendor ID:', vendor_id);
//         } catch (error) {
//             console.error('Error fetching data from AsyncStorage:', error);
//         }
//     };

//     fetchData();
// }, []);







//   // useEffect(() => {
//   //   socketService.connect();
  
//   //   // Listen for previous messages
//   //   socketService.on("previous_messages", (previousMessages: Message[]) => {
//   //     setMessages(previousMessages);
//   //   //   console.log(messages, "MESSAGES");
//   //   });
  
//   //   // Request previous messages when the component mounts
//   //   socketService.emit("get_previous_messages", {
//   //     sender: senderId,
//   //     receiver: receiverId,
//   //   });
  
//   //   // This effect will run again whenever messages state changes
//   // }, [senderId, receiverId, messages]);


// const sendMessage = async () => {
//     if (message !== '') {
//       const messageData = {
//         sender: senderId,
//         receiver: receiverId,
//         message: message,
//       };
//       // console.log(messageData);
//         socketService.emit('send_message', messageData);
//       setMessage('');
 
//     }
//   };


 
  



//   return (
//     // <View style={styles.container}>

// <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <SafeAreaView>

      

//         <View style={{paddingBottom:30 ,justifyContent:'flex-start',alignItems:"center",flexDirection:'row' 
//           ,gap:30
//         }}>

//         <TouchableOpacity onPress={handleBackPress}>

// <Image
//     source={require('../assets/images/back-button.png')}
//     style={{height:40,width:40}}
// />
// </TouchableOpacity>
//         <Text style={{ color: 'white',
//     textAlign: 'center',
   
//     fontSize: 20,
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     lineHeight: 24,}}>
//           {vendor_name}
//         </Text>

         

//         </View>

      


// <View style={{height:"82%"}}>

//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <View style={item.sender === senderId ? styles.myMessage : styles.theirMessage}>
//             <Text style={styles.messageText}>
//               {item.sender === senderId ? 'You' : 'Vendor'}: {item.message}
//             </Text>

          



//           </View>
//         )}
//         keyExtractor={(item) => item._id}
//       />
// </View>

//       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:5,marginBottom:20,position:"relative",zIndex:7}}>

      
//       <TextInput
//         style={styles.input}
//         value={message}
//         onChangeText={setMessage}
//         placeholder="Type a message"
//         placeholderTextColor="white"
//       />

      
       

//       <TouchableOpacity onPress={sendMessage}  style={{paddingBottom:10}}>
//         <Image
//         source={require('../assets/images/send.png')}
//         style={{height:40,width:40,resizeMode:'contain'}}
//         />
//       </TouchableOpacity>
//       </View>
//       </SafeAreaView>

// </KeyboardAvoidingView>
    

    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor:'#13171B',
//     height:200
//   },
//   myMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#13171B',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 5,
//     // width:'90%',
    
//   },
//   theirMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#B22235',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 5,
//     // width:'90%',
   
//   },
//   messageText: {
//     fontSize: 16,
//     color:'white'
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
    
//     color:'white',
//     borderRadius:10,
//     width:'90%',
  
//   },
// });

// export default Chat;


 







import React, { useState, useEffect, ReactNode } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  BackHandler,
} from 'react-native';
import socketService from './Socket_Service';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  message: string;
  senderId: string;
  receiverId: string;
  _id: string;
}

const Chat: React.FC = ({ navigation }: any) => {
  const windowHeight = Dimensions.get('window').height;
  const paddingBottom = windowHeight * 0.15;
  const windowWidth = Dimensions.get('window').width;
  const viewWidth = windowWidth * 0.9;
  const leftOffset = windowWidth * 0.4;
  const viewheight = windowHeight * 0.4;




  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [senderId,setsenderid] = useState<string| null>(); // Example sender ID, replace with actual logic
  const [receiverId,setrecieverid] = useState<string | null>();
  const [vendor_name,setvendor_name] = useState<string | null>(); // Example receiver ID, replace with actual logic

//   useEffect(() => {
//     socketService.connect();

//     // Listen for previous messages
//     socketService.on("previous_messages", (previousMessages: Message[]) => {
//       setMessages(previousMessages);
//         console.log(messages,"MESSAGES")


//     });

//     // Listen for new messages
//     // socketService.on('previous_messages', (msg: Message) => {
//     //   setMessages((prevMessages) => [...prevMessages, msg]);
//     // });

//     // Request previous messages when the component mounts
//     socketService.emit("get_previous_messages", {
//       sender: senderId,
//       receiver: receiverId,
//     });

//     return () => {
//       socketService.disconnect();
//     };
//   }, [senderId, receiverId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const newMessage: Message = {
//           _id: Math.random().toString(36).substr(2, 9),
//           text: message,
//           senderId,
//           receiverId,
          
//       };
//       socketService.emit('send_message', newMessage);
//       setMessage('');
//       setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the new message to the state
//     }
//   };



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

 
    socketService.connect();
  
    // Listen for previous messages
    socketService.on("previous_messages", (previousMessages: Message[]) => {
      setMessages(previousMessages);
    //   console.log(messages, "MESSAGES");
    });
  
    // Request previous messages when the component mounts
    socketService.emit("get_previous_messages", {
      sender: senderId,
      receiver: receiverId,
    });
  
    // This effect will run again whenever messages state changes
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
        try {
        
            const vendorname1 = await AsyncStorage.getItem('vendor_name');
            
            setvendor_name(vendorname1)
             

            
             
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
        }
    };

    fetchData();
}, []);

  


  useEffect(() => {
    const fetchData = async () => {
        try {
            const customer_id = await AsyncStorage.getItem('customer_id');
            const vendor_id = await AsyncStorage.getItem('vendor_id');
            console.log('Customer ID:', customer_id);
            setsenderid(customer_id)
            setrecieverid(vendor_id)
            console.log('Vendor ID:', vendor_id);
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
        }
    };

    fetchData();
}, []);







  // useEffect(() => {
  //   socketService.connect();
  
  //   // Listen for previous messages
  //   socketService.on("previous_messages", (previousMessages: Message[]) => {
  //     setMessages(previousMessages);
  //   //   console.log(messages, "MESSAGES");
  //   });
  
  //   // Request previous messages when the component mounts
  //   socketService.emit("get_previous_messages", {
  //     sender: senderId,
  //     receiver: receiverId,
  //   });
  
  //   // This effect will run again whenever messages state changes
  // }, [senderId, receiverId, messages]);


const sendMessage = async () => {
    if (message !== '') {
      const messageData = {
        sender: senderId,
        receiver: receiverId,
        message: message,
      };
      // console.log(messageData);
        socketService.emit('send_message', messageData);
      setMessage('');
 
    }
  };

interface Message {
  message: ReactNode;
  sender: string;
 
  text: string;
  senderId: string;
  receiverId: string;
  _id:string;
}


 
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              source={require('../assets/images/back-button.png')}
              style={{ height: 40, width: 40 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{vendor_name}</Text>
        </View>


<View>
  
</View>
        <FlatList
  data={messages}
  renderItem={({ item }) => (
    <View style={item.sender === senderId ? styles.myMessageContainer : styles.theirMessageContainer}>
      <View style={item.sender === senderId ? styles.myMessage : styles.theirMessage}>
        <Text style={styles.messageText}>
          {item.sender === senderId ? 'You' : 'Vendor'}: {item.message}
        </Text>
      </View>
    </View>
  )}
  keyExtractor={(item) => item._id}
  contentContainerStyle={{ paddingBottom: 20 }}
/>


        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            placeholderTextColor="white"
          />
          <TouchableOpacity onPress={sendMessage}>
            <Image
              source={require('../assets/images/send.png')}
              style={{ height: 40, width: 40, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13171B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    // backgroundColor:'red'
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  messageContainer: {
    backgroundColor: '#13171B',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#13171B',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    marginRight: 10,
  },

  myMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  theirMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  myMessage: {
    backgroundColor: '#292626',
    padding: 10,
    borderRadius: 5,
    maxWidth: '80%',
    marginLeft:10
  },
  theirMessage: {
    backgroundColor: '#B22235',
    padding: 10,
    borderRadius: 5,
    maxWidth: '80%',
    marginRight:10
  },
  messageText2: {
    fontSize: 16,
    color: 'white',
  },
});

export default Chat;










 