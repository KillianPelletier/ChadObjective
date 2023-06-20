import { TextInput, ListItem, Text, Button } from '@react-native-material/core';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, ScrollView, StyleSheet } from 'react-native';

import CallAPI from '../services/callAPI';
import AddFoodForm from '../components/AddFoodForm';
import ModalDetailsIngredient from '../components/ModalDetailsIngredient';

const FoodDatabaseScreen = () => {
  // User's search
  const [searchContent, setSearchContent] = useState('');

  // API result
  const [foodList, setFoodList] = useState([]);
  const [nutritionData, setNutritionData] = useState({});

  // User selected food
  const [foodSelection, setFoodSelection] = useState('');
  const [searchValid, setSearchValid] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const regex = /^[a-zA-Z]+$/;

  async function callAPIAutoComplete(searchStr) {
    const url = 'https://api.edamam.com/auto-complete';
    const queryParameters =
      'app_id=b9405721&app_key=2cdd47649979ed551a3e136c3c21b991&limit=5&q=' + searchStr;
    let result = await CallAPI(url, queryParameters);
    setFoodList(result);
    return result;
  }

  async function callAPINutritionData(foodStr) {
    const url = 'https://api.edamam.com/api/nutrition-data';
    const queryParameters =
      'app_id=20a4ae44&app_key=7a532b9cbfe185d11b01cc02e5d2f758&nutrition-type=logging&ingr=100g ' +
      foodStr;
    let r = await CallAPI(url, queryParameters);
    let data = {
      name: foodSelection,
      calories: r.calories.toFixed(2),
      protein: r.totalNutrients.PROCNT.quantity.toFixed(2),
      sugar: r.totalNutrients.SUGAR.quantity.toFixed(2),
      fat: r.totalNutrients.FAT.quantity.toFixed(2),
      sodium: (r.totalNutrients.NA.quantity / 1000).toFixed(2),
    };
    setNutritionData(data);
  }
  async function onChangeText(str) {
    setSearchContent(str.toLowerCase());
    for (index in foodList) {
      if (str === foodList[index]) {
        setFoodSelection(foodList[index]);
        setSearchValid(true);
        return;
      }
    }
    setSearchValid(false);
  }
  async function onPressResult(index) {
    setSearchContent(foodList[index]);
    setFoodSelection(foodList[index]);
    setSearchValid(true);
  }

  function renderSearchResult(lst) {
    return lst.map((str, index) => {
      return <ListItem title={str} key={index} onPress={() => onPressResult(index)} />;
    });
  }
  _submitForm = () => {
    callAPINutritionData(foodSelection);
    setOpenModal(true);
  };
  useEffect(() => {
    if (!searchContent) return;
    if (searchContent.match(regex)) {
      callAPIAutoComplete(searchContent);
    } else {
      setFoodList([]);
    }
  }, [searchContent]);

  return (
    <>
      {!openForm ? (
        <SafeAreaView style={styles.centeredView}>
          <ModalDetailsIngredient
            modalVisible={openModal}
            setModalVisible={setOpenModal}
            nutritionData={nutritionData}
            foodSelection={foodSelection}
            openForm={openForm}
            setOpenForm={setOpenForm}></ModalDetailsIngredient>

          <Text variant="overline">Search for your ingredient :</Text>
          <TextInput
            variant="standard"
            value={searchContent}
            placeholder="Enter your ingredient"
            onChangeText={(str) => onChangeText(str)}
            style={{ ...styles.inputText, width: '75%' }}
          />
          {foodList.length > 0 ? (
            <ScrollView style={{ width: '60%', maxHeight: '50%' }}>
              {renderSearchResult(foodList)}
            </ScrollView>
          ) : (
            <></>
          )}
          <Button
            style={styles.inputText}
            onPress={_submitForm}
            title="Submit your ingredient"
            disabled={!searchValid}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <ScrollView>
            <AddFoodForm
              nutritionData={nutritionData}
              openForm={openForm}
              setOpenForm={setOpenForm}
            />
          </ScrollView>
        </SafeAreaView>
      )}

      <StatusBar />
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

  inputText: {
    marginBottom: '5%',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
});

export default FoodDatabaseScreen;
