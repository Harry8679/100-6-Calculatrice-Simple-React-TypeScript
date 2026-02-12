// Types pour la calculatrice

export type Operator = '+' | '-' | '×' | '÷' | '%' | null;

export type SpecialOperation = 'sqrt' | 'square' | 'inverse' | 'percent';

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operator: Operator;
  waitingForOperand: boolean;
  memory: number;
  history: HistoryEntry[];
}

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export type CalculatorAction =
  | { type: 'INPUT_DIGIT'; digit: string }
  | { type: 'INPUT_DECIMAL' }
  | { type: 'SET_OPERATOR'; operator: Operator }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'BACKSPACE' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'SPECIAL_OPERATION'; operation: SpecialOperation }
  | { type: 'MEMORY_ADD' }
  | { type: 'MEMORY_SUBTRACT' }
  | { type: 'MEMORY_RECALL' }
  | { type: 'MEMORY_CLEAR' };

export interface DisplayProps {
  value: string;
  expression: string;
  error?: string;
}

export interface ButtonProps {
  value: string;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'equals' | 'clear' | 'special';
  wide?: boolean;
  children?: React.ReactNode;
}

export interface ButtonGridProps {
  onDigit: (digit: string) => void;
  onOperator: (operator: Operator) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onBackspace: () => void;
  onDecimal: () => void;
  onToggleSign: () => void;
  onSpecialOperation: (operation: SpecialOperation) => void;
}

export interface HistoryProps {
  entries: HistoryEntry[];
  onClearHistory: () => void;
  onRestoreCalculation: (entry: HistoryEntry) => void;
}

export type Theme = 'light' | 'dark';