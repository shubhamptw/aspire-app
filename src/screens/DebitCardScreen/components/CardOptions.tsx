import React from 'react';
import { View, Text, TouchableOpacity, Image, Switch } from 'react-native';
import { styles } from '../styles';
import { Card as CardType } from '../../../types/card';

interface CardOptionsProps {
    onToggleFreeze: () => void;
    onAddCard: () => void;
    isFrozen: boolean;
    weeklyLimitEnabled: boolean;
    onWeeklyLimitToggle: (value: boolean) => void;
}

export const CardOptions = ({
    onToggleFreeze,
    onAddCard,
    isFrozen,
    weeklyLimitEnabled,
    onWeeklyLimitToggle,
}: CardOptionsProps) => {
    const options = [
        {
            title: 'Top-up account',
            subtitle: 'Deposit money to your account to use with card',
            icon: require('../../../assets/insight.png'),
        },
        {
            title: 'Weekly spending limit',
            subtitle: 'Your weekly spending limit is S$ 5,000',
            icon: require('../../../assets/transfer_2.png'),
            switch: true,
            value: weeklyLimitEnabled,
            onToggle: onWeeklyLimitToggle,
        },
        {
            title: 'Freeze card',
            subtitle: isFrozen ? 'Your debit card is currently frozen' : 'Your debit card is currently active',
            icon: require('../../../assets/nature.png'),
            toggle: true,
            value: isFrozen,
            onToggle: onToggleFreeze,
        },
        {
            title: 'Get a new card',
            subtitle: 'This deactivates your current debit card',
            icon: require('../../../assets/transfer_1.png'),
            onPress: onAddCard,
        },
        {
            title: 'Deactivated Cards',
            subtitle: 'Your previously deactivated cards',
            icon: require('../../../assets/transfer_3.png'),
        },
    ];

    return (
        <View>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.optionRow}
                    onPress={option.onPress}
                    activeOpacity={option.onPress ? 0.7 : 1}
                >
                    <View style={styles.optionIcon}>
                        <Image source={option.icon} style={{ width: 32, height: 32 }} />
                    </View>
                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>{option.title}</Text>
                        <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                    </View>
                    {(option.switch || option.toggle) && (
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                option.value && styles.toggleButtonActive,
                            ]}
                            onPress={() => option.onToggle?.(!option.value)}
                        >
                            <View
                                style={[
                                    styles.toggleCircle,
                                    option.value && styles.toggleCircleActive,
                                ]}
                            />
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
}; 