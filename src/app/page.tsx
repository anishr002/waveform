'use client'
import { useState, useRef, useEffect } from 'react'
import AlbumCover from '@/components/album-cover'
import AudioWaveform from '@/components/audio-waveform'
import PlaybackControls from '@/components/playback-controls'
import PlayerMain from '@/components/player-main'
import Tracks from '@/components/tracks'
import Playlist from '@/components/playlist'
import AboutArtist from '@/components/about-artist'
import { songs, playlist as allPlaylists } from '@/data/song'
import { artists } from '@/data/artists'

export default function Home() {
  const [currentPlaylist, setCurrentPlaylist] = useState(allPlaylists[0])
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [likedSongs, setLikedSongs] = useState<any>(new Set())
  const [playbackMode, setPlaybackMode] = useState<'none' | 'shuffle' | 'repeat'>('none')
  
  const audioRef = useRef<any>(null)

  const currentPlaylistSongs = songs?.filter(song => 
    currentPlaylist.tracks.includes(song.id)
  )

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    audio.addEventListener('timeupdate', updateTime)
    
    return () => audio.removeEventListener('timeupdate', updateTime)
  }, [])


  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying])

  const handleSongEnd = () => {
    handleNextTrack()
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleLike = (songId: string) => {
    const newLikedSongs = new Set(likedSongs)
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId)
    } else {
      newLikedSongs.add(songId)
    }
    setLikedSongs(newLikedSongs)
  }

  const handleNextTrack = () => {
    if (playbackMode === 'shuffle') {
     
      const randomIndex = Math.floor(Math.random() * currentPlaylistSongs.length)
      setCurrentSong(currentPlaylistSongs[randomIndex])
    } else {
      const currentIndex = currentPlaylistSongs.findIndex(song => song.id === currentSong.id)
      if (currentIndex < currentPlaylistSongs.length - 1) {
        setCurrentSong(currentPlaylistSongs[currentIndex + 1])
      } else if (playbackMode === 'repeat') {
        setCurrentSong(currentPlaylistSongs[0])
      } else {
        const currentPlaylistIndex = allPlaylists.findIndex(p => p.id === currentPlaylist.id)
        if (currentPlaylistIndex < allPlaylists.length - 1) {
          const nextPlaylist = allPlaylists[currentPlaylistIndex + 1]
          const nextPlaylistSongs = songs.filter(song => nextPlaylist.tracks.includes(song.id))
          setCurrentPlaylist(nextPlaylist)
          setCurrentSong(nextPlaylistSongs[0])
        } else {
          const firstPlaylist = allPlaylists[0]
          const firstPlaylistSongs = songs.filter(song => firstPlaylist.tracks.includes(song.id))
          setCurrentPlaylist(firstPlaylist)
          setCurrentSong(firstPlaylistSongs[0])
        }
      }
    }
    setIsPlaying(true)
  }

  const handlePreviousTrack = () => {
    const currentIndex = currentPlaylistSongs.findIndex(song => song.id === currentSong.id)
    
    if (currentIndex > 0) {
      setCurrentSong(currentPlaylistSongs[currentIndex - 1])
    } else {
      const currentPlaylistIndex = allPlaylists.findIndex(p => p.id === currentPlaylist.id)
      if (currentPlaylistIndex > 0) {
        const prevPlaylist = allPlaylists[currentPlaylistIndex - 1]
        const prevPlaylistSongs = songs.filter(song => prevPlaylist.tracks.includes(song.id))
        setCurrentPlaylist(prevPlaylist)
        setCurrentSong(prevPlaylistSongs[prevPlaylistSongs.length - 1])
      } else {
        const lastPlaylist = allPlaylists[allPlaylists.length - 1]
        const lastPlaylistSongs = songs.filter(song => lastPlaylist.tracks.includes(song.id))
        setCurrentPlaylist(lastPlaylist)
        setCurrentSong(lastPlaylistSongs[lastPlaylistSongs.length - 1])
      }
    }
    setIsPlaying(true)
  }

  const handleSeek = (percent: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (percent / 100) * audioRef.current.duration
    }
  }

  const currentArtist = artists.find(artist => artist.id === currentSong.artistId)

  return (
    <div className='flex min-h-screen flex-col items-center justify-items-center w-full font-[family-name:var(--font-inter-tight)]'>
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onEnded={handleSongEnd}
      />
      <main className='flex justify-center items-center h-screen w-full'>
        <div className='w-[1278px] h-[85%] grid grid-cols-12 grid-rows-12 gap-2' style={{ gridTemplateRows: 'repeat(12, 3.72rem)' }}>
          <Playlist 
            currentPlayList={currentPlaylist} 
            setPlaylist={setCurrentPlaylist} 
          />
          <AudioWaveform isPlaying={isPlaying} />
          <Tracks 
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentPlaylist={currentPlaylist}
            likedSongs={likedSongs}
            onLike={handleLike}
          />
          <AlbumCover currentSong={currentSong} />
          <PlayerMain 
            currentSong={currentSong}
            currentTime={currentTime}
            duration={audioRef.current?.duration || 0}
            onSeek={handleSeek}
            likedSongs={likedSongs}
            onLike={handleLike}
          />
          <AboutArtist currentArtist={currentArtist} />
          <PlaybackControls 
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            playbackMode={playbackMode}
            setPlaybackMode={setPlaybackMode}
            onNext={handleNextTrack}
            onPrevious={handlePreviousTrack}
          />
        </div>
      </main>
    </div>
  )
}