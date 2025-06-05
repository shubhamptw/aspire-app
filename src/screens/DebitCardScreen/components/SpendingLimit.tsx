import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export const SpendingLimit = () => {
    return (
        <>
            <View style={styles.spendingHeader}>
                <Text style={styles.spendingTitle}>Debit card spending limit</Text>
                <View style={styles.limitRow}>
                    <Text style={styles.spent}>$345</Text>
                    <Text style={styles.limit}> | $5,000</Text>
                </View>
            </View>

            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '17%' }]} />
            </View>
        </>
    );
}; 