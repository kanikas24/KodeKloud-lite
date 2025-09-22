import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import useInit from "../data/hooks/useInit";
import CourseDetails from "../screens/courseDetails";
import CourseList from "../screens/courseList";
import Home from "../screens/home";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { initialised } = useInit();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {initialised ? (
            <>
              <Stack.Screen name="CourseList" component={CourseList} />
              <Stack.Screen name="CourseDetails" component={CourseDetails} />
            </>
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
