import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { ButtonGrid } from './ButtonGrid';
import { History } from './History';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../hooks/useTheme';

export const Calculator = () => {
  const {
    currentValue,
    expression,
    memory,
    history,
    hasMemory,
    handleDigit,
    handleOperator,
    handleEquals,
    handleClear,
    handleClearEntry,
    handleBackspace,
    handleDecimal,
    handleToggleSign,
    handleSpecialOperation,
    handleMemoryAdd,
    handleMemorySubtract,
    handleMemoryRecall,
    handleMemoryClear,
    clearHistory,
  } = useCalculator();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Calculatrice
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Projet 6/100 • Event handlers & State management
          </p>
        </div>
        <ThemeToggle isDark={theme === 'dark'} onToggle={toggleTheme} />
      </div>

      {/* Grid principale */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Colonne gauche - Calculatrice */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
            <Display value={currentValue} expression={expression} />

            {/* Memory indicator */}
            {hasMemory && (
              <div className="mb-4 flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
                  M: {memory}
                </span>
                <button
                  onClick={handleMemoryRecall}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  MR
                </button>
                <button
                  onClick={handleMemoryAdd}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs hover:bg-green-200 dark:hover:bg-green-800"
                >
                  M+
                </button>
                <button
                  onClick={handleMemorySubtract}
                  className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-xs hover:bg-orange-200 dark:hover:bg-orange-800"
                >
                  M−
                </button>
                <button
                  onClick={handleMemoryClear}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-xs hover:bg-red-200 dark:hover:bg-red-800"
                >
                  MC
                </button>
              </div>
            )}

            <ButtonGrid
              onDigit={handleDigit}
              onOperator={handleOperator}
              onEquals={handleEquals}
              onClear={handleClear}
              onClearEntry={handleClearEntry}
              onBackspace={handleBackspace}
              onDecimal={handleDecimal}
              onToggleSign={handleToggleSign}
              onSpecialOperation={handleSpecialOperation}
            />

            {/* Raccourcis clavier */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-2">
                💡 Raccourcis clavier
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-blue-600 dark:text-blue-400">
                <div>• 0-9 : Chiffres</div>
                <div>• + - * / % : Opérateurs</div>
                <div>• Enter ou = : Calculer</div>
                <div>• Backspace : Effacer</div>
                <div>• Esc ou C : Clear</div>
                <div>• . : Décimale</div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite - Historique */}
        <div>
          <History entries={history} onClearHistory={clearHistory} onRestoreCalculation={() => {}} />
        </div>
      </div>
    </div>
  );
};