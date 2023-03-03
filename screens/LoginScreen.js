import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { ScreenWidth } from "@rneui/base"
import { Button } from "@rneui/base"
import { useState } from "react"
export default function LoginScreen({ navigation }){
    const [data, setData] = useState({
        username: '',
        password: '',
    })
    
    const handleClickLogin = () => {
        console.log(data)
        navigation.navigate('PinScreen')
    }
    return (
        <View style = {styles.container}>
            <Image source = {require('../assets/images/IntroLogin.png')} style={{width: ScreenWidth, height: 356, marginTop: 30}}/>
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder = {'Enter your email'}
                    style={{
                        backgroundColor : "#D3D3D3",
                        height: 48,
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 15,
                        paddingHorizontal: 20,
                        marginBottom: 22,
                    }}
                    value = {data.username}
                    onChangeText={(input) => setData({...data, username: input})}
                />
                <TextInput
                    placeholder = {'Enter your password'}
                    style={{
                        backgroundColor : "#D3D3D3",
                        height: 48,
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 15,
                        paddingHorizontal: 20,
                    }}
                    textContentType = 'password'
                    value = {data.password}
                    onChangeText = {(input) => setData({...data, password: input})}
                />
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
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'white'
    },
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