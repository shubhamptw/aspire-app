import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { styles } from './src/screens/DebitCardScreen/styles';
import { Header } from './src/screens/DebitCardScreen/components/Header';
import { Card } from './src/screens/DebitCardScreen/components/Card';
import { SpendingLimit } from './src/screens/DebitCardScreen/components/SpendingLimit';
import { CardOptions } from './src/screens/DebitCardScreen/components/CardOptions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheetWithCard = () => {
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
      const newPosition = dragContext.value.startY + event.translationY;
      sheetPosition.value = Math.max(
        snapPoints[0],
        Math.min(newPosition, SCREEN_HEIGHT)
      );
    })
    .onEnd((event) => {
      const nearestSnap = snapPoints.reduce((prev, curr) =>
        Math.abs(curr - sheetPosition.value) < Math.abs(prev - sheetPosition.value)
          ? curr
          : prev
      );

      sheetPosition.value = withSpring(nearestSnap, {
        velocity: -event.velocityY,
        stiffness: 500,
        damping: 30,
      });
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetPosition.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Header />

        <Animated.View style={[styles.bottomSheet, sheetStyle]}>
          <GestureDetector gesture={gesture}>
            <View style={styles.sheetInnerContainer}>
              <Animated.View style={[styles.card]}>
                <Card
                  showCardNumber={showCardNumber}
                  onToggleCardNumber={() => setShowCardNumber(!showCardNumber)}
                />
              </Animated.View>
              <Animated.View style={styles.sheetContent}>
                <SpendingLimit />
                <CardOptions
                  weeklyLimit={weeklyLimit}
                  freezeCard={freezeCard}
                  onWeeklyLimitChange={setWeeklyLimit}
                  onFreezeCardChange={setFreezeCard}
                />
              </Animated.View>
            </View>
          </GestureDetector>
        </Animated.View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default BottomSheetWithCard;