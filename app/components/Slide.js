'use client'

import { useEffect, useState } from "react";
import LabeledImage from "./LabeledImage"
import { PortableText } from "@portabletext/react";
import './slide.css'
import useLoadContent from "../hooks/useLoadContent";




export default function Slide({ data }) {



    return (
        <div className="centerer">
            <main className="slide">
                {data.title &&
                    <h1 className="display-1">{data.title}</h1>
                }
                <article className='content' id="content">
                    <section className={data.labeledImage ? 'left' : 'left-without-image'}>
                        <p className="lead" id="lead">
                            {data.content}
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
            </main>
        </div>

    )
}