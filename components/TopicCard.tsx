import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Topic } from '@/constants/topics';
import Colors from '@/constants/colors';
import useUserStore from '@/store/userStore';
import { Shield, Briefcase, Settings, Code, Wifi, Database } from 'lucide-react-native';

type TopicCardProps = {
  topic: Topic;
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'briefcase':
      return <Briefcase size={24} color={Colors.white} />;
    case 'settings':
      return <Settings size={24} color={Colors.white} />;
    case 'code':
      return <Code size={24} color={Colors.white} />;
    case 'wifi':
      return <Wifi size={24} color={Colors.white} />;
    case 'database':
      return <Database size={24} color={Colors.white} />;
    case 'shield':
      return <Shield size={24} color={Colors.white} />;
    default:
      return <Briefcase size={24} color={Colors.white} />;
  }
};

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const router = useRouter();
  const topicProgress = useUserStore((state) => state.topicProgress[topic.id] || 0);
  
  const handlePress = () => {
    router.push(`/topic/${topic.id}`);
  };

  const progressPercentage = Math.min(100, Math.round((topicProgress / topic.totalQuestions) * 100));
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[topic.color, `${topic.color}99`]}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          {getIconComponent(topic.icon)}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{topic.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {topic.description}
          </Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{progressPercentage}%</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    height: 120,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default TopicCard;