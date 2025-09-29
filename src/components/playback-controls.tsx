'use client'
import React from 'react'
import { Pause, SkipForward, SkipBack, Shuffle, Repeat, Play } from 'lucide-react'

const PlaybackControls = ({
  isPlaying,
  onPlayPause,
  playbackMode,
  setPlaybackMode,
  onNext,
  onPrevious
}: {
  isPlaying: boolean
  onPlayPause: () => void
  playbackMode: 'none' | 'shuffle' | 'repeat'
  setPlaybackMode: (mode: 'none' | 'shuffle' | 'repeat') => void
  onNext: () => void
  onPrevious: () => void
}) => {
  
  const handleShuffle = () => {
    setPlaybackMode(playbackMode === 'shuffle' ? 'none' : 'shuffle')
  }

  const handleRepeat = () => {
    setPlaybackMode(playbackMode === 'repeat' ? 'none' : 'repeat')
  }

  const ButtonContainer = ({ 
    children, 
    className, 
    onClick 
  }: { 
    children: React.ReactNode
    className: string
    onClick: () => void
  }) => (
    <div className={`bg-black ${className}`}>
      <button 
        onClick={onClick}
        className='cursor-pointer border-none outline-none bg-none w-full h-full flex justify-center items-center hover:bg-popover-foreground/20 text-accent'
      >
        {children}
      </button>
    </div>
  )

  return (
    <>
      <ButtonContainer 
        onClick={handleShuffle}
        className={`col-start-4 row-start-6 ${playbackMode === 'shuffle' ? '!bg-accent' : ''}`}
      >
        <Shuffle 
          className={`justify-self-center self-center ${playbackMode === 'shuffle' ? 'stroke-black' : ''}`} 
          size={30} 
          strokeWidth={2} 
        />
      </ButtonContainer>
      
      <ButtonContainer 
        onClick={handleRepeat}
        className={`col-start-4 row-start-7 ${playbackMode === 'repeat' ? '!bg-accent' : ''}`}
      >
        <Repeat 
          className={`justify-self-center self-center ${playbackMode === 'repeat' ? 'stroke-black' : ''}`} 
          size={30} 
          strokeWidth={2} 
        />
      </ButtonContainer>
      
      <ButtonContainer 
        onClick={onNext}
        className='col-start-6 row-start-6'
      >
        <SkipForward 
          fill='currentColor' 
          className='justify-self-center self-center' 
          size={30} 
          strokeWidth={1} 
        />
      </ButtonContainer>
      
      <ButtonContainer 
        onClick={onPrevious}
        className='col-start-6 row-start-7'
      >
        <SkipBack 
          fill='currentColor' 
          className='justify-self-center self-center' 
          size={30} 
          strokeWidth={1} 
        />
      </ButtonContainer>
      
      <ButtonContainer 
        onClick={onPlayPause}
        className='row-span-2 col-start-5 row-start-6'
      >
        {isPlaying ? (
          <Pause 
            fill='currentColor' 
            className='justify-self-center self-center' 
            size={50} 
            strokeWidth={1} 
          />
        ) : (
          <Play 
            fill='currentColor' 
            className='justify-self-center self-center' 
            size={50} 
            strokeWidth={1} 
          />
        )}
      </ButtonContainer>
    </>
  )
}

export default PlaybackControls