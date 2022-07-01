import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";

// react-datepickerを導入するならターミナルで「npm install react-datepicker --save」と「npm i --save-dev @types/react-datepicker」を実行
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";

import { db } from "../../lib/firebase";

export default function Create() {
  const [todoTitle, setTodoTitle] = useState("");

  const filterOptions = [
    { label: "notStarted", value: "未着手" },
    { label: "inProgress", value: "作業中" },
    { label: "done", value: "完了" },
  ];
  const [todoStatus, setTodoStatus] = useState("未着手");

  const today = new Date();
  const [todoDate, setTodoDate] = useState<any>(today);
  registerLocale("ja", ja);

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    /* IDはFirebaseで自動的に付与してくれるので、省略 */
    db.collection("tasks").add({
      title: todoTitle,
      status: todoStatus,
      date: todoDate,
    });
    setTodoTitle("");
  };

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
        TODO作成
      </Heading>
      <Container py="3" maxW="800px">
        <FormControl mb="3">
          <VStack>
            <Input
              size="md"
              w="md"
              variant="flushed"
              placeholder="TODOを入力"
              value={todoTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTodoTitle(e.target.value)
              }
            ></Input>
            <Select
              size="md"
              w="100px"
              color="gray.500"
              fontWeight="bold"
              textAlign="center"
              variant="filled"
              onChange={(e) => setTodoStatus(e.target.value)}
            >
              {filterOptions.map(({ value, label }) => (
                <option key={label} value={value}>
                  {value}
                </option>
              ))}
            </Select>
            <HStack>
              <Text w="55px" fontSize="lg" color="gray.600">期限:</Text>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                locale="ja"
                selected={todoDate}
                minDate={today}
                onChange={(selectedDate) => {
                  setTodoDate(selectedDate || today);
                }}
              />
            </HStack>
            <NextLink href="/todos" passHref>
            <IconButton
              aria-label="add"
              as="a"
              shadow="lg"
              bg="white"
              color="gray.400"
              rounded="full"
              icon={<AddIcon />}
              disabled={!todoTitle}
              onClick={newTask}
            />
            </NextLink>
          </VStack>
        </FormControl>
        <Center>
          <NextLink href="/todos" passHref>
            <Button as="a" colorScheme="blackAlpha">
              TODO一覧
            </Button>
          </NextLink>
        </Center>
      </Container>
    </>
  );
}
