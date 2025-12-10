import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Stethoscope, AlertCircle, CheckCircle, Phone, MapPin, Clock, Mail, Building } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TestCard } from '../components/results/TestCard';
import { patient, labCategories, getSummaryStats, getFlaggedTests } from '../data/mockLabResults';

// Mock provider data
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
  imageUrl: null, // Could add a placeholder image
};

export function DashboardPage() {
  const navigate = useNavigate();
  const stats = getSummaryStats();
  const flaggedTests = getFlaggedTests();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
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
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
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
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-primary">
                        {providerInfo.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
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
