import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Authentication } from "./screens/Authentication";
import { SignIn } from "./screens/SignIn";
import { CreateAccount } from "./screens/CreateAccount";
import { TwoFactorAuth } from "./screens/TwoFactorAuth";
import { BiometricAuth } from "./screens/BiometricAuth";
import { QRCodeLogin } from "./screens/QRCodeLogin";
import { RiskAssessment } from "./screens/RiskAssessment";
import { Dashboard } from "./screens/Dashboard";
import { ForgotPassword } from "./screens/ForgotPassword";
import { ResetPassword } from "./screens/ResetPassword";
import { SuspiciousLogin } from "./screens/SuspiciousLogin";
import { PasswordlessLogin } from "./screens/PasswordlessLogin";
import { PushNotificationApproval } from "./screens/PushNotificationApproval";
import { SecurityQuestions } from "./screens/SecurityQuestions";
import { OTPFallback } from "./screens/OTPFallback";
import { SessionTimeoutModal } from "./components/SessionTimeoutModal";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const SESSION_TIMEOUT = 30 * 60 * 1000;
  const WARNING_TIME = 2 * 60 * 1000;

  useEffect(() => {
    if (!isLoggedIn) return;

    const handleActivity = () => {
      setLastActivity(Date.now());
      setShowSessionWarning(false);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    const checkTimeout = setInterval(() => {
      const elapsed = Date.now() - lastActivity;
      const timeUntilTimeout = SESSION_TIMEOUT - elapsed;

      if (timeUntilTimeout <= 0) {
        handleSignOut();
      } else if (timeUntilTimeout <= WARNING_TIME && !showSessionWarning) {
        setShowSessionWarning(true);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      clearInterval(checkTimeout);
    };
  }, [isLoggedIn, lastActivity, showSessionWarning]);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setShowSessionWarning(false);
    setCurrentScreen("welcome");
  };

  const handleStaySignedIn = () => {
    setLastActivity(Date.now());
    setShowSessionWarning(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setLastActivity(Date.now());
    setCurrentScreen("dashboard");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "signin":
        return (
          <SignIn
            onBack={() => setCurrentScreen("welcome")}
            onForgotPassword={() => setCurrentScreen("forgotpassword")}
            onPasswordlessLogin={() => setCurrentScreen("passwordless")}
            onBiometric={() => setCurrentScreen("biometric")}
            onQRCode={() => setCurrentScreen("qrcode")}
          />
        );
      case "createaccount":
        return (
          <CreateAccount onBack={() => setCurrentScreen("welcome")} />
        );
      case "2fa":
        return (
          <TwoFactorAuth 
            onBack={() => setCurrentScreen("signin")}
            onPushNotification={() => setCurrentScreen("pushnotification")}
            onSuccess={handleLogin}
          />
        );
      case "passwordless":
        return (
          <PasswordlessLogin 
            onBack={() => setCurrentScreen("signin")}
            onSuccess={handleLogin}
          />
        );
      case "pushnotification":
        return (
          <PushNotificationApproval
            onBack={() => setCurrentScreen("2fa")}
            onApprove={handleLogin}
            onDeny={() => setCurrentScreen("signin")}
          />
        );
      case "securityquestions":
        return (
          <SecurityQuestions
            onBack={() => setCurrentScreen("forgotpassword")}
            onSuccess={() => setCurrentScreen("resetpassword")}
          />
        );
      case "otpfallback":
        return (
          <OTPFallback
            onBack={() => setCurrentScreen("forgotpassword")}
            onSuccess={() => setCurrentScreen("resetpassword")}
          />
        );
      case "biometric":
        return (
          <BiometricAuth onBack={() => setCurrentScreen("signin")} />
        );
      case "qrcode":
        return (
          <QRCodeLogin onBack={() => setCurrentScreen("signin")} />
        );
      case "risk":
        return (
          <RiskAssessment onBack={() => setCurrentScreen("dashboard")} />
        );
      case "dashboard":
        return (
          <Dashboard onSignOut={handleSignOut} />
        );
      case "forgotpassword":
        return (
          <ForgotPassword 
            onBack={() => setCurrentScreen("signin")}
            onSecurityQuestions={() => setCurrentScreen("securityquestions")}
            onOTPFallback={() => setCurrentScreen("otpfallback")}
          />
        );
      case "resetpassword":
        return (
          <ResetPassword onSuccess={() => setCurrentScreen("signin")} />
        );
      case "suspicious":
        return (
          <SuspiciousLogin
            onApprove={handleLogin}
            onDeny={() => setCurrentScreen("signin")}
          />
        );
      default:
        return (
          <Authentication
            onSignIn={() => setCurrentScreen("signin")}
            onCreateAccount={() => setCurrentScreen("createaccount")}
            onQRLogin={() => setCurrentScreen("qrcode")}
            onRiskDemo={() => setCurrentScreen("risk")}
          />
        );
    }
  };

  const timeRemaining = Math.max(0, Math.floor((SESSION_TIMEOUT - (Date.now() - lastActivity)) / 1000));

  return (
    <>
      {renderScreen()}
      <SessionTimeoutModal
        isOpen={showSessionWarning}
        timeRemaining={timeRemaining}
        onStaySignedIn={handleStaySignedIn}
        onSignOut={handleSignOut}
      />
    </>
  );
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
