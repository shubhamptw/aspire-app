import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { setSpendingLimit, disableSpendingLimit } from '../../store/spendingLimit/actions';

const { width } = Dimensions.get('window');
const LIMITS = [5000, 10000, 20000];

const SpendingLimitScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const { cardId, onLimitSet } = route.params || {};
    const [selectedLimit, setSelectedLimit] = useState(LIMITS[0]);
    const [customLimit, setCustomLimit] = useState('');
    const [inputFocused, setInputFocused] = useState(false);

    const handleLimitSelect = (limit: number) => {
        setSelectedLimit(limit);
        setCustomLimit('');
    };

    const handleCustomLimit = (text: string) => {
        setCustomLimit(text);
        const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(num)) setSelectedLimit(num);
    };

    const handleBack = () => {
        if (cardId) dispatch(disableSpendingLimit(cardId));
        navigation.goBack();
    };

    const handleSave = () => {
        if (selectedLimit > 0 && onLimitSet) {
            onLimitSet(selectedLimit);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.root}>
            {/* Header */}
            <View style={styles.headerBg}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={handleBack} style={styles.headerIconBtn}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Spending limit</Text>
                    <View style={styles.headerIconBtn}>
                        <MaterialIcons name="arrow-upward" size={28} color="#01D167" />
                    </View>
                </View>
            </View>

            {/* Card */}
            <View style={styles.card}>
                <View style={styles.cardRow}>
                    <MaterialIcons name="speed" size={20} color="#01D167" style={{ marginRight: 8 }} />
                    <Text style={styles.cardLabel}>Set a weekly debit card spending limit</Text>
                </View>
                <View style={styles.amountRow}>
                    <View style={styles.currencyBox}>
                        <Text style={styles.currencyText}>S$</Text>
                    </View>
                    <Text style={styles.amountText}>{selectedLimit.toLocaleString()}</Text>
                </View>
                <Text style={styles.infoText}>Here weekly means the last 7 days - not the calendar week</Text>
            </View>

            {/* Preset Buttons */}
            <View style={styles.presetRow}>
                {LIMITS.map(limit => (
                    <TouchableOpacity
                        key={limit}
                        style={[styles.presetBtn, selectedLimit === limit && !inputFocused && styles.presetBtnSelected]}
                        onPress={() => handleLimitSelect(limit)}
                        activeOpacity={0.85}
                    >
                        <Text style={[styles.presetBtnText, selectedLimit === limit && !inputFocused && styles.presetBtnTextSelected]}>S$ {limit.toLocaleString()}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Custom Input */}
            <View style={styles.customInputRow}>
                <TextInput
                    style={styles.customInput}
                    placeholder="Custom amount"
                    keyboardType="numeric"
                    value={customLimit}
                    onChangeText={handleCustomLimit}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    maxLength={8}
                />
            </View>

            {/* Save Button */}
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
                <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F6F7FB',
    },
    headerBg: {
        backgroundColor: '#003366',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingBottom: 32,
        paddingTop: 0,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 0,
    },
    headerIconBtn: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 0,
        marginTop: -32,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardLabel: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    currencyBox: {
        backgroundColor: '#01D167',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        minWidth: 40,
        alignItems: 'center',
    },
    currencyText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
    },
    amountText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#222',
        letterSpacing: 1,
    },
    infoText: {
        color: '#888',
        fontSize: 13,
        marginTop: 12,
    },
    presetRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
        marginHorizontal: 16,
        marginBottom: 0,
    },
    presetBtn: {
        backgroundColor: '#F6F7FB',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 18,
        minWidth: width / 4.2,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    presetBtnSelected: {
        backgroundColor: '#E5FFF6',
        borderColor: '#01D167',
    },
    presetBtnText: {
        color: '#01D167',
        fontWeight: '600',
        fontSize: 16,
    },
    presetBtnTextSelected: {
        color: '#01D167',
        fontWeight: '700',
    },
    saveBtn: {
        backgroundColor: '#01D167',
        borderRadius: 28,
        marginHorizontal: 24,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 32,
    },
    saveBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    customInputRow: {
        marginTop: 28,
        marginHorizontal: 24,
    },
    customInput: {
        backgroundColor: '#F6F7FB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        paddingVertical: 16,
        paddingHorizontal: 18,
        fontSize: 16,
        color: '#222',
        fontWeight: '600',
    },
});

export default SpendingLimitScreen; 