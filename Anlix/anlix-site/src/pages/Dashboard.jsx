import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function BrandLogo({ className = "", alt = "Anlix logo" }) {
  return <img src="/anlix%20logo.png" alt={alt} className={className} />;
}

// Fake data (same as before)
const stats = [ /* ... your stats array ... */ ];
const topClients = [ /* ... your topClients array ... */ ];
const invoices = [ /* ... your invoices array ... */ ];
const activities = [ /* ... your activities array ... */ ];

function DashboardNavItem({ active = false, href = "#", icon, label, badge }) {
  return (
    <a
      href={href}
      className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 ${active ? "active bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:text-white"}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {badge && <span className="ml-auto bg-cyan-500 text-black text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">{badge}</span>}
    </a>
  );
}

// Skeleton Components
function StatSkeleton() {
  return (
    <div className="bg-[#0f1928] border border-[#162032] rounded-3xl p-7 animate-pulse">
      <div className="h-3 w-20 bg-white/10 rounded mb-6" />
      <div className="h-9 w-36 bg-white/10 rounded mb-2" />
      <div className="h-3 w-28 bg-white/10 rounded" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-80 bg-[#0f1928] border border-[#162032] rounded-3xl p-7 animate-pulse">
      <div className="flex justify-between mb-8">
        <div className="h-4 w-48 bg-white/10 rounded" />
        <div className="h-4 w-16 bg-white/10 rounded" />
      </div>
      <div className="h-full w-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl" />
    </div>
  );
}

function ProgressSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[1,2,3,4,5].map(i => (
        <div key={i} className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-3 w-32 bg-white/10 rounded mb-2" />
            <div className="h-1.5 bg-white/10 rounded-full" />
          </div>
          <div className="h-3 w-16 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-white/10 rounded-t-3xl" />
      {[1,2,3,4].map(i => (
        <div key={i} className="flex items-center gap-6 px-7 py-5 border-b border-[#162032]">
          <div className="h-4 w-20 bg-white/10 rounded" />
          <div className="h-4 flex-1 bg-white/10 rounded" />
          <div className="h-4 w-24 bg-white/10 rounded" />
          <div className="h-4 w-20 bg-white/10 rounded" />
          <div className="h-6 w-20 bg-white/10 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[1,2,3,4].map(i => (
        <div key={i} className="flex gap-4">
          <div className="w-2 h-2 mt-2 rounded-full bg-white/20" />
          <div className="flex-1">
            <div className="h-4 w-3/4 bg-white/10 rounded mb-1" />
            <div className="h-3 w-32 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Chart
  useEffect(() => {
    if (isLoading || !chartRef.current) return;

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
  }, [isLoading]);

  return (
    <div className="dashboard-shell min-h-screen bg-[#05080f] text-white font-sans">
      {/* Sidebar - unchanged */}
      <aside className="sidebar w-60 bg-[#0b1120] border-r border-[#162032] flex flex-col h-screen sticky top-0 overflow-y-auto">
        {/* ... your existing sidebar code ... */}
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="topbar sticky top-0 z-50 bg-[#0b1120] border-b border-[#162032] px-8 py-5 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold tracking-tight">Dashboard</div>
            <div className="text-sm text-slate-500">April 2026 · Maun, Botswana</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 border border-[#162032] hover:border-cyan-400 text-sm rounded-2xl transition-all">← Landing Page</button>
            <button className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-2xl flex items-center gap-2 transition-all">
              + New Invoice
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
            ) : (
              stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-card bg-[#0f1928] border border-[#162032] rounded-3xl p-7 hover:border-cyan-400/30 transition-all group animate-fade-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="text-xs font-mono tracking-widest text-slate-500 mb-2">{stat.label}</div>
                  <div className="text-4xl font-bold tracking-tighter mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{stat.meta}</div>
                </div>
              ))
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Revenue Chart */}
            <div className="xl:col-span-3 bg-[#0f1928] border border-[#162032] rounded-3xl p-7 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="font-semibold">Revenue — Last 6 Months</div>
                  <div className="text-xs text-slate-500">P thousands</div>
                </div>
                <span className="text-cyan-400 text-sm cursor-pointer hover:underline">Export CSV</span>
              </div>
              {isLoading ? (
                <ChartSkeleton />
              ) : (
                <div className="h-80 animate-fade-in">
                  <canvas ref={chartRef} />
                </div>
              )}
            </div>

            {/* Top Clients */}
            <div className="xl:col-span-2 bg-[#0f1928] border border-[#162032] rounded-3xl p-7">
              <div className="flex justify-between mb-6">
                <div className="font-semibold">Top Clients</div>
                <span className="text-cyan-400 text-sm cursor-pointer hover:underline">View all</span>
              </div>
              {isLoading ? (
                <ProgressSkeleton />
              ) : (
                <div className="space-y-6 animate-fade-in">
                  {topClients.map((client, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="text-sm mb-1.5">{client.label}</div>
                        <div className="h-1.5 bg-[#162032] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: client.width, background: client.color }}
                          />
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
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <div className="overflow-x-auto animate-fade-in">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#162032]">
                        <th className="text-left py-4 px-7 text-xs font-mono tracking-widest text-slate-500">INVOICE</th>
                        <th className="text-left py-4 px-7 text-xs font-mono tracking-widest text-slate-500">CLIENT</th>
                        <th className="text-right py-4 px-7 text-xs font-mono tracking-widest text-slate-500">AMOUNT</th>
                        <th className="text-right py-4 px-7 text-xs font-mono tracking-widest text-slate-500">BALANCE</th>
                        <th className="text-center py-4 px-7 text-xs font-mono tracking-widest text-slate-500">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#162032]">
                      {invoices.map((inv, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="py-5 px-7 font-mono text-cyan-400">{inv.id}</td>
                          <td className="py-5 px-7">{inv.client}</td>
                          <td className="py-5 px-7 text-right font-mono">{inv.amount}</td>
                          <td className="py-5 px-7 text-right font-mono text-slate-400">{inv.balance}</td>
                          <td className="py-5 px-7 text-center">
                            <span
                              className="inline-block px-4 py-1 text-xs rounded-full font-medium"
                              style={{ backgroundColor: `${inv.statusColor}15`, color: inv.statusColor }}
                            >
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Activity Feed */}
            <div className="lg:col-span-2 bg-[#0f1928] border border-[#162032] rounded-3xl p-7">
              <div className="font-semibold mb-6">Activity Feed</div>
              {isLoading ? (
                <ActivitySkeleton />
              ) : (
                <div className="space-y-6 animate-fade-in">
                  {activities.map((act, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full flex-shrink-0" style={{ backgroundColor: act.color }} />
                      <div className="flex-1">
                        <div className="text-sm leading-snug">{act.text}</div>
                        <div className="text-xs text-slate-500 mt-1 font-mono">{act.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}
