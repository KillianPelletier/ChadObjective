import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput, Text, Button } from '@react-native-material/core';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { SafeAreaView, StatusBar, ScrollView, StyleSheet, Platform } from 'react-native';

const HealthGoalsScreen = () => {
  const [selectedGender, setSelectedGender] = React.useState();
  const [age, setAge] = React.useState();
  return (
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
          selectedValue={selectedGender}
          onValueChange={(itemValue) => setSelectedGender(itemValue)}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

        <Text style={styles.inputText} variant="overline">
          Your height :
        </Text>
        <TextInput
          style={styles.inputLayout}
          variant="standard"
          placeholder="Enter your height"
          leading={(props) => <Icon name="human-male-height" {...props} />}
          keyboardType="numeric"
        />
        <Text style={styles.inputText} variant="overline">
          Your weight :
        </Text>
        <TextInput
          style={styles.inputLayout}
          variant="standard"
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
          selectedValue={selectedGender}
          onValueChange={(itemValue) => setSelectedGender(itemValue)}>
          <Picker.Item label="Sedentary" value="sedentary" />
          <Picker.Item label="Light exercise" value="lightexercise" />
          <Picker.Item label="Moderate exercise" value="moderateexercise" />
          <Picker.Item label="Heavy exercise" value="heavyexercise" />
          <Picker.Item label="Extra active" value="extraactive" />
        </Picker>
        <Text style={styles.inputText} variant="overline">
          Health goal :
        </Text>
        <Picker
          mode="dialog"
          style={Platform.OS === 'android' ? styles.inputPickerAndroid : styles.inputPickerIos}
          selectedValue={selectedGender}
          onValueChange={(itemValue) => setSelectedGender(itemValue)}>
          <Picker.Item label="Weight loss" value="weightloss" />
          <Picker.Item label="Weight maintenance" value="weightmaintenance" />
          <Picker.Item label="Weight gain" value="weightgain" />
        </Picker>
        <StatusBar />
        <Button style={styles.inputText} title="Submit Health Goals" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputText: {
    marginBottom: '5%',
    marginTop: '5%',
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
    marginTop: '-20%',
  },

  inputLayout: {
    marginRight: '5%',
    marginLeft: '5%',
  },
});
export default HealthGoalsScreen;
