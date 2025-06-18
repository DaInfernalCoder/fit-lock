import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, Target, ArrowRight } from 'lucide-react-native';

interface MuscleGroup {
  id: string;
  name: string;
  area: 'upper' | 'lower' | 'core';
  color: string;
}

const muscleGroups: MuscleGroup[] = [
  { id: 'chest', name: 'Chest', area: 'upper', color: '#EF4444' },
  { id: 'shoulders', name: 'Shoulders', area: 'upper', color: '#F97316' },
  { id: 'arms', name: 'Arms', area: 'upper', color: '#EAB308' },
  { id: 'back', name: 'Back', area: 'upper', color: '#22C55E' },
  { id: 'core', name: 'Core', area: 'core', color: '#3B82F6' },
  { id: 'legs', name: 'Legs', area: 'lower', color: '#8B5CF6' },
  { id: 'glutes', name: 'Glutes', area: 'lower', color: '#EC4899' },
  { id: 'calves', name: 'Calves', area: 'lower', color: '#06B6D4' },
];

export default function BodyMap() {
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [workoutIntensity, setWorkoutIntensity] = useState<'light' | 'moderate' | 'intense'>('moderate');

  const toggleMuscleGroup = (muscleId: string) => {
    setSelectedMuscles(prev => 
      prev.includes(muscleId)
        ? prev.filter(id => id !== muscleId)
        : [...prev, muscleId]
    );
  };

  const generateWorkout = () => {
    if (selectedMuscles.length === 0) {
      Alert.alert('Select Muscle Groups', 'Please select at least one muscle group for your workout.');
      return;
    }

    const selectedNames = muscleGroups
      .filter(muscle => selectedMuscles.includes(muscle.id))
      .map(muscle => muscle.name)
      .join(', ');

    Alert.alert(
      'Workout Generated! 🎯',
      `AI workout plan created for: ${selectedNames}\nIntensity: ${workoutIntensity}\n\nThis would generate a custom workout plan in the full version.`,
      [{ text: 'Start Workout' }, { text: 'Customize More' }]
    );
  };

  const renderBodySection = (area: 'upper' | 'lower' | 'core', title: string) => {
    const sectionMuscles = muscleGroups.filter(muscle => muscle.area === area);
    
    return (
      <View style={styles.bodySection}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.muscleGrid}>
          {sectionMuscles.map((muscle) => {
            const isSelected = selectedMuscles.includes(muscle.id);
            return (
              <TouchableOpacity
                key={muscle.id}
                style={[
                  styles.muscleButton,
                  { backgroundColor: muscle.color },
                  isSelected && styles.muscleButtonSelected,
                ]}
                onPress={() => toggleMuscleGroup(muscle.id)}
              >
                <Text style={[
                  styles.muscleButtonText,
                  isSelected && styles.muscleButtonTextSelected,
                ]}>
                  {muscle.name}
                </Text>
                {isSelected && (
                  <View style={styles.selectedIndicator}>
                    <Target color="#FFFFFF" size={16} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
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
          <Text style={styles.title}>Body Map</Text>
          <Text style={styles.subtitle}>
            Select muscle groups for your custom AI workout
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Body Sections */}
        {renderBodySection('upper', 'Upper Body')}
        {renderBodySection('core', 'Core')}
        {renderBodySection('lower', 'Lower Body')}

        {/* Workout Intensity */}
        <View style={styles.intensitySection}>
          <Text style={styles.sectionTitle}>Workout Intensity</Text>
          <View style={styles.intensityOptions}>
            {(['light', 'moderate', 'intense'] as const).map((intensity) => (
              <TouchableOpacity
                key={intensity}
                style={[
                  styles.intensityButton,
                  workoutIntensity === intensity && styles.intensityButtonSelected,
                ]}
                onPress={() => setWorkoutIntensity(intensity)}
              >
                <Text style={[
                  styles.intensityButtonText,
                  workoutIntensity === intensity && styles.intensityButtonTextSelected,
                ]}>
                  {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected Summary */}
        {selectedMuscles.length > 0 && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Zap color="#FF6B35" size={24} />
              <Text style={styles.summaryTitle}>Selected for Workout</Text>
            </View>
            <View style={styles.selectedMuscles}>
              {selectedMuscles.map((muscleId) => {
                const muscle = muscleGroups.find(m => m.id === muscleId);
                return (
                  <View key={muscleId} style={[styles.selectedTag, { backgroundColor: muscle?.color }]}>
                    <Text style={styles.selectedTagText}>{muscle?.name}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.intensityDisplay}>
              Intensity: <Text style={styles.intensityValue}>{workoutIntensity}</Text>
            </Text>
          </View>
        )}

        {/* Generate Workout Button */}
        <TouchableOpacity
          style={[
            styles.generateButton,
            selectedMuscles.length === 0 && styles.generateButtonDisabled,
          ]}
          onPress={generateWorkout}
          disabled={selectedMuscles.length === 0}
        >
          <Zap color="#FFFFFF" size={20} />
          <Text style={styles.generateButtonText}>Generate AI Workout</Text>
          <ArrowRight color="#FFFFFF" size={20} />
        </TouchableOpacity>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
          <Text style={styles.tipText}>
            • Select 2-3 muscle groups for balanced workouts
          </Text>
          <Text style={styles.tipText}>
            • Mix upper and lower body for full-body sessions
          </Text>
          <Text style={styles.tipText}>
            • Start with light intensity if you're new to fitness
          </Text>
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
  bodySection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  muscleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  muscleButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 100,
    alignItems: 'center',
    position: 'relative',
    opacity: 0.8,
  },
  muscleButtonSelected: {
    opacity: 1,
    transform: [{ scale: 1.05 }],
  },
  muscleButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  muscleButtonTextSelected: {
    color: '#FFFFFF',
  },
  selectedIndicator: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#10B981',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intensitySection: {
    marginBottom: 32,
  },
  intensityOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  intensityButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  intensityButtonSelected: {
    backgroundColor: '#FF6B35',
  },
  intensityButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  intensityButtonTextSelected: {
    color: '#FFFFFF',
  },
  summaryCard: {
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
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 12,
  },
  selectedMuscles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  selectedTag: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  selectedTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  intensityDisplay: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  intensityValue: {
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    textTransform: 'capitalize',
  },
  generateButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
    marginBottom: 24,
  },
  generateButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  generateButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  tipsCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    marginBottom: 4,
  },
});