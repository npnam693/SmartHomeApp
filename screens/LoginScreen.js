import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenWidth } from "@rneui/base"
import { Button } from "@rneui/base"
import { useState, useContext, useEffect} from "react"
import AuthContext from "../AuthContext";
import axios from 'axios'
import { axiosClient } from '../api/axiosSetup';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LoginScreen({ navigation }){
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const [hidePass, setHidePass] = useState(true)

    const [isSending, setIsSending] = useState(false)

    const { isLoggedIn, login, socket } = useContext(AuthContext);

    const handleClickLogin = () => {
        if (data.email == '' || data.password == '') {
            alert('Please fill all fields')
        }
        setIsSending(true)
        axiosClient.post('api/users/login', {
            email: data.email, password: data.password
        })
            .then(response => {
                console.log('HUHUUH', response.data)
                AsyncStorage.setItem('userData', JSON.stringify(response.data))
                setIsSending(false)
                login()
                socket.emit('setup', response.data._id)
                navigation.navigate('TabNavigation')
            })
            .catch(error => {
                setIsSending(false)
                alert(error.response.data.message);
            });
        }

    return (
        <ScrollView style = {styles.container}>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={isSending}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
            />
            <Image source = {require('../assets/images/IntroLogin.png')} style={{width: ScreenWidth, height: 356, marginTop: 30}}/>
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder = {'Enter your email'}
                    style={{
                        backgroundColor : "#EEEEEE",
                        height: 48,
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 15,
                        paddingHorizontal: 20,
                        marginBottom: 22,
                    }}
                    value = {data.email}
                    onChangeText={(input) => setData({...data, email: input})}
                />
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        placeholder = {'Enter your password'}
                        style={{
                            backgroundColor : "#EEEEEE",
                            height: 48,
                            borderRadius: 8,
                            padding: 10,
                            fontSize: 15,
                            paddingHorizontal: 20,
                            width:'100%'
                        }}
                        textContentType='password'
                        secureTextEntry={hidePass ? true : false}
                        value = {data.password}
                        onChangeText={(input) => setData({ ...data, password: input })} 
                    />
                    <Pressable
                        onPress={() => setHidePass(!hidePass)}
                    >
                        <Ionicons name={hidePass ? "eye-outline" : "eye-off-outline"} size={24} style={{right: 36, top: 10}} />
                    </Pressable>
                </View>
                <Text style = {styles.forgetPass}>Forget Password ?</Text>
                <Button  type="solid" 
                    buttonStyle={{ backgroundColor: "#00B5D8", marginVertical: 40, borderRadius: 8, height: 48}}
                    titleStyle={{ color: 'black', marginHorizontal: 20 }}
                    onPress={handleClickLogin}
                >
                    Login
                </Button>
                <View style = {styles.registerContainer}>
                    <Text styles = {styles.forgetPass}>Don't have a account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                        <Text style = {{color: '#FF8A14', fontWeight:'600'}}>Register Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        padding: 30,
    },
    forgetPass: {
        marginLeft: 'auto',
        color: '#1EA0E9',
        fontWeight: "600",
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})