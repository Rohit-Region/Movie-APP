import React, { useRef } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import 'react-native-gesture-handler';
import Header from '../screens/Header';
import DrawerContent from '../screens/DrawerContent';
import Footer from '../screens/Footer';
import WhishList from '../screens/WhishLists'
import Favourite from '../screens/Favourite'
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export const navigationRef = createNavigationContainerRef();

const Navigator = () => {
    const drawerRef = useRef(null);

    const openDrawer = () => {
        console.log("Opening Drawer...");
        drawerRef.current && drawerRef.current.openDrawer();
    };

    return (
        <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator drawerContent={() => <DrawerContent />}>
                <Drawer.Screen name="Movie App" component={StackNavigator} />
            </Drawer.Navigator>
            <Footer></Footer>
            {/* <Header openDrawer={openDrawer} /> */}
        </NavigationContainer>
    );
};



const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="HomeASASA" screenOptions={{ headerShown: false, animation: 'default' }}>
            <Stack.Screen name="Home" component={Home} options={{
                    headerTitle: 'Sort and Filter',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                }} />
            <Stack.Screen name="WhishList" component={WhishList} />
            <Stack.Screen name="Favourite" component={Favourite} />
        </Stack.Navigator>
    );
};

export default Navigator;
