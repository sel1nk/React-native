import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const data = [
    { id: '1', name: 'Selin' },
    { id: '2', name: 'Ahmet' },
    { id: '3', name: 'Ayşe' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Profile', { userName: item.name })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function ProfileScreen({ route }) {
  const { userName } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Sayfası</Text>
      <Text>Kullanıcı: {userName}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  item: {
    padding: 15,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
