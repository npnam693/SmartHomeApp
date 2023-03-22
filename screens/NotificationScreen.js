import { Text, View, StyleSheet, ScrollView} from "react-native"
import NotificationItem from "../components/NotificationItem"
import axios from "axios"
import AuthContext from "../AuthContext";

import { useEffect, useState, useContext } from "react"
export default function NotificationScreen({ navigation }) {
    const { userData } = useContext(AuthContext);

    const [notiData, setNotiData] = useState([])
    console.log(notiData)

    useEffect(() => {
        axios.get(`http://10.0.2.2:3000/api/devicelog/${userData.homeID}`)
            .then(data => setNotiData(data.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <View style = {styles.container}>
            <View style = {styles.headerTab}>
                <Text style = {styles.textHeader}>Recomanded</Text>
                <Text style = {styles.textHeader}>General</Text>
            </View>
            <ScrollView style = {{width: '100%'}}>
                {
                    notiData.map((item, index) => {
                        if (item.value % 2 == 0) {
                            return <NotificationItem bgColor = '#DBDBDB' key={index} type={item.deviceID.type} actor={item.creatorID.name} value={item.value}/>
                        }   
                        else {
                            return <NotificationItem bgColor = '#EBF8FF'key ={index} type={item.deviceID.type} actor={item.creatorID.name} value={item.value}/>
                        }
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