import React from 'react'
import { FaSearchengin } from "react-icons/fa";

const SearchInput = () => {
  return (
      <form className='flex items-center gap-2' >
          <input type='text' placeholder='Search_' className='input input-bordered rounded-full' />
      <button type="submit" className='btn btn-circle bg-sky-500 text-white'><FaSearchengin /></button>
    </form>
  )
}


export default SearchInput