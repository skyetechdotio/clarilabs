import { ChevronRight } from 'lucide-react';
import type { LabTest } from '../../data/types';
import { StatusBadge } from '../ui/Badge';
import { RangeIndicator } from './RangeIndicator';

interface TestCardProps {
  test: LabTest;
  onClick?: () => void;
  compact?: boolean;
}

export function TestCard({ test, onClick, compact = false }: TestCardProps) {
  const { name, shortName, value, unit, referenceRange, status } = test;

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
          <h4 className="font-medium text-text-primary">{name}</h4>
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

      <div className="flex items-center justify-end mt-3 text-sm text-primary">
        <span>View details</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
}
