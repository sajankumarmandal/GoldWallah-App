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
  const [session, setSession] = useState({ user: null, accessToken: null });

  const showHome = useCallback(() => {
    setRoute({ name: ROUTES.home, params: {} });
  }, []);

  const showLogin = useCallback(() => {
    setRoute({ name: ROUTES.login, params: {} });
  }, []);

  const showRegister = useCallback((role = "seller") => {
    setRoute({ name: ROUTES.register, params: { role } });
  }, []);

  const handleAuthenticated = useCallback((nextSession) => {
    setSession({
      user: nextSession.user,
      accessToken: nextSession.accessToken
    });
    setRoute({ name: ROUTES.home, params: {} });
  }, []);

  const renderScreen = () => {
    if (route.name === ROUTES.login) {
      return (
        <LoginScreen
          onAuthenticated={handleAuthenticated}
          onBack={showHome}
          onRegisterPress={showRegister}
        />
      );
    }

    if (route.name === ROUTES.register) {
      return (
        <RegisterScreen
          initialRole={route.params.role}
          onAuthenticated={handleAuthenticated}
          onBack={showHome}
          onLoginPress={showLogin}
        />
      );
    }

    return (
      <HomeScreen
        onLoginPress={showLogin}
        onRegisterPress={showRegister}
        session={session}
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
