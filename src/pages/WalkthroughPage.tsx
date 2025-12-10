import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, SkipForward } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFlaggedTests, patient } from '../data/mockLabResults';
import { RangeIndicator } from '../components/results/RangeIndicator';
import { useLanguage } from '../context/LanguageContext';

// Narrative explanations for each flagged test - conversational tone
const narrativeExplanations: Record<string, { headline: string; body: string; reassurance: string }> = {
  glucose: {
    headline: "Your blood sugar is slightly elevated",
    body: "Your fasting glucose came in at 108 mg/dL. The normal range is under 100, so you're just a bit above that threshold. This puts you in what doctors call the 'pre-diabetic' range (100-125 mg/dL).",
    reassurance: "This doesn't mean you have diabetes. It's a signal that your body might benefit from some lifestyle adjustments like reducing refined carbs and staying active. Your doctor will likely want to recheck this in a few months."
  },
  bun: {
    headline: "Your kidney marker is slightly high",
    body: "Your BUN (Blood Urea Nitrogen) is 22 mg/dL, just above the normal range of 7-20. BUN measures how well your kidneys filter waste from your blood.",
    reassurance: "A slightly elevated BUN is very common and often just means you were a bit dehydrated before your test, or you've been eating more protein lately. Your creatinine is normal, which is a good sign that your kidneys are working well."
  },
  cholesterol_total: {
    headline: "Your total cholesterol is above target",
    body: "Your total cholesterol is 218 mg/dL. Ideally, we like to see this number under 200. Cholesterol is a waxy substance your body needs, but too much can build up in your arteries over time.",
    reassurance: "The good news is that cholesterol responds well to lifestyle changes. Diet, exercise, and sometimes medication can help bring this number down. Let's look at your LDL next - that's the one that matters most."
  },
  ldl: {
    headline: "Your LDL cholesterol needs attention",
    body: "Your LDL (the 'bad' cholesterol) is 142 mg/dL. The target is under 100 mg/dL. LDL is the type that can accumulate in artery walls and contribute to heart disease over time.",
    reassurance: "This is something to discuss with Dr. Chen. Depending on your other risk factors, they might recommend dietary changes, more exercise, or possibly a statin medication. Many people successfully lower their LDL with simple changes."
  },
  tsh: {
    headline: "Your thyroid is working a bit harder",
    body: "Your TSH (Thyroid Stimulating Hormone) is 4.8 mIU/L, slightly above the normal range of 0.4-4.0. TSH tells us how hard your brain is asking your thyroid to work.",
    reassurance: "A slightly elevated TSH can indicate your thyroid is a bit sluggish - called 'subclinical hypothyroidism.' Your Free T4 is normal, which is reassuring. Your doctor may want to recheck this in 6-8 weeks before deciding on any treatment."
  },
  vitamin_d: {
    headline: "Your Vitamin D is on the low side",
    body: "Your Vitamin D level is 22 ng/mL. The optimal range is 30-100 ng/mL. Vitamin D is important for bone health, immune function, and even mood.",
    reassurance: "Low Vitamin D is extremely common, especially if you spend most of your time indoors or live in a less sunny climate. A simple over-the-counter supplement (usually 1000-2000 IU daily) can bring your levels up. This is an easy fix!"
  }
};

export function WalkthroughPage() {
  const navigate = useNavigate();
  const { tTestName } = useLanguage();
  const flaggedTests = getFlaggedTests();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTest = flaggedTests[currentIndex];
  const narrative = narrativeExplanations[currentTest?.id] || {
    headline: "Let's review this result",
    body: `Your ${currentTest?.name} is ${currentTest?.value} ${currentTest?.unit}.`,
    reassurance: "Your doctor can explain what this means for you specifically."
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === flaggedTests.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate('/results');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-neutral-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ClariLabs" className="h-8" />
          </div>
          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <span>Skip to dashboard</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Progress indicator */}
      <div className="bg-surface border-b border-neutral-100 px-6 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">
              Reviewing item {currentIndex + 1} of {flaggedTests.length}
            </span>
            <span className="text-sm text-text-muted">
              {patient.testDate}
            </span>
          </div>
          <div className="flex gap-1.5">
            {flaggedTests.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  index < currentIndex
                    ? 'bg-success'
                    : index === currentIndex
                    ? 'bg-primary'
                    : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Status icon */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentTest?.status === 'critical' ? 'bg-danger/10' : 'bg-warning/10'
                }`}>
                  <AlertCircle className={`w-5 h-5 ${
                    currentTest?.status === 'critical' ? 'text-danger' : 'text-warning'
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-text-muted">{currentTest?.shortName}</p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-2xl font-semibold text-text-primary mb-6">
                {narrative.headline}
              </h1>

              {/* Value card */}
              <div className="bg-surface rounded-xl border border-neutral-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-medium text-text-primary">
                      {tTestName(currentTest?.id, currentTest?.name)}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-semibold text-text-primary">
                      {currentTest?.value}
                    </span>
                    <span className="text-lg text-text-secondary ml-1">
                      {currentTest?.unit}
                    </span>
                  </div>
                </div>

                <RangeIndicator
                  value={currentTest?.value}
                  referenceRange={currentTest?.referenceRange}
                  status={currentTest?.status}
                  showLabels={true}
                  compact={false}
                />
              </div>

              {/* Explanation */}
              <div className="space-y-4 mb-8">
                <p className="text-text-primary leading-relaxed">
                  {narrative.body}
                </p>
                <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-text-secondary leading-relaxed">
                      {narrative.reassurance}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation footer */}
      <footer className="bg-surface border-t border-neutral-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={isFirst}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
              isFirst
                ? 'text-text-muted cursor-not-allowed'
                : 'text-text-secondary hover:bg-neutral-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            <span>{isLast ? 'View Full Results' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
