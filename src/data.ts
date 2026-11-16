export const pillars = [
  {
    title: 'Global 1-on-1 Gym Programming',
    subtitle:
      'Custom hypertrophy, strength, and conditioning blocks tailored to your exact gym equipment, schedule, and biomechanics.',
    points: ['Built around your equipment and schedule', 'Progressed every two weeks', 'Video form checks included'],
  },
  {
    title: 'Precision Nutrition & Macro Systems',
    subtitle:
      'Flexible, culture-friendly meal structures designed around foods you actually enjoy. No starvation, no guesswork.',
    points: ['Macro targets matched to your goal', 'Meals from your own food culture', 'Weekly adjustments from real data'],
  },
  {
    title: 'Daily Lifestyle & Habit Architecture',
    subtitle:
      'Sleep optimization, morning routines, stress management, and weekly mindset check-ins to elevate your career and daily life.',
    points: ['Sleep and recovery targets', 'Morning routine design', 'Weekly mindset review'],
  },
];

export const tiers = [
  {
    name: 'Foundation',
    tag: 'Self-guided structure',
    body: 'Custom monthly workout split, personalized calorie and macro targets, access to the RepAfterRep mobile tracking dashboard, and monthly plan adjustments.',
  },
  {
    name: 'Accelerate',
    tag: 'Most popular',
    body: 'Fully bespoke training and meal plans, bi-weekly video form checks, a habit and lifestyle tracker, direct in-app coach messaging, and bi-weekly strategy adjustments.',
  },
  {
    name: 'Apex 1-on-1',
    tag: 'Total life and physique transformation',
    body: 'High-touch private coaching anywhere in the world. Weekly 1-on-1 video calls, daily accountability check-ins, real-time diet and travel adaptations, supplement protocols, and priority 24/7 coach access.',
  },
];

export const wins = [
  'Down 14 kg & promoted at work',
  'Finally a diet that fits my culture',
  'Energy levels are unreal now',
  "Best 1-on-1 coach I've ever had",
];

export type Exercise = { name: string; sets: number; reps: string; rpe: number; rest: string };
export type Day = { day: string; title: string; exercises: Exercise[] };

export const week: Day[] = [
  {
    day: 'Mon',
    title: 'Lower Strength',
    exercises: [
      { name: 'Back Squat', sets: 4, reps: '5', rpe: 8, rest: '3:00' },
      { name: 'Romanian Deadlift', sets: 3, reps: '8-10', rpe: 7, rest: '2:00' },
      { name: 'Walking Lunge', sets: 3, reps: '12 per leg', rpe: 7, rest: '90s' },
    ],
  },
  { day: 'Tue', title: 'Recovery', exercises: [] },
  {
    day: 'Wed',
    title: 'Upper Hypertrophy',
    exercises: [
      { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', rpe: 8, rest: '2:00' },
      { name: 'Chest-Supported Row', sets: 4, reps: '10-12', rpe: 8, rest: '90s' },
      { name: 'Lateral Raise', sets: 3, reps: '15', rpe: 9, rest: '60s' },
    ],
  },
  { day: 'Thu', title: 'Recovery', exercises: [] },
  {
    day: 'Fri',
    title: 'Full-Body Power',
    exercises: [
      { name: 'Trap Bar Deadlift', sets: 4, reps: '4', rpe: 8, rest: '3:00' },
      { name: 'Overhead Press', sets: 3, reps: '6-8', rpe: 7, rest: '2:00' },
      { name: 'Pull-Up', sets: 3, reps: 'Max', rpe: 8, rest: '2:00' },
    ],
  },
  {
    day: 'Sat',
    title: 'Conditioning',
    exercises: [
      { name: 'Sled Push', sets: 6, reps: '20 m', rpe: 8, rest: '60s' },
      { name: 'Farmer Carry', sets: 4, reps: '40 m', rpe: 7, rest: '60s' },
    ],
  },
  { day: 'Sun', title: 'Recovery', exercises: [] },
];

export type Meal = { name: string; time: string; options: string[]; kcal: number };

export const meals: Meal[] = [
  { name: 'Meal 1', time: '07:30', options: ['Oats, whey, berries, 2 eggs', 'Greek yogurt, granola, berries, 2 eggs'], kcal: 520 },
  { name: 'Meal 2', time: '12:30', options: ['Chicken rice bowl, greens, olive oil', 'Salmon, quinoa, roasted vegetables'], kcal: 640 },
  { name: 'Meal 3', time: '16:00', options: ['Tuna wrap, cucumber, yogurt sauce', 'Cottage cheese, fruit, almonds'], kcal: 320 },
  { name: 'Meal 4', time: '19:30', options: ['Lean beef stir fry, jasmine rice', 'Turkey mince tacos, peppers, salsa'], kcal: 600 },
];

export const macros = [
  { label: 'Calories', value: 1640, target: 2400, unit: 'kcal' },
  { label: 'Protein', value: 124, target: 180, unit: 'g' },
  { label: 'Carbs', value: 170, target: 260, unit: 'g' },
  { label: 'Fats', value: 48, target: 70, unit: 'g' },
];

export const weights = [84.2, 83.9, 83.7, 83.1, 82.8, 82.9, 82.2, 81.8, 81.6, 81.1, 80.9, 80.4];

export const lifts: Record<string, number[]> = {
  Squat: [90, 92.5, 92.5, 95, 97.5, 97.5, 100, 100],
  Bench: [65, 65, 67.5, 67.5, 70, 70, 72.5, 75],
  Deadlift: [110, 112.5, 115, 115, 120, 122.5, 125, 127.5],
  Row: [60, 62.5, 62.5, 65, 65, 67.5, 70, 70],
};

export const habitLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const habits = [80, 90, 70, 100, 85, 95, 90];

export type Plan = {
  id: string;
  name: string;
  tag: string;
  monthly: number;
  annual: number;
  points: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    tag: 'Self-guided structure',
    monthly: 99,
    annual: 79,
    points: ['Custom monthly workout split', 'Personalized calorie and macro targets', 'Mobile tracking dashboard', 'Monthly plan adjustments'],
  },
  {
    id: 'accelerate',
    name: 'Accelerate',
    tag: 'Complete fitness and diet coaching',
    monthly: 149,
    annual: 119,
    featured: true,
    points: ['Fully bespoke training and meal plans', 'Bi-weekly video form checks', 'Habit and lifestyle tracker', 'Direct in-app coach messaging', 'Bi-weekly strategy adjustments'],
  },
  {
    id: 'apex',
    name: 'Apex 1-on-1',
    tag: 'Total life and physique transformation',
    monthly: 199,
    annual: 159,
    points: ['Weekly 1-on-1 video calls', 'Daily accountability check-ins', 'Real-time diet and travel adaptations', 'Supplement protocols', 'Priority 24/7 coach access'],
  },
];

export const compareRows = [
  'Custom training program',
  'Macro and meal plan',
  'Mobile tracking dashboard',
  'Bi-weekly video form checks',
  'Direct coach messaging',
  'Weekly check-ins and adjustments',
  'Supplement protocols',
  '24/7 coach access',
];

export const compareValues: boolean[][] = [
  [true, true, true, true, true, true, true, true],
  [false, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true],
];

export const faqs = [
  {
    q: 'Can I change plans later?',
    a: 'Yes. You can move up or down at the end of any billing period, and your plan history and progress carry over.',
  },
  {
    q: 'What does annual billing save?',
    a: 'Annual billing takes 20 percent off the monthly price. You are billed once a year and can cancel renewal at any time.',
  },
  {
    q: 'Do I need a gym membership?',
    a: 'Not for Foundation. Your programming includes home and gym versions, and we will adapt any session to the equipment you have.',
  },
];
