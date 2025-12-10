import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, History, LayoutDashboard, Sparkles, Check } from 'lucide-react';
import { useLanguage, languages } from '../../context/LanguageContext';

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

export function Header({ showBack = false, title }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage, setLanguage, isTranslating, setIsTranslating, targetLanguage, setTargetLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const isHistory = location.pathname === '/history';
  const isDashboard = location.pathname === '/results';

  const handleLanguageChange = (language: typeof languages[number]) => {
    setShowLanguageMenu(false);
    if (language.code !== currentLanguage.code) {
      setTargetLanguage(language);
      setIsTranslating(true);
      // Simulate AI translation
      setTimeout(() => {
        setLanguage(language);
        setIsTranslating(false);
        setTargetLanguage(null);
      }, 1500);
    }
  };

  return (
    <>
      {/* Translation Loading Overlay */}
      <AnimatePresence>
        {isTranslating && targetLanguage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center"
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
              <p className="text-text-primary font-medium">{t('action.translating')}</p>
              <div className="flex items-center gap-3 text-2xl">
                <span>{currentLanguage.flag}</span>
                <span className="text-text-muted">→</span>
                <span>{targetLanguage.flag}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBack && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 -ml-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-text-secondary" />
                </button>
              )}

              {title ? (
                <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
              ) : (
                <img
                  src="/logo.png"
                  alt="ClariLabs"
                  className="h-10"
                />
              )}
            </div>

            <nav className="flex items-center gap-2">
              {/* Global Language Selector - Universal Design */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-200"
                  title="Translate this page"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-text-primary">{currentLanguage.nativeName}</span>
                  <span className="text-base">{currentLanguage.flag}</span>
                </button>

                <AnimatePresence>
                  {showLanguageMenu && (
                    <>
                      {/* Backdrop to close menu */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowLanguageMenu(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 py-3 z-20 overflow-hidden"
                      >
                        {/* Header with AI indicator */}
                        <div className="px-4 pb-3 border-b border-neutral-100">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-text-primary">{t('action.aiTranslation')}</span>
                          </div>
                          <p className="text-xs text-text-muted mt-1">{t('action.selectLanguage')}</p>
                        </div>

                        {/* Language Grid - Visual & Universal */}
                        <div className="grid grid-cols-2 gap-1 p-2">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => handleLanguageChange(lang)}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors text-left ${
                                currentLanguage.code === lang.code
                                  ? 'bg-primary/10 border border-primary/30'
                                  : 'hover:bg-neutral-50'
                              }`}
                            >
                              <span className="text-xl">{lang.flag}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${
                                  currentLanguage.code === lang.code ? 'text-primary' : 'text-text-primary'
                                }`}>
                                  {lang.nativeName}
                                </p>
                              </div>
                              {currentLanguage.code === lang.code && (
                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {!isDashboard && (
                <button
                  onClick={() => navigate('/results')}
                  className={`p-2 rounded-lg transition-colors ${
                    isDashboard ? 'bg-primary/10 text-primary' : 'hover:bg-neutral-100 text-text-secondary'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => navigate('/history')}
                className={`p-2 rounded-lg transition-colors ${
                  isHistory ? 'bg-primary/10 text-primary' : 'hover:bg-neutral-100 text-text-secondary'
                }`}
              >
                <History className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
