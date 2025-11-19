import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { 
  LogOut, Lock, Smartphone, Clock, Globe, Shield, Mail, ToggleLeft, ToggleRight,
  User, Activity, AlertCircle, CheckCircle2, TrendingUp, Settings, Bell, Key,
  Monitor, MapPin, Calendar, Eye, EyeOff, QrCode, Fingerprint
} from "lucide-react";

interface SecuritySetting {
  icon: React.ReactNode;
  label: string;
  status: string;
  statusColor: string;
}

export const Dashboard = ({ onSignOut }: { onSignOut: () => void }): JSX.Element => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [passwordlessEnabled, setPasswordlessEnabled] = useState(false);
  const [showAllDevices, setShowAllDevices] = useState(false);

  const securitySettings: SecuritySetting[] = [
    {
      icon: <Lock size={20} />,
      label: "Password Policy",
      status: "Compliant",
      statusColor: "text-green-400",
    },
    {
      icon: <Smartphone size={20} />,
      label: "Biometric Authentication",
      status: "Active",
      statusColor: "text-green-400",
    },
    {
      icon: <Clock size={20} />,
      label: "Session Duration",
      status: "30 minutes",
      statusColor: "text-blue-400",
    },
    {
      icon: <Globe size={20} />,
      label: "Device Verification",
      status: "Verified",
      statusColor: "text-green-400",
    },
  ];

  const recentActivity = [
    { 
      time: "2 hours ago", 
      action: "Authentication Successful", 
      device: "Chrome Browser - Windows",
      location: "San Francisco, CA, US",
      status: "success",
      icon: <CheckCircle2 size={16} className="text-green-400" />
    },
    {
      time: "1 day ago",
      action: "Password Credentials Updated",
      device: "Safari Browser - macOS",
      location: "New York, NY, US",
      status: "success",
      icon: <Key size={16} className="text-blue-400" />
    },
    {
      time: "3 days ago",
      action: "Multi-Factor Authentication Enabled",
      device: "Mobile Application",
      location: "Los Angeles, CA, US",
      status: "success",
      icon: <Shield size={16} className="text-purple-400" />
    },
    {
      time: "5 days ago",
      action: "Authentication Failure Detected",
      device: "Unrecognized Device",
      location: "Unknown Location",
      status: "failed",
      icon: <AlertCircle size={16} className="text-red-400" />
    },
  ];

  const trustedDevices = [
    {
      name: "MacBook Pro",
      device: "Safari Browser - macOS",
      location: "San Francisco, CA, US",
      lastActive: "Currently Active",
      isCurrent: true,
      icon: <Monitor size={20} />
    },
    {
      name: "iPhone 14",
      device: "Mobile Application",
      location: "San Francisco, CA, US",
      lastActive: "2 hours ago",
      isCurrent: false,
      icon: <Smartphone size={20} />
    },
    {
      name: "Windows PC",
      device: "Chrome Browser - Windows",
      location: "New York, NY, US",
      lastActive: "1 day ago",
      isCurrent: false,
      icon: <Monitor size={20} />
    },
  ];

  const securityMetrics = [
    { label: "Authentication Attempts", value: "24", trend: "+12%", positive: true },
    { label: "Security Compliance Score", value: "95%", trend: "+5%", positive: true },
    { label: "Active Sessions", value: "3", trend: "Stable", positive: true },
  ];

  return (
    <main className="flex min-h-screen bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px]">
      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        {/* Header Section */}
        <header className="w-full flex items-center justify-between mb-10 pb-6 border-b border-[#00000033]">
          <div>
            <h1 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl tracking-[0] leading-8 mb-1">
              Account Dashboard
            </h1>
            <p className="[font-family:'Roboto',Helvetica] text-sm text-[#6b6b6b]">
              Last authenticated: 2 hours ago
            </p>
          </div>
          <Button
            onClick={onSignOut}
            variant="outline"
            className="h-9 px-4 bg-transparent rounded-[8px] border border-solid border-[#00000033] [font-family:'Roboto',Helvetica] font-normal text-[#dcdcdcba] text-sm tracking-[0] leading-5 hover:bg-[#1e1e1e] hover:border-[#00000066] flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </header>

        {/* Security Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {securityMetrics.map((metric, idx) => (
            <Card key={idx} className="bg-[#1e1e1e] rounded-[8px] border border-solid border-[#00000033] hover:border-[#00000066] transition-colors">
              <CardContent className="p-5">
                <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] mb-3 font-medium uppercase tracking-wider">
                  {metric.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-3xl">
                    {metric.value}
                  </p>
                  {metric.positive && (
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} className="text-green-400" />
                      <span className="[font-family:'Roboto',Helvetica] text-xs text-green-400 font-medium">
                        {metric.trend}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Security Overview */}
            <div>
              <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-base mb-4">
                Security Overview
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {securitySettings.map((setting, idx) => (
                  <Card
                    key={idx}
                    className="bg-[#1e1e1e] rounded-[8px] border border-solid border-[#00000033] hover:border-[#00000066] transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[#6b6b6b]">{setting.icon}</div>
                        <span className={`text-xs font-medium ${setting.statusColor}`}>
                          {setting.status}
                        </span>
                      </div>
                      <span className="[font-family:'Roboto',Helvetica] font-normal text-[#dcdcdcba] text-sm leading-5">
                        {setting.label}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trusted Devices */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-base">
                  Trusted Devices
                </h2>
                <button
                  onClick={() => setShowAllDevices(!showAllDevices)}
                  className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] hover:text-[#dcdcdcba] transition-colors"
                >
                  {showAllDevices ? "Show Less" : "View All"}
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {trustedDevices.slice(0, showAllDevices ? trustedDevices.length : 2).map((device, idx) => (
                  <Card
                    key={idx}
                    className={`bg-[#1e1e1e] rounded-[8px] border border-solid ${
                      device.isCurrent ? "border-[#00000066]" : "border-[#00000033]"
                    } hover:border-[#00000066] transition-colors`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-[#6b6b6b]">{device.icon}</div>
                          <div>
                            <p className="[font-family:'Roboto',Helvetica] font-medium text-[#dcdcdcba] text-sm mb-0.5">
                              {device.name}
                            </p>
                            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                              {device.device}
                            </p>
                          </div>
                        </div>
                        {device.isCurrent && (
                          <span className="px-2 py-0.5 bg-[#1e1e1e] border border-[#00000033] text-[#6b6b6b] text-xs rounded font-medium">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#6b6b6b] pl-8">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={11} />
                          {device.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} />
                          {device.lastActive}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Recent Activity */}
            <div>
              <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-base mb-4">
                Recent Activity
              </h2>
              <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                {recentActivity.map((activity, idx) => (
                  <Card
                    key={idx}
                    className={`bg-[#1e1e1e] rounded-[8px] border border-solid ${
                      activity.status === "failed" ? "border-[#00000066]" : "border-[#00000033]"
                    } hover:border-[#00000066] transition-colors`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="mt-0.5">{activity.icon}</div>
                          <div>
                            <p className="[font-family:'Roboto',Helvetica] font-medium text-[#dcdcdcba] text-sm mb-0.5">
                              {activity.action}
                            </p>
                            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                              {activity.device}
                            </p>
                          </div>
                        </div>
                        <span className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] whitespace-nowrap ml-4">
                          {activity.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#6b6b6b] pl-8">
                        <MapPin size={11} />
                        {activity.location}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Security Settings */}
        <div className="mb-10">
          <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-base mb-4">
            Security Settings
          </h2>
          <div className="grid grid-cols-1 gap-2">
            <Card className="bg-[#1e1e1e] rounded-[8px] border border-solid border-[#00000033] hover:border-[#00000066] transition-colors">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-[#6b6b6b]" />
                  <div>
                    <p className="[font-family:'Roboto',Helvetica] font-medium text-[#dcdcdcba] text-sm">
                      Two-Factor Authentication
                    </p>
                    <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                      Additional authentication factor required
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                  className="text-[#6b6b6b] hover:text-[#dcdcdcba] transition-colors"
                >
                  {twoFAEnabled ? <ToggleRight size={28} className="text-green-400" /> : <ToggleLeft size={28} />}
                </button>
              </CardContent>
            </Card>

            <Card className="bg-[#1e1e1e] rounded-[8px] border border-solid border-[#00000033] hover:border-[#00000066] transition-colors">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Fingerprint size={18} className="text-[#6b6b6b]" />
                  <div>
                    <p className="[font-family:'Roboto',Helvetica] font-medium text-[#dcdcdcba] text-sm">
                      Biometric Authentication
                    </p>
                    <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                      Biometric identification methods enabled
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setBiometricEnabled(!biometricEnabled)}
                  className="text-[#6b6b6b] hover:text-[#dcdcdcba] transition-colors"
                >
                  {biometricEnabled ? <ToggleRight size={28} className="text-green-400" /> : <ToggleLeft size={28} />}
                </button>
              </CardContent>
            </Card>

            <Card className="bg-[#1e1e1e] rounded-[8px] border border-solid border-[#00000033] hover:border-[#00000066] transition-colors">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#6b6b6b]" />
                  <div>
                    <p className="[font-family:'Roboto',Helvetica] font-medium text-[#dcdcdcba] text-sm">
                      Passwordless Authentication
                    </p>
                    <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                      Email-based passwordless authentication
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPasswordlessEnabled(!passwordlessEnabled)}
                  className="text-[#6b6b6b] hover:text-[#dcdcdcba] transition-colors"
                >
                  {passwordlessEnabled ? <ToggleRight size={28} className="text-green-400" /> : <ToggleLeft size={28} />}
                </button>
              </CardContent>
            </Card>

            <Card className="bg-[#1e1e1e] rounded-[8px] border border-solid border-[#00000033] hover:border-[#00000066] transition-colors">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <QrCode size={18} className="text-[#6b6b6b]" />
                  <div>
                    <p className="[font-family:'Roboto',Helvetica] font-medium text-[#dcdcdcba] text-sm">
                      QR Code Authentication
                    </p>
                    <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                      QR code-based authentication protocol
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {}}
                  className="text-[#6b6b6b] hover:text-[#dcdcdcba] transition-colors"
                >
                  <ToggleRight size={28} className="text-green-400" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Score Card */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-[#1e1e1e] rounded-[8px] border border-solid border-[#00000033]">
            <CardContent className="p-5">
              <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] mb-3 font-medium uppercase tracking-wider">
                Security Compliance Score
              </p>
              <div className="flex items-baseline gap-3 mb-4">
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-4xl">
                  95%
                </p>
              </div>
              <div className="w-full h-1.5 bg-[#0a0a0a] rounded-full overflow-hidden mb-3">
                <div className="h-full bg-[#dcdcdcba] rounded-full" style={{ width: "95%" }} />
              </div>
              <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                Meets enterprise security standards
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1e1e1e] rounded-[8px] border border-solid border-[#00000033]">
            <CardContent className="p-5">
              <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] mb-3 font-medium uppercase tracking-wider">
                Security Notifications
              </p>
              <div className="flex items-baseline gap-3 mb-4">
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-4xl">
                  2
                </p>
              </div>
              <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                Pending notifications requiring review
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button className="w-full h-10 bg-white rounded-[8px] [font-family:'Roboto',Helvetica] font-medium text-black text-sm tracking-[0] leading-5 hover:bg-white/90 flex items-center justify-center gap-2">
            <Settings size={16} />
            Configure Security Settings
          </Button>
        </div>
      </div>
    </main>
  );
};
