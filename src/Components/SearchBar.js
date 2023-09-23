import React from 'react'
import lens from '../Assets/Lens.png'
import { useContext } from 'react'
import { GlobalContext } from './GlobalContext'

const SearchBar = () => {
    const {handleChange, searchValue} = useContext(GlobalContext)
  return (
    <div className='search-bar'>
        <input type='search' value={searchValue || ""} onChange={handleChange} id='search' name='search' placeholder='Enter a tag name to search'/>
        <img src={lens} alt='lens'/>
    </div>
  )
}

export default SearchBar