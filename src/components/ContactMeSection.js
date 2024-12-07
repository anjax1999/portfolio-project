import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: (values) => {
      submit("https://john.com/contactme", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      comment: Yup.string()
        .min(25, "Must be at least 25 characters")
        .required("Required"),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === "success") {
        formik.resetForm();
      }
    }
  }, [response, onOpen, formik]);

  return (
    <Box
      id="contactme" 
      backgroundColor="#AFC8F9"
 // niebieskie tło
      width="100%" // Pełna szerokość ekranu (viewport width)
      minHeight="100vh" // Pełna wysokość ekranu
      padding="0"
      margin="0"
      boxSizing="border-box" // Zapewnia, że padding nie wpływa na szerokość
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        w={{ base: "90%", md: "80%", lg: "1024px" }} // Dynamiczna szerokość treści
        spacing={8}
        alignItems="flex-start"
        p={{ base: 4, md: 4}} // Różne odstępy w zależności od rozmiaru ekranu
        boxSizing="border-box"
      >
        <Heading  as="h1" className="contactme-title"
  fontsize={{ base: "2xl", md: "3xl", lg: "4xl", "2xl": "4xl", "3xl": "4xl"}}
  fontWeight="bold"
  fontFamily="'Old Standard TT'"
  color="black"
  textAlign="center"
  w="100%">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={!!formik.errors.firstName && formik.touched.firstName}
              >
                <FormLabel htmlFor="firstName" color="black">
                  Name
                </FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                  color="black" // Biały tekst w polu
                  bg="#F5F5F5"  // Jasno fioletowe tło
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor="email" color="black">
                  Email Address
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  color="black" // Biały tekst w polu
                  bg="#F5F5F5"  // Jasno fioletowe tło
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type" color="black">
                  Type of enquiry
                </FormLabel>
                <Select
                  id="type"
                  name="type"
                  {...formik.getFieldProps("type")}
                  color="black" // Biały tekst w polu wyboru
                  bg="#F5F5F5"  // Jasno fioletowe tło selecta
                >
                  <option style={{ color: "black" }} value="hireMe">
                    Freelance project proposal
                  </option>
                  <option style={{ color: "black" }} value="openSource">
                    Open source consultancy session
                  </option>
                  <option style={{ color: "black" }} value="other">
                    Other
                  </option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={!!formik.errors.comment && formik.touched.comment}
              >
                <FormLabel htmlFor="comment" color="black">
                  Your message
                </FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                  color="black" // Biały tekst w textarea
                  bg="#F5F5F5"  // Jasno fioletowe tło textarea
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button
              type="submit"
              bg="black" // Tło czarne
              color="white" // Tekst biały
              width="full"
              isLoading={isLoading}
              _hover={{ bg: "gray.700" }} // Opcjonalnie: zmiana koloru przy najechaniu
            >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Box>
  );
};

export default ContactMeSection;

