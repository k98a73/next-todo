import React from "react";
import Head from "next/head";
import { Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import useSignOut from "../hooks/useSignOut";

interface PROPS {
  title: string;
}

const Header: React.FC<PROPS> = ({ title }) => {
  return (
    <>
      <Head>
        <title>TODOリスト</title>
      </Head>
      <Flex
        textAlign="center"
        w="full"
        p="2"
        bgColor="cyan.600"
        color="gray.50"
      >
        <Heading>{title}</Heading>
        <Spacer />
        <IconButton
          aria-label="logout"
          bg="cyan.600"
          color="gray.50"
          rounded="full"
          icon={<FaSignOutAlt />}
          onClick={useSignOut()}
        />
      </Flex>
    </>
  );
};

export default Header;
