import { Text, Button } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RemoveFoodModal = ({
  modalVisible,
  setModalVisible,
  day,
  meal,
  ingredient,
  dayData,
  navigation,
}) => {
  async function deleteFood() {
    let newData = [];
    let planning = {};
    planning[day] = {};
    let deleted = false;
    dayData[meal].forEach((item) => {
      if (item === ingredient && deleted === false) {
        deleted = true;
      } else {
        newData.push(item);
      }
    });

    if (newData.length === 0) {
      let data = await AsyncStorage.getItem('planning');
      data = JSON.parse(data);
      delete data[day][meal];
      if (Object.keys(data[day]).length === 0) {
        delete data[day];
      }
      if (Object.keys(data).length === 0) {
        await AsyncStorage.removeItem('planning');
      } else {
        await AsyncStorage.setItem('planning', JSON.stringify(data));
      }
    } else {
      planning[day][meal] = [...newData];
      await AsyncStorage.mergeItem('planning', JSON.stringify(planning));
    }
    setModalVisible(false);

    //Reload page
    navigation.navigate('Food database');
    navigation.navigate('Meal Planning');
  }
  return (
    <>
      {ingredient ? (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text variant="button" style={styles.titleStyle}>
                Do you want to delete this food ?
              </Text>
              <Text variant="button" style={styles.titleStyle}>
                {ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}
              </Text>
              <Text style={styles.modalText}>Quantity selected : {ingredient.quantity}g</Text>
              <Text style={styles.modalText}>Day scheduled : {day}</Text>
              <Text style={styles.modalText}>Meal scheduled : {meal}</Text>
              <Button
                style={{ ...styles.buttonStyle, ...styles.buttonDelete }}
                onPress={deleteFood}
                title="Delete this food"
              />
              <Button
                style={styles.buttonStyle}
                onPress={() => setModalVisible(false)}
                title="Go back"
              />
            </View>
          </View>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonDelete: {
    backgroundColor: '#FF0000',
  },
  titleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '5%',
  },
  modalText: {
    marginBottom: '2%',
  },

  buttonStyle: {
    textAlign: 'center',
    marginBottom: '5%',
  },
});
export default RemoveFoodModal;
