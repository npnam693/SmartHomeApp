import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { typeDevice } from "../components/ControlDevice"
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign'
import Schedule from "../components/Schedule";

export default function DeviceScreen({ navigation, route }){
    console.log(route.params.type)
    return (
        <View style = {styles.container}>
            <View style={styles.header}>
                <Text style={styles.unitTitle}>{typeDevice[route.params.type].unitTitle}</Text>
                <Text style={styles.value}>value</Text>
            </View>
            <View style ={styles.adjust}>
                <Button
                    radius={50}
                    style={styles.adjustButton}
                    icon={<Icon name="plus" size={20} color='#EBF8FF' />}
                />
                <Button
                    radius={50}
                    style={styles.adjustButton}
                    icon={<Icon name="minus" size={20} color='#EBF8FF' />}
                />
            </View>
            <ScrollView style={styles.devices}>
                <Schedule />
                <Schedule />
                <Schedule />
                <Schedule />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 20
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems:'center'
    },
    adjust: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
        padding: 30
    }
    ,
    adjustButton:{
        width: 40,
        height: 40,
        backgroundColor: '#75A7F7'
    }
    ,
    devices: {
        display: 'flex',
    }
    ,
    unitTitle: {
        color: '#4299E1',
        fontSize: 24,
        fontWeight: '600',

        lineHeight: 36,
    },
    value: {
        color: '#999090',
        fontSize: 48,
        fontWeight: '600',

        lineHeight: 72,
    }
})

