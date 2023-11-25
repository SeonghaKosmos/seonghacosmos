
'use client';

import {useEffect } from 'react';
import { bindLinksToSpheres, createFullBubbleChart, createSimulation, createSvgWithCircles, isBubbleChartGenerated } from './util/d3';
import { getSpheres } from './util/sanity-requests';
import useLoadContent from './hooks/useLoadContent';
import { useRouter } from 'next/navigation';







export default function Home() {


  const router = useRouter()
  // const redirect = (url) => {
  //   router.push(url)
  // }

  const data = [{ "name": "CIRCLE of Friends", radius: 100 }, { "name": "Biol 180", radius: 50 }, { "name": "Writing a Tragedy", radius: 30 }, { name: "Interviewing Middle Easterners", radius: 40 }, { "name": "Outdoors", radius: 70 }, { "name": "Cooking", radius: 50 }, { "name": "Church", radius: 90 }, { "name": "Miscellaneous", radius: 30 }]


  const [spheres, setSpheres] = useLoadContent(getSpheres, [])

  useEffect(() => {
    if (spheres && !document.getElementById('sphere-svg')) {
      const width = window.innerWidth
      const height = window.innerHeight


      const bubbleChart = createFullBubbleChart(spheres, width, height)

      bindLinksToSpheres(bubbleChart.circles, router)
      bindLinksToSpheres(bubbleChart.txts, router)
    }

  })


  return (
    <main id='circle-container'>

    </main>
  )
}
