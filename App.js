import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const data = [
    { id: '1', name: '1. Kat' },
    { id: '2', name: '2. Kat' },
    { id: '3', name: '3. Kat' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Kat', { floorName: item.name })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
function generateParkingSlots(b){
  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    status: 'empty',
    block: b,
  }));
}
function FloorScreen({ route }) {
  const { floorName } = route.params;
  const allSlots = [
    ...generateParkingSlots('A'),
    ...generateParkingSlots('B'),
    ...generateParkingSlots('C'),
  ];

  // Bloklara göre grupla
  const groupedByBlock = allSlots.reduce((acc, slot) => {
    if (!acc[slot.block]) acc[slot.block] = [];
    acc[slot.block].push(slot);
    return acc;
  }, {});
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{floorName}</Text>
      
      {Object.entries(groupedByBlock).map(([blockName, slots]) => (
        <View key={blockName}>
          <Text style={styles.title}>{blockName} Bloğu:</Text>
          <View style={styles.grid}>
            {slots.map((slot) => (
              <View key={`${blockName}-${slot.id}`} style={styles.slot}>
                <Text style={styles.slotText}>
                  {blockName}-{slot.id}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}

    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa' }} />
        <Stack.Screen name="Kat" component={FloorScreen} options={{ title: 'Kat' }} />
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  slot: {
    width: '12%',
    aspectRatio: 1/3, 
    backgroundColor: '#90caf9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  slotText: {
    color: '#fff',
    fontWeight: 'bold',
  }
  
});
