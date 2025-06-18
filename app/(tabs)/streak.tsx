import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame, Calendar, Trophy, TrendingUp, CircleCheck as CheckCircle2, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const cellSize = (width - 48 - 24) / 7; // Account for padding and gaps

interface DayData {
  date: string;
  completed: boolean;
  day: number;
}

export default function Streak() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(14);
  const [totalWorkouts, setTotalWorkouts] = useState(23);

  // Generate calendar data for current month
  const generateCalendarData = (): DayData[] => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const calendarData: DayData[] = [];
    
    // Add empty cells for days before the first day of the month
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      calendarData.push({
        date: '',
        completed: false,
        day: 0,
      });
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isCompleted = Math.random() > 0.3; // Random completion for demo
      calendarData.push({
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        completed: isCompleted,
        day,
      });
    }
    
    return calendarData;
  };

  const [calendarData] = useState(generateCalendarData());

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonth = monthNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  const renderCalendarDay = (dayData: DayData, index: number) => {
    if (dayData.day === 0) {
      return <View key={index} style={styles.emptyDay} />;
    }

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.calendarDay,
          dayData.completed ? styles.completedDay : styles.incompletedDay,
        ]}
      >
        <Text style={[
          styles.dayText,
          dayData.completed ? styles.completedDayText : styles.incompletedDayText,
        ]}>
          {dayData.day}
        </Text>
        
        {dayData.completed && (
          <View style={styles.completedIndicator}>
            <CheckCircle2 color="#FFFFFF" size={12} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const completionRate = Math.round((calendarData.filter(day => day.completed && day.day > 0).length / calendarData.filter(day => day.day > 0).length) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Workout Streak</Text>
          <Text style={styles.subtitle}>Track your consistency and progress</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Streak Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Flame color="#FF6B35" size={32} />
            <Text style={styles.statNumber}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <Trophy color="#F59E0B" size={32} />
            <Text style={styles.statNumber}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <TrendingUp color="#10B981" size={32} />
            <Text style={styles.statNumber}>{totalWorkouts}</Text>
            <Text style={styles.statLabel}>Total Workouts</Text>
          </View>
        </View>

        {/* Monthly Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Monthly Progress</Text>
              <Text style={styles.progressSubtitle}>{currentMonth} {currentYear}</Text>
            </View>
            <View style={styles.completionBadge}>
              <Text style={styles.completionText}>{completionRate}%</Text>
            </View>
          </View>

          <View style={styles.calendar}>
            {/* Week day headers */}
            <View style={styles.weekHeader}>
              {weekDays.map((day) => (
                <Text key={day} style={styles.weekDayText}>{day}</Text>
              ))}
            </View>

            {/* Calendar grid */}
            <View style={styles.calendarGrid}>
              {calendarData.map((dayData, index) => renderCalendarDay(dayData, index))}
            </View>
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.completedLegend]} />
              <Text style={styles.legendText}>Workout Completed</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.incompletedLegend]} />
              <Text style={styles.legendText}>Missed Workout</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsCard}>
          <View style={styles.achievementsHeader}>
            <Trophy color="#FF6B35" size={24} />
            <Text style={styles.achievementsTitle}>Recent Achievements</Text>
          </View>

          <View style={styles.achievements}>
            <View style={styles.achievement}>
              <View style={styles.achievementIcon}>
                <Flame color="#FF6B35" size={20} />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementName}>Week Warrior</Text>
                <Text style={styles.achievementDescription}>7-day workout streak</Text>
              </View>
              <CheckCircle2 color="#10B981" size={20} />
            </View>

            <View style={styles.achievement}>
              <View style={styles.achievementIcon}>
                <Calendar color="#3B82F6" size={20} />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementName}>Consistency King</Text>
                <Text style={styles.achievementDescription}>20 workouts this month</Text>
              </View>
              <CheckCircle2 color="#10B981" size={20} />
            </View>

            <View style={[styles.achievement, styles.lockedAchievement]}>
              <View style={styles.achievementIcon}>
                <Trophy color="#6B7280" size={20} />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementName, styles.lockedText]}>
                  Marathon Master
                </Text>
                <Text style={[styles.achievementDescription, styles.lockedText]}>
                  30-day workout streak
                </Text>
              </View>
              <View style={styles.lockIcon}>
                <Text style={styles.lockText}>🔒</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Motivation Quote */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationQuote}>
            "Success is the sum of small efforts repeated day in and day out."
          </Text>
          <Text style={styles.motivationAuthor}>- Robert Collier</Text>
        </View>
      </ScrollView>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  progressSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  completionBadge: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  completionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  calendar: {
    marginBottom: 16,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
    width: cellSize,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  emptyDay: {
    width: cellSize,
    height: cellSize,
  },
  calendarDay: {
    width: cellSize,
    height: cellSize,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  completedDay: {
    backgroundColor: '#10B981',
  },
  incompletedDay: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  completedDayText: {
    color: '#FFFFFF',
  },
  incompletedDayText: {
    color: '#6B7280',
  },
  completedIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  completedLegend: {
    backgroundColor: '#10B981',
  },
  incompletedLegend: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  achievementsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 12,
  },
  achievements: {
    gap: 16,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  lockedText: {
    color: '#9CA3AF',
  },
  lockIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockText: {
    fontSize: 16,
  },
  motivationCard: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  motivationQuote: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  motivationAuthor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FED7AA',
  },
});