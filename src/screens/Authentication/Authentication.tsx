import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const securityFeatures = [
  {
    icon: "/icon.svg",
    label: "2FA Enabled",
  },
  {
    icon: "/icon-2.svg",
    label: "Biometric",
  },
  {
    icon: "/icon-1.svg",
    label: "Encrypted",
  },
];

const additionalOptions = [
  {
    icon: "/container.svg",
    label: "QR Login",
  },
  {
    icon: "/container-1.svg",
    label: "Risk Demo",
  },
];

export const Authentication = ({
  onSignIn,
  onCreateAccount,
  onQRLogin,
  onRiskDemo,
}: {
  onSignIn: () => void;
  onCreateAccount: () => void;
  onQRLogin: () => void;
  onRiskDemo: () => void;
}): JSX.Element => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px]">
      <div className="relative w-[448px] flex flex-col items-center">
        <img
          className="w-[188px] h-[188px] mb-8"
          alt="Welcome screen"
          src="/welcomescreen.svg"
        />

        <header className="w-full flex flex-col gap-3 mb-8">
          <h1 className="w-full [font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl text-center tracking-[0] leading-9">
            AuthenSec
          </h1>

          <p className="w-full px-8 [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-base text-center tracking-[0] leading-6">
            Your gateway to secure, seamless authentication. Login with
            confidence using multiple security layers.
          </p>
        </header>

        <section className="grid grid-cols-3 w-full gap-4 mb-8">
          {securityFeatures.map((feature, index) => (
            <Card
              key={index}
              className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]"
            >
              <CardContent className="flex flex-col items-center gap-2 px-0 py-4">
                <img
                  className="w-6 h-6"
                  alt={feature.label}
                  src={feature.icon}
                />
                <span className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-xs text-center tracking-[0] leading-4 whitespace-nowrap">
                  {feature.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="flex flex-col w-full gap-3 mb-8">
          <Button
            onClick={onCreateAccount}
            className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90"
          >
            Create Account
          </Button>

          <Button
            onClick={onSignIn}
            variant="outline"
            className="w-full h-12 bg-[#4747470a] rounded-[10px] border border-solid border-[#b7b7b752] opacity-[0.67] [font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#4747471a]"
          >
            Sign In
          </Button>
        </section>

        <section className="grid grid-cols-2 w-full gap-3 pt-2">
          <Card
            onClick={onQRLogin}
            className="bg-zinc-900 rounded-2xl border-2 border-solid border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors"
          >
            <CardContent className="flex flex-col items-center gap-2 pt-[18px] pb-0.5 px-[18px]">
              <img
                className="w-10 h-10"
                alt="QR Login"
                src="/container.svg"
              />
              <span className="[font-family:'Roboto',Helvetica] font-normal text-neutral-50 text-xs tracking-[0] leading-4 whitespace-nowrap">
                QR Login
              </span>
            </CardContent>
          </Card>
          <Card
            onClick={onRiskDemo}
            className="bg-zinc-900 rounded-2xl border-2 border-solid border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors"
          >
            <CardContent className="flex flex-col items-center gap-2 pt-[18px] pb-0.5 px-[18px]">
              <img
                className="w-10 h-10"
                alt="Risk Demo"
                src="/container-1.svg"
              />
              <span className="[font-family:'Roboto',Helvetica] font-normal text-neutral-50 text-xs tracking-[0] leading-4 whitespace-nowrap">
                Risk Demo
              </span>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};
