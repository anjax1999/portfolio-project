import React from "react";
import { Stack, Box } from "@chakra-ui/react";
import imageLeft from "../images/IMG_3280.png"; 
import HeadingSection from "./HeadingSection";
import BioText from "./BioText";
import ProfileImage from "./ProfileImage";
import "./LandingSection.css";

const LandingSection = () => {
  const greeting = "Hi there!";
  const bio1 = "I'm Ania";
  const bio2 = (
    <>
      <p style={{ marginBottom: "1rem" }}>
        I'm a passionate aspiring front-end developer.
      </p>
      <p>
        In my projects, I blend technical skills with an artistic spirit, always
        guided by a strong sense of aesthetics and precision.
      </p>
</>
  );

  return (
    <Stack
      className="landing-container"
      position="relative"
      height="100vh"
      width="100%"
      backgroundColor="black"
      padding="10"
      margin="0"
      justifyContent="flex-start"
      alignItems="start"
      spacing={{ base: 5, md: 3, lg: 2 }}
      overflow="visible"
    >
      {/* Sekcje tekstowe */}
      <Box className="text-container">
      <HeadingSection className="text-1" greeting={greeting} bio1={bio1}/>
      <BioText className="text-2" bio2={bio2} />
    </Box>

      {/* Obraz wyrównany do dolnej krawędzi LandingSection */}
      <Box
        className="image-container"
        position="absolute"
        bottom="0"         // Ustawienie obrazu na dole LandingSection
        left="0"
        width="100%"      // Dopasowanie szerokości obrazu do szerokości LandingSection
        display="flex"
      >
        <ProfileImage src={imageLeft} />
      </Box>
    </Stack>
  );
};

export default LandingSection;

