import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { Flame } from 'lucide-react-native';

type StreakCardProps = {
  streak: number;
};

const StreakCard: React.FC<StreakCardProps> = ({ streak }) => {
  return (
    <LinearGradient
      colors={[Colors.warning, '#FF9800']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.iconContainer}>
        <Flame size={24} color={Colors.white} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>連続学習日数</Text>
        <Text style={styles.streak}>{streak} 日</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
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
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  streak: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default StreakCard;