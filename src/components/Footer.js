import React, { useState } from 'react';
import { animateScroll as scroll, } from 'react-scroll'

export default function Footer({ data, ...props }) {

  return (
    <footer className="s-footer">


      <div className="container s-footer__main">


      </div>

      <div className="s-footer__bottom">
        <div className="ss-copyright ">
          <span>© Somewhere Dine Bar</span>
        </div>
        {/* <div className="ss-copyright">
          <span>Designed & Developed by Tarek Sanger</span>
        </div> */}

        
        <div className="ss-go-top">
          <a title="Back to Top" href='/#' onClick={scroll.scrollToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0l8 9h-6v15h-4v-15h-6z" /></svg>
          </a>
        </div>
      </div>

    </footer>

  )
}