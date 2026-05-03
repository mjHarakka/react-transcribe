import { useState, useRef } from 'react'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system/legacy'

export function useRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  async function startRecording() {
    await Audio.requestPermissionsAsync()
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    )
    setRecording(recording)
    setIsRecording(true)
    setDuration(0)
    intervalRef.current = setInterval(() => setDuration(d => d + 1), 1000)
  }

  async function stopRecording(): Promise<string | null> {
    if (!recording) return null

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setDuration(0)

    await recording.stopAndUnloadAsync()
    const tempUri = recording.getURI()
    setRecording(null)
    setIsRecording(false)

    if (!tempUri) return null

    const destination = `${FileSystem.documentDirectory}recording-${Date.now()}.m4a`
    await FileSystem.moveAsync({ from: tempUri, to: destination })
    return destination
  }

  return { isRecording, duration, startRecording, stopRecording }
}
