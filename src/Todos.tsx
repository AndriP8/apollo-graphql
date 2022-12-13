import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Text
} from "@chakra-ui/react";
import React from "react";
import { Todo } from "./types/Todo";

interface AddTodo {
  addTodo: Todo;
}

const Todos = () => {
  const [todo, setTodo] = React.useState("");

  const ADD_TODO = gql`
    mutation addTodo($type: String!) {
      addTodo(type: $type) {
        id
        type
      }
    }
  `;
  const [addTodo, { data, loading, error }] = useMutation<AddTodo>(ADD_TODO, {
    variables: {
      type: todo
    }
  });

  return (
    <Box>
      {error && <Text>{error.message}</Text>}
      <Heading>Building Mutation Component</Heading>
      <FormControl>
        <Input value={todo} onChange={(e) => setTodo(e.target.value)} />
        <Button onClick={() => addTodo()} color="black">
          Add Todo
        </Button>
      </FormControl>
      {loading && <Text>Submitting....</Text>}
      {data?.addTodo && <Heading>{data.addTodo.type}</Heading>}
    </Box>
  );
};

export default Todos;
