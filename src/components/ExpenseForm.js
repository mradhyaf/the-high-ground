import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import NumericInput from './NumericInput';
import CATEGORIES from '../constants/CATEGORIES';
import newExpense from '../functions/newExpense';
import { add } from '../store/expensesSlice';
import dateMY from '../functions/dateMY';

export default function ExpenseForm() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date())
  const [dateString, setDateString] = useState(dateMY(date));
  
  const dispatch = useDispatch();
  

  const handleConfirm = (event, selectedDate) => {
    setShow(false);
    const newDate = selectedDate || date;
    const newDateString = dateMY(newDate);
    setDate(newDate);
    setDateString(newDateString);
  };

  const handleSubmit = () => {
    const expense = newExpense(item, price, date, category,);
    dispatch(add(expense));
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Item'}
        value={item}
        onChangeText={(item) => setItem(item)}
        />
      <NumericInput
        style={styles.input}
        placeholder={'Price'}
        value={price}
        onChangeText={(price) => setPrice(price)}
      />
      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) =>
          setCategory(itemValue)}
      >
        {CATEGORIES.map(({ title }) => (
          <Picker.Item label={title} value={title} key={title}/>
          ))}
      </Picker>
      <Pressable onPress={() => setShow(true)}>
        <TextInput 
          style={styles.input}
          value={dateString}
          editable={false}
        />
      </Pressable>
      {show && (<DateTimePicker
        {...props}
        display='spinner'
        mode="date"
        value={date}
        onChange={handleConfirm}
      />)}
      <Button
        style={styles.button}
        mode={'outlined'}
        onPress={() => item === '' ? alert('Please enter a name for the item') : handleSubmit() }
      >SUBMIT</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 5
  },
  button: {
    margin: 5,
  },
  picker: {
    backgroundColor: '#e3e1e1',
    height: 56,
    margin: 5,
  }
})