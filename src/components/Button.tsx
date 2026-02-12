import type { ButtonProps } from '../types';

export const Button = ({
  value,
  onClick,
  variant = 'default',
  wide = false,
  children,
}: ButtonProps) => {
  const baseClasses = 'h-16 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 hover:shadow-lg';

  const variantClasses = {
    default: 'bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-800 dark:hover:bg-gray-700',
    operator: 'bg-orange-500 hover:bg-orange-600 text-white',
    equals: 'bg-green-500 hover:bg-green-600 text-white',
    clear: 'bg-red-500 hover:bg-red-600 text-white',
    special: 'bg-blue-500 hover:bg-blue-600 text-white',
  };

  const widthClasses = wide ? 'col-span-2' : '';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClasses}`}
    >
      {children || value}
    </button>
  );
};