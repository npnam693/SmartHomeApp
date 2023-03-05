import { Text, View, Image, TouchableOpacity, StyleSheet, Modal } from "react-native"
import { ScreenWidth } from "@rneui/base"
import SettingSquare from "../components/setting/SettingSquare"
import SettingRectangle from "../components/setting/SettingRectangle"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../AuthContext";
import { useContext, useState } from "react"
import QRCode from 'react-native-qrcode-svg';

export default function SettingScreen({ navigation }) {
    const { isLoggedIn, logout, setUserData, userData } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

    const handleClickLogout = () => {
        const removeData = async () => {
            try {
                await AsyncStorage.removeItem('userData');
                console.log('Dữ liệu đã được xoá!');
            } catch (e) {
                console.log('Lỗi khi xoá dữ liệu: ', e);
            }
        };
        removeData()
        setUserData(null)
        logout()
        navigation.navigate('AuthStackScreen')
    }


    return (
        <View style = {styles.container}>
            <Image source={{uri:'https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png'}} 
                style = {{width: 130, height: 130, borderRadius: 110, borderWidth: 1, borderColor:'#00B5D8'}}
            />
            <Text style = {{fontSize: 20, fontWeight: '600', color: '#10101'}}>{userData.name}</Text>
            <Text style = {{fontSize: 14, fontWeight: '400', color: '#666'}}>{userData.email}</Text>
            <View style = {styles.option}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <SettingSquare type = "SHARE_KEY" />
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    // transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                    onBackdropPress={() => {
                        console.log('alo')
                        setModalVisible(false)}
                    }
                >
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF8FF', margin: 'auto',
                        flex: 1
                    }}>


                    <QRCode
                        value={userData.home}
                        size={200}
                        color="black"
                        backgroundColor="white"
                        borderRadius={10}
                        padding={10}
                    />
                    <Text style={{fontSize: 18, fontWeight: '400', marginTop: 30}}>Key: {userData.home}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <View style = {{backgroundColor:'#ed6474', borderRadius: 16, marginTop: 50, width: 100, height:40,
                            alignItems: 'center', justifyContent:'center'
                        }}>
                            <Text style = {{color: 'white', fontWeight: '500', fontSize:18, }}>HIDE</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </Modal>
                <TouchableOpacity onPress={() => navigation.navigate('FaceRegconition')}>
                    <SettingSquare type = "FACE_RECOGNITION" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <SettingSquare type = "CHANGE_PIN" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <SettingSquare type = "ADD_DEVICE" />
                </TouchableOpacity>
            
            </View >
            <View style={[styles.options,{flexDirection: 'column', marginTop: 20}]}>
                <TouchableOpacity>
                    <SettingRectangle type = "PROFILE" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <SettingRectangle type = "NOTIFICATION" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <SettingRectangle type = "SUPPORT" />
                </TouchableOpacity>
                <TouchableOpacity onPress = {handleClickLogout}>
                    <SettingRectangle type = "LOGOUT" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    option: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: ScreenWidth - 50,
        marginTop: 30,
    }
})