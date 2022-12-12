import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { Box, Heading, Image, Spinner, Text } from "@chakra-ui/react";

interface Data {
  locations: {
    __typename: string;
    id: string;
    name: string;
    description: string;
    photo: string;
  }[];
}

function App() {
  const GET_LOCATIONS = gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `;

  const { data, loading, error } = useQuery<Data>(GET_LOCATIONS);

  return (
    <Box background="gray.800" minH="100vh" height="full" color="white">
      {loading && <Spinner />}
      {error && <Text>{error.message}</Text>}
      {data &&
        data?.locations.map((location) => {
          return (
            <Box key={location.id}>
              <Heading>{location.name}</Heading>
              <Image src={location.photo} />
              <Text>About this location</Text>
              <Text>{location.description}</Text>
            </Box>
          );
        })}
    </Box>
  );
}

export default App;
