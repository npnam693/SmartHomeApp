import { Text, View, StyleSheet, ScrollView} from "react-native"
import NotificationItem from "../components/NotificationItem"

export default function NotificationScreen({ navigation }) {
    return (
        <View style = {styles.container}>
            <View style = {styles.headerTab}>
                <Text style = {styles.textHeader}>Recomanded</Text>
                <Text style = {styles.textHeader}>General</Text>
            </View>
            <ScrollView style = {{width: '100%'}}>
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
            </ScrollView>
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
        padding: 30,
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "flex-start",
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