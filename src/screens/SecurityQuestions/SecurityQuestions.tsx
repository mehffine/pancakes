import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Shield, CheckCircle2 } from "lucide-react";

export const SecurityQuestions = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}): JSX.Element => {
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const securityQuestions = [
    {
      id: "question1",
      label: "What was the name of your first pet?",
      placeholder: "Enter your answer",
    },
    {
      id: "question2",
      label: "What city were you born in?",
      placeholder: "Enter your answer",
    },
    {
      id: "question3",
      label: "What was your mother's maiden name?",
      placeholder: "Enter your answer",
    },
  ];

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answers.question1 || !answers.question2 || !answers.question3) {
      setError("Please answer all security questions");
      return;
    }

    setLoading(true);
    setError("");
    
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
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
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#1e1e1e] rounded-full flex items-center justify-center border border-[#00000033]">
              <Shield size={28} className="text-[#dcdcdcba]" />
            </div>
          </div>

          <h1 className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl text-center tracking-[0] leading-9">
            Security Questions
          </h1>

          <p className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm text-center tracking-[0] leading-6">
            Answer your security questions to verify your identity and reset your password.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          {securityQuestions.map((question, index) => (
            <div key={question.id} className="flex flex-col gap-2">
              <label className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
                {index + 1}. {question.label}
              </label>
              <input
                type="text"
                value={answers[question.id as keyof typeof answers]}
                onChange={(e) => handleChange(question.id, e.target.value)}
                placeholder={question.placeholder}
                required
                className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#00000033] rounded-[10px] [font-family:'Roboto',Helvetica] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          ))}

          {error && (
            <div className="w-full p-3 bg-red-500/10 border border-red-500/30 rounded-[10px]">
              <p className="[font-family:'Roboto',Helvetica] text-xs text-red-400">
                {error}
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Answers"}
          </Button>
        </form>

        <div className="w-full mt-8 p-4 bg-[#1e1e1e] rounded-[10px] border border-[#00000033]">
          <div className="flex gap-3">
            <span className="text-lg">🔒</span>
            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] leading-5">
              Your answers are case-sensitive. Make sure to enter them exactly as you set them up.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

