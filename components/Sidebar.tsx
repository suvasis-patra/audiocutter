import { Box, Flex } from "@mantine/core";
import { FaBars, FaPlus } from "react-icons/fa";

const SIDEBAR_ITEMS = [
  "Remover",
  "Splitter",
  "Joiner",
  "Cutter",
  "Recorder",
  "Karaoke",
];

export const SideBar = ({
  showSideBar,
  setShowSideBar,
}: {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(showSideBar);
  return (
    <Box
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        display: "flex",
        height: "100vh",
        zIndex: 80,
      }}
    >
      <FaBars
        style={{
          position: "absolute",
          zIndex: 50,
          top: "20px",
          left: "20px",
          color: "white",
          cursor: "pointer",
        }}
        size={30}
        onClick={() => setShowSideBar((prev) => !prev)}
      />

      {/* Sidebar container */}
      <Box
        style={{
          position: "absolute",
          top: "0",
          left: showSideBar ? "0" : "-100px", // Hide sidebar when `showSideBar` is false
          transition: "left 0.3s ease", // Smooth slide animation
          width: "80px", // Set width of the sidebar
          height: "100vh", // Full height
          backgroundColor: "#1A1A1A", // Background color
        }}
      >
        <Flex
          direction={"column"}
          gap={"18px"}
          style={{
            padding: "20px",
            paddingTop: "100px",
            maxWidth: "80px",
            overflowX: "clip",
            height: "450px",
            overflowY: "scroll",
          }}
        >
          {SIDEBAR_ITEMS.map((item) => (
            <Flex
              direction={"column"}
              gap={"md"}
              justify={"center"}
              align={"center"}
              key={item}
              style={{ color: "white", fontSize: "12px" }}
            >
              <FaPlus />
              {item}
            </Flex>
          ))}
        </Flex>
        <Flex
          style={{ marginTop: "18px", gap: "20px" }}
          direction={"column"}
          align={"center"}
        >
          <Box style={{ color: "white" }}>Support</Box>
          <Box style={{ color: "white" }}>India</Box>
        </Flex>
      </Box>
    </Box>
  );
};
