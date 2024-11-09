import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductIdentifierPage from './pages/ProductIdentifierPage';
import LeadExtractorPage from './pages/LeadExtractorPage';
import EcomBoostPage from './pages/EcomBoostPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/product-identifier" element={<ProductIdentifierPage />} />
          <Route path="/lead-extractor" element={<LeadExtractorPage />} />
          <Route path="/ecomboost" element={<EcomBoostPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;