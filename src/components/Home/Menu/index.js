/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import { Paper, makeStyles, Grid, Container } from '@material-ui/core'

import FoodMenu from './FoodMenu'
import WineMenu from './WineMenu'
import DrinkMenu from './DrinksMenu'

const Menu = () => {
  const classes = useStyles()
  const [showFood, setShowFood] = useState(true)
  const [showWine, setShowWine] = useState(true)

  const showWineMenu = !showFood && showWine
  const showBeerMenu = !showFood && !showWine

  const handleFoodClick = (e) => {
    e.preventDefault()
    if (!showFood) setShowFood(true)
  }

  const handleDrinkClick = (e) => {
    e.preventDefault()
    if (showFood) setShowFood(false)
  }

  const handleWineClick = (e) => {
    e.preventDefault()
    if (!showWine) setShowWine(true)
  }
  const handleCocktailsBeerClick = (e) => {
    e.preventDefault()
    if (showWine) setShowWine(false)
  }


  return (
    <section id="menu" className="s-menu">
      <div className="s-menu__content container-fluid">
        <div>
          <div className="menu-toggle">
            <a className={(showFood ? "active" : "") + " s-menu__btn"} onClick={handleFoodClick}>Food</a>
            <a className={(!showFood ? "active" : "") + " s-menu__btn"} onClick={handleDrinkClick}>Drinks</a>
          </div>
          <div className="menu-toggle drink-toggle row">
            <Fade top collapse when={!showFood}>
              <a className={(showWine ? "active" : "")} onClick={handleWineClick}> Wine </a>
              <a className={(showBeerMenu ? "active" : "")} onClick={handleCocktailsBeerClick}> Cocktails & Beer </a>
            </Fade>
          </div>
        </div>
        
        <>
          <div className={"s-menu__wrapper "  + (!showWineMenu ? 'd-none' : '')}>
            <Fade collapse when={showWineMenu} >
              <Paper className={"s-menu__paper "} elevation={3}>
                <WineMenu />
              </Paper>
            </Fade>
          </div>
          <div className={"s-menu__wrapper " + (!showBeerMenu ? 'd-none' : '') }>
            <Fade collapse when={showBeerMenu} >
              <Paper className={"s-menu__paper "} elevation={3}>
                <DrinkMenu />
              </Paper>
            </Fade>
          </div>
          <div className={"s-menu__wrapper " + (!showFood ? 'd-none' : '')}>
            <Fade collapse when={showFood}>
              <Paper className={"s-menu__paper "} elevation={3}>
                <FoodMenu />
              </Paper>
            </Fade>
          </div>
        </>

      </div>
    </section >

  )
}

const useStyles = makeStyles((theme) => ({

  paper: {
    float: 'top',
    // position: 'absolute',
    // display: 'block',
    top: 0,
    left: 0,
    right: 0,

  }

}))

export default Menu



