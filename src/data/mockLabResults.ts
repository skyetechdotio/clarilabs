import type { LabResults, PatientProfile, LabCategory } from './types';

export const patient: PatientProfile = {
  id: 'PT-2024-001',
  name: 'Sarah Mitchell',
  dateOfBirth: '1985-03-15',
  testDate: '2024-12-08',
  orderingPhysician: 'Dr. James Chen',
  testReason: 'Annual Wellness Examination',
  labFacility: 'Quest Diagnostics',
};

export const labCategories: LabCategory[] = [
  {
    id: 'cbc',
    name: 'Complete Blood Count',
    shortName: 'CBC',
    tests: [
      {
        id: 'wbc',
        name: 'White Blood Cell Count',
        shortName: 'WBC',
        value: 7.2,
        unit: 'K/uL',
        referenceRange: { low: 4.5, high: 11.0, unit: 'K/uL' },
        status: 'normal',
        category: 'cbc',
        description: 'Measures the number of white blood cells, which fight infection.',
      },
      {
        id: 'rbc',
        name: 'Red Blood Cell Count',
        shortName: 'RBC',
        value: 4.8,
        unit: 'M/uL',
        referenceRange: { low: 4.0, high: 5.5, unit: 'M/uL' },
        status: 'normal',
        category: 'cbc',
        description: 'Measures the number of red blood cells, which carry oxygen.',
      },
      {
        id: 'hemoglobin',
        name: 'Hemoglobin',
        shortName: 'Hgb',
        value: 14.2,
        unit: 'g/dL',
        referenceRange: { low: 12.0, high: 16.0, unit: 'g/dL' },
        status: 'normal',
        category: 'cbc',
        description: 'The protein in red blood cells that carries oxygen.',
      },
      {
        id: 'hematocrit',
        name: 'Hematocrit',
        shortName: 'Hct',
        value: 42,
        unit: '%',
        referenceRange: { low: 36, high: 46, unit: '%' },
        status: 'normal',
        category: 'cbc',
        description: 'The percentage of blood volume made up of red blood cells.',
      },
      {
        id: 'mcv',
        name: 'Mean Corpuscular Volume',
        shortName: 'MCV',
        value: 88,
        unit: 'fL',
        referenceRange: { low: 80, high: 100, unit: 'fL' },
        status: 'normal',
        category: 'cbc',
        description: 'The average size of your red blood cells.',
      },
      {
        id: 'platelets',
        name: 'Platelet Count',
        shortName: 'PLT',
        value: 245,
        unit: 'K/uL',
        referenceRange: { low: 150, high: 400, unit: 'K/uL' },
        status: 'normal',
        category: 'cbc',
        description: 'Cells that help your blood clot.',
      },
    ],
  },
  {
    id: 'cmp',
    name: 'Comprehensive Metabolic Panel',
    shortName: 'CMP',
    tests: [
      {
        id: 'glucose',
        name: 'Glucose, Fasting',
        shortName: 'Glucose',
        value: 108,
        unit: 'mg/dL',
        referenceRange: { low: 70, high: 99, unit: 'mg/dL' },
        status: 'high',
        category: 'cmp',
        description: 'Measures blood sugar levels after fasting.',
        explanation: `Your fasting glucose is slightly above the normal range (70-99 mg/dL). At 108, this falls into the 'pre-diabetic' range (100-125 mg/dL). This single reading doesn't diagnose diabetes.

Since this was part of your annual wellness check, your doctor may recommend:
• Retesting in 3-6 months
• Dietary modifications (reducing refined carbs)
• Increased physical activity

**No immediate action needed**, but worth discussing at your follow-up.`,
      },
      {
        id: 'bun',
        name: 'Blood Urea Nitrogen',
        shortName: 'BUN',
        value: 22,
        unit: 'mg/dL',
        referenceRange: { low: 7, high: 20, unit: 'mg/dL' },
        status: 'high',
        category: 'cmp',
        description: 'Measures how well your kidneys are working.',
        explanation: `Your Blood Urea Nitrogen is slightly above normal (7-20 mg/dL). This often indicates mild dehydration, especially if tested in the morning. Other causes include high-protein diet or strenuous exercise before the test.

Your creatinine is normal, which is reassuring for kidney function.

**Consider**: Ensure adequate hydration before future tests.`,
      },
      {
        id: 'creatinine',
        name: 'Creatinine',
        shortName: 'Creat',
        value: 0.9,
        unit: 'mg/dL',
        referenceRange: { low: 0.6, high: 1.2, unit: 'mg/dL' },
        status: 'normal',
        category: 'cmp',
        description: 'Measures kidney function.',
      },
      {
        id: 'sodium',
        name: 'Sodium',
        shortName: 'Na',
        value: 140,
        unit: 'mEq/L',
        referenceRange: { low: 136, high: 145, unit: 'mEq/L' },
        status: 'normal',
        category: 'cmp',
        description: 'An electrolyte important for fluid balance.',
      },
      {
        id: 'potassium',
        name: 'Potassium',
        shortName: 'K',
        value: 4.2,
        unit: 'mEq/L',
        referenceRange: { low: 3.5, high: 5.0, unit: 'mEq/L' },
        status: 'normal',
        category: 'cmp',
        description: 'An electrolyte important for heart and muscle function.',
      },
      {
        id: 'co2',
        name: 'Carbon Dioxide',
        shortName: 'CO2',
        value: 24,
        unit: 'mEq/L',
        referenceRange: { low: 23, high: 29, unit: 'mEq/L' },
        status: 'normal',
        category: 'cmp',
        description: 'Measures the acid-base balance in your blood.',
      },
      {
        id: 'calcium',
        name: 'Calcium',
        shortName: 'Ca',
        value: 9.5,
        unit: 'mg/dL',
        referenceRange: { low: 8.5, high: 10.5, unit: 'mg/dL' },
        status: 'normal',
        category: 'cmp',
        description: 'Important for bones, muscles, and nerves.',
      },
      {
        id: 'alt',
        name: 'Alanine Aminotransferase',
        shortName: 'ALT',
        value: 28,
        unit: 'U/L',
        referenceRange: { low: 7, high: 56, unit: 'U/L' },
        status: 'normal',
        category: 'cmp',
        description: 'A liver enzyme that indicates liver health.',
      },
      {
        id: 'ast',
        name: 'Aspartate Aminotransferase',
        shortName: 'AST',
        value: 25,
        unit: 'U/L',
        referenceRange: { low: 10, high: 40, unit: 'U/L' },
        status: 'normal',
        category: 'cmp',
        description: 'An enzyme found in the liver and heart.',
      },
    ],
  },
  {
    id: 'lipid',
    name: 'Lipid Panel',
    shortName: 'Lipids',
    tests: [
      {
        id: 'cholesterol-total',
        name: 'Total Cholesterol',
        shortName: 'Chol',
        value: 218,
        unit: 'mg/dL',
        referenceRange: { high: 200, unit: 'mg/dL', optimalHigh: 180 },
        status: 'high',
        category: 'lipid',
        description: 'The total amount of cholesterol in your blood.',
        explanation: `Your cholesterol levels are elevated. Total cholesterol ideally should be under 200 mg/dL, and yours is 218.

These numbers suggest increased cardiovascular risk over time. The good news: your HDL is acceptable and triglycerides are normal.

**Your doctor will likely discuss**: Diet modifications, exercise, and possibly statin therapy depending on other risk factors.`,
      },
      {
        id: 'ldl',
        name: 'LDL Cholesterol',
        shortName: 'LDL',
        value: 142,
        unit: 'mg/dL',
        referenceRange: { high: 100, unit: 'mg/dL', optimalHigh: 70 },
        status: 'high',
        category: 'lipid',
        description: '"Bad" cholesterol that can build up in arteries.',
        explanation: `Your LDL ("bad") cholesterol is elevated at 142 mg/dL. The optimal level is under 100 mg/dL, with lower being better for heart health.

LDL is the primary focus for cardiovascular risk reduction. Elevated LDL over time can lead to plaque buildup in arteries.

**Typical recommendations include**:
• Heart-healthy diet (less saturated fat, more fiber)
• Regular exercise (150+ minutes per week)
• Weight management
• Medication if lifestyle changes aren't sufficient`,
      },
      {
        id: 'hdl',
        name: 'HDL Cholesterol',
        shortName: 'HDL',
        value: 48,
        unit: 'mg/dL',
        referenceRange: { low: 40, unit: 'mg/dL', optimalLow: 60 },
        status: 'normal',
        category: 'lipid',
        description: '"Good" cholesterol that helps remove bad cholesterol.',
      },
      {
        id: 'triglycerides',
        name: 'Triglycerides',
        shortName: 'Trig',
        value: 125,
        unit: 'mg/dL',
        referenceRange: { high: 150, unit: 'mg/dL', optimalHigh: 100 },
        status: 'normal',
        category: 'lipid',
        description: 'A type of fat in your blood.',
      },
    ],
  },
  {
    id: 'thyroid',
    name: 'Thyroid Panel',
    shortName: 'Thyroid',
    tests: [
      {
        id: 'tsh',
        name: 'Thyroid Stimulating Hormone',
        shortName: 'TSH',
        value: 4.8,
        unit: 'mIU/L',
        referenceRange: { low: 0.4, high: 4.0, unit: 'mIU/L' },
        status: 'high',
        category: 'thyroid',
        description: 'Controls thyroid hormone production.',
        explanation: `Your thyroid-stimulating hormone is slightly above the normal range (0.4-4.0 mIU/L). This can indicate your thyroid is working a bit harder than usual.

Since your Free T4 is normal, this may be 'subclinical hypothyroidism'—often monitored rather than treated immediately.

**Typical next steps**: Retest in 6-8 weeks to confirm the pattern. Symptoms like fatigue, weight changes, or feeling cold may be relevant to mention to your doctor.`,
      },
      {
        id: 'free-t4',
        name: 'Free T4',
        shortName: 'FT4',
        value: 1.2,
        unit: 'ng/dL',
        referenceRange: { low: 0.8, high: 1.8, unit: 'ng/dL' },
        status: 'normal',
        category: 'thyroid',
        description: 'The active form of thyroid hormone.',
      },
    ],
  },
  {
    id: 'vitamins',
    name: 'Vitamins & Nutrients',
    shortName: 'Vitamins',
    tests: [
      {
        id: 'vitamin-d',
        name: 'Vitamin D, 25-Hydroxy',
        shortName: 'Vit D',
        value: 22,
        unit: 'ng/mL',
        referenceRange: { low: 30, high: 100, unit: 'ng/mL', optimalLow: 40, optimalHigh: 60 },
        status: 'low',
        category: 'vitamins',
        description: 'Essential for bone health and immune function.',
        explanation: `Your Vitamin D level is below the optimal range (30-100 ng/mL). This is very common, especially in winter months or with limited sun exposure.

Low Vitamin D can affect bone health, mood, and immune function.

**Common recommendation**: Vitamin D3 supplementation (typically 1000-2000 IU daily). Your doctor can advise on the right dose for you.`,
      },
    ],
  },
];

// Historical data for trend charts
export const historicalData: Record<string, { date: string; value: number }[]> = {
  glucose: [
    { date: '2023-12-10', value: 102 },
    { date: '2024-06-15', value: 105 },
    { date: '2024-12-08', value: 108 },
  ],
  ldl: [
    { date: '2023-12-10', value: 155 },
    { date: '2024-06-15', value: 148 },
    { date: '2024-12-08', value: 142 },
  ],
  'cholesterol-total': [
    { date: '2023-12-10', value: 235 },
    { date: '2024-06-15', value: 225 },
    { date: '2024-12-08', value: 218 },
  ],
  tsh: [
    { date: '2023-12-10', value: 3.2 },
    { date: '2024-06-15', value: 4.1 },
    { date: '2024-12-08', value: 4.8 },
  ],
  'vitamin-d': [
    { date: '2023-12-10', value: 18 },
    { date: '2024-06-15', value: 25 },
    { date: '2024-12-08', value: 22 },
  ],
  bun: [
    { date: '2023-12-10', value: 18 },
    { date: '2024-06-15', value: 19 },
    { date: '2024-12-08', value: 22 },
  ],
};

export const labResults: LabResults = {
  patient,
  collectionDate: '2024-12-08',
  reportDate: '2024-12-09',
  categories: labCategories,
};

// Helper functions
export function getAllTests() {
  return labCategories.flatMap((cat) => cat.tests);
}

export function getTestById(id: string) {
  return getAllTests().find((test) => test.id === id);
}

export function getFlaggedTests() {
  return getAllTests().filter((test) => test.status !== 'normal');
}

export function getTestsByCategory(categoryId: string) {
  const category = labCategories.find((cat) => cat.id === categoryId);
  return category?.tests || [];
}

export function getTestHistory(testId: string) {
  return historicalData[testId] || [];
}

export function getSummaryStats() {
  const allTests = getAllTests();
  const total = allTests.length;
  const normal = allTests.filter((t) => t.status === 'normal').length;
  const flagged = total - normal;

  return {
    total,
    normal,
    flagged,
    percentNormal: Math.round((normal / total) * 100),
  };
}
