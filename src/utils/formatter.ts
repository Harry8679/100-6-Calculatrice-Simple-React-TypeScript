// Fonctions de formatage des nombres

export const formatNumber = (value: string | number): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return '0';
  }

  // Si c'est un entier, pas de décimales
  if (Number.isInteger(num)) {
    return num.toLocaleString('fr-FR');
  }

  // Limiter à 10 décimales
  const formatted = num.toFixed(10);
  // Supprimer les zéros inutiles
  const trimmed = parseFloat(formatted).toString();

  return trimmed;
};

export const parseFormattedNumber = (value: string): string => {
  return value.replace(/\s/g, '');
};

export const limitDigits = (value: string, maxDigits: number = 16): string => {
  const withoutSpaces = value.replace(/\s/g, '');
  if (withoutSpaces.length > maxDigits) {
    return withoutSpaces.slice(0, maxDigits);
  }
  return value;
};

export const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};