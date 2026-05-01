import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <span className="font-bold text-white">VidHub</span>
            </Link>
            <p className="text-gray-500 text-sm">Create short-form videos with AI in seconds.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">AI Tools</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/ai-script-generator" className="hover:text-white transition-colors">AI Script Generator</Link></li>
              <li><Link href="/ai-voiceover" className="hover:text-white transition-colors">AI Voiceover</Link></li>
              <li><Link href="/video-idea-generator" className="hover:text-white transition-colors">Video Idea Generator</Link></li>
              <li><Link href="/ai-reel-generator" className="hover:text-white transition-colors">AI Reel Generator</Link></li>
              <li><Link href="/ai-clip-maker" className="hover:text-white transition-colors">AI Clip Maker</Link></li>
              <li><Link href="/ai-thumbnail-maker" className="hover:text-white transition-colors">AI Thumbnail Maker</Link></li>
              <li><Link href="/text-to-speech-for-videos" className="hover:text-white transition-colors">Text to Speech</Link></li>
              <li><Link href="/text-to-video-ai" className="hover:text-white transition-colors">Text to Video AI</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Platforms</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/ai-youtube-shorts-generator" className="hover:text-white transition-colors">YouTube Shorts Generator</Link></li>
              <li><Link href="/ai-tiktok-video-generator" className="hover:text-white transition-colors">TikTok Video Generator</Link></li>
              <li><Link href="/ai-reel-generator" className="hover:text-white transition-colors">Instagram Reels</Link></li>
              <li><Link href="/tiktok-video-editor" className="hover:text-white transition-colors">TikTok Video Editor</Link></li>
              <li><Link href="/youtube-shorts-editor" className="hover:text-white transition-colors">YouTube Shorts Editor</Link></li>
              <li><Link href="/crayo-alternative" className="hover:text-white transition-colors">Crayo Alternative</Link></li>
              <li><Link href="/viewmax-alternative" className="hover:text-white transition-colors">Viewmax Alternative</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex items-center justify-between text-xs text-gray-600">
          <span>© 2025 VidHub. All rights reserved.</span>
          <span>Built with ❤️ for creators</span>
        </div>
      </div>
    </footer>
  )
}
