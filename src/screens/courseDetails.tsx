// CourseDetail.tsx
import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useVideoProgress from "../data/hooks/useVideoProgress";
import { useCourseDetails } from "../data/models/useCourseDetails";
import { useEnrollment } from "../data/models/useEnrollment";
import VideoWithThumbnail from "./videoPlayer";

const { width } = Dimensions.get("window");

export default function CourseDetails({ navigation }: any) {
  const { params } = useRoute<any>();
  const { details, loading, error } = useCourseDetails(params.keyword);
  const { enrolled, toggleButton } = useEnrollment(params.keyword);
  const { updateVideoComplete, getCourseProgress, getLessonCompleted } =
    useVideoProgress();

  if (loading && !details) return <ActivityIndicator style={styles.loader} />;
  if (error && !details) return <Text style={styles.errorText}>{error}</Text>;
  if (!details) return <Text style={styles.noDataText}>No data</Text>;

  const progress = useMemo(() => {
    if (!details?.lessons_count) return 0;
    return Math.round(
      (getCourseProgress(params.keyword) / details?.lessons_count) * 100
    );
  }, [details, getCourseProgress, params.keyword]);

  const getModuleProgress = (moduleId: string) => {
    const module = details?.modules?.find((m: any) => m.id === moduleId);
    if (!module?.lessons) return 0;

    const completedLessons = module.lessons.filter((lesson: any) =>
      getLessonCompleted(params?.keyword, moduleId, lesson.id)
    ).length;

    return Math.round((completedLessons / module.lessons.length) * 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Image source={{ uri: details.thumbnail }} style={styles.thumbnail} />
          {enrolled && progress > 0 && (
            <View style={styles.progressOverlay}>
              <View style={styles.progressCard}>
                <Text style={styles.progressNumber}>{progress}%</Text>
                <Text style={styles.progressLabel}>Complete</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.title}>{details.title}</Text>
          <Text style={styles.author}>by {details.author}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{details.lessons_count}</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{details.difficultyLevel}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{details.plan}</Text>
              <Text style={styles.statLabel}>Plan</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About this course</Text>
            <Text style={styles.description}>{details.description}</Text>
          </View>

          {enrolled && (
            <View style={styles.modulesContainer}>
              <Text style={styles.sectionTitle}>Course Content</Text>

              <FlatList
                data={details?.modules}
                scrollEnabled={false}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item: module, index }) => {
                  const lessons = Array.isArray(module?.lessons)
                    ? module?.lessons
                    : [];
                  const moduleProgress = getModuleProgress(module.id);

                  return (
                    <View style={styles.moduleCard}>
                      <View style={styles.moduleHeader}>
                        <View style={styles.moduleInfo}>
                          <Text style={styles.moduleNumber}>
                            Module {index + 1}
                          </Text>
                          <Text style={styles.moduleTitle}>
                            {module.title || `Module ${index + 1}`}
                          </Text>
                          <Text style={styles.lessonCount}>
                            {lessons.length}{" "}
                            {lessons.length === 1 ? "lesson" : "lessons"}
                          </Text>
                        </View>

                        <View style={styles.moduleProgressContainer}>
                          <View style={styles.progressCircle}>
                            <Text style={styles.progressCircleText}>
                              {moduleProgress}%
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.progressBarContainer}>
                        <View
                          style={[
                            styles.progressBarFill,
                            { width: `${moduleProgress}%` },
                          ]}
                        />
                      </View>

                      <FlatList
                        data={lessons}
                        scrollEnabled={false}
                        keyExtractor={(lesson: any) => lesson.id}
                        renderItem={({ item: lesson, index }) => {
                          const isCompleted = getLessonCompleted(
                            params?.keyword,
                            module?.id,
                            lesson.id
                          );

                          return (
                            <View style={styles.lessonItem}>
                              <View style={styles.lessonHeader}>
                                <View style={styles.lessonCheckbox}>
                                  {isCompleted ? (
                                    <Text style={styles.checkmark}>✓</Text>
                                  ) : (
                                    <View style={styles.uncheckedCircle} />
                                  )}
                                </View>

                                <Text
                                  style={styles.lessonTitle}
                                  numberOfLines={1}
                                >
                                  {lesson.title || `Lesson ${index + 1}`}
                                </Text>

                                <Text style={styles.lessonDuration}>
                                  {lesson.duration || "5:30"}
                                </Text>
                              </View>

                              <VideoWithThumbnail
                                id={lesson?.id}
                                videoSource={
                                  "https://vod-adaptive-ak.vimeocdn.com/exp=1758522989~acl=%2F004489bf-fe0b-429a-9020-2f8ed4b4926c%2F%2A~hmac=46faede2d69e72e636f8a092d03f09c3fdd3c603bf1cac8d042bfbc30684ed1e/004489bf-fe0b-429a-9020-2f8ed4b4926c/v2/playlist/av/primary/playlist.m3u8?omit=opus\u0026pathsig=8c953e4f~H8hSWn1wTP3tTbWmLjWrz0GPEmDOaXEqolcVzFyWQGE\u0026r=dXM%3D\u0026rh=2UhH3q\u0026sf=fmp4"
                                }
                                thumbnail={details.thumbnail}
                                completed={isCompleted}
                                onVideoComplete={() => {
                                  updateVideoComplete(
                                    params?.keyword,
                                    module?.id,
                                    lesson.id
                                  );
                                }}
                              />
                            </View>
                          );
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          onPress={toggleButton}
          style={[styles.enrollButton, enrolled && styles.enrolledButton]}
          activeOpacity={0.8}
        >
          <Text style={styles.enrollButtonText}>
            {enrolled ? "✓ Enrolled" : "Enroll Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
  backButtonText: {
    fontSize: 24,
    color: "#000",
    marginLeft: -2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    padding: 16,
    textAlign: "center",
  },
  noDataText: {
    padding: 16,
    textAlign: "center",
    color: "#666",
  },
  heroSection: {
    position: "relative",
  },
  thumbnail: {
    width: width,
    height: 240,
    backgroundColor: "#eee",
  },
  progressOverlay: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  progressLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  contentSection: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
  },
  descriptionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  modulesContainer: {
    marginTop: 24,
  },
  moduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleNumber: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 4,
  },
  lessonCount: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  moduleProgressContainer: {
    marginLeft: 12,
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 3,
  },
  bottomSpacer: {
    height: 20,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  enrollButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  enrolledButton: {
    backgroundColor: "#4CAF50",
  },
  enrollButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  lessonItem: {
    marginBottom: 12,
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  lessonCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  uncheckedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CCC",
    backgroundColor: "transparent",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  lessonTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginRight: 8,
  },
  lessonDuration: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
});
