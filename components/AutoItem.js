import { View, Text, TextInput, StyleSheet } from "react-native"
import { Button } from '@rneui/themed';
import { typeDevice } from "./ControlDevice";
import { useState } from "react";
import { axiosClient } from "../api/axiosSetup";


export default function AutoItem({device}) {
    const [onValue, setOnValue] = useState(device.onValue || 0)
    const [offValue, setoffValue] = useState(device.offValue || 0)

    const handleSave = async () => {
        axiosClient.put("api/device/value/", {
            onValue, offValue, id: device._id,
        })
            .then((device) => {
                console.log(device.data)
                alert("Value threshold adjustment was successful!")
            })
            .catch(err => console.error(err))
    }
    return (
        <View style={styles.deviceItem}>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{typeDevice[device.type].name}</Text>
                {typeDevice[device.type].iconTurn}
            </View>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={styles.groupInput}>
                    <Text style={styles.titleValue}>On value</Text>
                    <TextInput style={styles.input} inputMode="numeric" keyboardType="numeric" value={`${onValue}`} onChangeText={(val) => {setOnValue(val)}}/>
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.titleValue}>Off value</Text>
                    <TextInput style={styles.input} inputMode="numeric" keyboardType="numeric" value={`${offValue}`} onChangeText={(val) => { setoffValue(val) }} />
                </View>
                <Button onPress={handleSave}>Save</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    deviceItem: {
        width: 330,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 20,
    },
    groupInput: {
        marginBottom: 10
    }
    ,
    input: {
        width: 60,
        height: 30,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 5,
    },
    titleValue: {
        text: 14,
        fontWeight: '500'
    }
})