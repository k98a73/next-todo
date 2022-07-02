import {
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

import { auth } from "../lib/firebase";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
        ログイン
      </Heading>
      <Container py="3" maxW="800px">
        <FormControl mb="3">
          <VStack>
            <Input
              size="md"
              w="md"
              variant="flushed"
              placeholder="Emailを入力"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <InputGroup size="md" w="md">
              <Input
                pr="4.5rem"
                variant="flushed"
                placeholder="パスワードを入力"
                type={show ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "非表示" : "表示"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <NextLink href="/todos" passHref>
              <IconButton
                aria-label="add"
                as="a"
                shadow="lg"
                bg="white"
                color="gray.400"
                rounded="full"
                icon={<FaSignInAlt />}
                onClick={async () => {
                  try {
                    await auth.signInWithEmailAndPassword(email, password);
                  } catch (error: any) {
                    alert(error.message);
                  }
                }}
              />
            </NextLink>
          </VStack>
        </FormControl>
        <Center mt="5">
          <NextLink href="/signup" passHref>
            <Button as="a" variant="link">
              新規登録はこちら
            </Button>
          </NextLink>
        </Center>
      </Container>
    </>
  );
};

export default SignIn;
