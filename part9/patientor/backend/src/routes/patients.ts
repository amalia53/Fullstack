import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
  });
  res.json(addedPatient);
});

export default router;
