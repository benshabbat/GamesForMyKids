'use client';

import { motion } from 'framer-motion';

export default function HubFunFacts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-300"
    >
      <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
        🌟 עובדות מעניינות על האלפבית העברי
      </h3>
      <div className="grid md:grid-cols-2 gap-4 text-purple-800">
        <div className="space-y-2">
          <p><strong>22 אותיות</strong> יש באלפבית העברי</p>
          <p><strong>5 אותיות</strong> יש להן צורה סופית</p>
        </div>
        <div className="space-y-2">
          <p><strong>מימין לשמאל</strong> כותבים בעברית</p>
          <p><strong>3000 שנה</strong> גיל האלפבית העברי</p>
        </div>
      </div>
    </motion.div>
  );
}
