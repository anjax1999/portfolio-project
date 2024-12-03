import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard"; // Załóżmy, że masz komponent do wyświetlania kart projektów
import "./LandingSection.css"; // Zaimportowanie pliku CSS

const projects = [
  {
    title: "React Space",
    description:
      "Handy tool belt to create amazing AR components in a React app, with redux integration via middleware️",
    getImageSrc: () => require("../images/photo1.jpg"),
  },
  {
    title: "React Infinite Scroll",
    description:
      "A scrollable bottom sheet with virtualisation support, native animations at 60 FPS and fully implemented in JS land 🔥️",
    getImageSrc: () => require("../images/photo2.jpg"),
  },
  {
    title: "Photo Gallery",
    description:
      "A One-stop shop for photographers to share and monetize their photos, allowing them to have a second source of income",
    getImageSrc: () => require("../images/photo3.jpg"),
  },
  {
    title: "Event planner",
    description:
      "A mobile application for leisure seekers to discover unique events and activities in their city with a few taps",
    getImageSrc: () => require("../images/photo4.jpg"),
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects-section" className="projects-section">
      <Box
        backgroundColor="#f6e1c3" // kremowe tlo
        width="100%" // Ustawienie pełnej szerokości ekranu
        minHeight="100vh" // Minimalna wysokość ekranu
        padding="0"
        margin="0"

        boxSizing="border-box" // Zapewnia, że padding nie wpływa na szerokość
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflowX="visible"
      >
        <VStack
          w={{ base: "90%", md: "80%", lg: "1024px" }} // Dynamiczna szerokość treści
          spacing={8}
          alignItems="center"
          textAlign="center"
          p={{ base: 4, md: 8 }}
          boxSizing="border-box"
        >
          <Heading
  as="h1"
  className="projects-title"
  fontsize={{ base: "2xl", md: "3xl", lg: "4xl", "2xl": "4xl", "3xl": "4xl"}}
  fontWeight="bold"
  fontFamily="'Old Standard TT'"
  color="#A97F6B"
  textAlign="center"
  w="100%"
>
  Featured Projects
</Heading>

          <Box
            display="grid"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))" // Siatka z projektami w dwóch kolumnach
            gridGap={8}
            w="100%" // Szerokość siatki dopasowana do szerokości kontenera
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                url="https://github.com/rgommezz/react-native-offline"
                imageSrc={project.getImageSrc()}
              />
            ))}
          </Box>
        </VStack>
      </Box>
    </section>
  );
};

export default ProjectsSection;
