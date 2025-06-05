import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';

export const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={require('../../../assets/aspire_logo1.png')}
                style={styles.smallLogo}
                resizeMode="contain"
            />
            <Text style={styles.header}>Debit Card</Text>
            <Text style={styles.subheader}>Available balance</Text>
            <View style={styles.balanceContainer}>
                <View style={styles.dollarContainer}>
                    <Text style={styles.dollor}>S$</Text>
                </View>
                <Text style={styles.balance}>3,000</Text>
            </View>
        </View>
    );
}; 