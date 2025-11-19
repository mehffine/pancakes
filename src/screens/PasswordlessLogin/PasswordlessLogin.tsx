import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Mail, CheckCircle2, Send } from "lucide-react";

export const PasswordlessLogin = ({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }): JSX.Element => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState("");

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setEmailSentTo(email);
    }, 1500);
  };

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px]">
        <div className="relative w-[448px] flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-8 animate-pulse">
            <Mail size={40} className="text-green-400" />
          </div>

          <header className="w-full flex flex-col gap-3 mb-8 text-center">
            <h1 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl tracking-[0] leading-9">
              Check Your Email
            </h1>
            <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-6 px-8">
              We've sent a magic link to <strong className="text-white">{emailSentTo}</strong>. Click the link in the email to sign in instantly.
            </p>
          </header>

          <div className="w-full flex flex-col gap-3 mb-6">
            <Button
              onClick={onSuccess}
              className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90"
            >
              Continue to Dashboard
            </Button>

            <Button
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              variant="outline"
              className="w-full h-12 bg-[#4747470a] rounded-[10px] border border-solid border-[#b7b7b752] opacity-[0.67] [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#4747471a]"
            >
              Send Another Link
            </Button>
          </div>

          <div className="w-full p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
            <div className="flex gap-3">
              <span className="text-lg">⏱️</span>
              <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
                Magic links expire in 15 minutes. Didn't receive the email? Check your spam folder.
              </p>
            </div>
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
            Passwordless Login
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm text-center tracking-[0] leading-6">
            Enter your email address and we'll send you a secure magic link to sign in instantly.
          </p>
        </header>

        <form onSubmit={handleSendMagicLink} className="w-full flex flex-col gap-6">
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
            disabled={loading || !email}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Magic Link
              </>
            )}
          </Button>
        </form>

        <div className="w-full mt-8 p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-start">
              <span className="text-lg">🔒</span>
              <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
                <strong className="text-white">Secure & Fast:</strong> No passwords needed. Magic links are single-use and encrypted.
              </p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-lg">⏱️</span>
              <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
                <strong className="text-white">Time-Limited:</strong> Links expire after 15 minutes for your security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

