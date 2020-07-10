import React, { useState } from 'react';
import { animateScroll as scroll, } from 'react-scroll'
// import Swing from 'react-reveal/Swing';
import Wobble from 'react-reveal/Wobble';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';

export default function Footer({ data, ...props }) {


  const createNetwork = (social) => {
    return social.map(function (network) {
      return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
    })
  }


  return (
    <footer className="s-footer" id="contact">

      <div className="right-vert-line" />



      <div className="row s-footer__main">

        <div className="column large-5">
          <div className="footer-contacts">

            {/* <div className="footer-contact-block">
              <h5 className="footer-contact-block__header">
                Email
                            </h5>
              <p className="footer-contact-block__content">
                <a href={"mailto:" + data.email}>{data.email}</a>
              </p>
            </div> */}


            {/* <div className="footer-contact-block" >
              <h5 className="footer-contact-block__header">Phone</h5>
              <p className="footer-contact-block__content">
                <a href={"tel:" + data.phone}>{data.phone}</a>
              </p>
            </div> */}



            {/* <br />

            <div className="footer-contact-block">

              <h5 className="footer-contact-block__header">
                Social
                            </h5>



              <ul className="footer-contact-block__list">
                {createNetwork(data.social)}
              </ul>

            </div> */}
          </div>
        </div>
      </div>

      <div className="row s-footer__bottom">
        <div className="column large-full ss-copyright ">
          <span>© Somewhere Dine Bar</span>
        </div>
        {/* <div className="column large-full ss-copyright">
          <span>Design by Tarek Sanger</span>
        </div> */}

        {/* 
        <div className="ss-go-top">
          <a title="Back to Top" href='/#' onClick={scroll.scrollToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0l8 9h-6v15h-4v-15h-6z" /></svg>
          </a>
        </div> */}
      </div>

    </footer>

  )
}