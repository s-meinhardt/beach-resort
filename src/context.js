import React, { useState, useEffect, useContext } from 'react'
// import items from './data'
import Client from './Contentful'

const formatData = items =>
  items.map(item => {
    const id = item.sys.id
    const images = item.fields.images.map(image => image.fields.file.url)
    return { ...item.fields, id, images }
  })

const RoomContext = React.createContext()

const RoomProvider = ({ children }) => {
  const [reset, setReset] = useState(false)

  const [data, setData] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    pets: false,
    breakfast: false,
  })

  const getData = async () => {
    try {
      const response = await Client.getEntries({ content_type: 'beachResortRoom', order: 'fields.price' })
      const rooms = formatData(response.items)
      const featuredRooms = rooms.filter(room => room.featured)
      const minPrice = Math.min(...rooms.map(room => room.price))
      const maxPrice = Math.max(...rooms.map(room => room.price))
      const minSize = Math.min(...rooms.map(room => room.size))
      const maxSize = Math.max(...rooms.map(room => room.size))
      setData({
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        loading: false,
        type: 'all',
        capacity: 1,
        price: maxPrice,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        pets: false,
        breakfast: false,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getRoom = slug => data.rooms.find(room => room.slug === slug)

  const handleChange = e => {
    const name = e.target.name
    let value =
      e.target.type === 'checkbox' ? e.target.checked : name === 'type' ? e.target.value : Number(e.target.value)
    const tempData = { ...data, [name]: value }
    setData({ ...tempData, sortedRooms: filterRooms(tempData) })
  }

  function filterRooms(data) {
    const { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = data
    let sortedRooms = rooms
    if (type !== 'all') sortedRooms = rooms.filter(room => room.type === type)
    sortedRooms = sortedRooms.filter(room => room.capacity >= capacity)
    sortedRooms = sortedRooms.filter(room => room.price <= price)
    sortedRooms = sortedRooms.filter(room => room.size <= maxSize)
    sortedRooms = sortedRooms.filter(room => room.size >= minSize)
    if (breakfast) sortedRooms = sortedRooms.filter(room => room.breakfast)
    if (pets) sortedRooms = sortedRooms.filter(room => room.pets)
    return sortedRooms
  }

  function resetFilters() {
    setReset(reset => !reset)
  }

  useEffect(() => {
    getData()
  }, [reset])

  return (
    <RoomContext.Provider value={{ ...data, getRoom, handleChange, resetFilters }}>{children}</RoomContext.Provider>
  )
}

// defining a custom hook to grab the context
const useRoomContext = () => useContext(RoomContext)

// defining a decorator to wrap a component in a context
function withRoomContext(Component) {
  return function ConsumerWrapper(props) {
    return <RoomContext.Consumer>{value => <Component {...props} context={value} />}</RoomContext.Consumer>
  }
}

export { RoomProvider, useRoomContext, withRoomContext }
