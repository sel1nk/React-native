import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  
  const data = [
    { id: '1', name: '1. Kat' },
    { id: '2', name: '2. Kat' },
    { id: '3', name: '3. Kat' },
  ];

  return (
    <View style={styles.container}>
      <Text style = {styles.title}>Park-Portal'a Hoşgeldiniz!</Text>
      <Image source={require('./img/home.png')} style={styles.image}
        />
      <Text style = {styles.text}>Boş otopark alanlarını görebilmek için katlar arası geçiş yapınız.</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Kat', { floorName: item.name })}>
          <ImageBackground
            source={require('./img/bg.jpg')}
            style={styles.item}
            resizeMode="cover">
            <Text>{item.name}</Text>
          </ImageBackground>
            
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

function generateOccupiedSlots(s){
  const rand = Math.round(Math.random() * 10 - 2)
  const indices = Array.from({ length: s.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  for (let i = 0; i < rand; i++) {
    s[indices[i]].status = 'Occupied';
  }
  return s;
}

function FloorScreen({ route }) {
  const { floorName } = route.params;
  const aSlots = generateOccupiedSlots(generateParkingSlots('A'));
  const bSlots = generateOccupiedSlots(generateParkingSlots('B'));
  const cSlots = generateOccupiedSlots(generateParkingSlots('C'));

  const allSlots = [...aSlots, ...bSlots, ...cSlots];

  

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
              <View key={`${blockName}-${slot.id}`} style={[slot.status === 'Occupied' ? styles.occupiedSlot : styles.slot]}>
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
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa' }}/>
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
    marginBottom: 30,
    borderRadius: 8, 
    overflow: 'hidden', // RESMİN BORDERINA ETKİ ETMESİ İÇİN
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
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
  occupiedSlot: {
    width: '12%',
    aspectRatio: 1/3, 
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  slotText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 370,
    height: 200,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 20,
  }
  
});
