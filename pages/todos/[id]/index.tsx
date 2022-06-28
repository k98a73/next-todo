import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function Todo() {
  return (
    <Box>
      <Head>
        <title>TODOリスト</title>
      </Head>
      <Heading>TODO詳細</Heading>
    </Box>
  );
}
