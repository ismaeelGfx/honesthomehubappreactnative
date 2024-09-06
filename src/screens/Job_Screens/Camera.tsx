 






// import React, { useState } from 'react';
// import { View, Button, Image, ActivityIndicator, StyleSheet, Text, ScrollView, Alert } from 'react-native';
// import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
 

// const Camera: React.FC = () => {
//   const [imageSources, setImageSources] = useState<{ uri: string }[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [images, setimages] = useState<string[]>([]);
//   const uploadPreset= "upmyb4dy"

//   const selectImages = () => {
//     const options = {
//       mediaType: 'photo' as const,
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 1,
//       selectionLimit: 0, // Set to 0 for unlimited selection
//     };

//     launchImageLibrary(options, (response: ImagePickerResponse) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else if (response.assets) {
//         const sources = response.assets.map(asset => ({ uri: asset.uri }));
//         setImageSources(sources);
//       }
//     });
//   };

//   const handleUpload = async () => {
//     if (imageSources.length < 5) {
//       Alert.alert('Error', 'Please select at least 5 images.');
//       return;
//     }

//     setUploading(true);
//     const uploadedUrls: string[] = [];

//     for (const image of imageSources) {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: image.uri,
//         type: 'image/jpeg',
//         name: 'upload.jpg',
//       });
//       formData.append('upload_preset',  uploadPreset);

//       try {
//         const response = await fetch(`https://api.cloudinary.com/v1_1/degjqq6vo/upload`, {
//           method: 'POST',
//           body: formData,
//         });
//         const data = await response.json();
//         console.log('Upload successful:', data.secure_url);
//         uploadedUrls.push(data.secure_url);
//       } catch (error) {
//         console.error('Error uploading file:', error);
//       }
//     }

//     setimages(uploadedUrls);
//     setUploading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView horizontal>
//         {imageSources.map((source, index) => (
//           <Image key={index} source={source} style={styles.image} />
//         ))}
//       </ScrollView>
//       {uploading && <ActivityIndicator size="large" color="#0000ff" />}
//       <Button title="Select Images" onPress={selectImages} />
//       <Button title="Upload Images" onPress={handleUpload} disabled={imageSources.length < 5} />
//       {images.length > 0 && (
//         <ScrollView>
//           {images.map((url, index) => (
//             <Text key={index} style={styles.urlText}>Uploaded Image URL: {url}</Text>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     margin: 5,
//   },
//   urlText: {
//     marginTop: 10,
//     color: 'blue',
//     textAlign: 'center',
//   },
// });

// export default Camera;





// Camera.tsx
import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
 

interface CameraProps {
  onUploadComplete: (urls: string[]) => void;
}
const uploadPreset= "upmyb4dy"
const Camera: React.FC<CameraProps> = ({ onUploadComplete }) => {
  const [imageSources, setImageSources] = useState<{ uri: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const selectImages = () => {
    const options = {
      mediaType: 'photo' as const,
      selectionLimit: 0, // Set to 0 for unlimited selection
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const sources = response.assets.map(asset => ({ uri: asset.uri }));
        setImageSources(sources);
      }
    });
  };

  const handleUpload = async () => {
    if (imageSources.length < 5) {
      Alert.alert('Error', 'Please select at least 5 images.');
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const image of imageSources) {
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/degjqq6vo/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log('Upload successful:', data.secure_url);
        uploadedUrls.push(data.secure_url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setUploading(false);
    onUploadComplete(uploadedUrls); // Call the callback with the uploaded image URLs
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {imageSources.map((source, index) => (
          <Image key={index} source={source} style={styles.image} />
        ))}
      </ScrollView>
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      <Button title="Select Images" onPress={selectImages} />
      <Button title="Upload Images" onPress={handleUpload} disabled={imageSources.length < 5} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default Camera;
