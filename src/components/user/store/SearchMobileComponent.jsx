import React from 'react'
import SearchComponent from './Search'

const SearchMobileComponent = () => {

  const classNameForSearchBox = ` flex md:hidden flex-1 max-w-[350px] h-[40px] items-center justify-between gap-2 p-0.5 border border-black/[0.5] rounded-full`
  return (
    <SearchComponent classNameForSearchBox={classNameForSearchBox} />
  )
}

export default SearchMobileComponent