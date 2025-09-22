import AsyncStorage from "@react-native-async-storage/async-storage";

const key = (keyword: string) => `enrolled:${keyword}`;
export async function getEnrolled(keyword: string): Promise<boolean> {
  return (await AsyncStorage.getItem(key(keyword))) === "1";
}

export async function setEnrolled(keyword: string, value: boolean) {
  await AsyncStorage.setItem(key(keyword), value ? "1" : "0");
}
