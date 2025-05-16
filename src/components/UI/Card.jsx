import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  onClick, 
  initial = { opacity: 0, y: 10 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, scale: 0.95 },
  transition = { duration: 0.3 },
  ...props 
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={`card ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;