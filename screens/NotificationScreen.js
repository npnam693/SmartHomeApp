import { Text, View, StyleSheet, ScrollView} from "react-native"
import NotificationItem from "../components/NotificationItem"
import AuthContext from "../AuthContext";
import { axiosClient } from "../api/axiosClient";
import { useEffect, useState, useContext } from "react"
export default function NotificationScreen({ navigation }) {
    const { userData } = useContext(AuthContext);

    const [notiData, setNotiData] = useState([])
    console.log(notiData)

    useEffect(() => {
        axiosClient.get(`api/devicelog/${userData.homeID}`)
            .then(data => setNotiData(data.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <View style = {styles.container}>
            {/* <View style = {styles.headerTab}>
                <Text style = {styles.textHeader}>Recomanded</Text>
                <Text style = {styles.textHeader}>General</Text>
            </View> */}
            <ScrollView style = {{width: '100%'}}>
                {
                    notiData.map((item, index) => {
                        // if (item.value % 2 == 0) {
                            // return <NotificationItem bgColor = '#DBDBDB' key={index} data={item}/>
                        // }   
                        // else {
                        return <NotificationItem bgColor = 'white'key ={index} data={item}/>
                        // }
                    })
                }
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