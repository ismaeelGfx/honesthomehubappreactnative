// import React, { useState } from 'react';
// import { Text, TouchableOpacity, View, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
// import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';

// interface SelectedFile {
//   uri: string;
//   type: string;
//   name: string;
// }

// interface RealCameraProps {
//     onUploadComplete: (urls: string[]) => void;
//   }

// const RealCamera: React.FC <RealCameraProps>= ({onUploadComplete}) => {
//   const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
//   const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
//   const [uploading, setUploading] = useState(false);

//   const uploadPreset = 'upmyb4dy'; // Replace with your actual upload preset

//   const openCamera = () => {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then((image: PickerImage) => {
//       const newImage: SelectedFile = {
//         uri: image.path,
//         type: image.mime,
//         name: image.path.split('/').pop() || '',
//       };
//       setSelectedFiles(prevFiles => [...prevFiles, newImage]);
//     }).catch(error => {
//       console.error('Error opening camera:', error);
//     });
//   };

//   const openGallery = () => {
//     ImagePicker.openPicker({
//       multiple: true
//     }).then(images => {
//       const newImages: SelectedFile[] = images.map((image: PickerImage) => ({
//         uri: image.path,
//         type: image.mime,
//         name: image.path.split('/').pop() || '',
//       }));
//       setSelectedFiles(prevFiles => [...prevFiles, ...newImages]);
//     }).catch(error => {
//       console.error('Error opening gallery:', error);
//     });
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length === 0) {
//       console.error('No files selected');
//       return;
//     }

//     setUploading(true);

//     const urls: string[] = [];
//     for (const file of selectedFiles) {
//       const formData = new FormData();
//       formData.append('file', {
//         uri: file.uri,
//         type: file.type,
//         name: file.name,
//       } as any);
//       formData.append('upload_preset', uploadPreset);

//       try {
//         const response = await fetch(`https://api.cloudinary.com/v1_1/degjqq6vo/upload`, {
//           method: 'POST',
//           body: formData,
//         });
//         const data = await response.json();
//         urls.push(data.url);
//       } catch (error) {
//         console.error('Error uploading file:', error);
//       }
//     }

//     console.log(urls)
//     setUploadedUrls(urls);
//     onUploadComplete(urls)

    
//     setUploading(false);
//   };

//   return (
//     <View style={styles.container}>

//         <View style={{flexDirection:'row',gap:20}}>

//       <TouchableOpacity   onPress={openCamera}>
//         <Image
//         source={require('../../assets/images/camera.png')}
//         style={{width:50,height:50,resizeMode:'contain'}}
        
//         />
//       </TouchableOpacity>

//       <TouchableOpacity  onPress={openGallery}>
//       <Image
//         source={require('../../assets/images/gallery.png')}
//         style={{width:50,height:50,resizeMode:'contain'}}
        
//         />
//       </TouchableOpacity>
//         </View>

//       <ScrollView horizontal style={styles.imageContainer}>
//         {selectedFiles.map((file, index) => (
//           <Image key={index} source={{ uri: file.uri }} style={styles.image} />
//         ))}
//       </ScrollView>
//       {uploading && <ActivityIndicator size="large" color="#B22235" />}

//       <TouchableOpacity style={styles.button} onPress={handleUpload} disabled={selectedFiles.length === 0}>
//         <Text style={styles.buttonText}>Upload Images</Text>
//       </TouchableOpacity>

     

//       {/* <ScrollView style={styles.uploadedImagesContainer}>
//         {uploadedUrls.map((url, index) => (
//           <Text key={index}>{url}</Text>
//         ))}
//       </ScrollView> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   button: {
//     backgroundColor: '#B22235',
//     padding: 10,
//     marginVertical: 10,
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     marginVertical: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginRight: 10,
//     borderRadius:10
//   },
//   uploadedImagesContainer: {
//     marginTop: 20,
//   },
// });

// export default RealCamera;




import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';

interface SelectedFile {
  uri: string;
  type: string;
  name: string;
}

interface RealCameraProps {
  onUploadComplete: (urls: string[]) => void;
}

const RealCamera: React.FC<RealCameraProps> = ({ onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadPreset = 'n1qpwtzo'; // Replace with your actual upload preset

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image: PickerImage) => {
      const newImage: SelectedFile = {
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop() || '',
      };
      const newFiles = [...selectedFiles, newImage];
      setSelectedFiles(newFiles);
      handleUpload(newFiles);
    }).catch(error => {
      console.error('Error opening camera:', error);
    });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      const newImages: SelectedFile[] = images.map((image: PickerImage) => ({
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop() || '',
      }));
      const newFiles = [...selectedFiles, ...newImages];
      setSelectedFiles(newFiles);
      handleUpload(newFiles);
    }).catch(error => {
      console.error('Error opening gallery:', error);
    });
  };

  const handleUpload = async (files: SelectedFile[]) => {
    if (files.length === 0) {
      console.error('No files selected');
      return;
    }

    setUploading(true);

    const urls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any);
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/ddaif35tp/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        urls.push(data.url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setUploadedUrls(urls);
    onUploadComplete(urls);
    setUploading(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <TouchableOpacity onPress={openCamera}>
          <Image
            source={require('../../assets/images/camera.png')}
            style={{ width: 50, height: 50, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <Image
            source={require('../../assets/images/gallery.png')}
            style={{ width: 50, height: 50, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal style={styles.imageContainer}>
        {selectedFiles.map((file, index) => (
          <Image key={index} source={{ uri: file.uri }} style={styles.image} />
        ))}
      </ScrollView>
      {uploading && <ActivityIndicator size="large" color="#B22235" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width:"90%"
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default RealCamera;