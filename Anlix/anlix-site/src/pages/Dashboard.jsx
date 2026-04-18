import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

function BrandLogo({ className = "", alt = "Anlix logo" }) {
  return <img src="/anlix%20logo.png" alt={alt} className={className} />;
}

const stats = [
  { label:"Total Revenue",    value:"P 284,500", meta:"↑ 18% vs last month",  colorClass:"s-cyan",  valueClass:"stat-accent" },
  { label:"Outstanding",      value:"P 67,200",  meta:"4 invoices pending",    colorClass:"s-amber", valueClass:"stat-gold" },
  { label:"Deposits Received",value:"P 42,800",  meta:"↑ 7% this month",      colorClass:"s-green", valueClass:"stat-green" },
  { label:"Overdue",          value:"P 15,000",  meta:"2 clients past due",    colorClass:"s-red",   valueClass:"stat-red" },
];

const topClients = [
  { label:"Debswana Mining",         amount:"P 89,200", width:"88%", barClass:"bar-accent" },
  { label:"Morupule Coal",           amount:"P 62,400", width:"64%", barClass:"bar-blue" },
  { label:"BCL Mine",                amount:"P 45,100", width:"48%", barClass:"bar-purple" },
  { label:"Jwaneng Mine",            amount:"P 32,800", width:"35%", barClass:"bar-green" },
  { label:"Megajet (Pty) Ltd",       amount:"P 18,500", width:"22%", barClass:"bar-gold" },
];

const invoices = [
  { id:"#INV-024", client:"Debswana",     amount:"P 22,500", balance:"P 0",     balanceClass:"bal-green", status:"Paid",     statusClass:"s-paid" },
  { id:"#INV-023", client:"Morupule Coal",amount:"P 15,000", balance:"P 7,500", balanceClass:"bal-gold",  status:"50% Paid", statusClass:"s-partial" },
  { id:"#INV-022", client:"BCL Mine",     amount:"P 8,800",  balance:"P 8,800", balanceClass:"bal-red",   status:"Pending",  statusClass:"s-pending" },
  { id:"#INV-021", client:"Megajet",      amount:"P 12,000", balance:"P 0",     balanceClass:"bal-green", status:"Paid",     statusClass:"s-paid" },
];

const activities = [
  { colorClass:"dot-green",  text:"Payment P 22,500 received — Debswana",     time:"Today · 09:14 CAT" },
  { colorClass:"dot-accent", text:"Invoice #INV-024 sent to Debswana Mining",  time:"Yesterday · 14:32 CAT" },
  { colorClass:"dot-gold",   text:"Quotation #QUO-011 approved by BCL Mine",  time:"Apr 12 · 11:05 CAT" },
  { colorClass:"dot-blue",   text:"Deposit P 7,500 logged — Morupule Coal",   time:"Apr 11 · 16:22 CAT" },
  { colorClass:"dot-purple", text:"New client Megajet (Pty) Ltd added",       time:"Apr 10 · 09:00 CAT" },
];

// Nav icon helper
function Icon({ d, viewBox = "0 0 16 16" }) {
  return (
    <svg width="16" height="16" viewBox={viewBox} fill="none" aria-hidden="true">
      {d}
    </svg>
  );
}

function NavItem({ to = "#", active = false, icon, label, badge }) {
  return (
    <Link className={`nav-item${active ? " active" : ""}`} to={to}>
      {icon}
      <span>{label}</span>
      {badge ? <span className="badge">{badge}</span> : null}
    </Link>
  );
}

function MobileNavItem({ to, active, icon, label }) {
  return (
    <Link className={`mobile-nav-item${active ? " active" : ""}`} to={to}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

// SVG icon definitions
const icons = {
  dashboard: (
    <>
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5" />
    </>
  ),
  invoices: (
    <>
      <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="11" x2="8" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  quotations: (
    <>
      <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11" cy="11" r="3" fill="#fbbf24" />
      <line x1="11" y1="9.5" x2="11" y2="11.5" stroke="#05080f" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  payments: (
    <>
      <rect x="1" y="4" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <line x1="1" y1="7" x2="15" y2="7" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  clients: (
    <>
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 13c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
};

export default function Dashboard() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Nov","Dec","Jan","Feb","Mar","Apr"],
        datasets: [{
          label: "Revenue",
          data: [185000,210000,195000,228000,241000,284500],
          backgroundColor: "rgba(34,211,238,0.18)",
          borderColor: "#22d3ee",
          borderWidth: 1.5,
          borderRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: "rgba(22,32,50,0.8)" },
            ticks: { color: "#4a6080", font: { size: 11 } },
          },
          y: {
            grid: { color: "rgba(22,32,50,0.8)" },
            ticks: {
              color: "#4a6080",
              font: { size: 11 },
              callback: (v) => `P${(v / 1000).toFixed(0)}k`,
            },
          },
        },
      },
    });

    return () => { if (chartInstanceRef.current) chartInstanceRef.current.destroy(); };
  }, []);

  function handleLogout() {
    localStorage.removeItem("anlix-auth");
    navigate("/login");
  }

  return (
    <div className="dashboard-shell">

      {/* ── SIDEBAR ──────────────────────────────────────────────── */}
      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-mark-wrap">
            <BrandLogo className="sidebar-logo-image" />
          </div>
          <div className="logo-text-wrap">
            <div className="logo-name">ANLIX</div>
            <div className="logo-sub">Dashboard</div>
          </div>
        </div>

        <nav>
          <div className="nav-section">Main</div>
          <NavItem to="/dashboard" active label="Dashboard" icon={<Icon d={icons.dashboard} />} />

          <div className="nav-section">Finance</div>
          <NavItem to="/invoices"   label="Invoices"   badge="3" icon={<Icon d={icons.invoices} />} />
          <NavItem to="/quotations" label="Quotations"            icon={<Icon d={icons.quotations} />} />
          <NavItem to="/payments"   label="Payments"              icon={<Icon d={icons.payments} />} />

          <div className="nav-section">People</div>
          <NavItem to="/clients"    label="Clients"               icon={<Icon d={icons.clients} />} />
        </nav>

        <button className="logout-btn" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────────── */}
      <main className="main">

        {/* Topbar */}
        <div className="topbar">
          <div>
            <div className="page-title">DASHBOARD</div>
            <div className="page-sub">April 2026 · Maun, Botswana</div>
          </div>
          <div className="topbar-right">
            <Link to="/" className="btn btn-outline">← Landing Page</Link>
            <button className="btn btn-primary" type="button">+ New Invoice</button>
          </div>
        </div>

        {/* Content */}
        <div className="content">

          {/* Stats */}
          <div className="stats-grid">
            {stats.map(item => (
              <div key={item.label} className={`stat-card ${item.colorClass}`}>
                <div className="stat-label">{item.label}</div>
                <div className={`stat-value ${item.valueClass}`}>{item.value}</div>
                <div className="stat-meta">{item.meta}</div>
              </div>
            ))}
          </div>

          {/* Row 1 */}
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
                {topClients.map(c => (
                  <div key={c.label} className="progress-row">
                    <span className="p-label">{c.label}</span>
                    <div className="p-bar-wrap">
                      <div className={`p-bar ${c.barClass}`} style={{ width:c.width }} />
                    </div>
                    <span className="p-val mono">{c.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 */}
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
                    {invoices.map(inv => (
                      <tr key={inv.id}>
                        <td className="mono invoice-id">{inv.id}</td>
                        <td>{inv.client}</td>
                        <td className="mono">{inv.amount}</td>
                        <td className={`mono ${inv.balanceClass}`}>{inv.balance}</td>
                        <td><span className={`status ${inv.statusClass}`}>{inv.status}</span></td>
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
                {activities.map((a, i) => (
                  <div key={i} className="tl-item">
                    <div className={`tl-dot ${a.colorClass}`} />
                    <div>
                      <div className="tl-text">{a.text}</div>
                      <div className="tl-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── MOBILE BOTTOM NAV (visible <540px) ───────────────────── */}
      <nav className="mobile-nav">
        <MobileNavItem to="/dashboard" active label="Home"       icon={<Icon d={icons.dashboard} />} />
        <MobileNavItem to="/invoices"        label="Invoices"   icon={<Icon d={icons.invoices} />} />
        <MobileNavItem to="/payments"        label="Payments"   icon={<Icon d={icons.payments} />} />
        <MobileNavItem to="/clients"         label="Clients"    icon={<Icon d={icons.clients} />} />
      </nav>

    </div>
  );
}
