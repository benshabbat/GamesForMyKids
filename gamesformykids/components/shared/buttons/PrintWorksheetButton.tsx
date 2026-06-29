"use client";

import { Printer } from "lucide-react";
import type { BaseGameItem } from "@/lib/types/core/base";

interface PrintWorksheetButtonProps {
  items: BaseGameItem[];
  title: string;
}

function buildWorksheetHtml(items: BaseGameItem[], title: string): string {
  const safeTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cards = items
    .slice(0, 12)
    .map(
      (item) => `
      <div class="card">
        <span class="emoji">${item.emoji ?? "📌"}</span>
        <div class="name">${item.hebrew}</div>
        <div class="line"></div>
        <div class="line"></div>
      </div>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <title>דף עבודה — ${safeTitle}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: Rubik, 'Segoe UI', Arial, sans-serif;
      direction: rtl;
      margin: 0;
      padding: 20px;
      background: #fff;
      color: #1a1a1a;
    }
    h1 {
      text-align: center;
      font-size: 26px;
      font-weight: 700;
      margin: 0 0 24px;
      color: #4f46e5;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
      max-width: 680px;
      margin: 0 auto;
    }
    .card {
      border: 2px solid #c7d2fe;
      border-radius: 14px;
      padding: 14px 10px 10px;
      text-align: center;
      background: #f5f3ff;
    }
    .emoji {
      font-size: 52px;
      display: block;
      margin-bottom: 6px;
      line-height: 1;
    }
    .name {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 14px;
      color: #3730a3;
    }
    .line {
      border: none;
      border-bottom: 1.5px solid #a5b4fc;
      margin: 7px 4px;
      height: 22px;
    }
    @media print {
      @page { margin: 12mm; size: A4 portrait; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <h1>📚 ${safeTitle}</h1>
  <div class="grid">${cards}</div>
  <script>window.onload = function () { window.print(); };</script>
</body>
</html>`;
}

export default function PrintWorksheetButton({ items, title }: PrintWorksheetButtonProps) {
  const handlePrint = () => {
    const win = window.open("", "_blank", "width=800,height=900");
    if (!win) return;
    win.document.write(buildWorksheetHtml(items, title));
    win.document.close();
  };

  if (!items || items.length === 0) return null;

  return (
    <button
      type="button"
      onClick={handlePrint}
      title="הדפס דף עבודה"
      aria-label="הדפס דף עבודה"
      className="
        flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
        transition-all border-2
        bg-white/30 border-white/50 text-white hover:bg-white/40
        select-none
      "
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      <span>הדפס</span>
    </button>
  );
}
