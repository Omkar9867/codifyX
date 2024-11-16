import React, { useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi'

type LogoutProps = {}

const Logout: React.FC<LogoutProps> = () => {

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload()
    }

  return (
    <>
    <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogout}>
        <FiLogOut/>
    </button>
    </>
  )
}

export default Logout