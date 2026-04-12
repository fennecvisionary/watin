import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Search from './components/Search';
import WhyDonate from './components/WhyDonate';
import Register from './components/Register';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { createDonor, fetchDonors, type Donor } from './data';

export default function App() {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const loadDonors = async () => {
      const loadedDonors = await fetchDonors();
      setDonors(loadedDonors);
    };

    void loadDonors();
  }, []);

  const handleRegister = async (newDonor: Donor) => {
    const savedDonor = await createDonor(newDonor);
    setDonors(prev => [{ ...savedDonor, contactTimes: newDonor.contactTimes }, ...prev]);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Stats donors={donors} />
      <Search donors={donors} />
      <WhyDonate />
      <Register onRegister={handleRegister} />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}
