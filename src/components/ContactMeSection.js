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

const API_URL = "https://portfolio-project-90d9.onrender.com";

const ContactMeSection = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [response, setResponse] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/contactme`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.firstName,
            email: values.email,
            type: values.type,
            message: values.comment,
          }),
        });

        const data = await res.json();
        setResponse({
          type: res.ok ? "success" : "error",
          message: data.message || "Something went wrong",
        });

        if (res.ok) {
          formik.resetForm(); // Resetowanie formularza po sukcesie
        }
      } catch (error) {
        setResponse({
          type: "error",
          message: "Failed to send message. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
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
      alert(`${response.type.toUpperCase()}: ${response.message}`);
    }
  }, [response]);

  return (
    <Box
      id="contactme"
      backgroundColor="#AFC8F9"
      width="100%"
      minHeight="100vh"
      padding="0"
      margin="0"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        w={{ base: "90%", md: "80%", lg: "1024px" }}
        spacing={8}
        alignItems="flex-start"
        p={{ base: 4, md: 4 }}
        boxSizing="border-box"
      >
        <Heading
          as="h1"
          fontsize={{
            base: "2xl",
            md: "3xl",
            lg: "4xl",
            "2xl": "4xl",
            "3xl": "4xl",
          }}
          fontWeight="bold"
          fontFamily="'Old Standard TT'"
          color="black"
          textAlign="center"
          w="100%"
        >
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={
                  !!formik.errors.firstName && formik.touched.firstName
                }
              >
                <FormLabel htmlFor="firstName" color="black">
                  Name
                </FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                  color="black"
                  bg="#F5F5F5"
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
                  color="black"
                  bg="#F5F5F5"
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
                  color="black"
                  bg="#F5F5F5"
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
                  color="black"
                  bg="#F5F5F5"
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                bg="black"
                color="white"
                width="full"
                isLoading={isLoading}
                _hover={{ bg: "gray.700" }}
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
