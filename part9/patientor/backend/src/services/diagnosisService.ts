import diagnosisData from '../data/diagnoses';

import { Diagnosis } from '../components/Diagnosis';

const diagnoses: Diagnosis[] = diagnosisData;

const getDiagnoses = () => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
