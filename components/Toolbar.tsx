import { Button, Flex } from "@mantine/core";
import {
  FaArrowRotateLeft,
  FaArrowRotateRight,
  FaScissors,
  FaTrash,
} from "react-icons/fa6";

export const Toolbar = () => {
  return (
    <Flex
      align={"center"}
      justify={"flex-end"}
      gap={"xl"}
      style={{ width: "100%", marginTop: "40px" }}
    >
      <Button
        justify="center"
        leftSection={<FaScissors />}
        variant="transparent"
        style={{
          color: "white",
          backgroundColor: "#1A1A1A",
          borderRadius: "15px",
          padding: "18px 24px",
        }}
      >
        Cut
      </Button>
      <Button
        justify="center"
        leftSection={<FaTrash />}
        style={{
          color: "white",
          backgroundColor: "#1A1A1A",
          borderRadius: "15px",
          padding: "18px 24px",
        }}
      >
        Remove
      </Button>
      <Button
        style={{
          color: "white",
          backgroundColor: "#1A1A1A",
          borderRadius: "15px",
          padding: "18px 24px",
        }}
      >
        <FaArrowRotateLeft style={{ color: "white" }} />
      </Button>
      <Button
        style={{
          color: "white",
          backgroundColor: "#1A1A1A",
          borderRadius: "15px",
          padding: "18px 24px",
        }}
      >
        <FaArrowRotateRight style={{ color: "white" }} />
      </Button>
    </Flex>
  );
};
