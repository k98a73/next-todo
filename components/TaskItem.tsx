import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
  return (
    <Box w="full" bgColor="teal.100" rounded="full">
      <Text fontSize="lg" color="gray.600" py="1" align="center">
        {props.title}
      </Text>
    </Box>
  );
};

export default TaskItem;
