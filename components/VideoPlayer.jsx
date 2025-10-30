import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

export default function VideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    setError(null)

    // If browser supports native HLS (Safari), set src directly
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    } else if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('hls error', event, data)
        if (data.fatal) setError('Playback error')
      })
      return () => hls.destroy()
    } else {
      setError('This browser does not support HLS playback')
    }
  }, [src])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          controls
          poster={poster}
          className="w-full h-auto bg-black"
        />
      </div>
      {title && <h3 className="mt-2 text-white text-lg">{title}</h3>}
      {error && <p className="text-red-400">{error}</p>}
    </div>
  )
}
