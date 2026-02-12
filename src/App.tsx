import { Calculator } from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            🧮 Calculatrice Simple
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 6/100 • React + TypeScript + useReducer
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Event handlers avancés et gestion d'état complexe
          </p>
        </div>

        {/* Calculator */}
        <Calculator />

        {/* Section explicative */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            📚 Concepts React abordés
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* useReducer */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                <span>🔄</span>
                useReducer Hook
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <div>• Alternative à useState</div>
                <div>• Gestion d'état complexe</div>
                <div>• Actions typées</div>
                <div>• Reducer pattern</div>
              </div>
              <div className="mt-3 bg-white dark:bg-gray-700 rounded p-2 font-mono text-xs">
                const [state, dispatch] = useReducer(reducer, initial)
              </div>
            </div>

            {/* Event Handlers */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                <span>🎯</span>
                Event Handlers
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <div>• onClick handlers</div>
                <div>• Keyboard events</div>
                <div>• Event delegation</div>
                <div>• useCallback optimization</div>
              </div>
              <div className="mt-3 bg-white dark:bg-gray-700 rounded p-2 font-mono text-xs">
                {'useCallback(() => dispatch(action), [])'}
              </div>
            </div>

            {/* State Management */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                <span>📦</span>
                State Management
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <div>• État complexe avec reducer</div>
                <div>• Immutabilité</div>
                <div>• Actions dispatch</div>
                <div>• State history</div>
              </div>
              <div className="mt-3 bg-white dark:bg-gray-700 rounded p-2 font-mono text-xs">
                dispatch(&#123; type: 'ACTION', payload &#125;)
              </div>
            </div>

            {/* Error Handling */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-3 flex items-center gap-2">
                <span>⚠️</span>
                Error Handling
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <div>• Try/catch dans reducer</div>
                <div>• Gestion division par 0</div>
                <div>• Validation des valeurs</div>
                <div>• Messages d'erreur</div>
              </div>
              <div className="mt-3 bg-white dark:bg-gray-700 rounded p-2 font-mono text-xs">
                try &#123; calculate() &#125; catch &#123; return 'Erreur' &#125;
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-8 bg-gray-900 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">💻 Exemples de code</h3>

          <div className="space-y-4">
            {/* Example 1 */}
            <div>
              <div className="text-sm text-gray-400 mb-2">1. useReducer avec TypeScript</div>
              <pre className="bg-gray-800 rounded p-3 overflow-x-auto text-sm">
                <code>{`type Action = 
  | { type: 'INPUT_DIGIT'; digit: string }
  | { type: 'SET_OPERATOR'; operator: Operator }
  | { type: 'CALCULATE' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INPUT_DIGIT':
      return { ...state, current: state.current + action.digit };
    case 'CALCULATE':
      return { ...state, result: calculate(state) };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);`}</code>
              </pre>
            </div>

            {/* Example 2 */}
            <div>
              <div className="text-sm text-gray-400 mb-2">2. Event handlers avec useCallback</div>
              <pre className="bg-gray-800 rounded p-3 overflow-x-auto text-sm">
                <code>{`const handleDigit = useCallback((digit: string) => {
  dispatch({ type: 'INPUT_DIGIT', digit });
}, []);

// Utilisation dans le composant
<Button onClick={() => handleDigit('5')} value="5" />`}</code>
              </pre>
            </div>

            {/* Example 3 */}
            <div>
              <div className="text-sm text-gray-400 mb-2">3. Keyboard event listeners</div>
              <pre className="bg-gray-800 rounded p-3 overflow-x-auto text-sm">
                <code>{`useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') {
      handleDigit(e.key);
    } else if (e.key === 'Enter') {
      handleEquals();
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [handleDigit, handleEquals]);`}</code>
              </pre>
            </div>

            {/* Example 4 */}
            <div>
              <div className="text-sm text-gray-400 mb-2">4. Gestion des erreurs dans le reducer</div>
              <pre className="bg-gray-800 rounded p-3 overflow-x-auto text-sm">
                <code>{`case 'CALCULATE': {
  try {
    const result = performCalculation(
      state.previous,
      state.current,
      state.operator
    );
    
    return {
      ...state,
      current: formatNumber(result),
      history: [{ expression, result }, ...state.history]
    };
  } catch (error) {
    return {
      ...state,
      current: 'Erreur',
      waitingForOperand: true
    };
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Next Project */}
        <div className="mt-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">🚀 Prochaine étape</h3>
          <p className="mb-4">
            Projet 7 : Chronomètre (useEffect, setInterval, cleanup)
          </p>
          <button className="px-6 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Voir le projet suivant →
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;