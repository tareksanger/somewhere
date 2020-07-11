/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import { Paper, makeStyles, Grid } from '@material-ui/core'

import FoodMenu from './FoodMenu'
import WineMenu from './WineMenu'
import DrinkMenu from './DrinksMenu'

const Menu = () => {
  const classes = useStyles()
  const [showFood, setShowFood] = useState(true)
  const [showWine, setShowWine] = useState(true)

  const showWineMenu = () => (!showFood && showWine)
  const showBeerMenu = () => (!showFood && !showWine)

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
      <div className="row s-menu__content">
        <article className="column">

          <div className="menu-toggle">
            <a className={(showFood ? "active" : "") + " s-menu__btn"} onClick={handleFoodClick}>
              Food
                 </a>

            <a className={(!showFood ? "active" : "") + " s-menu__btn"} onClick={handleDrinkClick}>
              Drinks
                </a>
          </div>


          <div className="drink-toggle row">
            <Fade top collapse when={!showFood}>
              <a className={(showWine ? "active" : "") + " s-menu-btn_sm"} onClick={handleWineClick}>
                Wine
                  </a>

              <a className={(!showWine ? "active" : "") + " s-menu-btn_sm"} onClick={handleCocktailsBeerClick}>
                Cocktails & Beer
                  </a>
            </Fade>
          </div>
          <div id="menu-wrapper" className={"s-menu__wrapper"}>
            <div>
              <Fade collapse when={showFood}>
                <Paper className={"s-menu__paper "} elevation={3}>
                  <FoodMenu />
                </Paper>
              </Fade>
            </div>

            <div>
              <Fade collapse when={!showFood && showWine} >
                <Paper className={"s-menu__paper "} elevation={3}>
                  <WineMenu />
                </Paper>
              </Fade>
            </div>
            <div>
              <Fade collapse when={!showFood && !showWine} >
                <Paper className={"s-menu__paper "} elevation={3}>
                  <DrinkMenu />
                </Paper>
              </Fade>

            </div>


          </div>
        </article>
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