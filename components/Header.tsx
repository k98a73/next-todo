import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";

import { auth } from "../lib/firebase";

interface PROPS {
  title: string;
}

const Header: React.FC<PROPS> = (props) => {
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
        <Heading>{props.title}</Heading>
        <Spacer />
        <NextLink href="/signin" passHref>
          <IconButton
            aria-label="logout"
            as="a"
            bg="cyan.600"
            color="gray.50"
            rounded="full"
            icon={<FaSignOutAlt />}
            onClick={async () => {
              try {
                await auth.signOut();
              } catch (error: any) {
                alert(error.message);
              }
            }}
          />
        </NextLink>
      </Flex>
    </>
  );
};

export default Header;
