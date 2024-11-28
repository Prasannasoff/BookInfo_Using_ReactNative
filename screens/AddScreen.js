import { View, Text, StyleSheet, Button, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { Dropdown } from 'react-native-element-dropdown';

export default function AddScreen() {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState();
    const [No_of_Purchased, setPurchased] = useState();
    const [image, setImage] = useState('');
    const [price, setPrice] = useState();
    const [overview, setOverview] = useState('');
    const [category, setCategory] = useState('');
    const [authorImage, setAuthorImage] = useState('');


    const CategoryData = [
        { label: 'Autobiography', value: 'Autobiography' },
        { label: 'Comics', value: 'Comics' },
        { label: 'Horror', value: 'Horror' },
        { label: 'Biography', value: 'Biography' },
        { label: 'Novel', value: 'Novel' },

    ];

    const data = {
        bookName: bookName,
        author: author,
        authorImage: authorImage,
        rating: rating,
        No_of_Purchased: No_of_Purchased,
        image: image,
        overview: overview,
        price: price,
        category: category.value

    }
    const handleSubmit = async () => {
        console.log(category.value)
        try {
            const response = await axios.post('http://192.168.0.104:5000/api/bookDetails/addBooks', data);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, padding: 5 }}>
                    <View style={[styles.searchBar]}>
                        <TextInput
                            style={styles.input}
                            value={bookName}
                            onChangeText={setBookName}
                            placeholder='Name of the book'
                        />
                    </View>
                    <View style={[styles.searchBar]}>
                        <TextInput
                            style={styles.input}
                            value={image}
                            onChangeText={setImage}
                            placeholder='Book Image'
                        />
                    </View>
                    <View style={[styles.searchBar]}>
                        <TextInput
                            style={styles.input}
                            value={author}
                            onChangeText={setAuthor}
                            placeholder='Name of the Author'
                        />
                    </View>
                    <View style={[styles.searchBar]}>
                        <TextInput
                            style={styles.input}
                            value={authorImage}
                            onChangeText={setAuthorImage}
                            placeholder='AuthorImage'
                        />
                    </View>

                    <View style={[styles.searchBar]}>
                        <TextInput
                            style={styles.input}
                            value={rating}
                            onChangeText={setRating}
                            placeholder='Rating'
                        />
                    </View>
                    <View style={[styles.DescriptionBar]}>
                        <TextInput
                            style={styles.input}
                            value={overview}
                            onChangeText={setOverview}
                            placeholder='Description of book'
                        />
                    </View>
                    <View style={[styles.searchBar]}>
                        <TextInput
                            style={styles.input}
                            value={No_of_Purchased}
                            onChangeText={setPurchased}
                            placeholder='No of Purchased'
                        />
                    </View>
                    <Dropdown
                        style={styles.dropdown}
                        data={CategoryData}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        value={category}
                        onChange={
                            setCategory
                        }
                    />
                    <View style={[styles.searchBar]}>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={setPrice}
                            placeholder='Price'
                        />
                    </View>


                    <Button title="add" onPress={handleSubmit}></Button>
                </View >
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: 'green',

        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        margin: 7,
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
    },
    DescriptionBar: {
        backgroundColor: 'green',
        marginTop: 20,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        margin: 7,
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
    },
    input: {
        flex: 1,

    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 350
    },

})