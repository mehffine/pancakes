import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Mic } from "lucide-react";

export const BiometricAuth = ({ onBack }: { onBack: () => void }): JSX.Element => {
  const [scanning, setScanning] = useState(false);
  const [method, setMethod] = useState<"fingerprint" | "face" | "voice">("fingerprint");
  const [listening, setListening] = useState(false);

  const handleBiometricScan = async () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 2000);
  };

  const handleVoiceLogin = async () => {
    setListening(true);
    setTimeout(() => {
      setListening(false);
    }, 3000);
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
            Biometric Authentication
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm text-center tracking-[0] leading-6">
            Use your fingerprint, face, or voice to securely authenticate.
          </p>
        </header>

        <div className="w-full mb-6">
          <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-3 block">
            Authentication Method
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setMethod("fingerprint")}
              className={`p-3 rounded-[10px] border-2 transition-all ${
                method === "fingerprint"
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-[#1e1e1e] border-[#00000033]"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">👆</span>
                <span className="[font-family:'Roboto',Helvetica] text-xs text-[#dcdcdcba]">
                  Fingerprint
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMethod("face")}
              className={`p-3 rounded-[10px] border-2 transition-all ${
                method === "face"
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-[#1e1e1e] border-[#00000033]"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">👤</span>
                <span className="[font-family:'Roboto',Helvetica] text-xs text-[#dcdcdcba]">
                  Face ID
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMethod("voice")}
              className={`p-3 rounded-[10px] border-2 transition-all ${
                method === "voice"
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-[#1e1e1e] border-[#00000033]"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Mic size={20} className="text-[#dcdcdcba]" />
                <span className="[font-family:'Roboto',Helvetica] text-xs text-[#dcdcdcba]">
                  Voice
                </span>
              </div>
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-8 mb-12">
          {method === "fingerprint" && (
            <>
              <div
                className={`relative w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                  scanning
                    ? "border-green-500 bg-[#0f3d1f]/20"
                    : "border-[#4747470a] bg-[#1e1e1e]/50"
                }`}
              >
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  <span className="text-8xl">👆</span>
                </div>
                {scanning && (
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 animate-spin" />
                )}
              </div>
              <div className="text-center">
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-2">
                  {scanning ? "Scanning fingerprint..." : "Ready to scan"}
                </p>
                <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                  {scanning
                    ? "Please hold your finger steady"
                    : "Place your finger on the sensor"}
                </p>
              </div>
            </>
          )}

          {method === "face" && (
            <>
              <div
                className={`relative w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                  scanning
                    ? "border-green-500 bg-[#0f3d1f]/20"
                    : "border-[#4747470a] bg-[#1e1e1e]/50"
                }`}
              >
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  <span className="text-8xl">👤</span>
                </div>
                {scanning && (
                  <>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 animate-spin" />
                    <div className="absolute inset-4 rounded-full border-2 border-green-500 animate-pulse" />
                  </>
                )}
              </div>
              <div className="text-center">
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-2">
                  {scanning ? "Scanning face..." : "Ready for face recognition"}
                </p>
                <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                  {scanning
                    ? "Please look at the camera"
                    : "Position your face in front of the camera"}
                </p>
              </div>
            </>
          )}

          {method === "voice" && (
            <>
              <div
                className={`relative w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                  listening
                    ? "border-green-500 bg-[#0f3d1f]/20"
                    : "border-[#4747470a] bg-[#1e1e1e]/50"
                }`}
              >
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  <Mic size={64} className="text-[#dcdcdcba]" />
                </div>
                {listening && (
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 animate-spin" />
                )}
              </div>
              <div className="text-center">
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-2">
                  {listening ? "Listening..." : "Ready for voice login"}
                </p>
                <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                  {listening
                    ? "Please speak your passphrase"
                    : "Click the button below to start voice recognition"}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="w-full flex flex-col gap-3">
          <Button
            onClick={method === "voice" ? handleVoiceLogin : handleBiometricScan}
            disabled={scanning || listening}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
          >
            {method === "voice" 
              ? (listening ? "Listening..." : "Start Voice Recognition")
              : (scanning ? "Scanning..." : "Start Scan")
            }
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 bg-[#4747470a] rounded-[10px] border border-solid border-[#b7b7b752] opacity-[0.67] [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#4747471a]"
          >
            Use Password Instead
          </Button>
        </div>

        <div className="w-full mt-8 p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
          <div className="flex gap-3">
            <span className="text-xl">ℹ️</span>
            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
              Biometric data is encrypted and stored securely on your device. We never store your fingerprint or face data on our servers.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
