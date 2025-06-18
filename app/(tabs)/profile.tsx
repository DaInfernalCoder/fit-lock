import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Bell, Crown, Heart, CircleHelp as HelpCircle, LogOut, ChevronRight, Trophy, Target, Flame } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

export default function Profile() {
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (!error) {
              router.replace('/(auth)');
            }
          }
        }
      ]
    );
  };

  const handleSubscription = () => {
    Alert.alert(
      'Premium Subscription',
      'Upgrade to Premium for unlimited AI workouts, advanced analytics, and exclusive features!\n\nNote: In the full version, this would integrate with RevenueCat for subscription management.',
      [
        { text: 'Later', style: 'cancel' },
        { text: 'Upgrade Now', style: 'default' }
      ]
    );
  };

  const handleHealthSync = () => {
    Alert.alert(
      'Apple Health Integration',
      'Sync your workout data with Apple Health to track calories, heart rate, and more.\n\nNote: This would require native Apple Health integration in the full version.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Connect', style: 'default' }
      ]
    );
  };

  const menuItems = [
    {
      icon: Crown,
      title: 'Upgrade to Premium',
      subtitle: 'Unlock unlimited features',
      color: '#F59E0B',
      onPress: handleSubscription,
      highlight: true,
    },
    {
      icon: Heart,
      title: 'Apple Health Sync',
      subtitle: 'Connect with Apple Health',
      color: '#EF4444',
      onPress: handleHealthSync,
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Workout reminders & updates',
      color: '#3B82F6',
      rightComponent: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#D1D5DB', true: '#FF6B35' }}
          thumbColor="#FFFFFF"
        />
      ),
    },
    {
      icon: Target,
      title: 'Workout Reminders',
      subtitle: 'Daily motivation alerts',
      color: '#10B981',
      rightComponent: (
        <Switch
          value={workoutReminders}
          onValueChange={setWorkoutReminders}
          trackColor={{ false: '#D1D5DB', true: '#FF6B35' }}
          thumbColor="#FFFFFF"
        />
      ),
    },
    {
      icon: Settings,
      title: 'Settings',
      subtitle: 'App preferences & privacy',
      color: '#6B7280',
      onPress: () => Alert.alert('Settings', 'Settings screen would open here'),
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'FAQs, contact support',
      color: '#8B5CF6',
      onPress: () => Alert.alert('Support', 'Help center would open here'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <User color="#FFFFFF" size={32} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>
                {user?.user_metadata?.full_name || 'Fitness Enthusiast'}
              </Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Flame color="#FF6B35" size={20} />
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Trophy color="#F59E0B" size={20} />
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </View>
            <View style={styles.statItem}>
              <Target color="#10B981" size={20} />
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  item.highlight && styles.highlightMenuItem,
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[
                    styles.menuIcon,
                    { backgroundColor: item.color },
                    item.highlight && styles.highlightIcon,
                  ]}>
                    <IconComponent color="#FFFFFF" size={20} />
                  </View>
                  <View style={styles.menuText}>
                    <Text style={[
                      styles.menuTitle,
                      item.highlight && styles.highlightText,
                    ]}>
                      {item.title}
                    </Text>
                    <Text style={[
                      styles.menuSubtitle,
                      item.highlight && styles.highlightSubtext,
                    ]}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                
                {item.rightComponent || (
                  <ChevronRight 
                    color={item.highlight ? '#F59E0B' : '#6B7280'} 
                    size={20} 
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Version Info */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>FitMotivate v1.0.0</Text>
          <Text style={styles.versionSubtext}>Built with ❤️ for your fitness journey</Text>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut color="#EF4444" size={20} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  menuSection: {
    gap: 12,
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  highlightMenuItem: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  highlightIcon: {
    backgroundColor: '#F59E0B',
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  highlightText: {
    color: '#92400E',
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  highlightSubtext: {
    color: '#D97706',
  },
  versionSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
  },
  bottomPadding: {
    height: 32,
  },
});