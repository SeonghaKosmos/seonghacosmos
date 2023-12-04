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




export default function Slide({ data, sphere }) {

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
        console.log('navToAdjacentSlide')
        const { index } = data
        const adjacentSlide = slidesInfo.find((slide) => slide.index === index + distance)
        console.log(adjacentSlide)

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
                    <section className={data.labeledImage ? 'left' : 'left-without-image'}>
                        <p className="lead" id="lead">
                            <PortableText value={data.content} components={[]}/>
                        </p>

                        {data.miniImage &&
                            <LabeledImage
                                className='text-wrap mini-image'
                                labeledImage={data.miniImage}
                                containerClassName={'mini-image'} />
                        }

                    </section>
                    {data.labeledImage &&
                        <LabeledImage className='text-wrap' labeledImage={data.labeledImage} />
                    }

                </article>
                <nav className='slide-nav'>
                    <ArrowButton direction='left' onclick={navToPrevSlide}>Previous</ArrowButton>
                    <ArrowButton direction='right' className='next-button' onclick={navToNextSlide}>Next</ArrowButton>
                </nav>
            </article>

        </>



    )
}