import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.send({ height: height, weight: weight, bmi: bmi });
  } else {
    res.send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  const daily_exercises = req.body.daily_exercises as number[];
  console.log(daily_exercises);
  const target = req.body.target as number;
  if (daily_exercises === undefined || target === undefined) {
    res.send({ error: 'parameters missing' });
  } else if (isNaN(target)) {
    res.send({ error: 'malformatted parameters' });
  } else {
    const exercises = calculateExercises(daily_exercises, target);
    res.json(exercises);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
