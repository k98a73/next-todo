import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { db } from "../../lib/firebase";
import TaskItem from "../../components/TaskItem";

const Home: NextPage = () => {
  const [tasks, setTasks] = useState([
    { id: "", title: "", status: "未着手", date: new Date() },
  ]);

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          status: doc.data().status,
          date: doc.data().date.seconds * 1000,
        }))
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
        <VStack mt="2" spacing="4" justify="center" w="full">
          {tasks.map((task) => {
            const todoInfo = {
              id: task.id,
              title: task.title,
              status: task.status,
              date: task.date,
            };
            return (
              <NextLink
                key={task.id}
                href={{ pathname: `/todos/${task.id}`, query: todoInfo }}
                passHref
              >
                <Box
                  as="a"
                  w="full"
                  bgColor="teal.100"
                  boxShadow="md"
                  rounded="full"
                >
                  <TaskItem
                    id={task.id}
                    title={task.title}
                    status={task.status}
                    date={task.date}
                  />
                </Box>
              </NextLink>
            );
          })}
        </VStack>
        <Center mt="4">
          <NextLink href="/todos/create" passHref>
            <Button as="a" colorScheme="blackAlpha">
              TODO作成
            </Button>
          </NextLink>
        </Center>
      </Container>
    </>
  );
};

export default Home;
