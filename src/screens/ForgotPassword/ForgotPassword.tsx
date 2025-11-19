import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export const ForgotPassword = ({ 
  onBack,
  onSecurityQuestions,
  onOTPFallback,
}: { 
  onBack: () => void;
  onSecurityQuestions?: () => void;
  onOTPFallback?: () => void;
}): JSX.Element => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px]">
        <div className="relative w-[448px] flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-8">
            <CheckCircle2 size={40} className="text-green-400" />
          </div>

          <header className="w-full flex flex-col gap-3 mb-8 text-center">
            <h1 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl tracking-[0] leading-9">
              Check Your Email
            </h1>
            <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-6 px-8">
              We've sent a password reset link to <strong className="text-white">{email}</strong>.
              Click the link in the email to reset your password.
            </p>
          </header>

          <div className="w-full flex flex-col gap-3 mb-6">
            <Button
              onClick={onBack}
              className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90"
            >
              Back to Sign In
            </Button>

            <Button
              onClick={() => setSent(false)}
              variant="outline"
              className="w-full h-12 bg-[#4747470a] rounded-[10px] border border-solid border-[#b7b7b752] opacity-[0.67] [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#4747471a]"
            >
              Resend Email
            </Button>
          </div>

          <div className="w-full p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
              Didn't receive the email? Check your spam folder or try resending.
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
              <Mail size={28} className="text-[#dcdcdcba]" />
            </div>
          </div>

          <h1 className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl text-center tracking-[0] leading-9">
            Forgot Password?
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm text-center tracking-[0] leading-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </header>

        <form onSubmit={handleResetRequest} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="w-full mt-6 flex flex-col gap-3">
          <div className="w-full flex items-center gap-3">
            <div className="flex-1 h-px bg-[#00000033]" />
            <span className="[font-family:'Tinos',Helvetica] font-normal text-[#6b6b6b] text-xs">
              Or try
            </span>
            <div className="flex-1 h-px bg-[#00000033]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {onSecurityQuestions && (
              <Button
                type="button"
                onClick={onSecurityQuestions}
                variant="outline"
                className="h-10 bg-[#1e1e1e] rounded-[10px] border border-solid border-[#00000033] hover:bg-[#252525] transition-colors [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-xs"
              >
                Security Questions
              </Button>
            )}
            {onOTPFallback && (
              <Button
                type="button"
                onClick={onOTPFallback}
                variant="outline"
                className="h-10 bg-[#1e1e1e] rounded-[10px] border border-solid border-[#00000033] hover:bg-[#252525] transition-colors [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-xs"
              >
                OTP Verification
              </Button>
            )}
          </div>
        </div>

        <div className="w-full mt-6 p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
          <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
            Remember your password?{" "}
            <button onClick={onBack} className="text-white hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};
