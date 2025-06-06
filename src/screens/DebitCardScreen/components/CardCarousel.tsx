import React from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Card as CardType } from '../../../types/card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 52;
const CARD_SPACING = 16;
const HORIZONTAL_PADDING = 26;

interface CardCarouselProps {
    cards: CardType[];
    currentCardIndex: number;
    onCardChange: (index: number) => void;
    showCardNumber: boolean;
    onToggleCardNumber: () => void;
}

export const CardCarousel = ({
    cards,
    currentCardIndex,
    onCardChange,
    showCardNumber,
    onToggleCardNumber,
}: CardCarouselProps) => {
    // Add left and right spacers
    const spacerWidth = (SCREEN_WIDTH - CARD_WIDTH) / 2;
    const dataWithSpacers = [
        { key: 'left-spacer', type: 'spacer' },
        ...cards.map(card => ({ ...card, type: 'card', key: card.id })),
        { key: 'right-spacer', type: 'spacer' },
    ];

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        if (item.type === 'spacer') {
            return <View style={{ width: spacerWidth }} />;
        }
        return (
            <View style={styles.cardContainer}>
                <Card
                    card={item}
                    showCardNumber={showCardNumber}
                    onToggleCardNumber={onToggleCardNumber}
                />
            </View>
        );
    };

    // Snap to card and update index
    const handleMomentumScrollEnd = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        // Subtract spacer width to get the correct index
        const index = Math.round((contentOffset - spacerWidth) / (CARD_WIDTH + CARD_SPACING));
        if (index !== currentCardIndex && index >= 0 && index < cards.length) {
            onCardChange(index);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dataWithSpacers}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                snapToAlignment="start"
                getItemLayout={(_, index) => ({
                    length: CARD_WIDTH + CARD_SPACING,
                    offset: (CARD_WIDTH + CARD_SPACING) * index,
                    index,
                })}
                onMomentumScrollEnd={handleMomentumScrollEnd}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
    },
    listContent: {
        // No horizontal padding needed with spacers
    },
    cardContainer: {
        width: CARD_WIDTH,
        marginRight: CARD_SPACING,
    },
}); 