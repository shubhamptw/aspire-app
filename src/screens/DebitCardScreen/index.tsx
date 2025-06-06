import React, { useState, useEffect } from 'react';
import { View, Dimensions, SafeAreaView, TouchableOpacity, Text, TextInput } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { Header } from './components/Header';
import { CardCarousel } from './components/CardCarousel';
import { SpendingLimit } from './components/SpendingLimit';
import { CardOptions } from './components/CardOptions';
import { AddCardModal } from './components/AddCardModal';
import { Card as CardType } from '../../types/card';
import { getInitialCards, createNewCard } from '../../utils/cardUtils';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { disableSpendingLimit, enableSpendingLimit } from '../../store/spendingLimitSlice';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const DebitCardScreen = () => {
    const sheetPosition = useSharedValue(SCREEN_HEIGHT * 0.35);
    const dragContext = useSharedValue({ startY: 0 });
    const [showCardNumber, setShowCardNumber] = useState(true);
    const [cards, setCards] = useState<CardType[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
    const [isSetLimitModalVisible, setIsSetLimitModalVisible] = useState(false);
    const [pendingLimitValue, setPendingLimitValue] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const spent = 345; // Example spent value

    useEffect(() => {
        // Initialize with default cards
        setCards(getInitialCards());
    }, []);

    // Snap points (in screen coordinates)
    const snapPoints = [
        SCREEN_HEIGHT * 0.1,
        SCREEN_HEIGHT * 0.36,
    ];

    const gesture = Gesture.Pan()
        .onStart(() => {
            dragContext.value = { startY: sheetPosition.value };
        })
        .onUpdate((event) => {
            const newPosition = dragContext.value.startY + event.translationY;
            // Strictly enforce the snap points as boundaries
            sheetPosition.value = Math.max(
                snapPoints[0],
                Math.min(newPosition, snapPoints[1])
            );
        })
        .onEnd((event) => {
            // Find nearest snap point
            const nearestSnap = snapPoints.reduce((prev, curr) =>
                Math.abs(curr - sheetPosition.value) < Math.abs(prev - sheetPosition.value)
                    ? curr
                    : prev
            );

            // Animate to nearest snap with spring physics
            sheetPosition.value = withSpring(nearestSnap, {
                velocity: -event.velocityY,
                stiffness: 500,
                damping: 30,
                overshootClamping: true, // Prevent overshooting
            });
        });

    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: sheetPosition.value }],
    }));

    const handleAddCard = (name: string) => {
        const newCard = createNewCard(name);
        setCards(prevCards => [...prevCards, newCard]);
        // Switch to the newly added card
        setCurrentCardIndex(cards.length);
        setIsAddCardModalVisible(false);
    };

    const handleToggleFreeze = () => {
        setCards(prevCards => {
            const newCards = [...prevCards];
            newCards[currentCardIndex] = {
                ...newCards[currentCardIndex],
                isFrozen: !newCards[currentCardIndex].isFrozen
            };
            return newCards;
        });
    };

    const handleWeeklyLimitPress = () => {
        navigation.navigate('SpendingLimit');
    };

    const handleWeeklyLimitToggle = (value: boolean) => {
        if (value) {
            navigation.navigate('SpendingLimit', {
                cardId: currentCard.id,
                onLimitSet: (limit: number) => {
                    setCards(prevCards => {
                        const idx = prevCards.findIndex(card => card.id === currentCard.id);
                        if (idx === -1) return prevCards;
                        const newCards = [...prevCards];
                        newCards[idx] = {
                            ...newCards[idx],
                            weeklyLimitEnabled: true,
                            weeklyLimit: limit,
                        };
                        return newCards;
                    });
                }
            });
        } else {
            setCards(prevCards => {
                const newCards = [...prevCards];
                newCards[currentCardIndex] = {
                    ...newCards[currentCardIndex],
                    weeklyLimitEnabled: false,
                    weeklyLimit: null,
                };
                return newCards;
            });
        }
    };

    const handleSetLimit = () => {
        const limit = parseInt(pendingLimitValue, 10);
        if (!isNaN(limit) && limit > 0) {
            setCards(prevCards => {
                const newCards = [...prevCards];
                newCards[currentCardIndex] = {
                    ...newCards[currentCardIndex],
                    weeklyLimitEnabled: true,
                    weeklyLimit: limit,
                };
                return newCards;
            });
            setIsSetLimitModalVisible(false);
            setPendingLimitValue('');
        }
    };

    const currentCard = cards[currentCardIndex];
    // Always call useSelector before any return
    const cardLimitState = useSelector((state: RootState) =>
        currentCard ? state.spendingLimit.cardLimits[currentCard.id] || { limit: null, enabled: false } : { limit: null, enabled: false }
    );
    const spendingLimit = cardLimitState.limit;
    const spendingLimitEnabled = cardLimitState.enabled;
    if (!currentCard) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
                <Header />

                <Animated.View style={[styles.bottomSheet, sheetStyle]}>
                    <GestureDetector gesture={gesture}>
                        <View style={styles.sheetInnerContainer}>
                            <Animated.View style={[styles.card]}>
                                <CardCarousel
                                    cards={cards}
                                    currentCardIndex={currentCardIndex}
                                    onCardChange={setCurrentCardIndex}
                                    showCardNumber={showCardNumber}
                                    onToggleCardNumber={() => setShowCardNumber(!showCardNumber)}
                                />
                            </Animated.View>
                            <Animated.View style={styles.sheetContent}>
                                {currentCard.weeklyLimitEnabled && currentCard.weeklyLimit && (
                                    <SpendingLimit limit={currentCard.weeklyLimit} spent={spent} />
                                )}
                                <CardOptions
                                    onToggleFreeze={handleToggleFreeze}
                                    onAddCard={() => setIsAddCardModalVisible(true)}
                                    isFrozen={currentCard?.isFrozen || false}
                                    cards={cards}
                                    currentCardIndex={currentCardIndex}
                                    onCardSelect={setCurrentCardIndex}
                                    onWeeklyLimitPress={() => { }}
                                    weeklyLimitEnabled={currentCard.weeklyLimitEnabled}
                                    onWeeklyLimitToggle={handleWeeklyLimitToggle}
                                />
                            </Animated.View>
                        </View>
                    </GestureDetector>
                </Animated.View>

                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => setIsAddCardModalVisible(true)}
                >
                    <MaterialIcons name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <AddCardModal
                    visible={isAddCardModalVisible}
                    onClose={() => setIsAddCardModalVisible(false)}
                    onAddCard={handleAddCard}
                />

                {/* Set Limit Modal */}
                {/* removed, now handled by SpendingLimitScreen */}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default DebitCardScreen;
