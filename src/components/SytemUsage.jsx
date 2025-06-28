import React, { useEffect, useState } from 'react'
import { getSystemUsage } from '../api/Api'

function SystemUsage() {
  const [sysUsage, setSysUsage] = useState(null)

  useEffect(() => {
    const fetchData = () => {
      getSystemUsage()
        .then(res => {
          setSysUsage(res.data)
        })
        .catch(err => {
          console.error("Failed to fetch system usage:", err)
        })
    }

    fetchData()

    const interval = setInterval(fetchData, 5000) // Fetch every 5 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  return (
    <div className='bg-neutral-800 w-auto p-0 text-neutral-200'>
      {sysUsage ? (
        <div className='flex flex-wrap gap-4 text-xs'>
          <p><span className='text-neutral-400'>CPU: </span>{sysUsage.cpu_usage.toFixed(2)}%</p>
          <p><span className='text-neutral-400'>Mem: </span>{sysUsage.mem_usage.toFixed(2)}%</p>
          <p><span className='text-neutral-400'>Disk: </span>{sysUsage.disk_usage.toFixed(2)}%</p>
        </div>
      ) : (
        <p>Loading system usage...</p>
      )}
    </div>
  )
}

export default SystemUsage
