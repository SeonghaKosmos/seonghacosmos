'use client'

import { useEffect, useRef, useState } from "react";
import LabeledImage from "./LabeledImage"
import './slide.css'
import { useDispatch, useSelector } from "react-redux";
import { appSliceActions } from "@/redux/store";
import ArrowButton from "./ArrowButton";
import { useRouter } from "next/navigation";
import { getPathName } from "../util/sanity-requests";
import { PortableText } from "@portabletext/react";

function Test({ value }) {
    return (
        <div>hello</div>
    )
}

//for left and right alternating image logic
const leftOrRigtMap = new Map()

export default function Slide({ data, sphere }) {

    const portableTextComponents = {
        types: {
            labeledImage: ({ value }) => {
 
                const imgRef = value.image.asset._ref
                const leftOrRigtValues = Array.from(leftOrRigtMap.values())
                if (leftOrRigtValues.length === 0){
                    leftOrRigtMap.set(imgRef, true)
                } else {
                    const isLeft = leftOrRigtValues[leftOrRigtValues.length - 1];
                    leftOrRigtMap.set(imgRef, !isLeft);
                }
                console.log(leftOrRigtMap)
                const classNomen = leftOrRigtMap.get(imgRef) ? "left-image" : "right-image"
                return <LabeledImage labeledImage={value} containerClassName={`labeled-image-container ${classNomen}`} />
            }
        }
    }

const dispatch = useDispatch()
const titleRef = useRef()
const slidesInfo = useSelector((state) => state.app.slidesInfo)
const router = useRouter()

dispatch(appSliceActions.setSlide(data))

useEffect(() => {
    const titleDims = titleRef.current.getBoundingClientRect()
    dispatch(appSliceActions.setTitleDims({ width: titleDims.width, height: titleDims.height }))
})



function navToAdjacentSlide(distance) {
    const { index } = data
    const adjacentSlide = slidesInfo.find((slide) => slide.index === index + distance)

    if (adjacentSlide) {
        router.push(getPathName(sphere, adjacentSlide.slug.current))
    }

}
const navToNextSlide = () => {
    navToAdjacentSlide(1)
}

const navToPrevSlide = () => {
    navToAdjacentSlide(-1)
}


return (

    <>
        {data.title &&
            <h1 className="display-1 slide-title" ref={titleRef}>{data.title}</h1>
        }
        <article className='includes-navbar'>
            <article className='content' id="content">
                <div class="w-full">
                    {data.labeledImage &&
                        <LabeledImage className='text-wrap'
                            labeledImage={data.labeledImage}
                            containerClassName={'labeled-image-container right-image'} />
                    }

                    <p className="lead" id="lead">
                        <PortableText value={data.content} components={portableTextComponents} onMissingComponent={false} />
                    </p>
                    <div class="flex w-full justify-center items-center">
                        {data.miniImage &&
                            <LabeledImage
                                className='text-wrap footer-image'
                                labeledImage={data.miniImage}
                                containerClassName={'labeled-image-container footer-image'} />
                        }
                    </div>



                </div>

            </article>
            <nav className='slide-nav'>
                <ArrowButton direction='left' onclick={navToPrevSlide}>Previous</ArrowButton>
                <ArrowButton direction='right' className='next-button' onclick={navToNextSlide}>Next</ArrowButton>
            </nav>
        </article>

    </>



)
}