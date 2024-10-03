"use client";
import { useRef, useState, useEffect } from "react";
import { Flex, Text, Title, Button, Box } from "@mantine/core";
import { AudioVisualizer } from "react-audio-visualize";
import { UploadAudio } from "./UploadAudio";
import { Toolbar } from "./Toolbar";
import { Controls } from "./Controls";
import { SideBar } from "./Sidebar";

export const AudioCutter = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [audio, setAudio] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [_, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  //   const [isPlaying, setIsPlaying] = useState(false);
  const [leftTrimmerPos, setLeftTrimmerPos] = useState(0);
  const [rightTrimmerPos, setRightTrimmerPos] = useState(100);
  const [isDragging, setIsDragging] = useState<"left" | "right" | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const visualizerRef = useRef<HTMLCanvasElement>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  useEffect(() => {
    if (audio && audioElementRef.current) {
      const audioUrl = URL.createObjectURL(audio);
      audioElementRef.current.src = audioUrl;
      const file = audio as File;
      setFileName(file.name);
    }
  }, [audio]);

  // Handle play/pause toggle
  //   const togglePlayPause = () => {
  //     if (audioElementRef.current) {
  //       if (isPlaying) {
  //         audioElementRef.current.pause();
  //       } else {
  //         audioElementRef.current.play();
  //       }
  //       setIsPlaying(!isPlaying);
  //     }
  //   };

  // Update current time
  const handleTimeUpdate = () => {
    if (audioElementRef.current) {
      setCurrentTime(audioElementRef.current.currentTime);
    }
  };

  // Handle when audio is loaded and get duration
  const handleLoadedMetadata = () => {
    if (audioElementRef.current) {
      setDuration(audioElementRef.current.duration);
    }
  };

  // Calculate the position of the vertical line based on current time
  //   const getSliderPosition = () => {
  //     return (currentTime / duration) * 100;
  //   };

  // Convert trimmer position to time
  const getTrimmerTime = (pos: number) => {
    return (pos / 100) * duration;
  };

  // Mouse down event for trimmers
  const handleMouseDown = (e: React.MouseEvent, isLeft: boolean) => {
    setIsDragging(isLeft ? "left" : "right");
    e.preventDefault(); // Prevent default drag behavior
  };

  // Mouse move event to handle dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const visualizerRect = visualizerRef.current?.getBoundingClientRect();
    if (visualizerRect) {
      const newPos =
        ((e.clientX - visualizerRect.left) / visualizerRect.width) * 100;

      if (
        isDragging === "left" &&
        newPos >= 0 &&
        newPos < rightTrimmerPos - 1
      ) {
        setLeftTrimmerPos(newPos);
      } else if (
        isDragging === "right" &&
        newPos <= 100 &&
        newPos > leftTrimmerPos + 1
      ) {
        setRightTrimmerPos(newPos);
      }
    }
  };

  // Mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // Function to trim the audio
  const trimAudio = () => {
    const start = getTrimmerTime(leftTrimmerPos);
    const end = getTrimmerTime(rightTrimmerPos);
    console.log(`Trimmed from ${formatTime(start)} to ${formatTime(end)}`);
  };

  // Use effect to add/remove global mouse move and mouse up listeners
  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseUpWrapper = () => handleMouseUp();

    // Only add listeners when dragging
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMoveWrapper);
      window.addEventListener("mouseup", handleMouseUpWrapper);
    }

    // Cleanup when the component is unmounted or when dragging stops
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveWrapper);
      window.removeEventListener("mouseup", handleMouseUpWrapper);
    };
  }, [isDragging]); // Re-run the effect when dragging state changes

  return (
    <Flex
      style={{
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
      align={"center"}
      justify={"center"}
    >
      <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <Flex
        align={"center"}
        justify={"center"}
        color="white"
        direction={"column"}
        gap={"md"}
      >
        {!audio ? (
          <>
            <Title style={{ color: "white" }}>Audio Cutter</Title>
            <Text size="24px" my={"md"} style={{ color: "white" }}>
              Free editor to trim and cut any audio file online
            </Text>
            <UploadAudio audio={audio} setAudio={setAudio} />
          </>
        ) : (
          <Box style={{ position: "relative" }}>
            <Flex
              align={"cneter"}
              justify={"flex-end"}
              style={{ color: "white", marginBottom: "2px", fontSize: "14px" }}
            >
              {fileName}
            </Flex>
            <Flex
              align={"center"}
              justify={"center"}
              style={{ position: "relative" }}
            >
              <AudioVisualizer
                ref={visualizerRef}
                blob={audio}
                width={1000}
                height={150}
                barWidth={1}
                backgroundColor={"#1A1A1A"}
                barPlayedColor="white"
                gap={0}
                barColor={"#00ff8e"}
              />

              {/* Left Trimmer */}
              <Box
                onMouseDown={(e) => handleMouseDown(e, true)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: `${leftTrimmerPos}%`,
                  height: "100%",
                  width: "10px",
                  marginLeft: "-10px",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  backgroundColor: "#99ffcc",
                  cursor: "ew-resize",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Dots inside Left Trimmer */}
                <Flex direction="column" align="center" gap={2}>
                  {[...new Array(3).fill(0)].map((_, i) => (
                    <Box
                      key={i}
                      style={{
                        height: "3px",
                        width: "3px",
                        borderRadius: "50%",
                        backgroundColor: isDragging ? "white" : "black",
                        transition: "background-color 0.3s",
                      }}
                    />
                  ))}
                </Flex>
              </Box>

              {/* Right Trimmer */}
              <Box
                onMouseDown={(e) => handleMouseDown(e, false)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: `${rightTrimmerPos}%`,
                  height: "100%",
                  width: "10px",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  backgroundColor: "#99ffcc",
                  cursor: "ew-resize",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Dots inside Right Trimmer */}
                <Flex direction="column" align="center" gap={2}>
                  {[...new Array(3).fill(0)].map((_, i) => (
                    <Box
                      key={i}
                      style={{
                        height: "3px",
                        width: "3px",
                        borderRadius: "50%",
                        backgroundColor: isDragging ? "white" : "black",
                        transition: "background-color 0.3s",
                      }}
                      className={isDragging === "right" ? "bg-black" : ""}
                    />
                  ))}
                </Flex>
              </Box>
            </Flex>

            {/* Positioning Time Stamps */}
            <Flex
              justify={"space-between"}
              mt={10}
              style={{ top: "80%", left: 0, right: 0, position: "relative" }}
            >
              <Text
                style={{
                  position: "absolute",
                  left: `${leftTrimmerPos}%`,
                  transform: "translateX(-50%)",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                {formatTime(getTrimmerTime(leftTrimmerPos))}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  left: `${rightTrimmerPos}%`,
                  color: "white",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                }}
              >
                {formatTime(getTrimmerTime(rightTrimmerPos))}
              </Text>
            </Flex>
            <Toolbar />
            <Button onClick={trimAudio} mt={10} color="green">
              Trim Audio
            </Button>
            <audio
              ref={audioElementRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              style={{ display: "none" }}
            />
          </Box>
        )}
      </Flex>
      {audio && <Controls format="mp3" />}
    </Flex>
  );
};
