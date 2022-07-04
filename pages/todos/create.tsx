import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  FormControl,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

// react-datepickerを導入するならターミナルで「npm install react-datepicker --save」と「npm i --save-dev @types/react-datepicker」を実行
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";

import { db } from "../../lib/firebase";
import Header from "../../components/Header";
import FilterOptions from "../../constans/FilterOptions";

export default function Create() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoStatus, setTodoStatus] = useState("未着手");
  const today = new Date();
  const [todoDate, setTodoDate] = useState<any>(today);
  registerLocale("ja", ja);

  const newTask = () => {
    // 自動採番のドキュメントIDを事前に取得
    const todoID = db.collection("tasks").doc().id;
    db.collection("tasks").doc(todoID).set({
      id: todoID,
      title: todoTitle,
      status: todoStatus,
      date: todoDate,
    });
    setTodoTitle("");
  };

  return (
    <>
      <Header title={"TODO作成"} />
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
            />
            <Select
              size="md"
              w="100px"
              color="gray.500"
              fontWeight="bold"
              textAlign="center"
              variant="filled"
              onChange={(e) => setTodoStatus(e.target.value)}
            >
              {FilterOptions.map(({ value, label }) => (
                <option key={label} value={value}>
                  {value}
                </option>
              ))}
            </Select>
            <HStack>
              <Text w="55px" fontSize="lg" color="gray.600">
                期限:
              </Text>
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
            <Button as="a" variant="link">
              TODO一覧に戻る
            </Button>
          </NextLink>
        </Center>
      </Container>
    </>
  );
}
