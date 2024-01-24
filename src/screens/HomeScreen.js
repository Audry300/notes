import { ScrollView, SafeAreaView } from "react-native";
import { Card } from "../components/Card";
import { AddButton } from "../components/addButton";

export default HomeScreen = ({ navigation }) => {
  const data = [
    { title: "Title 1", text: "Lorem Ipsum" },
    { title: "Title 2", text: "Lorem Ipsum 2" },
  ];
  return (
    <SafeAreaView>
      <ScrollView>
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            text={item.text}
            onPress={() => navigation.navigate("cardView", { data: item })}
          />
        ))}
        <AddButton
          onPress={() =>
            navigation.navigate("cardView", { data: { title: "", text: "" } })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};
