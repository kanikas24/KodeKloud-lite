import { useEvent, useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useCallback, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import useVideoPlayback from "../data/hooks/useVideoPlayback";

export default function VideoWithThumbnail({
  id,
  videoSource,
  thumbnail,
  autoPlay = false,
  completed = false,
  onVideoComplete = () => {},
}: {
  id: string;
  videoSource: string;
  thumbnail: string;
  autoPlay?: boolean;
  completed: boolean;
  onVideoComplete: () => void;
}) {
  const { videoPosition, updatePosition } = useVideoPlayback(id);

  const player = useVideoPlayer(videoSource, (player) => {
    if (autoPlay) player.play();
    player.currentTime = videoPosition;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEventListener(player, "playToEnd", () => {
    onVideoComplete();
  });

  useEffect(() => {
    if (!isPlaying) {
      updatePosition(player.currentTime);
    }
  }, [isPlaying, player, updatePosition]);

  const onToggleVideoPlayer = useCallback(() => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      {!isPlaying && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Play video"
          onPress={onToggleVideoPlayer}
          style={styles.overlay}
        >
          <Image source={{ uri: thumbnail }} style={styles.poster} />
          <View style={styles.playBadge}>
            <Text style={styles.playText}>▶</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  poster: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  playBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  playText: { color: "white", fontSize: 28, fontWeight: "700" },
});
