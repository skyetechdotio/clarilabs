import { useState } from 'react';
import { ChevronRight, Share2, Globe } from 'lucide-react';
import type { LabTest } from '../../data/types';
import { StatusBadge } from '../ui/Badge';
import { RangeIndicator } from './RangeIndicator';
import { useLanguage } from '../../context/LanguageContext';

interface TestCardProps {
  test: LabTest;
  onClick?: () => void;
  compact?: boolean;
}

export function TestCard({ test, onClick, compact = false }: TestCardProps) {
  const { value, unit, referenceRange, status, shortName } = test;
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const { tTestName, t } = useLanguage();

  // Get translated test name
  const testName = tTestName(test.id, test.name);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Sharing ${testName} result with family...`);
  };

  const handleTranslate = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Translating ${testName} explanation...`);
  };

  if (compact) {
    return (
      <div
        className="flex items-center justify-between py-3 px-4 bg-surface rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${
              status === 'normal' ? 'bg-success' : status === 'critical' ? 'bg-danger' : 'bg-warning'
            }`}
          />
          <span className="font-medium text-text-primary">{shortName}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-text-secondary">
            {value} {unit}
          </span>
          <ChevronRight className="w-4 h-4 text-text-muted" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-4 bg-surface rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 border border-neutral-200 hover:border-primary/30"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-text-primary">{testName}</h4>
          <p className="text-sm text-text-muted">{shortName}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-semibold text-text-primary">{value}</span>
        <span className="text-sm text-text-secondary">{unit}</span>
      </div>

      <RangeIndicator
        value={value}
        referenceRange={referenceRange}
        status={status}
        showLabels={true}
        compact={false}
      />

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
        {/* Quick action buttons */}
        <div className="flex items-center gap-1">
          <div className="relative">
            <button
              onClick={handleTranslate}
              onMouseEnter={() => setShowTooltip('translate')}
              onMouseLeave={() => setShowTooltip(null)}
              className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <Globe className="w-4 h-4 text-text-muted hover:text-primary" />
            </button>
            {showTooltip === 'translate' && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-text-primary text-white text-xs rounded whitespace-nowrap">
                {t('action.translate')}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={handleShare}
              onMouseEnter={() => setShowTooltip('share')}
              onMouseLeave={() => setShowTooltip(null)}
              className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <Share2 className="w-4 h-4 text-text-muted hover:text-primary" />
            </button>
            {showTooltip === 'share' && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-text-primary text-white text-xs rounded whitespace-nowrap">
                {t('action.share')}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-primary">
          <span>{t('dashboard.viewDetails')}</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
}
