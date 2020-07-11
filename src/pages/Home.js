import React, { useEffect, useState } from 'react'
import { Navbar, Logo, Menu, Footer } from '../components'
import { useHistory } from "react-router-dom"

import '../stylesheets/home.scss'

import { useAuth } from '../context/AuthContext'
// import logo from '../somewhere.svg'
import { client } from '../utils/api-helper'
import { Loading } from '.'


const Home = () => {
  const { maintenance, setMaintenance, setLoading, isLoading } = useAuth()
  const [data, setData] = useState({})
  // let history = useHistory()
  

  useEffect(() => {
    setLoading(true)
    if (maintenance) setMaintenance(false)
    client('/api/home').then(response => {
      if (response) {
        if (response.body.maintenance)
          setMaintenance(true)
        else {
          // console.log(response.body)
          setData(response.body)
        }
      }
    }).then(()=> {
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

  if(isLoading) return <Loading/>

  return (
    <div className="App">
      <Navbar sections={data.about ? ['about', 'menu'] : ['menu']} />
      {/* --------------- Header Section --------------- */}
      <section id='hero' className='s-hero targert-section'
        style={{ backgroundImage: "url('images/background/cement_texture.jpg')", backgroundSize: 'cover', backgroundPosition: "center center", backgroundAttachment: 'fixed', overflow: 'hidden' }}
      >
        <div className="row hero-content">
          <div className="column large-full">
            <Logo fill={"#273848"} />
            <h1>{data.contact ? data.contact.address.street + ', ' + data.contact.address.city : ''}</h1>
            <ul className="hero-social">
              {data.social ? createNetwork(data.social) : <></>}
            </ul>
          </div>

        </div>

      </section>

      {/* --------------- About Section --------------- */}
      {data.about ?
        <section id="about" className="s-about">
          <div className="row s-about__content">
            <div className="column ">
              <p>{data.about}</p>
            </div>
          </div>

        </section>
        :
        <></>
      }



      {/* --------------- Menu Section --------------- */}
      <Menu />

      <Footer/>

    </div>
  )
}


export default Home

