import React from 'react'
import { Dimensions } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

const chartConfig = {
    backgroundGradientFrom: '#4a148c',
    backgroundGradientTo: '#4a148c',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2 
  }

const progressChart = (props) => {
    return (
        <ProgressChart
            data={props.data}
            width={Dimensions.get('window').width}
            height={120}
            chartConfig={chartConfig} />
    )
}

export default progressChart