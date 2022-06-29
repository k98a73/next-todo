import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { Button, Center, Container, Heading, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { db } from "../../lib/firebase";
import TaskItem from "../../components/TaskItem";

const Home: NextPage = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub(); /* アンマウントしたら、firebaseの監視を停止 */
  }, []);

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
        TODO一覧
      </Heading>
      <Container py="3" maxW="800px">
        <VStack spacing="3" justify="center" w="full">
          {tasks.map((task) => (
            <TaskItem key={task.id} id={task.id} title={task.title} />
          ))}
        </VStack>
        <Center mt="2">
          <NextLink href="/todos/create" passHref>
            <Button as="a" colorScheme="blackAlpha">
              TODO作成に進む
            </Button>
          </NextLink>
        </Center>
      </Container>
    </>
  );
};

export default Home;
