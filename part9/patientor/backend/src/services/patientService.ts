import { v1 as uuid } from 'uuid';

import patients from '../data/patients';

import { NonSensitivePatient, Patient, NewPatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientToAdd: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientToAdd,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
