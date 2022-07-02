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
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import { GrUpdate } from "react-icons/gr";

import { db } from "../../../lib/firebase";
import Header from "../../../components/Header";

export default function Edit() {
  const router = useRouter();
  const [todoEditTitle, setTodoEditTitle] = useState(router.query.title);

  const filterOptions = [
    { label: "notStarted", value: "未着手" },
    { label: "inProgress", value: "作業中" },
    { label: "done", value: "完了" },
  ];
  const [todoEditStatus, setTodoEditStatus] = useState(router.query.status);

  const editDay = new Date(Number(router.query.date));
  const [todoEditDate, setTodoEditDate] = useState<any>(editDay);
  registerLocale("ja", ja);

  const editTask = () => {
    db.collection("tasks").doc(router.query.id).set(
      {
        title: todoEditTitle,
        status: todoEditStatus,
        date: todoEditDate,
      },
      { merge: true }
    );
  };

  return (
    <>
      <Header title="TODO編集" />
      <Container py="3" maxW="800px">
        <FormControl mb="3">
          <VStack>
            <Text fontSize="lg" color="gray.600">
              id: {router.query.id}
            </Text>
            <Input
              size="md"
              w="md"
              variant="flushed"
              placeholder="TODOを入力"
              value={todoEditTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTodoEditTitle(e.target.value)
              }
            ></Input>
            <Select
              size="md"
              w="100px"
              color="gray.500"
              fontWeight="bold"
              textAlign="center"
              variant="filled"
              defaultValue={router.query.status}
              onChange={(e) => setTodoEditStatus(e.target.value)}
            >
              {filterOptions.map(({ value, label }) => (
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
                selected={todoEditDate}
                minDate={new Date()}
                onChange={(selectedDate) => {
                  setTodoEditDate(selectedDate || editDay);
                }}
              />
            </HStack>
            <NextLink href="/todos" passHref>
              <IconButton
                aria-label="todoEdit"
                as="a"
                shadow="lg"
                bg="white"
                color="gray.400"
                rounded="full"
                icon={<GrUpdate />}
                onClick={editTask}
              />
            </NextLink>
          </VStack>
        </FormControl>
        <Center mt="5">
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
