
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


//components
import BasketModal from './components/BasketModal';
import PageNavBar from './components/PageNavBar';
import { BasketProvider } from './components/BasketContext';

//pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
//util
import PageNotFound from './utilities/PageNotFound';
import './App.css'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);

  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  return (
    <main className='site-wrapper'>
      <BasketProvider>
        <Router>
          <PageNavBar openModal={openModal} />
          <Routes>
            <Route path='/pages/Home' element={<Home />} />
            <Route path='/pages/Menu' element={<Menu />} />
            <Route path='/pages/Contact' element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
          </Routes>

        </Router>
        {/* keep modal outside route */}
        <BasketModal isOpen={isModalOpen} onClose={closeModal} />
      </BasketProvider>
    </main>
  )
}

export default App
