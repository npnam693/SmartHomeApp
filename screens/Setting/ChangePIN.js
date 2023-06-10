import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScreenWidth, } from '@rneui/base';
import { Button } from '@rneui/themed';
import  Icon  from "react-native-vector-icons/Ionicons";
import { axiosClient } from '../../api/axiosSetup';
import AuthContext from '../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef, useContext } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';



export function ChangePIN({navigation}) {
    const [pinCode, setPinCode] = useState('');
    const [pinConfirmCode, setPinConfirmCode] = useState('');
    const [password, setPassword] = useState('');
    const { userData } = useContext(AuthContext)
    const [isSending, setIsSending] = useState(false)

    const textInputRef = useRef(null);
    const textInputConfirmRef = useRef(null)

    const handlePinChange = (value) => {
        // Chỉ cho phép nhập chữ số và không quá 4 ký tự
        const onlyDigits = value.replace(/[^\d]/g, '');
        if (onlyDigits.length > 5) {
        return;
        }
        setPinCode(onlyDigits);
    };

    const handlePinCofirmChange = (value) => {
        // Chỉ cho phép nhập chữ số và không quá 4 ký tự
        const onlyDigits = value.replace(/[^\d]/g, '');
        if (onlyDigits.length > 5) {
        return;
        }
        setPinConfirmCode(onlyDigits);
    };

    const handleClickSubmitPIN = () => {
        setIsSending(true)
        axiosClient.post('/api/users/login', {
            email: userData.email, password: password
        })
            .then(response => {
                if (pinCode != pinConfirmCode) {
                    alert("You need to confirm the correct PIN code.")
                    return
                }
                else {
                    console.log('HUHUUH', response.data)

                    axiosClient.put('/api/users/setpin', {
                        _id: userData._id, pinCode: pinCode
                    })
                        .then(res => {
                            AsyncStorage.setItem('userData', JSON.stringify(res.data))
                            setIsSending(true)
                            navigation.navigate('Setting Screen')
                        }) 
                        .catch(err => {
                            setIsSending(true)
                            if (err.response) {
                                alert(err.response.data.message)
                                return
                            }
                            else {
                                alert('Something went wrong');
                                console.log(err)
                            }
                        })
                    }
            })
            .catch(err =>  {
                setIsSending(true)
                if (err.response) {
                    alert (err.response.data.message)
                    return
                }
                else {
                    alert('Something went wrong');
                    console.log(err)
                }
            })
    }
    return (

    
    <View style={styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={isSending}
        //Text with the Spinner
        textContent={'Loading...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <View style = {styles.user}>
        <Image source={{uri:'https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png'}} 
                    style = {{width: 60, height: 60, borderRadius: 10, borderWidth: 1, borderColor:'#BCE4FA'}}
        />
        <View style = {{width: '100%', marginLeft: 20}}>
          <Text style = {{fontSize: 18, fontWeight: '600', color: '#101010'}}>{userData.name}</Text>
          <Text style = {{fontSize: 12, fontWeight: '400', color: '#666'}}>{userData.email}</Text>
        </View>
      </View>
        
      <TextInput
            placeholder = {'Input your Password'}
            style={{
                backgroundColor : "#D3D3D3",
                height: 48,
                borderRadius: 8,
                padding: 10,
                color: '#333',
                fontSize: 15,
                paddingHorizontal: 20,
                width: ScreenWidth - 40,

            }}
            value = {password}
            onChangeText={(input) => setPassword(input)}
        />
        
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

        <TouchableOpacity onPress={() => textInputConfirmRef.current.focus()}>
          <View style = {{flexDirection: 'row', justifyContent:'space-between', width: ScreenWidth - 80, marginTop: 30}}>
            {
              Array(5).fill(1).map((i , index) => {
                if (index > pinConfirmCode.length)
                  return <View style = {styles.inputNot} key = {index}></View>
                else if (index === pinConfirmCode.length)
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
            onPress = {() => {setPinCode(''); setPinConfirmCode('')}}
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

        <TextInput
          ref={textInputConfirmRef}
          keyboardType="numeric"
          maxLength={5}
          secureTextEntry={true}
          style = {{opacity: 0}}
          value={pinConfirmCode}
          onChangeText={handlePinCofirmChange}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
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