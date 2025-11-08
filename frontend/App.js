import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Provider as PaperProvider, Button, Card, Title, Paragraph, Text } from "react-native-paper";

export default function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://192.168.0.120:3000/menu");
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchRandom = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://192.168.0.120:3000/menu/random");
      const data = await res.json();
      setMenu([data]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Header component for FlatList
  const ListHeader = () => (
    <View>
      <Text style={styles.title}>☕ Coffee Shop Menu ☕</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={fetchMenu}
          style={styles.button}
          contentStyle={{ paddingVertical: 8 }}
        >
          Full Menu
        </Button>
        <Button
          mode="contained"
          onPress={fetchRandom}
          style={[styles.button, { backgroundColor: "#8d6e63" }]}
          contentStyle={{ paddingVertical: 8 }}
        >
          Surprise Me
        </Button>
      </View>
      {loading && <Text style={styles.loading}>Loading...</Text>}
    </View>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <FlatList
          data={menu}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.itemName}>{item.name}</Title>
                <Paragraph style={styles.category}>{item.category}</Paragraph>
                <Paragraph style={styles.price}>Rs. {item.price}</Paragraph>
                {!item.inStock && <Text style={styles.outOfStock}>Out of Stock ❌</Text>}
              </Card.Content>
            </Card>
          )}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e5f5",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4e342e",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "48%",
    backgroundColor: "#6d4c41",
  },
  card: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3e2723",
  },
  category: {
    fontSize: 14,
    color: "#6d4c41",
    marginVertical: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#388e3c",
  },
  outOfStock: {
    color: "red",
    fontStyle: "italic",
    marginTop: 4,
  },
  loading: {
    fontSize: 18,
    color: "#6d4c41",
    marginVertical: 10,
    textAlign: "center",
  },
});