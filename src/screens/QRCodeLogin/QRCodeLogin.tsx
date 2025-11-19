import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";

export const QRCodeLogin = ({ onBack }: { onBack: () => void }): JSX.Element => {
  const [scanning, setScanning] = useState(false);

  const handleStartScan = async () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 2000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px]">
      <div className="relative w-[448px] flex flex-col items-start">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#dcdcdcba] mb-8 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="[font-family:'Tinos',Helvetica] font-normal text-sm">
            Back
          </span>
        </button>

        <header className="w-full flex flex-col gap-3 mb-12">
          <h1 className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl text-center tracking-[0] leading-9">
            QR Code Login
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm text-center tracking-[0] leading-6">
            Scan the QR code with your device to authenticate instantly.
          </p>
        </header>

        <div className="w-full flex flex-col items-center gap-8 mb-12">
          <div
            className={`relative w-56 h-56 rounded-[20px] border-4 flex items-center justify-center transition-all duration-300 overflow-hidden ${
              scanning
                ? "border-green-500 bg-green-500/10"
                : "border-[#4747470a] bg-[#1e1e1e]/50"
            }`}
          >
            {scanning ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-48 h-48 border-2 border-green-500 rounded-lg" />
                <div className="absolute w-40 h-40 border-2 border-transparent border-t-green-500 animate-spin rounded-lg" />
                <span className="text-6xl relative z-10">📱</span>
              </div>
            ) : (
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full p-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="10" y="10" width="30" height="30" className="text-[#4747470a]" />
                <rect x="60" y="10" width="30" height="30" className="text-[#4747470a]" />
                <rect x="10" y="60" width="30" height="30" className="text-[#4747470a]" />
                <rect x="35" y="35" width="30" height="30" className="text-[#4747470a]" />
              </svg>
            )}
          </div>

          <div className="text-center">
            <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-2">
              {scanning ? "Scanning QR code..." : "Ready to scan"}
            </p>
            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
              {scanning
                ? "Position the QR code in frame"
                : "Use your device camera to scan"}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Button
            onClick={handleStartScan}
            disabled={scanning}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
          >
            {scanning ? "Scanning..." : "Start Camera"}
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 bg-[#4747470a] rounded-[10px] border border-solid border-[#b7b7b752] opacity-[0.67] [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#4747471a]"
          >
            Enter Code Manually
          </Button>
        </div>

        <div className="w-full mt-8 p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033] flex flex-col gap-3">
          <div className="flex gap-2 items-start">
            <span className="text-lg">✨</span>
            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
              <strong className="text-white">Instant Authentication:</strong> No passwords needed. QR codes are single-use and expire after 5 minutes.
            </p>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-lg">🔒</span>
            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
              <strong className="text-white">End-to-End Encrypted:</strong> All data is encrypted during transmission.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
