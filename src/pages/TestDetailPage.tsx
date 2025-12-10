import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, TrendingUp, TrendingDown, Minus, Info, Phone, Share2, Globe, ChevronDown, Sparkles, Mail, MessageCircle, Users } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/Badge';
import { DetailedRangeChart } from '../components/results/RangeIndicator';
import { getTestById, getTestHistory, labCategories } from '../data/mockLabResults';

// Language options for translation
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export function TestDetailPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [isTranslating, setIsTranslating] = useState(false);

  const test = getTestById(testId || '');
  const history = getTestHistory(testId || '');

  const handleShare = (method: string) => {
    setShowShareMenu(false);
    alert(`Sharing ${test?.name} result via ${method}...`);
  };

  const handleLanguageChange = (language: typeof languages[0]) => {
    setShowLanguageMenu(false);
    if (language.code !== currentLanguage.code) {
      setIsTranslating(true);
      setTimeout(() => {
        setCurrentLanguage(language);
        setIsTranslating(false);
      }, 1500);
    }
  };

  if (!test) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBack title="Test Not Found" />
        <PageContainer>
          <Card>
            <p className="text-text-secondary">Test not found. Please go back and try again.</p>
          </Card>
        </PageContainer>
      </div>
    );
  }

  const { name, shortName, value, unit, referenceRange, status, description, explanation, category } = test;

  // Find related tests in the same category
  const categoryData = labCategories.find((c) => c.id === category);
  const relatedTests = categoryData?.tests.filter((t) => t.id !== testId).slice(0, 3) || [];

  // Calculate trend from history
  const getTrend = () => {
    if (history.length < 2) return null;
    const latest = history[history.length - 1].value;
    const previous = history[history.length - 2].value;
    const diff = latest - previous;
    const percentChange = ((diff / previous) * 100).toFixed(1);

    if (Math.abs(diff) < 0.5) return { direction: 'stable', change: '0%' };
    return {
      direction: diff > 0 ? 'up' : 'down',
      change: `${diff > 0 ? '+' : ''}${percentChange}%`,
    };
  };

  const trend = getTrend();

  const getStatusIcon = () => {
    if (status === 'normal') return <CheckCircle className="w-6 h-6 text-success" />;
    return <AlertCircle className="w-6 h-6 text-warning" />;
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.direction === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend.direction === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  // Determine if the trend is positive or negative based on what the test measures
  const isTrendPositive = () => {
    if (!trend) return null;
    // For most tests, going towards normal range is positive
    if (status === 'high' && trend.direction === 'down') return true;
    if (status === 'low' && trend.direction === 'up') return true;
    if (status === 'normal') return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBack title={shortName} />

      <PageContainer>
        {/* Main Value Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">{name}</h1>
                <p className="text-text-secondary mt-1">{description}</p>
              </div>
              {getStatusIcon()}
            </div>

            {/* Value Display */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-bold text-text-primary">{value}</span>
              <span className="text-xl text-text-secondary">{unit}</span>
              <StatusBadge status={status} className="ml-2" />
            </div>

            {/* Trend Badge */}
            {trend && (
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium mb-6 ${
                  isTrendPositive()
                    ? 'bg-success/10 text-success'
                    : 'bg-warning/10 text-warning'
                }`}
              >
                {getTrendIcon()}
                <span>{trend.change} from last test</span>
              </div>
            )}

            {/* Range Chart */}
            <DetailedRangeChart
              value={value}
              referenceRange={referenceRange}
              status={status}
              history={history}
            />
          </Card>
        </motion.div>

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
                <p className="text-text-primary font-medium">AI is translating...</p>
                <p className="text-sm text-text-secondary">This may take a moment</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explanation Section */}
        {explanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="mb-6 bg-primary/5 border border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    <CardTitle>What This Means for You</CardTitle>
                  </div>

                  {/* Translate & Share buttons */}
                  <div className="flex items-center gap-2">
                    {/* Language Selector */}
                    <div className="relative">
                      <button
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <Globe className="w-3.5 h-3.5 text-text-secondary" />
                        <span className="font-medium">{currentLanguage.flag}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                      </button>

                      <AnimatePresence>
                        {showLanguageMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-20"
                          >
                            <div className="px-3 py-2 border-b border-neutral-100">
                              <div className="flex items-center gap-2 text-xs text-text-muted">
                                <Sparkles className="w-3 h-3 text-primary" />
                                <span>AI Translation</span>
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
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="font-medium">Share</span>
                      </button>

                      <AnimatePresence>
                        {showShareMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-20"
                          >
                            <div className="px-3 py-2 border-b border-neutral-100">
                              <p className="text-xs text-text-muted">Share with family</p>
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {explanation.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-text-secondary mb-4 last:mb-0 whitespace-pre-line">
                      {paragraph.split('**').map((part, i) =>
                        i % 2 === 1 ? (
                          <strong key={i} className="text-text-primary font-semibold">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Reference Range Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Reference Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {referenceRange.low !== undefined && (
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-text-muted">Lower Limit</p>
                    <p className="text-lg font-semibold text-text-primary">
                      {referenceRange.low} {unit}
                    </p>
                  </div>
                )}
                {referenceRange.high !== undefined && (
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-text-muted">Upper Limit</p>
                    <p className="text-lg font-semibold text-text-primary">
                      {referenceRange.high} {unit}
                    </p>
                  </div>
                )}
                {referenceRange.optimalLow !== undefined && (
                  <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                    <p className="text-sm text-text-muted">Optimal Low</p>
                    <p className="text-lg font-semibold text-success">
                      {referenceRange.optimalLow} {unit}
                    </p>
                  </div>
                )}
                {referenceRange.optimalHigh !== undefined && (
                  <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                    <p className="text-sm text-text-muted">Optimal High</p>
                    <p className="text-lg font-semibold text-success">
                      {referenceRange.optimalHigh} {unit}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* History Section */}
        {history.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {history
                    .slice()
                    .reverse()
                    .map((entry, index) => {
                      const isLatest = index === 0;
                      const entryStatus =
                        entry.value < (referenceRange.low ?? 0)
                          ? 'low'
                          : entry.value > (referenceRange.high ?? Infinity)
                          ? 'high'
                          : 'normal';

                      return (
                        <div
                          key={entry.date}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            isLatest ? 'bg-primary/5 border border-primary/20' : 'bg-neutral-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                entryStatus === 'normal' ? 'bg-success' : 'bg-warning'
                              }`}
                            />
                            <span className="text-text-secondary">
                              {new Date(entry.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            {isLatest && (
                              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                Latest
                              </span>
                            )}
                          </div>
                          <span className="font-semibold text-text-primary">
                            {entry.value} {unit}
                          </span>
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={() => navigate('/history')}
                  className="w-full mt-4 py-2 text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
                >
                  View Full History
                </button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Related Tests */}
        {relatedTests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Related Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relatedTests.map((relatedTest) => (
                    <div
                      key={relatedTest.id}
                      className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
                      onClick={() => navigate(`/results/${relatedTest.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            relatedTest.status === 'normal' ? 'bg-success' : 'bg-warning'
                          }`}
                        />
                        <span className="text-text-primary">{relatedTest.name}</span>
                      </div>
                      <span className="text-text-secondary">
                        {relatedTest.value} {relatedTest.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Contact CTA for abnormal results */}
        {status !== 'normal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card className="mb-6 bg-warning/5 border border-warning/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Discuss This Result</h3>
                  <p className="text-text-secondary text-sm">
                    Your doctor can help explain this result and determine if any action is needed.
                  </p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Contact Provider</span>
                </button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Confidence & Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pb-8"
        >
          <p className="text-sm text-text-muted mb-2">
            Based on standard medical guidelines
          </p>
          <p className="text-xs text-text-muted">
            This information is for educational purposes only and does not constitute medical advice.
            Always consult your healthcare provider for diagnosis and treatment decisions.
          </p>
        </motion.div>
      </PageContainer>
    </div>
  );
}
