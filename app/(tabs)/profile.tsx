import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import useUserStore from '@/store/userStore';
import { User, Award, LogOut, Settings, HelpCircle, Bell } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function ProfileScreen() {
  const { name, level, xp, resetStreak } = useUserStore();
  
  const handleLogout = () => {
    Alert.alert(
      "ログアウト",
      "本当にログアウトしますか？",
      [
        {
          text: "キャンセル",
          style: "cancel"
        },
        { 
          text: "ログアウト", 
          style: "destructive",
          onPress: () => {
            if (Platform.OS !== 'web') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
            resetStreak();
            useUserStore.setState({ name: '' });
          }
        }
      ]
    );
  };
  
  const menuItems = [
    {
      icon: <Settings size={24} color={Colors.text} />,
      title: "設定",
      onPress: () => {
        if (Platform.OS !== 'web') {
          Haptics.selectionAsync();
        }
        Alert.alert("設定", "この機能は現在開発中です。");
      }
    },
    {
      icon: <Bell size={24} color={Colors.text} />,
      title: "通知",
      onPress: () => {
        if (Platform.OS !== 'web') {
          Haptics.selectionAsync();
        }
        Alert.alert("通知", "この機能は現在開発中です。");
      }
    },
    {
      icon: <HelpCircle size={24} color={Colors.text} />,
      title: "ヘルプ",
      onPress: () => {
        if (Platform.OS !== 'web') {
          Haptics.selectionAsync();
        }
        Alert.alert("ヘルプ", "この機能は現在開発中です。");
      }
    },
    {
      icon: <LogOut size={24} color={Colors.error} />,
      title: "ログアウト",
      onPress: handleLogout,
      textColor: Colors.error
    }
  ];
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User size={40} color={Colors.white} />
          </View>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.levelContainer}>
            <Award size={16} color={Colors.primary} />
            <Text style={styles.levelText}>レベル {level} • {xp} XP</Text>
          </View>
        </View>
        
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuIcon}>{item.icon}</View>
              <Text style={[styles.menuTitle, item.textColor && { color: item.textColor }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.versionText}>バージョン 1.0.0</Text>
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
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    marginLeft: 6,
  },
  menuContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: Colors.text,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textLight,
  },
});