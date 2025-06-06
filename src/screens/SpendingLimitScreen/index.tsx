import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, SafeAreaView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { setSpendingLimit, disableSpendingLimit } from '../../store/spendingLimit/actions';
import { styles } from './styles';

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
                        <Image
                            source={require('../../assets/aspire_logo1.png')}
                            style={styles.smallLogo}
                            resizeMode="contain"
                        />                    </View>
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

export default SpendingLimitScreen; 