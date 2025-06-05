import React from 'react';
import { View, Text, Image, Switch } from 'react-native';
import { styles } from '../styles';

interface CardOptionProps {
    title: string;
    subtitle: string;
    icon: any;
    toggle?: boolean;
    value?: boolean;
    onToggle?: (value: boolean) => void;
}

export const CardOption = ({
    title,
    subtitle,
    icon,
    toggle,
    value,
    onToggle
}: CardOptionProps) => {
    return (
        <View style={styles.optionRow}>
            <Image
                source={icon}
                style={styles.optionIcon}
                resizeMode="contain"
            />
            <View style={styles.optionText}>
                <Text style={styles.optionTitle}>{title}</Text>
                <Text style={styles.optionSubtitle}>{subtitle}</Text>
            </View>
            {toggle && (
                <Switch
                    value={value}
                    onValueChange={onToggle}
                    thumbColor={value ? '#fff' : '#f4f3f4'}
                    trackColor={{ false: '#EEEEEE', true: '#01D167' }}
                />
            )}
        </View>
    );
}; 