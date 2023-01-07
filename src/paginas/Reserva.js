import React from 'react-native'
import { useState } from 'react'
import { Alert, View , TouchableOpacity ,TextInput, StyleSheet,Text, SafeAreaView, AsyncStorage} from 'react-native'
import axios from 'axios'

export default function Reserva( {navigation} ){
    const [data, set_data] = useState('')
    const id = navigation.getParam('id')

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user')

        await axios.post(`http://192.168.0.20:4000/locais/${user_id}/reservas`, {date:data}, {headers:{ user_id}} )

        Alert.alert('Reserva realizada com sucesso!')
        navigation.navigate('Locais')
    }

    async function handleSubmit2(){
        navigation.navigate('Locais')
    }

    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Selecione uma Data</Text>
        <TextInput style={styles.input} placeholder="Qual data quer reservar?" placeholderTextColor="#999"  autoCapitalize='words' autoCorrect={false} value={data} onChangeText={set_data}/>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>  
            <Text style={styles.button_text} > Reservar! </Text> 
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit2} style={styles.button2}>  
            <Text style={styles.button_text} > Voltar </Text> 
        </TouchableOpacity>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 65,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    label:{
        fontSize:32,
        fontWeight:'bold',
        color: '#444',
        marginBottom: 10,
    },
    input:{
        width: '98%',
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize:18,
        height:47,
        marginBottom:25,
        borderRadius:8,
    }, 
    button:{
        width: '98%',
        height:42,
        marginTop: 2,
        backgroundColor: '#52b0dc',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 4,
    },
    button2:{
        width: '98%',
        height:42,
        marginTop: 6,
        backgroundColor: '#91bbce',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 4,
    },
    button_text:{
        color:'#fff',
        fontWeight: 'bold',
        fontSize:16,
    },
})