import React from "react";
import { Stack } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import imageLeft from "../images/IMG_3280.png"; 
import HeadingSection from "./HeadingSection";
import BioText from "./BioText";
import ProfileImage from "./ProfileImage";

const LandingSection = () => {
  const greeting = "Hi there!";
  const bio1 = "I'm Ania";
  const bio2 = "I'm a passionate aspiring front-end developer with a love for creating beautiful, intuitive websites.";

  return (
    <Stack
      position="relative"
      height="100vh"
      width="100vw"
      backgroundColor="black"
      padding="0"
      margin="0"
      justifyContent="center"
      alignItems="center"
      spacing={8}  // Ustawienie odstępów między sekcjami
      overflow="visible"
    >

      {/* Zdjęcie wyświetlane dynamicznie w Stack */}
      <HeadingSection greeting={greeting} bio1={bio1} />
      <BioText bio2={bio2} />
      <ProfileImage src={imageLeft}
      />
    </Stack>
  );
};

export default LandingSection;