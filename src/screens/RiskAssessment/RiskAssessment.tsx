import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

interface RiskItem {
  category: string;
  level: "high" | "medium" | "low";
  description: string;
  recommendation: string;
}

export const RiskAssessment = ({ onBack }: { onBack: () => void }): JSX.Element => {
  const riskItems: RiskItem[] = [
    {
      category: "Weak Password",
      level: "high",
      description: "Your password doesn't meet security standards",
      recommendation: "Use a stronger password with mixed characters",
    },
    {
      category: "No 2FA Enabled",
      level: "high",
      description: "Two-factor authentication not activated",
      recommendation: "Enable 2FA for enhanced security",
    },
    {
      category: "Inactive Device",
      level: "medium",
      description: "Unverified login device detected",
      recommendation: "Verify this device to continue",
    },
    {
      category: "Session Timeout",
      level: "low",
      description: "Long session duration detected",
      recommendation: "Consider reducing session timeout",
    },
  ];

  const getRiskColor = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return "bg-red-500/10 border-red-500/30 text-red-400";
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
      case "low":
        return "bg-blue-500/10 border-blue-500/30 text-blue-400";
    }
  };

  const getRiskIcon = (level: "high" | "medium" | "low") => {
    return level === "high" ? (
      <AlertCircle size={20} />
    ) : (
      <TrendingUp size={20} />
    );
  };

  const highRiskCount = riskItems.filter((r) => r.level === "high").length;
  const mediumRiskCount = riskItems.filter((r) => r.level === "medium").length;
  const lowRiskCount = riskItems.filter((r) => r.level === "low").length;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px] py-12">
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
            Security Risk Assessment
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-6">
            Review and address security vulnerabilities in your account.
          </p>
        </header>

        <div className="w-full grid grid-cols-3 gap-3 mb-8">
          <Card className="bg-red-500/10 border border-red-500/30 rounded-[14px]">
            <CardContent className="flex flex-col items-center gap-2 px-0 py-4">
              <span className="text-2xl text-red-400">{highRiskCount}</span>
              <span className="[font-family:'Tinos',Helvetica] font-normal text-red-400 text-xs text-center tracking-[0] leading-4">
                High Risk
              </span>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border border-yellow-500/30 rounded-[14px]">
            <CardContent className="flex flex-col items-center gap-2 px-0 py-4">
              <span className="text-2xl text-yellow-400">{mediumRiskCount}</span>
              <span className="[font-family:'Tinos',Helvetica] font-normal text-yellow-400 text-xs text-center tracking-[0] leading-4">
                Medium Risk
              </span>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/10 border border-blue-500/30 rounded-[14px]">
            <CardContent className="flex flex-col items-center gap-2 px-0 py-4">
              <span className="text-2xl text-blue-400">{lowRiskCount}</span>
              <span className="[font-family:'Tinos',Helvetica] font-normal text-blue-400 text-xs text-center tracking-[0] leading-4">
                Low Risk
              </span>
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col gap-3 mb-8 max-h-96 overflow-y-auto">
          {riskItems.map((item, idx) => (
            <Card
              key={idx}
              className={`border rounded-[14px] cursor-pointer hover:opacity-80 transition-opacity ${getRiskColor(
                item.level
              )}`}
            >
              <CardContent className="flex gap-3 p-4">
                <div className="pt-0.5">{getRiskIcon(item.level)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="[font-family:'Tinos',Helvetica] font-normal text-sm leading-5 mb-1">
                    {item.category}
                  </h3>
                  <p className="[font-family:'Roboto',Helvetica] text-xs opacity-80 mb-2">
                    {item.description}
                  </p>
                  <p className="[font-family:'Roboto',Helvetica] text-xs opacity-70">
                    💡 {item.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full flex flex-col gap-3">
          <Button className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90">
            Fix All Issues
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 bg-[#4747470a] rounded-[10px] border border-solid border-[#b7b7b752] opacity-[0.67] [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#4747471a]"
          >
            Generate Report
          </Button>
        </div>

        <div className="w-full mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-[10px] flex gap-3">
          <CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="[font-family:'Tinos',Helvetica] font-normal text-green-400 text-sm mb-1">
              Security Score: 65%
            </p>
            <p className="[font-family:'Roboto',Helvetica] text-xs text-green-300">
              Address high-risk items to improve your security score.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
