import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon: Icon = null,
  iconPosition = 'left'
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-red hover:bg-brand-red-dark text-white border border-transparent focus:ring-brand-red',
    secondary: 'bg-zinc-900 hover:bg-zinc-800 text-white border border-transparent focus:ring-zinc-900',
    outline: 'bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 focus:ring-brand-red',
    ghost: 'bg-transparent hover:bg-zinc-100 text-zinc-700 border border-transparent focus:ring-zinc-200',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-transparent focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={`w-4 h-4 mr-2 ${size === 'sm' ? 'w-3.5 h-3.5 mr-1.5' : ''}`} />
      )}

      {children}

      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={`w-4 h-4 ml-2 ${size === 'sm' ? 'w-3.5 h-3.5 ml-1.5' : ''}`} />
      )}
    </button>
  );
};

export default Button;
