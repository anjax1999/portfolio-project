import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard"; 
import "./LandingSection.css"; // Zaimportowanie pliku CSS

const projects = [
  {
    title: "React Portfolio",
    description:
      "Portfolio Project is a responsive web application built with React, designed to showcase a personal portfolio in a modern and interactive way.",
    getImageSrc: () => require("../images/photo1.jpg"),
  },
  {
    title: "User Management App",
    description:
      "User Management App is a web application built using React and Redux (with Redux Toolkit), designed for managing user information. The app fetches data from a public API and allows filtering of this data based on several criteria.",
    getImageSrc: () => require("../images/photo2.jpg"),
  },
  {
    title: "Online Store Landing Page",
    description:
      "'Mangata and Gallo' is a static landing page designed to demonstrate HTML and CSS skills as well as a sense of aesthetics. The project emphasizes a minimalist, clean design that blends functionality with visual appeal, highlighting the capability to create responsive and visually attractive websites.",
    getImageSrc: () => require("../images/photo3.jpg"),
  },
  {
    title: "Website for Construction Company",
    description:
      "A website designed and built by me from scratch for a construction company.",
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
