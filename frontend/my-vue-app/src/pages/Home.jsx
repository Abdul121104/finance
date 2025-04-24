import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Features from '../components/Features';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Features />
      <About />
      <Services />
      <Contact />
      <Footer/>
    </>
  );
};

export default Home;
