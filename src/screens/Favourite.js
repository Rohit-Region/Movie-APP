import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

function Favourites({ route }) {
  const { movie } = route.params || {};
  const navigation = useNavigation();

  const navigateToHome = async () => {
    navigation.navigate("Home");
  };
  
  return (
    <View style={{ backgroundColor: '#f0f0f0' }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={navigateToHome}>
          <Icons name="caret-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontWeight: '400', fontSize: 25, color: "black" }}>Favourite</Text>
      </View>
      {movie !== undefined ? (
        <View style={{ margin: 15 }}>
          <Image
            style={styles.backdrop}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie.title}</Text>
          </View>
        </View>
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25 }}>No movie available</Text>
          <Text style={{ fontSize: 25, marginTop: 15 }}>EXPLANATION</Text>
          <Text style={{ fontSize: 20, marginRight: 20, marginLeft: 20 }}>I am storing the current movie data that you select from the home screen due to a post API issue.</Text>
          <Text style={{ fontSize: 25, marginTop: 15 }}>DISCLAIMER</Text>
          <Text style={{ fontSize: 20, marginRight: 20, marginLeft: 20 }}>The "developer.themoviedb.org" API has currently stopped the Post API. I have sent the attachment through email regarding this.  </Text>
        </View>
      )}
    </View>
  );
}

const styles = {
  backdrop: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
};

export default Favourites;
