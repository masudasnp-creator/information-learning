import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import useUserStore from '@/store/userStore';
import { topics } from '@/constants/topics';
import { Award, Clock, CheckCircle, AlertCircle } from 'lucide-react-native';

export default function StatsScreen() {
  const { completedLessons, xp, streak } = useUserStore();
  
  // Calculate stats
  const totalQuestionsAnswered = completedLessons.reduce(
    (total, lesson) => total + lesson.questionIds.length, 
    0
  );
  
  const correctAnswers = completedLessons.reduce(
    (total, lesson) => total + Math.round(lesson.score * lesson.questionIds.length), 
    0
  );
  
  const incorrectAnswers = totalQuestionsAnswered - correctAnswers;
  
  const accuracy = totalQuestionsAnswered > 0 
    ? Math.round((correctAnswers / totalQuestionsAnswered) * 100) 
    : 0;
  
  // Calculate topic completion
  const topicCompletion = topics.map(topic => {
    const progress = useUserStore.getState().topicProgress[topic.id] || 0;
    const percentage = Math.min(100, Math.round((progress / topic.totalQuestions) * 100));
    return {
      id: topic.id,
      title: topic.title,
      percentage,
      color: topic.color,
    };
  }).sort((a, b) => b.percentage - a.percentage);
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>学習統計</Text>
          <Text style={styles.subtitle}>あなたの学習進捗状況</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(74, 144, 226, 0.1)' }]}>
              <Award size={20} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>{xp}</Text>
            <Text style={styles.statLabel}>合計XP</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.1)' }]}>
              <Clock size={20} color={Colors.warning} />
            </View>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>連続日数</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(102, 187, 106, 0.1)' }]}>
              <CheckCircle size={20} color={Colors.success} />
            </View>
            <Text style={styles.statValue}>{correctAnswers}</Text>
            <Text style={styles.statLabel}>正解</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 107, 107, 0.1)' }]}>
              <AlertCircle size={20} color={Colors.error} />
            </View>
            <Text style={styles.statValue}>{incorrectAnswers}</Text>
            <Text style={styles.statLabel}>不正解</Text>
          </View>
        </View>
        
        <View style={styles.accuracyCard}>
          <Text style={styles.accuracyTitle}>正答率</Text>
          <View style={styles.accuracyContainer}>
            <View style={styles.accuracyBar}>
              <View 
                style={[
                  styles.accuracyFill, 
                  { width: `${accuracy}%` }
                ]} 
              />
            </View>
            <Text style={styles.accuracyValue}>{accuracy}%</Text>
          </View>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>トピック別進捗</Text>
        </View>
        
        {topicCompletion.map(topic => (
          <View key={topic.id} style={styles.topicProgressCard}>
            <View style={styles.topicHeader}>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicPercentage}>{topic.percentage}%</Text>
            </View>
            <View style={styles.topicProgressBar}>
              <View 
                style={[
                  styles.topicProgressFill, 
                  { 
                    width: `${topic.percentage}%`,
                    backgroundColor: topic.color,
                  }
                ]} 
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 16,
  },
  statCard: {
    width: '50%',
    padding: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  accuracyCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  accuracyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  accuracyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accuracyBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: 4,
  },
  accuracyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  topicProgressCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  topicPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  topicProgressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  topicProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
});