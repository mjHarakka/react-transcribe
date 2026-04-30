import { useState } from 'react'
import { Audio } from 'expo-av'

export function usePlayer() {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  async function play(uri: string) {
    if (sound) {
      await sound.unloadAsync()
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true }
    )

    setSound(newSound)
    setIsPlaying(true)

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        setIsPlaying(false)
      }
    })
  }

  async function stop() {
    if (sound) {
      await sound.stopAsync()
      setIsPlaying(false)
    }
  }

  return { isPlaying, play, stop }
}
