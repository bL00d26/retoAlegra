import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';
import NotFound from './pages/NotFound';
import { socket, SocketContext } from './context/socketContext';
import IngredientsPage from './pages/IngredientsPage';
import OrdersPage from './pages/OrdersPage';
import RecipesPage from './pages/RecipesPage';
import BuyRecordsPage from './pages/BuyRecordsPage';

function App() {
  const socketValue = useMemo(() => ({ socket }), []);
  return (
    <SocketContext.Provider value={socketValue}>
      <BrowserRouter>
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Navigate to="/orders" />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/buy-records" element={<BuyRecordsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
