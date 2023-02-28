import { Text, View, StyleSheet} from "react-native"
import NotificationItem from "../components/NotificationItem"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function NotificationScreen({ navigation }) {
    return (
        <View style = {styles.container}>
            <View style = {styles.headerTab}>
                <Text style = {styles.textHeader}>Recomanded</Text>
                <Text style = {styles.textHeader}>General</Text>
            </View>

            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    headerTab : {
        width: '100%',
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 30,
        paddingTop: 16,
        paddingBottom: 6,
        backgroundColor:'#C9C6C6'
    },
    textHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        marginRight: 20,
    }
})