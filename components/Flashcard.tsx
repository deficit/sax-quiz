import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image, Text } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withSpring
} from 'react-native-reanimated';

export default function Flashcard({ frontImage, backImage, locked = false }) {
    const [flipped, setFlipped] = useState(false);
    const flipAnim = useSharedValue(0); // 0 = front, 1 = back

    const toggleFlip = () => {
        if (locked) return;
        setFlipped(!flipped);
        flipAnim.value = withSpring(flipped ? 0 : 1, {
            damping: 15,
            stiffness: 100,
        });
    };

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotateY = interpolate(flipAnim.value, [0, 1], [0, 180]);
        return {
            transform: [
                { perspective: 1000 },
                { rotateY: `${rotateY}deg` }
            ],
            zIndex: flipAnim.value < 0.5 ? 1 : 0,
            opacity: flipAnim.value < 0.5 ? 1 : 0,
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotateY = interpolate(flipAnim.value, [0, 1], [-180, 0]);
        return {
            transform: [
                { perspective: 1000 },
                { rotateY: `${rotateY}deg` }
            ],
            zIndex: flipAnim.value >= 0.5 ? 1 : 0,
            opacity: flipAnim.value >= 0.5 ? 1 : 0,
        };
    });

    return (
        <Pressable onPress={toggleFlip} style={styles.container}>
            {/* Front Face */}
            <Animated.View style={[styles.card, styles.frontCard, frontAnimatedStyle]}>
                <View style={styles.imageContainer}>
                    <Image source={frontImage} style={styles.image} resizeMode="contain" />
                </View>
                {!locked && (
                    <Text style={styles.hintText}>Tap to see note name</Text>
                )}
            </Animated.View>

            {/* Back Face */}
            <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
                <View style={styles.imageContainer}>
                    <Image source={backImage} style={styles.image} resizeMode="contain" />
                </View>
                <Text style={styles.hintText}>Tap to go back</Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 450,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 20,
        backgroundColor: '#ffffff',
        backfaceVisibility: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    frontCard: {
        backgroundColor: '#FAFDFD',
    },
    backCard: {
        backgroundColor: '#FFFBF5',
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    hintText: {
        fontSize: 14,
        color: '#888',
        marginTop: 10,
        fontWeight: '500',
    }
});
