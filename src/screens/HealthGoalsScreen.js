import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput, Text, Button } from '@react-native-material/core';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import ModalHealthGoal from '../components/ModalHealthGoal';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Platform,
  Modal,
  View,
} from 'react-native';

const HealthGoalsScreen = () => {
  const [age, setAge] = useState();
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [healthGoal, setHealthGoal] = useState('loss');
  const [modalVisible, setModalVisible] = useState(false);

  getBMRfromform = () => {
    let bmr;
    if (gender === 'male') bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    else bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    switch (activityLevel) {
      case 'sedentary':
        bmr *= 1.2;
        break;
      case 'light':
        bmr = bmr * 1.375;
        break;
      case 'moderate':
        bmr = bmr * 1.55;
        break;
      case 'heavy':
        bmr = bmr * 1.725;
        break;
      case 'extra':
        bmr = bmr * 1.9;
        break;
    }
    switch (healthGoal) {
      case 'loss':
        bmr = bmr * 0.9;
        break;
      case 'gain':
        bmr = bmr * 1.1;
        break;
    }

    return bmr;
  };
  _submitForm = () => {
    setModalVisible(true);
  };

  return (
    <>
      <ModalHealthGoal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        bmr={getBMRfromform()}></ModalHealthGoal>
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.inputText} variant="overline">
            Your age :
          </Text>
          <TextInput
            style={styles.inputLayout}
            variant="standard"
            placeholder="Enter your age"
            leading={(props) => <Icon name="account" {...props} />}
            onChangeText={(value) => setAge(value)}
            keyboardType="numeric"
          />
          <Text style={styles.inputText} variant="overline">
            Your gender :
          </Text>
          <Picker
            mode="dialog"
            style={Platform.OS === 'android' ? styles.inputPickerAndroid : styles.inputPickerIos}
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          <Text
            style={Platform.OS === 'android' ? styles.inputText : styles.inputTextIos}
            variant="overline">
            Your height (in cm):
          </Text>
          <TextInput
            style={styles.inputLayout}
            variant="standard"
            onChangeText={(value) => setHeight(value)}
            placeholder="Enter your height"
            leading={(props) => <Icon name="human-male-height" {...props} />}
            keyboardType="numeric"
          />
          <Text style={styles.inputText} variant="overline">
            Your weight (in kg):
          </Text>
          <TextInput
            style={styles.inputLayout}
            variant="standard"
            onChangeText={(value) => setWeight(value)}
            placeholder="Enter your weight"
            leading={(props) => <Icon name="weight" {...props} />}
            keyboardType="numeric"
          />
          <Text style={styles.inputText} variant="overline">
            Your activity level :
          </Text>
          <Picker
            mode="dialog"
            style={Platform.OS === 'android' ? styles.inputPickerAndroid : styles.inputPickerIos}
            selectedValue={activityLevel}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}>
            <Picker.Item label="Sedentary" value="sedentary" />
            <Picker.Item label="Light exercise" value="light" />
            <Picker.Item label="Moderate exercise" value="moderate" />
            <Picker.Item label="Heavy exercise" value="heavy" />
            <Picker.Item label="Extra active" value="extra" />
          </Picker>
          <Text style={styles.inputText} variant="overline">
            Health goal :
          </Text>
          <Picker
            mode="dialog"
            style={Platform.OS === 'android' ? styles.inputPickerAndroid : styles.inputPickerIos}
            selectedValue={healthGoal}
            onValueChange={(itemValue) => setHealthGoal(itemValue)}>
            <Picker.Item label="Weight loss" value="loss" />
            <Picker.Item label="Weight maintenance" value="maintenance" />
            <Picker.Item label="Weight gain" value="gain" />
          </Picker>
          <StatusBar />
          <Button
            style={styles.inputText}
            onPress={this._submitForm}
            title="Submit Health Goals"
            disabled={
              !age ||
              !(age > 0) ||
              !(age < 120) ||
              !weight ||
              !height ||
              !(height > 100) ||
              !activityLevel ||
              !gender ||
              !healthGoal
            }
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  inputText: {
    marginBottom: '5%',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
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
export default HealthGoalsScreen;
