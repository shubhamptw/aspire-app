import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Switch, Image, SafeAreaView } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { font } from './src/utils/typography';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_HEIGHT = 100;
const CARD_OVERHANG = CARD_HEIGHT / 2; // 50% of card height

const BottomSheetWithCard = () => {
  // Sheet position (0 = fully expanded, SCREEN_HEIGHT = fully hidden)
  const sheetPosition = useSharedValue(SCREEN_HEIGHT * 0.35);
  const dragContext = useSharedValue({ startY: 0 });
  const [showCardNumber, setShowCardNumber] = useState(true);
  const [weeklyLimit, setWeeklyLimit] = useState(false);
  const [freezeCard, setFreezeCard] = useState(false);

  // Snap points (in screen coordinates)
  const snapPoints = [
    SCREEN_HEIGHT * 0.2, // 30% of screen
    SCREEN_HEIGHT * 0.35, // 60% of screen
  ];

  const gesture = Gesture.Pan()
    .onStart(() => {
      dragContext.value = { startY: sheetPosition.value };
    })
    .onUpdate((event) => {
      // Calculate new position with bounds checking
      const newPosition = dragContext.value.startY + event.translationY;
      sheetPosition.value = Math.max(
        snapPoints[0], // Minimum position
        Math.min(newPosition, SCREEN_HEIGHT) // Maximum position
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
      });
    });

  // Bottom sheet style
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetPosition.value }],
  }));

  const cardView = () => {
    return (
      <View style={styles.cardContainer}>
        {/* Toggle Card Number */}
        <TouchableOpacity
          onPress={() => setShowCardNumber(!showCardNumber)}
          style={styles.toggleCardButton}
        >
          <MaterialIcons name={showCardNumber ? 'visibility-off' : 'visibility'} size={16} style={{ marginStart: 12 }} color="#00C48C" />
          <Text style={styles.toggleCardText}>
            {showCardNumber ? 'Hide' : 'Show'} card number
          </Text>
        </TouchableOpacity>

        <View style={styles.card2}>
          <Image
            source={require('./src/assets/aspire_full_logo.png')} // adjust path as needed
            style={{ alignSelf: 'flex-end', width: 74, height: 21, marginBottom: 24 }}
            resizeMode="contain" // or 'cover', 'stretch', etc.
          />
          <Text style={styles.cardName}>Mark Henry</Text>
          <Text style={styles.cardNumber}>
            {showCardNumber ? '5647   3411   2413   2020' : '••••   ••••   ••••   ••••'}
          </Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardDetails}>Thru: 12/20</Text>
            <Text style={styles.cardDetails}>CVV: {showCardNumber ? '456' : '•••'}</Text>
          </View>
          <Image
            source={require('./src/assets/visa_logo.png')} // adjust path as needed
            style={{ alignSelf: 'flex-end', width: 60, height: 20, }}
            resizeMode="contain" // or 'cover', 'stretch', etc.
          />
        </View>
      </View>
    )
  }




  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{}}>
        <Image
          source={require('./src/assets/aspire_logo1.png')} // adjust path as needed
          style={{ alignSelf: 'flex-end', width: 25, height: 25 }}
          resizeMode="contain" // or 'cover', 'stretch', etc.
        />
        <Text style={styles.header}>Debit Card</Text>
        <Text style={styles.subheader}>Available balance</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ backgroundColor: '#01D167', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.dollor}>S$</Text>
          </View>
          <Text style={styles.balance}>3,000</Text>
        </View>
      </View>


      <Animated.View style={[styles.bottomSheet, sheetStyle]}>
        {/* Overlapping Card */}
        <GestureDetector gesture={gesture}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Animated.View style={[styles.card]}>
              {/* <Text style={styles.cardText}>Drag Me</Text> */}
              {cardView()}
            </Animated.View>
            <Animated.View style={styles.sheetContent}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.spendingTitle}>Debit card spending limit</Text>
                <View style={styles.limitRow}>
                  <Text style={styles.spent}>$345</Text>
                  <Text style={styles.limit}> | $5,000</Text>
                </View>
              </View>

              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '7%' }]} />
              </View>

              {[
                {
                  title: 'Top-up account',
                  subtitle: 'Deposit money to your account to use with card',
                  icon: require('./src/assets/insight.png'),
                },
                {
                  title: 'Weekly spending limit',
                  subtitle: 'Your weekly spending limit is S$ 5,000',
                  icon: require('./src/assets/transfer_2.png'),
                  toggle: true,
                  value: weeklyLimit,
                  onToggle: setWeeklyLimit,
                },
                {
                  title: 'Freeze card',
                  subtitle: 'Your debit card is currently active',
                  icon: require('./src/assets/nature.png'),
                  toggle: true,
                  value: freezeCard,
                  onToggle: setFreezeCard,
                },
                {
                  title: 'Get a new card',
                  subtitle: 'This deactivates your current debit card',
                  icon: require('./src/assets/transfer_1.png'),
                },
                {
                  title: 'Deactivated Cards',
                  subtitle: 'This deactivates your current debit card',
                  icon: require('./src/assets/transfer_3.png'),
                },
              ].map((item, index) => (
                <View key={index} style={styles.optionRow}>
                  <Image
                    source={item.icon} // adjust path as needed
                    style={{ width: 32, height: 32, backgroundColor: '#325baf', borderRadius: 32 }}
                    resizeMode="contain"
                  />
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>{item.title}</Text>
                    <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                  </View>
                  {item.toggle && (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      thumbColor={item.value ? '#fff' : '#f4f3f4'}
                      trackColor={{ false: '#EEEEEE', true: '#01D167' }}
                    />
                  )}
                </View>
              ))}
            </Animated.View>
          </View>

        </GestureDetector>


      </Animated.View>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#002B5B', paddingTop: 60, paddingHorizontal: 26 },

  header: { ...font.bold, color: '#fff', fontSize: 24 },
  subheader: { ...font.medium, color: '#fff', marginTop: 24, marginBottom: 12, fontSize: 14 },
  balance: { ...font.bold, color: '#fff', fontSize: 24, marginStart: 10 },
  dollor: { ...font.bold, paddingHorizontal: 16, color: '#fff', fontSize: 12 },

  cardText: { ...font.bold, color: 'white', fontSize: 16 },
  cardName: { ...font.bold, color: '#fff', fontSize: 22, marginBottom: 24 },
  cardNumber: { ...font.medium, color: '#fff', fontSize: 14, marginBottom: 12, },
  cardDetails: { ...font.medium, color: '#fff', fontSize: 13, marginEnd: 32, marginBottom: 4 },
  visa: { ...font.bold, color: '#fff', fontSize: 24, textAlign: 'right', marginTop: 10 },

  toggleCardText: { ...font.bold, color: '#01D167', marginStart: 6, marginEnd: 16, fontSize: 12 },

  spendingTitle: { ...font.medium, fontSize: 13, marginBottom: 8 },
  limitRow: { flexDirection: 'row', marginBottom: 10, },
  spent: { ...font.bold, color: '#00C48C' },
  limit: { ...font.regular, color: '#888' },
  optionTitle: { ...font.medium, fontSize: 14 },
  optionSubtitle: { ...font.regular, color: '#222222', fontSize: 13, marginTop: 2 },
  aspireText: { ...font.medium, color: '#fff', fontSize: 14 },
  // Non-text styles
  cardFooter: { flexDirection: 'row', justifyContent: 'flex-start' },

  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'visible',
    flex: 1,
  },
  sheetContent: {
    paddingHorizontal: 16,
    marginTop: 170,
    marginBottom: 200,
  },
  card: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    zIndex: 10,
    marginHorizontal: 16,
    marginTop: -100,
  },
  cardContainer: {},
  card2: {
    backgroundColor: '#01D167',
    borderRadius: 16,
    padding: 24,
  },
  toggleCardButton: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    paddingVertical: 10,
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -20,
    paddingBottom: 26,
  },
  progressBar: { height: 15, backgroundColor: '#01D1671A', borderRadius: 12, opacity: 1, marginBottom: 16 },
  progressFill: { height: 15, backgroundColor: '#01D167', borderRadius: 12, marginBottom: 16 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  optionText: { flex: 1, marginLeft: 12 },
});

export default BottomSheetWithCard;