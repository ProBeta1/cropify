import React from 'react'
import { Text, View } from 'react-native'
import styles from '../HomeScreen/styles'

export default function HomeScreen(props) {

    const user = props.extraData;

    const onAddLinkPress = () => {
        props.navigation.navigate('AddItem')
    }

    const onBuyLinkPress = () => { props.navigation.navigate('BuyItem') }

    return (
        <View>
            <View style={styles.headerView}>
                <Text style={styles.text}>Hey {user.fullName} , how are you today ?</Text>
            </View>

            <View style={styles.footerView}>
                <Text style={styles.footerText}>Got stuff to sell ? <Text onPress={onAddLinkPress} style={styles.footerLink}>Add Here</Text></Text>
            </View>

            <View style={styles.footerView}>
                <Text style={styles.footerText}>Wanna buy something ? <Text onPress={onBuyLinkPress} style={styles.footerLink}>Head over Here</Text></Text>
            </View>
        </View>
    )
}