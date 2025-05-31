import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import useUserStore from '@/store/userStore';
import StreakCard from '@/components/StreakCard';
import DailyGoalCard from '@/components/DailyGoalCard';
import LevelProgressCard from '@/components/LevelProgressCard';
import TopicCard from '@/components/TopicCard';
import { topics } from '@/constants/topics';

export default function HomeScreen() {
  const { name, streak, level, xp, incrementStreak, lastActive, completedLessons } = useUserStore();
  const streakUpdatedToday = useRef(false);
  
  // Update streak if needed - only once when component mounts and user has a name
  useEffect(() => {
    // Only run this effect if the user is logged in and we haven't updated streak today
    if (name && !streakUpdatedToday.current) {
      const today = new Date().toISOString().split('T')[0];
      // Only update streak if lastActive is not today
      if (lastActive !== today) {
        incrementStreak();
        streakUpdatedToday.current = true;
      }
    }
  }, []); // Empty dependency array - only run once on mount
  
  // Calculate completed questions today
  const today = new Date().toISOString().split('T')[0];
  const completedToday = completedLessons.filter(
    lesson => lesson.completedAt.startsWith(today)
  ).reduce((total, lesson) => total + lesson.questionIds.length, 0);
  
  // Get recommended topics (lowest progress first)
  const recommendedTopics = [...topics]
    .sort((a, b) => {
      const progressA = useUserStore.getState().topicProgress[a.id] || 0;
      const progressB = useUserStore.getState().topicProgress[b.id] || 0;
      return (progressA / a.totalQuestions) - (progressB / b.totalQuestions);
    })
    .slice(0, 2);
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>こんにちは、{name}さん！</Text>
          <Text style={styles.subtitle}>今日も頑張りましょう！</Text>
        </View>
        
        <StreakCard streak={streak} />
        <DailyGoalCard completedToday={completedToday} dailyGoal={10} />
        <LevelProgressCard level={level} xp={xp} />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>おすすめトピック</Text>
        </View>
        
        {recommendedTopics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
});