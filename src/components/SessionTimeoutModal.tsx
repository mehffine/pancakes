import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Clock, AlertCircle } from "lucide-react";

interface SessionTimeoutModalProps {
  isOpen: boolean;
  timeRemaining: number;
  onStaySignedIn: () => void;
  onSignOut: () => void;
}

export const SessionTimeoutModal = ({
  isOpen,
  timeRemaining,
  onStaySignedIn,
  onSignOut,
}: SessionTimeoutModalProps): JSX.Element | null => {
  const [countdown, setCountdown] = useState(timeRemaining);

  useEffect(() => {
    if (!isOpen) return;

    setCountdown(timeRemaining);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onSignOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, timeRemaining, onSignOut]);

  if (!isOpen) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <Card className="bg-[#1e1e1e] rounded-[20px] border border-solid border-[#00000033] w-full max-w-md animate-fade-in">
        <CardContent className="flex flex-col items-center gap-6 p-8">
          <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <AlertCircle size={32} className="text-yellow-400" />
          </div>

          <div className="text-center">
            <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-xl mb-3">
              Session Timeout Warning
            </h2>
            <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm leading-6">
              Your session will expire due to inactivity. You will be automatically signed out in:
            </p>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 bg-[#252525] rounded-[10px] border border-[#00000033]">
            <Clock size={24} className="text-yellow-400" />
            <span className="[font-family:'Roboto',Helvetica] font-normal text-yellow-400 text-3xl tabular-nums">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="w-full flex flex-col gap-3">
            <Button
              onClick={onStaySignedIn}
              className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90"
            >
              Stay Signed In
            </Button>

            <Button
              onClick={onSignOut}
              variant="outline"
              className="w-full h-12 bg-[#4747470a] rounded-[10px] border border-solid border-[#b7b7b752] opacity-[0.67] [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#4747471a]"
            >
              Sign Out Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
