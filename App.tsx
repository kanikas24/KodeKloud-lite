import { LogBox } from "react-native";
import { Provider } from "react-redux";
import ActivityIndicator from "./src/components/Activity";
import AppNavigator from "./src/navigation/AppNavigator";
import { store } from "./src/state/store";

export default function App() {
  LogBox.ignoreAllLogs(true);

  return (
    <Provider store={store}>
      <ActivityIndicator />
      <AppNavigator />
    </Provider>
  );
}
