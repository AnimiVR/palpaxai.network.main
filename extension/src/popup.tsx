import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Icon components
const Search = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-glow">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const TrendingUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-glow">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const Users = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-glow">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Zap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-pulse">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ExternalLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Clock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-glow">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BarChart3 = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-glow">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const Sparkles = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="18 6 12 12 6 18" />
    <polyline points="18 6 12 0 6 6" />
  </svg>
);

const TrendingDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="6 18 12 12 18 6" />
    <polyline points="6 18 12 24 18 18" />
  </svg>
);

const SolanaLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="solana-logo-icon" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="solTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00d4aa" stopOpacity="1" />
        <stop offset="50%" stopColor="#00c2ff" stopOpacity="1" />
        <stop offset="100%" stopColor="#5b6bff" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="solMiddleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#9945ff" stopOpacity="1" />
        <stop offset="50%" stopColor="#b865ff" stopOpacity="1" />
        <stop offset="100%" stopColor="#d47fff" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="solBottomGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#5b6bff" stopOpacity="1" />
        <stop offset="50%" stopColor="#7b7bff" stopOpacity="1" />
        <stop offset="100%" stopColor="#9945ff" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path d="M4 15.5 L20 13 L20 17 L4 19.5 Z" fill="url(#solBottomGradient)" transform="translate(-0.5, 0)" />
    <path d="M3 10.5 L19 8 L19 12 L3 14.5 Z" fill="url(#solMiddleGradient)" />
    <path d="M5 5.5 L21 3 L21 7 L5 9.5 Z" fill="url(#solTopGradient)" transform="translate(0.5, 0)" />
  </svg>
);

const History = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

const LayoutDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const Briefcase = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const FileText = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const MessageSquare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Wallet = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const Activity = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const Plug = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22v-5" />
    <path d="M9 7V2" />
    <path d="M15 7V2" />
    <path d="M6 13V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v5" />
    <rect x="2" y="13" width="20" height="5" rx="2" />
  </svg>
);

const Settings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3m15.364 6.364l-4.243-4.243m-4.242 0L5.636 17.364M18.364 6.636l-4.243 4.243m-4.242 0L5.636 6.636" />
  </svg>
);

const Twitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Send = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const Copy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Interfaces
interface Stats {
  totalAgents: number;
  totalTransactions: number;
  avgResponseTime: string;
  totalRevenue: string;
}

interface SolPrice {
  price: number;
  change24h: number;
  loading: boolean;
  lastUpdate: Date | null;
}

interface Agent {
  id: string;
  title: string;
  price: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  verified: boolean;
}

interface Transaction {
  id: string;
  agent: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  time: string;
}

// Mock data
const allAgents: Agent[] = [
  { id: '1', title: 'Web Development Agent', price: '0.5 SOL', category: 'Development', rating: 4.9, reviews: 127, image: '👨‍💻', verified: true },
  { id: '2', title: 'Design Specialist Agent', price: '0.3 SOL', category: 'Design', rating: 4.8, reviews: 89, image: '🎨', verified: true },
  { id: '3', title: 'Content Writing Agent', price: '0.2 SOL', category: 'Writing', rating: 4.7, reviews: 156, image: '✍️', verified: true },
  { id: '4', title: 'Data Analysis Agent', price: '0.6 SOL', category: 'Analytics', rating: 4.9, reviews: 56, image: '📊', verified: true },
  { id: '5', title: 'Social Media Manager', price: '0.4 SOL', category: 'Marketing', rating: 4.6, reviews: 203, image: '📱', verified: true },
  { id: '6', title: 'Customer Support Bot', price: '0.25 SOL', category: 'Support', rating: 4.8, reviews: 312, image: '💬', verified: true },
  { id: '7', title: 'Blockchain Developer', price: '0.8 SOL', category: 'Development', rating: 4.9, reviews: 234, image: '⛓️', verified: true },
  { id: '8', title: 'UI/UX Designer', price: '0.35 SOL', category: 'Design', rating: 4.9, reviews: 178, image: '🎨', verified: true },
  { id: '9', title: 'SEO Specialist', price: '0.45 SOL', category: 'Marketing', rating: 4.7, reviews: 145, image: '📈', verified: true },
  { id: '10', title: 'Smart Contract Auditor', price: '1.0 SOL', category: 'Development', rating: 5.0, reviews: 89, image: '🔒', verified: true },
  { id: '11', title: 'AI Integration Expert', price: '0.7 SOL', category: 'Development', rating: 4.8, reviews: 167, image: '🤖', verified: true },
  { id: '12', title: 'Technical Writer', price: '0.3 SOL', category: 'Writing', rating: 4.6, reviews: 134, image: '📝', verified: true },
];

const featuredAgents: Agent[] = [
  allAgents[0], allAgents[1], allAgents[6], allAgents[3]
];

const recentTransactions: Transaction[] = [
  { id: 'tx1', agent: 'Web Development Agent', amount: '0.5 SOL', status: 'completed', time: '2 hours ago' },
  { id: 'tx2', agent: 'Design Specialist Agent', amount: '0.3 SOL', status: 'completed', time: '5 hours ago' },
  { id: 'tx3', agent: 'Content Writing Agent', amount: '0.2 SOL', status: 'pending', time: '1 day ago' },
];

type TabType = 'home' | 'marketplace' | 'dashboard' | 'services' | 'analytics' | 'contracts' | 'clients' | 'chat' | 'wallet' | 'performance' | 'integrations' | 'settings';

function Popup() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>('https://palpaxai.network');
  const dashboardUrl = 'https://palpaxai.network/dashboard';
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletBalance, setWalletBalance] = useState<string>('0.0000');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<Stats>({
    totalAgents: 234,
    totalTransactions: 1247,
    avgResponseTime: '<1s',
    totalRevenue: '623.5 SOL',
  });
  const [solPrice, setSolPrice] = useState<SolPrice>({
    price: 0,
    change24h: 0,
    loading: true,
    lastUpdate: null,
  });
  const [timeSinceUpdate, setTimeSinceUpdate] = useState<number>(0);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);

  // Icon for header (uses packaged icon file)
  const iconUrl = chrome.runtime.getURL('icons/icon48.png');

  useEffect(() => {
    loadStats();
    fetchSolPrice();
    loadWalletStatus();
    
    const priceInterval = setInterval(fetchSolPrice, 30000);
    const timeInterval = setInterval(() => {
      if (solPrice.lastUpdate) {
        setTimeSinceUpdate(Math.floor((Date.now() - solPrice.lastUpdate.getTime()) / 1000));
      }
    }, 1000);
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        try {
          const url = new URL(tabs[0].url);
          const host = url.host.toLowerCase();
          // If user is already on PalPaxAI domain, use it; if on localhost dev, map to that; otherwise default to production
          if (host.includes('palpaxai.network')) {
            setBaseUrl('https://palpaxai.network');
          } else if (host.includes('PalPaxAI.xyz')) {
            setBaseUrl('https://palpaxai.network');
          } else if (host.includes('localhost:3000') || host.includes('127.0.0.1:3000')) {
            setBaseUrl('http://localhost:3000');
          } else if (host.includes('localhost:3001') || host.includes('127.0.0.1:3001')) {
            setBaseUrl('http://localhost:3001');
          } else {
            setBaseUrl('https://palpaxai.network');
          }
        } catch {
          setBaseUrl('https://palpaxai.network');
        }
      }
    });

    return () => {
      clearInterval(priceInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const loadWalletStatus = () => {
    chrome.runtime.sendMessage({ action: 'getWalletStatus' }, (response) => {
      if (response) {
        setWalletConnected(response.connected || false);
        setWalletAddress(response.address || '');
      }
    });
  };

  const handleConnectWallet = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'connectWallet' }, (response) => {
          if (response?.success) {
            setWalletConnected(true);
            setWalletAddress(response.publicKey || '');
            chrome.runtime.sendMessage({
              action: 'updateWalletStatus',
              connected: true,
              address: response.publicKey || ''
            });
          } else if (response?.error) {
            // If error, try to open wallet installation
            chrome.runtime.sendMessage({ action: 'openPhantomInstall' });
          }
        });
      }
    });
  };

  const handleDisconnectWallet = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'disconnectWallet' }, () => {
          setWalletConnected(false);
          setWalletAddress('');
          chrome.runtime.sendMessage({ action: 'clearWalletStatus' });
        });
      } else {
        // If no active tab, just clear storage
        setWalletConnected(false);
        setWalletAddress('');
        chrome.runtime.sendMessage({ action: 'clearWalletStatus' });
      }
    });
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (solPrice.lastUpdate) {
      setTimeSinceUpdate(Math.floor((Date.now() - solPrice.lastUpdate.getTime()) / 1000));
    }
    if (solPrice.price > 0) {
      setPriceHistory(prev => {
        const newHistory = [...prev, solPrice.price];
        return newHistory.slice(-10); // Keep last 10 prices
      });
    }
  }, [solPrice.lastUpdate, solPrice.price]);

  const fetchSolPrice = async () => {
    try {
      setSolPrice(prev => ({ ...prev, loading: true }));
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true');
      const data = await response.json();
      
      if (data.solana) {
        setSolPrice({
          price: data.solana.usd,
          change24h: data.solana.usd_24h_change || 0,
          loading: false,
          lastUpdate: new Date(),
        });
      }
    } catch (error) {
      console.error('Error fetching SOL price:', error);
      setSolPrice(prev => ({ ...prev, loading: false }));
    }
  };

  const loadStats = async () => {
    setStats({
      totalAgents: 234,
      totalTransactions: 1247,
      avgResponseTime: '<1s',
      totalRevenue: '623.5 SOL',
    });
  };

  const handleQuickAction = (url: string) => {
    chrome.tabs.create({ url });
  };

  // Filter agents based on search query and selected category
  const filteredAgents = allAgents.filter((agent) => {
    const matchesSearch = searchQuery === '' || 
      agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
    setSearchQuery(''); // Clear search when selecting category
  };

  const handleAgentClick = (agentId: string) => {
    handleQuickAction(`${baseUrl}/marketplace/${agentId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const renderMiniChart = () => {
    if (priceHistory.length < 2) return null;
    const max = Math.max(...priceHistory);
    const min = Math.min(...priceHistory);
    const range = max - min || 1;
    const points = priceHistory.map((price, idx) => {
      const x = (idx / (priceHistory.length - 1)) * 100;
      const y = 100 - ((price - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg className="mini-chart" viewBox="0 0 100 40" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={solPrice.change24h >= 0 ? '#14f195' : '#ff6b6b'}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="extension-container">
      <div className="background-mesh">
        <div className="mesh-gradient"></div>
      </div>

      <div className="header-glass">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <img src={iconUrl} alt="PalPaxAI" width={28} height={28} />
            </div>
            <div className="logo-text">
              <h1>PalPaxAI</h1>
              <p>Solana-first x402 facilitator</p>
            </div>
          </div>
          <button
            className="external-link-btn"
            onClick={() => handleQuickAction('https://palpaxai.network')}
            title="Open PalPaxAI Website"
          >
            <ExternalLink />
          </button>
        </div>
        <div className="header-accent"></div>
      </div>

      <div className="tabs-container scrollable-tabs">
        {([
          { id: 'home', label: 'Home', icon: LayoutDashboard },
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'marketplace', label: 'Marketplace', icon: Search },
          { id: 'services', label: 'Services', icon: Briefcase },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'contracts', label: 'Contracts', icon: FileText },
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'chat', label: 'Chat', icon: MessageSquare },
          { id: 'wallet', label: 'Wallet', icon: Wallet },
          { id: 'performance', label: 'Performance', icon: Activity },
          { id: 'integrations', label: 'Integrations', icon: Plug },
          { id: 'settings', label: 'Settings', icon: Settings },
        ] as const).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as TabType)}
              title={tab.label}
            >
              <Icon />
              <span className="tab-label">{tab.label}</span>
              {activeTab === tab.id && <div className="tab-indicator"></div>}
            </button>
          );
        })}
      </div>

      <div className="content-area">
        {activeTab === 'home' && (
          <div className="home-content">
            {/* SOL Price Widget with Mini Chart */}
            <div className="sol-price-widget">
              <div className="sol-price-header">
                <div className="sol-logo">
                  <SolanaLogo />
                  <span>SOL</span>
                </div>
                <div className="sol-update-indicator">
                  {solPrice.loading && <div className="loading-spinner"></div>}
                  {!solPrice.loading && solPrice.lastUpdate && (
                    <span className="last-update">{timeSinceUpdate}s ago</span>
                  )}
                </div>
              </div>
              <div className="sol-price-content">
                {solPrice.loading ? (
                  <div className="sol-price-loading">Loading...</div>
                ) : (
                  <>
                    <div className="sol-price-value">{formatPrice(solPrice.price)}</div>
                    <div className="sol-price-change-wrapper">
                      <div className={`sol-price-change ${solPrice.change24h >= 0 ? 'positive' : 'negative'}`}>
                        {solPrice.change24h >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        <span>{formatChange(solPrice.change24h)}</span>
                        <span className="change-label">24h</span>
                      </div>
                      {priceHistory.length >= 2 && (
                        <div className="mini-chart-wrapper">
                          {renderMiniChart()}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="sol-price-glow"></div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                  <Users />
                </div>
                <div className="stat-value">{stats.totalAgents}</div>
                <div className="stat-label">Agents</div>
                <div className="stat-glow"></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}>
                  <BarChart3 />
                </div>
                <div className="stat-value">{stats.totalTransactions.toLocaleString()}</div>
                <div className="stat-label">Transactions</div>
                <div className="stat-glow"></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                  <Clock />
                </div>
                <div className="stat-value">{stats.avgResponseTime}</div>
                <div className="stat-label">Speed</div>
                <div className="stat-glow"></div>
              </div>
            </div>

            {/* Featured Agents */}
            <div className="featured-section">
              <div className="section-header">
                <Sparkles />
                <h3>Featured Agents</h3>
                <button 
                  className="view-all-btn"
                  onClick={() => handleQuickAction(`${baseUrl}/marketplace`)}
                >
                  View All
                  <ExternalLink />
                </button>
              </div>
              <div className="agents-list">
                {featuredAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="agent-card"
                    onClick={() => handleQuickAction(`${baseUrl}/marketplace?agent=${agent.id}`)}
                  >
                    <div className="agent-emoji">{agent.image}</div>
                    <div className="agent-info">
                      <div className="agent-title-row">
                        <span className="agent-title">{agent.title}</span>
                        {agent.verified && <span className="verified-badge">✓</span>}
                      </div>
                      <div className="agent-meta">
                        <span className="agent-category">{agent.category}</span>
                        <div className="agent-rating">
                          <Star />
                          <span>{agent.rating}</span>
                          <span className="reviews">({agent.reviews})</span>
                        </div>
                      </div>
                      <div className="agent-price">{agent.price}</div>
                    </div>
                    <ExternalLink />
                    <div className="agent-hover-effect"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="transactions-section">
              <div className="section-header">
                <History />
                <h3>Recent Activity</h3>
              </div>
              <div className="transactions-list">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className={`transaction-item ${tx.status}`}>
                    <div className="transaction-icon">{tx.status === 'completed' ? '✓' : tx.status === 'pending' ? '⏳' : '✗'}</div>
                    <div className="transaction-details">
                      <div className="transaction-agent">{tx.agent}</div>
                      <div className="transaction-meta">
                        <span className="transaction-amount">{tx.amount}</span>
                        <span className="transaction-time">{tx.time}</span>
                      </div>
                    </div>
                    <div className={`transaction-status ${tx.status}`}>{tx.status}</div>
                  </div>
                ))}
              </div>
              <button 
                className="view-transactions-btn"
                onClick={() => handleQuickAction(dashboardUrl)}
              >
                View All Transactions
                <ExternalLink />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <div className="section-header">
                <Sparkles />
                <h3>Quick Actions</h3>
              </div>
              <div className="actions-list">
                {[
                  { icon: TrendingUp, title: 'Dashboard', desc: 'View your activity', path: dashboardUrl, gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
                  { icon: Search, title: 'Browse Marketplace', desc: 'Find AI agents', path: '/marketplace', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' },
                ].map((action, idx) => {
                  const url = action.path.startsWith('http') ? action.path : `${baseUrl}${action.path}`;
                  return (
                    <button
                      key={idx}
                      className="action-card"
                      onClick={() => handleQuickAction(url)}
                    >
                      <div className="action-icon-wrapper" style={{ background: action.gradient }}>
                        <action.icon />
                      </div>
                      <div className="action-content">
                        <div className="action-title">{action.title}</div>
                        <div className="action-desc">{action.desc}</div>
                      </div>
                      <ExternalLink />
                      <div className="action-hover-effect"></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="marketplace-content">
            <div className="search-wrapper">
              <div className="search-icon">
                <Search />
              </div>
              <input
                type="text"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI agents..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Filter is handled automatically by filteredAgents
                    setSelectedCategory(null); // Clear category filter when searching
                  }
                }}
              />
              <div className="search-glow"></div>
            </div>

            <div className="categories-section">
              <div className="section-header">
                <Sparkles />
                <h3>Browse Categories</h3>
                {selectedCategory && (
                  <button 
                    className="clear-filter-btn"
                    onClick={() => setSelectedCategory(null)}
                    title="Clear filter"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="categories-grid">
                {[
                  { name: 'Development', color: '#6366f1', icon: '👨‍💻' },
                  { name: 'Design', color: '#8b5cf6', icon: '🎨' },
                  { name: 'Writing', color: '#ec4899', icon: '✍️' },
                  { name: 'Analytics', color: '#3b82f6', icon: '📊' },
                  { name: 'Marketing', color: '#10b981', icon: '📱' },
                  { name: 'Support', color: '#f59e0b', icon: '💬' },
                ].map((cat, idx) => (
                  <button
                    key={idx}
                    className={`category-card ${selectedCategory === cat.name ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.name)}
                    style={{ '--category-color': cat.color } as React.CSSProperties}
                  >
                    <span className="category-icon">{cat.icon}</span>
                    <span>{cat.name}</span>
                    <div className="category-hover-glow"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Agents List */}
            <div className="agents-section">
              <div className="section-header">
                <Users />
                <h3>
                  {selectedCategory ? `${selectedCategory} Agents` : 'All Agents'}
                  {filteredAgents.length > 0 && (
                    <span className="agents-count">({filteredAgents.length})</span>
                  )}
                </h3>
              </div>
              {filteredAgents.length === 0 ? (
                <div className="no-agents">
                  <p>No agents found matching your search.</p>
                  <button 
                    className="clear-search-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="agents-list">
                  {filteredAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className="agent-card"
                      onClick={() => handleAgentClick(agent.id)}
                    >
                      <div className="agent-emoji">{agent.image}</div>
                      <div className="agent-info">
                        <div className="agent-title-row">
                          <span className="agent-title">{agent.title}</span>
                          {agent.verified && <span className="verified-badge">✓</span>}
                        </div>
                        <div className="agent-meta">
                          <span className="agent-category">{agent.category}</span>
                          <div className="agent-rating">
                            <Star />
                            <span>{agent.rating}</span>
                            <span className="reviews">({agent.reviews})</span>
                          </div>
                        </div>
                        <div className="agent-price">{agent.price}</div>
                      </div>
                      <ExternalLink />
                      <div className="agent-hover-effect"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trending Categories */}
            <div className="trending-section">
              <div className="section-header">
                <TrendingUp />
                <h3>Trending Now</h3>
              </div>
              <div className="trending-tags">
                {['Blockchain Development', 'AI Integration', 'Smart Contracts', 'Web3 Tools'].map((tag, idx) => (
                  <button
                    key={idx}
                    className="trending-tag"
                    onClick={() => handleQuickAction(`${baseUrl}/marketplace?search=${encodeURIComponent(tag)}`)}
                  >
                    <TrendingUp />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="tab-content">
            <div className="stats-grid compact">
              <div className="stat-card">
                <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                  <TrendingUp />
                </div>
                <div className="stat-value">$12,345</div>
                <div className="stat-label">Revenue</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}>
                  <Briefcase />
                </div>
                <div className="stat-value">24</div>
                <div className="stat-label">Services</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                  <Users />
                </div>
                <div className="stat-value">156</div>
                <div className="stat-label">Clients</div>
              </div>
            </div>
            <button className="full-width-btn" onClick={() => handleQuickAction(dashboardUrl)}>
              Open Full Dashboard <ExternalLink />
            </button>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="tab-content">
            <div className="section-header">
              <Briefcase />
              <h3>My Services</h3>
            </div>
            <div className="compact-list">
              {[
                { id: 1, title: 'Service 1', price: '0.05 SOL', status: 'Active' },
                { id: 2, title: 'Service 2', price: '0.03 SOL', status: 'Active' },
                { id: 3, title: 'Service 3', price: '0.07 SOL', status: 'Active' },
              ].map((service) => (
                <div key={service.id} className="compact-item">
                  <div className="item-info">
                    <span className="item-title">{service.title}</span>
                    <span className="item-meta">{service.price} • {service.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="full-width-btn" onClick={() => handleQuickAction(`${dashboardUrl}/services`)}>
              Manage All Services <ExternalLink />
            </button>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="tab-content">
            {!walletConnected ? (
              <div className="connect-prompt">
                <Wallet />
                <h3>Connect Your Wallet</h3>
                <p>Connect your wallet to view analytics</p>
                <button className="primary-btn" onClick={handleConnectWallet}>
                  Connect Wallet
                </button>
              </div>
            ) : (
              <>
                <div className="stats-grid compact">
                  <div className="stat-card">
                    <div className="stat-value">$0</div>
                    <div className="stat-label">Revenue</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">0</div>
                    <div className="stat-label">Transactions</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">0</div>
                    <div className="stat-label">Users</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">0%</div>
                    <div className="stat-label">Growth</div>
                  </div>
                </div>
                <button className="full-width-btn" onClick={() => handleQuickAction(`${dashboardUrl}/analytics`)}>
                  View Full Analytics <ExternalLink />
                </button>
              </>
            )}
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div className="tab-content">
            <div className="section-header">
              <FileText />
              <h3>Contracts</h3>
            </div>
            <div className="compact-list">
              {[
                { id: 1, title: 'Contract 1', amount: '0.05 SOL', status: 'Active' },
                { id: 2, title: 'Contract 2', amount: '0.03 SOL', status: 'Active' },
              ].map((contract) => (
                <div key={contract.id} className="compact-item">
                  <div className="item-info">
                    <span className="item-title">{contract.title}</span>
                    <span className="item-meta">{contract.amount} • {contract.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="full-width-btn" onClick={() => handleQuickAction(`${dashboardUrl}/contracts`)}>
              Manage All Contracts <ExternalLink />
            </button>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="tab-content">
            {!walletConnected ? (
              <div className="connect-prompt">
                <Wallet />
                <h3>Connect Your Wallet</h3>
                <p>Connect your wallet to manage clients</p>
                <button className="primary-btn" onClick={handleConnectWallet}>
                  Connect Wallet
                </button>
              </div>
            ) : (
              <>
                <div className="section-header">
                  <Users />
                  <h3>Clients</h3>
                </div>
                <div className="empty-state">
                  <p>No clients found. Connect your wallet to get started.</p>
                </div>
                <button className="full-width-btn" onClick={() => handleQuickAction(`${dashboardUrl}/clients`)}>
                  Manage All Clients <ExternalLink />
                </button>
              </>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="tab-content">
            <div className="section-header">
              <MessageSquare />
              <h3>AI Assistant</h3>
            </div>
            <div className="chat-placeholder">
              <MessageSquare />
              <p>Start a conversation</p>
            </div>
            <button className="primary-btn full-width-btn" onClick={() => handleQuickAction(`${dashboardUrl}/chat`)}>
              Open Full Chat <ExternalLink />
            </button>
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="tab-content">
            {!walletConnected || !walletAddress ? (
              <div className="connect-prompt">
                <Wallet />
                <h3>Connect Your Wallet</h3>
                <p>Connect your Solana wallet to get started</p>
                <button className="primary-btn" onClick={handleConnectWallet}>
                  Connect Wallet
                </button>
              </div>
            ) : (
              <>
                <div className="wallet-info-card">
                  <div className="wallet-balance">
                    <span className="balance-value">{walletBalance}</span>
                    <span className="balance-label">SOL</span>
                  </div>
                </div>
                <div className="wallet-actions">
                  <button className="wallet-action-btn" onClick={() => handleQuickAction(`${dashboardUrl}/wallet`)}>
                    <Send />
                    <span>Send</span>
                  </button>
                  <button className="wallet-action-btn" onClick={() => handleQuickAction(`${dashboardUrl}/wallet`)}>
                    <ArrowDown />
                    <span>Receive</span>
                  </button>
                </div>
                <div className="wallet-address-card">
                  <div className="section-header">
                    <span>Wallet Address</span>
                  </div>
                  <div className="address-row">
                    <code className="wallet-address">
                      {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                    </code>
                    <button className="icon-btn" onClick={handleCopyAddress} title="Copy address">
                      {copied ? <CheckCircle /> : <Copy />}
                    </button>
                  </div>
                </div>
                <button className="secondary-btn full-width-btn" onClick={handleDisconnectWallet}>
                  Disconnect
                </button>
                <button className="full-width-btn" onClick={() => handleQuickAction(`${dashboardUrl}/wallet`)}>
                  Open Full Wallet <ExternalLink />
                </button>
              </>
            )}
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="tab-content">
            <div className="section-header">
              <Activity />
              <h3>PayAI x402 Performance</h3>
            </div>
            <div className="stats-grid compact">
              <div className="stat-card">
                <div className="stat-value">99.8%</div>
                <div className="stat-label">Success Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">0.8s</div>
                <div className="stat-label">Avg Time</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">12,842</div>
                <div className="stat-label">Payments (24h)</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">99.99%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
            <button className="full-width-btn" onClick={() => handleQuickAction(`${dashboardUrl}/performance`)}>
              View Full Performance <ExternalLink />
            </button>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="tab-content">
            <div className="section-header">
              <Plug />
              <h3>Integrations</h3>
            </div>
            <div className="compact-list">
              {[
                { name: 'PayAI x402', status: 'connected', icon: '⚡' },
                { name: 'Solana Wallet', status: 'connected', icon: '💰' },
                { name: 'Stripe API', status: 'available', icon: '💳' },
              ].map((integration, idx) => (
                <div key={idx} className="compact-item">
                  <span className="integration-icon">{integration.icon}</span>
                  <div className="item-info">
                    <span className="item-title">{integration.name}</span>
                    <span className={`item-status ${integration.status}`}>{integration.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="full-width-btn" onClick={() => handleQuickAction(`${dashboardUrl}/integrations`)}>
              Manage All Integrations <ExternalLink />
            </button>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="tab-content">
            <div className="section-header">
              <Settings />
              <h3>Settings</h3>
            </div>
            <div className="compact-list">
              {[
                { title: 'Profile Settings', desc: 'Manage your profile' },
                { title: 'Account Settings', desc: 'Account preferences' },
                { title: 'Notifications', desc: 'Manage notifications' },
              ].map((setting, idx) => (
                <div key={idx} className="compact-item clickable" onClick={() => handleQuickAction(`${dashboardUrl}/settings`)}>
                  <div className="item-info">
                    <span className="item-title">{setting.title}</span>
                    <span className="item-meta">{setting.desc}</span>
                  </div>
                  <ExternalLink />
                </div>
              ))}
              <div 
                className="compact-item clickable" 
                onClick={() => handleQuickAction('https://twitter.com')}
              >
                <div className="item-info">
                  <span className="item-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Twitter />
                    Twitter
                  </span>
                  <span className="item-meta">Follow us on Twitter</span>
                </div>
                <ExternalLink />
              </div>
            </div>
            <button className="full-width-btn" onClick={() => handleQuickAction(`${dashboardUrl}/settings`)}>
              Open Full Settings <ExternalLink />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
}

export default Popup;
