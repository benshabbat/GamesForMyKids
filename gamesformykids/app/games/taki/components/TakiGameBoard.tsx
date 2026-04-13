'use client';

import TakiScoreBar from './TakiScoreBar';
import TakiComputerHand from './TakiComputerHand';
import TakiTable from './TakiTable';
import TakiMessageArea from './TakiMessageArea';
import TakiActionButtons from './TakiActionButtons';
import TakiPlayerHand from './TakiPlayerHand';

export default function TakiGameBoard() {
  return (
    <div className="flex flex-col min-h-screen p-3 gap-3">
      <TakiScoreBar />
      <TakiComputerHand />
      <TakiTable />
      <TakiMessageArea />
      <TakiActionButtons />
      <TakiPlayerHand />
    </div>
  );
}
