interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateRating = (average: number, target: number): number => {
  if (average >= target) return 1;
  else if (average >= target / 2) return 2;
  else return 3;
};

const getRatingDescription = (rating: number): string => {
  if (rating === 1) return 'good job! keep up the good work!';
  else if (rating === 2) return 'not too bad but could be better';
  else return "this wasn't great, but keep on trying!";
};

const calculateExercises = (args: number[], target: number): ExerciseValues => {
  const periodlength = args.length;
  const trainingDays = args.filter((hours) => hours !== 0).length;
  const average = args.reduce((a, b) => a + b, 0) / periodlength || 0;
  const rating = calculateRating(average, target);
  const success = average >= target;
  const ratingDescription = getRatingDescription(rating);
  return {
    periodLength: periodlength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
