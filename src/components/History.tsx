import type { HistoryProps } from '../types';
import { formatTime } from '../utils/formatter';

export const History = ({ entries, onClearHistory }: HistoryProps) => {
  if (entries.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          📜 Historique
        </h3>
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">🧮</div>
          <p className="text-sm">Aucun calcul pour le moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          📜 Historique
        </h3>
        <button
          onClick={onClearHistory}
          className="text-xs text-red-600 hover:text-red-700 hover:underline"
        >
          Effacer
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                {entry.expression}
              </span>
              <span className="text-xs text-gray-400">
                {formatTime(entry.timestamp)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono">
                = {entry.result}
              </span>
            </div>
          </div>
        ))}
      </div>

      {entries.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {entries.length} calcul{entries.length > 1 ? 's' : ''} enregistré{entries.length > 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
};