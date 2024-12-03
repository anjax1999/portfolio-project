import ContactMeSection from "./components/ContactMeSection";
import Footer from "./components/Footer";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";
import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import LandingSection from './components/LandingSection';
import ProjectsSection from './components/ProjectsSection';
import theme from './theme';  // Importujemy niestandardowy temat z breakpointami

function App() {
  return (
    <ChakraProvider theme={theme}>  {/* Przekazujemy niestandardowy temat do ChakraProvider */}
      <AlertProvider>
        <main>
          <Header />
          <LandingSection />
          <ProjectsSection />
          <ContactMeSection />
          <Footer />
          <Alert />
        </main>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
