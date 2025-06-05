import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles';

interface CardProps {
    showCardNumber: boolean;
    onToggleCardNumber: () => void;
}

export const Card = ({ showCardNumber, onToggleCardNumber }: CardProps) => {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                onPress={onToggleCardNumber}
                style={styles.toggleCardButton}
            >
                <MaterialIcons
                    name={showCardNumber ? 'visibility-off' : 'visibility'}
                    size={16}
                    style={styles.visibilityIcon}
                    color="#00C48C"
                />
                <Text style={styles.toggleCardText}>
                    {showCardNumber ? 'Hide' : 'Show'} card number
                </Text>
            </TouchableOpacity>

            <View style={styles.card2}>
                <Image
                    source={require('../../../assets/aspire_full_logo.png')}
                    style={styles.aspireLogo}
                    resizeMode="contain"
                />
                <Text style={styles.cardName}>Mark Henry</Text>
                <Text style={styles.cardNumber}>
                    {showCardNumber ? '5647   3411   2413   2020' : '••••   ••••   ••••   ••••'}
                </Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.cardDetails}>Thru: 12/20</Text>
                    <Text style={styles.cardDetails}>CVV: {showCardNumber ? '456' : '•••'}</Text>
                </View>
                <Image
                    source={require('../../../assets/visa_logo.png')}
                    style={styles.visaLogo}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}; 