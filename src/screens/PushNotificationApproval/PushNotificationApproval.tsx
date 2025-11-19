import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Bell, CheckCircle2, X, Smartphone, MapPin, Clock } from "lucide-react";

export const PushNotificationApproval = ({
  onApprove,
  onDeny,
  onBack,
}: {
  onApprove: () => void;
  onDeny: () => void;
  onBack: () => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onDeny();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onDeny]);

  const loginDetails = {
    location: "San Francisco, CA, USA",
    device: "Chrome on Windows",
    time: "Just now",
  };

  const handleApprove = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onApprove();
    }, 1500);
  };

  const handleDeny = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onDeny();
    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px]">
      <div className="relative w-[448px] flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-8 animate-pulse">
          <Bell size={40} className="text-blue-400" />
        </div>

        <header className="w-full flex flex-col gap-3 mb-8 text-center">
          <h1 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl tracking-[0] leading-9">
            Push Notification Approval
          </h1>
          <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-6 px-4">
            Approve this login request from your trusted device.
          </p>
        </header>

        <div className="w-full flex flex-col gap-3 mb-6">
          <Card className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]">
            <CardContent className="flex items-start gap-3 p-4">
              <Smartphone size={20} className="text-[#dcdcdcba] mt-0.5" />
              <div className="flex-1">
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-1">
                  Device
                </p>
                <p className="[font-family:'Roboto',Helvetica] text-xs text-white">
                  {loginDetails.device}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]">
            <CardContent className="flex items-start gap-3 p-4">
              <MapPin size={20} className="text-[#dcdcdcba] mt-0.5" />
              <div className="flex-1">
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-1">
                  Location
                </p>
                <p className="[font-family:'Roboto',Helvetica] text-xs text-white">
                  {loginDetails.location}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]">
            <CardContent className="flex items-start gap-3 p-4">
              <Clock size={20} className="text-[#dcdcdcba] mt-0.5" />
              <div className="flex-1">
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-1">
                  Time Remaining
                </p>
                <p className="[font-family:'Roboto',Helvetica] text-xs text-white">
                  {timeRemaining} seconds
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col gap-3 mb-6">
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

        <div className="w-full flex flex-col gap-3 mb-6">
          <Button
            onClick={handleApprove}
            disabled={loading}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Approving...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Approve Login
              </>
            )}
          </Button>

          <Button
            onClick={handleDeny}
            disabled={loading}
            variant="outline"
            className="w-full h-12 bg-red-500/10 rounded-[10px] border border-solid border-red-500/30 [font-family:'Tinos',Helvetica] font-normal text-red-400 text-sm tracking-[0] leading-5 hover:bg-red-500/20 flex items-center justify-center gap-2"
          >
            <X size={18} />
            Deny Request
          </Button>
        </div>

        <div className="w-full p-4 bg-blue-500/10 border border-blue-500/30 rounded-[10px]">
          <div className="flex gap-3">
            <span className="text-lg">ℹ️</span>
            <p className="[font-family:'Roboto',Helvetica] text-xs text-blue-300 leading-5">
              This request will expire in {timeRemaining} seconds. Only approve if you initiated this login.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

