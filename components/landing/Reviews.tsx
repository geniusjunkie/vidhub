const REVIEWS = [
  { name: 'Marcus T.', role: 'TikTok Creator · 2.1M followers', avatar: 'MT', text: 'VidHub cut my editing time from 3 hours to 20 minutes. The AI script generator alone is worth the subscription.', stars: 5 },
  { name: 'Priya S.', role: 'YouTube Shorts · 890K subscribers', avatar: 'PS', text: "The voiceover quality is insane — my audience thought I hired a professional narrator. I haven't told them it's AI.", stars: 5 },
  { name: 'Jake L.', role: 'Social Media Manager', avatar: 'JL', text: 'Managing content for 6 brands was exhausting. Now I batch-create a week of content in one afternoon.', stars: 5 },
  { name: 'Aisha K.', role: 'Instagram Reels Creator', avatar: 'AK', text: 'The auto-captions are more accurate than anything else I\'ve tried. And the styles are actually good-looking.', stars: 5 },
  { name: 'Tom R.', role: 'Faceless YouTube Channel', avatar: 'TR', text: 'I run a completely faceless channel. VidHub generates my scripts, voiceovers, and images. Fully automated.', stars: 5 },
  { name: 'Sofia M.', role: 'Brand Content Director', avatar: 'SM', text: 'The video ranking tool is genius for comparison content. Our engagement went up 340% on those videos.', stars: 5 },
]

export default function Reviews() {
  return (
    <section id="reviews" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Loved by creators worldwide</h2>
          <p className="text-gray-400 text-lg">Join thousands of creators saving 10+ hours every week</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r) => (
            <div key={r.name} className="card-dark p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{r.name}</p>
                  <p className="text-gray-500 text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
