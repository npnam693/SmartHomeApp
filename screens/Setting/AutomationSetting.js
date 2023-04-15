import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { axiosClient } from "../../api/axiosSetup";
import AutoItem from "../../components/AutoItem";




export default function AutomationSetting({navigation}) {
    const [deviceData, setDeviceData] = useState([])

    useEffect(() => {
        axiosClient.get("api/device/")
            .then((device) => setDeviceData(device.data))
            .catch(err => console.error(err))
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center', width: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 40, width: '100%' }}>
                    {
                        deviceData.map((device, index) =>{
                            return device.type === 'door' ? <View key={index}></View> : (
                                <AutoItem key={index} device={device}/>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
})
