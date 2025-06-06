import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, SafeAreaView } from 'react-native';
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
    const [amount, setAmount] = useState(String(LIMITS[0]));

    const handleLimitSelect = (limit: number) => {
        setSelectedLimit(limit);
        setAmount(String(limit));
    };

    const handleAmountChange = (text: string) => {
        // Only allow numbers
        const num = text.replace(/[^0-9]/g, '');
        setAmount(num);
        if (num) setSelectedLimit(Number(num));
    };

    const handleBack = () => {
        if (cardId) dispatch(disableSpendingLimit(cardId));
        navigation.goBack();
    };

    const handleSave = () => {
        const limit = parseInt(amount, 10);
        if (limit > 0 && onLimitSet) {
            onLimitSet(limit);
        }
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.root}>
            {/* Header */}
            <View style={styles.headerBg}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={handleBack} style={styles.headerIconBtn}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerIconBtn}>
                        <MaterialIcons name="arrow-upward" size={28} color="#01D167" />
                    </View>
                </View>
                <Text style={styles.headerTitle}>Spending limit</Text>
            </View>

            {/* Card */}
            <View style={styles.card}>
                <View>
                    <View style={styles.cardRow}>
                        <MaterialIcons name="speed" size={20} color="#01D167" style={{ marginRight: 8 }} />
                        <Text style={styles.cardLabel}>Set a weekly debit card spending limit</Text>
                    </View>
                    <View style={styles.amountRow}>
                        <View style={styles.currencyBox}>
                            <Text style={styles.currencyText}>S$</Text>
                        </View>
                        <TextInput
                            style={styles.amountInput}
                            value={amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            onChangeText={handleAmountChange}
                            keyboardType="numeric"
                            maxLength={8}
                            placeholder="0"
                            placeholderTextColor="#888"
                        />
                    </View>
                    <Text style={styles.infoText}>Here weekly means the last 7 days - not the calendar week</Text>

                    {/* Preset Buttons (inside card) */}
                    <View style={styles.presetRowInCard}>
                        {LIMITS.map(limit => (
                            <TouchableOpacity
                                key={limit}
                                style={[styles.presetBtn, Number(amount) === limit && styles.presetBtnSelected]}
                                onPress={() => handleLimitSelect(limit)}
                                activeOpacity={0.85}
                            >
                                <Text style={[styles.presetBtnText, Number(amount) === limit && styles.presetBtnTextSelected]}>S$ {limit.toLocaleString()}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
                    <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#003366',
    },
    headerBg: {
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
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
        marginTop: 64,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        flex: 1,
        justifyContent: 'space-between'
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
    amountInput: {
        fontSize: 36,
        fontWeight: '700',
        color: '#222',
        letterSpacing: 1,
        flex: 1,
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    infoText: {
        color: '#888',
        fontSize: 13,
        marginTop: 12,
    },
    presetRowInCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
        marginBottom: 0,
        padding: 0,
    },
    presetBtn: {
        backgroundColor: '#E5FFF6',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 18,
        minWidth: width / 4.2,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        marginHorizontal: 4,
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
    saveArea: {
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingBottom: 32,
        paddingHorizontal: 24,
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
});

export default SpendingLimitScreen; 