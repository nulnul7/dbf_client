import { Route, Routes } from 'react-router-dom';
import Footer from '../src/components/Footer';
import Navbar from '../src/components/Navbar';
import Blog from '../src/pages/Blog';
import BlogDetail from '../src/pages/BlogDetail';
import ErrorPage from '../src/pages/ErrorPage';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Portfolio from '../src/pages/Portfolio';
import './App.css';
import PortfolioRendered from './pages/PortfolioRendered';


function App() {
  return (
    <div className="appContainer">
      <div className='appWrapper'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<PortfolioRendered />} />
          
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          
          <Route path='/masuk' element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
