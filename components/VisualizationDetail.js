import { Text, View, Dimensions, StyleSheet, TouchableOpacity,Image} from "react-native"
import { useState, useEffect } from "react";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import SelectDropdown from 'react-native-select-dropdown'
import { axiosAdafruit } from "../api/axiosSetup";
export const typeSensor = {
    temp: {
        name: "Temperature",
        feedId: "bbc-temp",
    },
    humidity: {
        name: "Humidity",
        feedId: "bbc-humi",
    },
    lightIntensity: {
        name: "Light Intensity",
        feedId: "bbc-humi"
    },
}
export default function VisualiaztionDetail({route}) {
    const typ=route.params.type
    const [temp, setTemp] = useState([
        {"created_at": "",
         "created_epoch": 0,
          "expiration": "0",
           "feed_id": 0,
            "feed_key": typ,
             "id": "0F8YXZMQPGP5RAC3BFSE8QZQN5",
              "value": ""}
    ])
    const countries = ["Year", "Month", "Week", "Day"]
    const [tempSingle,setTempSingle]= useState(30)
    const name=typ

    useEffect(() => {
        Object.entries(typeSensor).map(([key, value]) => {
            axiosAdafruit.get(`${name}/data?limit=1000`)
                .then(res => {
                    setTemp(res.data)
                })
                .catch(err => console.log(err.response))
                axiosAdafruit.get(`bbc-temp/data?limit=1`)
                .then(res => {
                    setTempSingle(res.data[0].value)
                })
                .catch(err => console.log(err.response))
        })
    }, [])

    //temp
    let tempList=[
        {
            date: new Date('2023-03-29T08:04:44Z'),
            data: 24
        }
    ]
    let chartdata=[]
    let max=0
    let min=1000
    let avg=0
    if(temp.length>1) {
   let sum=0
    for(let x in temp)
    {
        let temp1={
            date:  new Date(temp[x].created_at),
            data: Number(temp[x].value)
        }
        tempList.push(temp1);
        sum=sum+Number(temp[x].value)
    }
    max=Math.max(...tempList.map(o => o.data))
    min=Math.min(...tempList.map(o => o.data))
    avg=(sum/tempList.length).toFixed(1)
    let num=(tempList.length/6).toFixed();
    for(let x in tempList) {
       if(x>=1)
       { if(x==1 || x %num==0)
        chartdata.push(tempList[x])
       }
    }
    
}
let detail=<>
<View width={Dimensions.get("window").width - 50}>
        <View style={styles.detail}  backgroundColor='#e6fffa'>
            <View style={styles.text}>
            <Image
             source={require('../assets/images/Sunny.png')}
             style={{
                marginRight:15,
                marginTop:15,
                
              
             }}
             />
                <Text style={{ 
                    marginTop:20,
                    fontSize:24,
                    color:'black',
                    fontWeight: 'semibold',
                    fontWeight:'bold',
                    fontSize:30,
                                    }}>
                 Temperator Details</Text>
                </View>
                
            <View style={styles.maxmin}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                    <View style={{position:'relative'}}>
                        <Text style ={styles.temparatureText}>{max}</Text>
                        <View style={{position: 'absolute', right: -8}}>
                            <View style = {styles.tempO}></View>
                        </View>
                    </View>
                    <Text>Cao nhat </Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                    <View style={{position:'relative'}}>
                        <Text style ={styles.temparatureText}>{min}</Text>
                        <View style={{position: 'absolute', right: -8}}>
                            <View style = {styles.tempO}></View>
                        </View>
                    </View>
                    <Text>Thap nhat</Text>
                </View>
            
                <View  style={styles.menu}>          
                <SelectDropdown 
                      
                       data={countries}
                       onSelect={(selectedItem, index) => {
                           console.log(selectedItem, index)
                       }}
                       buttonTextAfterSelection={(selectedItem, index) => {
                           return selectedItem
                       }}
                       rowTextForSelection={(item, index) => {
                           return item
                       }}
                       buttonStyle={styles.dropdown1BtnStyle}
                       buttonTextStyle={styles.dropdown1BtnTxtStyle}
                       rowStyle={styles.dropdown1RowStyle}
                       rowTextStyle={styles.dropdown1RowTxtStyle}
                       selectedRowTextStyle={styles.selectedrow}
                      
                   />
                   </View>     
            </View>
            
            <View style={styles.avg}>
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                    <View style={{position:'relative'}}>
                        <Text style ={styles.temparatureText}>{avg}</Text>
                        <View style={{position: 'absolute', right: -8}}>
                            <View style = {styles.tempO}></View>
                        </View>
                    </View>
                    <Text>Trung binh</Text>
                </View>
            </View>
            
            </View>
           
        </View>
</>
// humi
if (typ=='bbc-humi')
{
    detail=<>
<View width={Dimensions.get("window").width - 50}>
        <View style={styles.detail} backgroundColor='#ccfccd'>
            <View style={styles.text}>
            <Image
             source={require('../assets/images/weak.png')}
             style={{
                marginRight:15,
                marginTop:15,
                
              
             }}
             />
                <Text style={{ 
                    marginTop:20,
                    fontSize:24,
                    color:'black',
                    fontWeight: 'semibold',
                    fontWeight:'bold',
                    fontSize:30,
                                    }}>
                 Humidity Details</Text>
                </View>
                
            <View style={styles.maxmin}>
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.humidityText}>{max}%</Text>
                        <Text>Cao nhất</Text>
                    </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.humidityText}>{min}%</Text>
                        <Text>Thấp nhất</Text>
                    </View>
            
                <View  style={styles.menu}>          
                <SelectDropdown 
                      
                       data={countries}
                       onSelect={(selectedItem, index) => {
                           console.log(selectedItem, index)
                       }}
                       buttonTextAfterSelection={(selectedItem, index) => {
                           return selectedItem
                       }}
                       rowTextForSelection={(item, index) => {
                           return item
                       }}
                       buttonStyle={styles.dropdown1BtnStyle}
                       buttonTextStyle={styles.dropdown1BtnTxtStyle}
                       rowStyle={styles.dropdown1RowStyle}
                       rowTextStyle={styles.dropdown1RowTxtStyle}
                       selectedRowTextStyle={styles.selectedrow}
                      
                   />
                   </View>     
            </View>
            
            <View style={styles.avg}>
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.humidityText}>{avg}%</Text>
                        <Text>Trung bình</Text>
                    </View>
            </View>
            
            </View>
           
        </View>
</>
}
// chart
let colorchart
let textchart
let symbolchart
let pic
if (typ=='bbc-temp')
{
    colorchart='#e6fffa'
    textchart='Temperature'
    symbolchart='C'
    pic=<>
     <Image
             source={
                
                require(`../assets/images/Sunny.png`)
            }
             style={{
               
                marginLeft:3
                
              
             }}
             />
    </>
}
if (typ=='bbc-humi')
{
    colorchart='#ccfccd'
    textchart='Humidity'
    symbolchart='%'
    pic=<>
    <Image
             source={
                
                require(`../assets/images/weak.png`)
            }
             style={{
               
                marginLeft:3
                
              
             }}
             />
    </>
}
const chart=<>
        <TouchableOpacity style={{
        backgroundColor:colorchart,
        borderRadius:20,
        marginTop:20,
    }}>
        <View style={styles.textchart1}>
            {pic}
        
                <Text style={{
                    fontWeight:'600',
                    fontSize:28,
                    marginTop:5,
                    marginLeft:10,
                   
            }}>{textchart}</Text>
        </View>        
                
               <LineChart
                    data={{
                    labels: chartdata.length>=1 ? chartdata.map((item,index)=>
                    {
                        return index.toString() +'h'
                    }) :["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: chartdata.length>=1 ? chartdata.map((item,index)=>
                            {
                                return item.data
                            }) :[30,60,40,50,25,37]
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width - 50} // from react-native
                    height={180}
                    // yAxisLabel="$"
                    yAxisSuffix ={symbolchart}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "black",
                    backgroundGradientFrom: colorchart,
                    backgroundGradientTo: colorchart,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "3",
                        strokeWidth: "2",
                        stroke: "#4299E1"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 4,
                    borderRadius: 16,
                    alignItems:'center',
                    }}
                />
                    
                
            </TouchableOpacity>
</>


    return (
        <View style = {styles.container}>
            {detail}
        {chart}
    </View>
    )
}   

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent: 'center',
    },
    detail:{
       height:280,
        borderRadius:16,
    },
    text:{
        alignItems: 'center',
        flexDirection:'row',

    },
    textchart1:{
       
        flexDirection:'row',

    },
    maxmin:{
        width:'80%',
        marginTop: 40,
        marginHorizontal:20,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    avg:{
        width:'50%',
            marginTop:20
    },
    temparatureText: {
        fontSize: 36,
        color: '#C43D3D',
        fontWeight: '700',
        position: 'relative'
    },
    tempO: {
        
        width: 12,
        height: 12,
        borderWidth: 4,
        borderRadius: 100,
        borderColor: '#C43D3D',
    },
    menu:{
        marginTop:10,
        marginLeft:20,
        width:'30%',
        height:'65%'
        
    },
    dropdown1BtnStyle: {
        flex: 1,
        width:'100%',
        backgroundColor: '#4299E1',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
      },
    dropdown1BtnTxtStyle: {color: '#fff', textAlign: 'left'},
    dropdown1RowStyle: {backgroundColor: '#4299E1', borderBottomColor: '#C5C5C5', borderRadius:10,},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
    selectedrow:{ },
    humidityText: {
        color : '#1EA0E9',  
        fontSize: 32,
        fontWeight: '700',
        bottom: 2,
    },
  });