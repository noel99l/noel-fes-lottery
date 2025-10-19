'use client';

import { Band } from '@/types/band';

interface SelectedBandsProps {
  selectedBands: Band[];
  maxSelections: number;
}

export default function SelectedBands({ selectedBands, maxSelections }: SelectedBandsProps) {
  return (
    <div className="results-section">
      <div className="selected-bands">
        {selectedBands.slice().reverse().map((band, index) => (
          <div key={`${band.name}-${selectedBands.length - index}`} className={`band-card ${index === 0 ? 'latest' : ''}`}>
            <h3>{band.name}</h3>
            <div className="band-members">
              <strong>メンバー:</strong> {band.members}
            </div>
            <p>{band.concept}</p>
          </div>
        ))}
      </div>
      <div className="counter">
        <span>{selectedBands.length}</span> / {maxSelections}
      </div>
    </div>
  );
}