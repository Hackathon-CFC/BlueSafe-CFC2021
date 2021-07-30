
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    label: {
        marginVertical: 2,
        marginHorizontal: 12
    },
    input: {
        height: 40,
        marginVertical: 2,
        marginHorizontal: 12,
        borderWidth: 1,
        paddingHorizontal: 12
    },    
    field: {
        marginVertical: 12,
    },
    submitBtn: {
        backgroundColor: '#1194E9',
        height: 50,
        marginHorizontal: 12,
        marginTop: 20
    },
    buttonCustom: {
        marginTop: 150,
        marginBottom: 20,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    buttonColor: {
        backgroundColor: '#1194E9',
        height: 50, 
        width: 325,
        marginBottom:20,
    },
    adminbuttonApprove: {
        backgroundColor: '#1194E9',
        height: 40, 
        width: 152,
        marginBottom:20,
        marginRight:10
    },

    adminbuttonDissaprove: {
        backgroundColor: '#ffffff',
        height: 40, 
        width: 152,
        marginBottom:20,
        marginRight:5,
        borderColor: '#1194E9',
        borderWidth: 1,
    },

    image: {
        flexBasis: '25%',
        marginRight: 22
    },
    imageTile: {
        borderColor: '#a6a6a6',
        borderBottomWidth: 1,
        marginVertical: 20,
        display: 'flex', 
        flexDirection: 'row',
        width: '100%', 
        marginHorizontal: 10,
        paddingBottom: 10
    },
    borderSection: {
        backgroundColor: 'white',
        borderColor: '#1194E9',
        borderWidth: 2,
        borderRadius: 2,
        height: 100,
        width: 325,
        marginBottom: 20,
        display: 'flex',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    tileText : {
        fontSize: 16, 
        fontWeight: 'bold', 
        marginTop: 5, 
        color: 'black'
    },
    normalText: {
        fontSize: 16, 
        marginTop: 5, 
        color: 'black'
    },
    approvedText: {
        position: 'absolute',
        height: 35,
        width: 80,
        backgroundColor: '#000',
        color: '#fff',
        paddingLeft: 15,
        paddingTop: 4,
        fontSize: 11,
        fontWeight: 'bold'
    },

    waterQualityBox: {
        width: 100,
        display: 'flex',
        padding: 10,
        alignItems: 'center'
    },
    graphButton: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 2,
        height: 30,
        width: 100,
    },
    tabview: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '7%',
        alignItems: 'center',
    },
    tab: {
        fontSize: 14,
        padding: 3,
        paddingBottom: '3%',
        borderBottomWidth: 2,
        borderRadius: 1,
        borderColor: '#a6a6a6',
        flexBasis: '32%',
        paddingHorizontal: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTab: {
        fontWeight: 'bold' ,
        borderColor: '#000',
        borderRadius: 2,
        borderBottomWidth: 4,
        borderRadius: 1,
        borderColor: '#a6a6a6'
    },
   
});

export default styles;
