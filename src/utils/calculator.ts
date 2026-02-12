// Fonctions utilitaires pour les calculs

export const performCalculation = (
  previousValue: string,
  currentValue: string,
  operator: string | null
): number => {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) {
    return parseFloat(currentValue) || 0;
  }

  switch (operator) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '×':
      return prev * current;
    case '÷':
      if (current === 0) {
        throw new Error('Division par zéro');
      }
      return prev / current;
    case '%':
      return prev % current;
    default:
      return current;
  }
};

export const performSpecialOperation = (
  value: string,
  operation: string
): number => {
  const num = parseFloat(value);

  if (isNaN(num)) {
    throw new Error('Valeur invalide');
  }

  switch (operation) {
    case 'sqrt':
      if (num < 0) {
        throw new Error('Racine carrée d\'un nombre négatif');
      }
      return Math.sqrt(num);
    case 'square':
      return num * num;
    case 'inverse':
      if (num === 0) {
        throw new Error('Division par zéro');
      }
      return 1 / num;
    case 'percent':
      return num / 100;
    default:
      return num;
  }
};

export const shouldReplaceValue = (
  currentValue: string,
  waitingForOperand: boolean
): boolean => {
  return waitingForOperand || currentValue === '0';
};

export const canAddDecimal = (value: string): boolean => {
  return !value.includes('.');
};

export const formatExpression = (
  previousValue: string,
  operator: string | null,
  currentValue: string
): string => {
  if (!operator) {
    return currentValue;
  }
  return `${previousValue} ${operator} ${currentValue}`;
};