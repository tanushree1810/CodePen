import React from 'react'
import {motion} from "framer-motion"
import { slideUpOut } from '../animations'

const Alert = ({status,alertMsg}) => {
  return (
    <motion.div {...slideUpOut} className='fixed top-24 right-12 z-10 '> 
      {status==="Success" && (
        <div>
            <div className='px-4 py-2 rounded-md bg-emerald-500 shadow-md shadow-emerald-500'>
                <p className='text-lg text-primary'>{alertMsg}</p>
            </div>
        </div>
      )} 

      {status==="Warning" && (
        <div>
            <div className='px-4 py-2 rounded-md bg-yellow-500 shadow-md shadow-yellow-500'>
                <p className='text-lg text-primary'>{alertMsg}</p>
            </div>
        </div>
      )} 

      {status==="Danger" && (
        <div>
            <div className='px-4 py-2 rounded-md bg-red-500 shadow-md shadow-red-500'>
                <p className='text-lg text-primary'>{alertMsg}</p>
            </div>
        </div>
      )}  
    </motion.div>
  )
}

export default Alert