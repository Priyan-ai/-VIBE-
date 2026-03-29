import { Settings, Share2, Bell, HelpCircle, LogOut, User, ChevronRight } from 'lucide-react';
import logoImage from '../../assets/229c23a750655fa4a68de6cce10a3c01e214e592.png';
import { useAuth } from '../../../src/context/AuthContext';
import { useState } from 'react';

interface ProfilePageProps {
  songCount?: number;
  recentCount?: number;
}

export function ProfilePage({ songCount = 0, recentCount = 0 }: ProfilePageProps) {
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const userEmail = user?.email || 'music.lover@vibe.com';
  const userName = userEmail.split('@')[0];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vibe Music',
          text: 'Check out this awesome music app!',
          url: window.location.origin
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard!');
    }
  };

  const menuItems = [
    { 
      icon: User, 
      label: 'Account', 
      description: 'Manage your profile details',
      onClick: () => alert(`Account Details:\nEmail: ${userEmail}\nUID: ${user?.id}`)
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      description: notificationsEnabled ? 'Push notifications are ON' : 'Push notifications are OFF',
      onClick: () => setNotificationsEnabled(!notificationsEnabled)
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      description: 'App preferences',
      onClick: () => alert('Settings menu coming soon!')
    },
    { 
      icon: Share2, 
      label: 'Share', 
      description: 'Share Vibe with friends',
      onClick: handleShare
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      description: 'Get help',
      onClick: () => window.location.href = 'mailto:support@vibe.com'
    },
  ];

  return (
    <div className="pb-40 px-4 pt-6">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="size-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center">
          <User className="size-12 text-white" />
        </div>
        <h1 className="text-2xl text-white mb-1 capitalize">{userName}</h1>
        <p className="text-gray-400">{userEmail}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center bg-white/5 rounded-lg p-4">
          <p className="text-2xl text-white mb-1">{songCount}</p>
          <p className="text-gray-400 text-sm">Liked Songs</p>
        </div>
        <div className="text-center bg-white/5 rounded-lg p-4">
          <p className="text-2xl text-white mb-1">{recentCount}</p>
          <p className="text-gray-400 text-sm">Recent</p>
        </div>
        <div className="text-center bg-white/5 rounded-lg p-4">
          <p className="text-2xl text-white mb-1">0</p>
          <p className="text-gray-400 text-sm">Playlists</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.onClick}
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition text-left"
            >
              <Icon className="size-6 text-purple-400 shrink-0" />
              <div className="flex-1">
                <p className="text-white">{item.label}</p>
                <p className={`text-sm ${item.label === 'Notifications' ? (notificationsEnabled ? 'text-green-400' : 'text-gray-400') : 'text-gray-400'}`}>
                  {item.description}
                </p>
              </div>
              <ChevronRight className="size-5 text-gray-500" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button 
        onClick={() => signOut()}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition mt-6"
      >
        <LogOut className="size-5" />
        <span>Log Out</span>
      </button>

      {/* Version */}
      <div className="flex flex-col items-center mt-8 pb-8 opacity-50">
        <img
          src={logoImage}
          alt="Vibe Logo"
          className="w-16 h-auto mb-2 invert hue-rotate-180 contrast-125 mix-blend-screen"
        />
        <p className="text-center text-gray-500 text-sm">v1.0.0</p>
      </div>
    </div>
  );
}
