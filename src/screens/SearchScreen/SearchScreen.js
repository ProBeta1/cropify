import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import styles from '../SearchScreen/styles'
import Carousel from 'react-native-snap-carousel';
import { firebase } from '../../firebase/config'

export default function SearchScreen(props) {
    const [value, onChangeText] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    // dummy data , use useEffect instead to fetch the actual data from firebase
    const [items, setItems] = useState([]);


    const entity = firebase.firestore().collection('items');

    useEffect(() => {

        entity.where("itemName", "==", value)
            .orderBy('price')
            .onSnapshot(
                querySnapshot => {
                    const newItems = [];
                    querySnapshot.forEach(doc => {
                        const val = doc.data();
                        val.id = doc.id;
                        newItems.push(val);
                    })
                    setItems(newItems);
                },
                error => {
                    console.log(error)
                }
            )

    }, [value])


    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity
                    activeOpacity={0.6}
                >
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.ImageIconStyle}
                    />
                </TouchableOpacity>
                <View style={styles.content}>
                    <Text style={styles.contentText}>Price : ₹ {item.price}</Text>
                    <Text style={styles.contentText}>Location : {item.farmLocation}</Text>
                    <Text style={styles.contentText}>Seller : {item.farmName}</Text>
                </View>

            </View>

        )
    }

    return (
        <View>
            <View style={styles.headText}>
                <Text style={styles.text}>Make a Purchase</Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
            </View>
            {value ?
                <Carousel
                    // layout="tinder"
                    ref={ref => carousel = ref}
                    data={items}
                    sliderWidth={300}
                    itemWidth={300}
                    renderItem={_renderItem}
                    onSnapToItem={index => setActiveIndex(index)}
                />
                :
                <>
                </>
            }

        </View>
    )
}