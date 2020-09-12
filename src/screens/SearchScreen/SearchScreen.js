import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import styles from '../SearchScreen/styles'
import Carousel from 'react-native-snap-carousel';


export default function SearchScreen(props) {
    const [value, onChangeText] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    // dummy data , use useEffect instead to fetch the actual data from firebase
    const [items, setItems] = useState([
        {
            name: "desi tomato",
            price: 120,
            seller: "Baccha yadav",
            distance: 200,
            safetyFactor: 9,
            url: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/tomatoes-39dd2fd.jpg?quality=90&resize=418%2C380"
        },
        {
            name: "desi aam",
            price: 250,
            seller: "Swami Lal",
            distance: 300,
            safetyFactor: 8,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-q0I-wPdnbBJzsiveDsR3fgP6kZWGIZrjHg&usqp=CAU"
        }
    ]);

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity
                    activeOpacity={0.6}
                >
                    <Image
                        source={{ uri: item.url }}
                        style={styles.ImageIconStyle}
                    />
                </TouchableOpacity>
                <View style={styles.content}>
                    <Text style={styles.contentText}>Price : ${item.price}</Text>
                    <Text style={styles.contentText}>Distance : {item.distance}m</Text>
                    <Text style={styles.contentText}>Safety Index : {item.safetyFactor} / 10</Text>
                    <Text style={styles.contentText}>Seller : {item.seller}</Text>
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
            <Carousel
                // layout="tinder"
                ref={ref => carousel = ref}
                data={items}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
                onSnapToItem={index => setActiveIndex(index)}
            />
        </View>
    )
}