import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function BrandLogo({ className = "", alt = "Anlix logo" }) {
  return <img src="/anlix%20logo.png" alt={alt} className={className} />;
}

// Your existing data arrays (unchanged)
const stats = [ /* paste your stats array here */ ];
const topClients = [ /* paste your topClients array here */ ];
const invoices = [ /* paste your invoices array here */ ];
const activities = [ /* paste your activities array here */ ];

function DashboardNavItem({ active = false, href = "#", icon, label, badge }) {
  return (
    <a href={href} className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 ${active ? "active bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:text-white"}`}>
      {icon}
      <span className="font-medium">{label}</span>
      {badge && <span className="ml-auto bg-cyan-500 text-black text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">{badge}</span>}
    </a>
  );
}

/* ── Advanced Shimmer Skeleton Components ── */
function ShimmerStat() {
  return (
    <div className="shimmer-card bg-[#0f1928] border border-[#162032] rounded-3xl p-7 overflow-hidden">
      <div className="h-3 w-24 bg-white/10 rounded mb-6 shimmer" />
      <div className="h-9 w-36 bg-white/10 rounded mb-2 shimmer" />
      <div className="h-3 w-28 bg-white/10 rounded shimmer" />
    </div>
  );
}

function ShimmerChart() {
  return (
    <div className="shimmer-card bg-[#0f1928] border border-[#162032] rounded-3xl p-7 h-80 overflow-hidden relative">
      <div className="flex justify-between mb-8">
        <div className="h-4 w-48 bg-white/10 rounded shimmer" />
        <div className="h-4 w-16 bg-white/10 rounded shimmer" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  );
}

function ShimmerProgress() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-3 w-32 bg-white/10 rounded mb-2 shimmer" />
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/20 rounded-full w-3/4 shimmer-bar" />
            </div>
          </div>
          <div className="h-3 w-16 bg-white/10 rounded shimmer" />
        </div>
      ))}
    </div>
  );
}

function ShimmerTable() {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-6 px-7 py-5 border-b border-[#162032]">
          <div className="h-4 w-20 bg-white/10 rounded shimmer" />
          <div className="h-4 flex-1 bg-white/10 rounded shimmer" />
          <div className="h-4 w-24 bg-white/10 rounded shimmer" />
          <div className="h-4 w-20 bg-white/10 rounded shimmer" />
          <div className="h-6 w-20 bg-white/10 rounded-full shimmer" />
        </div>
      ))}
    </div>
  );
}

function ShimmerActivity() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-2 h-2 mt-2 rounded-full bg-white/20" />
          <div className="flex-1">
            <div className="h-4 w-3/4 bg-white/10 rounded mb-1 shimmer" />
            <div className="h-3 w-32 bg-white/10 rounded shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Error State ── */
function ErrorState({ onRetry }) {
  return (
    <div className="col-span-full bg-[#0f1928] border border-red-500/30 rounded-3xl p-12 text-center">
      <div className="mx-auto w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-400 rounded-2xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-red-400 mb-2">Failed to load dashboard</h3>
      <p className="text-slate-400 mb-6">We couldn’t fetch the latest data. Please check your connection.</p>
      <button
        onClick={onRetry}
        className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-2xl transition-all active:scale-95"
      >
        Retry
      </button>
    </div>
  );
}

export default function Dashboard() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Simulate API call with occasional error
  const loadData = () => {
    setIsLoading(true);
    setError(false);
    setTimeout(() => {
      if (Math.random() < 0.2) {
        setError(true);
        setIsLoading(false);
      } else {
        setError(false);
        setIsLoading(false);
      }
    }, 850);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Chart initialization
  useEffect(() => {
    if (isLoading || error || !chartRef.current) return;
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
        datasets: [{
          label: "Revenue",
          data: [185000, 210000, 195000, 228000, 241000, 284500],
          backgroundColor: "rgba(34, 211, 238, 0.25)",
          borderColor: "#22d3ee",
          borderWidth: 2,
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.06)" }, ticks: { color: "#64748b", font: { size: 11 } } },
          y: {
            grid: { color: "rgba(255,255,255,0.06)" },
            ticks: { color: "#64748b", font: { size: 11 }, callback: (v) => `P${(v/1000).toFixed(0)}k` },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, [isLoading, error]);

  return (
    <div className="dashboard-shell min-h-screen bg-[#05080f] text-white font-sans">
      {/* Sidebar (unchanged) */}
      <aside className="sidebar w-60 bg-[#0b1120] border-r border-[#162032] flex flex-col h-screen sticky top-0 overflow-y-auto">
        {/* ... your existing sidebar code ... */}
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="topbar sticky top-0 z-50 bg-[#0b1120] border-b border-[#162032] px-8 py-5 flex items-center justify-between">
          {/* ... your topbar ... */}
        </div>

        <div className="p-8">
          {error ? (
            <ErrorState onRetry={loadData} />
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => <ShimmerStat key={i} />)
                  : stats.map((stat, i) => (
                      <div key={i} className="stat-card bg-[#0f1928] border border-[#162032] rounded-3xl p-7 hover:border-cyan-400/30 transition-all animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                        <div className="text-xs font-mono tracking-widest text-slate-500 mb-2">{stat.label}</div>
                        <div className="text-4xl font-bold tracking-tighter mb-1" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.meta}</div>
                      </div>
                    ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                {/* Revenue Chart */}
                <div className="xl:col-span-3 bg-[#0f1928] border border-[#162032] rounded-3xl p-7">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="font-semibold">Revenue — Last 6 Months</div>
                      <div className="text-xs text-slate-500">P thousands</div>
                    </div>
                    <span className="text-cyan-400 text-sm cursor-pointer hover:underline">Export CSV</span>
                  </div>
                  {isLoading ? <ShimmerChart /> : <div className="h-80 animate-fade-in"><canvas ref={chartRef} /></div>}
                </div>

                {/* Top Clients */}
                <div className="xl:col-span-2 bg-[#0f1928] border border-[#162032] rounded-3xl p-7">
                  <div className="flex justify-between mb-6">
                    <div className="font-semibold">Top Clients</div>
                    <span className="text-cyan-400 text-sm cursor-pointer hover:underline">View all</span>
                  </div>
                  {isLoading ? <ShimmerProgress /> : (
                    <div className="space-y-6 animate-fade-in">
                      {topClients.map((client, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="text-sm mb-1.5">{client.label}</div>
                            <div className="h-1.5 bg-[#162032] rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-700" style={{ width: client.width, background: client.color }} />
                            </div>
                          </div>
                          <div className="font-mono text-sm text-right w-20 text-slate-300">{client.amount}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
                {/* Recent Invoices */}
                <div className="lg:col-span-3 bg-[#0f1928] border border-[#162032] rounded-3xl overflow-hidden">
                  <div className="px-7 py-5 border-b border-[#162032] flex justify-between items-center">
                    <div className="font-semibold">Recent Invoices</div>
                    <span className="text-cyan-400 text-sm cursor-pointer hover:underline">View all</span>
                  </div>
                  {isLoading ? <ShimmerTable /> : (
                    <div className="overflow-x-auto animate-fade-in">
                      {/* your existing table code */}
                    </div>
                  )}
                </div>

                {/* Activity Feed */}
                <div className="lg:col-span-2 bg-[#0f1928] border border-[#162032] rounded-3xl p-7">
                  <div className="font-semibold mb-6">Activity Feed</div>
                  {isLoading ? <ShimmerActivity /> : (
                    <div className="space-y-6 animate-fade-in">
                      {/* your existing activity feed */}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Global shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
        .shimmer-card { position: relative; }
        .shimmer-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: shimmer 2s infinite linear;
          pointer-events: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease forwards; }
      `}</style>
    </div>
  );
}
