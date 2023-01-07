import React from 'react-native'
import {useState, useEffect} from 'react'
import { View , AsyncStorage, KeyboardAvoidingView, Text, Image, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import axios from 'axios'

import logo from '../assets/logo.png'

export default function Login({navigation}){
    const [email, set_email] = useState('')
    const [palavras_chave, set_palavras] = useState('')

    useEffect( () => { 
        AsyncStorage.getItem('user').then( dado => {
            if(dado){
                navigation.navigate('Locais')
            }
        })
     }, 
    [])

    async function handleSubmit(){
        const resposta = await axios.post('http://192.168.0.20:4000/sessao', {email:email})

        const {_id} = await resposta.data

        await AsyncStorage.setItem('user', _id)
        await AsyncStorage.setItem('techs', palavras_chave )

        navigation.navigate('Locais')
    }

    return <KeyboardAvoidingView enabled={Platform.OS == 'ios'} behavior='padding' style={styles.container}>
        <Image source={logo}/>

        <View style={styles.form}>
            <Text style={styles.label}>Seu Email*</Text>
            <TextInput style={styles.input} placeholder="Digite seu email" placeholderTextColor="#999" keyboardType='email-address' autoCapitalize='none' autoCorrect={false} value={email} onChangeText={set_email}/>
        </View>

        <View style={styles.form}>
            <Text style={styles.label}>Palavras Chave</Text>
            <TextInput style={styles.input} placeholder="Digite para buscar" placeholderTextColor="#999"  autoCapitalize='words' autoCorrect={false} value={palavras_chave} onChangeText={set_palavras}/>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>  
            <Text style={styles.button_text} > Buscar </Text> 
        </TouchableOpacity>

    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label:{
        fontWeight:'bold',
        color: '#444',
        marginBottom: 10,
    },
    form:{
        alignSelf: 'stretch' ,
        paddingHorizontal:34,
        marginBottom:10,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize:18,
        height:47,
        marginBottom:25,
        borderRadius:8,
    }, 
    button:{
        width: '85%',
        height:42,
        backgroundColor: '#52b0dc',
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