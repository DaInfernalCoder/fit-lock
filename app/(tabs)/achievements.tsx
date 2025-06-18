import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Trophy, 
  Flame, 
  Target, 
  Award, 
  Calendar,
  Zap,
  Star,
  Crown,
  Lock
} from 'lucide-react-native';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  unlockedDate?: string;
  category: 'streak' | 'workout' | 'milestone' | 'special';
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Step',
    description: 'Complete your first workout',
    icon: Target,
    color: '#10B981',
    unlocked: true,
    unlockedDate: '2024-01-15',
    category: 'milestone',
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Maintain a 7-day workout streak',
    icon: Flame,
    color: '#FF6B35',
    unlocked: true,
    unlockedDate: '2024-01-22',
    category: 'streak',
  },
  {
    id: '3',
    title: 'Consistency King',
    description: 'Complete 20 workouts',
    icon: Calendar,
    color: '#3B82F6',
    unlocked: true,
    progress: 23,
    maxProgress: 20,
    unlockedDate: '2024-01-28',
    category: 'workout',
  },
  {
    id: '4',
    title: 'Upper Body Master',
    description: 'Complete 10 upper body workouts',
    icon: Zap,
    color: '#8B5CF6',
    unlocked: true,
    progress: 12,
    maxProgress: 10,
    unlockedDate: '2024-01-25',
    category: 'workout',
  },
  {
    id: '5',
    title: 'Marathon Master',
    description: 'Maintain a 30-day workout streak',
    icon: Crown,
    color: '#F59E0B',
    unlocked: false,
    progress: 7,
    maxProgress: 30,
    category: 'streak',
  },
  {
    id: '6',
    title: 'Century Club',
    description: 'Complete 100 workouts',
    icon: Star,
    color: '#EF4444',
    unlocked: false,
    progress: 23,
    maxProgress: 100,
    category: 'workout',
  },
  {
    id: '7',
    title: 'Iron Will',
    description: 'Work out 365 days in a year',
    icon: Award,
    color: '#06B6D4',
    unlocked: false,
    progress: 23,
    maxProgress: 365,
    category: 'special',
  },
  {
    id: '8',
    title: 'Perfect Week',
    description: 'Complete all 7 planned workouts in a week',
    icon: Trophy,
    color: '#10B981',
    unlocked: false,
    progress: 5,
    maxProgress: 7,
    category: 'special',
  },
];

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'streak', name: 'Streaks', icon: Flame },
    { id: 'workout', name: 'Workouts', icon: Target },
    { id: 'milestone', name: 'Milestones', icon: Award },
    { id: 'special', name: 'Special', icon: Star },
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const renderAchievement = ({ item }: { item: Achievement }) => {
    const IconComponent = item.icon;
    const progressPercentage = item.maxProgress 
      ? Math.min((item.progress || 0) / item.maxProgress * 100, 100)
      : 100;

    return (
      <View style={[
        styles.achievementCard,
        item.unlocked ? styles.unlockedCard : styles.lockedCard
      ]}>
        <View style={styles.achievementHeader}>
          <View style={[
            styles.achievementIcon,
            { backgroundColor: item.unlocked ? item.color : '#D1D5DB' }
          ]}>
            <IconComponent 
              color="#FFFFFF" 
              size={24}
              style={!item.unlocked && styles.lockedIcon} 
            />
            {!item.unlocked && (
              <View style={styles.lockOverlay}>
                <Lock color="#6B7280" size={16} />
              </View>
            )}
          </View>
          
          <View style={styles.achievementInfo}>
            <Text style={[
              styles.achievementTitle,
              !item.unlocked && styles.lockedText
            ]}>
              {item.title}
            </Text>
            <Text style={[
              styles.achievementDescription,
              !item.unlocked && styles.lockedText
            ]}>
              {item.description}
            </Text>
            
            {item.unlockedDate && (
              <Text style={styles.unlockedDate}>
                Unlocked {item.unlockedDate}
              </Text>
            )}
          </View>
        </View>

        {item.maxProgress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${progressPercentage}%`,
                    backgroundColor: item.unlocked ? item.color : '#D1D5DB'
                  }
                ]} 
              />
            </View>
            <Text style={[
              styles.progressText,
              !item.unlocked && styles.lockedText
            ]}>
              {item.progress || 0} / {item.maxProgress}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Achievements</Text>
          <Text style={styles.subtitle}>
            {unlockedCount} of {totalCount} unlocked ({completionPercentage}%)
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Trophy color="#F59E0B" size={20} />
              <Text style={styles.statText}>{unlockedCount} Unlocked</Text>
            </View>
            <View style={styles.statItem}>
              <Target color="#10B981" size={20} />
              <Text style={styles.statText}>{completionPercentage}% Complete</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  isSelected && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <IconComponent 
                  color={isSelected ? '#FFFFFF' : '#6B7280'} 
                  size={18} 
                />
                <Text style={[
                  styles.categoryButtonText,
                  isSelected && styles.categoryButtonTextSelected
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Achievements List */}
        <FlatList
          data={filteredAchievements}
          renderItem={renderAchievement}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.achievementsList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  categoryButtonSelected: {
    backgroundColor: '#FF6B35',
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF',
  },
  achievementsList: {
    paddingHorizontal: 24,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unlockedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  lockedCard: {
    opacity: 0.7,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  lockedIcon: {
    opacity: 0.5,
  },
  lockOverlay: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  unlockedDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
  },
  lockedText: {
    color: '#9CA3AF',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    minWidth: 50,
    textAlign: 'right',
  },
});