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
      label: "Password",
      status: "Strong",
      statusColor: "text-green-400",
    },
    {
      icon: <Smartphone size={20} />,
      label: "Biometric Auth",
      status: "Enabled",
      statusColor: "text-green-400",
    },
    {
      icon: <Clock size={20} />,
      label: "Session Timeout",
      status: "30 min",
      statusColor: "text-blue-400",
    },
    {
      icon: <Globe size={20} />,
      label: "Device",
      status: "Verified",
      statusColor: "text-green-400",
    },
  ];

  const recentActivity = [
    { 
      time: "2 hours ago", 
      action: "Successful login", 
      device: "Chrome on Windows",
      location: "San Francisco, CA",
      status: "success",
      icon: <CheckCircle2 size={16} className="text-green-400" />
    },
    {
      time: "1 day ago",
      action: "Password changed",
      device: "Safari on macOS",
      location: "New York, NY",
      status: "success",
      icon: <Key size={16} className="text-blue-400" />
    },
    {
      time: "3 days ago",
      action: "2FA enabled",
      device: "Mobile App",
      location: "Los Angeles, CA",
      status: "success",
      icon: <Shield size={16} className="text-purple-400" />
    },
    {
      time: "5 days ago",
      action: "Failed login attempt",
      device: "Unknown Device",
      location: "Unknown Location",
      status: "failed",
      icon: <AlertCircle size={16} className="text-red-400" />
    },
  ];

  const trustedDevices = [
    {
      name: "MacBook Pro",
      device: "Safari on macOS",
      location: "San Francisco, CA",
      lastActive: "Active now",
      isCurrent: true,
      icon: <Monitor size={20} />
    },
    {
      name: "iPhone 14",
      device: "Mobile App",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      isCurrent: false,
      icon: <Smartphone size={20} />
    },
    {
      name: "Windows PC",
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "1 day ago",
      isCurrent: false,
      icon: <Monitor size={20} />
    },
  ];

  const securityMetrics = [
    { label: "Login Attempts", value: "24", trend: "+12%", positive: true },
    { label: "Security Score", value: "95%", trend: "+5%", positive: true },
    { label: "Active Sessions", value: "3", trend: "Stable", positive: true },
  ];

  return (
    <main className="flex min-h-screen bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(50,50,50,1)_99%),linear-gradient(0deg,rgba(30,30,30,1)_0%,rgba(30,30,30,1)_100%)] w-full min-w-[1018px]">
      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        {/* Header Section */}
        <header className="w-full flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User size={28} className="text-white" />
            </div>
            <div>
              <h1 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl tracking-[0] leading-8">
                Welcome back, User
              </h1>
              <p className="[font-family:'Roboto',Helvetica] text-sm text-[#6b6b6b]">
                Last login: 2 hours ago
              </p>
            </div>
          </div>
          <Button
            onClick={onSignOut}
            variant="outline"
            className="h-10 bg-red-500/10 rounded-[10px] border border-solid border-red-500/30 [font-family:'Tinos',Helvetica] font-normal text-red-400 text-sm tracking-[0] leading-5 hover:bg-red-500/20 flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </header>

        {/* Security Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {securityMetrics.map((metric, idx) => (
            <Card key={idx} className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                    {metric.label}
                  </p>
                  {metric.positive && (
                    <TrendingUp size={14} className="text-green-400" />
                  )}
                </div>
                <p className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-2xl mb-1">
                  {metric.value}
                </p>
                <p className="[font-family:'Roboto',Helvetica] text-xs text-green-400">
                  {metric.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Quick Security Status */}
            <div>
              <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-lg mb-4 flex items-center gap-2">
                <Shield size={20} className="text-[#dcdcdcba]" />
                Quick Security Status
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {securitySettings.map((setting, idx) => (
                  <Card
                    key={idx}
                    className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033] cursor-pointer hover:bg-[#252525] transition-colors"
                  >
                    <CardContent className="flex flex-col gap-3 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[#dcdcdcba]">{setting.icon}</div>
                        <span className={`text-xs font-medium ${setting.statusColor}`}>
                          {setting.status}
                        </span>
                      </div>
                      <span className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm leading-5">
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
                <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-lg flex items-center gap-2">
                  <Monitor size={20} className="text-[#dcdcdcba]" />
                  Trusted Devices
                </h2>
                <button
                  onClick={() => setShowAllDevices(!showAllDevices)}
                  className="[font-family:'Roboto',Helvetica] text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {showAllDevices ? "Show Less" : "View All"}
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {trustedDevices.slice(0, showAllDevices ? trustedDevices.length : 2).map((device, idx) => (
                  <Card
                    key={idx}
                    className={`bg-[#1e1e1e] rounded-[14px] border border-solid ${
                      device.isCurrent ? "border-blue-500/50" : "border-[#00000033]"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-[#dcdcdcba]">{device.icon}</div>
                          <div>
                            <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
                              {device.name}
                            </p>
                            <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                              {device.device}
                            </p>
                          </div>
                        </div>
                        {device.isCurrent && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#6b6b6b]">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {device.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
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
              <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-lg mb-4 flex items-center gap-2">
                <Activity size={20} className="text-[#dcdcdcba]" />
                Recent Activity
              </h2>
              <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                {recentActivity.map((activity, idx) => (
                  <Card
                    key={idx}
                    className={`bg-[#1e1e1e] rounded-[14px] border border-solid ${
                      activity.status === "failed" ? "border-red-500/30" : "border-[#00000033]"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {activity.icon}
                          <div>
                            <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
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
                      <div className="flex items-center gap-1 text-xs text-[#6b6b6b]">
                        <MapPin size={12} />
                        {activity.location}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[448px] mb-8">
          <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-lg mb-4">
            Recent Activity
          </h2>

          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
            {recentActivity.map((activity, idx) => (
              <Card
                key={idx}
                className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]"
              >
                <CardContent className="flex items-start justify-between p-4">
                  <div className="flex-1">
                    <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm mb-1">
                      {activity.action}
                    </p>
                    <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                      {activity.device}
                    </p>
                  </div>
                  <span className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b] whitespace-nowrap ml-4">
                    {activity.time}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="mb-8">
          <h2 className="[font-family:'Tinos',Helvetica] font-normal text-[#ffffffba] text-lg mb-4 flex items-center gap-2">
            <Settings size={20} className="text-[#dcdcdcba]" />
            Security Settings
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <Card className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Shield size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
                      Two-Factor Authentication
                    </p>
                    <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                      Extra security layer for your account
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                  className="text-[#dcdcdcba] hover:text-white transition-colors"
                >
                  {twoFAEnabled ? <ToggleRight size={32} className="text-green-400" /> : <ToggleLeft size={32} />}
                </button>
              </CardContent>
            </Card>

            <Card className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Fingerprint size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
                      Biometric Login
                    </p>
                    <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                      Fingerprint, Face ID, Voice recognition
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setBiometricEnabled(!biometricEnabled)}
                  className="text-[#dcdcdcba] hover:text-white transition-colors"
                >
                  {biometricEnabled ? <ToggleRight size={32} className="text-green-400" /> : <ToggleLeft size={32} />}
                </button>
              </CardContent>
            </Card>

            <Card className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Mail size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
                      Passwordless Login
                    </p>
                    <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                      Magic link authentication via email
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPasswordlessEnabled(!passwordlessEnabled)}
                  className="text-[#dcdcdcba] hover:text-white transition-colors"
                >
                  {passwordlessEnabled ? <ToggleRight size={32} className="text-green-400" /> : <ToggleLeft size={32} />}
                </button>
              </CardContent>
            </Card>

            <Card className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <QrCode size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
                      QR Code Login
                    </p>
                    <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                      Quick scan authentication
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {}}
                  className="text-[#dcdcdcba] hover:text-white transition-colors"
                >
                  <ToggleRight size={32} className="text-green-400" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Score Card */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-[14px] border border-solid border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <TrendingUp size={24} className="text-blue-400" />
                </div>
                <div>
                  <p className="[font-family:'Tinos',Helvetica] font-normal text-blue-400 text-sm">
                    Security Score
                  </p>
                  <p className="[font-family:'Tinos',Helvetica] font-normal text-white text-3xl">
                    95%
                  </p>
                </div>
              </div>
              <div className="w-full h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: "95%" }} />
              </div>
              <p className="[font-family:'Roboto',Helvetica] text-xs text-blue-300 mt-3">
                Your account is well-protected. Keep using strong security practices.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1e1e1e] rounded-[14px] border border-solid border-[#00000033]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Bell size={24} className="text-green-400" />
                </div>
                <div>
                  <p className="[font-family:'Tinos',Helvetica] font-normal text-[#dcdcdcba] text-sm">
                    Security Alerts
                  </p>
                  <p className="[font-family:'Tinos',Helvetica] font-normal text-white text-3xl">
                    2
                  </p>
                </div>
              </div>
              <p className="[font-family:'Roboto',Helvetica] text-xs text-[#6b6b6b]">
                Recent security notifications and updates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button className="w-full h-12 bg-white rounded-[14px] [font-family:'Tinos',Helvetica] font-normal text-black text-sm tracking-[0] leading-5 hover:bg-white/90 flex items-center justify-center gap-2">
            <Settings size={18} />
            Manage All Security Settings
          </Button>
        </div>
      </div>
    </main>
  );
};
