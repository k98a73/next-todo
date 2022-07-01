import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { db } from "../../../lib/firebase";

const TodoDetail: React.FC = () => {
  const router = useRouter();
  const todoEditInfo = {
    id: router.query.id,
    title: router.query.title,
    status: router.query.status,
    date: router.query.date,
  };

  const deleteTask = () => {
    db.collection("tasks").doc(router.query.id).delete();
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
        TODO詳細
      </Heading>
      <Container py="3" maxW="800px">
        <VStack>
          <Text
            mt="3"
            fontSize="2xl"
            lineHeight="200%"
            fontWeight="bold"
            color="gray.600"
            py="1"
            align="center"
          >
            id: {router.query.id} <br /> TODO: {router.query.title} <br /> 状況:{" "}
            {router.query.status} <br />
            期限:{" "}
            {new Date(Number(router.query.date))?.getFullYear() +
              "/" +
              (new Date(Number(router.query.date))?.getMonth() + 1) +
              "/" +
              new Date(Number(router.query.date))?.getDate()}
          </Text>
          <HStack>
            <NextLink
              href={{
                pathname: `/todos/${todoEditInfo.id}/edit`,
                query: todoEditInfo,
              }}
              passHref
            >
              <IconButton
                as="a"
                aria-label="edit"
                shadow="lg"
                bg="white"
                color="gray.400"
                rounded="full"
                icon={<EditIcon />}
              ></IconButton>
            </NextLink>
            <NextLink href="/todos" passHref>
              <IconButton
                aria-label="delete"
                as="a"
                shadow="lg"
                bg="white"
                color="gray.400"
                rounded="full"
                icon={<DeleteIcon />}
                onClick={deleteTask}
              />
            </NextLink>
          </HStack>
        </VStack>
        <Center mt="5">
          <NextLink href="/todos" passHref>
            <Button as="a" colorScheme="blackAlpha">
              TODO一覧
            </Button>
          </NextLink>
        </Center>
      </Container>
    </>
  );
};

export default TodoDetail;
