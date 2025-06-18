import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, Target, Award } from 'lucide-react-native';

type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>('beginner');
  const [phone, setPhone] = useState('');
  const [goals, setGoals] = useState<string[]>([]);

  const fitnessLevels = [
    {
      level: 'beginner' as FitnessLevel,
      title: 'Beginner',
      description: 'New to fitness or getting back into it',
    },
    {
      level: 'intermediate' as FitnessLevel,
      title: 'Intermediate',
      description: 'Regular workout routine, some experience',
    },
    {
      level: 'advanced' as FitnessLevel,
      title: 'Advanced',
      description: 'Experienced, consistent training for years',
    },
  ];

  const goalOptions = [
    'Build Muscle',
    'Lose Weight',
    'Improve Strength',
    'Increase Endurance',
    'Better Health',
    'Athletic Performance',
  ];

  const toggleGoal = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleComplete = async () => {
    if (step === 2 && goals.length === 0) {
      Alert.alert('Please select at least one fitness goal');
      return;
    }

    if (step === 3) {
      // Save onboarding data to Supabase
      // For now, just navigate to the main app
      router.replace('/(tabs)');
      return;
    }

    setStep(step + 1);
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.header}>
        <Target color="#FF6B35" size={48} />
        <Text style={styles.stepTitle}>What's your fitness level?</Text>
        <Text style={styles.stepSubtitle}>
          Help us create the perfect workout plan for you
        </Text>
      </View>

      <View style={styles.options}>
        {fitnessLevels.map((item) => (
          <TouchableOpacity
            key={item.level}
            style={[
              styles.option,
              fitnessLevel === item.level && styles.optionSelected,
            ]}
            onPress={() => setFitnessLevel(item.level)}
          >
            <Text style={[
              styles.optionTitle,
              fitnessLevel === item.level && styles.optionTitleSelected,
            ]}>
              {item.title}
            </Text>
            <Text style={[
              styles.optionDescription,
              fitnessLevel === item.level && styles.optionDescriptionSelected,
            ]}>
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.header}>
        <Award color="#FF6B35" size={48} />
        <Text style={styles.stepTitle}>What are your goals?</Text>
        <Text style={styles.stepSubtitle}>
          Select all that apply - we'll customize your experience
        </Text>
      </View>

      <View style={styles.goalGrid}>
        {goalOptions.map((goal) => (
          <TouchableOpacity
            key={goal}
            style={[
              styles.goalOption,
              goals.includes(goal) && styles.goalOptionSelected,
            ]}
            onPress={() => toggleGoal(goal)}
          >
            <Text style={[
              styles.goalText,
              goals.includes(goal) && styles.goalTextSelected,
            ]}>
              {goal}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.header}>
        <Phone color="#FF6B35" size={48} />
        <Text style={styles.stepTitle}>Contact Information</Text>
        <Text style={styles.stepSubtitle}>
          Optional: Add your phone for workout reminders
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Phone color="#6B7280" size={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number (Optional)"
          placeholderTextColor="#6B7280"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6', '#60A5FA']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.progress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>Step {step} of 3</Text>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </ScrollView>

          <View style={styles.footer}>
            {step > 1 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setStep(step - 1)}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleComplete}
            >
              <Text style={styles.nextButtonText}>
                {step === 3 ? 'Get Started' : 'Continue'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  progress: {
    alignItems: 'center',
    marginBottom: 32,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#E5E7EB',
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    textAlign: 'center',
  },
  options: {
    gap: 16,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    borderColor: '#FF6B35',
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: '#FF6B35',
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  optionDescriptionSelected: {
    color: '#FFFFFF',
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  goalOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  goalOptionSelected: {
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    borderColor: '#FF6B35',
  },
  goalText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  goalTextSelected: {
    color: '#FF6B35',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#E5E7EB',
  },
  nextButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    flex: 1,
    marginLeft: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});