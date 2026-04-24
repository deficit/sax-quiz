import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Flashcard from './components/Flashcard';

import { deckData } from './deckData';

// ─── Mode selector ───────────────────────────────────────────────────────────
function ModeSelector({ onSelect }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.modeSelectorContainer}>
        <Text style={styles.title}>Saxophone Fingerings</Text>
        <Text style={styles.modePrompt}>Choose a mode</Text>

        <TouchableOpacity
          style={[styles.modeButton, styles.trainingButton]}
          onPress={() => onSelect('training')}
        >
          <Text style={styles.modeButtonIcon}>📖</Text>
          <Text style={styles.modeButtonTitle}>Training</Text>
          <Text style={styles.modeButtonDesc}>Browse cards at your own pace</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeButton, styles.testButton]}
          onPress={() => onSelect('test')}
        >
          <Text style={styles.modeButtonIcon}>🎯</Text>
          <Text style={styles.modeButtonTitle}>Test</Text>
          <Text style={styles.modeButtonDesc}>Track correct and wrong answers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Training mode ───────────────────────────────────────────────────────────
function TrainingMode({ onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % deckData.length);
  const prevCard = () => setCurrentIndex((prev) => (prev - 1 + deckData.length) % deckData.length);

  const currentCard = deckData[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onExit} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Modes</Text>
            </TouchableOpacity>
            <View style={styles.modeBadge}>
              <Text style={styles.modeBadgeText}>📖 Training</Text>
            </View>
          </View>
          <Text style={styles.title}>Saxophone Fingerings</Text>
          <Text style={styles.subtitle}>Card {currentIndex + 1} of {deckData.length}</Text>
        </View>

        <View style={styles.cardContainer}>
          <Flashcard
            key={currentCard.id}
            frontImage={currentCard.front}
            backImage={currentCard.back}
          />
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={prevCard}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={nextCard}>
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const ALL_NAMES = [...new Set(deckData.map(d => d.name))];

function generateChoices(correctName) {
  const pool = ALL_NAMES.filter((n) => n !== correctName);
  // Shuffle pool and pick 3 distractors
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const choices = [correctName, shuffled[0], shuffled[1], shuffled[2]];
  return choices.sort(() => Math.random() - 0.5);
}

// ─── Test mode ────────────────────────────────────────────────────────────────
function TestMode({ onExit }) {
  const [deck, setDeck] = useState(() => [...deckData].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [finished, setFinished] = useState(false);
  const [choices, setChoices] = useState(() => generateChoices(deck[0].name));
  const [picked, setPicked] = useState(null); // null | { choice, wasCorrect }

  const currentCard = deck[currentIndex];
  const total = deck.length;
  const correctName = currentCard.name;

  const pickAnswer = (choice) => {
    if (picked) return; // already answered
    const wasCorrect = choice === correctName;
    setPicked({ choice, wasCorrect });
    if (wasCorrect) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);
    // Auto-advance after feedback delay
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= total) {
        setFinished(true);
      } else {
        setCurrentIndex(nextIndex);
        setChoices(generateChoices(deck[nextIndex].name));
        setPicked(null);
      }
    }, 900);
  };

  const restart = () => {
    const newDeck = [...deckData].sort(() => Math.random() - 0.5);
    setDeck(newDeck);
    setCurrentIndex(0);
    setCorrect(0);
    setWrong(0);
    setFinished(false);
    setChoices(generateChoices(newDeck[0].name));
    setPicked(null);
  };

  if (finished) {
    const pct = Math.round((correct / total) * 100);
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={onExit} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Modes</Text>
              </TouchableOpacity>
              <View style={[styles.modeBadge, styles.testModeBadge]}>
                <Text style={styles.modeBadgeText}>🎯 Test</Text>
              </View>
            </View>
            <Text style={styles.title}>Results</Text>
          </View>

          <View style={styles.resultsContainer}>
            <Text style={styles.resultsPct}>{pct}%</Text>
            <Text style={styles.resultsLabel}>Score</Text>
            <View style={styles.scoreRow}>
              <View style={[styles.scoreBox, styles.correctBox]}>
                <Text style={styles.scoreNum}>{correct}</Text>
                <Text style={styles.scoreBoxLabel}>Correct</Text>
              </View>
              <View style={[styles.scoreBox, styles.wrongBox]}>
                <Text style={styles.scoreNum}>{wrong}</Text>
                <Text style={styles.scoreBoxLabel}>Wrong</Text>
              </View>
              <View style={[styles.scoreBox, styles.totalBox]}>
                <Text style={styles.scoreNum}>{total}</Text>
                <Text style={styles.scoreBoxLabel}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.button} onPress={onExit}>
              <Text style={styles.buttonText}>Modes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={restart}>
              <Text style={[styles.buttonText, styles.primaryButtonText]}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onExit} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Modes</Text>
            </TouchableOpacity>
            <View style={[styles.modeBadge, styles.testModeBadge]}>
              <Text style={styles.modeBadgeText}>🎯 Test</Text>
            </View>
          </View>
          <Text style={styles.title}>What note is this?</Text>
          <Text style={styles.subtitle}>Card {currentIndex + 1} of {total}</Text>

          {/* Live score */}
          <View style={styles.liveScore}>
            <Text style={styles.liveScoreCorrect}>✅ {correct}</Text>
            <Text style={styles.liveScoreWrong}>❌ {wrong}</Text>
          </View>
        </View>

        {/* Fingering image only (no flip) */}
        <View style={styles.cardContainer}>
          <Flashcard
            key={currentCard.id}
            frontImage={currentCard.front}
            backImage={currentCard.back}
            locked={true}
          />
        </View>

        {/* 2×2 multiple choice grid */}
        <View style={styles.choiceGrid}>
          {choices.map((choice) => {
            let btnStyle = styles.choiceButton;
            let textStyle = styles.choiceText;
            if (picked) {
              if (choice === correctName) {
                btnStyle = { ...btnStyle, ...styles.choiceCorrect };
                textStyle = { ...textStyle, color: '#fff' };
              } else if (choice === picked.choice && !picked.wasCorrect) {
                btnStyle = { ...btnStyle, ...styles.choiceWrong };
                textStyle = { ...textStyle, color: '#fff' };
              }
            }
            return (
              <TouchableOpacity
                key={choice}
                style={btnStyle}
                onPress={() => pickAnswer(choice)}
                disabled={!!picked}
              >
                <Text style={textStyle}>{choice}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState(null); // null | 'training' | 'test'

  if (mode === 'training') return <TrainingMode onExit={() => setMode(null)} />;
  if (mode === 'test') return <TestMode onExit={() => setMode(null)} />;
  return <ModeSelector onSelect={setMode} />;
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  // Mode selector
  modeSelectorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    gap: 16,
  },
  modePrompt: {
    fontSize: 17,
    color: '#7F8C8D',
    fontWeight: '600',
    marginBottom: 8,
  },
  modeButton: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  trainingButton: {
    backgroundColor: '#2ECC71',
  },
  testButton: {
    backgroundColor: '#3498DB',
  },
  modeButtonIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  modeButtonTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  modeButtonDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },

  // Shared layout
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#E0E6ED',
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#47525E',
  },
  modeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#2ECC71',
    borderRadius: 20,
  },
  testModeBadge: {
    backgroundColor: '#3498DB',
  },
  modeBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#7F8C8D',
    fontWeight: '600',
  },

  // Live score
  liveScore: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 8,
  },
  liveScoreCorrect: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60',
  },
  liveScoreWrong: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E74C3C',
  },

  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  // Controls / buttons
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    paddingBottom: 16,
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: '#E0E6ED',
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3498DB',
    shadowColor: '#3498DB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  correctButton: {
    backgroundColor: '#27AE60',
    shadowColor: '#27AE60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  wrongButton: {
    backgroundColor: '#E74C3C',
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#47525E',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },

  // Results screen
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  resultsPct: {
    fontSize: 80,
    fontWeight: '900',
    color: '#2C3E50',
    lineHeight: 90,
  },
  resultsLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7F8C8D',
    marginBottom: 16,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 14,
  },
  scoreBox: {
    width: 90,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  correctBox: { backgroundColor: '#2ECC71' },
  wrongBox: { backgroundColor: '#E74C3C' },
  totalBox: { backgroundColor: '#3498DB' },
  scoreNum: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },
  scoreBoxLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },

  // Multipl  e-choice grid
  choiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 24,
    width: '100%',
  },
    choiceButton: {
    width: '44%',
    paddingVertical: 18,
    paddingHorizontal: 8,
    backgroundColor: '#E0E6ED',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  choiceText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C3E50',
    textAlign: 'center',
  },
  choiceCorrect: {
    backgroundColor: '#27AE60',
    shadowColor: '#27AE60',
    shadowOpacity: 0.35,
  },
  choiceWrong: {
    backgroundColor: '#E74C3C',
    shadowColor: '#E74C3C',
    shadowOpacity: 0.35,
  },
});

