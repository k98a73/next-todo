import type { NextPage } from "next";
import Head from "next/head";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { db } from "../../lib/firebase";

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
      <Heading>TODO一覧</Heading>
      <Box>
        {tasks.map((task, index) => (
          <Text key={index}>{task.title}</Text>
        ))}
      </Box>
    </>
  );
};

export default Home;
