import React, { useState, useEffect } from 'react';
import { Text, Button } from '@react-native-material/core';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MealPlannerDaily from '../components/MealPlannerDaily';
const MealPlanningScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [firstCome, setFirstCome] = useState(true);

  const fetchData = async () => {
    try {
      let value = await AsyncStorage.getItem('planning');
      if (value !== null) {
        value = JSON.parse(value);
        if (Object.keys(value).length > 0) {
          setFirstCome(false);

          setTimeout(() => {
            setLoading(false);
          }, 500);

          setData(value);
        }
      } else {
        setLoading(true);
        setFirstCome(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        fetchData();
      },
      [data]
    );

    return unsubscribe;
  });

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return (
    <>
      {!loading ? (
        <SafeAreaView>
          <ScrollView>
            <Text variant="button" style={styles.titleStyle}>
              Your planning for the week
            </Text>
            {days.map((day) => (
              <View key={day}>
                {data.hasOwnProperty(day) ? (
                  <View key={day} style={{ marginTop: '1%', marginBottom: '1%' }}>
                    <MealPlannerDaily
                      key={day}
                      day={day}
                      dayData={data[day]}
                      navigation={navigation}></MealPlannerDaily>
                  </View>
                ) : (
                  <View key={day}></View>
                )}
              </View>
            ))}
            <Button
              style={styles.buttonStyle}
              onPress={() => navigation.navigate('Food database')}
              title="Add More Food"
            />
          </ScrollView>

          <StatusBar />
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          {firstCome ? (
            <>
              <Text style={{ textAlign: 'center' }}>
                You need first to add food to access to this page !
              </Text>
              <Button
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('Food database')}
                title="Add More Food"
              />
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: '5%',
    marginRight: '5%',
    marginLeft: '5%',
  },
  buttonDelete: {
    backgroundColor: '#FF0000',
  },
  titleStyle: {
    marginTop: '10%',
    textAlign: 'center',
    marginBottom: '5%',
  },
});

export default MealPlanningScreen;
