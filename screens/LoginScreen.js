import { Image, View, Text, TextInput, StyleSheet } from "react-native"
import { ScreenWidth } from "@rneui/base"
import { Button } from "@rneui/base"
export default function LoginScreen({ navigation }){
    return (
        <View>
            <Image source = {require('../assets/images/IntroLogin.png')} style={{width: ScreenWidth, height: 400, marginTop: 20}}/>
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
                />
                <Text style = {styles.forgetPass}>Forget Password ?</Text>
                <Button radius={'sm'} type="solid" 
                    buttonStyle={{ backgroundColor: "#E6FFFA", marginTop: 40, borderWidth: 1, borderColor:'#fff'}}
                    titleStyle={{ color: 'black', marginHorizontal: 20 }}
                >
                    Login
                </Button>

                <Text style = {[styles.forgetPass, {marginRight: 'auto', color: '#333'}]}>Don't have a account?</Text>
                <Button radius={'sm'} type="solid" 
                    buttonStyle={{ backgroundColor: "#E6FFFA", borderWidth: 1, borderColor:'#fff'}}
                    titleStyle={{ color: 'black', marginHorizontal: 20 }}
                    onPress = {() => navigation.navigate('Signup')}
                >
                    SIGN UP
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