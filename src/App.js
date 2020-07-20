import React, { useEffect } from 'react';
import {
  Switch,
  Route,

} from 'react-router-dom'
import $ from 'jquery'

import { useAuth } from './context/AuthContext'

import { Home, FourZeroFour, Maintenance, Loading } from './pages'
import Admin from './route/Admin'


function App() {

  const { maintenance, isLoading } = useAuth()

  const pxShow = 800;
  const $WIN = $(window)
  const $toggleButton = $('.header-menu-toggle');
  const $siteBody = $("body");

  const handleScroll = function () {

    /*------------- Header ----------- */
    const triggerHeight = $('.s-hero').outerHeight() - 170;

    let loc = $WIN.scrollTop();

    if (loc > triggerHeight) {
      $('.s-header').addClass('sticky');
    } else {
      $('.s-header').removeClass('sticky');
    }

    if (loc > triggerHeight + 20) {
      $('.s-header').addClass('offset');
    } else {
      $('.s-header').removeClass('offset');
    }

    if (loc > triggerHeight + 150) {
      $('.s-header').addClass('scrolling');
    } else {
      $('.s-header').removeClass('scrolling');
    }

    /*------------- Footer ----------- */
    if ($(window).scrollTop() >= pxShow) {
      if (!$(".ss-go-top").hasClass('link-is-visible')) $(".ss-go-top").addClass('link-is-visible')
    } else {
      $(".ss-go-top").removeClass('link-is-visible')
    }

  };


  const handleResize = function () {
    $('#hero').css({ 'height': $(window).height() });
    $('body').css({ 'width': $(window).width() })
    // above 900px
    if (window.matchMedia('(min-width: 901px)').matches) {
      if ($siteBody.hasClass("menu-is-open")) $siteBody.removeClass("menu-is-open");
      if ($toggleButton.hasClass("is-clicked")) $toggleButton.removeClass("is-clicked");
    }

  };

  useEffect(() => {
    $('#hero').css({ 'height': $(window).height() });
    $('body').css({ 'width': $(window).width() })

    window.addEventListener('scroll', handleScroll)

    // if ($(window).scrollTop() >= pxShow) $(".ss-go-top").addClass('link-is-visible');
    window.addEventListener('resize', handleResize)
  }, [])

  $('#hero').css({ 'height': $(window).height() });

  return (
    <div className="App">

    <Switch>

      <Route path="/admin" component={Admin} />        
      
      <Route exact path='/' >
        {maintenance ? <Maintenance /> : <Home/>}
      </Route>

      <Route path="*">
          <Loading/>
        </Route>

    </Switch>

    </div>
  );
}

export default App;
