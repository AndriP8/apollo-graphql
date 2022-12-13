import { Box } from "@chakra-ui/react";
import React from "react";
import DogPhoto from "./DogPhoto";
import Dogs from "./Dogs";

function App() {
  const [selectedDog, setSelectedDog] = React.useState("");

  return (
    <Box background="gray.800" minH="100vh" height="full" color="white">
      <Dogs onDogSelect={setSelectedDog} />
      <DogPhoto breed={selectedDog} />
    </Box>
  );
}

export default App;
