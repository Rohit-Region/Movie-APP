import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, useColorScheme, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Fontisto';
import { useNavigation, useRoute } from '@react-navigation/native';

function Home() {
  const [movies, setMovies] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const route = useRoute();
  const { genreId, startDate, endDate, sliderValue } = route.params || {};

  useEffect(() => {
      fetchMovies();
  }, [genreId, startDate, endDate, sliderValue]);

  const fetchMovies = async () => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=77f5650c17cf98321815cc1a2e9bb9db');
        const data = await response.json();
        let sortedMovies = data.results;
        let filteredMovies = sortedMovies; 

        if (genreId) {
            filteredMovies = data.results.filter(movie => movie.genre_ids.includes(genreId));
            sortedMovies = filteredMovies.sort((a, b) => b.popularity - a.popularity);
        }

        if (startDate || endDate) {
            sortedMovies = filteredMovies.filter(movie => {
                const releaseDate = new Date(movie.release_date);
                if (startDate && !endDate) {
                    const start = new Date(startDate);
                    return releaseDate >= start;
                } else if (!startDate && endDate) {
                    const end = new Date(endDate);
                    return releaseDate <= end;
                } else if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    return releaseDate >= start && releaseDate <= end;
                }
            });
        }

        if (sliderValue) {
          sortedMovies = sortedMovies.filter(movie => movie.vote_average >= sliderValue);
        }

        setMovies(sortedMovies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

  const navigateToWishlist = (movieData) => {
      navigation.navigate('WhishList', { movie: movieData });
  };

  const navigateToFavourite = (movieData) => {
      navigation.navigate("Favourite",{ movie: movieData });
  };

  const renderMovies = () => {
      return movies.map((movie, index) => (
        <View key={index} style={{backgroundColor:'#d6d5d2'}}>
        
        <View style={styles.movieCard}>
            <Image
                style={styles.backdrop}
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                }}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{movie.title}</Text>
            </View>
        </View>
    
        <View style={styles.ratingIconsContainer}>
              <View style={styles.starIconsContainer}>
                  {[1, 2, 3, 4, 5].map((index) => (
                      <Icon key={index} name="star-o" size={30}  style={styles.starIcon} />
                  ))}
              </View>
              
              <View style={styles.heartBookmarkIconsContainer}>
                <View>
                  <TouchableOpacity onPress={() => navigateToFavourite(movie)}>
                      <Icons name="heart" size={25} color="black" style={styles.icon} />
                      <Text style={styles.icontxt}>Favourite</Text>
                  </TouchableOpacity>
                    
                  </View>
                  <View>
                  <TouchableOpacity onPress={() => navigateToWishlist(movie)}>
                      <Icon name="bookmark" size={25} color="black" style={styles.icon} />
                      <Text style={styles.icontxt}>WishList</Text>
                  </TouchableOpacity>

                  </View>
              </View>
          </View>
    </View>
      ));
  };

  return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
          <ScrollView>
              {renderMovies()}
          </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  movieCard: {
      backgroundColor: '#f0f0f0',
      margin: 15,
      padding: 0,
      overflow: 'hidden',
      position: 'relative',
  },
  title: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
  },
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
  ratingIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginTop: -15,
      marginRight:15,
      marginLeft:15,
      height:45,
      backgroundColor: 'white',
  },
  starIcon:{
    marginRight:5,
  },
  starIconsContainer: {
      flexDirection: 'row',
      marginRight: 'auto',
  },
  heartBookmarkIconsContainer: {
      flexDirection: 'row',
  },
  icon: {
      marginLeft: 30,
  },
  icontxt:{
    marginLeft: 18,
  }
});

export default Home;
