import { Button, FileButton, Group, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";

interface UploadAudioProps {
  audio: Blob | null;
  setAudio: (audio: Blob | null) => void;
}

export const UploadAudio = ({ setAudio, audio }: UploadAudioProps) => {
  const { ref, hovered } = useHover();
  return (
    <>
      <Group justify="center">
        <div ref={ref}>
          <FileButton onChange={setAudio} accept="audio/*">
            {(props) => (
              <Button
                {...props}
                styles={{
                  root: {
                    color: "white",
                    borderColor: "violet",
                    borderRadius: "20px",
                    borderWidth: "2.5px",
                    backgroundColor: hovered ? "violet" : "black",
                    transition: "background-color 0.5s ease",
                  },
                }}
              >
                Browse my files
              </Button>
            )}
          </FileButton>
        </div>
      </Group>

      {audio && (
        <Text size="sm" ta="center" mt="sm">
          Picked file
        </Text>
      )}
    </>
  );
};
