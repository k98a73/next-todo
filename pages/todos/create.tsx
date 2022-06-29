import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";

import { db } from "../../lib/firebase";

export default function Create() {
  const [input, setInput] = useState("");

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    /* IDはFirebaseで自動的に付与してくれるので、省略 */
    db.collection("tasks").add({ title: input });
    setInput("");
  };

  return (
    <>
      <Head>
        <title>TODOリスト</title>
      </Head>
      <Heading
        textAlign="center"
        w="full"
        py="2"
        bgColor="cyan.600"
        color="gray.50"
      >
        TODO作成
      </Heading>
      <Container py="3" maxW="800px">
        <FormControl mb="3">
          <Flex align="center" justify="center">
            <Input
              size="md"
              w="md"
              variant="flushed"
              placeholder="TODOを入力"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
            ></Input>
            <IconButton
              aria-label="add"
              shadow="lg"
              bg="white"
              color="gray.400"
              rounded="full"
              icon={<AddIcon />}
              disabled={!input}
              onClick={newTask}
            ></IconButton>
          </Flex>
        </FormControl>
        <Center>
          <NextLink href="/todos" passHref>
            <Button as="a" colorScheme="blackAlpha">
              TODO一覧に戻る
            </Button>
          </NextLink>
        </Center>
      </Container>
    </>
  );
}
