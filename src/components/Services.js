import React from 'react'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'
import Title from './Title'

const services = [
  {
    icon: <FaCocktail />,
    title: 'free cocktails',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.',
  },
  {
    icon: <FaHiking />,
    title: 'Endless Hiking',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.',
  },
  {
    icon: <FaShuttleVan />,
    title: 'Free shuttle',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.',
  },
  {
    icon: <FaBeer />,
    title: 'strongest beer',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, similique.',
  },
]

const Services = () => (
  <section className='services'>
    <Title title='services' />
    <div className='services-center'>
      {services.map((service, index) => (
        <article key={index} className='service'>
          <span>{service.icon}</span>
          <h6 style={{ textTransform: 'capitalize' }}>{service.title}</h6>
          <p>{service.info}</p>
        </article>
      ))}
    </div>
  </section>
)

export default Services
