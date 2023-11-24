
'use client';

import {useEffect } from 'react';
import { createFullBubbleChart, createSimulation, createSvgWithCircles, isBubbleChartGenerated } from './util/d3';







export default function Home() {


  const width = window.innerWidth
  const height = window.innerHeight
  const data = [{ "name": "CIRCLE of Friends", radius: 100 }, { "name": "Biol 180", radius: 50 }, { "name": "Writing a Tragedy", radius: 30 }, { name: "Interviewing Middle Easterners", radius: 40 }, { "name": "Outdoors", radius: 70 }, { "name": "Cooking", radius: 50 }, { "name": "Church", radius: 90 }, { "name": "Miscellaneous", radius: 30 }]



  useEffect(() => {
    if (!isBubbleChartGenerated.value) {
      createFullBubbleChart(data, width, height)
      isBubbleChartGenerated.value = true
    }

  }, [])


  return (
    <main id='circle-container'>

    </main>
  )
}
