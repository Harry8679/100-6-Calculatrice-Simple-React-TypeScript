import { useReducer, useCallback, useEffect } from 'react';
import type { CalculatorState, CalculatorAction, HistoryEntry, Operator, SpecialOperation } from '../types';
import { performCalculation, performSpecialOperation, shouldReplaceValue, canAddDecimal, formatExpression } from '../utils/calculator';
import { formatNumber } from '../utils/formatter';

const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operator: null,
  waitingForOperand: false,
  memory: 0,
  history: [],
};

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  switch (action.type) {
    case 'INPUT_DIGIT': {
      const { digit } = action;

      if (shouldReplaceValue(state.currentValue, state.waitingForOperand)) {
        return {
          ...state,
          currentValue: digit,
          waitingForOperand: false,
        };
      }

      if (state.currentValue.replace(/\s/g, '').length >= 16) {
        return state;
      }

      return {
        ...state,
        currentValue: state.currentValue === '0' ? digit : state.currentValue + digit,
        waitingForOperand: false,
      };
    }

    case 'INPUT_DECIMAL': {
      if (state.waitingForOperand) {
        return {
          ...state,
          currentValue: '0.',
          waitingForOperand: false,
        };
      }

      if (canAddDecimal(state.currentValue)) {
        return {
          ...state,
          currentValue: state.currentValue + '.',
        };
      }

      return state;
    }

    case 'SET_OPERATOR': {
      const { operator } = action;

      if (state.previousValue && state.operator && !state.waitingForOperand) {
        try {
          const result = performCalculation(
            state.previousValue,
            state.currentValue,
            state.operator
          );

          return {
            ...state,
            previousValue: formatNumber(result),
            currentValue: formatNumber(result),
            operator,
            waitingForOperand: true,
          };
        } catch {
          return state;
        }
      }

      return {
        ...state,
        previousValue: state.currentValue,
        operator,
        waitingForOperand: true,
      };
    }

    case 'CALCULATE': {
      if (!state.operator || !state.previousValue) {
        return state;
      }

      try {
        const result = performCalculation(
          state.previousValue,
          state.currentValue,
          state.operator
        );

        const expression = formatExpression(
          state.previousValue,
          state.operator,
          state.currentValue
        );

        const historyEntry: HistoryEntry = {
          id: Date.now().toString(),
          expression,
          result: formatNumber(result),
          timestamp: new Date(),
        };

        return {
          ...state,
          currentValue: formatNumber(result),
          previousValue: '',
          operator: null,
          waitingForOperand: true,
          history: [historyEntry, ...state.history].slice(0, 20),
        };
      } catch {
        return {
          ...state,
          currentValue: 'Erreur',
          waitingForOperand: true,
        };
      }
    }

    case 'CLEAR':
      return {
        ...initialState,
        history: state.history,
        memory: state.memory,
      };

    case 'CLEAR_ENTRY':
      return {
        ...state,
        currentValue: '0',
        waitingForOperand: false,
      };

    case 'BACKSPACE': {
      if (state.waitingForOperand || state.currentValue === '0') {
        return state;
      }

      const newValue = state.currentValue.slice(0, -1);
      return {
        ...state,
        currentValue: newValue === '' ? '0' : newValue,
      };
    }

    case 'TOGGLE_SIGN': {
      const num = parseFloat(state.currentValue);
      if (num === 0) return state;

      return {
        ...state,
        currentValue: formatNumber(-num),
      };
    }

    case 'SPECIAL_OPERATION': {
      try {
        const result = performSpecialOperation(state.currentValue, action.operation);
        return {
          ...state,
          currentValue: formatNumber(result),
          waitingForOperand: true,
        };
      } catch {
        return {
          ...state,
          currentValue: 'Erreur',
          waitingForOperand: true,
        };
      }
    }

    case 'MEMORY_ADD': {
      const num = parseFloat(state.currentValue);
      return {
        ...state,
        memory: state.memory + (isNaN(num) ? 0 : num),
        waitingForOperand: true,
      };
    }

    case 'MEMORY_SUBTRACT': {
      const num = parseFloat(state.currentValue);
      return {
        ...state,
        memory: state.memory - (isNaN(num) ? 0 : num),
        waitingForOperand: true,
      };
    }

    case 'MEMORY_RECALL':
      return {
        ...state,
        currentValue: formatNumber(state.memory),
        waitingForOperand: true,
      };

    case 'MEMORY_CLEAR':
      return {
        ...state,
        memory: 0,
      };

    default:
      return state;
  }
};

export const useCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleDigit = useCallback((digit: string) => {
    dispatch({ type: 'INPUT_DIGIT', digit });
  }, []);

  const handleOperator = useCallback((operator: Operator) => {
    if (operator) {
      dispatch({ type: 'SET_OPERATOR', operator });
    }
  }, []);

  const handleEquals = useCallback(() => {
    dispatch({ type: 'CALCULATE' });
  }, []);

  const handleClear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const handleClearEntry = useCallback(() => {
    dispatch({ type: 'CLEAR_ENTRY' });
  }, []);

  const handleBackspace = useCallback(() => {
    dispatch({ type: 'BACKSPACE' });
  }, []);

  const handleDecimal = useCallback(() => {
    dispatch({ type: 'INPUT_DECIMAL' });
  }, []);

  const handleToggleSign = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIGN' });
  }, []);

  const handleSpecialOperation = useCallback((operation: SpecialOperation) => {
    dispatch({ type: 'SPECIAL_OPERATION', operation });
  }, []);

  const handleMemoryAdd = useCallback(() => {
    dispatch({ type: 'MEMORY_ADD' });
  }, []);

  const handleMemorySubtract = useCallback(() => {
    dispatch({ type: 'MEMORY_SUBTRACT' });
  }, []);

  const handleMemoryRecall = useCallback(() => {
    dispatch({ type: 'MEMORY_RECALL' });
  }, []);

  const handleMemoryClear = useCallback(() => {
    dispatch({ type: 'MEMORY_CLEAR' });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === '+') {
        handleOperator('+');
      } else if (e.key === '-') {
        handleOperator('-');
      } else if (e.key === '*') {
        handleOperator('×');
      } else if (e.key === '/') {
        handleOperator('÷');
      } else if (e.key === '%') {
        handleOperator('%');
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleClear();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleOperator, handleEquals, handleClear, handleBackspace, handleDecimal]);

  return {
    currentValue: state.currentValue,
    expression: formatExpression(state.previousValue, state.operator, state.currentValue),
    memory: state.memory,
    history: state.history,
    hasMemory: state.memory !== 0,
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
  };
};