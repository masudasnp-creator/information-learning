import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { Target } from 'lucide-react-native';
import { useRouter } from 'expo-router';

type DailyGoalCardProps = {
  completedToday: number;
  dailyGoal: number;
};

const DailyGoalCard: React.FC<DailyGoalCardProps> = ({ 
  completedToday, 
  dailyGoal 
}) => {
  const router = useRouter();
  const progress = Math.min(1, completedToday / dailyGoal);
  
  return (
    <LinearGradient
      colors={[Colors.primary, '#2D7DD2']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Target size={24} color={Colors.white} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>今日の目標</Text>
          <Text style={styles.subtitle}>
            {completedToday} / {dailyGoal} 問完了
          </Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress * 100}%` }
            ]} 
          />
        </View>
      </View>
      
      {completedToday < dailyGoal && (
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/learn')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>続ける</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DailyGoalCard;