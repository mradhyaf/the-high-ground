import React, {  useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { selectExpenses } from '../store/expensesSlice';

export default function Chart({ navigation }) {
  const expenses = useSelector(selectExpenses);
  const reducer = (accumulator, data) => accumulator + Number(data.price);
  const c = (category) => expenses.filter(expense => expense.category === category).reduce(reducer, 0);
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '$',
        backgroundColor: '#30D5C8',
        data: [c("1"), c("2"), c("3"), c("4"), c("5"), c("6")],
        borderColor: 'white',
        borderWidth: 2,
      }
    ],
  };
  const options = {
    plugins:{
      title:{
        display:true,
        text:'Amount spent per category',
        fontSize:20
      },
      legend:{
        display:true,
        position:'right'
      }
    }
  };

  return (
    <ScrollView>
      <Appbar>
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content
          title="Bar Chart"
        />
      </Appbar>
      <Bar data={data} options={options} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})