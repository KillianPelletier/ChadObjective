import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

import FoodDatabaseScreen from '../screens/FoodDatabaseScreen';
import HealthGoalsScreen from '../screens/HealthGoalsScreen';
import MealPlanningScreen from '../screens/MealPlanningScreen';

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => (
  <NavigationContainer
    initialRouteName="Health Goals"
    activeColor="#f0edf6"
    inactiveColor="#3e2465"
    barStyle={{ backgroundColor: "#694fad" }}
  >
    <Tab.Navigator>
      <Tab.Screen
        name="Health Goals"
        component={HealthGoalsScreen}
        options={{
          tabBarLabel: "Health Goals",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-arc" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Food database"
        component={FoodDatabaseScreen}
        options={{
          tabBarLabel: "Food Database",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-drumstick" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Meal Planning"
        component={MealPlanningScreen}
        options={{
          tabBarLabel: "Meal Planning",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
