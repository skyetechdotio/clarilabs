import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, Calendar, ChevronRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { historicalData, getTestById } from '../data/mockLabResults';

const testDates = [
  { date: '2024-12-08', label: 'December 8, 2024', isCurrent: true },
  { date: '2024-06-15', label: 'June 15, 2024', isCurrent: false },
  { date: '2023-12-10', label: 'December 10, 2023', isCurrent: false },
];

// Tests with history to show trends
const trackedTests = ['glucose', 'ldl', 'cholesterol-total', 'tsh', 'vitamin-d', 'bun'];

export function HistoryPage() {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<string>('glucose');

  const testsWithHistory = trackedTests
    .map((id) => {
      const test = getTestById(id);
      const history = historicalData[id];
      if (!test || !history) return null;
      return { test, history };
    })
    .filter(Boolean) as { test: ReturnType<typeof getTestById>; history: typeof historicalData.glucose }[];

  const selectedTestData = testsWithHistory.find((t) => t.test?.id === selectedTest);

  // Format chart data
  const chartData = selectedTestData?.history.map((h) => ({
    date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    value: h.value,
    fullDate: h.date,
  })) || [];

  // Get reference range for selected test
  const refRange = selectedTestData?.test?.referenceRange;

  // Calculate trend
  const calculateTrend = (history: typeof historicalData.glucose) => {
    if (history.length < 2) return null;
    const latest = history[history.length - 1].value;
    const previous = history[history.length - 2].value;
    const diff = latest - previous;
    const percentChange = ((diff / previous) * 100).toFixed(1);

    if (Math.abs(diff) < 0.5) return { direction: 'stable' as const, change: '0%', diff: 0 };
    return {
      direction: diff > 0 ? ('up' as const) : ('down' as const),
      change: `${diff > 0 ? '+' : ''}${percentChange}%`,
      diff,
    };
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    if (direction === 'up') return <TrendingUp className="w-4 h-4" />;
    if (direction === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  // Determine if trend is positive based on test
  const isTrendPositive = (testId: string, direction: 'up' | 'down' | 'stable') => {
    const test = getTestById(testId);
    if (!test) return null;
    if (direction === 'stable') return true;

    // For tests where lower is better
    if (['glucose', 'ldl', 'cholesterol-total', 'tsh', 'bun'].includes(testId)) {
      return direction === 'down';
    }
    // For tests where higher is better
    if (['vitamin-d', 'hdl'].includes(testId)) {
      return direction === 'up';
    }
    return null;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 rounded-lg shadow-lg border border-neutral-200">
          <p className="text-sm text-text-muted mb-1">{label}</p>
          <p className="text-lg font-semibold text-text-primary">
            {payload[0].value} {selectedTestData?.test?.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBack title="Lab History" />

      <PageContainer>
        {/* Timeline Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <CardTitle>Test History</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {testDates.map((dateItem) => (
                  <div
                    key={dateItem.date}
                    className={`flex-shrink-0 px-4 py-3 rounded-lg border transition-colors ${
                      dateItem.isCurrent
                        ? 'bg-primary/10 border-primary/30 text-primary'
                        : 'bg-neutral-50 border-neutral-200 text-text-secondary hover:bg-neutral-100'
                    }`}
                  >
                    <p className="font-medium whitespace-nowrap">{dateItem.label}</p>
                    {dateItem.isCurrent && (
                      <p className="text-xs mt-0.5">Current</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Test Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold text-text-primary mb-3">Select a Test to View Trends</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {testsWithHistory.map(({ test, history }) => {
              if (!test) return null;
              const trend = calculateTrend(history);
              const isPositive = trend ? isTrendPositive(test.id, trend.direction) : null;

              return (
                <div
                  key={test.id}
                  onClick={() => setSelectedTest(test.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTest === test.id
                      ? 'bg-primary/10 border-primary/30 shadow-sm'
                      : 'bg-surface border-neutral-200 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-primary">{test.shortName}</span>
                    {trend && (
                      <span
                        className={`flex items-center gap-1 text-xs font-medium ${
                          isPositive === true
                            ? 'text-success'
                            : isPositive === false
                            ? 'text-warning'
                            : 'text-text-muted'
                        }`}
                      >
                        {getTrendIcon(trend.direction)}
                        {trend.change}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted truncate">{test.name}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Trend Chart */}
        {selectedTestData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            key={selectedTest}
          >
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedTestData.test?.name}</CardTitle>
                    <p className="text-sm text-text-muted mt-1">
                      {selectedTestData.test?.description}
                    </p>
                  </div>
                  <Badge
                    variant={selectedTestData.test?.status === 'normal' ? 'success' : 'warning'}
                  >
                    {selectedTestData.test?.status === 'normal' ? 'In Range' : 'Review'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Current Value */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-text-primary">
                    {selectedTestData.test?.value}
                  </span>
                  <span className="text-lg text-text-secondary">
                    {selectedTestData.test?.unit}
                  </span>
                  {(() => {
                    const trend = calculateTrend(selectedTestData.history);
                    if (!trend) return null;
                    const isPositive = isTrendPositive(selectedTest, trend.direction);

                    return (
                      <span
                        className={`flex items-center gap-1 ml-3 px-2 py-1 rounded-full text-sm font-medium ${
                          isPositive === true
                            ? 'bg-success/10 text-success'
                            : isPositive === false
                            ? 'bg-warning/10 text-warning'
                            : 'bg-neutral-100 text-text-muted'
                        }`}
                      >
                        {getTrendIcon(trend.direction)}
                        {trend.change} since last test
                      </span>
                    );
                  })()}
                </div>

                {/* Chart */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DF" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: '#6C675C', fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#E8E4DF' }}
                      />
                      <YAxis
                        tick={{ fill: '#6C675C', fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#E8E4DF' }}
                        domain={['auto', 'auto']}
                      />
                      <Tooltip content={<CustomTooltip />} />

                      {/* Reference lines for normal range */}
                      {refRange?.low !== undefined && (
                        <ReferenceLine
                          y={refRange.low}
                          stroke="#4ECDC4"
                          strokeDasharray="5 5"
                          label={{ value: 'Low', fill: '#4ECDC4', fontSize: 11 }}
                        />
                      )}
                      {refRange?.high !== undefined && (
                        <ReferenceLine
                          y={refRange.high}
                          stroke="#4ECDC4"
                          strokeDasharray="5 5"
                          label={{ value: 'High', fill: '#4ECDC4', fontSize: 11 }}
                        />
                      )}

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="transparent"
                        fill="url(#colorValue)"
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4ECDC4"
                        strokeWidth={3}
                        dot={{ fill: '#4ECDC4', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: '#4ECDC4' }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* View Details Link */}
                <button
                  onClick={() => navigate(`/results/${selectedTest}`)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
                >
                  View Full Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testsWithHistory.map(({ test, history }) => {
                  if (!test) return null;
                  const trend = calculateTrend(history);
                  if (!trend || trend.direction === 'stable') return null;

                  const isPositive = isTrendPositive(test.id, trend.direction);
                  const firstValue = history[0].value;
                  const lastValue = history[history.length - 1].value;
                  const totalChange = (((lastValue - firstValue) / firstValue) * 100).toFixed(1);

                  return (
                    <div
                      key={test.id}
                      className={`p-4 rounded-lg ${
                        isPositive ? 'bg-success/5 border border-success/20' : 'bg-warning/5 border border-warning/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-text-primary">{test.name}</p>
                          <p className="text-sm text-text-secondary mt-1">
                            {isPositive
                              ? `Your ${test.shortName} has ${trend.direction === 'down' ? 'decreased' : 'increased'} ${Math.abs(Number(totalChange))}% since Dec 2023`
                              : `Your ${test.shortName} has ${trend.direction === 'up' ? 'increased' : 'decreased'} ${Math.abs(Number(totalChange))}% since Dec 2023`}
                          </p>
                        </div>
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                            isPositive
                              ? 'bg-success/20 text-success'
                              : 'bg-warning/20 text-warning'
                          }`}
                        >
                          {getTrendIcon(trend.direction)}
                          {isPositive ? 'Improving' : 'Review'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-text-muted text-center pb-8"
        >
          Historical trends are for reference only. Individual results should be interpreted
          by your healthcare provider in the context of your overall health.
        </motion.p>
      </PageContainer>
    </div>
  );
}
