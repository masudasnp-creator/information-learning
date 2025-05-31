import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Colors from '@/constants/colors';
import { topics, Topic } from '@/constants/topics';
import { questions, Question } from '@/mocks/questions';
import useUserStore from '@/store/userStore';
import { Play, CheckCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function TopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [topicQuestions, setTopicQuestions] = useState<Question[]>([]);
  const { completedLessons, topicProgress } = useUserStore();
  
  useEffect(() => {
    if (id) {
      const foundTopic = topics.find(t => t.id === id);
      if (foundTopic) {
        setTopic(foundTopic);
        
        // Get questions for this topic
        const filteredQuestions = questions.filter(q => q.topicId === id);
        setTopicQuestions(filteredQuestions);
      }
    }
  }, [id]);
  
  if (!topic) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>トピックが見つかりません</Text>
      </SafeAreaView>
    );
  }
  
  const progress = topicProgress[topic.id] || 0;
  const progressPercentage = Math.min(100, Math.round((progress / topic.totalQuestions) * 100));
  
  const handleStartQuiz = () => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    
    // Get 5 random questions from this topic
    const availableQuestions = [...topicQuestions];
    const quizQuestions = [];
    
    for (let i = 0; i < Math.min(5, availableQuestions.length); i++) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      quizQuestions.push(availableQuestions[randomIndex]);
      availableQuestions.splice(randomIndex, 1);
    }
    
    // Store quiz questions in query params
    const questionIds = quizQuestions.map(q => q.id).join(',');
    router.push(`/quiz/${topic.id}?questions=${questionIds}`);
  };
  
  // Check if user has completed any lessons for this topic
  const completedQuestionIds = completedLessons
    .filter(lesson => lesson.topicId === topic.id)
    .flatMap(lesson => lesson.questionIds);
  
  return (
    <>
      <Stack.Screen options={{ title: topic.title }} />
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View 
              style={[
                styles.iconContainer,
                { backgroundColor: topic.color }
              ]}
            >
              {/* Icon would go here */}
            </View>
            <Text style={styles.title}>{topic.title}</Text>
            <Text style={styles.description}>{topic.description}</Text>
          </View>
          
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>学習進捗</Text>
              <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${progressPercentage}%`,
                    backgroundColor: topic.color,
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {progress} / {topic.totalQuestions} 問完了
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartQuiz}
            activeOpacity={0.8}
          >
            <Play size={20} color={Colors.white} />
            <Text style={styles.startButtonText}>クイズを始める</Text>
          </TouchableOpacity>
          
          {completedQuestionIds.length > 0 && (
            <View style={styles.completedSection}>
              <Text style={styles.completedTitle}>完了した問題</Text>
              {topicQuestions
                .filter(q => completedQuestionIds.includes(q.id))
                .slice(0, 5)
                .map(question => (
                  <View key={question.id} style={styles.completedQuestion}>
                    <CheckCircle size={16} color={Colors.success} />
                    <Text 
                      style={styles.completedQuestionText}
                      numberOfLines={2}
                    >
                      {question.text}
                    </Text>
                  </View>
                ))
              }
            </View>
          )}
        </ScrollView>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
  progressSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  completedSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  completedQuestion: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  completedQuestionText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
    flex: 1,
  },
});