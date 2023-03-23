import { Image, View, Text, TextInput, StyleSheet, ScrollView } from "react-native"
import { ScreenWidth } from "@rneui/base"
import { Button } from "@rneui/base"
import { useState, useContext } from "react"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({navigation}){
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        homeID: "",
    })

    const handleClickSubmit = () => {
        if (data.name == "" || data.email == "" || data.password == "" || data.confirmPassword == "") {
            alert('You have to fill full the fields')
            return
        }
        
        if (data.password != data.confirmPassword) {
            alert('You need to confirm the correct password')
            return
        }

        axios.post('http://10.0.2.2:3000/api/users', {
            name: data.name, email: data.email, password: data.password, homeID: data.homeID
        })
        .then(response => {
            console.log(response.data);
            AsyncStorage.setItem('userData', JSON.stringify(response.data))
            navigation.navigate("SetPINScreen", {userID: response.data._id, userName: response.data.name, userEmail: response.data.email})
        })
        .catch(error => {
            if (error.response) {
                alert (error.response.data.message)
                return
            }
            else {
                alert('Gặp lỗi');
                console.log(error)
            }
        });
    }

    return (
        <ScrollView>
            <Image source = {require('../assets/images/IntroSignup.png')} style={{width: ScreenWidth, height: 284, marginTop: 20}}/>
            <View style = {styles.inputContainer}>
                <KeyboardAwareScrollView extraScrollHeight={300}>
                <TextInput
                    placeholder = {'Name'}
                    style={{
                        backgroundColor : "#D3D3D3",
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
                        backgroundColor : "#D3D3D3",
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
                    <TextInput
                        placeholder = {'Password'}
                        style={{
                            backgroundColor : "#D3D3D3",
                            height: 48,
                            borderRadius: 8,
                            padding: 10,
                            color: '#333',
                            fontSize: 15,
                            paddingHorizontal: 20,
                            marginBottom: 14,
                        }}
                        value = {data.password}
                        onChangeText={(input) => setData({...data, password: input})}
                    />
                </KeyboardAwareScrollView>
                <KeyboardAwareScrollView extraScrollHeight={100}>
                    <TextInput
                        placeholder = {'Confirm Password'}
                        style={{
                            backgroundColor : "#D3D3D3",
                            height: 48,
                            borderRadius: 8,
                            padding: 10,
                            color: '#333',
                            fontSize: 15,
                            paddingHorizontal: 20,
                            marginBottom: 14,

                        }}
                        value = {data.confirmPassword}
                        onChangeText={(input) => setData({...data, confirmPassword: input})}
                    />
                </KeyboardAwareScrollView>
                

                <KeyboardAwareScrollView extraScrollHeight={100}>
                    <TextInput
                        placeholder = {'Your Home key (You can ignore)'}
                        style={{
                            backgroundColor : "#D3D3D3",
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