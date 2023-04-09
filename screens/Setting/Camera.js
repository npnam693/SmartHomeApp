import { StyleSheet, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '@rneui/themed';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export default function UploadCamera({navigation, route}){
    const [type, setType] = useState(CameraType.back);
    const [cameraPermission, setCameraPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const cameraRef = useRef(null)
    const [flashIcon, setFlashIcon] = useState(<Ionicons name="flash-outline" size={24} color='#fff' />)

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            setCameraPermission(cameraStatus.status === 'granted')
            if (cameraStatus.status !==  'granted')
                navigation.goBack()
        })();
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync()
                console.log(data)
                setImage(data.uri)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const saveImage = async () => {
        if (image) {
            route.params.setImages(prev => [...prev, {
                uri: image
            }])
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            {!image ? (
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 30,
                        paddingTop: 20
                    }}>
                        <Button icon={<Ionicons name="refresh" size={24} color='#fff' />} type='clear'
                            onPress={() => setType(prev => prev === CameraType.back ? CameraType.front : CameraType.back)}
                        />
                        <Button icon={flashIcon} type='clear'
                            onPress={() => {
                                flash === Camera.Constants.FlashMode.off ? setFlashIcon(<Ionicons name="flash" size={24} color='#fff' />) : setFlashIcon(<Ionicons name="flash-outline" size={24} color='#fff' />)
                                setFlash(prev =>
                                    prev === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
                            }
                            }
                        />
                    </View>
                </Camera>
            ) : <Image source={{ uri: image }} style={styles.camera} />}

            <View>
                {image ? (
                    <View style={styles.option}>
                        <Button title='Cancle' icon={<Ionicons name="backspace" size={24} color='#fff' />} type='clear'
                            titleStyle={{
                                color: '#fff',
                                marginLeft: 5
                            }}
                            onPress={() => setImage(null)}
                        />
                        <Button title='save' icon={<Ionicons name='download' size={24} color='#fff' />} type='clear'
                            titleStyle={{
                                color: '#fff',
                                marginLeft: 5
                            }}
                            onPress={saveImage}
                        />
                    </View>) : (
                    <View style={{
                        display: 'flex',
                        alignItems:'center',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        bottom: 40,
                        width: '100%',
                        zIndex: 1
                    }}>
                        <Button
                            icon={<Ionicons name='camera' size={40} color='#000' />}
                            buttonStyle={{
                                backgroundColor: '#fff',
                                width: 80,
                                marginTop: 10
                            }}
                            titleStyle={{
                                marginLeft: 5
                            }}
                            radius={50}
                            onPress={takePicture}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "transparent",
        height: '100%'
    },

    camera: {
        flex: 1,
        borderRadius: 20,
        position: 'relative',
        height: '100%',
    },

    option: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 30
    }
});