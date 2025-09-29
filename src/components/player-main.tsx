'use client'
import React from 'react'
import Image from 'next/image'
import { Song } from '@/data/song'
import { Heart } from 'lucide-react'

const PlayerMain = ({ 
  currentSong, 
  currentTime, 
  duration, 
  onSeek,
  likedSongs,
  onLike 
}: {
  currentSong: Song
  currentTime: number
  duration: number
  onSeek: (percent: number) => void
  likedSongs: Set<string>
  onLike: (songId: string) => void
}) => {
  
  const handleLike = () => {
    onLike(currentSong.id)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = ((e.clientX - rect.left) / rect.width) * 100
    onSeek(percent)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const isLiked = likedSongs.has(currentSong.id)

  return (
    <div className='col-span-6 row-span-9 col-start-7 row-start-1 bg-black p-4'>
      <h2 className='text-4xl tracking-tight h-10 truncate'>{currentSong.title}</h2>
      <div className='font-[family-name:var(--font-geist-mono)] opacity-75 h-6'>
        {currentSong.artist}
      </div>
      <div className='relative mx-auto'>
        <div className='w-full h-full absolute top-0 left-0 bg-accent z-10 mix-blend-color'></div>
        <Image 
          className='z-0 mx-auto' 
          priority 
          unoptimized 
          src='/orb.gif' 
          width={500} 
          height={500} 
          alt='audio visualization' 
          style={{ filter: 'hue-rotate(265deg)' }} 
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <h2 className='text-8xl tracking-tight'>{formatTime(currentTime)}</h2>
        <button 
          onClick={handleLike}
          className={`cursor-pointer border-none outline-none bg-none justify-center items-center ${
            isLiked ? 'text-red-500' : 'text-accent'
          }`}
        >
          <Heart 
            fill={isLiked ? 'currentColor' : 'none'} 
            className='stroke-current' 
            size={70} 
            strokeWidth={2} 
          />
        </button>
      </div>
      <div 
        className='h-1 bg-white/30 w-full mt-4 cursor-pointer'
        onClick={handleProgressClick}
      >
        <div 
          className='h-1 bg-accent transition-all duration-100' 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}

export default PlayerMain