import React from "react";
import { Text } from "@chakra-ui/react";

const BioText = ({ bio2 }) => {
    return (
      <Text fontSize="lg" fontWeight="normal" fontFamily="'Montserrat', sans-serif" color="white">
        {bio2}
      </Text>
    );
  };  


export default BioText;
