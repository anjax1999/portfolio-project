import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box backgroundColor="#18181b" width="100vw"> {/* Ustawienie szerokości na 100% viewportu */}
      <footer>
        <Flex
          px={12}
          color="white"
          justifyContent="center"
          alignItems="center"
          width="100%" 
          height={16}
        >
          <p>Pete • © 2022</p>
        </Flex>
      </footer>
    </Box>
  );
};

export default Footer;


