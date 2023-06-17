import { TextInput, ListItem  } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StatusBar, View, TouchableHighlight } from 'react-native';

import CallAPI from '../services/callAPI';


const FoodDatabaseScreen = () => {
  // User's search
  const [searchContent, setSearchContent] = useState('');

  // API result
  const [foodList, setFoodList] = useState([]);
  const [nutritionData, setNutritionData] = useState(null);

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

  useEffect(() => {
    if (!searchContent) return;
    if (searchContent.match(regex)) {
      callAPIAutoComplete(searchContent);
    } else {
      setFoodList([]);
      console.log('Wrong search');
    }
  }, [searchContent]);

  return (
    <SafeAreaView>
      <Text>FoodDatabaseScreen</Text>
      
      <TextInput placeholder="" onChangeText={(str) => setSearchContent(str)} />
      <View>{renderSearchResult(foodList)}</View>
      
      
      
      
      <StatusBar />
    </SafeAreaView>
  );
};

export default FoodDatabaseScreen;
  