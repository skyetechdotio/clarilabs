import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LoadingPage } from './pages/LoadingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TestDetailPage } from './pages/TestDetailPage';
import { HistoryPage } from './pages/HistoryPage';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // On initial load or refresh, show loading screen
    // Store the intended destination
    if (isLoading && location.pathname !== '/') {
      setTargetPath(location.pathname);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingPage onComplete={handleLoadingComplete} targetPath={targetPath || '/results'} />;
  }

  return (
    <Routes>
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
