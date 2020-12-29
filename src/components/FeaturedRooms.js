import React from 'react'
import { useRoomContext } from '../context'
import Loading from './Loading'
import Room from './Room'
import Title from './Title'

const FeaturedRooms = () => {
  const { featuredRooms, loading } = useRoomContext()
  return (
    <section className='featured-rooms'>
      <Title title='featured rooms' />
      <div className='featured-rooms-center'>
        {loading ? <Loading /> : featuredRooms.map(room => <Room key={room.id} {...room} />)}
      </div>
    </section>
  )
}

export default FeaturedRooms
