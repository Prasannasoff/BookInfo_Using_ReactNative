import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    FlatList,
    Text,
    View,
    Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function BookList({ navigation }) {
    const [bookData, setBookData] = useState([]);
    const [dupBook, setDupBook] = useState([]);
    const [name, setName] = useState('');
    const [popularBooks, setPopularBook] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40'
                );
                const books = response.data.items;
                const sortedBooks = books
                    .filter((book) => book.volumeInfo.averageRating && book.volumeInfo.ratingsCount)
                    .sort((a, b) => {
                        if (b.volumeInfo.averageRating === a.volumeInfo.averageRating) {
                            return b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount;
                        }
                        return b.volumeInfo.averageRating - a.volumeInfo.averageRating;
                    })
                    .slice(0, 5); // Slice to get only top 5 books

                const booksPopular = sortedBooks.map(item => ({
                    id: item.id,
                    bookName: item.volumeInfo.title,
                    image: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/120x180',
                    author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown Author',
                    authorImage: 'https://via.placeholder.com/70',
                    averageRating:item.volumeInfo.averageRating,
                    ratingsCount:item.volumeInfo.ratingsCount,
                    description:item.volumeInfo.description,

                

                }));

                setBookData(booksPopular);
                setPopularBook(booksPopular);

                setDupBook(books);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };
        getData();
    }, []);


    const filterBySearch = (text) => {
        setName(text);
        if (text === '') {
            setBookData(popularBooks); // Reset to popular books when search is cleared
        }
        else {

            const filteredBooks = dupBook.filter(book =>
                book.volumeInfo.title.toLowerCase().includes(text.toLowerCase())
            );
            setBookData(filteredBooks.map(item => ({
                id: item.id,
                bookName: item.volumeInfo.title,
                image: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/120x180',
                author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown Author',
                authorImage: 'https://via.placeholder.com/70' // Replace this with actual author image URL if available
            })));
        }
    };
    const displayBooks = ({ item }) => {
        return (
            <View>
                <TouchableOpacity style={[styles.bookFrame]} onPress={()=>navigation.navigate("BookInfo",{data:item})}>
                    <View style={[styles.design]} />
                    <View style={[styles.bookAlignment]}>
                        <View style={[styles.ShadowContainer]}>
                            <Image source={{ uri: item.image }} style={[styles.bookimg]} />
                        </View>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 10 }}>{item.bookName}</Text>
                        
                    </View>
                </TouchableOpacity>


            </View>
        );
    };
    const displayAuthors = ({ item }) => {
        return (
            <View>

                <View style={[styles.box1]}>
                    <View style={[styles.box2]}>
                        <View style={styles.Avatar}>
                            {/* <Image source={{ uri: item.authorImage }} style={{ width: 70, height: 70, borderRadius: 100 }} /> */}
                            <Text style={{ fontFamily: "Poppins", fontSize: 13 }}>{item.author}</Text>

                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={[styles.Container]}>
                <View style={[styles.searchBar]}>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={filterBySearch}
                        placeholder='Search the Book'
                    />
                    <FontAwesome name="search" size={20} color="#CBCDCC" />
                </View>

                <View style={[styles.header]}>
                    <Text style={{ fontSize: 35, fontFamily: 'Poppins', paddingTop: 10, position: 'relative' }}>Popular</Text>
                    <Text style={{ fontSize: 13, fontFamily: 'Poppins', paddingTop: 10, position: 'relative' }}>see All</Text>
                </View>

                <View style={[styles.Scroll]}>
                    <FlatList
                        data={bookData}
                        renderItem={displayBooks}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={[styles.header]}>
                    <Text style={{ fontSize: 35, fontFamily: 'Poppins', paddingTop: 10, position: 'relative' }}>Author</Text>
                    <Text style={{ fontSize: 13, fontFamily: 'Poppins', paddingTop: 10, position: 'relative' }}>see All</Text>
                </View>
                <View style={[styles.Scroll2]}>
                    <FlatList
                        data={bookData}
                        renderItem={displayAuthors}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>


            </View>
        </SafeAreaView>
    );
}

export default BookList;

const styles = StyleSheet.create({
    Container: {
        padding: 10,
    },
    searchBar: {
        backgroundColor: 'rgba(232,234,233,0.6)',
        marginTop: 90,
        height: 50,
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
    header: {
        marginTop: 3,
        paddingLeft: 8,
        paddingRight: 8,
        height: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    Scroll: {
        height: 260,

        alignItems: 'center',
        justifyContent: 'center',
    },
    bookFrame: {
        gap: 2,
        width: 150,
        height: 250,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        marginRight: 10,
    },
    design: {
        position: 'absolute',
        marginTop: 50,
        height: 190,
        borderRadius: 5,
        width: 140,
        backgroundColor: '#FEDBA9',
        zIndex: -1,
    },
    bookAlignment: {
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ShadowContainer: {
        padding: 1,
        elevation: 15,
        overflow: 'hidden',
    },
    bookimg: {
        marginTop: 2,
        width: 120,
        height: 180,
        borderRadius: 10,
        opacity: 0.9,
    },
    Scroll2: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    Avatar: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        elevation: 1,
        width: 100,
        height: 70,
        backgroundColor: '#ccffff',
        borderRadius: 10,
        padding: 10,
    },
    box1: {
        justifyContent: 'center',
    },
    box2: {
        marginRight: 7,
        marginLeft: 7,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,

    },
});
