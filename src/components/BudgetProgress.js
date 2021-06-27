import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectBudget, setBudget } from '../store/settingsSlice';
import NumericInput from './NumericInput';

export default function BudgetProgress() {
  const dispatch = useDispatch();
  const budget = useSelector(selectBudget);

  const [show, setShow] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
  };

  const data = {
    data: [0.7]
  };

  return (
    // <Pressable style={styles.container} onPress={() => setShow(true)} onBlur={setShow(false)}>
      <View onPress={() => setShow(true)} onLongPress={() => setShow(false)} >
        <Text>Your budget this month: {`${budget}`}</Text>
        <ProgressChart
          data={data}
          width={160}
          height={160}
          strokeWidth={16}
          radius={64}
          chartConfig={chartConfig}
          hideLegend={true}
        />
        {show && (<View>
          <NumericInput
            placeholder={budget}
            value={newBudget}
            onChangeText={(newBudget) => setNewBudget(newBudget)}
          />
          <Button
            onPress={() => dispatch(setBudget(newBudget))}
          >Set Budget</Button>
        </View>)}
      </View>
    // </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    margin: '5%'
  },
  text: {
    color: '#000',
    fontSize: 20,
    marginTop: 2,
    fontWeight: 'bold',
  }
})