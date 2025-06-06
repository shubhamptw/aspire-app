import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface SpendingLimitProps {
    limit: number;
    spent: number;
}

export const SpendingLimit = ({ limit, spent }: SpendingLimitProps) => {
    const percent = Math.min(100, Math.round((spent / limit) * 100));
    return (
        <>
            <View style={styles.spendingHeader}>
                <Text style={styles.spendingTitle}>Debit card spending limit</Text>
                <View style={styles.limitRow}>
                    <Text style={styles.spent}>S$ {spent.toLocaleString()}</Text>
                    <Text style={styles.limit}> / S$ {limit.toLocaleString()}</Text>
                </View>
            </View>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>
        </>
    );
}; 