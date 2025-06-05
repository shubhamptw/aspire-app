import React from 'react';
import { View } from 'react-native';
import { CardOption } from './CardOption';

interface CardOptionsProps {
    weeklyLimit: boolean;
    freezeCard: boolean;
    onWeeklyLimitChange: (value: boolean) => void;
    onFreezeCardChange: (value: boolean) => void;
}

export const CardOptions = ({
    weeklyLimit,
    freezeCard,
    onWeeklyLimitChange,
    onFreezeCardChange,
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
            toggle: true,
            value: weeklyLimit,
            onToggle: onWeeklyLimitChange,
        },
        {
            title: 'Freeze card',
            subtitle: 'Your debit card is currently active',
            icon: require('../../../assets/nature.png'),
            toggle: true,
            value: freezeCard,
            onToggle: onFreezeCardChange,
        },
        {
            title: 'Get a new card',
            subtitle: 'This deactivates your current debit card',
            icon: require('../../../assets/transfer_1.png'),
        },
        {
            title: 'Deactivated Cards',
            subtitle: 'This deactivates your current debit card',
            icon: require('../../../assets/transfer_3.png'),
        },
    ];

    return (
        <View>
            {options.map((option, index) => (
                <CardOption
                    key={index}
                    title={option.title}
                    subtitle={option.subtitle}
                    icon={option.icon}
                    toggle={option.toggle}
                    value={option.value}
                    onToggle={option.onToggle}
                />
            ))}
        </View>
    );
}; 