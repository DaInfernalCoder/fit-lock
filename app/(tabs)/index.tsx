import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Lock, Clock, Flame, Target, CircleCheck as CheckCircle2, RotateCcw, Bell, Dumbbell, Quote, Calendar, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Home() {
  const [isPhoneLocked, setIsPhoneLocked] = useState(true);
  const [todayWorkoutCompleted, setTodayWorkoutCompleted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(4);
  const [todayWorkout, setTodayWorkout] = useState({
    name: 'Upper Body Focus',
    duration: 45,
    exercises: 8,
    intensity: 'Medium',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps', 'Back'],
    estimatedCalories: 320,
  });

  // Get current date
  const getCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  // Generate week data for streak visualization
  const generateWeekData = () => {
    const days = ['F', 'S', 'S', 'M', 'T', 'W', 'T'];
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    return days.map((day, index) => {
      const isToday = index === 4; // Thursday in the example
      const isCompleted = index < 4; // First 4 days completed
      const dayNumber = 15 + index; // Starting from 15th
      
      return {
        day,
        dayNumber,
        isToday,
        isCompleted,
      };
    });
  };

  const weekData = generateWeekData();

  const unlockPhone = () => {
    setIsPhoneLocked(false);
    setTodayWorkoutCompleted(true);
    setCurrentStreak(prev => prev + 1);
    Alert.alert(
      'Workout Complete! 🎉',
      'Amazing job! Your phone is now unlocked and your streak continues.',
      [{ text: 'Awesome!' }]
    );
  };

  const startWorkout = () => {
    Alert.alert(
      'Start Workout',
      'Ready to begin your Upper Body Focus workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: unlockPhone }
      ]
    );
  };

  const changeWorkout = () => {
    Alert.alert(
      'Change Workout',
      'This would open the body map to select different muscle groups.',
      [{ text: 'OK' }]
    );
  };

  const previewWorkout = () => {
    Alert.alert(
      'Workout Preview',
      'This would show detailed exercise breakdown and instructions.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.appName}>FocusFit</Text>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.notificationContainer}>
              <Bell color="#9CA3AF" size={24} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>2</Text>
              </View>
            </View>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
                style={styles.profileImage}
              />
            </View>
          </View>
        </View>

        {/* Lock Status Module */}
        <View style={[styles.card, styles.lockStatusCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Phone Status</Text>
            <View style={[
              styles.statusBadge,
              isPhoneLocked ? styles.lockedBadge : styles.unlockedBadge
            ]}>
              <Text style={styles.statusText}>
                {isPhoneLocked ? 'Locked' : 'Unlocked'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.lockDescription}>
            {isPhoneLocked 
              ? 'Distracting apps are blocked until your workout is complete.'
              : 'Great job! Your phone is unlocked for the day.'
            }
          </Text>
          
          <View style={styles.lockFooter}>
            <View style={styles.lockInfo}>
              <Lock color="#0070FF" size={18} />
              <Text style={styles.lockTime}>
                {isPhoneLocked ? 'Until 10:30 AM' : 'Unlocked'}
              </Text>
            </View>
            {isPhoneLocked && (
              <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
                <Text style={styles.startButtonText}>Start Workout</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Progress Tracker */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <View style={styles.streakHeader}>
              <View style={styles.streakInfo}>
                <Text style={styles.streakNumber}>{currentStreak}</Text>
                <Text style={styles.streakLabel}>Day Streak</Text>
              </View>
              <Text style={styles.fireEmoji}>🔥</Text>
            </View>
            
            <View style={styles.weekGrid}>
              {weekData.map((item, index) => (
                <View key={index} style={styles.dayColumn}>
                  <Text style={styles.dayLabel}>{item.day}</Text>
                  <View style={[
                    styles.dayCircle,
                    item.isToday && styles.todayCircle,
                    item.isCompleted && !item.isToday && styles.completedCircle,
                  ]}>
                    {item.isCompleted && !item.isToday ? (
                      <CheckCircle2 color="#0070FF" size={16} />
                    ) : (
                      <Text style={[
                        styles.dayNumber,
                        item.isToday && styles.todayNumber,
                      ]}>
                        {item.dayNumber}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Today's Workout */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Workout</Text>
            <TouchableOpacity onPress={changeWorkout}>
              <Text style={styles.viewAllText}>Change</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <View style={styles.workoutHeader}>
              <View style={styles.workoutIcon}>
                <Dumbbell color="#0070FF" size={24} />
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{todayWorkout.name}</Text>
                <View style={styles.workoutMeta}>
                  <Clock color="#9CA3AF" size={14} />
                  <Text style={styles.workoutMetaText}>{todayWorkout.duration} min</Text>
                  <Text style={styles.workoutMetaText}>•</Text>
                  <Text style={styles.workoutMetaText}>{todayWorkout.intensity} Intensity</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.muscleGroups}>
              {todayWorkout.muscleGroups.map((group, index) => (
                <View key={index} style={styles.muscleTag}>
                  <Text style={styles.muscleTagText}>{group}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.workoutFooter}>
              <View style={styles.caloriesInfo}>
                <Flame color="#FF4D4D" size={16} />
                <Text style={styles.caloriesText}>Est. {todayWorkout.estimatedCalories} calories</Text>
              </View>
              <TouchableOpacity style={styles.previewButton} onPress={previewWorkout}>
                <Text style={styles.previewButtonText}>Preview</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Motivational Quote */}
        <View style={styles.quoteCard}>
          <Quote color="#0070FF" size={24} style={styles.quoteIcon} />
          <Text style={styles.quoteText}>
            "The only bad workout is the one that didn't happen."
          </Text>
          <Text style={styles.quoteSubtext}>
            Complete today's workout to unlock your apps
          </Text>
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerLeft: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#0070FF',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0070FF',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  lockStatusCard: {
    marginTop: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  lockedBadge: {
    backgroundColor: '#FF4D4D',
  },
  unlockedBadge: {
    backgroundColor: '#32CD32',
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  lockDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 16,
  },
  lockFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lockTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
  },
  startButton: {
    backgroundColor: '#0070FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#0070FF',
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  streakNumber: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  streakLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  fireEmoji: {
    fontSize: 32,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  dayColumn: {
    alignItems: 'center',
    gap: 4,
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCircle: {
    backgroundColor: '#0070FF',
    borderColor: '#0070FF',
  },
  completedCircle: {
    backgroundColor: '#121212',
    borderColor: '#2A2A2A',
  },
  dayNumber: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  todayNumber: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workoutMetaText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  muscleTag: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  muscleTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  caloriesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  caloriesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  previewButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1,
    borderColor: '#0070FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  previewButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#0070FF',
  },
  quoteCard: {
    backgroundColor: '#000000',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  quoteIcon: {
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});