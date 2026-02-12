import type { ButtonGridProps } from '../types';
import { Button } from './Button';

export const ButtonGrid = ({
  onDigit,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onBackspace,
  onDecimal,
  onToggleSign,
  onSpecialOperation,
}: ButtonGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {/* Ligne 1 : Fonctions spéciales */}
      <Button value="√" onClick={() => onSpecialOperation('sqrt')} variant="special">
        √
      </Button>
      <Button value="x²" onClick={() => onSpecialOperation('square')} variant="special">
        x²
      </Button>
      <Button value="1/x" onClick={() => onSpecialOperation('inverse')} variant="special">
        1/x
      </Button>
      <Button value="%" onClick={() => onOperator('%')} variant="operator">
        %
      </Button>

      {/* Ligne 2 : Clear et opérations */}
      <Button value="CE" onClick={onClearEntry} variant="clear">
        CE
      </Button>
      <Button value="C" onClick={onClear} variant="clear">
        C
      </Button>
      <Button value="←" onClick={onBackspace} variant="clear">
        ←
      </Button>
      <Button value="÷" onClick={() => onOperator('÷')} variant="operator">
        ÷
      </Button>

      {/* Ligne 3 : 7-8-9 × */}
      <Button value="7" onClick={() => onDigit('7')} />
      <Button value="8" onClick={() => onDigit('8')} />
      <Button value="9" onClick={() => onDigit('9')} />
      <Button value="×" onClick={() => onOperator('×')} variant="operator">
        ×
      </Button>

      {/* Ligne 4 : 4-5-6 - */}
      <Button value="4" onClick={() => onDigit('4')} />
      <Button value="5" onClick={() => onDigit('5')} />
      <Button value="6" onClick={() => onDigit('6')} />
      <Button value="-" onClick={() => onOperator('-')} variant="operator">
        −
      </Button>

      {/* Ligne 5 : 1-2-3 + */}
      <Button value="1" onClick={() => onDigit('1')} />
      <Button value="2" onClick={() => onDigit('2')} />
      <Button value="3" onClick={() => onDigit('3')} />
      <Button value="+" onClick={() => onOperator('+')} variant="operator">
        +
      </Button>

      {/* Ligne 6 : +/- 0 . = */}
      <Button value="+/-" onClick={onToggleSign}>
        +/−
      </Button>
      <Button value="0" onClick={() => onDigit('0')} />
      <Button value="." onClick={onDecimal}>
        .
      </Button>
      <Button value="=" onClick={onEquals} variant="equals">
        =
      </Button>
    </div>
  );
};