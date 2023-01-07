import React from 'react-native'
import { useState, useEffect } from 'react'
import { AsyncStorage, ScrollView , StyleSheet ,Image, SafeAreaView , Text} from 'react-native'
import ListaLocais from './componentes/ListaLocais'

import logo from '../assets/logo.png'

export default function Locais(){
    const [palavras_chaves, set_chaves] = useState([])

    useEffect( () => {
        AsyncStorage.getItem('techs').then( dados => {
            const p_chaves = dados.split(',').map( dado => dado.trim() )

            set_chaves(p_chaves)
        } )
    },
    [])

    return (
    <SafeAreaView style={StyleSheet.container}>
        <Image style={styles.logo} source={logo}/>

        <ScrollView>
        { palavras_chaves.map( dados => <ListaLocais key={dados} tech={dados}/> ) }
        </ScrollView>
       
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    logo:{
        height:75,
        resizeMode: 'contain',
        alignSelf:'center',
        marginTop: 10,
        marginTop: 60,
    }
})