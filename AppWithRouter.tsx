import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import SpotkaniePage from './pages/SpotkaniePage';
import CennikPage from './pages/CennikPage';
import BlogPage from './pages/BlogPage';
import BlogAdmin from './pages/BlogAdmin';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-slate-50 dark:bg-gray-900 text-slate-700 dark:text-slate-300 transition-colors duration-300 font-sans">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/spotkanie" element={<SpotkaniePage />} />
            <Route path="/cennik" element={<CennikPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog-admin" element={<BlogAdmin />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
