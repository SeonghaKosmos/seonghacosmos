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



//for left and right alternating image logic
const leftOrRigtMap = new Map()

//sets left or right in leftOrRigtMap if unset
function setLeftOrRight(imgRef, isLeft) {
    if (leftOrRigtMap.get(imgRef) === undefined) {
        leftOrRigtMap.set(imgRef, isLeft)
    }
}

const portableTextComponents = {
    types: {
        labeledImage: ({ value }) => {

            const imgRef = value.image.asset._ref
            const leftOrRigtValues = Array.from(leftOrRigtMap.values())
            if (leftOrRigtValues.length === 0) {
                setLeftOrRight(imgRef, true)
            } else {
                const isLeft = leftOrRigtValues[leftOrRigtValues.length - 1];
                setLeftOrRight(imgRef, !isLeft);
            }
            const classNomen = leftOrRigtMap.get(imgRef) ? "left-image" : "right-image"
            return <LabeledImage labeledImage={value} containerClassName={`labeled-image-container ${classNomen}`} />
        }
    }
}

export default function Slide({ data, sphere }) {


    const dispatch = useDispatch()
    const titleRef = useRef()
    const slidesInfo = useSelector((state) => state.app.slidesInfo)
    const router = useRouter()
    const [hasPrevSlide, setHasPrevSlide] = useState(evalHasPrevSlide(data.index))
    const [hasNextSlide, setHasNextSlide] = useState(evalHasNextSlide(data.index))


    useEffect(() => {
        setHasPrevSlide(evalHasPrevSlide(data.index))
        setHasNextSlide(evalHasNextSlide(data.index))
    }, [slidesInfo])

    dispatch(appSliceActions.setSlide(data))



    function evalHasNextSlide(index){
        return slidesInfo.find((slide) => 
            slide.index === index + 1) ? true : false
    }

    function evalHasPrevSlide(index){
        return slidesInfo.find((slide) => 
            slide.index === index - 1) ? true : false
    }

    //navigates to slide that is distance away from current
    //negative distance goes to previous slide
    // sets hasNextSlide and hasPrevSlide by whether new slide 
    //has prev or next
    function navToAdjacentSlide(distance) {
        const { index } = data
        const newIndex = index + distance
        const adjacentSlide = slidesInfo.find((slide) => slide.index === newIndex)

        if (adjacentSlide) {
            router.push(getPathName(sphere, adjacentSlide.slug.current))
        }

        if (evalHasNextSlide(newIndex)){
            setHasNextSlide(true)
        } else {
            setHasNextSlide(false)
        }

        if (evalHasPrevSlide(newIndex)){
            setHasPrevSlide(true)
        } else {
            setHasPrevSlide(false)
        }

    }


    const navToNextSlide = () => {
        !navToAdjacentSlide(1)
    }

    const navToPrevSlide = () => {
        navToAdjacentSlide(-1)
    }


    return (

        <>
            <article style={{ width: "fit-content" }}>
                {data.title &&
                    <h1 className="display-1 slide-title" ref={titleRef}>{data.title}</h1>
                }
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
            </article>

            <nav className='slide-nav'>
                <ArrowButton 
                    direction='left' 
                    onclick={navToPrevSlide}
                    styleClasses={hasPrevSlide ? '' : 'hidden'}
                >
                    Previous
                </ArrowButton>
                <ArrowButton 
                    direction='right' 
                    styleClasses={hasNextSlide ? '' : 'hidden'}
                    onclick={navToNextSlide}
                >
                    Next
                </ArrowButton>
            </nav>

        </>



    )
}