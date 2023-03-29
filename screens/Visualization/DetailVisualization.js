import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button } from '@rneui/themed';
import { useState } from "react";
import { LineChart } from "react-native-chart-kit"
import TableData from "../../components/TableData";

const mode = ['MONTH', 'DAY', 'WEEK', 'YEAR']

export default function DetailVisualization() {
    const [modeSelected, setModeSelected] = useState(mode[0])
    console.log(modeSelected)



    
    return (
        <View style = {styles.container}>
            <View style = {styles.selected}>
                <Button radius={6} 
                    onPress={() => console.log('click day')}
                >
                    Last 30 days
                </Button>

            </View>
            <View style = {styles.quickInfo}>
                <View style = {styles.quickInfoItem}>
                    <Text style = {styles.infoValue}>20</Text>
                    <Text style = {styles.infoTitle}>Lowest</Text>
                </View>
                <View style = {styles.quickInfoItem}>
                    <Text style = {styles.infoValue}>24</Text>
                    <Text style = {styles.infoTitle}>Average</Text>
                </View>
                <View style = {styles.quickInfoItem}>
                    <Text style = {styles.infoValue}>37</Text>
                    <Text style = {styles.infoTitle}>Highest</Text>
                </View>
            </View>
            

            <LineChart
                data={{
                    labels: ["1h", "2h", "3h", "4h", "5h", "6h"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    }
                ]
                }}
                width={Dimensions.get("window").width - 60} // from react-native
                height={180}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#C4FCC7",
                backgroundGradientFrom: "#CCFCCD",
                backgroundGradientTo: "#92CE95",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#67B56A"
                }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

            <View style = {{width: '100%', padding: 30}}>
                <TableData />

            </View>

            {/* <View sytle = {styles.tableContainer}>
                
                <View style={styles.containerTable}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={['Huhu', "hihi", 'haha']} />
                    </Table>
                </View>
            </View> */}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    selected: {
        padding: 16,
        marginLeft: 'auto',
        paddingHorizontal: 45, 
    },
    quickInfo: {
        // height: '20%'    ,
        // backgroundColor: '#EBF8FF',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 10
    },
    quickInfoItem: {
        flexDirection: 'column',
        alignItems: 'center',
        // borderWidth: 1,
        padding: 20,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        
        elevation: 1,

        borderRadius: 6,
    },
    infoValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#C43D3D'
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333', 
    },
    containerTable: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
})