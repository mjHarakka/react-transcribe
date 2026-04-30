import { IconButton } from 'react-native-paper'
import { usePlayer } from '../hooks/usePlayer'

type Props = {
  uri: string
}

export default function AudioPlayer({ uri }: Props) {
  const { isPlaying, play, stop } = usePlayer()

  return (
    <IconButton
      icon={isPlaying ? 'stop-circle' : 'play-circle'}
      size={28}
      onPress={isPlaying ? stop : () => play(uri)}
    />
  )
}
