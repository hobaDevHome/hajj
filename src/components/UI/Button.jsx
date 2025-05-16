/* eslint-disable react/prop-types */
const Button = ({
  children,
  onClick,
  variant = "secondary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  fullWidth = false,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    danger: "btn-danger",
    outline: "btn-outline",
  };

  return (
    <button
      // @ts-ignore
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        btn 
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
