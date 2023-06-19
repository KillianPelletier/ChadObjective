import { Text, Button } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Modal, View } from 'react-native';

const ModalDetailsIngredient = ({
  modalVisible,
  setModalVisible,
  nutritionData,
  foodSelection,
  openForm,
  setOpenForm,
}) => {
  planMeal = () => {
    setOpenForm(true);
    setModalVisible(false);
  };
  if (!Object.entries(nutritionData).length) return;
  return (
    <>
      {nutritionData ? (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text variant="button" style={styles.titleStyle}>
                Relevant Information for 100g of{' '}
                {foodSelection.charAt(0).toUpperCase() + foodSelection.slice(1)}
              </Text>
              <Text style={styles.modalText}>Energy {nutritionData.calories} kcal</Text>
              <Text style={styles.modalText}>Protein {nutritionData.protein} g</Text>
              <Text style={styles.modalText}>Sugar {nutritionData.sugar} g</Text>
              <Text style={styles.modalText}>Lipid {nutritionData.fat} g</Text>
              <Text style={styles.modalText}>Sodium {nutritionData.sodium} g</Text>
              <Button style={styles.buttonStyle} onPress={this.planMeal} title="Plan your meal !" />
              <Button
                style={{ ...styles.buttonStyle, ...styles.buttonClose }}
                onPress={() => setModalVisible(false)}
                title="Choose another"
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
  buttonClose: {
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
export default ModalDetailsIngredient;
