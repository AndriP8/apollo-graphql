import { gql, useQuery } from "@apollo/client";
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

  const { data, error, networkStatus, refetch } = useQuery<GetDogPhoto>(
    GET_DOG_PHOTO,
    {
      variables: { breed: props.breed },
      notifyOnNetworkStatusChange: true,
      pollInterval: 2000,
      fetchPolicy: "cache-first"
    }
  );

  console.log(networkStatus);

  return (
    <>
      {error && <Text>{error.message}</Text>}
      {data && (
        <Box>
          <Image src={data.dog.displayImage} width="80" height="80" />
          <Button color="black" onClick={() => refetch({ breed: "bulldog" })}>
            Refetch
          </Button>
        </Box>
      )}
    </>
  );
};

export default DogPhoto;
