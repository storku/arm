import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const AllItemsTemplate = ({ data, pageContext }) => {
  const itemType = Object.keys(pageContext)
  const items = pageContext[itemType]

  return (
    <Layout>
      <div>
        <ul>
          {items.map(itemName => {
            return (
              <li key={itemName}>
                <Link to={`${itemType}/${itemName}`}>{itemName}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default AllItemsTemplate
