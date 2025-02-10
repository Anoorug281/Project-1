import React from 'react'
import NodataImage from '../assets/NodataImage.png'
const NoData = () => {
  return (
    <>
        <div className='flex flex-col items-center justify-center p-10 m-5 gap-2'>
            <img
              src={NodataImage}
              alt='nodata'
              className='w-36'
            />
            <p className='text-neutral-400'>Nodata</p>
        </div>
    </>
  )
}

export default NoData