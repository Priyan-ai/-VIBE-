import { useState, FormEvent, ChangeEvent } from 'react'
import { useAuth } from '../../../src/context/AuthContext'
import { Disc3 } from 'lucide-react'

export function AuthScreen() {
  const { signIn, signUp, error } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4 overflow-hidden relative font-sans">
      {/* Background styling for a neat, creative vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />
      
      {/* Subtle animated blurs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000" />

      <div className="w-full max-w-md relative z-10 bg-neutral-900/40 p-10 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="text-center flex flex-col items-center mb-8">
          <div className="bg-white/5 p-4 rounded-2xl mb-6 shadow-inner border border-white/5">
            <Disc3 className="w-12 h-12 text-cyan-400 animate-[spin_4s_linear_infinite]" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Vibe</h1>
          <p className="text-neutral-400 font-medium">{isSignUp ? 'Create your account' : 'Welcome back'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-2 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold text-base transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  )
}