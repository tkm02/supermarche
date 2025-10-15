import './App.css';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
// import AdminDashboard from './components/AdminDashboard/AdminDashboard';
// import Login from './components/Login/Login';

const user = { name: 'Admin User', role: 'admin' };

// const [user] = useState({ name: 'Admin User', role: 'admin' });
//   const [products, setProducts] = useState([]);
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       try {
//         const [pRes, sRes] = await Promise.all([
//           fetch('/api/produits'),
//           fetch('/api/ventes')
//         ]);
//         const [pJson, sJson] = await Promise.all([pRes.json(), sRes.json()]);
//         setProducts(pJson);
//         setSales(sJson);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

const products = [
  { id: 101, nom: 'Baguette', quantite: 45, seuil_alerte: 50, fournisseur: { nom: 'Boulangerie SA' } },
  { id: 114, nom: 'Eau minérale', quantite: 220, seuil_alerte: 80, fournisseur: { nom: 'Source Claire' } },
  { id: 201, nom: 'Lait demi-écrémé', quantite: 30, seuil_alerte: 40, fournisseur: { nom: 'Lacto' } }
];

const sales = [
  {
    id: 401,
    produits: [
      { id: 101, nom: 'Baguette', quantite: 3 },
      { id: 114, nom: 'Eau minérale', quantite: 2 }
    ],
    montant: 12.4,
    paiement: { methode: 'carte' },
    date: '2025-10-13T09:05:00',
    employe_id: 502
  },
  {
    id: 402,
    produits: [{ id: 201, nom: 'Lait demi-écrémé', quantite: 4 }],
    montant: 8.2,
    paiement: { methode: 'espèces' },
    date: '2025-10-14T10:11:00',
    employe_id: 503
  }
];

function App() {
  return (
    <div className="App">
      <AdminDashboard user={user} products={products} sales={sales} />;
    </div>
  );
}

export default App;
