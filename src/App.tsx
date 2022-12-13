import { Box } from "@chakra-ui/react";
import Todos from "./Todos";

function App() {
  return (
    <Box background="gray.800" minH="100vh" height="full" color="white">
      {/* 
      Queries
      <Dogs />
      */}
      <Todos />
    </Box>
  );
}

export default App;
