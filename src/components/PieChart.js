import React from 'react'
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

import { selectExpenses } from '../store/expensesSlice';
import { groupByCategory, priceTotal } from '../functions/expenses';
import { useSelector } from 'react-redux';

export default function () {
  const screenWidth = Dimensions.get('window').width;
  const expenses = useSelector(selectExpenses);
  const expensesByCategory = groupByCategory(expenses);

  const chartConfig={
    backgroundColor: '#26872a',
    backgroundGradientFrom: '#43a047',
    backgroundGradientTo: '#66bb6a',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  const pieChartData = [
    { name: 'Food', category: priceTotal(expensesByCategory['Food']), color: '#89023E',
    legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Transportation', category: priceTotal(expensesByCategory['Transportation']), color: '#CC7178',
    legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Utilities', category: priceTotal(expensesByCategory['Utilities']), color: '#FFD9DA',
    legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Personal', category: priceTotal(expensesByCategory['Personal']), color: '#F3E1DD',
    legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Others', category: priceTotal(expensesByCategory['Others']), color: '#C7D9B7',
    legendFontColor: '#7F7F7F', legendFontSize: 10 }
  ];

  return (
    <SafeAreaView>
      <PieChart
        data={pieChartData}
        height={220}
        width={screenWidth*0.98}
        paddingLeft={25}
        chartConfig={chartConfig}
        accessor="category"
        style={chartConfig.style}
      />
    </SafeAreaView>
  )
}