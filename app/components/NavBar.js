import ArrowButton from './ArrowButton'
import Dropdown from './Dropdown'
import './nav-bar.css'
import { useRouter } from 'next/navigation'

export default function NavBar() {


    const router = useRouter()
    const navToHome = () => {
        router.push('/')
    }


    return (
        <nav className='invisible-nav-bar' id="slide-nav">
            <Dropdown />
            <ArrowButton direction={'left'} onclick={navToHome}>
                    Home
            </ArrowButton>
        </nav>
    )
}