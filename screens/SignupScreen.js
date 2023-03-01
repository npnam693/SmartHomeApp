import { Image, View, Text, TextInput, StyleSheet } from "react-native"
import { ScreenWidth } from "@rneui/base"
import { Button } from "@rneui/base"
import { useState } from "react"
export default function SignupScreen(){
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    console.log(data)
    return (
        <View>
            <Image source = {require('../assets/images/IntroSignup.png')} style={{width: ScreenWidth, height: 284, marginTop: 20}}/>
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder = {'Username'}
                    style={{
                        backgroundColor : "#D3D3D3",
                        height: 48,
                        borderRadius: 8,
                        padding: 10,
                        color: '#333',
                        fontSize: 15,
                        paddingHorizontal: 20,
                        marginBottom: 22,
                    }}
                    value = {data.username}
                    onChangeText={(input) => setData({...data, username: input})}
                />
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
                        marginBottom: 22,
                    }}
                    value = {data.email}
                    onChangeText={(input) => setData({...data, email: input})}
                />
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
                        marginBottom: 22,
                    }}
                    value = {data.password}
                    onChangeText={(input) => setData({...data, password: input})}
                />
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
                    }}
                    value = {data.confirmPassword}
                    onChangeText={(input) => setData({...data, confirmPassword: input})}
                />
                

                <Button  type="solid" 
                    buttonStyle={{ backgroundColor: "#00B5D8", marginVertical: 40, borderRadius: 8, height: 48}}
                    titleStyle={{ color: 'black', marginHorizontal: 20 }}
                >
                    Agree and Register
                </Button>
            </View>
        </View>
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