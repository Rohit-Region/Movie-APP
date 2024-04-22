import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ openDrawer }) => {
    const handlePress = () => {
        console.log("SORT & Filter Pressed");
        openDrawer();
    };

    return (
        <View style={{ flexDirection: 'row', height: 50, elevation: 5 }}>
            <View style={{ justifyContent: 'center', width: 250, backgroundColor: "white", paddingHorizontal: 20 }}>
                <Text style={{ color: '#000000', fontSize: 25, fontWeight: 'bold' }}>MOVIE</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: "#3b76e3" }}>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={{ color: 'white' }}>SORT & Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;
