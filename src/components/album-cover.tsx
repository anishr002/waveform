'use client'
import React from 'react'
import Image from 'next/image'
import { Song } from '@/data/song'

const AlbumCover = ({ currentSong }: { currentSong: Song }) => {
  return (
    <div className='col-span-3 row-span-5 col-start-4 row-start-1 bg-black relative'>
      <div className='w-full h-full absolute top-0 left-0 bg-accent z-10 mix-blend-color'></div>
      <Image 
        src={currentSong.cover} 
        alt={`${currentSong.title}-cover`} 
        width={400}
        height={400}
        className='w-full h-full object-cover aspect-[0.95]'
      />
    </div>
  )
}

export default AlbumCover