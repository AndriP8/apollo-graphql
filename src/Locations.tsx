import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery
} from "@apollo/client";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import SpinnerLoading from "./SpinnerLoading";

interface Location {
  locations: {
    __typename: string;
    id: string;
    name: string;
    description: string;
    photo: string;
  }[];
}

const client = new ApolloClient({
  uri: "https://flyby-gateway.herokuapp.com/",
  cache: new InMemoryCache()
});

const Locations = () => {
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

  const { data, loading, error } = useQuery<Location>(GET_LOCATIONS);
  return (
    <ApolloProvider client={client}>
      {loading && <SpinnerLoading />}
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
    </ApolloProvider>
  );
};

export default Locations;
