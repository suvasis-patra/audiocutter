import { Button, Flex, Text } from "@mantine/core";
import { FaBackwardStep, FaPlay } from "react-icons/fa6";
export const Controls = ({ format }: { format: string }) => {
  return (
    <Flex
      align={"center"}
      justify={"space-between"}
      style={{
        width: "100%",
        padding: "15px 100px",
        backgroundColor: "#1A1A1A",
        position: "absolute",
        bottom: "0",
        left: "0",
      }}
    >
      <Flex align={"center"} gap={"md"}>
        <Button
          variant="transparent"
          size="lg"
          style={{
            backgroundColor: "black",
            borderRadius: "30px",
            paddingInline: "36px",
          }}
        >
          <FaPlay style={{ color: "white" }} />
        </Button>
        <Button variant="transparent" size="lg">
          <FaBackwardStep style={{ color: "white" }} />
        </Button>
      </Flex>
      <Flex></Flex>
      <Flex align={"center"} gap={"md"}>
        <Flex
          style={{
            backgroundColor: "black",
            padding: ".75rem 2.5rem",
            borderRadius: "18px",
            color: "white",
            fontSize: "20px",
          }}
          align={"center"}
          justify={"center"}
        >
          format :
          {
            <Text style={{ color: "green", paddingInline: "4px" }}>
              {format}
            </Text>
          }
        </Flex>
        <Button
          size="lg"
          style={{
            backgroundColor: "white",
            padding: ".75rem 2.5rem",
            borderRadius: "18px",
            color: "black",
            fontSize: "20px",
          }}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};
