import { AudioCutter } from "@/components/AudioCutter";
import { Controls } from "@/components/Controls";
import { UploadAudio } from "@/components/UploadAudio";
import { Box, Button, Flex, Title, Text, Container } from "@mantine/core";

export default function Home() {
  return (
    <Container
      fluid
      style={{
        height: "100vh",
        position: "relative",
        overflow: "clip",
        padding: "0",
      }}
    >
      <AudioCutter />
    </Container>
  );
}
