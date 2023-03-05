import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native"
import { ScreenWidth } from "@rneui/base"
import SettingSquare from "../components/setting/SettingSquare"
import SettingRectangle from "../components/setting/SettingRectangle"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../AuthContext";
import { useContext  } from "react"


export default function SettingScreen({ navigation }) {
    const { isLoggedIn, logout, setUserData, userData } = useContext(AuthContext);
    
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
                <TouchableOpacity>
                    <SettingSquare type = "SHARE_KEY" />
                </TouchableOpacity>
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