
import { Text, View, StyleSheet} from "react-native";


const withComponents = [20,30,50]

const dataTest = [[1,2,3], [4,5,6], [7,8,9], [10,11,12]] 


export default function TableData() {
    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <View  style = {[styles.itemCell, {flex: 0.2}]}>
                    <Text>STT</Text>   
                </View>
                
                <View  style = {[styles.itemCell, {flex: 0.3}]}>
                    <Text>Value</Text>   
                </View>
                <View  style = {[styles.itemCell, {flex: 0.5}]}>
                    <Text>Created At</Text>   
                </View>
            </View>
            {
                dataTest.map((item, index) => (
                    <View style = {styles.itemRow} key ={index}>
                        <View  style = {[styles.itemCell, {flex: 0.2}]}>
                            <Text>{item[0]}</Text>   
                        </View>
                        
                        <View  style = {[styles.itemCell, {flex: 0.3}]}>
                            <Text>{item[1]}</Text>   
                        </View>
                        <View  style = {[styles.itemCell, {flex: 0.5}]}>
                            <Text>{item[2]}</Text>   
                        </View>  
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',   
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#c8e1ff'
    },
    itemCell: {
        // width: 40,
        // height: 40
        borderWidth: 0.5,
        borderColor: '#c8e1ff'
    },
    itemRow: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#c8e1ff',
        flexDirection: 'row',   
        justifyContent: 'space-between',
    }
})

