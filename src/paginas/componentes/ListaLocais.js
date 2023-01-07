import React from 'react-native'
import { useEffect, useState } from 'react'
import { withNavigation } from 'react-navigation'
 import { Image,FlatList,  StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import axios from 'axios'

function ListaLocais({tech, navigation}){
    const [locais, set_locais] = useState([])

    useEffect( () => {
        async function carregar_locais(){
            const resposta = await axios.get('http://192.168.0.20:4000/locais', {params: {tech}})
            set_locais(resposta.data)
        }
        
        carregar_locais()
    }, [] )

    function handleNav(id){
        navigation.navigate('Reserva', {id})
    }
    return (
    <View style={StyleSheet.container}>
        <Text style={styles.title} > Você buscou por: <Text styles={styles.bold}> {tech} </Text> </Text>
        <FlatList style={styles.list} data={locais} keyExtractor={ dados => { dados._id } } horizontal showsHorizontalScrollIndicator={false} renderItem={ ({item}) => (
            <View style={styles.li}> 
                <Image style={styles.thumb} source={{uri:item.thumbnail_url}}/>
                <Text style={styles.comp}>{item.company}</Text>
                <Text style={styles.price}> {item.price ? `R$${item.price}/Dia` : 'Gratuito!' } </Text>
                <TouchableOpacity onPress={ () => handleNav(item._id) } style={styles.button}>
                    <Text style={styles.button_text}> Reservar! </Text>
                </TouchableOpacity>
            </View>) } />
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 35,

    },
    title:{
        fontSize: 25,
        color: '#444',
        paddingHorizontal:25,
        marginBottom: 15,
        marginTop:25 ,
    },
    bold:{
        fontWeight: 'bold'
    },
    list:{
        marginBottom: 15,
        paddingHorizontal:27,
    },
    li:{
        marginRight:19,   
    },
    thumb:{
        width:200,
        height:120,
        resizeMode:'cover',
        borderRadius:4
    },
    comp:{
        fontSize:30,
        fontWeight:'bold',
        color:'#333',
        marginTop:10,
    },
    price:{
        fontSize:18,
        color:'#999',
        marginTop:5,
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
    }

})

export default withNavigation(ListaLocais);