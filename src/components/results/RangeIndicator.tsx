import { useMemo } from 'react';
import type { ReferenceRange, TestStatus } from '../../data/types';

interface RangeIndicatorProps {
  value: number;
  referenceRange: ReferenceRange;
  status: TestStatus;
  showLabels?: boolean;
  compact?: boolean;
  className?: string;
}

export function RangeIndicator({
  value,
  referenceRange,
  status,
  showLabels = true,
  compact = false,
  className = '',
}: RangeIndicatorProps) {
  const { low, high } = referenceRange;

  // Determine the type of range we have
  const rangeType = useMemo(() => {
    if (low !== undefined && high !== undefined) return 'both';
    if (low !== undefined) return 'low-only'; // value should be above low (e.g., HDL)
    if (high !== undefined) return 'high-only'; // value should be below high (e.g., LDL, cholesterol)
    return 'none';
  }, [low, high]);

  // Calculate position and range for visualization
  const { position, normalZoneStart, normalZoneWidth } = useMemo(() => {
    let displayMin: number;
    let displayMax: number;
    let normalStart: number;
    let normalWidth: number;

    if (rangeType === 'both') {
      // Normal range with both bounds
      const rangeSize = high! - low!;
      const padding = rangeSize * 0.3;
      displayMin = Math.max(0, low! - padding);
      displayMax = high! + padding;
      const displayRange = displayMax - displayMin;
      normalStart = ((low! - displayMin) / displayRange) * 100;
      normalWidth = ((high! - low!) / displayRange) * 100;
    } else if (rangeType === 'high-only') {
      // Only upper bound (e.g., cholesterol < 200)
      displayMin = 0;
      displayMax = Math.max(value * 1.3, high! * 1.3);
      const displayRange = displayMax - displayMin;
      normalStart = 0;
      normalWidth = (high! / displayRange) * 100;
    } else if (rangeType === 'low-only') {
      // Only lower bound (e.g., HDL > 40)
      displayMin = 0;
      displayMax = Math.max(value * 1.5, low! * 2.5);
      const displayRange = displayMax - displayMin;
      normalStart = (low! / displayRange) * 100;
      normalWidth = 100 - normalStart;
    } else {
      displayMin = 0;
      displayMax = value * 2;
      normalStart = 0;
      normalWidth = 100;
    }

    const displayRange = displayMax - displayMin;
    const position = ((value - displayMin) / displayRange) * 100;

    return {
      position: Math.min(98, Math.max(2, position)),
      normalZoneStart: normalStart,
      normalZoneWidth: normalWidth,
    };
  }, [value, low, high, rangeType]);

  const statusColors = {
    normal: 'bg-success',
    low: 'bg-warning',
    high: 'bg-warning',
    critical: 'bg-danger',
  };

  const height = compact ? 'h-2' : 'h-3';

  return (
    <div className={`w-full ${className}`}>
      {/* Range bar */}
      <div className={`relative ${height} bg-neutral-200 rounded-full overflow-hidden`}>
        {/* Normal range zone */}
        <div
          className="absolute top-0 bottom-0 bg-success/30"
          style={{
            left: `${normalZoneStart}%`,
            width: `${normalZoneWidth}%`,
          }}
        />

        {/* Value marker */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full ${statusColors[status]} border-2 border-white shadow-md transition-all duration-300`}
          style={{
            left: `${position}%`,
            transform: `translateX(-50%) translateY(-50%)`,
          }}
        />
      </div>

      {/* Labels */}
      {showLabels && !compact && (
        <div className="flex justify-between items-center mt-1.5 text-xs">
          <span className="text-text-muted">
            {rangeType === 'high-only' ? '0' : low !== undefined ? low : ''}
          </span>
          <span className="text-text-secondary font-medium">
            {value} {referenceRange.unit}
          </span>
          <span className="text-text-muted">
            {high !== undefined ? high : (rangeType === 'low-only' ? '' : '')}
          </span>
        </div>
      )}
    </div>
  );
}

interface DetailedRangeChartProps {
  value: number;
  referenceRange: ReferenceRange;
  status: TestStatus;
  history?: { date: string; value: number }[];
  className?: string;
}

export function DetailedRangeChart({
  value,
  referenceRange,
  status,
  history = [],
  className = '',
}: DetailedRangeChartProps) {
  const { low, high, optimalLow, optimalHigh } = referenceRange;

  // Determine the type of range
  const rangeType = useMemo(() => {
    if (low !== undefined && high !== undefined) return 'both';
    if (low !== undefined) return 'low-only';
    if (high !== undefined) return 'high-only';
    return 'none';
  }, [low, high]);

  // Calculate display range
  const allValues = [value, ...history.map((h) => h.value)];

  const { displayMin, displayMax } = useMemo(() => {
    if (rangeType === 'both') {
      const minValue = Math.min(...allValues, low!);
      const maxValue = Math.max(...allValues, high!);
      const padding = (maxValue - minValue) * 0.2 || 10;
      return {
        displayMin: Math.max(0, minValue - padding),
        displayMax: maxValue + padding,
      };
    } else if (rangeType === 'high-only') {
      const maxValue = Math.max(...allValues, high!);
      return {
        displayMin: 0,
        displayMax: maxValue * 1.2,
      };
    } else if (rangeType === 'low-only') {
      const maxValue = Math.max(...allValues);
      return {
        displayMin: 0,
        displayMax: Math.max(maxValue * 1.3, low! * 2),
      };
    }
    return {
      displayMin: 0,
      displayMax: Math.max(...allValues) * 1.5,
    };
  }, [allValues, low, high, rangeType]);

  const displayRange = displayMax - displayMin;
  const getPosition = (val: number) => ((val - displayMin) / displayRange) * 100;

  const statusColors = {
    normal: '#4ECDC4',
    low: '#F4A261',
    high: '#F4A261',
    critical: '#E76F51',
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Main chart */}
      <div className="relative h-16 bg-neutral-100 rounded-lg overflow-hidden">
        {/* Normal zone based on range type */}
        {rangeType === 'both' && (
          <>
            {/* Low zone (warning) */}
            <div
              className="absolute top-0 bottom-0 bg-warning/10"
              style={{ left: 0, width: `${getPosition(low!)}%` }}
            />
            {/* Normal zone */}
            <div
              className="absolute top-0 bottom-0 bg-success/15"
              style={{
                left: `${getPosition(low!)}%`,
                width: `${getPosition(high!) - getPosition(low!)}%`,
              }}
            />
            {/* High zone (warning) */}
            <div
              className="absolute top-0 bottom-0 bg-warning/10"
              style={{ left: `${getPosition(high!)}%`, right: 0 }}
            />
          </>
        )}

        {rangeType === 'high-only' && (
          <>
            {/* Normal zone (below threshold) */}
            <div
              className="absolute top-0 bottom-0 bg-success/15"
              style={{ left: 0, width: `${getPosition(high!)}%` }}
            />
            {/* High zone (warning) */}
            <div
              className="absolute top-0 bottom-0 bg-warning/10"
              style={{ left: `${getPosition(high!)}%`, right: 0 }}
            />
          </>
        )}

        {rangeType === 'low-only' && (
          <>
            {/* Low zone (warning) */}
            <div
              className="absolute top-0 bottom-0 bg-warning/10"
              style={{ left: 0, width: `${getPosition(low!)}%` }}
            />
            {/* Normal zone (above threshold) */}
            <div
              className="absolute top-0 bottom-0 bg-success/15"
              style={{ left: `${getPosition(low!)}%`, right: 0 }}
            />
          </>
        )}

        {/* Optimal range (if defined) */}
        {(optimalLow !== undefined || optimalHigh !== undefined) && (
          <div
            className="absolute top-0 bottom-0 bg-success/25 border-l-2 border-r-2 border-success/40"
            style={{
              left: optimalLow !== undefined ? `${getPosition(optimalLow)}%` : `${getPosition(low ?? displayMin)}%`,
              width:
                optimalHigh !== undefined && optimalLow !== undefined
                  ? `${getPosition(optimalHigh) - getPosition(optimalLow)}%`
                  : '20%',
            }}
          />
        )}

        {/* Reference lines */}
        {low !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-neutral-400"
            style={{ left: `${getPosition(low)}%` }}
          />
        )}
        {high !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-neutral-400"
            style={{ left: `${getPosition(high)}%` }}
          />
        )}

        {/* Historical values */}
        {history.slice(0, -1).map((h, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-400 opacity-50"
            style={{
              left: `${getPosition(h.value)}%`,
              transform: 'translateX(-50%) translateY(-50%)',
            }}
          />
        ))}

        {/* Current value marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg"
          style={{
            left: `${getPosition(value)}%`,
            transform: 'translateX(-50%) translateY(-50%)',
            backgroundColor: statusColors[status],
          }}
        />
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-2 text-xs text-text-muted">
        <span>{Math.round(displayMin)}</span>
        <div className="flex gap-4">
          {low !== undefined && <span className="text-text-secondary">{low} {rangeType === 'low-only' ? '(min)' : '(low)'}</span>}
          {high !== undefined && <span className="text-text-secondary">{high} {rangeType === 'high-only' ? '(max)' : '(high)'}</span>}
        </div>
        <span>{Math.round(displayMax)}</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-success/30" />
          <span className="text-text-secondary">Normal Range</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: statusColors[status] }}
          />
          <span className="text-text-secondary">Your Result</span>
        </div>
        {history.length > 1 && (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-neutral-400 opacity-50" />
            <span className="text-text-secondary">Previous</span>
          </div>
        )}
      </div>
    </div>
  );
}
