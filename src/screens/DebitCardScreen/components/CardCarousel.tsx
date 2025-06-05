import React, { useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Card as CardType } from '../../../types/card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 52; // Accounting for container padding
const CARD_SPACING = 16;

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
    const flatListRef = useRef<FlatList>(null);

    const renderCard = ({ item, index }: { item: CardType; index: number }) => (
        <View style={styles.cardContainer}>
            <Card
                card={item}
                showCardNumber={showCardNumber}
                onToggleCardNumber={onToggleCardNumber}
            />
        </View>
    );

    const handleScroll = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / (CARD_WIDTH + CARD_SPACING));
        if (index !== currentCardIndex && index >= 0 && index < cards.length) {
            onCardChange(index);
        }
    };

    const handleMomentumScrollEnd = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / (CARD_WIDTH + CARD_SPACING));

        // Ensure we're within bounds
        const boundedIndex = Math.max(0, Math.min(index, cards.length - 1));

        // Animate to the correct position
        flatListRef.current?.scrollToIndex({
            index: boundedIndex,
            animated: true,
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={cards}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                decelerationRate="fast"
                snapToAlignment="center"
                contentContainerStyle={styles.listContent}
                onScroll={handleScroll}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                initialScrollIndex={currentCardIndex}
                getItemLayout={(data, index) => ({
                    length: CARD_WIDTH + CARD_SPACING,
                    offset: (CARD_WIDTH + CARD_SPACING) * index,
                    index,
                })}
                scrollEventThrottle={16}
                pagingEnabled={false}
                snapToOffsets={cards.map((_, index) => index * (CARD_WIDTH + CARD_SPACING))}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
    },
    listContent: {
        paddingHorizontal: 26,
    },
    cardContainer: {
        width: CARD_WIDTH,
        marginRight: CARD_SPACING,
    },
}); 