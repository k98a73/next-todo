import type { NextPage } from "next";
import NextLink from "next/link";
import {
  Button,
  Center,
  Container,
  HStack,
  Select,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { db } from "../../lib/firebase";
import TaskItem from "../../components/TaskItem";
import Header from "../../components/Header";

interface TaskItem {
  id: string;
  title: string;
  status: string;
  date: any;
}

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [idFilter, setIdFilter] = useState("全て");
  const taskId = tasks.map((task) => task.id);
  const taskIdFilter = ["全て", ...taskId];
  const [dateFilter, setDateFilter] = useState("全て");
  const taskDate = tasks.map(
    (task) =>
      new Date(task.date)?.getFullYear() +
      "/" +
      (new Date(task.date)?.getMonth() + 1) +
      "/" +
      new Date(task.date)?.getDate()
  );
  const taskDateFilter = ["全て", ...taskDate];
  const [statusFilter, setStatusFilter] = useState("全て");
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.data().id,
          title: doc.data().title,
          status: doc.data().status,
          date: doc.data().date.seconds * 1000,
        }))
      );
    });
    return () => unSub(); /* アンマウントしたら、firebaseの監視を停止 */
  }, []);

  useEffect(() => {
    const filteringTasksId = () => {
      let isBreak = false;
      for (let id of taskIdFilter) {
        switch (idFilter) {
          case "全て":
            setFilteredTasks(tasks);
            break;
          case id.toString():
            setFilteredTasks(tasks.filter((task) => task.id === id));
            isBreak = true;
            break;
          default:
            setFilteredTasks(tasks);
        }
        if (isBreak) break;
      }
    };
    filteringTasksId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idFilter, tasks]);

  useEffect(() => {
    const filteringTasksDate = () => {
      let isBreak = false;
      for (let date of taskDateFilter) {
        switch (dateFilter) {
          case "全て":
            setFilteredTasks(tasks);
            break;
          case date:
            setFilteredTasks(
              tasks.filter(
                (task) =>
                  new Date(task.date)?.getFullYear() +
                    "/" +
                    (new Date(task.date)?.getMonth() + 1) +
                    "/" +
                    new Date(task.date)?.getDate() ===
                  date
              )
            );
            isBreak = true;
            break;
          default:
            setFilteredTasks(tasks);
        }
        if (isBreak) break;
      }
    };
    filteringTasksDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter, tasks]);

  useEffect(() => {
    const filteringTasksStatus = () => {
      switch (statusFilter) {
        case "未着手":
          setFilteredTasks(tasks.filter((task) => task.status === "未着手"));
          break;
        case "作業中":
          setFilteredTasks(tasks.filter((task) => task.status === "作業中"));
          break;
        case "完了":
          setFilteredTasks(tasks.filter((task) => task.status === "完了"));
          break;
        default:
          setFilteredTasks(tasks);
      }
    };
    filteringTasksStatus();
  }, [statusFilter, tasks]);

  return (
    <>
      <Header title={"TODO一覧"} />
      <Container py="3" maxW="900px">
        <VStack>
          <HStack mb="2">
            <Text fontSize="lg" color="gray.600">
              id:
            </Text>
            <Select
              size="md"
              color="gray.500"
              fontWeight="bold"
              textAlign="center"
              variant="filled"
              value={idFilter}
              onChange={(e) => setIdFilter(e.target.value)}
            >
              {taskIdFilter.map((id: string) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </Select>
          </HStack>
          <Wrap>
            <WrapItem>
              <Text w="55px" fontSize="lg" color="gray.600">
                期限:
              </Text>
              <Select
                size="md"
                color="gray.500"
                fontWeight="bold"
                textAlign="center"
                variant="filled"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                {taskDateFilter.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </Select>
            </WrapItem>
            <WrapItem>
              <Text w="70px" fontSize="lg" color="gray.600">
                状況:
              </Text>
              <Select
                size="md"
                color="gray.500"
                mb="2"
                fontWeight="bold"
                textAlign="center"
                variant="filled"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="全て">全て</option>
                <option value="未着手">未着手</option>
                <option value="作業中">作業中</option>
                <option value="完了">完了</option>
              </Select>
            </WrapItem>
          </Wrap>
          <Wrap>
            {filteredTasks.map((task) => {
              const todoInfo = {
                id: task.id,
                title: task.title,
                status: task.status,
                date: task.date,
              };
              return (
                <NextLink
                  key={task.id}
                  href={{ pathname: `/todos/${task.id}`, query: todoInfo }}
                  passHref
                >
                  <WrapItem
                    as="a"
                    p="3"
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <TaskItem
                      id={task.id}
                      title={task.title}
                      status={task.status}
                      date={task.date}
                    />
                  </WrapItem>
                </NextLink>
              );
            })}
          </Wrap>
        </VStack>
        <Center mt="4">
          <NextLink href="/todos/create" passHref>
            <Button as="a" variant="link">
              TODO作成に進む
            </Button>
          </NextLink>
        </Center>
      </Container>
    </>
  );
};

export default Home;
