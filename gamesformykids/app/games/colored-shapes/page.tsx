/**
 * ===============================================
 * משחק צורות צבעוניות - בחר צורה בצבע הנכון!
 * ===============================================
 */

import React from 'react';
import { AutoGamePage } from '@/components/shared/AutoGamePage';

/**
 * משחק צורות צבעוניות
 * המשחק יבקש מהילדים לבחור צורה מסוימת בצבע מסוים
 */
export default function ColoredShapesGamePage() {
  return (
    <AutoGamePage 
      gameType="colored-shapes"
    />
  );
}
