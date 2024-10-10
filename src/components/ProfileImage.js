import React from "react";
import { Image } from "@chakra-ui/react";

const ProfileImage = ({ src }) => (
  <Image
    src={src}
    position="absolute"
    borrom="0"
    objectFit="contain"
    width={{ base: "80%", md: "60%", xl: "70%", "2xl": "60%" }}
    height="auto"
    alignSelf="flex-end"
    left={{ md: "0", xl: "0", "2xl": "0" }}
  />
);

export default ProfileImage;
