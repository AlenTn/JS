import React, { useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import axios from 'axios';

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setData(response.data);
        }
        catch(err){
            setError('Ошибка!')
        }
        finally{
            setLoading(false);
        }

};

    const rednerItem = ({item}) => (
        <View style{styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>        
        </View>
    );
    if (loading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="white"/>
                <Text>Loading..</Text>
            </View>
        );
    }
        if (error){
            return(
                <View style={styles.centered}>
                    <Text style={styles.error}>{error}</Text>
                </View>
            );

        }
        return(
            <View style={styles.container}>
                <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                />
                </View>
        );

    }
    const styles = StyleSheet.create({
        container:{
            flex:1,
            paddingTop: 50,
            backgroundColor:'#fff',
        },
        centered:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        },
        item:{
            backgroundColor:'#f9f9f9',
            padding:15,
            marginVertical:8,
            marginHorizontal:16,
            borderRadius:8,
            elevation:2,
        },
        title:{
            fontSize:18,
            fontWeight:'bold',
            marginBottom:5,
        },
        body:{fontSize:14,
        color:'#555'
    },
    error:{
        color:'red',
        fontSize: 20,
    },
    });