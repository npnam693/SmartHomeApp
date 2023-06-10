

import { ScrollView, View } from 'react-native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { useEffect, useState, useContext } from 'react';

import ControlDevice from '../components/ControlDevice';
import GeneralInfo from '../components/GeneralInfo';
import AuthContext from '../AuthContext';
import { axiosClient } from '../api/axiosSetup';
export default function HomeScreen({navigation}){
    const [deviceData, setDeviceData] = useState([])
    const { socket, setNotifs } = useContext(AuthContext)
    useEffect(() => {
        axiosClient.get("api/device/")
            .then((device) => setDeviceData(device.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <View style = {{display: 'flex', flexDirection:'column', width: '100%', height: '100%'}} >
            <GeneralInfo navigation={navigation} />
            <ScrollView contentContainerStyle={{ display:'flex', alignItems:'center'}} showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 40}}>
                    {
                        deviceData.map((device, index) => 
                            <View style={{width: 330, alignItems: 'center'}} key={index}>
                                <ControlDevice navigation = {navigation} type = {device.type} deviceID={device._id} />
                            </View>
                        )
                    }                
                </View>
            </ScrollView>
        </View>
    )
}