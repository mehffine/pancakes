import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { AlertTriangle, MapPin, Monitor, Clock } from "lucide-react";

export const SuspiciousLogin = ({
  onApprove,
  onDeny
}: {
  onApprove: () => void;
  onDeny: () => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const loginDetails = {
    location: "San Francisco, CA, USA",
    device: "Chrome on Windows",
    ipAddress: "192.168.1.45",
    time: "2 minutes ago",
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
        <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mb-8 animate-pulse">
          <AlertTriangle size={40} className="text-yellow-400" />
        </div>

        <header className="w-full flex flex-col gap-3 mb-8 text-center">
          <h1 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl tracking-[0] leading-9">
            Unusual Login Detected
          </h1>

          <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-6 px-4">
            We noticed a login attempt from an unfamiliar location or device. Was this you?
          </p>
        </header>

        <div className="w-full flex flex-col gap-3 mb-8">
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
              <Monitor size={20} className="text-[#dcdcdcba] mt-0.5" />
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
              <Clock size={20} className="text-[#dcdcdcba] mt-0.5" />
              <div className="flex-1">
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-1">
                  Time
                </p>
                <p className="[font-family:'Roboto',Helvetica] text-xs text-white">
                  {loginDetails.time}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col gap-3 mb-6">
          <Button
            onClick={handleApprove}
            disabled={loading}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Yes, This Was Me"}
          </Button>

          <Button
            onClick={handleDeny}
            disabled={loading}
            variant="outline"
            className="w-full h-12 bg-red-500/10 rounded-[10px] border border-solid border-red-500/30 [font-family:'Tinos',Helvetica] font-normal text-red-400 text-sm tracking-[0] leading-5 hover:bg-red-500/20"
          >
            No, Secure My Account
          </Button>
        </div>

        <div className="w-full p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-[10px]">
          <div className="flex gap-3">
            <span className="text-lg">ℹ️</span>
            <p className="[font-family:'Roboto',Helvetica] text-xs text-yellow-300 leading-5">
              If this wasn't you, we recommend immediately securing your account and changing your password.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
