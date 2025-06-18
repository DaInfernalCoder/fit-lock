export interface User {
  id: string;
  email: string;
  full_name?: string;
  fitness_level: 'beginner' | 'intermediate' | 'advanced';
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkoutPlan {
  id: string;
  user_id: string;
  muscle_groups: string[];
  exercises: Exercise[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_duration: number;
  created_at: string;
  completed_at?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscle_group: string;
  sets: number;
  reps: number;
  rest_seconds: number;
  instructions: string;
}

export interface WorkoutStreak {
  id: string;
  user_id: string;
  date: string;
  completed: boolean;
  workout_plan_id?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_type: 'basic' | 'premium';
  status: 'active' | 'inactive' | 'cancelled';
  created_at: string;
  expires_at: string;
}