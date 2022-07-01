import { Text } from "@chakra-ui/react";
import React from "react";

interface PROPS {
  id: string;
  title: string;
  status: string;
  date: Date;
}

const TaskItem: React.FC<PROPS> = (props) => {
  return (
    <Text fontSize="lg" color="gray.600" py="1" align="center">
      id: {props.id} <br /> TODO: {props.title} <br /> 状況: {props.status}{" "}
      <br />
      期限:{" "}
      {new Date(props.date)?.getFullYear() +
        "/" +
        (new Date(props.date)?.getMonth() + 1) +
        "/" +
        new Date(props.date)?.getDate()}
    </Text>
  );
};

export default TaskItem;
