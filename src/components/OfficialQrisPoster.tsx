import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone, Scan, CheckCircle2, ZoomIn, Download, X } from "lucide-react";

// CRC16-CCITT Calculation for EMVCo / QRIS Standard
function calcCrc16(str: string): string {
  let crc = 0xffff;
  for (let c = 0; c < str.length; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function getQrisPayload(): string {
  const tag26_00 = "0014ID.CO.QRIS.WWW";
  const tag26_01 = "0118936004510000000000";
  const tag26_02 = "0215ID1026554960058";
  const tag26_03 = "0303UMI";
  const tag26_val = tag26_00 + tag26_01 + tag26_02 + tag26_03;
  const tag26 = "26" + tag26_val.length.toString().padStart(2, "0") + tag26_val;

  const payloadNoCrc =
    "000201" +
    "010211" +
    tag26 +
    "52048398" +
    "5303360" +
    "5802ID" +
    "5913INFAQ SMPIA 9" +
    "6006BEKASI" +
    "6304";

  return payloadNoCrc + calcCrc16(payloadNoCrc);
}

const QRIS_STRING = getQrisPayload();

interface OfficialQrisPosterProps {
  mode?: "compact" | "card" | "full";
  onEnlarge?: () => void;
}

export const OfficialQrisPoster: React.FC<OfficialQrisPosterProps> = ({ mode = "card", onEnlarge }) => {
  if (mode === "compact") {
    return (
      <div
        onClick={onEnlarge}
        className="group relative cursor-pointer bg-white border border-slate-200 rounded-2xl p-2.5 hover:border-sky-400 hover:shadow-md transition flex items-center gap-3"
      >
        <div className="w-16 h-20 bg-slate-50 border border-slate-200 rounded-xl p-1 shrink-0 flex items-center justify-center relative overflow-hidden">
          <QRCodeSVG value={QRIS_STRING} size={58} level="M" includeMargin={false} />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
            <ZoomIn className="w-4 h-4" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="bg-rose-600 text-white font-black text-[8px] px-1.5 py-0.5 rounded tracking-wider">
              QRIS
            </span>
            <span className="font-extrabold text-slate-900 text-xs truncate">INFAQ SMPIA 9</span>
          </div>
          <p className="text-[10px] text-slate-600 font-mono font-bold">NMID: ID1026554960058</p>
          <p className="text-[9.5px] text-sky-700 font-semibold mt-1 flex items-center gap-1">
            <span>Klik untuk memperbesar & scan</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onEnlarge}
      className={`relative bg-white border border-slate-300 rounded-3xl shadow-xl overflow-hidden text-slate-900 select-none max-w-md w-full mx-auto transition ${
        onEnlarge ? "cursor-pointer hover:shadow-2xl hover:border-sky-300" : ""
      }`}
      style={{ aspectRatio: "1 / 1.414" }} // Standard A4 Aspect Ratio
    >
      {/* Background Batik Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Top Left Red Geometric Accent */}
      <div 
        className="absolute top-0 left-0 w-28 h-36 bg-rose-600 pointer-events-none"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 80%)" }}
      />
      <div 
        className="absolute top-20 left-0 w-20 h-28 bg-rose-700/80 pointer-events-none"
        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
      />

      {/* Bottom Right Red Geometric Accent */}
      <div 
        className="absolute bottom-0 right-0 w-36 h-36 bg-rose-600 pointer-events-none"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6 text-center">
        {/* HEADER LOGOS */}
        <div className="flex items-center justify-between w-full pt-1 px-1">
          {/* QRIS Logo */}
          <div className="flex items-center gap-1.5 text-left">
            <div className="flex items-center gap-0.5">
              <span className="font-black text-xl tracking-tighter text-black font-sans leading-none">Q</span>
              <span className="font-black text-xl tracking-tighter text-black font-sans leading-none">R</span>
              <span className="font-black text-xl tracking-tighter text-black font-sans leading-none">I</span>
              <span className="font-black text-xl tracking-tighter text-black font-sans leading-none">S</span>
            </div>
            <div className="border-l-2 border-black pl-1.5 py-0.5">
              <p className="text-[7.5px] sm:text-[8.5px] font-bold text-black leading-tight max-w-[110px]">
                QR Code Standar<br />Pembayaran Nasional
              </p>
            </div>
          </div>

          {/* GPN Logo */}
          <div className="flex items-center gap-1">
            <svg className="w-7 h-7 text-rose-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-black text-lg text-blue-900 tracking-wider">GPN</span>
          </div>
        </div>

        {/* MERCHANT DETAILS */}
        <div className="my-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
            INFAQ SMPIA 9
          </h2>
          <p className="text-xs sm:text-sm font-mono font-bold text-slate-800 tracking-wide mt-1">
            NMID: ID1026554960058
          </p>
          <p className="text-xs font-mono font-semibold text-slate-600 mt-0.5">TID</p>
        </div>

        {/* QR CODE CONTAINER - CRISP HIGH RESOLUTION */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border-2 border-slate-200 shadow-md mx-auto my-1 flex flex-col items-center justify-center max-w-[280px] w-full">
          <QRCodeSVG
            value={QRIS_STRING}
            size={220}
            level="M"
            includeMargin={true}
            className="w-full h-auto max-w-[220px]"
          />
        </div>

        {/* TAGLINE & WEBSITE */}
        <div className="my-1">
          <p className="font-black text-sm sm:text-base text-slate-900 tracking-wider uppercase">
            SATU QRIS UNTUK SEMUA
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-700 font-medium mt-0.5">
            Cek aplikasi penyelenggara di: <span className="font-bold underline">www.aspi-qris.id</span>
          </p>
        </div>

        {/* FOOTER INFO & HOW TO PAY */}
        <div className="flex items-end justify-between w-full pt-2 border-t border-slate-200/80 text-left">
          <div className="text-[9px] sm:text-[10px] text-slate-700 leading-snug font-mono">
            <p className="font-bold">Dicetak oleh: 93600451</p>
            <p className="text-slate-500">Versi cetak: 1.0.23.07.2026</p>
          </div>

          <div className="text-right z-10">
            <p className="text-[9px] font-black text-white uppercase tracking-wider mb-1">
              Cara bayar dengan QRIS :
            </p>
            <div className="flex items-center justify-end gap-1.5 text-white text-[8px] font-bold">
              <div className="flex flex-col items-center max-w-[48px] text-center">
                <div className="w-6 h-6 bg-white/20 backdrop-blur-xs rounded-full flex items-center justify-center mb-0.5">
                  <Smartphone className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="leading-tight">Buka Aplikasi Berlogo QRIS</span>
              </div>
              <div className="flex flex-col items-center max-w-[42px] text-center">
                <div className="w-6 h-6 bg-white/20 backdrop-blur-xs rounded-full flex items-center justify-center mb-0.5">
                  <Scan className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="leading-tight">Scan & Cek</span>
              </div>
              <div className="flex flex-col items-center max-w-[36px] text-center">
                <div className="w-6 h-6 bg-white/20 backdrop-blur-xs rounded-full flex items-center justify-center mb-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="leading-tight">Bayar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
