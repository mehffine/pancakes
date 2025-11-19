import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Check } from "lucide-react";

export const CreateAccount = ({ onBack }: { onBack: () => void }): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { label: "Contains number", met: /\d/.test(formData.password) },
  ];

  const calculatePasswordStrength = () => {
    const metCount = passwordRequirements.filter((req) => req.met).length;
    const lengthScore = Math.min(formData.password.length / 12, 1);
    const requirementsScore = metCount / passwordRequirements.length;
    return Math.min((lengthScore * 0.5 + requirementsScore * 0.5) * 100, 100);
  };

  const passwordStrength = calculatePasswordStrength();
  const getStrengthLabel = () => {
    if (passwordStrength < 30) return { label: "Weak", color: "bg-red-500" };
    if (passwordStrength < 60) return { label: "Fair", color: "bg-yellow-500" };
    if (passwordStrength < 80) return { label: "Good", color: "bg-blue-500" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const strengthInfo = getStrengthLabel();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
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
            Create Account
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-6">
            Join AuthenSec and secure your digital life.
          </p>
        </header>

        <form onSubmit={handleCreateAccount} className="w-full flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="[font-family:'Roboto',Helvetica] text-xs text-[#dcdcdcba]">
                    Password Strength
                  </span>
                  <span className={`[font-family:'Roboto',Helvetica] text-xs font-medium ${strengthInfo.color.replace('bg-', 'text-')}`}>
                    {strengthInfo.label}
                  </span>
                </div>
                <div className="w-full h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthInfo.color} transition-all duration-300 ease-out`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-2">
              {passwordRequirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      req.met ? "bg-green-600" : "bg-[#1e1e1e] border border-[#00000033]"
                    }`}
                  >
                    {req.met && <Check size={12} className="text-white" />}
                  </div>
                  <span
                    className={`[font-family:'Roboto',Helvetica] text-xs ${
                      req.met ? "text-green-600" : "text-[#6b6b6b]"
                    }`}
                  >
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="w-full flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#00000033]" />
          <span className="[font-family:'Tinos',Helvetica] font-normal text-[#6b6b6b] text-xs">
            Or sign up with
          </span>
          <div className="flex-1 h-px bg-[#00000033]" />
        </div>

        <div className="w-full grid grid-cols-3 gap-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="h-12 bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033] hover:bg-[#252525] transition-colors flex items-center justify-center gap-2 [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-xs"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033] hover:bg-[#252525] transition-colors flex items-center justify-center gap-2 [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-xs"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033] hover:bg-[#252525] transition-colors flex items-center justify-center gap-2 [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-xs"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </Button>
        </div>

        <div className="w-full p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
          <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5 text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
};
