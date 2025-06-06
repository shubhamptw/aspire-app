import React, { useState } from 'react';
import { View, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { Header } from './components/Header';
import { CardCarousel } from './components/CardCarousel';
import { SpendingLimit } from './components/SpendingLimit';
import { CardOptions } from './components/CardOptions';
import { AddCardModal } from './components/AddCardModal';
import { createNewCard } from '../../utils/cardUtils';
import { useNavigation, } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setCards } from '../../store/cardsSlice';


const CAROUSEL_OVERLAP = 120; // How much the carousel overflows above the bottom sheet

const DebitCardScreen = () => {
    const [showCardNumber, setShowCardNumber] = useState(true);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const spent = 345; // Example spent value

    // Get cards from Redux
    const cards = useSelector((state: RootState) => state.cards.cards);

    const handleAddCard = (name: string) => {
        const newCard = createNewCard(name);
        const newCards = [...cards, newCard];
        dispatch(setCards(newCards));
        setCurrentCardIndex(newCards.length - 1);
        setIsAddCardModalVisible(false);
    };

    const handleToggleFreeze = () => {
        const newCards = [...cards];
        newCards[currentCardIndex] = {
            ...newCards[currentCardIndex],
            isFrozen: !newCards[currentCardIndex].isFrozen
        };
        dispatch(setCards(newCards));
    };

    const handleWeeklyLimitToggle = (value: boolean) => {
        if (value) {
            navigation.navigate('SpendingLimit', {
                cardId: cards[currentCardIndex].id,
                onLimitSet: (limit: number) => {
                    const newCards = [...cards];
                    newCards[currentCardIndex] = {
                        ...newCards[currentCardIndex],
                        weeklyLimitEnabled: true,
                        weeklyLimit: limit,
                    };
                    dispatch(setCards(newCards));
                }
            });
        } else {
            const newCards = [...cards];
            newCards[currentCardIndex] = {
                ...newCards[currentCardIndex],
                weeklyLimitEnabled: false,
                weeklyLimit: null,
            };
            dispatch(setCards(newCards));
        }
    };

    const handleDeleteCard = (index: number) => {
        if (cards.length === 1) {
            Alert.alert('Cannot delete', 'At least one card must remain.');
            return;
        }
        Alert.alert(
            'Delete Card',
            'Are you sure you want to delete this card?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const newCards = cards.filter((_, i) => i !== index);
                        dispatch(setCards(newCards));
                        if (currentCardIndex >= newCards.length) {
                            setCurrentCardIndex(newCards.length - 1);
                        }
                    },
                },
            ]
        );
    };

    const currentCard = cards[currentCardIndex];
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
                        onLongPressCard={handleDeleteCard}
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
                style={[styles.fab]}
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
