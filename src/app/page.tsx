'use client'
import { useState } from 'react'

import AlbumCover from '@/components/album-cover'
import AudioWaveform from '@/components/audio-waveform'
import PlaybackControls from '@/components/playback-controls'
import PlayerMain from '@/components/player-main'
import Tracks from '@/components/tracks'
import Playlist from '@/components/playlist'
import AboutArtist from '@/components/about-artist'

import { Song, Playlist as PlayListType, playlist } from '@/data/song'

export default function Home() {
  const [currentPlayList, setPlaylist] = useState<PlayListType>(playlist[0])
  return (
    <div className='flex min-h-screen flex-col items-center justify-items-center w-full font-[family-name:var(--font-inter-tight)]'>
      <main className='flex justify-center items-center h-screen w-full'>
        <div className='w-[1278px] h-[85%] grid grid-cols-12 grid-rows-12 gap-2' style={{ gridTemplateRows: 'repeat(12, 3.72rem)' }}>
          <Playlist currentPlayList={currentPlayList} setPlaylist={setPlaylist} />
          <AudioWaveform />
          <Tracks />
          <AlbumCover />
          <PlayerMain />
          <AboutArtist />
          <PlaybackControls />
        </div>
      </main>
    </div>
  )
}
