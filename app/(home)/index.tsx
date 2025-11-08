import { Text, View, StyleSheet, ScrollView, Platform } from "react-native";
import Card from "@/components/card";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "@/type/global";

  const BASE_URL = Platform.select({
    ios: "http://localhost:8800",
    android: "http://10.0.2.2:8800",
    default: "http://localhost:8800",
  });
  const api = `${BASE_URL}/posts`;

  async function fetchPosts() {
    const res = await fetch(api);
    return res.json();
    
  }

export default function App() {

  const { data : posts = [], error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
      {(posts as PostType[]).map((post) => {
        return <Card key={post.id} post={post} />;
        })}
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
 
