import React, { useEffect, useState } from 'react'
import { Navbar, Logo, Menu, Footer } from '../components'
import { useHistory } from "react-router-dom"

import '../stylesheets/home.scss'

import { useAuth } from '../context/AuthContext'
// import logo from '../somewhere.svg'
import { client } from '../utils/api-helper'
import { Loading } from '.'
import { Typography } from '@material-ui/core'


const Home = () => {
  const { maintenance, setMaintenance, setLoading, isLoading } = useAuth()
  const [data, setData] = useState({contact: { address: {} }, about: {}, social: null})
  // let history = useHistory()


  useEffect(() => {
    setLoading(true)
    if (maintenance) setMaintenance(false)
    client('/api/home').then(response => {
      if (response) {
        if (response.body.maintenance)
          setMaintenance(true)
        else {
          console.log(response.body)
          setData(response.body)
        }
      }
    }).then(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    })
  }, [])


  const createNetwork = (social) => {
    return social.map(function (network) {
      return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
    })
  }

  if (isLoading) return <Loading />

  return (
    <>
      <Navbar sections={data.about.show ? ['about', 'menu'] : ['menu']} />
      {/* --------------- Header Section --------------- */}
      <section id='hero' className='s-hero targert-section container-fluid'
        style={{ backgroundImage: "url('images/background/cement_texture.jpg')", backgroundSize: 'cover', backgroundPosition: "center center", }}
      >
        <div className="row hero-content">
          <div className="col-lg ">
            <Logo fill={"#273848"} />
            <h2>{data.contact ? data.contact.address.street + ', ' + data.contact.address.city : ''}</h2>
            {data.social ?
            <ul className="hero-social">
               {createNetwork(data.social)} 
            </ul>: <></>}
          </div>

        </div>

      </section>

      {/* --------------- About Section --------------- */}
      {
        data.about.show ? 

        <section id="about" className="s-about">
          <div className="row s-about__content">
            <div className="container">
              <div className='row'>
                <Typography paragraph varient="body1">
                  {data.about.text}
                </Typography>
              </div>

            </div>
          </div>
        </section>
        : 
        <></>
      }



      {/* --------------- Menu Section --------------- */}
      <Menu />

      <Footer data={data.contact}/>

    </>
  )
}


export default Home

