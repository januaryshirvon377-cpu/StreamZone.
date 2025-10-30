import { useState } from 'react'
import VideoPlayer from '../components/VideoPlayer'

// Example HLS streams (replace with your own or upload to a streaming host)
const SAMPLE_STREAMS = [
  {
    id: 'sample-1',
    title: 'Big Buck Bunny (HLS sample)',
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: '/poster1.jpg'
  },
  {
    id: 'sample-2',
    title: 'Tears of Steel (HLS sample)',
    src: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8',
    poster: '/poster2.jpg'
  }
]

export default function Home() {
  const [streams] = useState(SAMPLE_STREAMS)
  const [active, setActive] = useState(streams[0])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 to-black p-6 text-gray-100">
      <header className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Streaming Site — Starter</h1>
        <div className="text-sm opacity-80">Built with Next.js + hls.js</div>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoPlayer src={active.src} poster={active.poster} title={active.title} />
        </div>

        <aside className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-md shadow">
            <h2 className="font-semibold mb-2">Now Streaming</h2>
            <p className="text-sm opacity-80">Choose a stream from the list.</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-md shadow space-y-2">
            {streams.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                className={`w-full text-left p-2 rounded ${active.id === s.id ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
                <div className="font-medium">{s.title}</div>
                <div className="text-xs opacity-70">{s.src}</div>
              </button>
            ))}
          </div>

          <div className="bg-gray-900 p-4 rounded-md shadow">
            <h3 className="font-semibold">Quick Actions</h3>
            <ul className="mt-2 text-sm opacity-80 space-y-2">
              <li>• Replace sample streams with your own HLS .m3u8 URLs</li>
              <li>• Add authentication / subscriptions</li>
              <li>• Integrate a CMS (Sanity/Contentful) for video metadata</li>
            </ul>
          </div>
        </aside>
      </section>

      <footer className="max-w-6xl mx-auto mt-8 text-sm opacity-70">Tip: For production, host your HLS on a CDN or streaming provider (Mux, Cloudflare Stream, AWS MediaPackage).</footer>
    </main>
  )
}
