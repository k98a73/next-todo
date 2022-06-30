import { Box, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

const TodoDetail: React.FC = () => {
  const router = useRouter();
  console.log("router.query.date", router.query.date);

  return (
    <Box>
      <Head>
        <title>TODOリスト</title>
      </Head>
      <Heading>TODO詳細</Heading>
      <Text fontSize="lg" color="gray.600" py="1" align="center">
        id:{router.query.id} <br /> TODO:{router.query.title} <br /> 状況:{router.query.status}{" "}
        <br />
        期限:
        {new Date(router.query.date)?.getFullYear() +
          "/" +
          (new Date(router.query.date)?.getMonth() + 1) +
          "/" +
          new Date(router.query.date)?.getDate()}
      </Text>
    </Box>
  );
};

export default TodoDetail;
