import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ListChecks, Shield, CheckCircle } from 'lucide-react';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useLanguage } from '../context/LanguageContext';

interface LoadingPageProps {
  onComplete?: () => void;
  targetPath?: string;
}

export function LoadingPage({ onComplete, targetPath = '/results' }: LoadingPageProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    {
      icon: Heart,
      message: t('loading.step1.title'),
      subMessage: t('loading.step1.subtitle'),
      duration: 2000
    },
    {
      icon: Sparkles,
      message: t('loading.step2.title'),
      subMessage: t('loading.step2.subtitle'),
      duration: 2200
    },
    {
      icon: ListChecks,
      message: t('loading.step3.title'),
      subMessage: t('loading.step3.subtitle'),
      duration: 2000
    },
    {
      icon: Shield,
      message: t('loading.step4.title'),
      subMessage: t('loading.step4.subtitle'),
      duration: 1800
    },
    {
      icon: CheckCircle,
      message: t('loading.step5.title'),
      subMessage: t('loading.step5.subtitle'),
      duration: 1000
    },
  ];

  useEffect(() => {
    let stepTimeout: ReturnType<typeof setTimeout>;
    let progressInterval: ReturnType<typeof setInterval>;

    const totalDuration = loadingSteps.reduce((acc, step) => acc + step.duration, 0);
    const progressIncrement = 100 / (totalDuration / 50);

    // Progress bar animation
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + progressIncrement;
      });
    }, 50);

    // Step through loading messages
    const runSteps = async () => {
      for (let i = 0; i < loadingSteps.length; i++) {
        setCurrentStep(i);
        await new Promise((resolve) => {
          stepTimeout = setTimeout(resolve, loadingSteps[i].duration);
        });
      }
      // Complete loading after all steps
      setTimeout(() => {
        // Navigate first, then call onComplete to avoid race condition
        navigate(targetPath, { replace: true });
        if (onComplete) {
          onComplete();
        }
      }, 400);
    };

    runSteps();

    return () => {
      clearTimeout(stepTimeout);
      clearInterval(progressInterval);
    };
  }, [navigate, onComplete, targetPath]);

  const CurrentIcon = loadingSteps[currentStep]?.icon || CheckCircle;
  const currentStepData = loadingSteps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 relative">
      {/* Logo - Small, subtle, top-left corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-6 left-6"
      >
        <img
          src="/logo.png"
          alt="ClariLabs"
          className="h-8 opacity-60"
        />
      </motion.div>

      {/* Main Content - The Journey (centered, hero focus) */}
      <div className="w-full max-w-md">
        {/* Animated Icon - Large and prominent */}
        <div className="flex justify-center mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-28 h-28 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center shadow-lg"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <CurrentIcon className="w-14 h-14 text-primary" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Status Messages - The main focus */}
        <div className="text-center mb-10 min-h-[100px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-2xl font-semibold text-text-primary mb-3">
                {currentStepData?.message}
              </p>
              <p className="text-lg text-text-secondary">
                {currentStepData?.subMessage}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={progress} className="mb-6" />

        {/* Step Indicators */}
        <div className="flex justify-center gap-3 mt-6">
          {loadingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index <= currentStep ? 'bg-primary w-8' : 'bg-neutral-300 w-3'
              }`}
              animate={index === currentStep ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* Reassuring Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-sm text-text-muted">
          {t('loading.secure')}
        </p>
      </motion.div>
    </div>
  );
}
