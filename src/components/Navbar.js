import React from 'react';
import { Link } from 'react-scroll'
import { Button } from '@material-ui/core'
import $ from 'jquery'
// import logo from '../logo.svg'
// import RubberBand from 'react-reveal/RubberBand';
// import Bounce from 'react-reveal/Bounce';

export default function Navbar({ data, sections = [], ...props }) {

    // let [stretch, setStretch] = useState(true) 

    const navburg = function (e) {
        e.preventDefault();
        $('.header-menu-toggle').toggleClass('is-clicked');
        $("body").toggleClass('menu-is-open');
    };

    const navbutton = function () {
        if (window.matchMedia('(max-width: 900px)').matches) {
            console.log('hello')
            $('.header-menu-toggle').removeClass('is-clicked');
            $("body").removeClass('menu-is-open');
        }
    }

    const createLinks = (sections) => {
        return (sections.map(function (section) {
            return (<li key={section}><Link to={section} spy={true} smooth={true} onClick={navbutton}>
                {section.replace(/^\w/, c => c.toUpperCase())}
            </Link></li>)
        })
        )
    }

    // const stretchMe = () => setStretch(!stretch)



    return (
        <header className="s-header">

            <div className="header-content">
                <nav className="header-nav-wrap">
                    <ul className="header-nav">
                        <li><Link to='hero' spy={true} smooth={true} onClick={navbutton}>Home</Link></li>
                        {createLinks(sections)}
                        <li><Button variant="contained" ><a href={'https://www.opentable.com/r/somewhere-dine-bar-reservations-ottawa?restref=1081081&lang=en-US&ot_source=Restaurant%20website'} title="Make a Reservation">Make a Reservation</a></Button></li>
                    </ul>
                </nav>


            </div>
            {/* <Bounce left> */}
                <a className="header-menu-toggle" href="/#" onClick={navburg}><span>Menu</span></a>
            {/* </Bounce> */}
        </header>
    )
}