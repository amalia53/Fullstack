interface BmiInputValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

function squareIt(number: number): number {
  return number ** 2;
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / squareIt(height / 100);
  if (bmi >= 30) {
    return 'Obese';
  }
  if (bmi >= 25) {
    return 'Overweight';
  }
  if (bmi >= 18.5) {
    return 'Healthy Weight';
  } else {
    return 'Underweight';
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  let eMessage = 'Something went wrong ';
  if (e instanceof Error) {
    eMessage += 'Error: ' + e.message;
  }
  console.log(eMessage);
}
