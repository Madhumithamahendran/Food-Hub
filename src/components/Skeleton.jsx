import { motion } from 'framer-motion';
import './Skeleton.css';

export const SkeletonCard = () => (
  <motion.div
    className="skeleton-card"
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    <div className="skeleton-image" />
    <div className="skeleton-content">
      <div className="skeleton-text skeleton-title" />
      <div className="skeleton-text skeleton-subtitle" />
      <div className="skeleton-text skeleton-price" style={{ width: '40%' }} />
    </div>
  </motion.div>
);

export const SkeletonText = ({ width = '80%', height = '12px', count = 1 }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="skeleton-text"
        style={{ width, height }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    ))}
  </>
);
