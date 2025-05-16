import { motion } from 'framer-motion';

const EmptyState = ({ 
  title, 
  description, 
  icon, 
  action 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-10 px-4"
    >
      {icon && (
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2 
            }}
            className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 text-3xl"
          >
            {icon}
          </motion.div>
        </div>
      )}
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-medium text-gray-900 mb-2"
      >
        {title}
      </motion.h3>
      
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 max-w-md mx-auto mb-6"
        >
          {description}
        </motion.p>
      )}
      
      {action && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;