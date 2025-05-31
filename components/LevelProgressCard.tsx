import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/colors';
import { Trophy } from 'lucide-react-native';

type LevelProgressCardProps = {
  level: number;
  xp: number;
};

const LevelProgressCard: React.FC<LevelProgressCardProps> = ({ level, xp }) => {
  // Calculate XP needed for next level
  const currentLevelXp = Math.pow(level - 1, 2) * 100;
  const nextLevelXp = Math.pow(level, 2) * 100;
  const xpForNextLevel = nextLevelXp - currentLevelXp;
  const currentLevelProgress = xp - currentLevelXp;
  const progressPercentage = Math.min(100, Math.round((currentLevelProgress / xpForNextLevel) * 100));
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Trophy size={20} color={Colors.primary} />
        </View>
        <Text style={styles.title}>レベル {level}</Text>
        <Text style={styles.xpText}>{xp} XP</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          次のレベルまで: {xpForNextLevel - currentLevelProgress} XP
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  xpText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textLight,
  },
});

export default LevelProgressCard;