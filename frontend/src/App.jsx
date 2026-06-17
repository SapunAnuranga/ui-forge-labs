import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import TemplateDetails from './pages/TemplateDetails';
import AdminLayout from './pages/Admin/AdminLayout';
import LicensePage from './pages/License';
import FAQPage from './pages/FAQ';
import ChangelogPage from './pages/Changelog';
import DocumentPage from './pages/Documentation';
import TemplateFooterPage from './pages/FooterTemp';



const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/license" element={<LicensePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/template/:id" element={<TemplateDetails />} />
            <Route path="/admin/*" element={<AdminLayout />} />


             
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/license" element={<LicensePage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/documentation" element={<DocumentPage />} />
            <Route path="/templatesfooter" element={<TemplateFooterPage />} />

          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;




