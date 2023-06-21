import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Text } from '@react-native-material/core';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const AddFoodForm = ({ nutritionData, openForm, setOpenForm }) => {
  // Food quantiy
  const [quantity, setQuantity] = useState(0);

  // Meal choice
  const [meal, setMeal] = useState('breakfast');

  // Day choice
  const [day, setDay] = useState('monday');

  async function handleSubmit(event) {
    // await AsyncStorage.removeItem('planning');
    let newData = { ...nutritionData };
    newData.quantity = quantity;

    let planning = {};
    planning[day] = {};
    let value = await AsyncStorage.getItem('planning');
    if (value !== null) {
      value = JSON.parse(value);
      if (value.hasOwnProperty(day) && value[day].hasOwnProperty(meal)) {
        planning[day][meal] = [...value[day][meal], { ...newData }];
      } else {
        planning[day][meal] = [{ ...newData }];
      }
    } else {
      planning[day][meal] = [{ ...newData }];
    }

    await AsyncStorage.mergeItem('planning', JSON.stringify(planning));
  }

  goBack = () => {
    setOpenForm(false);
  };

  if (!nutritionData) return;
  return (
    <View>
      <Text style={styles.inputText} variant="overline">
        Quantity of {nutritionData.name}
      </Text>
      <TextInput
        style={styles.inputLayout}
        variant="standard"
        placeholder="Enter the quantity in gram"
        leading={(props) => <Icon name="silverware-fork-knife" {...props} />}
        onChangeText={(value) => setQuantity(value)}
        keyboardType="numeric"
      />

      <Text style={styles.inputText} variant="overline">
        Meal :
      </Text>
      <Picker
        mode="dialog"
        style={Platform.OS === 'android' ? styles.inputPickerAndroid : styles.inputPickerIos}
        selectedValue={meal}
        onValueChange={(itemValue) => setMeal(itemValue)}>
        <Picker.Item label="Breakfast" value="breakfast" />
        <Picker.Item label="Lunch" value="lunch" />
        <Picker.Item label="Snack" value="snack" />
        <Picker.Item label="Dinner" value="dinner" />
      </Picker>

      <Text style={styles.inputText} variant="overline">
        Day :
      </Text>
      <Picker
        mode="dialog"
        style={Platform.OS === 'android' ? styles.inputPickerAndroid : styles.inputPickerIos}
        selectedValue={day}
        onValueChange={(itemValue) => setDay(itemValue)}>
        <Picker.Item label="Monday" value="monday" />
        <Picker.Item label="Tuesday" value="tuesday" />
        <Picker.Item label="Wednesday" value="wednesday" />
        <Picker.Item label="Thursday" value="thursday" />
        <Picker.Item label="Friday" value="friday" />
        <Picker.Item label="Saturday" value="saturday" />
        <Picker.Item label="Sunday" value="sunday" />
      </Picker>
      <Button
        style={styles.inputText}
        title="Add to planning"
        onPress={handleSubmit}
        disabled={!quantity}
      />
      <Button
        style={{ ...styles.inputText, ...styles.buttonClose }}
        title="Go back"
        onPress={this.goBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    marginBottom: '5%',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  buttonClose: {
    backgroundColor: '#FF0000',
  },
  inputTextIos: {
    marginBottom: '5%',
    marginTop: '-5%',
    marginLeft: '5%',
    marginRight: '5%',
  },

  inputPickerAndroid: {
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '-2%',
    marginBottom: '-2%',
  },

  inputPickerIos: {
    marginTop: '-10%',
  },

  inputLayout: {
    marginRight: '5%',
    marginLeft: '5%',
  },
});

export default AddFoodForm;
