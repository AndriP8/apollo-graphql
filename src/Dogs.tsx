import { gql, useQuery } from "@apollo/client";
import { Box, Select, Text } from "@chakra-ui/react";
import React from "react";
import DogPhoto from "./DogPhoto";
import SpinnerLoading from "./SpinnerLoading";
import { Dog } from "./types/Dog";

interface GetDog {
  dogs: Pick<Dog, "id" | "breed">[];
}

const Dogs = () => {
  const [selectedDog, setSelectedDog] = React.useState("");

  const GET_DOGS = gql`
    query GetDogs {
      dogs {
        id
        breed
      }
    }
  `;

  const { data, loading, error } = useQuery<GetDog>(GET_DOGS);

  return (
    <>
      {loading && <SpinnerLoading />}
      {error && <Text>{error.message}</Text>}
      {data && (
        <Box>
          <Select
            color="white"
            onChange={(e) => setSelectedDog(e.target.value)}
          >
            {data.dogs.map((dog) => (
              <option key={dog.id} value={dog.breed} style={{ color: "black" }}>
                {dog.breed}
              </option>
            ))}
          </Select>
          <DogPhoto breed={selectedDog} />
        </Box>
      )}
    </>
  );
};

export default Dogs;
