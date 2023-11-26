
'use client';

import {useEffect } from 'react';
import { bindLinksToSpheres, createFullBubbleChart, createSimulation, createSvgWithCircles, isBubbleChartGenerated } from './util/d3';
import { getSpheres } from './util/sanity-requests';
import useLoadContent from './hooks/useLoadContent';
import { useRouter } from 'next/navigation';







export default function Home() {


  const router = useRouter()




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
    <main id='circle-container'/>
  )
}
