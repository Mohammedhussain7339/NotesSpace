'use client'
import React from 'react'

function page({params}) {
  return (
    <div>
      <h1>{params.user}</h1>
    </div>
  )
}

export default page
