import { NewPatient, Gender } from './types';

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'ssn' in object &&
    'dateOfBirth' in object &&
    'occupation' in object &&
    'gender' in object
  ) {
    const checkedPatient: NewPatient = {
      name: parseString(object.name),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseString(object.occupation),
      gender: parseGender(object.gender),
    };
    return checkedPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseString = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error('Incorrect or missing name');
  }
  return string;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing social security number');
  }
  return ssn;
};

const isSsn = (ssn: string): boolean => {
  if (ssn.length === 11) {
    for (let i = 0; i < 10; i++) {
      if (i === 6) {
        if (ssn.charAt(i) !== '-') {
          return false;
        }
      } else {
        if (isNaN(parseInt(ssn.charAt(i))) || ssn.charAt(i) === ' ') {
          return false;
        }
      }
    }
  } else {
    return false;
  }
  return true;
};

export default {};
