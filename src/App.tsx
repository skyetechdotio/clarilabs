import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LoadingPage } from './pages/LoadingPage';
import { WalkthroughPage } from './pages/WalkthroughPage';
import { DashboardPage } from './pages/DashboardPage';
import { TestDetailPage } from './pages/TestDetailPage';
import { HistoryPage } from './pages/HistoryPage';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Reset loading state if user navigates away and back
  useEffect(() => {
    // Could use location to store intended destination if needed
  }, [location]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    // After loading, go to walkthrough (which then goes to dashboard)
    return <LoadingPage onComplete={handleLoadingComplete} targetPath="/walkthrough" />;
  }

  return (
    <Routes>
      <Route path="/walkthrough" element={<WalkthroughPage />} />
      <Route path="/results" element={<DashboardPage />} />
      <Route path="/results/:testId" element={<TestDetailPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="*" element={<Navigate to="/results" replace />} />
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
