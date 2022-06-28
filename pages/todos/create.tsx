import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function Create() {
  return (
    <Box>
      <Head>
        <title>TODOリスト</title>
      </Head>
      <Heading>TODO作成</Heading>
    </Box>
  );
}
