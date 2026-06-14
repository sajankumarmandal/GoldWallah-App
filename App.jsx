import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";

import HomeScreen from "./src/screens/HomeScreen.jsx";
import LoginScreen from "./src/screens/LoginScreen.jsx";
import RegisterScreen from "./src/screens/RegisterScreen.jsx";

const ROUTES = {
  home: "home",
  login: "login",
  register: "register"
};

export default function App() {
  const [route, setRoute] = useState({ name: ROUTES.home, params: {} });

  const showHome = useCallback(() => {
    setRoute({ name: ROUTES.home, params: {} });
  }, []);

  const showLogin = useCallback(() => {
    setRoute({ name: ROUTES.login, params: {} });
  }, []);

  const showRegister = useCallback((role = "seller") => {
    setRoute({ name: ROUTES.register, params: { role } });
  }, []);

  const renderScreen = () => {
    if (route.name === ROUTES.login) {
      return (
        <LoginScreen
          onBack={showHome}
          onRegisterPress={showRegister}
        />
      );
    }

    if (route.name === ROUTES.register) {
      return (
        <RegisterScreen
          initialRole={route.params.role}
          onBack={showHome}
          onLoginPress={showLogin}
        />
      );
    }

    return (
      <HomeScreen
        onLoginPress={showLogin}
        onRegisterPress={showRegister}
      />
    );
  };

  return (
    <>
      <StatusBar style={route.name === ROUTES.home ? "dark" : "light"} />
      {renderScreen()}
    </>
  );
}
