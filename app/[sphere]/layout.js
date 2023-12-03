'use client'

import './layout.css'
import TableOfContents from "../components/TableOfContents";
import NavBar from '../components/NavBar';

export default function SlideLayout({ params: { sphere }, children }) {




    return (
        <>
            <NavBar />
            <div className="centerer">
                <div className='sphere-content'>
                    <main className="slide-container">
                        {children}
                    </main>
                    <TableOfContents sphere={sphere} />
                </div>
            </div>
        </>
    )
}