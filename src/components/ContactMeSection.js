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
      backgroundColor="#512DA8" // Fioletowe tło
      width="100vw" // Pełna szerokość ekranu (viewport width)
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
        p={{ base: 4, md: 16 }} // Różne odstępy w zależności od rozmiaru ekranu
        boxSizing="border-box"
      >
        <Heading as="h1" id="contactme-section" color="white">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={!!formik.errors.firstName && formik.touched.firstName}
              >
                <FormLabel htmlFor="firstName" color="white">
                  Name
                </FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                  color="white" // Biały tekst w polu
                  bg="#D8BFD8"  // Jasno fioletowe tło
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor="email" color="white">
                  Email Address
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  color="white" // Biały tekst w polu
                  bg="#D8BFD8"  // Jasno fioletowe tło
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type" color="white">
                  Type of enquiry
                </FormLabel>
                <Select
                  id="type"
                  name="type"
                  {...formik.getFieldProps("type")}
                  color="white" // Biały tekst w polu wyboru
                  bg="#D8BFD8"  // Jasno fioletowe tło selecta
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
                <FormLabel htmlFor="comment" color="white">
                  Your message
                </FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                  color="white" // Biały tekst w textarea
                  bg="#D8BFD8"  // Jasno fioletowe tło textarea
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
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

