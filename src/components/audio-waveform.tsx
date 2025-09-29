'use client'
import { useEffect, useState } from 'react'

export default function AudioWaveform({ isPlaying }: { isPlaying: boolean }) {
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    // Initial bars
    const initialBars = Array.from({ length: 35 }, () => Math.random() * 60 + 10)
    setBars(initialBars)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying) {
      interval = setInterval(() => {
        setBars(prev => prev.map(() => {
          const base = Math.random() * 50 + 15
          const spike = Math.random() > 0.8 ? Math.random() * 30 : 0
          return Math.min(base + spike, 80)
        }))
      }, 100)
    } else {
      // Reset to low bars when paused
      setBars(prev => prev.map(bar => Math.max(bar * 0.3, 10)))
    }

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className='flex items-center justify-center gap-1 mb-8 px-4 relative h-full col-span-3 row-span-2 col-start-1 row-start-6 bg-black'>
      {bars.map((height, index) => (
        <div key={index} className='flex flex-col items-center relative'>
          <div
            className='bg-accent transition-all duration-100 ease-out opacity-100 w-1 mb-px'
            style={{
              height: `${height}px`,
              transform: isPlaying ? 'scaleY(1)' : 'scaleY(0.3)',
            }}
          />
        </div>
      ))}
    </div>
  )
}