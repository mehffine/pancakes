import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Check, Eye, EyeOff } from "lucide-react";

export const ResetPassword = ({ onSuccess }: { onSuccess: () => void }): JSX.Element => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { label: "Contains number", met: /\d/.test(formData.password) },
  ];

  const allRequirementsMet = passwordRequirements.every((req) => req.met);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet || !passwordsMatch) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px]">
      <div className="relative w-[448px] flex flex-col items-start">
        <header className="w-full flex flex-col gap-3 mb-8">
          <h1 className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl text-center tracking-[0] leading-9">
            Reset Your Password
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm text-center tracking-[0] leading-6">
            Enter your new password below.
          </p>
        </header>

        <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
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
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formData.confirmPassword && (
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    passwordsMatch ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {passwordsMatch && <Check size={12} className="text-white" />}
                </div>
                <span
                  className={`[font-family:'Roboto',Helvetica] text-xs ${
                    passwordsMatch ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                </span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || !allRequirementsMet || !passwordsMatch}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <div className="w-full p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
          <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
            After resetting your password, you'll be redirected to sign in with your new credentials.
          </p>
        </div>
      </div>
    </main>
  );
};
