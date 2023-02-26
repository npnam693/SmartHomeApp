import { Image, View, Text, TextInput, StyleSheet } from "react-native"
import { ScreenWidth } from "@rneui/base"
import { Button } from "@rneui/base"
export default function SignupScreen(){
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
                />
                
                <Button radius={'sm'} type="solid" 
                    buttonStyle={{ backgroundColor: "#E6FFFA", marginTop: 40}}
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