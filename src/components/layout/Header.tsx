import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, History, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

export function Header({ showBack = false, title }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHistory = location.pathname === '/history';
  const isDashboard = location.pathname === '/results';

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
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
                className="h-10 ml-2"
              />
            )}
          </div>

          <nav className="flex items-center gap-2">
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
  );
}
