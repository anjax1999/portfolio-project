import React from "react";
import { Heading, VStack } from "@chakra-ui/react";

const HeadingSection = ({ greeting, bio1 }) => (
  <VStack spacing={6} alignItems="center" w="90%" p={4}>
    <Heading as="h2" fontSize="4xl" fontWeight="100" fontFamily="'Oooh Baby', cursive" color="white">
      {greeting}
    </Heading>
    <Heading as="h1" fontSize="3xl" fontWeight="bold" fontFamily="'Old Standard TT'" color="white">
      {bio1}
    </Heading>
  </VStack>
);

export default HeadingSection;
