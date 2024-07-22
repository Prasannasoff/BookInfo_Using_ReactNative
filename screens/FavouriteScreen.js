import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function FavouriteScreen() {
    const [data, setData] = useState('')
    const user = useSelector(state => state.auth.user);
    const handleFavorites = async () => {
        const uid = user.uid;
        try {
            const getFavourites = await axios.get("http://192.168.0.109:5000/api/bookDetails/getFavourites", { params: { uid } });
            setData(getFavourites.data);
            console.log(getFavourites.data);
        }
        catch (error) {
            console.log(error);
        }
        console.log(data);
    }
    // useEffect(() => {
    //     const getData = async () => {

    //         const uid = user.uid;
    //         try {
    //             const getFavourites = await axios.get("http://192.168.0.109:5000/api/bookDetails/getFavourites", { params: { uid } });
    //             setData(getFavourites.data);
    //             console.log(getFavourites.data);
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }
    //         console.log(data);

    //     }
    //     getData();
    // }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>FavouriteScreen</Text>
            <Button title='Click' onPress={handleFavorites}></Button>
        </View>
    )
}
export default FavouriteScreen