import React from "react";
import { Image } from "@chakra-ui/react";

const ProfileImage = ({ src }) => (
  <Image
    src={src}
    objectFit="cover"
    objectPosition="left"                                   // Wyrównanie obrazu do lewej
    width={{ base: "96%", lg: "100%", xl: "60%" }}          // Responsywna szerokość
    height="auto"                                           // Zachowanie proporcji obrazu
    maxWidth="800px"                                        // Maksymalna szerokość
    maxHeight="80vh"                                        // Maksymalna wysokość (80% wysokości okna)
    marginLeft={{ base: "0", lg: "-40px", xl: "-60px" }}    // Przesunięcie w lewo na szerokich ekranach
  />
);

export default ProfileImage;

