import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export const SignIn = ({ 
  onBack, 
  onForgotPassword,
  onPasswordlessLogin,
  onBiometric,
  onQRCode,
}: { 
  onBack: () => void; 
  onForgotPassword: () => void;
  onPasswordlessLogin?: () => void;
  onBiometric?: () => void;
  onQRCode?: () => void;
}): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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

        <header className="w-full flex flex-col gap-3 mb-8">
          <h1 className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl tracking-[0] leading-9">
            Sign In
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-6">
            Access your secure account with your credentials.
          </p>
        </header>

        <form onSubmit={handleSignIn} className="w-full flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
                Password
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="[font-family:'Tinos',Helvetica] font-normal text-[#6b6b6b] text-xs hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="w-full flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#00000033]" />
          <span className="[font-family:'Tinos',Helvetica] font-normal text-[#6b6b6b] text-xs">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-[#00000033]" />
        </div>

        <div className="w-full grid grid-cols-3 gap-3">
          <Card 
            onClick={onBiometric}
            className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033] cursor-pointer hover:bg-[#252525] transition-colors"
          >
            <CardContent className="flex flex-col items-center gap-2 px-0 py-4">
              <span className="text-2xl">🔐</span>
              <span className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-xs text-center tracking-[0] leading-4">
                Biometric
              </span>
            </CardContent>
          </Card>
          <Card 
            onClick={onQRCode}
            className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033] cursor-pointer hover:bg-[#252525] transition-colors"
          >
            <CardContent className="flex flex-col items-center gap-2 px-0 py-4">
              <span className="text-2xl">📱</span>
              <span className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-xs text-center tracking-[0] leading-4">
                QR Code
              </span>
            </CardContent>
          </Card>
          <Card 
            onClick={onPasswordlessLogin}
            className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033] cursor-pointer hover:bg-[#252525] transition-colors"
          >
            <CardContent className="flex flex-col items-center gap-2 px-0 py-4">
              <span className="text-2xl">✨</span>
              <span className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-xs text-center tracking-[0] leading-4">
                Magic Link
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};
