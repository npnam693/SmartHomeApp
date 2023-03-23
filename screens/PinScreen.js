import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScreenWidth, } from '@rneui/base';
import { Button } from '@rneui/themed';
import  Icon  from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../AuthContext';
export default function PinScreen() {
    const navigation = useNavigation();
    const [pinCode, setPinCode] = useState('');

    const { logout, setUserData, userData, notifs, setNotifs, socket  } = useContext(AuthContext);

    const textInputRef = useRef(null);


    const handlePinChange = (value) => {
        // Chỉ cho phép nhập chữ số và không quá 4 ký tự
        const onlyDigits = value.replace(/[^\d]/g, '');
        if (onlyDigits.length > 5) {
        return;
        }
        setPinCode(onlyDigits);
    };
    const handleClickSubmitPIN = () => {
        if (pinCode != userData.pinCode) alert("PIN code is incorrect")
        else {
          setPinCode('')
          socket.emit('setup', userData._id)
          navigation.navigate('TabNavigation')
        }
    }
    const handleClickLogout = () => {
        const removeData = async () => {
            try {
                await AsyncStorage.removeItem('userData');
                await AsyncStorage.removeItem('notifs');
                console.log('Dữ liệu đã được xoá!');
              } catch (e) {
                console.log('Lỗi khi xoá dữ liệu: ', e);
              }
          };
          socket.emit('logout', userData._id)
          removeData()
          setUserData(null)
          setNotifs([])
          logout()
          navigation.navigate('AuthStackScreen')
    }
  return (
    <View style={styles.container}>
      <View style = {styles.user}>
        <Image source={{uri:'https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png'}} 
                    style = {{width: 60, height: 60, borderRadius: 10, borderWidth: 1, borderColor:'#BCE4FA'}}
        />
        <View>
          <Text style = {{fontSize: 18, fontWeight: '600', color: '#10101'}}>{userData.name}</Text>
          <Text style = {{fontSize: 12, fontWeight: '400', color: '#666'}}>{userData.email}</Text>
        </View>
        <TouchableOpacity onPress={handleClickLogout}>
          <View style = {styles.logout}>
              <Icon name = "exit" size = {28} color = '#75A7F7' style={{left: 3}}/>
          </View>
        </TouchableOpacity>
      </View>
      <Text style = {styles.welcomeText}>Welcome back,</Text>
      <Text style = {styles.welcomeText}>Enter PIN code to continue.</Text>
        <TouchableOpacity onPress={() => textInputRef.current.focus()}>
          <View style = {{flexDirection: 'row', justifyContent:'space-between', width: ScreenWidth - 80, marginTop: 30}}>
            {
              Array(5).fill(1).map((i , index) => {
                if (index > pinCode.length)
                  return <View style = {styles.inputNot} key = {index}></View>
                else if (index === pinCode.length)
                  return <View style = {styles.inputNow} key = {index}></View>
                else 
                  return<View style = {styles.inputYes} key = {index}>
                    <Icon name = "ellipse" size={28} />
                  </View>
              })
            }
          </View>
        </TouchableOpacity>

        <View style = {{flexDirection: 'row', justifyContent:'space-around', width: '100%', marginTop: 20}}>
          <Button color="secondary" radius={'sm'}  containerStyle={{width: 100}}
            onPress = {() => setPinCode('')}
          >Remove</Button>
          <Button radius={'sm'} containerStyle={{width: 100}}
            onPress = {handleClickSubmitPIN}
          >Next</Button>
        </View>
        <TextInput
          ref={textInputRef}
          keyboardType="numeric"
          maxLength={5}
          secureTextEntry={true}
          style = {{opacity: 0}}
          value={pinCode}
          onChangeText={handlePinChange}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  user: {
    backgroundColor: '#EBF8FF',
    height: 70,
    width: ScreenWidth - 40,
    borderRadius: 10,
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  logout: {
    backgroundColor: '#D2E0EE',
    alignItems:'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  welcomeText: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  inputNot: {
    height: 60,
    width: 54,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#D8DADC'
  },
  inputNow: {
    height: 60,
    width: 54,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black'
  },
  inputYes: {
    height: 60,
    width: 54,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
});