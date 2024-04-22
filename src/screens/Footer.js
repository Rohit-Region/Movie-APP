import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  const navigateToWishList = () => {
    navigation.navigate('WishList');
  };

  const navigateToFavourite = () => {
    navigation.navigate('Favourite');
  };

  return (
    <View style={{ flexDirection: 'row', height: 45, elevation: 5 }}>
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: "#3b76e3" }}>
        <TouchableOpacity onPress={navigateToFavourite}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 21 }}>FAVOURITE</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: 'white', width: 2 }} />
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: "#3b76e3" }}>
        <TouchableOpacity onPress={navigateToWishList}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 21 }}>WISHLIST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
