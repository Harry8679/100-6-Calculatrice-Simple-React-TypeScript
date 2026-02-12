import type { DisplayProps } from '../types';

export const Display = ({ value, expression, error }: DisplayProps) => {
  return (
    <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 mb-4">
      {/* Expression */}
      <div className="text-right text-gray-400 text-sm mb-2 h-6 overflow-hidden">
        {expression || '\u00A0'}
      </div>

      {/* Valeur principale */}
      <div className="text-right">
        {error ? (
          <div className="text-red-500 text-4xl font-bold">{error}</div>
        ) : (
          <div className="text-white text-5xl font-bold break-all">
            {value}
          </div>
        )}
      </div>
    </div>
  );
};