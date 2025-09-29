import React from 'react'
import { playlist, Playlist as PlaylistType } from '@/data/song'

const Playlist = ({ currentPlayList, setPlaylist }: { 
  currentPlayList: PlaylistType
  setPlaylist: (playlist: PlaylistType) => void 
}) => {
  return (
    <div className='col-span-3 row-span-5 bg-black p-4'>
      <h1 className='mb-2'>My Playlists</h1>
      <div>
        {playlist.map(pl => (
          <div 
            key={pl.id} 
            onClick={() => setPlaylist(pl)}
            className={`group flex items-center gap-4 p-2 hover:bg-accent/30 transition-colors cursor-pointer ${
              currentPlayList.id === pl.id ? 'bg-accent/20 border border-accent' : ''
            }`}
          >
            <div className='flex items-center gap-4 flex-1 min-w-0'>
              <div className={`w-12 h-12 flex items-center justify-center ${
                currentPlayList.id === pl.id ? 'bg-accent text-black' : ''
              }`}>
                <h2 className='text-4xl tracking-tight'>{pl.id}</h2>
              </div>
              <div className={`flex-1 min-w-0 ${
                currentPlayList.id === pl.id ? 'text-accent' : ''
              }`}>
                <div className='font-medium text-sm truncate'>{pl.title}</div>
                <div className='text-xs font-[family-name:var(--font-geist-mono)] opacity-75'>
                  {pl.description}
                </div>
                <div className='text-xs text-muted-foreground truncate'>
                  {pl.tracks.length} Songs
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Playlist