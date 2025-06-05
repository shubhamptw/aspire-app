import React, { useRef, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DebitCardScreen() {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['40%', '95%'], []);
    const [showCardNumber, setShowCardNumber] = useState(true);
    const [weeklyLimit, setWeeklyLimit] = useState(true);
    const [freezeCard, setFreezeCard] = useState(false);

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Debit Card</Text>
            <Text style={styles.subheader}>Available balance</Text>
            <Text style={styles.balance}>S$ 3,000</Text>

            {/* Bottom Sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={{ borderRadius: 24, overflow: 'visible' }}
            >
                <BottomSheetView style={{ overflow: 'visible' }}>

                    <View style={styles.cardContainer}>
                        {/* Toggle Card Number */}
                        <TouchableOpacity
                            onPress={() => setShowCardNumber(!showCardNumber)}
                            style={styles.toggleCardButton}
                        >
                            {/* <Ionicons name="eye-off-outline" size={16} color="#00C48C" /> */}
                            <Text style={styles.toggleCardText}>
                                {showCardNumber ? 'Hide' : 'Show'} card number
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.card}>
                            <Text style={styles.cardName}>Mark Henry</Text>
                            <Text style={styles.cardNumber}>
                                {showCardNumber ? '5647  3411  2413  2020' : '••••  ••••  ••••  ••••'}
                            </Text>
                            <View style={styles.cardFooter}>
                                <Text style={styles.cardDetails}>Thru: 12/20</Text>
                                <Text style={styles.cardDetails}>CVV: {showCardNumber ? '456' : '•••'}</Text>
                            </View>
                            <Text style={styles.visa}>VISA</Text>
                        </View>
                    </View>


                    <Text style={styles.spendingTitle}>Debit card spending limit</Text>
                    <View style={styles.limitRow}>
                        <Text style={styles.spent}>$345</Text>
                        <Text style={styles.limit}> / $5,000</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '7%' }]} />
                    </View>

                    {[
                        {
                            title: 'Top-up account',
                            subtitle: 'Deposit money to your account to use with card',
                            icon: 'arrow-up-circle-outline',
                        },
                        {
                            title: 'Weekly spending limit',
                            subtitle: 'Your weekly spending limit is S$ 5,000',
                            icon: 'speedometer-outline',
                            toggle: true,
                            value: weeklyLimit,
                            onToggle: setWeeklyLimit,
                        },
                        {
                            title: 'Freeze card',
                            subtitle: 'Your debit card is currently active',
                            icon: 'snow-outline',
                            toggle: true,
                            value: freezeCard,
                            onToggle: setFreezeCard,
                        },
                        {
                            title: 'Get a new card',
                            subtitle: 'This deactivates your current debit card',
                            icon: 'card-outline',
                        },
                    ].map((item, index) => (
                        <View key={index} style={styles.optionRow}>
                            {/* <Ionicons name={item.icon} size={24} color="#3366FF" /> */}
                            <View style={styles.optionText}>
                                <Text style={styles.optionTitle}>{item.title}</Text>
                                <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                            </View>
                            {item.toggle && (
                                <Switch
                                    value={item.value}
                                    onValueChange={item.onToggle}
                                />
                            )}
                        </View>
                    ))}
                </BottomSheetView>

            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#002B5B', paddingTop: 60, paddingHorizontal: 20 },
    header: { color: '#fff', fontSize: 24, fontWeight: '700' },
    subheader: { color: '#a0c4de', marginTop: 10 },
    balance: { color: '#00C48C', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    cardContainer: { marginTop: -160, zIndex: 10 },
    card: {
        backgroundColor: '#00C48C',
        borderRadius: 16,
        padding: 20,
        marginTop: 8,
    },
    cardName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    cardNumber: { color: '#fff', fontSize: 20, marginVertical: 10, letterSpacing: 2 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
    cardDetails: { color: '#fff' },
    visa: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'right', marginTop: 10 },
    toggleCardButton: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end',
        padding: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleCardText: { color: '#00C48C', marginLeft: 4 },
    sheetContent: { padding: 20, overflow: 'visible' },
    spendingTitle: { fontWeight: '600', fontSize: 16, marginBottom: 5 },
    limitRow: { flexDirection: 'row', marginBottom: 10 },
    spent: { color: '#00C48C', fontWeight: 'bold' },
    limit: { color: '#888' },
    progressBar: { height: 10, backgroundColor: '#eee', borderRadius: 5 },
    progressFill: { height: 10, backgroundColor: '#00C48C' },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    optionText: { flex: 1, marginLeft: 12 },
    optionTitle: { fontWeight: '600', fontSize: 16 },
    optionSubtitle: { color: '#777', fontSize: 14, marginTop: 2 },
});
