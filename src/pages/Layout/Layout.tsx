import React from 'react'
import './Layout.scss'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='layout-container'>
        <Outlet />
    </div>
  )
}
