import { Text, View, Image, TouchableOpacity, StyleSheet, Modal, ScrollView, Dimensions, Pressable } from "react-native"
import { ScreenWidth } from "@rneui/base"
import SettingSquare from "../../components/setting/SettingSquare"
import SettingRectangle from "../../components/setting/SettingRectangle"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../../AuthContext";
import { useContext, useState } from "react"
import QRCode from 'react-native-qrcode-svg';

export default function SettingScreen({ navigation }) {
    const { isLoggedIn, logout, setUserData, userData, setNotifs } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const handleClickLogout = () => {
        const removeData = async () => {
            try {
                await AsyncStorage.removeItem('userData');
                await AsyncStorage.removeItem('notifs');
                console.log('Dữ liệu đã được xoá!');
            } catch (e) {
                console.log('Lỗi khi xoá dữ liệu: ', e);
            }
        };
        removeData()
        setUserData(null)
        setNotifs([])
        logout()
        navigation.navigate('AuthStackScreen')
    }
    console.log(userData.homeID)

    return (
        <View style = {styles.container}>
            <Image source={{uri:'https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png'}} 
                style = {{width: 100, height: 100, borderRadius: 110, borderWidth: 3, borderColor:'#90B2C4'}}
            />
            <Text style = {{fontSize: 20, fontWeight: '600', color: '#101010'}}>{userData.name}</Text>
            <Text style = {{fontSize: 14, fontWeight: '400', color: '#666', marginBottom: 12}}>{userData.email}</Text>
            
            <View style={styles.option}>
                <Pressable onPress={() => setModalVisible(true)} activeOpacity={0.05}>
                    <SettingSquare type = "SHARE_KEY" />
                </Pressable>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                    onBackdropPress={() => {
                        console.log('alo')
                        setModalVisible(false)}
                    }
                >
                    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF8FF', flex: 1
                    }}>
                        <QRCode
                            value={userData.homeID}
                            size={200}
                            color="black"
                            backgroundColor="white"
                            borderRadius={10}
                            padding={10}
                        />
                        <Text style={{fontSize: 18, fontWeight: '400', marginTop: 30}}>Key: {userData.homeID}</Text>
                        <Pressable onPress={() => setModalVisible(!modalVisible)} activeOpacity={0.05}>
                            <View style = {{backgroundColor:'#ed6474', borderRadius: 16, marginTop: 50, width: 100, height:40,
                                alignItems: 'center', justifyContent:'center'
                            }}>
                                <Text style = {{color: 'white', fontWeight: '500', fontSize:18, }}>HIDE</Text>
                            </View>
                        </Pressable>
                    </View>
                </Modal>
                <Pressable onPress={() => navigation.navigate('Face Regconition')} activeOpacity={0.05}>
                    <SettingSquare type = "FACE_RECOGNITION" />
                </Pressable >
                <Pressable onPress={() => navigation.navigate('Change Pin')} activeOpacity={0.05}>
                    <SettingSquare type = "CHANGE_PIN" />
                </Pressable>
                <Pressable>
                    <SettingSquare type = "ADD_DEVICE" />
                </Pressable>
            </View >
            <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center', width: Dimensions.get('window').width, }} showsVerticalScrollIndicator={false}>
                <View style={[{flexDirection: 'column', marginTop: 20}]}>
                    <TouchableOpacity>
                        <SettingRectangle type = "PROFILE" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Automation Setting')}>
                        <SettingRectangle type="AUTOMATION" />
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
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },
    option: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: ScreenWidth - 50,
        marginTop: 10,
    }
})