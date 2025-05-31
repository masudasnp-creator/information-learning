import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Colors from '@/constants/colors';
import { topics } from '@/constants/topics';
import { questions, Question } from '@/mocks/questions';
import useUserStore from '@/store/userStore';
import QuizOption from '@/components/QuizOption';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react-native';

export default function QuizScreen() {
  const { id, questions: questionIds } = useLocalSearchParams<{ id: string; questions: string }>();
  const router = useRouter();
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const { addXp, completeLesson, updateTopicProgress, topicProgress } = useUserStore();
  
  useEffect(() => {
    if (id && questionIds) {
      const ids = questionIds.split(',');
      const filteredQuestions = questions.filter(q => ids.includes(q.id));
      setQuizQuestions(filteredQuestions);
    }
  }, [id, questionIds]);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    
    setSelectedOption(index);
  };
  
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setCorrectAnswers(prev => prev + 1);
    } else {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      completeQuiz();
    }
  };
  
  const completeQuiz = () => {
    setQuizCompleted(true);
    
    const score = correctAnswers / quizQuestions.length;
    const xpEarned = Math.round(score * quizQuestions.length * 10);
    
    // Add XP
    addXp(xpEarned);
    
    // Complete lesson
    completeLesson({
      topicId: id as string,
      questionIds: quizQuestions.map(q => q.id),
      completedAt: new Date().toISOString(),
      score,
    });
    
    // Update topic progress
    const currentProgress = topicProgress[id as string] || 0;
    const newProgress = Math.min(
      topics.find(t => t.id === id)?.totalQuestions || 0,
      currentProgress + quizQuestions.length
    );
    updateTopicProgress(id as string, newProgress);
  };
  
  const handleFinishQuiz = () => {
    router.replace(`/topic/${id}`);
  };
  
  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>問題が見つかりません</Text>
      </SafeAreaView>
    );
  }
  
  if (quizCompleted) {
    const score = correctAnswers / quizQuestions.length;
    const xpEarned = Math.round(score * quizQuestions.length * 10);
    
    return (
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <View style={styles.completedContainer}>
          <View style={styles.resultCircle}>
            <Text style={styles.resultScore}>{Math.round(score * 100)}%</Text>
          </View>
          
          <Text style={styles.resultTitle}>
            {score >= 0.8 ? "素晴らしい！" : score >= 0.6 ? "良くできました！" : "もう少し頑張りましょう！"}
          </Text>
          
          <Text style={styles.resultText}>
            {quizQuestions.length}問中{correctAnswers}問正解しました
          </Text>
          
          <View style={styles.xpContainer}>
            <Text style={styles.xpText}>獲得XP: {xpEarned}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishQuiz}
            activeOpacity={0.8}
          >
            <Text style={styles.finishButtonText}>完了</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <>
      <Stack.Screen options={{ title: `問題 ${currentQuestionIndex + 1}/${quizQuestions.length}` }} />
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
          
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={index}
                text={option}
                index={index}
                selected={selectedOption === index}
                correct={isAnswered ? index === currentQuestion.correctAnswer : null}
                onSelect={() => handleSelectOption(index)}
                disabled={isAnswered}
              />
            ))}
          </View>
          
          {isAnswered && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>解説</Text>
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            </View>
          )}
        </ScrollView>
        
        <View style={styles.footer}>
          {!isAnswered ? (
            <TouchableOpacity
              style={[
                styles.checkButton,
                selectedOption === null && styles.buttonDisabled
              ]}
              onPress={handleCheckAnswer}
              disabled={selectedOption === null}
              activeOpacity={0.8}
            >
              <Check size={20} color={Colors.white} />
              <Text style={styles.buttonText}>回答を確認</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
              activeOpacity={0.8}
            >
              {currentQuestionIndex < quizQuestions.length - 1 ? (
                <>
                  <Text style={styles.buttonText}>次の問題</Text>
                  <ChevronRight size={20} color={Colors.white} />
                </>
              ) : (
                <Text style={styles.buttonText}>結果を見る</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  explanationContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  checkButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.inactive,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  resultCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resultScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 24,
    textAlign: 'center',
  },
  xpContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 32,
  },
  xpText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  finishButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  finishButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});