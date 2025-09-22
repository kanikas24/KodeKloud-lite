import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useList from "../data/hooks/useList";
import useVideoProgress from "../data/hooks/useVideoProgress";

const CourseList = ({ navigation }: any) => {
  const { items, loading, error, hasMore, loadMore } = useList();

  const { getCourseProgress } = useVideoProgress();

  useEffect(() => {}, [items]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.searchButton}>🔍</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Browse Courses</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={items}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item, index) => item.slug || index.toString()}
        renderItem={({ item }) => {
          const percentage = getCourseProgress(item.slug);

          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CourseDetails", { keyword: item?.slug })
              }
              style={styles.card}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                />
                {percentage ? (
                  <View style={styles.progressBadge}>
                    <Text style={styles.progressText}>
                      {percentage == 100
                        ? "Completed"
                        : percentage > 0
                        ? "In-Progress"
                        : null}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.courseTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.authorName}>{item.author}</Text>
            </TouchableOpacity>
          );
        }}
        onEndReached={() => hasMore && loadMore()}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loading ? <ActivityIndicator style={styles.loader} /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    fontSize: 28,
    color: "#000",
  },
  searchButton: {
    fontSize: 24,
    color: "#000",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    padding: 12,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    marginBottom: 8,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  thumbnail: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  progressBadge: {
    position: "absolute",
    right: 0,
    backgroundColor: "#87ceeb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressText: {
    fontSize: 10,
    padding: 2,
    fontWeight: "bold",
    color: "#000",
  },
  completeText: {
    fontSize: 10,
    color: "#666",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
    lineHeight: 22,
  },
  authorName: {
    fontSize: 14,
    color: "#666",
  },
  loader: {
    margin: 12,
  },
});

export default CourseList;
