import { Text, View, StyleSheet } from "react-native";

export default function DetailVisualization() {
    return (
        <View style = {styles.container}>
            <View style = {styles.quickInfo}>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    quickInfo: {
        height: '20%',
        backgroundColor: '#EBF8FF',
        width: '100%'
    }
})