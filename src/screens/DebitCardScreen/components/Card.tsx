import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles';
import { Card as CardType } from '../../../types/card';

interface CardProps {
    showCardNumber: boolean;
    onToggleCardNumber: () => void;
    card: CardType;
    onLongPress?: () => void;
}

export const Card = ({ showCardNumber, onToggleCardNumber, card, onLongPress }: CardProps) => {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.card2}
                onLongPress={onLongPress}
            >
                <Image
                    source={require('../../../assets/aspire_full_logo.png')}
                    style={styles.aspireLogo}
                    resizeMode="contain"
                />
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.cardNumber}>
                    {showCardNumber ? card.cardNumber : '••••   ••••   ••••   ••••'}
                </Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.cardDetails}>Thru: {card.expiryDate}</Text>
                    <Text style={styles.cardDetails}>CVV: {showCardNumber ? card.cvv : '•••'}</Text>
                </View>
                <Image
                    source={require('../../../assets/visa_logo.png')}
                    style={styles.visaLogo}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onToggleCardNumber}
                style={styles.toggleCardButton}
            >
                <MaterialIcons
                    name={showCardNumber ? 'visibility-off' : 'visibility'}
                    size={20}
                    color="#01D167"
                    style={styles.visibilityIcon}
                />
                <Text style={styles.toggleCardText}>
                    {showCardNumber ? 'Hide card number' : 'Show card number'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}; 