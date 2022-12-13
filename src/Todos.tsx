import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  VStack
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

  const [addTodo, { data, loading, error, reset }] = useMutation(ADD_TODO, {
    variables: {
      type: todo
    },
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment newTodo on Todo {
                  id
                  type
                }
              `
            });
            return [...existingTodos, newTodoRef];
          }
        }
      });
    }
  });

  return (
    <Box>
      {error && <Text>{error.message}</Text>}
      <Heading>Building Mutation Component</Heading>
      <FormControl>
        <VStack spacing="4">
          <Input value={todo} onChange={(e) => setTodo(e.target.value)} />
          <HStack spacing="2">
            <Button onClick={() => addTodo()} color="black">
              Add Todo
            </Button>
            <Button onClick={() => reset()} color="black">
              Reset Todo
            </Button>
          </HStack>
        </VStack>
      </FormControl>
      {loading && <Text>Submitting....</Text>}
      {data?.addTodo && <Heading>{data.addTodo.type}</Heading>}
    </Box>
  );
};

export default Todos;
