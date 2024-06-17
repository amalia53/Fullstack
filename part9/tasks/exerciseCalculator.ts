interface ExerciseInputValues {
  hours: number[];
  target: number;
}

const isArrayOfNumbers = (
  listAsString: string
): { isArray: boolean; list: number[] } => {
  if (
    listAsString[0] === '[' &&
    listAsString[listAsString.length - 1] === ']'
  ) {
    let arr: number[] = [];
    if (
      listAsString.indexOf('[', 0) > -1 &&
      listAsString.indexOf(']', 0) > -1
    ) {
      try {
        arr = JSON.parse(listAsString) as number[];
      } catch (error) {
        throw new Error('The given list is not in right form');
      }
      return { isArray: true, list: arr };
    }
    return { isArray: false, list: arr };
  } else {
    return { isArray: false, list: [] };
  }
};

[1, 2];

const parseExerciseArguments = (args: string[]): ExerciseInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  const { isArray, list } = isArrayOfNumbers(args[2]);
  if (!isNaN(Number(args[3])) && isArray) {
    return {
      hours: list,
      target: Number(args[3]),
    };
  } else {
    throw new Error('Please enter a list (in form [1,2,3]) and a number');
  }
};

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

try {
  const { hours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
