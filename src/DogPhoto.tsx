import { gql, useLazyQuery } from "@apollo/client";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Dog } from "./types/Dog";

interface DogPhotoProps {
  breed: any;
}

interface GetDogPhoto {
  dog: Pick<Dog, "displayImage" | "id">;
}

const DogPhoto = (props: DogPhotoProps) => {
  const GET_DOG_PHOTO = gql`
    query Dog($breed: String!) {
      dog(breed: $breed) {
        id
        displayImage
      }
    }
  `;

  const [getDog, { data, error }] = useLazyQuery<GetDogPhoto>(GET_DOG_PHOTO);

  return (
    <>
      {error && <Text>{error.message}</Text>}
      <Box>
        {data && <Image src={data.dog.displayImage} width="80" height="80" />}
        <Button
          color="black"
          onClick={() => getDog({ variables: { breed: "bulldog" } })}
        >
          Refetch
        </Button>
      </Box>
    </>
  );
};

export default DogPhoto;
