export function printCertificate(opts: { emoji: string; title: string; scorePercent: number }) {
  const { emoji, title, scorePercent } = opts;
  const win = window.open('', '_blank', 'width=800,height=600');
  if (!win) return;
  const today = new Date().toLocaleDateString('he-IL');
  const stars = scorePercent === 100 ? '⭐⭐⭐' : scorePercent >= 90 ? '⭐⭐' : '⭐';
  const praise =
    scorePercent === 100 ? 'מושלם לחלוטין! 🎉' : scorePercent >= 90 ? 'עבודה נהדרת! 🌟' : 'כל הכבוד! 👏';

  win.document.write(
    `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="utf-8"><title>תעודת הצטיינות</title>` +
      `<style>@page{margin:.5in}body{font-family:Arial,Helvetica,sans-serif;text-align:center;padding:40px;background:#fff;margin:0}` +
      `.cert{border:6px double #d97706;border-radius:16px;padding:48px 40px;max-width:560px;margin:0 auto}` +
      `.stars{font-size:2rem;margin-bottom:12px}.h1{font-size:2rem;color:#7c3aed;margin:0 0 12px;font-weight:900}` +
      `.emoji{font-size:5rem;margin:16px 0}.game{font-size:1.3rem;color:#374151;margin-bottom:8px}` +
      `.score{font-size:4rem;font-weight:900;color:#059669;margin:12px 0 4px}.score-label{color:#6b7280;font-size:1rem;margin-bottom:16px}` +
      `.praise{font-size:1.1rem;color:#374151}.date{color:#9ca3af;font-size:.85rem;margin-top:24px;border-top:1px solid #e5e7eb;padding-top:16px}` +
      `</style></head><body><div class="cert">` +
      `<div class="stars">${stars}</div><div class="h1">🏅 תעודת הצטיינות</div>` +
      `<div class="emoji">${emoji}</div><div class="game">${title}</div>` +
      `<div class="score">${scorePercent}%</div><div class="score-label">ציון סופי</div>` +
      `<div class="praise">${praise}</div><div class="date">תאריך: ${today}</div>` +
      `</div><script>window.onload=()=>{setTimeout(()=>window.print(),200)}<\/script></body></html>`,
  );
  win.document.close();
}
