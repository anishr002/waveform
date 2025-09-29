import React from 'react'


const AboutArtist = ({ currentArtist }: { currentArtist?: any }) => {
  if (!currentArtist) {
    return (
      <div className='col-span-6 row-span-3 col-start-7 row-start-10 bg-black p-4'>
        <div className='text-muted-foreground'>No artist information</div>
      </div>
    )
  }

  return (
    <div className='col-span-6 row-span-3 col-start-7 row-start-10 bg-black p-4'>
      <h1 className='mb-4'>About Artist</h1>
      <div className='font-medium text-sm truncate mb-2'>{currentArtist.name}</div>
      <div className='text-xs text-muted-foreground line-clamp-3 mb-3'>
        {currentArtist.description}
      </div>
      <div className='font-[family-name:var(--font-geist-mono)] opacity-75'>
        {currentArtist.listeners}
      </div>
    </div>
  )
}

export default AboutArtist