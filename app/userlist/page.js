'use client'
import React from 'react'
import Link from 'next/link'
function page() {
    const userlist=[
        {name:'first',id:1,path:'./userlist/first'},
        {name:'second',id:2,path:'./userlist/second'},
        {name:'third',id:3,path:'./userlist/third'},
        {name:'fourth',id:4,path:'./userlist/fourth'},
    ]
  return (
    <div>
      <h1>User list</h1>
      <ul>{
        userlist.map((user)=>(
            <li key={user.id}><Link
            href={user.path}>{user.name}</Link></li>
        ))
        }
      </ul>
    </div>
  )
}

export default page
