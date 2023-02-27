import { Text, View, StyleSheet } from "react-native"

export default function DeviceScreen({ navigation }){
    return (
        <View style = {styles.container}>
            <Text>Device Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    }
})

