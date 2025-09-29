'use client'
import React from 'react'
import Image from 'next/image'
import { Pause, Play, Heart } from 'lucide-react'
import { songs, Song, Playlist as PlaylistType } from '@/data/song'

const Tracks = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  currentPlaylist,
  likedSongs,
  onLike
}: {
  currentSong: Song
  setCurrentSong: (song: Song) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  currentPlaylist: PlaylistType
  likedSongs: Set<string>
  onLike: (songId: string) => void
}) => {
  
  const playlistSongs = songs.filter(song => 
    currentPlaylist.tracks.includes(song.id)
  )

  const handlePlaySong = (song: Song) => {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentSong(song)
      setIsPlaying(true)
    }
  }

  const handleLikeClick = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation()
    onLike(songId)
  }

  return (
    <div className='col-span-6 row-span-5 col-start-1 row-start-8 bg-black p-4'>
      <h1 className='mb-2'>Tracks in the playlist</h1>
      <div className='overflow-y-auto h-[calc(100%-36px)] custom-scroll'>
        {playlistSongs.map(song => {
          const isCurrentSong = currentSong.id === song.id
          const isLiked = likedSongs.has(song.id)
          
          return (
            <div 
              key={song.id} 
              onClick={() => handlePlaySong(song)}
              className={`group flex items-center gap-4 p-2 hover:bg-accent/30 transition-colors cursor-pointer ${
                isCurrentSong ? 'bg-accent/20 border border-accent' : ''
              }`}
            >
              <div className='flex items-center gap-4 flex-1 min-w-0'>
                <div className='relative'>
                  <Image 
                    src={song.cover} 
                    alt={`${song.title} cover`} 
                    width={48} 
                    height={48} 
                    className='object-cover'
                  />
                  <div className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-accent ${
                    isCurrentSong && isPlaying ? 'opacity-100' : ''
                  }`}>
                    {isCurrentSong && isPlaying ? (
                      <Pause className='h-4 w-4 fill-current' />
                    ) : (
                      <Play className='h-4 w-4 fill-current' />
                    )}
                  </div>
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='font-medium text-sm truncate'>{song.title}</div>
                  <div className='text-xs text-muted-foreground truncate'>{song.artist}</div>
                </div>
              </div>
              <button 
                onClick={(e) => handleLikeClick(e, song.id)}
                className={`opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none outline-none bg-none ${
                  isLiked ? 'opacity-100 text-red-500' : ''
                }`}
              >
                <Heart 
                  fill={isLiked ? 'currentColor' : 'none'} 
                  className='stroke-current' 
                  size={16} 
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tracks