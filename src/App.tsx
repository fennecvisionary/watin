import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Search from './components/Search';
import WhyDonate from './components/WhyDonate';
import Register from './components/Register';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { MOCK_DONORS, type Donor } from './data';

export default function App() {
  const [donors, setDonors] = useState<Donor[]>([...MOCK_DONORS]);

  const handleRegister = (newDonor: Donor) => {
    setDonors(prev => [newDonor, ...prev]);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Search donors={donors} />
      <WhyDonate />
      <Register onRegister={handleRegister} />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}
