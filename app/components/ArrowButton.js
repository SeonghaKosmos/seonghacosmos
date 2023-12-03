
import './arrow-button.css';



export default function ArrowButton({direction, children, onclick}) {


    let imgSrc
    let flexDirection

    switch (direction) {
        case 'left':
            imgSrc = '/arrow-left.png'
            flexDirection = 'row'
            break;
        case 'right':
            imgSrc = '/arrow-right.png'
            flexDirection = 'row-reverse'
            break;
        default:
            imgSrc = '/arrow-left.png'
            flexDirection = 'row'
            break;
    }


    return (
        <button className="navbar-toggler ArrowButton-button" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation"
            onClick={onclick}
        >
            <div className='arrow-button-content' style={{flexDirection}}>
                <img className='back-arrow-img' src={imgSrc} alt="back arrow" />
                <span>{children}</span>
            </div>
        </button>
    )
}