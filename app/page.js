
'use client';

import {useEffect } from 'react';
import { createFullBubbleChart, createSimulation, createSvgWithCircles, isBubbleChartGenerated } from './util/d3';







export default function Home() {


  useEffect(() => {
    if (!isBubbleChartGenerated.value) {
      createFullBubbleChart()
      isBubbleChartGenerated.value = true
    }

  }, [])


  return (
    <main id='circle-container'>

    </main>
  )
}
