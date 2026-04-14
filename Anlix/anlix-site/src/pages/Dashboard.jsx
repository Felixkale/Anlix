import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LogoMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Anlix logo"
      role="img"
    >
      <defs>
        <linearGradient id="dashboard-brand-gradient" x1="0" y1="0" x2="220" y2="72">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>

      <path d="M10 62L32 24L54 62H10Z" fill="url(#dashboard-brand-gradient)" />
      <path d="M46 6H70L124 62H100L46 6Z" fill="url(#dashboard-brand-gradient)" />
      <text
        x="114"
        y="63"
        fill="currentColor"
        fontFamily="DM Sans, sans-serif"
        fontWeight="800"
        fontSize="54"
        letterSpacing="-2"
      >
        nlix
      </text>
    </svg>
  );
}

const stats = [
  {
    label: "Total Revenue",
    value: "P 284,500",
    meta: "↑ 18% vs last month",
    colorClass: "s-cyan",
    valueClass: "stat-accent",
  },
  {
    label: "Outstanding",
    value: "P 67,200",
    meta: "4 invoices pending",
    colorClass: "s-amber",
    valueClass: "stat-gold",
  },
  {
    label: "Deposits Received",
    value: "P 42,800",
    meta: "↑ 7% this month",
    colorClass: "s-green",
    valueClass: "stat-green",
  },
  {
    label: "Overdue",
    value: "P 15,000",
    meta: "2 clients past due",
    colorClass: "s-red",
    valueClass: "stat-red",
  },
];

const topClients = [
  { label: "Debswana Mining", amount: "P 89,200", width: "88%", barClass: "bar-accent" },
  { label: "Morupule Coal", amount: "P 62,400", width: "64%", barClass: "bar-blue" },
  { label: "BCL Mine", amount: "P 45,100", width: "48%", barClass: "bar-purple" },
  { label: "Jwaneng Mine", amount: "P 32,800", width: "35%", barClass: "bar-green" },
  { label: "Megajet (Pty) Ltd", amount: "P 18,500", width: "22%", barClass: "bar-gold" },
];

const invoices = [
  {
    id: "#INV-024",
    client: "Debswana",
    amount: "P 22,500",
    balance: "P 0",
    balanceClass: "bal-green",
    status: "Paid",
    statusClass: "s-paid",
  },
  {
    id: "#INV-023",
    client: "Morupule Coal",
    amount: "P 15,000",
    balance: "P 7,500",
    balanceClass: "bal-gold",
    status: "50% Paid",
    statusClass: "s-partial",
  },
  {
    id: "#INV-022",
    client: "BCL Mine",
    amount: "P 8,800",
    balance: "P 8,800",
    balanceClass: "bal-red",
    status: "Pending",
    statusClass: "s-pending",
  },
  {
    id: "#INV-021",
    client: "Megajet",
    amount: "P 12,000",
    balance: "P 0",
    balanceClass: "bal-green",
    status: "Paid",
    statusClass: "s-paid",
  },
];

const activities = [
  {
    colorClass: "dot-green",
    text: "Payment P 22,500 received — Debswana",
    time: "Today · 09:14 CAT",
  },
  {
    colorClass: "dot-accent",
    text: "Invoice #INV-024 sent to Debswana Mining",
    time: "Yesterday · 14:32 CAT",
  },
  {
    colorClass: "dot-gold",
    text: "Quotation #QUO-011 approved by BCL Mine",
    time: "Apr 12 · 11:05 CAT",
  },
  {
    colorClass: "dot-blue",
    text: "Deposit P 7,500 logged — Morupule Coal",
    time: "Apr 11 · 16:22 CAT",
  },
  {
    colorClass: "dot-purple",
    text: "New client Megajet (Pty) Ltd added",
    time: "Apr 10 · 09:00 CAT",
  },
];

function DashboardNavItem({ active = false, href = "#", icon, label, badge }) {
  return (
    <a className={`nav-item ${active ? "active" : ""}`} href={href}>
      {icon}
      <span>{label}</span>
      {badge ? <span className="badge">{badge}</span> : null}
    </a>
  );
}

export default function Dashboard() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
        datasets: [
          {
            label: "Revenue",
            data: [185000, 210000, 195000, 228000, 241000, 284500],
            backgroundColor: "rgba(34,211,238,0.18)",
            borderColor: "#22d3ee",
            borderWidth: 1.5,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { color: "rgba(22,32,50,0.8)" },
            ticks: {
              color: "#4a6080",
              font: { size: 11 },
            },
          },
          y: {
            grid: { color: "rgba(22,32,50,0.8)" },
            ticks: {
              color: "#4a6080",
              font: { size: 11 },
              callback: (value) => `P${(value / 1000).toFixed(0)}k`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-mark-wrap">
            <LogoMark className="sidebar-logo-svg" />
          </div>
          <div className="logo-text-wrap">
            <div className="logo-name">ANLIX</div>
            <div className="logo-sub">Dashboard</div>
          </div>
        </div>

        <nav>
          <div className="nav-section">Main</div>

          <DashboardNavItem
            active
            href="/dashboard"
            label="Dashboard"
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
              </svg>
            }
          />

          <div className="nav-section">Finance</div>

          <DashboardNavItem
            href="#"
            label="Invoices"
            badge="3"
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="5" y1="11" x2="8" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            }
          />

          <DashboardNavItem
            href="#"
            label="Quotations"
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="11" cy="11" r="3" fill="#fbbf24" />
                <line x1="11" y1="9.5" x2="11" y2="11.5" stroke="#05080f" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            }
          />

          <DashboardNavItem
            href="#"
            label="Payments"
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="4" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <line x1="1" y1="7" x2="15" y2="7" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            }
          />

          <div className="nav-section">People</div>

          <DashboardNavItem
            href="#"
            label="Clients"
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 13c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            }
          />
        </nav>

        <a className="logout-btn" href="/">
          ← Back to Site
        </a>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <div className="page-title">DASHBOARD</div>
            <div className="page-sub">April 2026 · Maun, Botswana</div>
          </div>

          <div className="topbar-right">
            <a href="/" className="btn btn-outline">← Landing Page</a>
            <button className="btn btn-primary" type="button">+ New Invoice</button>
          </div>
        </div>

        <div className="content">
          <div className="stats-grid">
            {stats.map((item) => (
              <div key={item.label} className={`stat-card ${item.colorClass}`}>
                <div className="stat-label">{item.label}</div>
                <div className={`stat-value ${item.valueClass}`}>{item.value}</div>
                <div className="stat-meta">{item.meta}</div>
              </div>
            ))}
          </div>

          <div className="two-col">
            <div className="card">
              <div className="card-head">
                <span className="card-title">Revenue — Last 6 Months</span>
                <span className="card-action">Export</span>
              </div>
              <div className="chart-wrap">
                <canvas ref={chartRef} role="img" aria-label="Monthly revenue bar chart" />
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <span className="card-title">Top Clients</span>
                <span className="card-action">View all</span>
              </div>
              <div className="progress-section">
                {topClients.map((client) => (
                  <div key={client.label} className="progress-row">
                    <span className="p-label">{client.label}</span>
                    <div className="p-bar-wrap">
                      <div className={`p-bar ${client.barClass}`} style={{ width: client.width }} />
                    </div>
                    <span className="p-val mono">{client.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="two-col">
            <div className="card">
              <div className="card-head">
                <span className="card-title">Recent Invoices</span>
                <span className="card-action">View all</span>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Balance</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="mono invoice-id">{invoice.id}</td>
                        <td>{invoice.client}</td>
                        <td className="mono">{invoice.amount}</td>
                        <td className={`mono ${invoice.balanceClass}`}>{invoice.balance}</td>
                        <td>
                          <span className={`status ${invoice.statusClass}`}>{invoice.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <span className="card-title">Activity Feed</span>
              </div>
              <div className="tl">
                {activities.map((activity, index) => (
                  <div key={`${activity.text}-${index}`} className="tl-item">
                    <div className={`tl-dot ${activity.colorClass}`} />
                    <div>
                      <div className="tl-text">{activity.text}</div>
                      <div className="tl-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
