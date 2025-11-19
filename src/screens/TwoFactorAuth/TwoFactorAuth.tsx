import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Smartphone, Mail, Shield, Bell } from "lucide-react";

export const TwoFactorAuth = ({ 
  onBack, 
  onPushNotification,
  onSuccess 
}: { 
  onBack: () => void;
  onPushNotification?: () => void;
  onSuccess?: () => void;
}): JSX.Element => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"app" | "sms" | "email" | "push">("app");
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSuccess) onSuccess();
    }, 1000);
  };

  const handleMethodSelect = (selectedMethod: "app" | "sms" | "email" | "push") => {
    setMethod(selectedMethod);
    setCode("");
    if (selectedMethod === "push" && onPushNotification) {
      onPushNotification();
    }
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
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#1e1e1e] rounded-full flex items-center justify-center border border-[#00000033]">
              <span className="text-4xl">🔐</span>
            </div>
          </div>

          <h1 className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl text-center tracking-[0] leading-9">
            Two-Factor Authentication
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm text-center tracking-[0] leading-6">
            Choose your verification method and enter the code.
          </p>
        </header>

        <div className="w-full mb-6">
          <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-3 block">
            Verification Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleMethodSelect("app")}
              className={`p-3 rounded-[10px] border-2 transition-all ${
                method === "app"
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-[#1e1e1e] border-[#00000033]"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Shield size={20} className="text-[#dcdcdcba]" />
                <span className="[font-family:'Roboto',Helvetica] text-xs text-[#dcdcdcba]">
                  Authenticator App
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleMethodSelect("sms")}
              className={`p-3 rounded-[10px] border-2 transition-all ${
                method === "sms"
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-[#1e1e1e] border-[#00000033]"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Smartphone size={20} className="text-[#dcdcdcba]" />
                <span className="[font-family:'Roboto',Helvetica] text-xs text-[#dcdcdcba]">
                  SMS
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleMethodSelect("email")}
              className={`p-3 rounded-[10px] border-2 transition-all ${
                method === "email"
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-[#1e1e1e] border-[#00000033]"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Mail size={20} className="text-[#dcdcdcba]" />
                <span className="[font-family:'Roboto',Helvetica] text-xs text-[#dcdcdcba]">
                  Email
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleMethodSelect("push")}
              className={`p-3 rounded-[10px] border-2 transition-all ${
                method === "push"
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-[#1e1e1e] border-[#00000033]"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Bell size={20} className="text-[#dcdcdcba]" />
                <span className="[font-family:'Roboto',Helvetica] text-xs text-[#dcdcdcba]">
                  Push Notification
                </span>
              </div>
            </button>
          </div>
        </div>

        {method !== "push" && (
        <form onSubmit={handleVerify} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-12 h-14 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] flex items-center justify-center"
                >
                  <span className="text-xl [font-family:'Roboto',Helvetica] font-normal text-white">
                    {code[idx] || ""}
                  </span>
                </div>
              ))}
            </div>

            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder="000000"
              maxLength={6}
              className="w-full opacity-0 h-0 p-0"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-[#4747470a] rounded-[10px] border border-solid border-[#b7b7b752] opacity-[0.67] [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#4747471a]"
            >
              Don't have your code?
            </Button>
          </div>

          <div className="w-full">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-5 h-5 rounded border-[#00000033] bg-[#1e1e1e] text-white focus:ring-2 focus:ring-white/20"
              />
              <span className="[font-family:'Roboto',Helvetica] text-sm text-[#dcdcdcba]">
                Remember this device for 30 days
              </span>
            </label>
          </div>

          <div className="text-center pt-4 border-t border-[#00000033]">
            <p className="[font-family:'Tinos',Helvetica] font-normal text-[#6b6b6b] text-xs">
              Didn't receive a code?{" "}
              <button className="text-white hover:underline">
                Resend
              </button>
            </p>
          </div>
        </form>
        )}

        <div className="w-full mt-8 p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
          <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
            Your security is our priority. This 2FA code is required to access your account.
          </p>
        </div>
      </div>
    </main>
  );
};
