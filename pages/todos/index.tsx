import type { NextPage } from "next";
import Head from "next/head";
import { Box, Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>TODOリスト</title>
      </Head>
      <Heading>TODO一覧</Heading>
    </Box>
  );
};

export default Home;
