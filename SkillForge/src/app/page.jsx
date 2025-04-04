import Login from '@/components/resuable/login'

import React from 'react'


function Home() {
  return (
    <div className='h-screen  w-full bg-[#191919] flex'>
    <div className='w-1/2 h-full'>
        
    </div>
       <div className='w-1/2 h-full flex items-center justify-center'>
        <Login/> 
       </div>
     </div>
  )
}

export default Home