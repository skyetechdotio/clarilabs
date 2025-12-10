import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Stethoscope, AlertCircle, CheckCircle, Phone, MapPin, Clock, Mail, Building, Share2, MessageCircle, Users, Globe, ChevronDown, Sparkles } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TestCard } from '../components/results/TestCard';
import { patient, labCategories, getSummaryStats, getFlaggedTests } from '../data/mockLabResults';

// Mock provider data with image URL
const providerInfo = {
  name: 'Dr. James Chen',
  title: 'Internal Medicine',
  practice: 'Sunrise Medical Group',
  address: '450 Sutter Street, Suite 840',
  city: 'San Francisco, CA 94108',
  phone: '(415) 555-0123',
  email: 'dr.chen@sunrisemedical.com',
  hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
  nextAvailable: 'Tomorrow at 2:30 PM',
  imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
};

// Language options for translation
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const stats = getSummaryStats();
  const flaggedTests = getFlaggedTests();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [isTranslating, setIsTranslating] = useState(false);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = (method: string) => {
    setShowShareMenu(false);
    // Simulate share action
    alert(`Sharing results via ${method}...`);
  };

  const handleLanguageChange = (language: typeof languages[0]) => {
    setShowLanguageMenu(false);
    if (language.code !== currentLanguage.code) {
      setIsTranslating(true);
      // Simulate AI translation
      setTimeout(() => {
        setCurrentLanguage(language);
        setIsTranslating(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Translation Loading Overlay */}
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
              <p className="text-text-primary font-medium">AI is translating your results...</p>
              <p className="text-sm text-text-secondary">This may take a moment</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Action Bar */}
        <div className="flex items-center justify-end gap-3 mb-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <Globe className="w-4 h-4 text-text-secondary" />
              <span className="text-sm font-medium">{currentLanguage.flag} {currentLanguage.name}</span>
              <ChevronDown className="w-4 h-4 text-text-muted" />
            </button>

            <AnimatePresence>
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-20"
                >
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span>AI-Powered Translation</span>
                    </div>
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2 ${
                        currentLanguage.code === lang.code ? 'bg-primary/5 text-primary' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                      {currentLanguage.code === lang.code && (
                        <CheckCircle className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Share Button */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share Results</span>
            </button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-20"
                >
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <p className="text-xs text-text-muted">Share with family or caregivers</p>
                  </div>
                  <button
                    onClick={() => handleShare('Email')}
                    className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-3"
                  >
                    <Mail className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm">Send via Email</span>
                  </button>
                  <button
                    onClick={() => handleShare('Text Message')}
                    className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-3"
                  >
                    <MessageCircle className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm">Send via Text</span>
                  </button>
                  <button
                    onClick={() => handleShare('Family Portal')}
                    className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-3"
                  >
                    <Users className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm">Add to Family Portal</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Patient Info Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-semibold text-text-primary mb-1">
                      Hello, {patient.name.split(' ')[0]}
                    </h1>
                    <p className="text-text-secondary">
                      Your lab results are ready for review
                    </p>
                  </div>
                  <Badge variant="success" size="md">
                    Report Complete
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Test Date</p>
                      <p className="font-medium text-text-primary">{formatDate(patient.testDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={providerInfo.imageUrl}
                      alt={providerInfo.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm text-text-muted">Ordered By</p>
                      <p className="font-medium text-text-primary">{patient.orderingPhysician}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Reason</p>
                      <p className="font-medium text-text-primary">{patient.testReason}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              <Card className="bg-success/5 border border-success/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-success">{stats.normal}</p>
                    <p className="text-text-secondary">Tests in normal range</p>
                  </div>
                </div>
              </Card>

              <Card className={`${flaggedTests.length > 0 ? 'bg-warning/5 border border-warning/20' : 'bg-neutral-100'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${flaggedTests.length > 0 ? 'bg-warning/20' : 'bg-neutral-200'}`}>
                    <AlertCircle className={`w-6 h-6 ${flaggedTests.length > 0 ? 'text-warning' : 'text-text-muted'}`} />
                  </div>
                  <div>
                    <p className={`text-3xl font-bold ${flaggedTests.length > 0 ? 'text-warning' : 'text-text-muted'}`}>
                      {stats.flagged}
                    </p>
                    <p className="text-text-secondary">Tests to review with your doctor</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Flagged Tests Section */}
            {flaggedTests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <h2 className="text-lg font-semibold text-text-primary">Items to Discuss</h2>
                </div>
                <p className="text-text-secondary mb-4">
                  These results are outside the normal range. Tap each one to learn more about what it means.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flaggedTests.map((test) => (
                    <TestCard
                      key={test.id}
                      test={test}
                      onClick={() => navigate(`/results/${test.id}`)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* All Results by Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-text-primary mb-4">All Results</h2>

              {labCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + categoryIndex * 0.1 }}
                  className="mb-6"
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{category.name}</CardTitle>
                        <Badge variant="default">{category.shortName}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.tests.map((test) => {
                          // Format range display based on what bounds exist
                          const formatRange = () => {
                            const { low, high } = test.referenceRange;
                            if (low !== undefined && high !== undefined) {
                              return `${low}-${high}`;
                            } else if (high !== undefined) {
                              return `<${high}`;
                            } else if (low !== undefined) {
                              return `>${low}`;
                            }
                            return '';
                          };

                          return (
                            <div
                              key={test.id}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 px-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors gap-2"
                              onClick={() => navigate(`/results/${test.id}`)}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                    test.status === 'normal'
                                      ? 'bg-success'
                                      : test.status === 'critical'
                                      ? 'bg-danger'
                                      : 'bg-warning'
                                  }`}
                                />
                                <span className="font-medium text-text-primary">{test.name}</span>
                              </div>
                              <div className="flex items-center gap-4 pl-5 sm:pl-0">
                                <span className="text-text-secondary font-medium">
                                  {test.value} {test.unit}
                                </span>
                                <span className="text-text-muted text-sm">
                                  ({formatRange()})
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-text-muted text-center pb-8"
            >
              This information is for educational purposes only and is not a substitute for professional
              medical advice. Always consult your healthcare provider with any questions about your results.
            </motion.p>
          </main>

          {/* Provider Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Your Care Provider</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Provider Avatar & Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={providerInfo.imageUrl}
                      alt={providerInfo.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-text-primary">{providerInfo.name}</h3>
                      <p className="text-sm text-text-secondary">{providerInfo.title}</p>
                    </div>
                  </div>

                  {/* Practice Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 text-text-muted mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{providerInfo.practice}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-text-muted mt-0.5" />
                      <div>
                        <p className="text-sm text-text-secondary">{providerInfo.address}</p>
                        <p className="text-sm text-text-secondary">{providerInfo.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-text-muted" />
                      <p className="text-sm text-text-secondary">{providerInfo.hours}</p>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="space-y-2">
                    <a
                      href={`tel:${providerInfo.phone}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{providerInfo.phone}</span>
                    </a>

                    <a
                      href={`mailto:${providerInfo.email}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-neutral-100 text-text-primary rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">Send Message</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Next Appointment Card */}
              <Card className="bg-primary/5 border border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Next Available</p>
                      <p className="font-medium text-text-primary">{providerInfo.nextAvailable}</p>
                    </div>
                  </div>
                  <button className="w-full py-2.5 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium">
                    Schedule Follow-up
                  </button>
                </CardContent>
              </Card>

              {/* Questions CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-neutral-100 rounded-lg"
              >
                <p className="text-sm text-text-secondary text-center">
                  Have questions about your results? Your care team is here to help.
                </p>
              </motion.div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
