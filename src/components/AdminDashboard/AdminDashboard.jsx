// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import './AdminDashboard.css';
import { 
  FiUsers, FiPackage, FiShoppingCart, FiTrendingUp, 
  FiAlertTriangle, FiHome, FiBarChart2, FiSettings,
  FiMenu, FiX, FiLogOut, FiPlus, FiEdit, FiTrash2,
  FiSearch, FiDownload
} from 'react-icons/fi';

// ============ SIDEBAR ============
function Sidebar({ activePage, onNavigate, collapsed, setCollapsed }) {
  const menuItems = [
    { id: 'dashboard', label: 'Vue d\'ensemble', icon: FiHome },
    { id: 'users', label: 'Utilisateurs', icon: FiUsers },
    { id: 'products', label: 'Produits', icon: FiPackage },
    { id: 'reports', label: 'Rapports', icon: FiBarChart2 },
    { id: 'settings', label: 'Paramètres', icon: FiSettings },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="brand">
          <FiShoppingCart className="brand-icon" />
          {!collapsed && <span className="brand-name">SuperMarché</span>}
        </div>
        <button 
          className="toggle-btn" 
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Ouvrir menu' : 'Fermer menu'}
        >
          {collapsed ? <FiMenu /> : <FiX />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <item.icon className="nav-icon" />
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout">
          <FiLogOut className="nav-icon" />
          {!collapsed && <span className="nav-label">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}

// ============ COMPOSANTS RÉUTILISABLES ============
function StatCard({ title, value, subtitle, accent = 'primary', icon: Icon }) {
  return (
    <div className={`card kpi ${accent}`}>
      <div className="kpi-header">
        <div>
          <div className="kpi-title">{title}</div>
          <div className="kpi-value">{value}</div>
          {subtitle && <div className="kpi-sub">{subtitle}</div>}
        </div>
        {Icon && <div className="kpi-icon"><Icon /></div>}
      </div>
    </div>
  );
}

// ============ PAGE: VUE D'ENSEMBLE ============
function DashboardPage({ products, sales }) {
  const totalRevenue = sales.reduce((sum, s) => sum + (s.total ?? s.montant ?? 0), 0);
  const lowStockProducts = products.filter((p) => (p.stock ?? p.quantite ?? 0) < (p.minStock ?? p.seuil_alerte ?? 0));

  return (
    <>
      <section className="grid kpi-grid">
        <StatCard title="Utilisateurs actifs" value="5" subtitle="Comptes système" accent="primary" icon={FiUsers} />
        <StatCard title="Produits en stock" value={products.length} subtitle="En inventaire" accent="info" icon={FiPackage} />
        <StatCard title="Ventes du mois" value={sales.length} subtitle="Transactions" accent="success" icon={FiShoppingCart} />
        <StatCard title="Revenu mensuel" value={`${totalRevenue.toFixed(2)} F CFA`} subtitle="Total cumulé" accent="warning" icon={FiTrendingUp} />
      </section>

      {lowStockProducts.length > 0 && (
        <div className="card alerts">
          <div className="card-header">
            <div className="header-row">
              <FiAlertTriangle className="icon-warn" />
              <div>
                <div className="card-title">Alertes stock bas</div>
                <div className="card-desc">{lowStockProducts.length} produit(s) nécessitent un réapprovisionnement</div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <ul className="list">
              {lowStockProducts.map((p) => (
                <li key={p.id} className="alert-item">
                  <div>
                    <div className="font-medium">{p.name ?? p.nom}</div>
                    <div className="muted">SKU: {p.sku ?? p.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="badge badge-warning">{p.stock ?? p.quantite} / {p.minStock ?? p.seuil_alerte}</div>
                    <div className="muted small">Stock / Seuil</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="header-row">
            <FiShoppingCart className="icon-accent" />
            <div>
              <div className="card-title">Ventes récentes</div>
              <div className="card-desc">Dernières transactions du système</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <ul className="list">
            {sales.slice(0, 5).map((sale) => (
              <li key={sale.id} className="sale-item">
                <div className="sale-info">
                  <div className="font-medium">
                    {(sale.products || sale.produits)?.map((p) => p.productName ?? p.nom).join(', ')}
                  </div>
                  <div className="muted small">
                    <span className="badge badge-neutral">{sale.cashierName ?? `Employé #${sale.employe_id}`}</span>
                    <span className="sale-date">{new Date(sale.createdAt ?? sale.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <div className="sale-amount">
                  <div className="amount-value">{(sale.total ?? sale.montant ?? 0).toFixed(2)} F CFA</div>
                  <div className="badge badge-method">{(sale.paymentMethod ?? sale.paiement?.methode ?? 'N/A').toString()}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

// ============ PAGE: UTILISATEURS ============
function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, nom: 'Kouassi Marie', email: 'marie@store.com', role: 'admin' },
    { id: 2, nom: 'Touré Ibrahim', email: 'ibrahim@store.com', role: 'manager' },
    { id: 3, nom: 'Diallo Fatou', email: 'fatou@store.com', role: 'cashier' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u => 
    u.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="page-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher un utilisateur..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">
          <FiPlus /> Ajouter un utilisateur
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Liste des utilisateurs</div>
          <div className="card-desc">{users.length} utilisateur(s) dans le système</div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="font-medium">{user.nom}</td>
                  <td>{user.email}</td>
                  <td><span className="badge badge-neutral">{user.role}</span></td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon"><FiEdit /></button>
                      <button className="btn-icon danger"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ============ PAGE: PRODUITS ============
function ProductsPage({ products }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => 
    (p.nom || p.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="page-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher un produit..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">
          <FiPlus /> Ajouter un produit
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Catalogue produits</div>
          <div className="card-desc">{products.length} produit(s) en inventaire</div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Seuil</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p.id} className={(p.stock ?? p.quantite) < (p.minStock ?? p.seuil_alerte) ? 'row-warning' : ''}>
                  <td className="font-medium">{p.nom ?? p.name}</td>
                  <td>{p.categorie ?? p.category}</td>
                  <td>{(p.prix_unitaire ?? p.price ?? 0).toFixed(2)} F CFA</td>
                  <td>{p.stock ?? p.quantite}</td>
                  <td>{p.minStock ?? p.seuil_alerte}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon"><FiEdit /></button>
                      <button className="btn-icon danger"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ============ PAGE: RAPPORTS ============
function ReportsPage({ sales, products }) {
  const totalRevenue = sales.reduce((sum, s) => sum + (s.total ?? s.montant ?? 0), 0);
  const avgTransaction = sales.length > 0 ? totalRevenue / sales.length : 0;

  return (
    <>
      <div className="grid stats-grid">
        <div className="card stat-card">
          <div className="stat-label">Transactions totales</div>
          <div className="stat-value">{sales.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Revenu total</div>
          <div className="stat-value">{totalRevenue.toFixed(2)} F CFA</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Transaction moyenne</div>
          <div className="stat-value">{avgTransaction.toFixed(2)} F CFA</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Produits actifs</div>
          <div className="stat-value">{products.length}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="header-row">
            <div>
              <div className="card-title">Exporter les données</div>
              <div className="card-desc">Téléchargez les rapports au format CSV ou PDF</div>
            </div>
            <div className="export-actions">
              <button className="btn btn-outline">
                <FiDownload /> Export CSV
              </button>
              <button className="btn btn-outline">
                <FiDownload /> Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Historique des ventes</div>
          <div className="card-desc">Toutes les transactions enregistrées</div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Méthode</th>
                <th>Caissier</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id}>
                  <td>#{sale.id}</td>
                  <td>{new Date(sale.createdAt ?? sale.date).toLocaleDateString('fr-FR')}</td>
                  <td className="font-medium">{(sale.total ?? sale.montant ?? 0).toFixed(2)} F CFA</td>
                  <td><span className="badge badge-method">{sale.paymentMethod ?? sale.paiement?.methode}</span></td>
                  <td>{sale.cashierName ?? `Employé #${sale.employe_id}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ============ PAGE: PARAMÈTRES ============
function SettingsPage() {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Paramètres généraux</div>
          <div className="card-desc">Configuration du système</div>
        </div>
        <div className="card-body">
          <div className="settings-section">
            <label className="setting-item">
              <span className="setting-label">Nom du supermarché</span>
              <input type="text" defaultValue="Carrefour Central" className="input" />
            </label>
            <label className="setting-item">
              <span className="setting-label">Email de contact</span>
              <input type="email" defaultValue="contact@carrefour.com" className="input" />
            </label>
            <label className="setting-item">
              <span className="setting-label">Téléphone</span>
              <input type="tel" defaultValue="+225 00 00 00 00" className="input" />
            </label>
            <label className="setting-item">
              <span className="setting-label">Adresse</span>
              <input type="text" defaultValue="1 Avenue du Commerce, Ville" className="input" />
            </label>
          </div>
          <div className="settings-footer">
            <button className="btn btn-primary">Enregistrer les modifications</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Paramètres de sécurité</div>
          <div className="card-desc">Gérez l'accès et les permissions</div>
        </div>
        <div className="card-body">
          <div className="settings-section">
            <div className="setting-item">
              <span className="setting-label">Authentification à deux facteurs</span>
              <label className="toggle">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span className="setting-label">Notifications par email</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============ COMPOSANT PRINCIPAL ============
export default function AdminDashboard({ user, products = [], sales = [] }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  if (!user || user.role !== 'admin') return null;

  // Rendu conditionnel des pages
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage products={products} sales={sales} />;
      case 'users':
        return <UsersPage />;
      case 'products':
        return <ProductsPage products={products} />;
      case 'reports':
        return <ReportsPage sales={sales} products={products} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage products={products} sales={sales} />;
    }
  };

  return (
    <div className="admin-container">
      <Sidebar 
        activePage={activePage} 
        onNavigate={setActivePage} 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      
      <main className="admin-layout">
        <header className="page-header">
          <div>
            <h1 className="page-title">
              {activePage === 'dashboard' && 'Tableau de bord'}
              {activePage === 'users' && 'Gestion des utilisateurs'}
              {activePage === 'products' && 'Gestion des produits'}
              {activePage === 'reports' && 'Rapports et statistiques'}
              {activePage === 'settings' && 'Paramètres'}
            </h1>
            <p className="page-subtitle">
              Bon retour, <strong>{user.name}</strong>.
            </p>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}
