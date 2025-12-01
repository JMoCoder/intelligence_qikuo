import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../types';

export const Section: React.FC<SectionProps & { delay?: number }> = ({ id, className = "", children, delay = 0 }) => {
  return (
    <section id={id} className={`py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};