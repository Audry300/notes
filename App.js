import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ContextProvider } from "./src/services/context";
import HomeScreen from "./src/screens/HomeScreen";
import CardScreen from "./src/screens/CardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerTitle: null }}
          />
          <Stack.Screen
            name="cardView"
            component={CardScreen}
            options={{ headerTitle: null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
