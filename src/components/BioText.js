import React from "react";
import { Text, VStack } from "@chakra-ui/react"; // Użycie VStack do pionowego ułożenia

const BioText = ({ bio2 }) => {
  return (
    <VStack> {/* Kontener do pionowego układu */}
      <Text fontSize="lg" alignItems="center" fontWeight="normal" fontFamily="'Montserrat', sans-serif" color="white">
        {bio2}
      </Text>
    </VStack>
  );
};

export default BioText;
