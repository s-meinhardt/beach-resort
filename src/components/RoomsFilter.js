import React from 'react'
import styled from 'styled-components'
import { useRoomContext } from '../context'
import Title from './Title'

const getUnique = (items, value) => [...new Set(items.map(item => item[value]))]

const RoomsFilter = ({ rooms }) => {
  const types = ['all', ...getUnique(rooms, 'type')]
  const capacities = getUnique(rooms, 'capacity')
  const {
    handleChange,
    resetFilters,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    pets,
    breakfast,
  } = useRoomContext()
  return (
    <section className='filter-container'>
      <Title title='search rooms' />
      <form className='filter-form'>
        {/* select type */}
        <div className='form-group'>
          <label htmlFor='type'>room type</label>
          <select name='type' id='type' value={type} className='form-control' onChange={handleChange}>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* select capacity */}
        <div className='form-group'>
          <label htmlFor='capacity'>guests</label>
          <select name='capacity' id='capacity' value={capacity} className='form-control' onChange={handleChange}>
            {capacities.map((capacity, index) => (
              <option key={index} value={capacity}>
                {capacity}
              </option>
            ))}
          </select>
        </div>
        {/* select price */}
        <div className='form-group'>
          <label htmlFor='price'>room price ${price}</label>
          <input
            type='range'
            id='price'
            name='price'
            value={price}
            onChange={handleChange}
            min={minPrice}
            max={maxPrice}
            className='form-control'
          />
        </div>
        {/* select size */}
        <div className='form-group'>
          <label htmlFor='size'>room size</label>
          <div className='size-inputs' id='size'>
            <input type='number' className='size-input' name='minSize' value={minSize} onChange={handleChange} />
            <input type='number' className='size-input' name='maxSize' value={maxSize} onChange={handleChange} />
          </div>
        </div>
        {/* select breakfast and pets */}
        <div className='form-group'>
          <div className='single-extra'>
            <input type='checkbox' name='breakfast' id='breakfast' checked={breakfast} onChange={handleChange} />
            <label htmlFor='breakfast'>breakfast </label>
          </div>

          <div className='single-extra'>
            <input type='checkbox' name='pets' id='pets' checked={pets} onChange={handleChange} />
            <label htmlFor='pets'>pets</label>
          </div>
        </div>
        <Button type='button' className='btn-primary' onClick={resetFilters}>
          reset
        </Button>
      </form>
    </section>
  )
}

export default RoomsFilter

// styled Button component
const Button = styled.button`
  height: 2rem;
  width: 6rem;
  font-size: 0.7rem;

  @media screen and (min-width: 1220px) {
    justify-self: end;
  }
`
