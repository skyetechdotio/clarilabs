import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoadingPage } from './pages/LoadingPage';
import { WalkthroughPage } from './pages/WalkthroughPage';
import { DashboardPage } from './pages/DashboardPage';
import { TestDetailPage } from './pages/TestDetailPage';
import { HistoryPage } from './pages/HistoryPage';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingPage onComplete={handleLoadingComplete} targetPath="/walkthrough" />;
  }

  return (
    <Routes>
      <Route path="/walkthrough" element={<WalkthroughPage />} />
      <Route path="/results" element={<DashboardPage />} />
      <Route path="/results/:testId" element={<TestDetailPage />} />
      <Route path="/history" element={<HistoryPage />} />
      {/* Default to walkthrough after loading completes */}
      <Route path="*" element={<Navigate to="/walkthrough" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
