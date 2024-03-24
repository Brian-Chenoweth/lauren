// Sections
import About from './sections/about';
import Contact from './sections/contact';
import HomeSection from './sections/home';
import Portfolio from './sections/portfolio';
import Services from './sections/services';
import Experience from './sections/experience';

// -------------------

function Home() {
  return (
    <>
      <HomeSection />
      <Services />
      <About />
      <Portfolio />
      <Experience />
      <Contact />
    </>
  );
}

export default Home;
