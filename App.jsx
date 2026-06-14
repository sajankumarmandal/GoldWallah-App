import { StatusBar } from "expo-status-bar";

import HomeScreen from "./src/screens/HomeScreen.jsx";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <HomeScreen />
    </>
  );
}
