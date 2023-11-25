'use client'

import { useEffect, useState } from "react";
import { getSlide } from "../util/sanity-requests"
import LabeledImage from "./LabeledImage"
import { PortableText } from "@portabletext/react";
import './slide.css'
import useLoadContent from "../hooks/useLoadContent";




export default function Slide({ sphere }) {

    const [slide, setSlide] = useLoadContent(getSlide, [sphere])



    return (
        <div className="centerer">
            <main className="slide">
                {slide ?
                    <>
                        {slide.title &&
                            <h1 className="display-1">{slide.title}</h1>
                        }
                        <article className='content' id="content">
                            <section className="left">
                                <p className="lead" id="lead">
                                    {slide.content}
                                </p>

                                {slide.miniImage &&
                                    <LabeledImage
                                        className='text-wrap mini-image'
                                        labeledImage={slide.miniImage}
                                        containerClassName={'mini-image'} />
                                }

                            </section>

                            <LabeledImage className='text-wrap' labeledImage={slide.labeledImage} />
                        </article>
                    </>
                    :
                    <div className='container'>loading...</div>
                }


            </main>
        </div>

    )
}