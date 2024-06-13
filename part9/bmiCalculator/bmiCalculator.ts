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

console.log(calculateBmi(175, 55));
