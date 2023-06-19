import { Text, Button } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Modal, View } from 'react-native';

const ModalHealthGoal = ({ modalVisible, setModalVisible, bmr }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ ...styles.titleStyle, ...styles.modalText }}>BMR result</Text>
            <Text style={styles.modalText}>Your BMR is {bmr.toFixed(0)}</Text>
            <Button
              style={styles.inputText}
              onPress={() => setModalVisible(false)}
              title="Close modal"
            />
          </View>
        </View>
      </Modal>
    </View>
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  titleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '5%',
  },
});
export default ModalHealthGoal;
