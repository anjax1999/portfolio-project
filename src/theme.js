import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",  // Czcionka dla nagłówków
    body: "'Lato', sans-serif",        // Czcionka dla tekstu głównego
  },
});

export default theme;

