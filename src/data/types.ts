export type TestStatus = 'normal' | 'low' | 'high' | 'critical';

export interface PatientProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  testDate: string;
  orderingPhysician: string;
  testReason: string;
  labFacility: string;
}

export interface ReferenceRange {
  low?: number;
  high?: number;
  unit: string;
  optimalLow?: number;
  optimalHigh?: number;
}

export interface LabTest {
  id: string;
  name: string;
  shortName: string;
  value: number;
  unit: string;
  referenceRange: ReferenceRange;
  status: TestStatus;
  category: string;
  description: string;
  explanation?: string;
}

export interface LabCategory {
  id: string;
  name: string;
  shortName: string;
  tests: LabTest[];
}

export interface HistoricalResult {
  date: string;
  value: number;
}

export interface LabTestWithHistory extends LabTest {
  history: HistoricalResult[];
}

export interface LabResults {
  patient: PatientProfile;
  collectionDate: string;
  reportDate: string;
  categories: LabCategory[];
}
