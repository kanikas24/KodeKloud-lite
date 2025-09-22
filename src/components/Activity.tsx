import { useNetInfo } from "@react-native-community/netinfo";
import { Text, View } from "react-native";

const ActivityIndicator = () => {
  const { isConnected } = useNetInfo();
  if (isConnected) return null;
  return (
    <View>
      <Text>Looks like you are offline.</Text>
    </View>
  );
};
export default ActivityIndicator;
