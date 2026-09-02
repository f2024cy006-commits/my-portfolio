function LiveMotionStrip({ items, tone = 'violet' }) {
  const repeatedItems = [...items, ...items]

  return (
    <div className={`live-motion-strip live-motion-${tone}`} aria-hidden="true">
      <div className="live-motion-track">
        {repeatedItems.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item} <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  )
}

export default LiveMotionStrip
