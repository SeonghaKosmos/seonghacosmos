import { useDispatch, useSelector } from 'react-redux'
import './drop-down.css'
import { appSliceActions } from '@/redux/store'

export default function Dropdown() {


    const isTOCVisible = useSelector((state) => state.app.isTOCVisible)
    const dispatch = useDispatch()

    const handleDropdownClick = () => {
        dispatch(appSliceActions.setIsTocVisible(!isTOCVisible))
    }

    return (
        <button className="drop-down" onClick={handleDropdownClick}>
            <svg viewBox="0 0 100 80" width="40" height="40">
                <rect width="80" height="10" className='dropdown-bar-rect'></ rect>
                <rect y="30" width="80" height="10" className='dropdown-bar-rect'></rect>
                <rect y="60" width="80" height="10" className='dropdown-bar-rect'></rect>
            </svg>
        </button>

    )
}