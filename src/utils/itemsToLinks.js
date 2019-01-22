//takes in an array of items and its' type and makes them into
//an array of Links with item name and type as its uri
//used for fields in the infobox such as ethnicity, nationality etc.
//used by templates/roleModelPost.js,
import React from 'react'
import { Link } from 'gatsby'

export default (items, itemType) => {
  const links = items.map(item => {
    const link = (
      <Link to={`/${itemType}/${item}`} key={item}>
        {item}
      </Link>
    )
    return link
  })
  return links
}
