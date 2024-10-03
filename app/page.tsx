import { AudioCutter } from "@/components/AudioCutter";
import { Container } from "@mantine/core";

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
