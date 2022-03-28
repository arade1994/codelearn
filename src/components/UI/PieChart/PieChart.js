import React from 'react'
import { Dimensions } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

const chartConfig = {
    backgroundGradientFrom: '#4a148c',
    backgroundGradientTo: '#4a148c',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2 
  }

const pieChart = (props) => {
    return (
        <PieChart
            data={props.data}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={chartConfig}
            accessor='users'
            backgroundColor='transparent'
            paddingLeft='15'
            absolute />
    )
}

export default pieChart;