import React from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 52;
const CARD_SPACING = 16;
const HORIZONTAL_PADDING = 26;

const data = Array.from({ length: 5 }, (_, i) => ({
    id: String(i),
    color: `hsl(${i * 60}, 70%, 60%)`,
}));

export default function TestFlatListScreen() {
    const renderItem = ({ item }: any) => (
        <View style={[styles.card, { backgroundColor: item.color }]}>
            <Text style={styles.text}>Card {item.id}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    listContent: {
        paddingHorizontal: HORIZONTAL_PADDING,
    },
    card: {
        width: CARD_WIDTH,
        height: 200,
        marginRight: CARD_SPACING,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    text: {
        color: '#222',
        fontSize: 24,
        fontWeight: 'bold',
    },
}); 