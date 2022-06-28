import { Box, Button, Heading } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

export default function Create() {
  return (
    <Box>
      <Head>
        <title>TODOリスト</title>
      </Head>
      <Heading>TODO作成</Heading>
      <NextLink href="/todos" passHref>
        <Button as="a">TODO一覧に戻る</Button>
      </NextLink>
    </Box>
  );
}
