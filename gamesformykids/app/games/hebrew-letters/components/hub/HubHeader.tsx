'use client';

import { motion } from 'framer-motion';

export default function HubHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
          🎨 תרגול כתיבה בעברית 🎨
        </h1>
        <p className="text-xl text-gray-600">
          לחצו על כל אות כדי להתחיל לתרגל את הכתיבה
        </p>
      </div>
    </motion.div>
  );
}
