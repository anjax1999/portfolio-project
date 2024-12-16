import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"; 
import React from "react"; 
 
const ProjectCard = ({ title, description, imageSrc }) => { 
    return ( 
      <VStack 
        color="black" 
        backgroundColor="white" 
        cursor="pointer" 
        borderRadius="xl" 
        alignItems="flex-start" // Dodano, aby cała zawartość była wyrównana do lewej
      > 
        <Image borderRadius="xl" src={imageSrc} alt={title} /> 
        <VStack spacing={4} p={4} alignItems="flex-start"> 
          <HStack justifyContent="space-between" alignItems="flex-start" width="100%"> 
            <Heading as="h3" size="md" textAlign="left" width="100%"> 
              {title} 
            </Heading> 
          </HStack> 
          <Text color="#64748b" fontSize="lg" textAlign="left" width="100%"> 
            {description} 
          </Text> 
          <HStack spacing={2} alignItems="center"> 
            <Text textAlign="left">See more</Text> 
            <FontAwesomeIcon icon={faArrowRight} size="1x" /> 
          </HStack> 
        </VStack> 
      </VStack> 
    ); 
}; 
 
export default ProjectCard;
