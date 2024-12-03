import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import {
  Box,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Link,
  useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";  // Poprawny import

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: anjax1999@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/anjax1999",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/anna-dziedzic-734716180",
  }
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();  // useDisclosure do otwierania/zamykania Drawer
  const headerRef = useRef(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) {
        return;
      }
      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = "translateY(0)";
      } else {
        headerElement.style.transform = "translateY(-200px)";
      }
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;  // Poprawiony template literal
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      ref={headerRef}
      zIndex={1000}  // Zapewnia widoczność na szczycie
      width="100%" // Dostosowanie do szerokości ekranu
      maxWidth="100%" // Zapewnia, że pasek nie przekracza szerokości ekranu
      padding={{ base: "0 10px", md: "0 60px" }} // Zmniejszony padding dla mobilnych ekranów
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={4} // Zmniejszony padding poziomy, aby przesunąć hamburgera w lewo
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Menu hamburgerowe dla mobilnych urządzeń */}
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
          />

          {/* Drawer - rozwijane menu dla mobilnych */}
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent maxWidth="250px"> {/* Zmniejszenie szerokości Drawer */}
              <DrawerCloseButton />
              <DrawerBody>
                <VStack spacing={30} mt={35}>
                <Link fontSize="1xl" href="#projects">Projects</Link>
<Link fontSize="1xl" href="#contactme">Contact Me</Link>

                  {socials.map(({ icon, url }) => (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={icon} size="3x" />
                    </a>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          {/* Zwykła nawigacja dla większych ekranów */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            {socials.map(({ icon, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={icon} size="2x" />
              </a>
            ))}
          </HStack>
          
          {/* Linki Projects i Contact Me - widoczne tylko na większych ekranach */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          <Link fontSize="1xl" href="#projects" onClick={handleClick("projects")}>Projects</Link>
<Link fontSize="1xl" href="#contactme" onClick={handleClick("contactme")}>Contact Me</Link>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;


