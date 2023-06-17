import { TextInput, ListItem  } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StatusBar, View, TouchableHighlight } from 'react-native';

import CallAPI from '../services/callAPI';


const FoodDatabaseScreen = () => {
  // User's search
  const [searchContent, setSearchContent] = useState('');

  // API result
  const [foodList, setFoodList] = useState([]);
  const [nutritionData, setNutritionData] = useState({});

  // User selected food
  const [foodSelection, setFoodSelection] = useState('');

  const regex = /^[a-zA-Z]+$/;

  async function callAPIAutoComplete(searchStr){
    const url = 'https://api.edamam.com/auto-complete';
    const queryParameters =
      'app_id=b9405721&app_key=2cdd47649979ed551a3e136c3c21b991&limit=5&q=' + searchStr;
    let result = await CallAPI(url, queryParameters);
    //console.log(result);
    setFoodList(result);
    return result;
  };

  async function callAPINutritionData(foodStr){
    const url = 'https://api.edamam.com/api/nutrition-data';
    const queryParameters =
      'app_id=20a4ae44&app_key=7a532b9cbfe185d11b01cc02e5d2f758&nutrition-type=logging&ingr=100g ' + foodStr;
    let result = await CallAPI(url, queryParameters);
    //console.log(result);
    setNutritionData(result);
    return result;
  };

  async function onPressResult(index){
    console.log('Food choosen : ' + foodList[index]);
    setFoodSelection(foodList[index]);
    setSearchContent(''); // Not working properly
    setFoodList([]);
  };
  
  function renderSearchResult(lst){
    return lst.map((str, index) => {
      return <ListItem title={str} key={index} onPress={() => onPressResult(index)} />;
    });
  };

  function renderNutritionData(){
    console.log(nutritionData);
    if(!Object.entries(nutritionData).length) return;
    console.log("Here");
    return (
      <View>
        <Text>{foodSelection}, per 100g</Text>
        <Text>Energy {nutritionData.calories} kcal</Text>
        <Text>Protein {nutritionData.totalNutrients.PROCNT.quantity} g</Text>
        <Text>Sugar {nutritionData.totalNutrients.SUGAR.quantity} g</Text>
        <Text>Lipid {nutritionData.totalNutrients.FAT.quantity} g</Text>
        <Text>Sodium {nutritionData.totalNutrients.NA.quantity/1000} g</Text>
      </View>
    );
  };

  useEffect(() => {
    if (!searchContent) return;
    if (searchContent.match(regex)) {
      callAPIAutoComplete(searchContent);
    } else {
      setFoodList([]);
      console.log('Wrong search');
    }
  }, [searchContent]);

  useEffect(()=> {
    if (!foodSelection) return;
    callAPINutritionData(foodSelection);
  }, [foodSelection]);

  return (
    <SafeAreaView>
      <Text>FoodDatabaseScreen</Text>
      
      <TextInput placeholder="" onChangeText={(str) => setSearchContent(str)} />
      <View>{renderSearchResult(foodList)}</View>
      
      <View>{renderNutritionData()}</View>
      
      <StatusBar />
    </SafeAreaView>
  );
};

export default FoodDatabaseScreen;
  