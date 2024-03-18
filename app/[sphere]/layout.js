'use client'

import './layout.css'
import TableOfContents from "../components/TableOfContents";
import NavBar from '../components/SlideNavBar';
import { useEffect, useRef } from 'react';

export default function SlideLayout({ params: { sphere }, children }) {


    const tocWindow = useRef();


    return (
        <>
            <div id='toc-window' ref={tocWindow}>
                <TableOfContents sphere={sphere} />
            </div>
            <NavBar />
            <div className="centerer">
                <div className='sphere-content'>
                    <main className="slide-container">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}