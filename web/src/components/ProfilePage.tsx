import { Settings, Share2, Bell, HelpCircle, LogOut, User, ChevronRight, ChevronDown, Shield, Smartphone, Globe, Headphones, MapPin, Mail, Lock } from 'lucide-react'
import { VibeLogo } from './VibeLogo'
import { useAuth } from '../../../src/context/AuthContext'
import { useState } from 'react'

interface ProfilePageProps {
  songCount?: number;
  recentCount?: number;
  onNavigate?: (route: string) => void;
}

export function ProfilePage({ songCount = 0, recentCount = 0, onNavigate }: ProfilePageProps) {
  const { user, signOut } = useAuth()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  
  // Settings mock states
  const [highQualityAudio, setHighQualityAudio] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  const [dataSaver, setDataSaver] = useState(false)

  // Password reset states
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vibe Music',
          text: 'Check out this awesome music app!',
          url: window.location.origin
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.origin)
      alert('Link copied to clipboard!')
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const userEmail = user?.email || 'music.lover@vibe.com'
  const userName = userEmail.split('@')[0]
  
  // Realistically infer region from timezone, e.g., 'America/New_York' -> 'New York'
  const userRegion = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop()?.replace(/_/g, ' ') || 'Local Region'

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters');
      return;
    }
    setPasswordLoading(true);
    try {
      // @ts-ignore
      const { supabase } = await import('../../../src/lib/supabase');
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordMessage('Success!');
      setNewPassword('');
      setTimeout(() => {
        setIsChangingPassword(false);
        setPasswordMessage('');
      }, 2000);
    } catch (err: any) {
      setPasswordMessage(err.message || 'Error updating password');
    } finally {
      setPasswordLoading(false);
    }
  }
  
  const renderAccountDetails = () => (
    <div className="mt-4 space-y-3 bg-black/20 p-4 rounded-xl border border-white/5 animate-in slide-in-from-top-2">
      <div className="flex items-center gap-3 text-gray-300">
        <Mail className="w-4 h-4 text-teal-500" />
        <span className="text-sm flex-1">Email Address</span>
        <span className="text-sm font-medium text-white">{userEmail}</span>
      </div>
      <div className="flex items-center gap-3 text-gray-300">
        <Shield className="w-4 h-4 text-teal-500" />
        <span className="text-sm flex-1">Account Status</span>
        <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded-full">Premium</span>
      </div>
      <div className="flex items-center gap-3 text-gray-300">
        <MapPin className="w-4 h-4 text-teal-500" />
        <span className="text-sm flex-1">Region</span>
        <span className="text-sm text-white">{userRegion}</span>
      </div>
      
      {!isChangingPassword ? (
        <button 
          onClick={() => setIsChangingPassword(true)}
          className="w-full mt-2 py-2 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
        >
          <Lock className="w-4 h-4" /> Change Password
        </button>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="mt-4 p-3 bg-black/40 rounded-xl border border-white/5 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
          <p className="text-xs text-gray-400">Enter a new secure password.</p>
          <input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password (min 6 chars)" 
            className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500 transition-colors"
          />
          {passwordMessage && (
            <p className={`text-xs ${passwordMessage === 'Success!' ? 'text-green-400' : 'text-red-400'}`}>
              {passwordMessage}
            </p>
          )}
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={() => { setIsChangingPassword(false); setPasswordMessage(''); setNewPassword(''); }}
              className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={passwordLoading}
              className="flex-1 py-1.5 bg-teal-500 hover:bg-teal-400 text-white font-medium rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              {passwordLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      )}
    </div>
  )

  const renderNotificationDetails = () => (
    <div className="mt-4 space-y-4 bg-black/20 p-4 rounded-xl border border-white/5 animate-in slide-in-from-top-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-white font-medium">Push Notifications</span>
          <span className="text-xs text-gray-400">Receive alerts on your device</span>
        </div>
        <button 
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${notificationsEnabled ? 'bg-teal-500' : 'bg-gray-600'}`}
        >
          <span className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      <div className="flex items-center justify-between opacity-50">
        <div className="flex flex-col">
          <span className="text-sm text-white font-medium">Email Newsletter</span>
          <span className="text-xs text-gray-400">Weekly music updates</span>
        </div>
        <button className="w-11 h-6 rounded-full bg-gray-600 relative flex items-center cursor-not-allowed">
          <span className="w-4 h-4 rounded-full bg-white absolute translate-x-1" />
        </button>
      </div>
    </div>
  )

  const renderSettingsDetails = () => (
    <div className="mt-4 space-y-4 bg-black/20 p-4 rounded-xl border border-white/5 animate-in slide-in-from-top-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-white font-medium flex items-center gap-2"><Headphones className="w-4 h-4 text-teal-400" /> High-Quality Audio</span>
          <span className="text-xs text-gray-400">Stream at 320kbps</span>
        </div>
        <button onClick={() => setHighQualityAudio(!highQualityAudio)} className={`w-11 h-6 rounded-full relative flex items-center ${highQualityAudio ? 'bg-teal-500' : 'bg-gray-600'}`}>
          <span className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${highQualityAudio ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-white font-medium flex items-center gap-2"><Globe className="w-4 h-4 text-blue-400" /> Data Saver</span>
          <span className="text-xs text-gray-400">Lower quality on cellular network</span>
        </div>
        <button onClick={() => setDataSaver(!dataSaver)} className={`w-11 h-6 rounded-full relative flex items-center ${dataSaver ? 'bg-blue-500' : 'bg-gray-600'}`}>
          <span className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${dataSaver ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-white font-medium flex items-center gap-2"><Smartphone className="w-4 h-4 text-orange-400" /> Offline Mode</span>
          <span className="text-xs text-gray-400">Only play downloaded songs</span>
        </div>
        <button onClick={() => setOfflineMode(!offlineMode)} className={`w-11 h-6 rounded-full relative flex items-center ${offlineMode ? 'bg-orange-500' : 'bg-gray-600'}`}>
          <span className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${offlineMode ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  )

  const renderShareDetails = () => (
    <div className="mt-4 flex gap-3 animate-in slide-in-from-top-2">
      <button onClick={handleShare} className="flex-1 bg-white/5 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-xl p-3 flex flex-col items-center gap-2 transition-colors">
        <Share2 className="w-5 h-5" />
        <span className="text-xs font-medium">Share Profile</span>
      </button>
      <button onClick={() => { navigator.clipboard.writeText(window.location.origin); alert('Link copied!') }} className="flex-1 bg-white/5 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl p-3 flex flex-col items-center gap-2 transition-colors">
        <Globe className="w-5 h-5" />
        <span className="text-xs font-medium">Copy Link</span>
      </button>
    </div>
  )

  const renderHelpDetails = () => (
    <div className="mt-4 grid grid-cols-2 gap-3 animate-in slide-in-from-top-2">
      <button className="bg-white/5 hover:bg-white/10 rounded-xl p-3 text-sm text-center text-gray-300">FAQ</button>
      <button className="bg-white/5 hover:bg-white/10 rounded-xl p-3 text-sm text-center text-gray-300">Terms of Service</button>
      <button className="bg-white/5 hover:bg-white/10 rounded-xl p-3 text-sm text-center text-gray-300">Privacy Policy</button>
      <button onClick={() => window.location.href = 'mailto:support@vibe.com'} className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 rounded-xl p-3 text-sm text-center transition-colors">Contact Support</button>
    </div>
  )

  const menuItems = [
    { 
      id: 'account',
      icon: User, 
      label: 'Account', 
      description: 'Manage your profile details',
      renderDetails: renderAccountDetails
    },
    { 
      id: 'notifications',
      icon: Bell, 
      label: 'Notifications', 
      description: notificationsEnabled ? 'Push notifications are ON' : 'Push notifications are OFF',
      renderDetails: renderNotificationDetails
    },
    { 
      id: 'settings',
      icon: Settings, 
      label: 'Settings', 
      description: 'Playback and quality preferences',
      renderDetails: renderSettingsDetails
    },
    { 
      id: 'share',
      icon: Share2, 
      label: 'Share', 
      description: 'Share Vibe with friends',
      renderDetails: renderShareDetails
    },
    { 
      id: 'help',
      icon: HelpCircle, 
      label: 'Help & Support', 
      description: 'Contact us for help',
      renderDetails: renderHelpDetails
    },
  ]

  return (
    <div className="pb-40 px-4 pt-6 overflow-y-auto h-full relative bg-[#0a0f12]">
      {/* Background Patterns for Profile */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[30%] right-[-15%] w-[350px] h-[350px] bg-teal-400/5 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      </div>

      <div className="relative z-10">
        {/* Profile Header */}
        <div className="text-center mb-8 mt-4">
          <div 
            className="relative w-24 h-24 mx-auto mb-4 group cursor-pointer inline-block"
            onClick={() => {
              setExpandedSection('settings')
              setTimeout(() => {
                document.getElementById('section-settings')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }, 100)
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full scale-[1.05] opacity-50 blur-md group-hover:scale-110 group-hover:opacity-70 transition-all duration-300"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center border-2 border-[#0a0f12] shadow-xl">
              <User className="w-11 h-11 text-white opacity-90" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 border-2 border-[#0a0f12] rounded-full flex items-center justify-center shadow-lg group-hover:bg-blue-400 transition-colors">
              <Settings className="w-3 h-3 text-white group-hover:rotate-90 transition-transform duration-300" />
            </div>
          </div>
          <h1 className="text-3xl text-white font-bold mb-1 capitalize tracking-tight drop-shadow-md">{userName}</h1>
          <p className="text-teal-400/80 font-medium text-sm">{userEmail}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button 
            onClick={() => onNavigate?.('liked')}
            className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-lg hover:bg-white/10 hover:border-teal-500/30 hover:shadow-teal-500/10 transition-all duration-300 group cursor-pointer"
          >
            <p className="text-2xl text-white font-bold mb-0.5 group-hover:text-teal-400 transition-colors">{songCount}</p>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Liked</p>
          </button>
          <button 
            onClick={() => onNavigate?.('recent')}
            className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-lg hover:bg-white/10 hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer"
          >
            <p className="text-2xl text-white font-bold mb-0.5 group-hover:text-blue-400 transition-colors">{recentCount}</p>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Recent</p>
          </button>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedSection === item.id
            return (
              <div key={item.id} id={`section-${item.id}`} className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg">
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                >
                  <div className={`p-2.5 rounded-xl flex-shrink-0 transition-colors ${isExpanded ? 'bg-teal-500/20 text-teal-400' : 'bg-white/5 text-gray-400 group-hover:text-teal-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-[15px]">{item.label}</p>
                    <p className={`text-xs mt-0.5 ${item.id === 'notifications' ? (notificationsEnabled ? 'text-teal-400' : 'text-gray-400') : 'text-gray-400'}`}>
                      {item.description}
                    </p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-teal-400' : '-rotate-90'}`} />
                </button>
                {/* Expandable Content */}
                {isExpanded && (
                  <div className="px-4 pb-4">
                    {item.renderDetails()}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Logout */}
        <button 
          onClick={() => signOut()}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all mt-8 font-semibold shadow-lg hover:shadow-red-500/10"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out Securely</span>
        </button>

        {/* Version */}
        <div className="flex flex-col items-center mt-10 pb-6 opacity-60 hover:opacity-100 transition-opacity">
          <VibeLogo className="w-20 h-auto mb-3 grayscale mix-blend-luminosity hover:mix-blend-normal hover:grayscale-0 transition-all duration-500" />
          <p className="text-gray-500 text-xs font-medium tracking-widest">VERSION 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
