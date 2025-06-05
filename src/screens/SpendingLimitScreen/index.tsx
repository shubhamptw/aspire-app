import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const LIMITS = [5000, 10000, 20000];

const SpendingLimitScreen = () => {
    const navigation = useNavigation();
    const [selectedLimit, setSelectedLimit] = useState(LIMITS[0]);
    const [customLimit, setCustomLimit] = useState('');

    const handleLimitSelect = (limit: number) => {
        setSelectedLimit(limit);
        setCustomLimit('');
    };

    const handleCustomLimit = (text: string) => {
        setCustomLimit(text);
        setSelectedLimit(Number(text));
    };

    const handleSave = () => {
        // Save logic here (e.g., update context or redux)
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="#222" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Spending limit</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Card */}
            <View style={styles.card}>
                <View style={styles.row}>
                    <MaterialIcons name="speed" size={20} color="#01D167" style={{ marginRight: 8 }} />
                    <Text style={styles.cardTitle}>Set a weekly debit card spending limit</Text>
                </View>
                <View style={styles.limitRow}>
                    <View style={styles.currencyBox}>
                        <Text style={styles.currencyText}>S$</Text>
                    </View>
                    <Text style={styles.limitText}>{selectedLimit.toLocaleString()}</Text>
                </View>
                <Text style={styles.cardSubtitle}>Here weekly means the last 7 days - not the calendar week</Text>
            </View>

            {/* Preset Buttons */}
            <View style={styles.presetRow}>
                {LIMITS.map(limit => (
                    <TouchableOpacity
                        key={limit}
                        style={[styles.presetButton, selectedLimit === limit && styles.presetButtonSelected]}
                        onPress={() => handleLimitSelect(limit)}
                    >
                        <Text style={[styles.presetButtonText, selectedLimit === limit && styles.presetButtonTextSelected]}>S$ {limit.toLocaleString()}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 16,
        backgroundColor: '#003366',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },
    card: {
        backgroundColor: '#fff',
        margin: 24,
        marginTop: -32,
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    limitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    currencyBox: {
        backgroundColor: '#01D167',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
    },
    currencyText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    limitText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#222',
    },
    cardSubtitle: {
        color: '#888',
        fontSize: 13,
        marginTop: 8,
    },
    presetRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24,
        marginBottom: 32,
    },
    presetButton: {
        backgroundColor: '#F6F7FB',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 20,
        minWidth: width / 4,
        alignItems: 'center',
    },
    presetButtonSelected: {
        backgroundColor: '#E5FFF6',
        borderWidth: 1,
        borderColor: '#01D167',
    },
    presetButtonText: {
        color: '#01D167',
        fontWeight: '600',
        fontSize: 16,
    },
    presetButtonTextSelected: {
        color: '#01D167',
        fontWeight: '700',
    },
    saveButton: {
        backgroundColor: '#01D167',
        borderRadius: 28,
        marginHorizontal: 24,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 32,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default SpendingLimitScreen; 