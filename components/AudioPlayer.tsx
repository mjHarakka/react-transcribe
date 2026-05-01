import { IconButton } from 'react-native-paper'
import { usePlayer } from '../hooks/usePlayer'

type Props = {
  uri: string
  iconColor?: string
  size?: number
}

export default function AudioPlayer({ uri, iconColor, size = 28 }: Props) {
  const { isPlaying, play, stop } = usePlayer()

  return (
    <IconButton
      icon={isPlaying ? 'stop-circle' : 'play-circle'}
      size={size}
      iconColor={iconColor}
      onPress={isPlaying ? stop : () => play(uri)}
    />
  )
}
