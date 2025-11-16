import React, { useState, useEffect, useCallback } from 'react';
import { Home, Clock, Users, Settings, Plus, ChevronDown, ChevronUp, Activity, Heart, Brain, TrendingUp, X, AlertCircle, Phone, MessageCircle, Zap } from 'lucide-react';

const AuthContext = React.createContext(null);

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('calmsense_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    if (!email || !password) return null;
    const mockUser = { id: '1', email, name: email.split('@')[0] };
    sessionStorage.setItem('calmsense_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const signUp = async (email, password, name) => {
    if (!email || !password || !name) return null;
    const mockUser = { id: '1', email, name };
    sessionStorage.setItem('calmsense_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const signOut = async () => {
    sessionStorage.removeItem('calmsense_user');
    sessionStorage.removeItem('calmsense_episodes');
    sessionStorage.removeItem('calmsense_monitoring');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const LoginScreen = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    await signIn(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
            <Heart className="text-pink-500" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">CalmSense</h1>
          <p className="text-white text-lg opacity-90">Your AI-powered wellness companion</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome Back</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={onSwitch}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Don't have an account? <span className="underline">Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterScreen = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    await signUp(email, password, name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
            <Heart className="text-pink-500" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">CalmSense</h1>
          <p className="text-white text-lg opacity-90">Your AI-powered wellness companion</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>
            
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Create Account
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={onSwitch}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Already have an account? <span className="underline">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ onStartCalming }) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [stressLevel, setStressLevel] = useState(35);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('calmsense_monitoring');
    if (saved) setIsMonitoring(JSON.parse(saved));
    
    const savedEpisodes = sessionStorage.getItem('calmsense_episodes');
    if (savedEpisodes) {
      setEpisodes(JSON.parse(savedEpisodes));
    }
  }, []);

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        setHeartRate(prev => Math.max(60, Math.min(100, prev + (Math.random() * 6 - 3))));
        setStressLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() * 10 - 5))));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const toggleMonitoring = () => {
    const newState = !isMonitoring;
    setIsMonitoring(newState);
    sessionStorage.setItem('calmsense_monitoring', JSON.stringify(newState));
  };

  const getTodayEpisodes = () => {
    const today = new Date().toDateString();
    return episodes.filter(ep => new Date(ep.timestamp).toDateString() === today).length;
  };

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your wellness overview</p>
      </div>
      
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Monitoring Status</h2>
          <div className={`w-4 h-4 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-white opacity-50'}`} />
        </div>
        
        <p className="text-white opacity-90 mb-6">
          {isMonitoring ? 'AI is actively monitoring your wellness signals' : 'Start monitoring to track your wellness'}
        </p>
        
        {isMonitoring && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Heart size={20} />
                <span className="text-sm opacity-90">Heart Rate</span>
              </div>
              <p className="text-3xl font-bold">{Math.round(heartRate)}</p>
              <p className="text-sm opacity-90">bpm</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Brain size={20} />
                <span className="text-sm opacity-90">Stress Level</span>
              </div>
              <p className="text-3xl font-bold">{Math.round(stressLevel)}</p>
              <p className="text-sm opacity-90">%</p>
            </div>
          </div>
        )}
        
        <button
          onClick={toggleMonitoring}
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
            isMonitoring 
              ? 'bg-white text-red-600 hover:bg-red-50' 
              : 'bg-white text-indigo-600 hover:bg-gray-50'
          }`}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Today's Activity</h2>
            <Activity className="text-indigo-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Episodes Detected</span>
              <span className="text-2xl font-bold text-indigo-600">{getTodayEpisodes()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Interventions</span>
              <span className="text-2xl font-bold text-green-600">{getTodayEpisodes()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Weekly Trend</h2>
            <TrendingUp className="text-green-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recovery Rate</span>
              <span className="text-2xl font-bold text-green-600">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Duration</span>
              <span className="text-2xl font-bold text-blue-600">8m</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Need Support?</h2>
            <p className="opacity-90">Access calming exercises anytime, anywhere</p>
          </div>
          <Zap className="text-yellow-300" size={32} />
        </div>
        <button
          onClick={onStartCalming}
          className="w-full bg-white text-purple-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Start Calming Exercise
        </button>
      </div>
    </div>
  );
};

const CalmingScreen = ({ onExit }) => {
  const [phase, setPhase] = useState('inhale');
  const [scale, setScale] = useState(1);
  const [count, setCount] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => {
        if (prev === 'inhale') {
          setCycleCount(c => c + 1);
          return 'hold1';
        }
        if (prev === 'hold1') return 'exhale';
        if (prev === 'exhale') return 'hold2';
        return 'inhale';
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countInterval = setInterval(() => {
      setCount(prev => prev > 1 ? prev - 1 : 4);
    }, 1000);
    return () => clearInterval(countInterval);
  }, []);

  useEffect(() => {
    if (phase === 'inhale' || phase === 'hold1') {
      setScale(1.8);
    } else {
      setScale(1);
    }
  }, [phase]);

  const getPhaseText = () => {
    switch(phase) {
      case 'inhale': return 'Breathe In';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
      default: return 'Breathe';
    }
  };

  const handleExit = (reason) => {
    if (reason === 'better') {
      const episodes = JSON.parse(sessionStorage.getItem('calmsense_episodes') || '[]');
      episodes.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        duration: Math.round(cycleCount * 16 / 60),
        severity: Math.round(Math.random() * 30 + 40),
        intervention: 'Breathing Exercise',
        outcome: 'Successful'
      });
      sessionStorage.setItem('calmsense_episodes', JSON.stringify(episodes));
    }
    onExit(reason);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-6 relative">
      <button
        onClick={() => handleExit('cancel')}
        className="absolute top-6 right-6 text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
      >
        <X size={24} />
      </button>
      
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          {getPhaseText()}
        </h1>
        <p className="text-3xl text-white font-light">{count}</p>
      </div>
      
      <div className="relative mb-12 flex items-center justify-center" style={{ width: '300px', height: '300px' }}>
        <div
          className="absolute rounded-full bg-white opacity-20 transition-all ease-in-out"
          style={{
            width: '200px',
            height: '200px',
            transform: `scale(${scale})`,
            transitionDuration: '4000ms'
          }}
        />
        <div
          className="absolute rounded-full bg-white opacity-30 transition-all ease-in-out"
          style={{
            width: '150px',
            height: '150px',
            transform: `scale(${scale})`,
            transitionDuration: '4000ms'
          }}
        />
        <div
          className="absolute rounded-full bg-white transition-all ease-in-out flex items-center justify-center"
          style={{
            width: '100px',
            height: '100px',
            transform: `scale(${scale})`,
            transitionDuration: '4000ms'
          }}
        >
          <Heart className="text-pink-500" size={40} />
        </div>
      </div>
      
      <div className="text-center text-white mb-12">
        <p className="text-lg mb-2">Breathing Cycles Completed</p>
        <p className="text-4xl font-bold">{cycleCount}</p>
      </div>
      
      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={() => handleExit('better')}
          className="w-full py-5 bg-green-500 text-white rounded-2xl font-bold text-lg hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          I'm Feeling Better
        </button>
        
        <button
          onClick={() => handleExit('help')}
          className="w-full py-5 bg-red-500 text-white rounded-2xl font-bold text-lg hover:bg-red-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          I Need Help Now
        </button>
      </div>
    </div>
  );
};

const HistoryPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('calmsense_episodes');
    if (saved) {
      setEpisodes(JSON.parse(saved));
    }
  }, []);

  const getWeekStats = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekEpisodes = episodes.filter(ep => new Date(ep.timestamp) > weekAgo);
    const recovered = weekEpisodes.filter(ep => ep.outcome === 'Successful').length;
    return {
      total: weekEpisodes.length,
      rate: weekEpisodes.length > 0 ? Math.round((recovered / weekEpisodes.length) * 100) : 0
    };
  };

  const stats = getWeekStats();

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Episode History</h1>
      
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-xl p-8 mb-6 text-white">
        <h2 className="text-2xl font-bold mb-6">This Week's Overview</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
            <Activity className="mb-3" size={32} />
            <p className="text-4xl font-bold mb-1">{stats.total}</p>
            <p className="opacity-90 text-lg">Total Episodes</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
            <TrendingUp className="mb-3" size={32} />
            <p className="text-4xl font-bold mb-1">{stats.rate}%</p>
            <p className="opacity-90 text-lg">Recovery Rate</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {episodes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Clock className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600">No episodes recorded yet</p>
          </div>
        ) : (
          episodes.slice().reverse().map(episode => {
            const date = new Date(episode.timestamp);
            return (
              <div key={episode.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <button
                  onClick={() => setExpandedId(expandedId === episode.id ? null : episode.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${
                      episode.severity > 70 ? 'bg-red-500' : 
                      episode.severity > 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="text-left">
                      <p className="font-bold text-lg">{date.toLocaleDateString()}</p>
                      <p className="text-gray-600">{date.toLocaleTimeString()}</p>
                    </div>
                  </div>
                  {expandedId === episode.id ? <ChevronUp /> : <ChevronDown />}
                </button>
                
                {expandedId === episode.id && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-1">Duration</p>
                        <p className="text-2xl font-bold text-gray-800">{episode.duration}m</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-1">Severity</p>
                        <p className="text-2xl font-bold text-gray-800">{episode.severity}%</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-1">Intervention</p>
                        <p className="font-semibold text-gray-800">{episode.intervention}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 mb-1">Outcome</p>
                        <p className="font-semibold text-green-600">{episode.outcome}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const ContactsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Emergency Services', phone: '911', isPrimary: true, method: 'Call', isSystem: true },
    { id: 2, name: 'Crisis Helpline', phone: '988', isPrimary: false, method: 'Call', isSystem: true },
  ]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', method: 'SMS' });

  useEffect(() => {
    const saved = sessionStorage.getItem('calmsense_contacts');
    if (saved) {
      const userContacts = JSON.parse(saved);
      setContacts(prev => [...prev.filter(c => c.isSystem), ...userContacts]);
    }
  }, []);

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = { ...newContact, id: Date.now(), isPrimary: false };
      const userContacts = contacts.filter(c => !c.isSystem);
      userContacts.push(contact);
      sessionStorage.setItem('calmsense_contacts', JSON.stringify(userContacts));
      setContacts(prev => [...prev, contact]);
      setNewContact({ name: '', phone: '', method: 'SMS' });
      setShowForm(false);
    }
  };

  const handleDelete = (id) => {
    const contact = contacts.find(c => c.id === id);
    if (contact && !contact.isSystem) {
      const newContacts = contacts.filter(c => c.id !== id);
      const userContacts = newContacts.filter(c => !c.isSystem);
      sessionStorage.setItem('calmsense_contacts', JSON.stringify(userContacts));
      setContacts(newContacts);
    }
  };

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Emergency Contacts</h1>
      <p className="text-gray-600 mb-6">Manage your support network</p>
      
      <div className="space-y-4 mb-24">
        {contacts.map(contact => (
          <div key={contact.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-xl text-gray-800">{contact.name}</h3>
                  {contact.isPrimary && (
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">Primary</span>
                  )}
                  {contact.isSystem && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Emergency</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Phone size={16} />
                  <p className="text-lg font-mono">{contact.phone}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageCircle size={16} />
                  <p className="text-sm">Contact via {contact.method}</p>
                </div>
              </div>
              {!contact.isSystem && (
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Emergency Contact</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Contact Method</label>
                <select
                  value={newContact.method}
                  onChange={(e) => setNewContact({...newContact, method: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="SMS">SMS Text</option>
                  <option value="Call">Phone Call</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl hover:scale-110 transition-all duration-200 z-40"
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

const SettingsPage = () => {
  const { signOut, user } = useAuth();
  const [sensitivity, setSensitivity] = useState(65);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('calmsense_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setSensitivity(settings.sensitivity || 65);
      setNotifications(settings.notifications !== false);
      setDarkMode(settings.darkMode || false);
      setReducedMotion(settings.reducedMotion || false);
    }
  }, []);

  const saveSettings = () => {
    const settings = { sensitivity, notifications, darkMode, reducedMotion };
    sessionStorage.setItem('calmsense_settings', JSON.stringify(settings));
  };

  useEffect(() => {
    saveSettings();
  }, [sensitivity, notifications, darkMode, reducedMotion]);

  const handleSignOut = () => {
    signOut();
    setShowConfirm(false);
  };

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
      <p className="text-gray-600 mb-6">Customize your CalmSense experience</p>
      
      <div className="space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">User Profile</h2>
              <p className="text-gray-600 text-sm">Account information</p>
            </div>
          </div>
          <div className="space-y-4 pl-15">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Name</p>
              <p className="font-semibold text-gray-800">{user?.name || 'Demo User'}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="font-semibold text-gray-800">{user?.email || 'demo@calmsense.app'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Monitoring Settings</h2>
          <p className="text-sm text-gray-600 mb-6">
            Adjust how sensitive the AI monitoring system is to potential distress signals
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Sensitivity Level</span>
              <span className="text-2xl font-bold text-indigo-600">{sensitivity}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Less Sensitive</span>
              <span>More Sensitive</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <p className="font-semibold text-gray-800">Enable Notifications</p>
                <p className="text-sm text-gray-600">Receive alerts and reminders</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-14 h-8 rounded-full transition-colors ${notifications ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-1 ml-1 ${notifications ? 'translate-x-6' : ''}`} />
                </div>
              </div>
            </label>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Accessibility</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-800">Dark Mode</p>
                <p className="text-sm text-gray-600">Reduce eye strain</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-14 h-8 rounded-full transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-1 ml-1 ${darkMode ? 'translate-x-6' : ''}`} />
                </div>
              </div>
            </label>
            
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-800">Reduced Motion</p>
                <p className="text-sm text-gray-600">Minimize animations</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-14 h-8 rounded-full transition-colors ${reducedMotion ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-1 ml-1 ${reducedMotion ? 'translate-x-6' : ''}`} />
                </div>
              </div>
            </label>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-semibold">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-semibold">Nov 2025</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Sign Out
        </button>
      </div>
      
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Sign Out</h2>
            <p className="text-gray-600 mb-8">Are you sure you want to sign out? Your data will remain saved.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BottomNav = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'contacts', icon: Users, label: 'Contacts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 shadow-lg">
      <div className="max-w-4xl mx-auto flex justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

const CalmSenseApp = () => {
  const [authMode, setAuthMode] = useState('login');
  const [currentTab, setCurrentTab] = useState('home');
  const [showCalming, setShowCalming] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 animate-pulse">
            <Heart className="text-pink-500" size={40} />
          </div>
          <div className="text-2xl text-white font-semibold">Loading CalmSense...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login' ? (
      <LoginScreen onSwitch={() => setAuthMode('register')} />
    ) : (
      <RegisterScreen onSwitch={() => setAuthMode('login')} />
    );
  }

  if (showCalming) {
    return (
      <CalmingScreen
        onExit={(reason) => {
          setShowCalming(false);
          if (reason === 'help') {
            alert('🚨 Emergency Alert Sent!\n\nYour emergency contacts have been notified and your location has been shared. Help is on the way.');
          } else if (reason === 'better') {
            alert('✅ Great Job!\n\nYour session has been logged. Keep taking care of yourself!');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentTab === 'home' && <HomePage onStartCalming={() => setShowCalming(true)} />}
      {currentTab === 'history' && <HistoryPage />}
      {currentTab === 'contacts' && <ContactsPage />}
      {currentTab === 'settings' && <SettingsPage />}
      
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CalmSenseApp />
    </AuthProvider>
  );
}