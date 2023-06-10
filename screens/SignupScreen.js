import { Image, View, Text, TextInput, StyleSheet, ScrollView, Pressable } from "react-native"
import { ScreenWidth } from "@rneui/base"
import { Button } from "@rneui/base"
import { useState, useContext } from "react"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosClient } from "../api/axiosSetup";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SignupScreen({navigation}){
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        homeID: "",
    })
    const [isSending, setIsSending] = useState(false)

    const [showPass, setShowPass] = useState({
        pass: true,
        confirm: true,
    })

    const handleClickSubmit = () => {
        if (data.name == "" || data.email == "" || data.password == "" || data.confirmPassword == "" || data.homeID == "" ) {
            alert('You have to fill full the fields')
            return
        }
        
        if (data.password != data.confirmPassword) {
            alert('You need to confirm the correct password')
            return
        }

        setIsSending(true)
        axiosClient.post('api/users', {
            name: data.name, email: data.email, password: data.password, homeID: data.homeID
        })
        .then(response => {
            console.log(response.data);
            setIsSending(false)
            AsyncStorage.setItem('userData', JSON.stringify(response.data))
            navigation.navigate("SetPINScreen", {userID: response.data._id, userName: response.data.name, userEmail: response.data.email})
        })
        .catch(error => {
            setIsSending(false)
            if (error.response) {
                alert (error.response.data.message)
                return
            }
            else {
                alert('An Error Occurred Please Try Again Later');
                console.log(error)
            }
        });
    }

    return (
        <ScrollView>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={isSending}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
            />
            <Image source = {require('../assets/images/IntroSignup.png')} style={{width: ScreenWidth, height: 284, marginTop: 20}}/>
            <View style = {styles.inputContainer}>
                <KeyboardAwareScrollView extraScrollHeight={300}>
                <TextInput
                    placeholder = {'Name'}
                    style={{
                        backgroundColor : "#EEEEEE",
                        height: 48,
                        borderRadius: 8,
                        padding: 10,
                        color: '#333',
                        fontSize: 15,
                        paddingHorizontal: 20,
                        marginBottom: 14,

                    }}
                    value = {data.name}
                    onChangeText={(input) => setData({...data, name: input})}
                />
            </KeyboardAwareScrollView>
                <TextInput
                    placeholder = {'Email'}
                    style={{
                        backgroundColor : "#EEEEEE",
                        height: 48,
                        borderRadius: 8,
                        padding: 10,
                        color: '#333',
                        fontSize: 15,
                        paddingHorizontal: 20,
                        marginBottom: 14,
                    }}
                    value = {data.email}
                    onChangeText={(input) => setData({...data, email: input})}
                />
                <KeyboardAwareScrollView extraScrollHeight={300}>
                    <View style = {{flexDirection: 'row'}}>
                        <TextInput
                            placeholder = {'Password'}
                            style={{
                                backgroundColor : "#EEEEEE",
                                height: 48,
                                borderRadius: 8,
                                padding: 10,
                                color: '#333',
                                fontSize: 15,
                                paddingHorizontal: 20,
                                marginBottom: 14,
                                width:'100%'
                            }}
                            value = {data.password}
                            onChangeText={(input) => setData({...data, password: input})}
                            secureTextEntry={showPass.pass ? true : false}
                        
                        
                        />
                        <Pressable         
                            onPress={() => setShowPass({...showPass, pass: !showPass.pass})}
                        >
                            <Ionicons name={showPass.pass ? "eye-outline" : "eye-off-outline"} size={24} style={{right: 36, top: 10}} />
                        </Pressable>
                    </View>
                </KeyboardAwareScrollView>
                <KeyboardAwareScrollView extraScrollHeight={100}>
                    <View style = {{flexDirection: 'row'}}>
                    <TextInput
                        placeholder = {'Confirm Password'}
                        style={{
                            backgroundColor : "#EEEEEE",
                            height: 48,
                            borderRadius: 8,
                            padding: 10,
                            color: '#333',
                            fontSize: 15,
                            paddingHorizontal: 20,
                            marginBottom: 14,
                            width:'100%'
                        }}
                        value={data.confirmPassword}
                        secureTextEntry={showPass.confirm ? true : false}

                        onChangeText={(input) => setData({...data, confirmPassword: input})}
                    />
                        <Pressable         
                            onPress={() => setShowPass({...showPass, confirm: !showPass.confirm})}
                        >
                            <Ionicons name={showPass.confirm ? "eye-outline" : "eye-off-outline"} size={24} style={{right: 36, top: 10}} />
                        </Pressable>
                    </View>



                </KeyboardAwareScrollView>
                

                <KeyboardAwareScrollView extraScrollHeight={100}>
                    <TextInput
                        placeholder = {'Home key'}
                        style={{
                            backgroundColor : "#EEEEEE",
                            height: 48,
                            borderRadius: 8,
                            padding: 10,
                            color: '#333',
                            fontSize: 15,
                            paddingHorizontal: 20,
                        }}
                        value = {data.homeID}
                        onChangeText={(input) => setData({...data, homeID: input})}
                    />
                </KeyboardAwareScrollView>

                <Button  type="solid" 
                    buttonStyle={{ backgroundColor: "#00B5D8", borderRadius: 8, height: 48, marginTop: 20}}
                    titleStyle={{ color: 'black', marginHorizontal: 20 }}
                    onPress={handleClickSubmit}
                >
                    Agree and Register
                </Button>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    inputContainer: {
        padding: 30,
    },
    forgetPass: {
        // width: '100%',
        marginLeft: 'auto',
        color: '#1EA0E9',
        fontWeight: "600",
    }
})