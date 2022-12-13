import { gql, useQuery } from "@apollo/client";
import { Select, Text } from "@chakra-ui/react";
import React from "react";
import SpinnerLoading from "./SpinnerLoading";
import { Dog } from "./types/Dog";

interface GetDog {
  dogs: Pick<Dog, "id" | "breed">[];
}

interface DogsProps {
  onDogSelect: (value: string) => void;
}

const Dogs = (props: DogsProps) => {
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
        <Select
          color="white"
          onChange={(e) => props.onDogSelect(e.target.value)}
        >
          {data.dogs.map((dog) => (
            <option key={dog.id} value={dog.breed} style={{ color: "black" }}>
              {dog.breed}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};

export default Dogs;
