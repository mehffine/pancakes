import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Smartphone, Mail, MessageSquare } from "lucide-react";

export const OTPFallback = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const [otpMethod, setOtpMethod] = useState<"sms" | "email">("sms");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneOrEmail) {
      setError(`Please enter your ${otpMethod === "sms" ? "phone number" : "email address"}`);
      return;
    }

    setLoading(true);
    setError("");
    
    setTimeout(() => {
      setLoading(false);
      setCodeSent(true);
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    setError("");
    
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpCode(value);
    setError("");
  };

  if (codeSent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px]">
        <div className="relative w-[448px] flex flex-col items-start">
          <button
            onClick={() => {
              setCodeSent(false);
              setOtpCode("");
            }}
            className="flex items-center gap-2 text-[#dcdcdcba] mb-8 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="[font-family:'Tinos',Helvetica] font-normal text-sm">
              Back
            </span>
          </button>

          <header className="w-full flex flex-col gap-3 mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#1e1e1e] rounded-full flex items-center justify-center border border-[#00000033]">
                {otpMethod === "sms" ? (
                  <MessageSquare size={28} className="text-[#dcdcdcba]" />
                ) : (
                  <Mail size={28} className="text-[#dcdcdcba]" />
                )}
              </div>
            </div>

            <h1 className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl text-center tracking-[0] leading-9">
              Enter Verification Code
            </h1>

            <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm text-center tracking-[0] leading-6">
              We sent a 6-digit code to <strong className="text-white">{phoneOrEmail}</strong>
            </p>
          </header>

          <form onSubmit={handleVerifyOTP} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-14 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] flex items-center justify-center"
                  >
                    <span className="text-xl [font-family:'Roboto',Helvetica] font-normal text-white">
                      {otpCode[idx] || ""}
                    </span>
                  </div>
                ))}
              </div>

              <input
                type="text"
                value={otpCode}
                onChange={handleCodeChange}
                placeholder="000000"
                maxLength={6}
                className="w-full opacity-0 h-0 p-0"
                autoFocus
              />
            </div>

            {error && (
              <div className="w-full p-3 bg-red-500/10 border border-red-500/30 rounded-[10px]">
                <p className="[font-family:'Roboto',Helvetica] text-xs text-red-400">
                  {error}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                disabled={loading || otpCode.length !== 6}
                className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>

              <Button
                type="button"
                onClick={() => {
                  setCodeSent(false);
                  setOtpCode("");
                }}
                variant="outline"
                className="w-full h-12 bg-[#4747470a] rounded-[10px] border border-solid border-[#b7b7b752] opacity-[0.67] [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#4747471a]"
              >
                Resend Code
              </Button>
            </div>
          </form>

          <div className="w-full mt-8 p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5 text-center">
              Code expires in 10 minutes. Didn't receive it? Check your {otpMethod === "sms" ? "messages" : "email"} or try resending.
            </p>
          </div>
        </div>
      </main>
    );
  }

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

        <header className="w-full flex flex-col gap-3 mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#1e1e1e] rounded-full flex items-center justify-center border border-[#00000033]">
              <Smartphone size={28} className="text-[#dcdcdcba]" />
            </div>
          </div>

          <h1 className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl text-center tracking-[0] leading-9">
            OTP Verification
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm text-center tracking-[0] leading-6">
            Choose how you'd like to receive your verification code.
          </p>
        </header>

        <form onSubmit={handleSendOTP} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
              Verification Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setOtpMethod("sms");
                  setPhoneOrEmail("");
                  setError("");
                }}
                className={`p-4 rounded-[10px] border-2 transition-all ${
                  otpMethod === "sms"
                    ? "bg-blue-500/10 border-blue-500/50"
                    : "bg-[#1e1e1e] border-[#00000033]"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <MessageSquare size={24} className="text-[#dcdcdcba]" />
                  <span className="[font-family:'Roboto',Helvetica] text-sm text-[#dcdcdcba]">
                    SMS
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOtpMethod("email");
                  setPhoneOrEmail("");
                  setError("");
                }}
                className={`p-4 rounded-[10px] border-2 transition-all ${
                  otpMethod === "email"
                    ? "bg-blue-500/10 border-blue-500/50"
                    : "bg-[#1e1e1e] border-[#00000033]"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Mail size={24} className="text-[#dcdcdcba]" />
                  <span className="[font-family:'Roboto',Helvetica] text-sm text-[#dcdcdcba]">
                    Email
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
              {otpMethod === "sms" ? "Phone Number" : "Email Address"}
            </label>
            <input
              type={otpMethod === "sms" ? "tel" : "email"}
              value={phoneOrEmail}
              onChange={(e) => {
                setPhoneOrEmail(e.target.value);
                setError("");
              }}
              placeholder={otpMethod === "sms" ? "+1 (555) 123-4567" : "your@email.com"}
              required
              className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          {error && (
            <div className="w-full p-3 bg-red-500/10 border border-red-500/30 rounded-[10px]">
              <p className="[font-family:'Roboto',Helvetica] text-xs text-red-400">
                {error}
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !phoneOrEmail}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Sending..." : `Send Code via ${otpMethod === "sms" ? "SMS" : "Email"}`}
          </Button>
        </form>

        <div className="w-full mt-8 p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
          <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
            A 6-digit verification code will be sent to your {otpMethod === "sms" ? "phone" : "email"}. Enter it to verify your identity.
          </p>
        </div>
      </div>
    </main>
  );
};

