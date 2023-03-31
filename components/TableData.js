
import { Text, View, StyleSheet} from "react-native";


const getDate = (str) => {
    const date = new Date(str)
    return date.toLocaleString()
}

export default function TableData({data}) {
    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <View style = {[styles.itemCell, {flex: 0.15, borderTopLeftRadius: 10}]}>
                    <Text style = {styles.textHeader}>STT</Text>   
                </View>
                <View style = {[styles.itemCell, {flex: 0.2}]}>
                    <Text style = {styles.textHeader}>Value</Text>   
                </View>
                <View style = {[styles.itemCell, {flex: 0.65, borderTopRightRadius: 10}]}>
                    <Text style = {styles.textHeader}>Created At</Text>   
                </View>
            </View>
            {
                data.map((item, index) => (
                    
                    index == data.length - 1 ?
                        <View style={styles.itemRow} key={index}>
                            <View style = {[styles.itemCell, {flex: 0.15, borderBottomLeftRadius: 10}]}>
                                <Text>{index+1}</Text>   
                            </View>
                            <View style = {[styles.itemCell, {flex: 0.2}]}>
                                <Text>{Number(item[1]).toFixed(1)}</Text>   
                            </View>
                            <View style = {[styles.itemCell, {flex: 0.65, borderBottomRightRadius: 10}]}>
                                <Text>{getDate(item[0])}</Text>   
                            </View>  
                        </View>
                    :
                        <View style={styles.itemRow} key={index}>
                            <View style = {[styles.itemCell, {flex: 0.15}]}>
                                <Text>{index+1}</Text>   
                            </View>
                            <View style = {[styles.itemCell, {flex: 0.2}]}>
                                <Text>{Number(item[1]).toFixed(1)}</Text>   
                            </View>
                            <View style = {[styles.itemCell, {flex: 0.65}]}>
                                <Text>{getDate(item[0])}</Text>   
                            </View>  
                        </View>
                ))
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // width: '100%',
        padding: 6,
        flexDirection: 'column',
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',   
        justifyContent: 'space-between',
        borderRadius: 30,
    },
    itemCell: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        padding: 6,
        paddingHorizontal: 8
    },
    itemRow: {
        borderTopWidth: 0,
        flexDirection: 'row',   
        justifyContent: 'space-between',
    },
    textHeader: {
        fontWeight: '500',
        color: '#333'
    }
})

