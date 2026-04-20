'use client';

import { motion } from 'framer-motion';

export default function HubInstructions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-6 border-2 border-orange-300"
    >
      <h3 className="text-2xl font-bold text-orange-600 mb-4 text-center">
        📝 איך להשתמש?
      </h3>
      <div className="grid md:grid-cols-2 gap-4 text-orange-800">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-lg">🔍</span>
            <span>לחצו על האות שאתם רוצים לתרגל</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lg">✍️</span>
            <span>עקבו עם האצבע על האותיות המנוקדות</span>
          </li>
        </ul>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-lg">📝</span>
            <span>תרגלו כתיבה על הקווים הריקים</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lg">🎯</span>
            <span>כתבו מימין לשמאל</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
