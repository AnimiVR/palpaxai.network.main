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

function Popup() {
  const [activeTab, setActiveTab] = useState<'home' | 'marketplace'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>('https://PalPaxAI.xyz');
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
          if (host.includes('PalPaxAI.xyz')) {
            setBaseUrl('https://PalPaxAI.xyz');
          } else if (host.includes('localhost:3000') || host.includes('127.0.0.1:3000')) {
            setBaseUrl('http://localhost:3000');
          } else if (host.includes('localhost:3001') || host.includes('127.0.0.1:3001')) {
            setBaseUrl('http://localhost:3001');
          } else {
            setBaseUrl('https://PalPaxAI.xyz');
          }
        } catch {
          setBaseUrl('https://PalPaxAI.xyz');
        }
      }
    });

    return () => {
      clearInterval(priceInterval);
      clearInterval(timeInterval);
    };
  }, []);

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
            onClick={() => handleQuickAction('https://PalPaxAI.xyz')}
            title="Open PalPaxAI Website"
          >
            <ExternalLink />
          </button>
        </div>
        <div className="header-accent"></div>
      </div>

      <div className="tabs-container">
        {(['home', 'marketplace'] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <span>{tab}</span>
            {activeTab === tab && <div className="tab-indicator"></div>}
          </button>
        ))}
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
                onClick={() => handleQuickAction(`${baseUrl}/dashboard`)}
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
                  { icon: TrendingUp, title: 'Dashboard', desc: 'View your activity', path: '/dashboard', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
                  { icon: Search, title: 'Browse Marketplace', desc: 'Find AI agents', path: '/marketplace', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' },
                ].map((action, idx) => {
                  const url = `${baseUrl}${action.path}`;
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
