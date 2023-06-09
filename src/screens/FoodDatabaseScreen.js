import { TextInput } from '@react-native-material/core';
import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StatusBar } from 'react-native';

import CallAPI from '../services/callAPI';


const FoodDatabaseScreen = () => {
  // User's search
  const [searchContent, setSearchContent] = useState('');

  // API result
  const [foodList, setFoodList] = useState([]);
  const [nutritionData, setNutritionData] = useState(null);

  const regex = /^[a-zA-Z]+$/;

  async function callAPIAutoComplete(searchStr){
    const url = 'https://api.edamam.com/auto-complete';
    const queryParameters =
      'app_id=b9405721&app_key=2cdd47649979ed551a3e136c3c21b991&limit=5&q=' + searchStr;
    let result = await CallAPI(url, queryParameters);
    //console.log(result);
    setFoodList(result);
    return result;
  }
  
  useEffect(() => {
    if (!searchContent) return;
    if (searchContent.match(regex)) {
      callAPIAutoComplete(searchContent);
    } else {
      console.log('Wrong search');
    }
  }, [searchContent]);

  return (
    <SafeAreaView>
      <Text>FoodDatabaseScreen</Text>
      <TextInput placeholder="" onChangeText={(str) => setSearchContent(str)} />
      {foodList.map((item,index)=>{
         return <Text>{{item}}</Text>
     })}
      <StatusBar />
    </SafeAreaView>
  );
};

export default FoodDatabaseScreen;
