

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ScreenHeight } from '@rneui/base';

import ControlDevice from '../components/ControlDevice';
import GeneralInfo from '../components/GeneralInfo';
export default function HomeScreen({navigation}){
    return (
        <View style = {{display: 'flex', flexDirection:'column', width: '100%'}} >
            <GeneralInfo navigation = {navigation}/>
            <ScrollView style = {{width: '100%', height:ScreenHeight - 190}}>
                <View style={{alignSelf: 'center'}}>
                <ControlDevice navigation = {navigation}/>
                <ControlDevice navigation = {navigation}/>
                <ControlDevice navigation = {navigation}/>
                <ControlDevice navigation = {navigation}/>
                <ControlDevice navigation = {navigation}/>
                </View>
            </ScrollView>
        </View>
    )
}