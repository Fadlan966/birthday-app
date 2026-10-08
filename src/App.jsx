import { useState, useRef, useMemo } from 'react'
import { config, moments } from './moments.js'

const COLORS = ['#ff5d8f', '#ffb347', '#ffffff', '#7ee0c3', '#8ab4ff']

function playMelody() {
  const AC = window.AudioContext || window.webkitAudioContext
  const ctx = new AC()
  const N = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 }
  const seq = [
    ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
    ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
    ['G4', .75], ['G4', .25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 2],
    ['F5', .75], ['F5', .25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 2],
  ]
  let t = ctx.currentTime + 0.1
  const beat = 0.42
  seq.forEach(([n, b]) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'triangle'
    o.frequency.value = N[n]
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.25, t + 0.03)
    g.gain.exponentialRampToValueAtTime(0.001, t + b * beat)
    o.connect(g); g.connect(ctx.destination)
    o.start(t); o.stop(t + b * beat)
    t += b * beat
  })
  return ctx
}

function Confetti() {
  const items = useMemo(
    () => Array.from({ length: 36 }, (_, i) => ({
      i, l: Math.random() * 100, d: 3 + Math.random() * 4, dl: Math.random() * 4, c: COLORS[i % COLORS.length],
    })), [])
  return items.map((x) => (
    <span key={x.i} className="c"
      style={{ left: x.l + '%', background: x.c, animationDuration: x.d + 's', animationDelay: '-' + x.dl + 's' }} />
  ))
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [sound, setSound] = useState(true)
  const [open, setOpen] = useState(null)
  const audio = useRef()
  const { name, age, message: msg } = config
  const cur = open !== null ? moments[open] : null

  function start() {
    setStarted(true)
    try { audio.current = playMelody() } catch (e) {}
  }
  function toggleSound() {
    const c = audio.current
    if (!c) return
    sound ? c.suspend() : c.resume()
    setSound(!sound)
  }

  if (!started)
    return (
      <div className="intro">
        <div style={{ fontSize: '3.5rem' }}>🎁</div>
        <h1>Ada kejutan untukmu, {name}!</h1>
        <p>Tekan tombol play untuk memulai</p>
        <button className="play" onClick={start} aria-label="Putar">▶</button>
      </div>
    )

  return (
    <div className="rev">
      <button className="snd" onClick={toggleSound} aria-label="Musik">{sound ? '🔊' : '🔇'}</button>
      <header className="hero">
        <Confetti />
        <div className="age">{age}</div>
        <h1>Selamat Ulang Tahun, {name}! 🎂</h1>
        <p>{msg}</p>
      </header>
      <main>
        <div className="bar"><h2>Momen Kita 📷</h2></div>
        <p className="hint">Klik foto atau video untuk memperbesar.</p>
        <div className="grid">
          {moments.map((x, i) => (
            <div className="card" key={i}>
              <div className="m" onClick={() => setOpen(i)}>
                <img src={x.type === 'video' ? x.poster : x.src} alt={x.caption} loading="lazy" />
                {x.type === 'video' && <span className="tag">▶ Video</span>}
              </div>
              <div className="cap">{x.caption}</div>
            </div>
          ))}
        </div>
      </main>
      {cur && (
        <div className="lb" onClick={() => setOpen(null)}>
          {cur.type === 'video'
            ? <video src={cur.src} controls autoPlay playsInline onClick={(e) => e.stopPropagation()} />
            : <img src={cur.src} alt={cur.caption} />}
          <div className="cp">{cur.caption} · ketuk untuk menutup</div>
        </div>
      )}
    </div>
  )
}
