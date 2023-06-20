import { Text, ListItem, Chip, Divider } from '@react-native-material/core';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import RemoveFoodModal from './RemoveFoodModal';

const MealPlannerDaily = ({ day, dayData, navigation }) => {
  const [selectedIngredient, setSelectedIngredient] = useState();
  const [selectedDay, setSelectedDay] = useState(day);
  const [mealOfIngredient, setMealOfIngredient] = useState();
  function renderChips(meal) {
    return dayData[meal].map((ingredient, index) => {
      return (
        <Chip
          style={styles.chipStyle}
          key={index}
          onPress={() => {
            setSelectedIngredient(ingredient);
            setOpenModal(true);
            setMealOfIngredient(meal);
            setSelectedDay(day);
          }}
          label={
            ingredient.quantity +
            'g of ' +
            ingredient.name.charAt(0).toUpperCase() +
            ingredient.name.slice(1)
          }
        />
      );
    });
  }

  const getAllCalories = () => {
    let total = 0;
    Object.values(dayData).forEach((meal) => {
      meal.forEach((ingredient) => {
        total += (ingredient.calories / 100) * ingredient.quantity;
      });
    });
    return total;
  };

  const [mealPlanner, setMealPlanner] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
  return (
    <View>
      <RemoveFoodModal
        modalVisible={openModal}
        setModalVisible={setOpenModal}
        day={selectedDay}
        dayData={dayData}
        ingredient={selectedIngredient}
        meal={mealOfIngredient}
        navigation={navigation}></RemoveFoodModal>
      <ListItem
        title={day.charAt(0).toUpperCase() + day.slice(1)}
        onPress={() => setMealPlanner(!mealPlanner)}
        trailing={(props) =>
          mealPlanner ? (
            <Icon name="chevron-down" {...props} />
          ) : (
            <Icon name="chevron-right" {...props} />
          )
        }
      />
      {mealPlanner ? (
        <View>
          <Text variant="button" style={styles.mealText}>
            Calories for the day : {getAllCalories(dayData).toFixed(0)}
          </Text>
          <Divider />
          {meals.map((meal) => (
            <View key={meal}>
              {dayData.hasOwnProperty(meal) ? (
                <>
                  <View>
                    <Text key={meal} style={styles.mealText} variant="button">
                      {meal}
                    </Text>
                    <View style={styles.horizontal}>{renderChips(meal)}</View>
                    <Divider />
                  </View>
                </>
              ) : (
                <View key={meal}></View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mealText: {
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '2%',
    marginLeft: '2%',
  },
  horizontal: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'baseline',
    flexWrap: 'wrap',
  },
  chipStyle: {
    margin: '1%',
  },
});
export default MealPlannerDaily;
