import React, { useState, useEffect } from 'react';
import { View, Dimensions, SafeAreaView, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
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

const BOTTOM_SHEET_TOP = 180; // Distance from top where bottom sheet starts
const CAROUSEL_OVERLAP = 120; // How much the carousel overflows above the bottom sheet

const DebitCardScreen = () => {
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
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={{ flex: 1 }}>
                <View style={{ zIndex: 2, elevation: 6 }}>
                    <CardCarousel
                        cards={cards}
                        currentCardIndex={currentCardIndex}
                        onCardChange={setCurrentCardIndex}
                        showCardNumber={showCardNumber}
                        onToggleCardNumber={() => setShowCardNumber(!showCardNumber)}
                    />
                </View>
                {/* Bottom sheet-like background with negative margin to allow carousel to overflow */}
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 2,
                    marginTop: -CAROUSEL_OVERLAP,
                    overflow: 'visible',
                    zIndex: 1,
                }}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: CAROUSEL_OVERLAP }}>
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
                    </ScrollView>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.fab, { zIndex: 99, elevation: 10 }]}
                onPress={() => setIsAddCardModalVisible(true)}
            >
                <MaterialIcons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <AddCardModal
                visible={isAddCardModalVisible}
                onClose={() => setIsAddCardModalVisible(false)}
                onAddCard={handleAddCard}
            />
        </SafeAreaView>
    );
};

export default DebitCardScreen;
