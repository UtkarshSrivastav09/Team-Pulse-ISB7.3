import { useState, useEffect, useRef } from 'react'
import './App.css'

// Professional Inline SVG Icons for top-tier enterprise UI aesthetics
const Icons = {
  Health: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 9v6M9 12h6" />
    </svg>
  ),
  Mobility: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18.5" cy="17.5" r="3.5" />
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="15" cy="5" r="1" />
      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </svg>
  ),
  Education: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Food: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  FinTech: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Legal: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  Security: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Climate: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  Network: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8" />
    </svg>
  ),
  Chart: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Competitors: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  ),
  Strategy: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Globe: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Terminal: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  ),
  Check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Target: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="6" r="6" />
      <circle cx="12" cy="2" r="2" />
    </svg>
  ),
  TrendingUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Zap: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Layers: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Shield: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Search: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Copy: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Download: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Sliders: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  MessageSquare: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Presentation: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  ),
  History: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),
  Send: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Sun: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Dice: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" />
      <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  Cpu: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Info: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Trash: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Activity: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

// Interactive Neural Constellation & Spotlight Aurora Background (Ultra-Smooth 60/120fps)
function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isMobile = window.innerWidth < 768
    const numParticles = isMobile ? 16 : 30

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Particle nodes for multi-agent network
    const particles = []
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
        vy: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
        radius: Math.random() * 1.8 + 1.0,
        color: i % 3 === 0 ? 'rgba(37, 99, 235, 0.45)' : i % 3 === 1 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(79, 70, 229, 0.35)'
      })
    }

    let mouse = { x: -1000, y: -1000 }
    let rafScheduled = false

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!rafScheduled) {
        rafScheduled = true
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${mouse.x}px`)
          document.documentElement.style.setProperty('--mouse-y', `${mouse.y}px`)
          rafScheduled = false
        })
      }
    }
    
    if (!isMobile) {
      window.addEventListener('pointermove', handleMouseMove, { passive: true })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Gentle reaction to mouse
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130) {
          p.x -= (dx / dist) * 0.5
          p.y -= (dy / dist) * 0.5
        }

        // Draw particle dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Connect nearby nodes with delicate lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const distX = p.x - p2.x
          const distY = p.y - p2.y
          const d = Math.sqrt(distX * distX + distY * distY)

          if (d < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 * (1 - d / 150)})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="neural-bg-layer">
      <canvas ref={canvasRef} className="neural-canvas" />
      <div className="mouse-spotlight"></div>
      <div className="bg-aurora-orb orb-1"></div>
      <div className="bg-aurora-orb orb-2"></div>
    </div>
  )
}

// Helper generator to synthesize SWOT analysis, pitch details, and moat ratings based on user's concept parameters
function generateStartupInsights(idea, industry, targetMarket) {
  let hash = 0;
  const combinedStr = (idea + industry + targetMarket).toLowerCase();
  for (let i = 0; i < combinedStr.length; i++) {
    hash = combinedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const score = 83 + (Math.abs(hash) % 13); // 83 to 96
  
  const demandScore = 80 + (Math.abs(hash >> 1) % 16);
  const competitionScore = 76 + (Math.abs(hash >> 2) % 18);
  const viabilityScore = 82 + (Math.abs(hash >> 3) % 14);
  
  const lowerIdea = idea.toLowerCase();
  
  let strengths = [
    `High domain specificity addressing unmet operational bottlenecks in ${targetMarket}.`,
    `Significant operating leverage inside the ${industry} ecosystem.`,
    `Direct customer utility replacing fragmented manual workflows.`
  ];
  
  let weaknesses = [
    `Initial market onboarding and change management for traditional ${targetMarket} users.`,
    `Customer acquisition overhead typical for emerging ${industry} solutions.`,
    `Requires continuous domain model updates to sustain accuracy advantages.`
  ];
  
  let opportunities = [
    `Vertical cross-expansion into adjacent sub-tiers within ${targetMarket}.`,
    `High-margin workflow integrations with existing enterprise systems in ${industry}.`,
    `Proprietary workflow flywheel creating sustained product defensibility.`
  ];
  
  let threats = [
    `Incumbent legacy suites attempting retroactive automation features.`,
    `Evolving compliance, security, or domain standards in ${industry}.`,
    `Organizational inertia favoring status-quo manual operations.`
  ];

  if (lowerIdea.includes('ai') || lowerIdea.includes('intelligence') || lowerIdea.includes('smart') || lowerIdea.includes('automated')) {
    strengths[2] = `Continuous data flywheel where domain usage continuously improves model precision.`;
    weaknesses[1] = `Inference overhead and infrastructure compute requirements at scale.`;
    opportunities[1] = `Proprietary specialized domain fine-tuning enabling enterprise tiering.`;
    threats[0] = `Broader foundation model capability expansions from hyperscalers.`;
  }

  const elevatorPitch = `For ${targetMarket} facing severe operational friction, our platform in ${industry} delivers an automated, domain-specialized solution that ${idea.replace(/\.$/, '')}. Unlike legacy alternatives, it delivers instant time-to-value with purpose-built vertical workflows.`;
  
  const idealCustomerProfile = {
    buyerPersona: `Forward-thinking operations leaders, department directors, and specialists in ${targetMarket}.`,
    primaryPainPoint: `Repetitive manual work, lack of analytical transparency, and scaling bottlenecks.`,
    keyTriggers: `Approaching capacity ceilings or facing competitive efficiency pressures.`
  };
  
  const goToMarket = [
    `Phase 1 (Validation): Launch targeted design partnership with 10-15 high-intent accounts in ${targetMarket}.`,
    `Phase 2 (Velocity): Deploy high-intent domain content and direct inbound funnels addressing ${industry} pain points.`,
    `Phase 3 (Expansion): Establish native ecosystem partnerships and expand to enterprise tiers.`
  ];

  const moatScores = [
    { pillar: "Data Flywheel & Feedback Loop", score: 88, desc: "Continuous user interaction continuously fine-tunes domain accuracy." },
    { pillar: "Workflow Embedding", score: 84, desc: "Deep operational integration drives high customer retention and switching costs." },
    { pillar: "Vertical Domain Precision", score: 92, desc: "Specialized context models outperform generalized foundation models." },
    { pillar: "GTM Distribution Velocity", score: 79, desc: "Targeted inbound loops convert high-intent niche buyers faster than horizontal suites." },
    { pillar: "Hyperscaler Defensibility", score: 85, desc: "Proprietary UI/workflow primitives shield venture from commoditized LLM updates." }
  ];

  return {
    score,
    subScores: {
      demand: demandScore,
      competition: competitionScore,
      viability: viabilityScore
    },
    swot: { strengths, weaknesses, opportunities, threats },
    pitch: { elevatorPitch, idealCustomerProfile, goToMarket },
    moats: moatScores
  };
}

// Clean Web Source Snippet Formatter (Limits descriptions strictly to 1-2 clean lines)
function formatWebSnippet(rawContent) {
  if (!rawContent) return "Verified market intelligence record indexed for domain valuation.";
  
  // Clean markdown tables, pipes, bracket citations, and multiple spaces
  let cleaned = rawContent
    .replace(/\|[^\n|]+\|/g, '') // remove markdown table lines
    .replace(/---/g, '')
    .replace(/\[\.\.\.\]/g, '')
    .replace(/\[.*?\]/g, '') // remove brackets
    .replace(/#+/g, '') // remove hashes
    .replace(/✓|★|~|✗/g, '') // remove random symbols
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .trim();

  // Split into sentences and pick first 1-2 clean sentences (max 135 characters)
  const sentences = cleaned.split(/(?<=[.?!])\s+/);
  if (sentences.length > 0 && sentences[0].length > 30) {
    let result = sentences[0];
    if (result.length < 75 && sentences[1]) {
      result += ' ' + sentences[1];
    }
    if (result.length > 135) {
      result = result.slice(0, 132) + '...';
    }
    return result;
  }

  if (cleaned.length > 135) {
    return cleaned.slice(0, 132) + '...';
  }
  return cleaned || "Verified market intelligence record indexed for domain valuation.";
}

// Rich Structured Formatter for Venture AI Copilot Chat Messages
function renderCopilotMessage(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="copilot-formatted-body">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="copilot-line-gap" />;
        
        // Structured numbered items (e.g. 1. **Title:** Desc)
        if (/^\d+\./.test(trimmed)) {
          const parts = trimmed.split('**');
          if (parts.length >= 3) {
            const num = parts[0].replace('**', '').trim();
            return (
              <div key={idx} className="copilot-numbered-item">
                <span className="copilot-num-badge">{num}</span>
                <div className="copilot-item-text">
                  <strong className="copilot-item-bold">{parts[1]}</strong>
                  <span>{parts.slice(2).join('')}</span>
                </div>
              </div>
            );
          }
          return (
            <div key={idx} className="copilot-numbered-item">
              <span className="copilot-num-badge">•</span>
              <div className="copilot-item-text">{trimmed}</div>
            </div>
          );
        }

        // Bullet points
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          return (
            <div key={idx} className="copilot-bullet-item">
              <span className="copilot-bullet-arrow">▸</span>
              <span>{trimmed.replace(/^[-•]\s*/, '')}</span>
            </div>
          );
        }

        return <p key={idx} className="copilot-paragraph">{trimmed}</p>;
      })}
    </div>
  );
}

// Real-time Concept Clarity & Readiness Evaluator
function computeIdeaClarity(idea, ind, target) {
  const cleanIdea = (idea || '').trim();
  const cleanInd = (ind || '').trim();
  const cleanTarget = (target || '').trim();

  // If nothing is entered
  if (!cleanIdea && !cleanInd && !cleanTarget) {
    return {
      score: 0,
      label: 'Awaiting Concept',
      textColor: '#94a3b8',
      badgeBg: '#64748b',
      gradient: 'linear-gradient(90deg, #64748b, #94a3b8)',
      suggestions: ['Type your startup concept or click a blueprint template above']
    };
  }

  let score = 0;
  const suggestions = [];
  const words = cleanIdea ? cleanIdea.split(/\s+/).filter(Boolean).length : 0;

  // 1. Idea depth evaluation (max 45 pts)
  if (words >= 1 && words <= 3) {
    score += 10;
    suggestions.push('Add more detail on what core problem your product solves');
  } else if (words >= 4 && words <= 8) {
    score += 22;
    suggestions.push('Include specific features or how your solution works');
  } else if (words >= 9 && words <= 16) {
    score += 35;
  } else if (words >= 17) {
    score += 45;
  } else {
    suggestions.push('Describe your startup concept and value proposition');
  }

  // 2. Industry specification (max 25 pts)
  if (cleanInd.length >= 3) {
    score += 25;
  } else {
    suggestions.push('Specify target industry vertical below');
  }

  // 3. Target customer audience (max 25 pts)
  if (cleanTarget.length >= 3) {
    score += 25;
  } else {
    suggestions.push('Define your target customer audience');
  }

  // 4. Domain & Value Proposition keywords (max 5 pts)
  const keywords = ['ai', 'platform', 'app', 'b2b', 'saas', 'workflow', 'instant', 'automation', 'real-time', 'cloud', 'security', 'logistics', 'health', 'marketplace', 'telehealth', 'triage', 'energy', 'smart', 'copilot', 'api', 'analytics'];
  const hasKw = keywords.some(k => cleanIdea.toLowerCase().includes(k));
  if (hasKw && words >= 5) {
    score += 5;
  }

  score = Math.min(Math.max(score, cleanIdea.length > 0 ? 10 : 0), 100);

  if (score < 35) {
    return {
      score,
      label: 'Early Idea',
      textColor: '#f43f5e',
      badgeBg: '#f43f5e',
      gradient: 'linear-gradient(90deg, #f43f5e, #fb7185)',
      suggestions: suggestions.length > 0 ? suggestions : ['Elaborate on customer pain points']
    };
  } else if (score < 65) {
    return {
      score,
      label: 'Draft Concept',
      textColor: '#f59e0b',
      badgeBg: '#f59e0b',
      gradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
      suggestions: suggestions.length > 0 ? suggestions : ['Add more technical specificity or workflow details']
    };
  } else if (score < 85) {
    return {
      score,
      label: 'Viable Venture',
      textColor: '#0284c7',
      badgeBg: '#0284c7',
      gradient: 'linear-gradient(90deg, #0284c7, #38bdf8)',
      suggestions: suggestions.length > 0 ? suggestions : ['Strong domain draft. Ready for competitor & TAM sizing!']
    };
  } else {
    return {
      score,
      label: 'High-Clarity Venture',
      textColor: '#10b981',
      badgeBg: '#10b981',
      gradient: 'linear-gradient(90deg, #10b981, #34d399)',
      suggestions: ['Optimal detail level. Ready for autonomous 3-agent intelligence run!']
    };
  }
}

// Multi-Agent System Architecture Metadata for Interactive HUD (Milestones 1, 2 & 3)
const HUD_AGENTS_METADATA = [
  {
    id: "wsa",
    num: "01",
    name: "Web Search Agent",
    role: "Real-Time Market Scraping & Competitor Indexing",
    tagline: "Crawls live web indices for active competitors, pricing models, and target market records.",
    engine: "Tavily Search Index API + Heuristic Web Fallback",
    latency: "~0.3s – 1.0s",
    model: "Tavily Search Engine / Domain Scraper",
    inputs: ["Startup Idea", "Industry Vertical", "Target Customer Group"],
    outputs: [
      "Direct & indirect competitor URLs",
      "Customer complaint snippets & sentiment",
      "Live pricing tiers & feature offerings",
      "Current industry search depth records"
    ],
    accentColor: "#06b6d4"
  },
  {
    id: "moa",
    num: "02",
    name: "Market Opportunity Agent",
    role: "TAM/SAM/SOM Sizing & Customer Segmentation",
    tagline: "Synthesizes market sizing boundaries, CAGR projection trajectories, and buyer vs user personas.",
    engine: "Google Gemini 1.5 Flash / Groq Llama-3 / Mathematical Sizing Model",
    latency: "~0.4s – 1.2s",
    model: "Gemini 1.5 Flash (REST)",
    inputs: ["Search Intelligence Snippets", "Target Market Context", "Domain Multipliers"],
    outputs: [
      "TAM ($B Total Addressable Market)",
      "SAM ($M Serviceable Addressable Market)",
      "SOM ($M Serviceable Obtainable Market)",
      "Decision-Maker vs End-User Archetypes",
      "Willingness-to-Pay & Procurement Triggers"
    ],
    accentColor: "#3b82f6"
  },
  {
    id: "cca",
    num: "03",
    name: "Competitor Discovery Agent",
    role: "Multi-Axis Benchmarking Matrix & Market White Spaces",
    tagline: "Builds a 2x2 competitive positioning matrix and isolates unserved market white-space opportunities.",
    engine: "Universal Strategic Synthesis Multi-LLM Engine",
    latency: "~0.4s – 1.2s",
    model: "Groq / Gemini / Heuristic Strategic Layer",
    inputs: ["Market Sizing Profile", "Direct Competitors Data", "Core Value Proposition"],
    outputs: [
      "Direct vs Indirect Player Breakdown",
      "5-Pillar Comparison Matrix (AI, Speed, Domain, Pricing, Real-Time)",
      "Critical Market Gaps & Unmet Demands",
      "Tactical Differentiation Playbook for Founders"
    ],
    accentColor: "#10b981"
  },
  {
    id: "sra",
    num: "04",
    name: "SWOT & Risk Analysis Agent",
    role: "Structured SWOT Matrix & Risk Mitigation Playbooks",
    tagline: "Generates internal strengths/weaknesses and external opportunities/threats with risk severity audits.",
    engine: "LLM Risk Reasoning & Heuristic Auditor",
    latency: "~0.4s – 1.0s",
    model: "Gemini / Groq Multi-LLM",
    inputs: ["Market Intelligence Dossier", "Competitor Gaps", "Target Demographics"],
    outputs: [
      "2x2 SWOT Strategic Breakdown",
      "Multi-Category Risk Assessment (Tech, Market, Legal, Financial)",
      "Quantitative Severity & Probability Scores",
      "Actionable Mitigation Strategies"
    ],
    accentColor: "#8b5cf6"
  },
  {
    id: "mvpa",
    num: "05",
    name: "MVP Feature Recommendation Agent",
    role: "MoSCoW Prioritization & Effort vs Impact Matrix",
    tagline: "Prioritizes core lean features based on market fit and resource constraints for 30/60-day sprints.",
    engine: "Product Management Strategy Engine",
    latency: "~0.3s – 0.9s",
    model: "Gemini / Heuristic Product Layer",
    inputs: ["Customer Pain Points", "Competitor White Spaces", "Resource Constraints"],
    outputs: [
      "Must-Have Core Loop Features",
      "Should-Have & Could-Have Enhancements",
      "Explicit V1 Scope Exclusions (Won't-Haves)",
      "Effort vs Impact (1-10) Matrix & Tech Stack"
    ],
    accentColor: "#f59e0b"
  },
  {
    id: "gtma",
    num: "06",
    name: "Go-To-Market Strategy Agent",
    role: "Positioning, Acquisition Channels & Launch Flywheel",
    tagline: "Formulates positioning statement, acquisition channel CAC dynamics, and First 100 Customers playbook.",
    engine: "Growth Strategy & Marketing Flywheel Engine",
    latency: "~0.3s – 1.0s",
    model: "Gemini / Groq Strategic Adapter",
    inputs: ["Market Segmentation", "Competitor Benchmarking", "Value Proposition"],
    outputs: [
      "Target Positioning Statement",
      "Customer Acquisition Channels with Estimated CAC",
      "First 100 Customers Tactical Playbook",
      "3-Phase Launch Roadmap & Pricing Tiers"
    ],
    accentColor: "#ec4899"
  },
  {
    id: "vra",
    num: "07",
    name: "Validation Report Generation Agent",
    role: "Executive Synthesis, Scorecards & Export Engine",
    tagline: "Synthesizes multi-agent outputs into publication-ready Markdown dossiers, JSON scorecards, and investor reports.",
    engine: "Executive Synthesis & Report Compiler Engine",
    latency: "~0.1s – 0.4s",
    model: "Multi-Agent Synthesis Engine",
    inputs: ["Market Dossier", "Competitor Matrix", "SWOT & Risk Assessment", "MVP Roadmap", "GTM Strategy"],
    outputs: [
      "Executive Investment Feasibility Scorecard",
      "Comprehensive Multi-Section Markdown Report",
      "Print-Ready PDF and JSON Dossier Exports"
    ],
    accentColor: "#14b8a6"
  },
  {
    id: "adva",
    num: "08",
    name: "Conversational Startup Advisor Agent",
    role: "Context-Aware Multi-turn Q&A Advisory Copilot",
    tagline: "Provides real-time interactive consultation on unit economics, GTM execution, and defensibility.",
    engine: "Multi-Turn Contextual Conversation Engine",
    latency: "~0.5s – 1.5s",
    model: "Conversational AI Advisor",
    inputs: ["Full Startup Dossier", "Conversation History", "Founder Question"],
    outputs: [
      "Tactical Strategic Answers",
      "Actionable Frameworks & Unit Economics",
      "Suggested Next Steps & Follow-Up Prompts"
    ],
    accentColor: "#6366f1"
  }
];

function App() {
  // Theme Switcher State (Dark / Light)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('venturepulse_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('venturepulse_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Interactive Architecture HUD Modal state
  const [activeHudAgent, setActiveHudAgent] = useState(null);

  // Input fields state
  const [startupIdea, setStartupIdea] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetMarket, setTargetMarket] = useState('')
  const [activePreset, setActivePreset] = useState(null)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL')
  
  // App status state
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  
  // Tab navigation states
  const [activeTab, setActiveTab] = useState('market') // 'market' | 'competitors' | 'strategy' | 'pitchdeck' | 'sources' | 'logs'
  const [pitchTab, setPitchTab] = useState('pitch')
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  // Financial Model Sensitivity Slider States
  const [targetCustomers, setTargetCustomers] = useState(25000)
  const [arpu, setArpu] = useState(600)
  const [penetrationRate, setPenetrationRate] = useState(1.5)

  // 7-Stage Pipeline Slider Ref & Handler
  const pipelineScrollRef = useRef(null)
  const slidePipeline = (direction) => {
    if (pipelineScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      pipelineScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  // Interactive UI Extras (Telemetry node drawer, hover states, toast)
  const [selectedAgentNode, setSelectedAgentNode] = useState(null)
  const [hoveredCompetitor, setHoveredCompetitor] = useState(null)
  const [selectedCompetitor, setSelectedCompetitor] = useState(null)
  const [activeQuadrantFilter, setActiveQuadrantFilter] = useState('all')
  const [showMatrixGuide, setShowMatrixGuide] = useState(false)
  const [moscowFilter, setMoscowFilter] = useState('all')
  const [toastMessage, setToastMessage] = useState(null)
  const [queryCopied, setQueryCopied] = useState(false)
  const [tabsAutoScroll, setTabsAutoScroll] = useState(true)
  const tabsStreamRef = useRef(null)

  // Interactive Venture AI Copilot States & Auto-Scroll Ref
  const [isCopilotOpen, setIsCopilotOpen] = useState(false)
  const [copilotMessages, setCopilotMessages] = useState([])
  const [copilotInput, setCopilotInput] = useState('')
  const [copilotThinking, setCopilotThinking] = useState(false)
  const copilotEndRef = useRef(null)

  // Auto-scroll Copilot message thread to latest message
  useEffect(() => {
    if (isCopilotOpen) {
      copilotEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [copilotMessages, copilotThinking, isCopilotOpen])

  // Validation History Vault (localStorage)
  const [isVaultOpen, setIsVaultOpen] = useState(false)
  const [historyVault, setHistoryVault] = useState(() => {
    try {
      const saved = localStorage.getItem('venture_vault')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Multi-Agent Pipeline loading steps (Milestones 1, 2 & 3)
  const loadingSteps = [
    {
      agent: "Web Intelligence Agent",
      desc: "Querying live market index & extracting competitor landscape records..."
    },
    {
      agent: "Market Sizing & Segmentation Agent",
      desc: "Computing TAM/SAM/SOM bounds, CAGR trends, and buyer personas..."
    },
    {
      agent: "Competitor Benchmarking Agent",
      desc: "Constructing multi-axis feature matrix & detecting market white-spaces..."
    },
    {
      agent: "SWOT & Risk Analysis Agent",
      desc: "Synthesizing structured SWOT matrix and multi-category risk mitigations..."
    },
    {
      agent: "MVP Feature Recommendation Agent",
      desc: "Prioritizing core Must-Have features with MoSCoW & Effort vs Impact scores..."
    },
    {
      agent: "Go-To-Market Strategy Agent",
      desc: "Formulating positioning statement, acquisition channels, and First 100 playbook..."
    }
  ]

  // Curated Enterprise Blueprint Cards — 8 In-Demand Startup Templates
  const samplePrompts = [
    {
      id: "healthtech",
      group: "HEALTH",
      category: "HealthTech",
      label: "AI Pet Tele-triage Platform",
      summary: "Photo-based symptom triage & clinic routing",
      idea: "An on-demand veterinary telehealth platform with instant AI triage and symptom detection from smartphone photos.",
      industry: "Pet Care & HealthTech",
      market: "Pet owners, veterinary clinics",
      iconComponent: Icons.Health,
      badgeColor: "#f43f5e",
      badgeBg: "rgba(244, 63, 94, 0.12)",
      borderColor: "rgba(244, 63, 94, 0.28)",
      glowColor: "rgba(244, 63, 94, 0.18)"
    },
    {
      id: "logistics",
      group: "MOBILITY",
      category: "Green Mobility",
      label: "Urban Cargo Bike Routing",
      summary: "AI micro-hub delivery routing in city zones",
      idea: "An AI-powered route planning app for electric cargo bike deliveries in dense urban areas.",
      industry: "Green Logistics & Mobility",
      market: "Local e-commerce shops, urban couriers",
      iconComponent: Icons.Mobility,
      badgeColor: "#10b981",
      badgeBg: "rgba(16, 185, 129, 0.12)",
      borderColor: "rgba(16, 185, 129, 0.28)",
      glowColor: "rgba(16, 185, 129, 0.18)"
    },
    {
      id: "edtech",
      group: "SAAS",
      category: "EdTech",
      label: "Adaptive Exam AI Copilot",
      summary: "Active recall & automated quiz synthesis",
      idea: "An intelligent learning copilot that converts college lectures and PDF textbooks into interactive flashcards, quizzes, and mock tests.",
      industry: "EdTech & Higher Education",
      market: "University students, certification exam candidates",
      iconComponent: Icons.Education,
      badgeColor: "#6366f1",
      badgeBg: "rgba(99, 102, 241, 0.12)",
      borderColor: "rgba(99, 102, 241, 0.28)",
      glowColor: "rgba(99, 102, 241, 0.18)"
    },
    {
      id: "foodtech",
      group: "HEALTH",
      category: "FoodTech",
      label: "Smart Household Nutrition",
      summary: "AI pantry vision to minimize waste & macros",
      idea: "A personalized AI meal planner that scans household groceries to minimize food waste and optimize nutrition.",
      industry: "FoodTech & Health",
      market: "Busy professionals, fitness enthusiasts",
      iconComponent: Icons.Food,
      badgeColor: "#f59e0b",
      badgeBg: "rgba(245, 158, 11, 0.12)",
      borderColor: "rgba(245, 158, 11, 0.28)",
      glowColor: "rgba(245, 158, 11, 0.18)"
    },
    {
      id: "fintech",
      group: "FINTECH",
      category: "FinTech",
      label: "Automated SMB Cash Flow",
      summary: "AI invoice factoring & cash forecasting",
      idea: "An automated cash flow intelligence and instant invoice factoring platform tailored for SMB contractors.",
      industry: "FinTech & SMB Banking",
      market: "Small business owners, general contractors, freelancers",
      iconComponent: Icons.FinTech,
      badgeColor: "#06b6d4",
      badgeBg: "rgba(6, 182, 212, 0.12)",
      borderColor: "rgba(6, 182, 212, 0.28)",
      glowColor: "rgba(6, 182, 212, 0.18)"
    },
    {
      id: "legaltech",
      group: "SAAS",
      category: "B2B SaaS",
      label: "AI Contract Risk Redliner",
      summary: "Automated liability check & redlining",
      idea: "An AI legal assistant that scans vendor contracts and SaaS agreements to automatically flag non-standard liability clauses.",
      industry: "LegalTech & Enterprise SaaS",
      market: "Startup founders, procurement teams, in-house counsel",
      iconComponent: Icons.Legal,
      badgeColor: "#a855f7",
      badgeBg: "rgba(168, 85, 247, 0.12)",
      borderColor: "rgba(168, 85, 247, 0.28)",
      glowColor: "rgba(168, 85, 247, 0.18)"
    },
    {
      id: "cybersecurity",
      group: "SAAS",
      category: "CyberSecurity",
      label: "Autonomous API Guardian",
      summary: "Real-time vulnerability & endpoint patch AI",
      idea: "An autonomous developer agent that continuously audits API endpoints for authorization leaks and auto-generates security patches.",
      industry: "CyberSecurity & DevTools",
      market: "Backend engineers, security teams, engineering leads",
      iconComponent: Icons.Security,
      badgeColor: "#ef4444",
      badgeBg: "rgba(239, 68, 68, 0.12)",
      borderColor: "rgba(239, 68, 68, 0.28)",
      glowColor: "rgba(239, 68, 68, 0.18)"
    },
    {
      id: "climatetech",
      group: "MOBILITY",
      category: "ClimateTech",
      label: "Commercial Microgrid Arbitrage",
      summary: "Smart battery storage & peak-load shaving",
      idea: "An intelligent energy management software that optimizes commercial battery storage to arbitrage peak-hour electricity tariffs.",
      industry: "Clean Energy & ClimateTech",
      market: "Commercial real estate managers, warehouse operators",
      iconComponent: Icons.Climate,
      badgeColor: "#14b8a6",
      badgeBg: "rgba(20, 184, 166, 0.12)",
      borderColor: "rgba(20, 184, 166, 0.28)",
      glowColor: "rgba(20, 184, 166, 0.18)"
    }
  ]

  const categories = [
    { key: "ALL", label: "All Templates" },
    { key: "HEALTH", label: "Health & Food" },
    { key: "SAAS", label: "AI SaaS & Dev" },
    { key: "FINTECH", label: "FinTech" },
    { key: "MOBILITY", label: "Mobility & Climate" }
  ]

  const filteredPrompts = activeCategoryFilter === "ALL" 
    ? samplePrompts 
    : samplePrompts.filter(p => p.group === activeCategoryFilter)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Live idea clarity evaluation
  const clarity = computeIdeaClarity(startupIdea, industry, targetMarket)

  // 1-Click Surprise Venture Generator
  const handleRandomizeVenture = () => {
    const randomPool = [
      ...samplePrompts,
      {
        id: "robotics",
        group: "SAAS",
        category: "Robotics & AI",
        label: "Autonomous Micro-Fulfillment",
        summary: "15-minute grocery fulfillment robotics fleet",
        idea: "Autonomous micro-fulfillment mobile robots and fleet orchestration software for instant 15-minute grocery deliveries in dense urban centers.",
        industry: "Logistics & Robotics",
        market: "Dark store operators, regional grocery chains"
      },
      {
        id: "agritech",
        group: "HEALTH",
        category: "AgriTech & AI",
        label: "Precision Drone Crop Defense",
        summary: "Multispectral fungal blight detection",
        idea: "Autonomous drone fleet analyzing crop multispectral imagery to detect early fungal blight and optimize variable-rate fertilizer spraying.",
        industry: "AgriTech & Smart Farming",
        market: "Commercial farm managers, agricultural cooperatives"
      },
      {
        id: "biotech",
        group: "HEALTH",
        category: "BioTech",
        label: "AI Protein Binding Predictor",
        summary: "Accelerated small-molecule drug candidate screening",
        idea: "A generative AI platform predicting small-molecule binding affinities to target oncological proteins, accelerating preclinical lead discovery.",
        industry: "BioTech & Life Sciences",
        market: "Biopharma research labs, medicinal chemists"
      },
      {
        id: "quantum",
        group: "FINTECH",
        category: "FinTech & AI",
        label: "Real-Time FX Liquidity Engine",
        summary: "Cross-border settlement optimization",
        idea: "A real-time FX settlement engine using stablecoin liquidity pools to reduce B2B cross-border payment fees and settlement times to seconds.",
        industry: "FinTech & Web3 Payments",
        market: "Global exporters, import-export merchants"
      }
    ]

    const available = randomPool.filter(p => p.idea !== startupIdea)
    const picked = available[Math.floor(Math.random() * available.length)] || randomPool[0]

    setStartupIdea(picked.idea)
    setIndustry(picked.industry)
    setTargetMarket(picked.market)
    setActivePreset(picked.id || 'custom')
    setError(null)
    showToast(`🎲 Loaded: ${picked.label || picked.category} template!`)
  }

  // Automatically scroll to top when validation runs or results load
  useEffect(() => {
    if (searchResult || loading) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [searchResult, loading])

  const handleApplyPreset = (preset) => {
    setStartupIdea(preset.idea)
    setIndustry(preset.industry)
    setTargetMarket(preset.market)
    setActivePreset(preset.id)
    setError(null)
  }

  const handleClearForm = () => {
    setStartupIdea('')
    setIndustry('')
    setTargetMarket('')
    setActivePreset(null)
    setError(null)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    
    // Reset previous states & scroll to top
    setError(null)
    setSearchResult(null)
    setLoading(true)
    setCurrentStep(0)
    setActiveTab('market')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Basic Validation
    if (!startupIdea.trim() || !industry.trim() || !targetMarket.trim()) {
      setError("Please fill out all required fields.")
      setLoading(false)
      return
    }

    // Step cycle interval for pipeline feedback
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 1400)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startup_idea: startupIdea,
          industry: industry,
          target_market: targetMarket,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Server returned status ${response.status}`)
      }

      const data = await response.json()
      setSearchResult(data)

      // Save to History Vault
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        startupIdea: data.startup_idea,
        industry: data.industry,
        targetMarket: data.target_market,
        score: 86 + (data.startup_idea.length % 9),
        data: data
      }
      const updatedVault = [newEntry, ...historyVault.slice(0, 9)]
      setHistoryVault(updatedVault)
      try {
        localStorage.setItem('venture_vault', JSON.stringify(updatedVault))
      } catch (err) {
        console.warn("Vault local storage save error:", err)
      }

      // Initialize Copilot Starter Greeting
      setCopilotMessages([
        { 
          role: 'assistant', 
          text: `Hello! I'm your Venture Intelligence Copilot. I have loaded the live market validation for "${data.startup_idea}". How can I assist with your pricing, GTM, or investor pitch strategy?` 
        }
      ])

      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error("Validation failed:", err)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      setError(err.message || `An unexpected error occurred while communicating with the backend. Make sure your API server is running at ${apiUrl}.`)
    } finally {
      clearInterval(stepInterval)
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSearchResult(null)
    setError(null)
    setActivePreset(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTabChange = (tabName) => {
    setActiveTab(tabName)
    const tabsElement = document.querySelector('.agent-tabs-nav')
    if (tabsElement) {
      tabsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleLoadFromVault = (vaultEntry) => {
    setStartupIdea(vaultEntry.startupIdea)
    setIndustry(vaultEntry.industry)
    setTargetMarket(vaultEntry.targetMarket)
    setSearchResult(vaultEntry.data)
    setIsVaultOpen(false)
    showToast(`Loaded "${vaultEntry.startupIdea.slice(0, 32)}..." from Vault!`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteVaultItem = (id, e) => {
    if (e) e.stopPropagation()
    const updated = historyVault.filter(entry => entry.id !== id)
    setHistoryVault(updated)
    try {
      localStorage.setItem('venturepulse_history', JSON.stringify(updated))
    } catch (err) {
      console.error("Failed to update localStorage", err)
    }
    showToast("Report removed from Vault.")
  }

  const handleClearAllVault = (e) => {
    if (e) e.stopPropagation()
    setHistoryVault([])
    try {
      localStorage.removeItem('venturepulse_history')
    } catch (err) {
      console.error("Failed to clear localStorage", err)
    }
    showToast("All Vault history cleared.")
  }

  // Copilot Intelligent Answering with Backend Advisor Agent Integration
  const handleSendCopilotMessage = async (questionText) => {
    const q = questionText || copilotInput
    if (!q.trim()) return

    const userMsg = { role: 'user', text: q, content: q }
    const newMsgs = [...copilotMessages, userMsg]
    setCopilotMessages(newMsgs)
    setCopilotInput('')
    setCopilotThinking(true)

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

    try {
      const response = await fetch(`${apiUrl}/advisor/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: q,
          history: copilotMessages.map(m => ({ role: m.role, content: m.text || m.content })),
          validation_context: searchResult || {
            startup_idea: startupIdea,
            industry: industry,
            target_market: targetMarket
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        setCopilotMessages([...newMsgs, { role: 'assistant', text: data.reply, suggestions: data.suggested_follow_ups }])
        setCopilotThinking(false)
        return
      }
    } catch (err) {
      console.warn("Backend advisor chat fallback applied:", err)
    }

    // Fallback response generator if offline
    setTimeout(() => {
      let ans = ''
      const lowerQ = q.toLowerCase()
      const currentIdea = searchResult?.startup_idea || startupIdea
      const currentInd = searchResult?.industry || industry
      const currentTgt = searchResult?.target_market || targetMarket

      if (lowerQ.includes('price') || lowerQ.includes('pricing') || lowerQ.includes('cost') || lowerQ.includes('monetiz')) {
        ans = `For ${currentIdea ? `"${currentIdea}"` : 'your concept'} in ${currentInd}, a three-tier pricing model is recommended:\n\n1. **Starter / Pilot Tier ($29/mo):** Low-friction entry point for early adopters in ${currentTgt}.\n2. **Professional Tier ($99/mo):** Automated workflows, advanced analytics, and priority integrations.\n3. **Enterprise Custom ($499+/mo):** Custom domain fine-tuning, SLA, and dedicated onboarding.`
      } else if (lowerQ.includes('gtm') || lowerQ.includes('user') || lowerQ.includes('customer') || lowerQ.includes('acquire')) {
        ans = `To acquire the first 50-100 high-intent customers in ${currentInd}:\n\n1. **Targeted Design Partnerships:** Direct founder outreach to 15 key operations leaders in ${currentTgt} offering 3 months free in exchange for case studies.\n2. **High-Intent SEO & Calculators:** Publish interactive domain utility calculators capturing search demand.\n3. **Vertical Ecosystem Integration:** Partner with standard suites already embedded in ${currentInd}.`
      } else if (lowerQ.includes('google') || lowerQ.includes('openai') || lowerQ.includes('compet') || lowerQ.includes('moat') || lowerQ.includes('big tech')) {
        ans = `Your core defensibility against foundation model updates is **Domain-Specific Workflow Embedding**:\n\n- General foundation models lack the deep vertical UI and schema integration needed for ${currentTgt}.\n- Proprietary data loops fine-tune domain accuracy beyond generic LLMs.\n- High switching costs once user operational history is stored in your platform.`
      } else {
        ans = `Based on our multi-agent market validation for ${currentInd}:\n\n- **Primary Advantage:** Instant automated resolution for ${currentTgt}.\n- **Key Metric to Track:** Time-to-value (TTV) under 5 minutes.\n- **Recommended Next Step:** Launch the Must-Have MVP with 10 beta pilot users to validate willingness-to-pay.`
      }

      setCopilotMessages([...newMsgs, { role: 'assistant', text: ans }])
      setCopilotThinking(false)
    }, 400)
  }

  const insights = searchResult
    ? generateStartupInsights(searchResult.startup_idea, searchResult.industry, searchResult.target_market)
    : null;

  const marketData = searchResult?.market_analysis;
  const competitorData = searchResult?.competitor_analysis;
  const swotData = searchResult?.swot_analysis;
  const mvpData = searchResult?.mvp_roadmap;
  const gtmData = searchResult?.gtm_strategy;
  const pipelineMeta = searchResult?.pipeline_metadata;

  // Copy Executive Investment Memo to Clipboard
  const handleCopyInvestmentMemo = () => {
    if (!searchResult) return;
    const memo = `# VENTURE INVESTMENT MEMORANDUM & VALIDATION DOSSIER
**Concept:** ${searchResult.startup_idea}
**Vertical:** ${searchResult.industry} | **Target Audience:** ${searchResult.target_market}
**Feasibility Rating:** ${insights?.score || 88}% | **Pipeline Version:** ${pipelineMeta?.pipeline_version || '3.0.0'}

---

## 1. Executive Summary
${searchResult.answer || marketData?.market_summary}

## 2. Market Sizing & Financial Bounds
- **TAM (Total Addressable Market):** ${marketData?.market_size_and_growth?.tam_estimate || '$12.4B'}
- **SAM (Serviceable Addressable Market):** ${marketData?.market_size_and_growth?.sam_estimate || '$3.2B'}
- **SOM (Beachhead Capture):** ${marketData?.market_size_and_growth?.som_estimate || '$240M'}
- **CAGR Growth Rate:** ${marketData?.market_size_and_growth?.cagr_growth_rate || '18.4%'}

## 3. Competitive Landscape & Market White Spaces
**Identified White Spaces:**
${competitorData?.market_gaps_and_white_space?.map(g => `- ${g}`).join('\n') || '- Unserved vertical automation niche.'}

**Strategic Differentiation Playbook:**
${competitorData?.differentiation_strategy?.map(s => `- ${s}`).join('\n') || '- Proprietary data flywheel.'}

## 4. SWOT & Strategic Risk Audit
**Key Strengths:**
${swotData?.swot?.strengths?.map(s => `- **${s.title}**: ${s.description}`).join('\n') || '- Vertical domain specialization.'}

**Key Risk Mitigations:**
${swotData?.risk_assessment?.map(r => `- **${r.category}**: ${r.mitigation_strategy}`).join('\n') || '- Targeted trial pilots.'}

## 5. MVP MoSCoW Prioritization
**Must-Have Core Loop Features:**
${mvpData?.moscow_matrix?.must_have?.map(f => `- **${f.feature_name}** (Effort: ${f.effort_score}/10, Impact: ${f.impact_score}/10): ${f.description}`).join('\n') || '- Core AI Workflow.'}

## 6. Go-To-Market & Acquisition Flywheel
**Positioning:** ${gtmData?.positioning_statement?.our_solution_is || 'Autonomous vertical platform'}
**Primary Channel:** ${gtmData?.acquisition_channels?.[0]?.channel_name || 'Targeted Outbound'} (Est. CAC: ${gtmData?.acquisition_channels?.[0]?.estimated_cac || '$25'})

Generated autonomously by VenturePulse Multi-Agent Intelligence Engine.`;

    navigator.clipboard.writeText(memo);
    showToast("Investment Memo copied to clipboard in Markdown format!");
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleDownloadMarkdownReport = () => {
    if (!searchResult) return;
    const rep = searchResult.validation_report?.markdown_report || searchResult.executive_report?.markdown_report;
    let mdContent = rep;
    if (!mdContent) {
      mdContent = `# VenturePulse Executive Validation Dossier: ${searchResult.startup_idea}
**Industry:** ${searchResult.industry} | **Target Audience:** ${searchResult.target_market}
**Generated:** ${new Date().toLocaleDateString()}

## Executive Feasibility Scorecard
- Overall Feasibility: 88%
- Total Addressable Market (TAM): ${marketData?.market_size_and_growth?.tam_estimate || '$12B+'}
- CAGR Growth Rate: ${marketData?.market_size_and_growth?.cagr_growth_rate || '18%'}

## Market Analysis
${searchResult.answer || marketData?.market_summary || 'Validated market opportunity.'}

Generated autonomously by VenturePulse Multi-Agent Intelligence Engine (v4.0.0).`;
    }
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (searchResult.startup_idea || 'startup').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 24).toLowerCase();
    link.href = url;
    link.download = `venturepulse_${safeName}_validation_report.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Downloaded Executive Validation Report (.md)!");
  };

  const handleDownloadJsonDossier = () => {
    if (!searchResult) return;
    const jsonStr = JSON.stringify(searchResult, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (searchResult.startup_idea || 'startup').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 24).toLowerCase();
    link.href = url;
    link.download = `venturepulse_${safeName}_validation_dossier.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Downloaded Complete JSON Dossier (.json)!");
  };

  // Sensitivity Calculator Math
  const payingCustomersCount = Math.round(targetCustomers * (penetrationRate / 100));
  const rawYear1ARR = (targetCustomers * (penetrationRate / 100)) * arpu;
  const projectedMRR = (rawYear1ARR / 12).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const calculatedTAM = (targetCustomers * arpu * 10).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const calculatedSAM = (targetCustomers * arpu).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const projectedYear1ARR = rawYear1ARR.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const projectedYear3ARR = (rawYear1ARR * 3.8).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  // 2x2 Quadrant Competitors Array
  const quadrantPresets = [
    { quadId: 'legacy', quadName: 'Vertical Legacy Suites', x: 74, y: 70 },
    { quadId: 'incumbents', quadName: 'Generic Incumbents', x: 28, y: 74 },
    { quadId: 'automation', quadName: 'Autonomous Automation', x: 28, y: 28 },
    { quadId: 'frontier', quadName: 'Frontier Contender', x: 62, y: 38 },
    { quadId: 'legacy', quadName: 'Vertical Legacy Suites', x: 84, y: 62 },
    { quadId: 'incumbents', quadName: 'Generic Incumbents', x: 42, y: 80 },
  ];

  const quadrantCompetitors = competitorData?.direct_competitors?.map((comp, idx) => {
    const preset = quadrantPresets[idx % quadrantPresets.length];
    return {
      id: `comp-${idx}`,
      name: comp.name,
      quadId: preset.quadId,
      quadName: preset.quadName,
      x: preset.x,
      y: preset.y,
      targetCustomer: comp.target_customer,
      offering: comp.core_offering,
      strengths: comp.strengths,
      weaknesses: comp.weaknesses_and_complaints,
      pricing: comp.pricing_model
    };
  }) || [
    { id: 'comp-0', name: "Incumbent Suite A", quadId: 'legacy', quadName: 'Vertical Legacy Suites', x: 74, y: 70, strengths: "Broad legacy footprint", weaknesses: "Clunky UI & slow support", pricing: "$49/mo" },
    { id: 'comp-1', name: "Generic Tool B", quadId: 'incumbents', quadName: 'Generic Incumbents', x: 28, y: 74, strengths: "Low pricing tier", weaknesses: "Lacks specialized automation", pricing: "Freemium" }
  ];

  // 6-Slide Pitch Deck Generator Array
  const pitchSlides = searchResult ? [
    {
      slideNumber: "01",
      tag: "THE BURNING PROBLEM",
      title: `Operational Friction in ${searchResult.industry}`,
      points: [
        `Target customers in ${searchResult.target_market} face severe repetitive bottlenecks with manual tools.`,
        `Legacy incumbent suites are fragmented, complex, and lack AI automation.`,
        `High operational costs create an urgent demand for specialized solutions.`
      ]
    },
    {
      slideNumber: "02",
      tag: "THE SOLUTION & AI ENGINE",
      title: `Autonomous Vertical Copilot for ${searchResult.target_market}`,
      points: [
        `"${searchResult.startup_idea}" delivers purpose-built domain intelligence.`,
        `Continuous feedback loop fine-tunes specialized domain models with active usage.`,
        `Instant time-to-value with frictionless integration into existing workflows.`
      ]
    },
    {
      slideNumber: "03",
      tag: "MARKET OPPORTUNITY",
      title: `Addressable Market Sizing: ${marketData?.market_size_and_growth?.tam_estimate || '$14.2B'} TAM`,
      points: [
        `TAM (Total Global Market): ${marketData?.market_size_and_growth?.tam_estimate || '$14.2B'}`,
        `SAM (Serviceable Addressable): ${marketData?.market_size_and_growth?.sam_estimate || '$3.8B'}`,
        `SOM (Year-1 Beachhead Target): ${marketData?.market_size_and_growth?.som_estimate || '$280M'} growing at ${marketData?.market_size_and_growth?.cagr_growth_rate || '18.4%'} CAGR.`
      ]
    },
    {
      slideNumber: "04",
      tag: "COMPETITIVE POSITIONING",
      title: `Frontier Disrupter Exploiting Unserved Gaps`,
      points: [
        `Incumbents are generic, expensive, and slow to ship autonomous features.`,
        `Identified Market White Space: ${competitorData?.market_gaps_and_white_space?.[0] || 'Unserved specialized workflow automation tier'}.`,
        `Strategic Moat: Proprietary workflow embedding and high switching costs.`
      ]
    },
    {
      slideNumber: "05",
      tag: "BUSINESS MODEL & MONETIZATION",
      title: `High-Margin SaaS Recurring Revenue Engine`,
      points: [
        `Tiered Subscription Model ($49 to $1,200+/month based on seats & volume).`,
        `80%+ projected software gross margins with optimized compute inference.`,
        `Clear expansion vectors into adjacent enterprise verticals in ${searchResult.industry}.`
      ]
    },
    {
      slideNumber: "06",
      tag: "GO-TO-MARKET VELOCITY",
      title: `12-Month Execution Roadmap to $1M+ ARR`,
      points: [
        `Phase 1 (Months 1-3): 15 design partnership pilot accounts in ${searchResult.target_market}.`,
        `Phase 2 (Months 4-8): Inbound acquisition engine & high-intent organic funnels.`,
        `Phase 3 (Months 9-12): Launch enterprise tier with custom security & SLA agreements.`
      ]
    }
  ] : [];

  const handleCopyPitchDeck = () => {
    if (!pitchSlides.length) return
    const text = pitchSlides.map(s => `[SLIDE ${s.slideNumber}: ${s.tag}]\n# ${s.title}\n${s.points.map(p => `- ${p}`).join('\n')}\n`).join('\n---\n\n')
    navigator.clipboard.writeText(text)
    showToast("Pitch Deck 6-Slide content copied to clipboard!")
  }

  return (
    <div className="app-container">
      {/* Interactive Neural Constellation & Mouse Spotlight Aurora */}
      <NeuralBackground />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification animate-fade-in">
          <Icons.Check />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Slide-out Validation Vault Drawer */}
      {isVaultOpen && (
        <div className="vault-overlay animate-fade-in" onClick={() => setIsVaultOpen(false)}>
          <div className="vault-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="vault-header">
              <div className="vault-title-group">
                <Icons.History />
                <h3>Saved Validation Vault ({historyVault.length})</h3>
              </div>
              <button type="button" onClick={() => setIsVaultOpen(false)} className="drawer-close-btn">✕</button>
            </div>
            <p className="vault-subtext">Reload any previously analyzed startup report with zero latency:</p>
            
            <div className="vault-list">
              {historyVault.length === 0 ? (
                <div className="vault-empty">No reports saved yet. Run your first validation to store it here!</div>
              ) : (
                historyVault.map((entry) => (
                  <div key={entry.id} className="vault-item" onClick={() => handleLoadFromVault(entry)}>
                    <div className="vault-item-top">
                      <div className="vault-tags-row">
                        <span className="vault-ind-tag">{entry.industry}</span>
                        <span className="vault-score-tag">{entry.score}% Feasibility</span>
                      </div>
                      <button
                        type="button"
                        className="vault-delete-btn"
                        onClick={(e) => handleDeleteVaultItem(entry.id, e)}
                        title="Delete this report from Vault"
                        aria-label="Delete report"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                    <h4 className="vault-item-title">"{entry.startupIdea}"</h4>
                    <span className="vault-date">{entry.date}</span>
                  </div>
                ))
              )}
            </div>

            {historyVault.length > 0 && (
              <div className="vault-footer">
                <button
                  type="button"
                  className="vault-clear-all-btn"
                  onClick={handleClearAllVault}
                  title="Clear all saved reports"
                >
                  <Icons.Trash />
                  <span>Clear All History</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Multi-Agent Architecture HUD Modal */}
      {activeHudAgent && (
        <div className="vault-overlay animate-fade-in" onClick={() => setActiveHudAgent(null)}>
          <div className="hud-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
            {/* Top Modal Header */}
            <div className="hud-top-bar">
              <div className="hud-title-badge">
                <span className="pulse-dot"></span>
                <span>Multi-Agent System Architecture HUD</span>
              </div>
              <button type="button" onClick={() => setActiveHudAgent(null)} className="drawer-close-btn" aria-label="Close Inspector">✕</button>
            </div>

            {/* 3-Agent Quick Switcher Tabs */}
            <div className="hud-agent-selector-tabs">
              {HUD_AGENTS_METADATA.map((agent) => {
                const isSelected = activeHudAgent.id === agent.id;
                return (
                  <button
                    key={agent.id}
                    type="button"
                    className={`hud-selector-tab ${isSelected ? 'active' : ''}`}
                    style={{
                      borderColor: isSelected ? agent.accentColor : undefined,
                    }}
                    onClick={() => setActiveHudAgent(agent)}
                  >
                    <span 
                      className="tab-agent-num-dot" 
                      style={{ backgroundColor: agent.accentColor }}
                    />
                    <div className="tab-agent-text">
                      <span className="tab-agent-sub">AGENT {agent.num}</span>
                      <span className="tab-agent-name">{agent.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="hud-modal-header" style={{ borderLeftColor: activeHudAgent.accentColor }}>
              <div className="hud-modal-title-group">
                <span className="hud-agent-num-badge" style={{ backgroundColor: activeHudAgent.accentColor }}>
                  AGENT {activeHudAgent.num}
                </span>
                <div>
                  <h3 className="hud-agent-name">{activeHudAgent.name}</h3>
                  <span className="hud-agent-role">{activeHudAgent.role}</span>
                </div>
              </div>
            </div>

            <p className="hud-agent-tagline">{activeHudAgent.tagline}</p>

            <div className="hud-specs-grid">
              <div className="hud-spec-box">
                <span className="spec-label">Execution Engine</span>
                <strong className="spec-val">{activeHudAgent.engine}</strong>
              </div>
              <div className="hud-spec-box">
                <span className="spec-label">Active Model / Protocol</span>
                <strong className="spec-val spec-accent">{activeHudAgent.model}</strong>
              </div>
              <div className="hud-spec-box">
                <span className="spec-label">Avg Execution Latency</span>
                <strong className="spec-val spec-success">{activeHudAgent.latency}</strong>
              </div>
              <div className="hud-spec-box">
                <span className="spec-label">Runtime Connection</span>
                <strong className="spec-val spec-success">🟢 Active & Connected</strong>
              </div>
            </div>

            <div className="hud-io-section">
              <div className="hud-io-col">
                <h4 className="hud-io-title">📥 Agent Ingest Parameters</h4>
                <ul className="hud-io-list">
                  {activeHudAgent.inputs.map((inp, idx) => (
                    <li key={idx}><Icons.Check /> <span>{inp}</span></li>
                  ))}
                </ul>
              </div>
              <div className="hud-io-col">
                <h4 className="hud-io-title">📤 Synthesized Intelligence Deliverables</h4>
                <ul className="hud-io-list">
                  {activeHudAgent.outputs.map((out, idx) => (
                    <li key={idx}><Icons.Sparkle /> <span>{out}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hud-modal-footer">
              <span className="hud-footer-note">⚡ Verified Multi-Agent Pipeline Architecture</span>
              <button type="button" className="cat-filter-btn" onClick={() => setActiveHudAgent(null)}>
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header & Navigation Section */}
      <header className="app-header">
        <div className="header-top-nav animate-fade-in">
          <div className="brand-badge">
            <span className="badge-dot"></span>
            <span className="brand-badge-name">VenturePulse</span>
            <span className="brand-badge-sub">8 AI Agents</span>
          </div>

          <div className="header-actions-cluster">
            {/* Surprise Me Demo Button */}
            <button
              type="button"
              className="nav-action-pill surprise-pill"
              onClick={handleRandomizeVenture}
              title="Generate a random innovative startup concept"
            >
              <Icons.Dice />
              <span className="nav-btn-text">Surprise</span>
            </button>

            {/* Architecture HUD Inspector */}
            <button
              type="button"
              className="nav-action-pill hud-pill"
              onClick={() => setActiveHudAgent(HUD_AGENTS_METADATA[0])}
              title="Inspect Multi-Agent Architecture Specs"
            >
              <Icons.Cpu />
              <span className="nav-btn-text">Agents HUD</span>
            </button>

            {/* Saved Vault Button */}
            {historyVault.length > 0 && (
              <button 
                type="button" 
                className="nav-action-pill vault-pill"
                onClick={() => setIsVaultOpen(true)}
                title="Open Saved Validation History"
              >
                <Icons.History />
                <span className="nav-btn-text">Vault ({historyVault.length})</span>
              </button>
            )}

            {/* Dark / Light Theme Toggle Button */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
              <span className="theme-btn-text">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
        
        {/* Home Screen Hero, Trust Metrics & 7-Stage Pipeline (Hidden on Results to prevent duplication) */}
        {!searchResult && !loading && (
          <>
            <h1 className="hero-title animate-fade-in">
              <span className="gradient-ai-badge">VenturePulse</span> Startup Validator & <span className="gradient-title-accent">Market Intelligence</span>
            </h1>
            
            <p className="subtitle animate-fade-in">
              Autonomous multi-agent system evaluating commercial viability, calculating TAM/SAM/SOM sizing bounds, benchmarking competitor matrices, prioritizing MVP roadmaps, and synthesizing investment dossiers in seconds.
            </p>

            {/* Live Trust Metrics Strip */}
            <div className="trust-metrics-strip animate-fade-in">
              <div className="trust-metric-item">
                <span className="trust-metric-val">8</span>
                <span className="trust-metric-lbl">Autonomous Agents</span>
              </div>
              <div className="trust-metric-sep">•</div>
              <div className="trust-metric-item">
                <span className="trust-metric-val">100%</span>
                <span className="trust-metric-lbl">Live Web Grounded</span>
              </div>
              <div className="trust-metric-sep">•</div>
              <div className="trust-metric-item">
                <span className="trust-metric-val">&lt; 2.0s</span>
                <span className="trust-metric-lbl">Pipeline Latency</span>
              </div>
              <div className="trust-metric-sep">•</div>
              <div className="trust-metric-item">
                <span className="trust-metric-val">PDF / MD / JSON</span>
                <span className="trust-metric-lbl">1-Click Export</span>
              </div>
            </div>

            {/* Interactive 7-Stage Autonomous Pipeline Stepper / DAG Ribbon */}
            <div className="pipeline-stepper-section animate-fade-in">
              <div className="pipeline-stepper-header">
                <div className="stepper-title-group">
                  <span className="pulse-dot"></span>
                  <span className="stepper-label">AUTONOMOUS MULTI-AGENT PIPELINE</span>
                  <span className="stepper-sub">• 7 Cooperating Stages</span>
                </div>
                
                <div className="stepper-actions">
                  <span className="stepper-hint">Tap stage to inspect architecture</span>
                  <div className="stepper-arrows">
                    <button
                      type="button"
                      className="stepper-arrow-btn"
                      onClick={() => slidePipeline('left')}
                      title="Scroll Left"
                      aria-label="Previous pipeline stage"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button
                      type="button"
                      className="stepper-arrow-btn"
                      onClick={() => slidePipeline('right')}
                      title="Scroll Right"
                      aria-label="Next pipeline stage"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pipeline-stepper-track-wrap" ref={pipelineScrollRef}>
                <div className="pipeline-stepper-track">
                  {HUD_AGENTS_METADATA.slice(0, 7).map((agent, idx) => {
                    const AgentIcon = idx === 0 ? Icons.Globe :
                                      idx === 1 ? Icons.Chart :
                                      idx === 2 ? Icons.Competitors :
                                      idx === 3 ? Icons.Shield :
                                      idx === 4 ? Icons.Zap :
                                      idx === 5 ? Icons.Strategy : Icons.Sparkle;
                    
                    const stageTitles = [
                      "Web Search",
                      "Market Sizing",
                      "Competitors 2x2",
                      "SWOT & Risk",
                      "MVP Roadmap",
                      "GTM Strategy",
                      "Report Memo"
                    ];

                    const stageSubtitles = [
                      "Live Indexing",
                      "TAM/SAM/SOM",
                      "Moat Benchmarks",
                      "Risk Audits",
                      "MoSCoW Scoring",
                      "First 100 Playbook",
                      "Executive Dossier"
                    ];

                    return (
                      <div key={agent.id} className="stepper-node-wrapper">
                        <button
                          type="button"
                          className="stepper-card-node"
                          style={{
                            '--agent-accent': agent.accentColor,
                          }}
                          onClick={() => setActiveHudAgent(agent)}
                          title={`Click to inspect Stage ${agent.num}: ${stageTitles[idx]}`}
                        >
                          <div className="stepper-card-top">
                            <span className="stepper-num-badge" style={{ backgroundColor: agent.accentColor }}>
                              {agent.num}
                            </span>
                            <div className="stepper-icon-wrap" style={{ color: agent.accentColor, backgroundColor: `${agent.accentColor}18` }}>
                              <AgentIcon />
                            </div>
                          </div>
                          <div className="stepper-card-content">
                            <h4 className="stepper-agent-title">{stageTitles[idx]}</h4>
                            <span className="stepper-agent-sub">{stageSubtitles[idx]}</span>
                          </div>
                          <div className="stepper-card-footer">
                            <span className="stepper-inspect-tag">Stage {agent.num}</span>
                            <span className="stepper-inspect-arrow">→</span>
                          </div>
                        </button>
                        {idx < 6 && (
                          <div className="stepper-connector" aria-hidden="true">
                            <div className="stepper-connector-line"></div>
                            <div className="stepper-connector-badge">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Main Content Area */}
      <main className="app-main">
        {/* State 1: Input Form Dashboard */}
        {!searchResult && !loading && (
          <div className="console-wrapper animate-fade-in">
            {/* Interactive Blueprint Presets Section - Fluid Non-Truncating Pill Cards */}
            <div className="presets-section">
              <div className="presets-header-bar">
                <div className="presets-title-wrap">
                  <div className="presets-eyebrow-row">
                    <span className="presets-eyebrow">Interactive Blueprints</span>
                    <span className="presets-mobile-hint">Swipe 8 templates ▸</span>
                  </div>
                  <h3 className="presets-title">Select Industry Template to Auto-Configure</h3>
                </div>
                
                {/* Category Filter Pills & Vault Chip */}
                <div className="category-filter-pills">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      className={`cat-filter-btn ${activeCategoryFilter === cat.key ? 'active' : ''}`}
                      onClick={() => setActiveCategoryFilter(cat.key)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* High-Precision Blueprint Cards Grid */}
              <div className="blueprint-chips-grid">
                {filteredPrompts.map((preset) => {
                  const IconComp = preset.iconComponent || Icons.Sparkle;
                  const isSelected = activePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      className={`blueprint-pill-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        '--card-accent': preset.badgeColor,
                        '--card-glow': preset.glowColor,
                        '--card-border-subtle': preset.borderColor
                      }}
                      onClick={() => handleApplyPreset(preset)}
                    >
                      <div className="pill-card-top">
                        <div 
                          className="pill-category-badge"
                          style={{ 
                            color: preset.badgeColor,
                            backgroundColor: preset.badgeBg,
                            borderColor: preset.borderColor
                          }}
                        >
                          <IconComp />
                          <span>{preset.category}</span>
                        </div>
                        <span className="pill-action-icon" style={{ color: isSelected ? preset.badgeColor : undefined }}>
                          {isSelected ? <Icons.Check /> : <Icons.ArrowRight />}
                        </span>
                      </div>
                      <h4 className="pill-card-title">{preset.label}</h4>
                      <p className="pill-card-desc">
                        {preset.summary}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Parameter Console Card */}
            <div className="glass-card form-card">
              <div className="form-card-top-accent"></div>
              
              {/* Card Header & Pipeline Flow Indicator */}
              <div className="form-card-header">
                <div className="header-text-block">
                  <div className="header-eyebrow">
                    <span>Configuration Console</span>
                  </div>
                  <h2 className="section-title">Startup Concept & Domain Parameters</h2>
                  <p className="section-subtitle">
                    Define your venture value proposition to initialize the sequential multi-agent intelligence pipeline.
                  </p>
                </div>
                
                <div className="pipeline-workflow-widget">
                  <div className="pipeline-pill-badge">
                    <span className="pulse-dot"></span>
                    <span>7-Stage Autonomous Pipeline Active</span>
                  </div>
                  <div className="mini-pipeline-flow">
                    <span className="flow-node active">Web Search</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-node">TAM Sizing</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-node">Competitors</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-node">SWOT / Risk</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-node">MVP</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-node">GTM</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-node">Dossier</span>
                  </div>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSearch} className="validator-form">
                <div className="form-group">
                  <label htmlFor="startupIdea">
                    <Icons.Sparkle />
                    <span>Core Value Proposition & Startup Idea</span>
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="input-wrapper">
                    <textarea
                      id="startupIdea"
                      rows={3}
                      placeholder="Describe the startup concept, customer problem, and core value proposition..."
                      value={startupIdea}
                      onChange={(e) => {
                        setStartupIdea(e.target.value)
                        setActivePreset(null)
                      }}
                      required
                    />
                  </div>

                  {/* Live Idea Clarity & Readiness Meter */}
                  <div className="idea-readiness-panel animate-fade-in">
                    <div className="readiness-header">
                      <div className="readiness-title-group">
                        <span className="readiness-dot" style={{ backgroundColor: clarity.badgeBg }}></span>
                        <span className="readiness-label">Concept Clarity:</span>
                        <strong className="readiness-status" style={{ color: clarity.textColor }}>{clarity.label}</strong>
                      </div>
                      <div className="readiness-score-counter">
                        <span className="score-num">{clarity.score}%</span>
                        <span className="score-denom">Readiness</span>
                      </div>
                    </div>
                    <div className="readiness-progress-track">
                      <div 
                        className="readiness-progress-fill" 
                        style={{ 
                          width: `${clarity.score}%`,
                          background: clarity.gradient
                        }}
                      />
                    </div>
                    {clarity.suggestions.length > 0 && (
                      <div className="readiness-hint-row">
                        <span className="hint-icon">💡</span>
                        <span className="hint-text">{clarity.suggestions[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="industry">
                      <Icons.Layers />
                      <span>Industry Vertical / Domain</span>
                      <span className="required-indicator">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="industry"
                        type="text"
                        placeholder="E.g., Pet Care & HealthTech, Green Mobility"
                        value={industry}
                        onChange={(e) => {
                          setIndustry(e.target.value)
                          setActivePreset(null)
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group half-width">
                    <label htmlFor="targetMarket">
                      <Icons.Target />
                      <span>Target Customer Audience</span>
                      <span className="required-indicator">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="targetMarket"
                        type="text"
                        placeholder="E.g., Pet owners, veterinary clinics"
                        value={targetMarket}
                        onChange={(e) => {
                          setTargetMarket(e.target.value)
                          setActivePreset(null)
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="error-banner animate-fade-in">
                    <span className="error-icon">!</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-cta">
                    <Icons.Sparkle />
                    <span>Run Autonomous Market Validation</span>
                    <Icons.ArrowRight />
                  </button>
                  
                  {(startupIdea || industry || targetMarket) && (
                    <button
                      type="button"
                      onClick={handleClearForm}
                      className="btn btn-secondary-outline"
                    >
                      <Icons.Refresh />
                      <span>Reset Parameters</span>
                    </button>
                  )}
                  
                  <div className="form-hint">
                    <span>⚡ Autonomous Execution (~1.5s)</span>
                  </div>
                </div>
              </form>
            </div>

            {/* D. 3-Card Platform Capabilities Bento Strip */}
            <div className="bento-capabilities-grid animate-fade-in">
              <div className="bento-card bento-cyan">
                <div className="bento-top-row">
                  <div className="bento-icon-box bento-icon-cyan">
                    <Icons.Globe />
                  </div>
                  <span className="bento-tag bento-tag-cyan">REAL-TIME SEARCH</span>
                </div>
                <h3 className="bento-title">Live Web Grounding & Competitor Discovery</h3>
                <p className="bento-desc">
                  Scrapes live search indices via Tavily to analyze real competitor pricing, feature gaps, and sentiment—eliminating LLM hallucinations.
                </p>
                <div className="bento-bullets">
                  <div className="bento-bullet"><Icons.Check /><span>Live Tavily Search indexing</span></div>
                  <div className="bento-bullet"><Icons.Check /><span>Direct vs Indirect competitor moats</span></div>
                  <div className="bento-bullet"><Icons.Check /><span>2x2 Market white-space positioning</span></div>
                </div>
              </div>

              <div className="bento-card bento-emerald">
                <div className="bento-top-row">
                  <div className="bento-icon-box bento-icon-emerald">
                    <Icons.Chart />
                  </div>
                  <span className="bento-tag bento-tag-emerald">MARKET SIZING</span>
                </div>
                <h3 className="bento-title">Algorithmic TAM / SAM / SOM Modeling</h3>
                <p className="bento-desc">
                  Calculates rigorous top-down and bottom-up market sizing bounds with CAGR trajectories, buyer personas, and willingness-to-pay triggers.
                </p>
                <div className="bento-bullets">
                  <div className="bento-bullet"><Icons.Check /><span>$B / $M TAM, SAM, SOM breakdown</span></div>
                  <div className="bento-bullet"><Icons.Check /><span>CAGR growth rate trajectory estimates</span></div>
                  <div className="bento-bullet"><Icons.Check /><span>Decision-maker vs daily user archetypes</span></div>
                </div>
              </div>

              <div className="bento-card bento-purple">
                <div className="bento-top-row">
                  <div className="bento-icon-box bento-icon-purple">
                    <Icons.Zap />
                  </div>
                  <span className="bento-tag bento-tag-purple">STRATEGIC COPILOT</span>
                </div>
                <h3 className="bento-title">MVP Roadmap, GTM & Conversational Copilot</h3>
                <p className="bento-desc">
                  Prioritizes lean features using MoSCoW & 1-10 Effort/Impact scoring, creates a First 100 Customers launch plan, and enables multi-turn Copilot Q&A.
                </p>
                <div className="bento-bullets">
                  <div className="bento-bullet"><Icons.Check /><span>30 & 60-day MVP build milestones</span></div>
                  <div className="bento-bullet"><Icons.Check /><span>First 100 Customers CAC playbook</span></div>
                  <div className="bento-bullet"><Icons.Check /><span>1-Click Markdown, PDF & JSON dossier export</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Multi-Agent Pipeline Loading State */}
        {loading && (
          <div className="glass-card loading-card animate-fade-in">
            <div className="spinner-wrapper">
              <div className="spinner"></div>
            </div>
            <div className="loading-header-block">
              <span className="loading-badge">PIPELINE EXECUTION</span>
              <h2 className="loading-title">Autonomous Agents Running Sequential Analysis</h2>
              <p className="loading-subtitle">
                Synthesizing web search indexes, computing addressable market bounds, and constructing competitive matrices.
              </p>
            </div>
            
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
              ></div>
            </div>

            <div className="loading-steps-container">
              {loadingSteps.map((stepItem, idx) => (
                <div 
                  key={idx} 
                  className={`loading-step ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
                >
                  <div className="step-indicator">
                    {idx < currentStep ? <Icons.Check /> : idx + 1}
                  </div>
                  <div className="step-text-wrap">
                    <span className="step-agent-name">{stepItem.agent}</span>
                    <span className="step-desc">{stepItem.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* State 3: Results Display */}
        {searchResult && !loading && (
          <div className="results-container animate-fade-in">
            {/* Top Indicator & Executive Action Bar */}
            <div className="results-meta-bar">
              <div className="meta-left-group">
                <span className="pipeline-status-badge">
                  <span className="badge-dot-green"></span>
                  <span>Validation Complete ({pipelineMeta?.total_duration_sec || '1.4'}s)</span>
                </span>
                <span className="mode-badge">
                  Source: {searchResult.mode === 'live' ? 'Live Tavily Web Index' : 'Enterprise Simulation Index'}
                </span>
              </div>
              
              <div className="export-actions-group">
                {historyVault.length > 0 && (
                  <button onClick={() => setIsVaultOpen(true)} className="btn btn-secondary" title="View Saved Validation History">
                    <Icons.History />
                    <span>Vault ({historyVault.length})</span>
                  </button>
                )}
                <button onClick={handleDownloadMarkdownReport} className="btn btn-export-primary" title="Download Publication-Ready Markdown Report">
                  <Icons.Download />
                  <span>Download .md Report</span>
                </button>
                <button onClick={handleDownloadJsonDossier} className="btn btn-export-secondary" title="Export Complete JSON Intelligence Dossier">
                  <Icons.Layers />
                  <span>Export JSON</span>
                </button>
                <button onClick={handlePrintPDF} className="btn btn-print-pdf" title="Export clean PDF Dossier">
                  <Icons.Download />
                  <span>Print / PDF</span>
                </button>
                <button onClick={handleCopyInvestmentMemo} className="btn btn-export-memo" title="Copy Investor Brief in Markdown">
                  <Icons.Copy />
                  <span>Copy Memo</span>
                </button>
                <button onClick={resetForm} className="btn btn-secondary">
                  <Icons.Refresh />
                  <span>New Analysis</span>
                </button>
              </div>
            </div>



            {/* Idea Context Panel */}
            <div className="glass-card concept-hero-card">
              <div className="concept-header">
                <span className="concept-tag">Validated Venture Profile</span>
                <div className="concept-chips">
                  <span className="chip-item">Vertical: {searchResult.industry}</span>
                  <span className="chip-item">Audience: {searchResult.target_market}</span>
                </div>
              </div>
              <h3 className="concept-title">"{searchResult.startup_idea}"</h3>
            </div>

            {/* Executive Synthesis Summary */}
            {searchResult.answer && (
              <div className="glass-card executive-summary-card">
                <div className="exec-badge">Executive Synthesis</div>
                <h3 className="card-title">Market Analysis & Feasibility Overview</h3>
                <p className="synthesized-answer">{searchResult.answer}</p>
              </div>
            )}

            {/* Multi-Agent Results Navigation Ribbon (Smooth Gliding Track with Pause-on-Hover & 1-Click Select) */}
            <div className="agent-tabs-stream-wrap">
              <div className="stream-ctrl-bar">
                <div className="stream-status-label">
                  <span className="stream-live-dot"></span>
                  <span>Autonomous Intelligence Modules & Dossiers</span>
                  <span className="stream-hint-pill">Continuous Auto-Flow (Hover to Pause)</span>
                </div>
                <div className="stream-actions">
                  <button 
                    type="button"
                    className="stream-nav-arrow"
                    onClick={() => {
                      if (tabsStreamRef.current) {
                        tabsStreamRef.current.scrollBy({ left: -260, behavior: 'smooth' });
                      }
                    }}
                    title="Scroll Left"
                  >
                    <Icons.ChevronLeft />
                  </button>
                  <button 
                    type="button"
                    className={`stream-pause-btn ${tabsAutoScroll ? 'active' : ''}`}
                    onClick={() => setTabsAutoScroll(!tabsAutoScroll)}
                    title={tabsAutoScroll ? 'Click to Pause Flow' : 'Click to Resume Flow'}
                  >
                    <span className="pause-icon-dot"></span>
                    <span>{tabsAutoScroll ? 'Auto-Flow: ON' : 'Auto-Flow: PAUSED'}</span>
                  </button>
                  <button 
                    type="button"
                    className="stream-nav-arrow"
                    onClick={() => {
                      if (tabsStreamRef.current) {
                        tabsStreamRef.current.scrollBy({ left: 260, behavior: 'smooth' });
                      }
                    }}
                    title="Scroll Right"
                  >
                    <Icons.ChevronRight />
                  </button>
                </div>
              </div>

              <div 
                className={`agent-tabs-stream-viewport ${tabsAutoScroll ? 'is-gliding' : ''}`}
                ref={tabsStreamRef}
              >
                <div className="agent-tabs-stream-track">
                  {/* Primary Set of Navigation Tabs */}
                  {[
                    { id: 'market', label: 'Market Sizing', icon: Icons.Chart, subtitle: 'TAM / SOM' },
                    { id: 'competitors', label: 'Competitors & Matrix', icon: Icons.Competitors, subtitle: '2×2 Grid' },
                    { id: 'swot', label: 'SWOT & Risk Assessment', icon: Icons.Shield, subtitle: '4 Dimensions' },
                    { id: 'mvp', label: 'MVP Roadmap & MoSCoW', icon: Icons.Layers, subtitle: 'V1 Scope' },
                    { id: 'gtm', label: 'GTM & Traction', icon: Icons.Target, subtitle: 'First 100' },
                    { id: 'strategy', label: 'Viability & Moats', icon: Icons.Strategy, subtitle: 'Score Radar' },
                    { id: 'report', label: 'Executive Report', icon: Icons.Download, subtitle: 'Dossier' },
                    { id: 'pitchdeck', label: 'Pitch Deck', icon: Icons.Presentation, subtitle: '6 Slides' },
                    { id: 'sources', label: 'Web Sources', icon: Icons.Globe, subtitle: `${searchResult?.results?.length || 0} Citations` },
                    { id: 'logs', label: 'Pipeline Logs', icon: Icons.Terminal, subtitle: 'Audit Trail' }
                  ].map((tab) => {
                    const IconComp = tab.icon;
                    const isTabActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        className={`stream-tab-card ${isTabActive ? 'active' : ''}`}
                        onClick={() => handleTabChange(tab.id)}
                      >
                        <div className="tab-icon-wrap">
                          <IconComp />
                        </div>
                        <div className="tab-info-wrap">
                          <span className="tab-label-text">{tab.label}</span>
                          <span className="tab-sub-text">{tab.subtitle}</span>
                        </div>
                        {isTabActive && <span className="tab-active-glow"></span>}
                      </button>
                    );
                  })}

                  {/* Duplicate Set for Seamless Continuous Flow */}
                  {[
                    { id: 'market', label: 'Market Sizing', icon: Icons.Chart, subtitle: 'TAM / SOM' },
                    { id: 'competitors', label: 'Competitors & Matrix', icon: Icons.Competitors, subtitle: '2×2 Grid' },
                    { id: 'swot', label: 'SWOT & Risk Assessment', icon: Icons.Shield, subtitle: '4 Dimensions' },
                    { id: 'mvp', label: 'MVP Roadmap & MoSCoW', icon: Icons.Layers, subtitle: 'V1 Scope' },
                    { id: 'gtm', label: 'GTM & Traction', icon: Icons.Target, subtitle: 'First 100' },
                    { id: 'strategy', label: 'Viability & Moats', icon: Icons.Strategy, subtitle: 'Score Radar' },
                    { id: 'report', label: 'Executive Report', icon: Icons.Download, subtitle: 'Dossier' },
                    { id: 'pitchdeck', label: 'Pitch Deck', icon: Icons.Presentation, subtitle: '6 Slides' },
                    { id: 'sources', label: 'Web Sources', icon: Icons.Globe, subtitle: `${searchResult?.results?.length || 0} Citations` },
                    { id: 'logs', label: 'Pipeline Logs', icon: Icons.Terminal, subtitle: 'Audit Trail' }
                  ].map((tab) => {
                    const IconComp = tab.icon;
                    const isTabActive = activeTab === tab.id;
                    return (
                      <button
                        key={`dup-${tab.id}`}
                        type="button"
                        aria-hidden="true"
                        className={`stream-tab-card ${isTabActive ? 'active' : ''}`}
                        onClick={() => handleTabChange(tab.id)}
                      >
                        <div className="tab-icon-wrap">
                          <IconComp />
                        </div>
                        <div className="tab-info-wrap">
                          <span className="tab-label-text">{tab.label}</span>
                          <span className="tab-sub-text">{tab.subtitle}</span>
                        </div>
                        {isTabActive && <span className="tab-active-glow"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* TAB 1: Market Opportunity & Financial Sensitivity Simulator */}
            {/* ======================================================== */}
            {activeTab === 'market' && marketData && (
              <div className="tab-pane animate-fade-in">
                {/* Market Summary */}
                <div className="glass-card market-summary-card">
                  <h3 className="pane-section-title">Market Opportunity Summary</h3>
                  <p className="market-narrative">{marketData.market_summary}</p>
                </div>

                {/* Sizing & Growth Grid */}
                {marketData.market_size_and_growth && (
                  <div className="market-metrics-grid">
                    <div className="glass-card metric-card tam-card">
                      <span className="metric-label">TAM (Total Addressable Market)</span>
                      <h4 className="metric-value">{marketData.market_size_and_growth.tam_estimate}</h4>
                      <p className="metric-subtext">Overall industry addressable potential</p>
                    </div>
                    <div className="glass-card metric-card sam-card">
                      <span className="metric-label">SAM (Serviceable Addressable)</span>
                      <h4 className="metric-value">{marketData.market_size_and_growth.sam_estimate}</h4>
                      <p className="metric-subtext">Specific regional/vertical target segment</p>
                    </div>
                    <div className="glass-card metric-card som-card">
                      <span className="metric-label">SOM (Initial Beachhead)</span>
                      <h4 className="metric-value">{marketData.market_size_and_growth.som_estimate}</h4>
                      <p className="metric-subtext">Realistic initial capture in 1-3 years</p>
                    </div>
                    <div className="glass-card metric-card cagr-card">
                      <span className="metric-label">Growth Trajectory</span>
                      <h4 className="metric-value">{marketData.market_size_and_growth.cagr_growth_rate}</h4>
                      <span className="stage-badge">{marketData.market_size_and_growth.growth_stage || 'High Growth'}</span>
                    </div>
                  </div>
                )}

                {/* Interactive TAM/SAM/SOM Financial Sensitivity Simulator */}
                <div className="glass-card simulator-card">
                  <div className="sim-header">
                    <div className="sim-title-group">
                      <div className="sim-icon-glow">
                        <Icons.Sliders />
                      </div>
                      <div>
                        <h3 className="card-title">Interactive Financial Model & ARR Sensitivity Simulator</h3>
                        <p className="sim-subtitle">Simulate real-time revenue ceilings, beachhead customer adoption, and multi-tier ARR run-rates:</p>
                      </div>
                    </div>
                    <div className="sim-header-meta">
                      <span className="sim-badge">Live Reactive Engine</span>
                    </div>
                  </div>

                  {/* Interactive Fast Scenarios Switcher */}
                  <div className="sim-scenarios-strip">
                    <span className="scenarios-label">Quick Scenarios:</span>
                    <div className="scenarios-pills">
                      <button
                        type="button"
                        className={`scenario-pill ${targetCustomers === 15000 && arpu === 300 && penetrationRate === 0.8 ? 'active' : ''}`}
                        onClick={() => { setTargetCustomers(15000); setArpu(300); setPenetrationRate(0.8); }}
                      >
                        🌱 Conservative (0.8% • $300)
                      </button>
                      <button
                        type="button"
                        className={`scenario-pill ${targetCustomers === 25000 && arpu === 600 && penetrationRate === 1.5 ? 'active' : ''}`}
                        onClick={() => { setTargetCustomers(25000); setArpu(600); setPenetrationRate(1.5); }}
                      >
                        🎯 Base Case (1.5% • $600)
                      </button>
                      <button
                        type="button"
                        className={`scenario-pill ${targetCustomers === 50000 && arpu === 1200 && penetrationRate === 2.5 ? 'active' : ''}`}
                        onClick={() => { setTargetCustomers(50000); setArpu(1200); setPenetrationRate(2.5); }}
                      >
                        🚀 High Growth (2.5% • $1.2k)
                      </button>
                      <button
                        type="button"
                        className={`scenario-pill ${targetCustomers === 100000 && arpu === 2400 && penetrationRate === 4.0 ? 'active' : ''}`}
                        onClick={() => { setTargetCustomers(100000); setArpu(2400); setPenetrationRate(4.0); }}
                      >
                        👑 Enterprise Scale (4.0% • $2.4k)
                      </button>
                    </div>
                  </div>

                  {/* 3 Parameter Sliders Grid with Quick-Select Chips */}
                  <div className="sim-controls-grid">
                    {/* Slider 1: Pool */}
                    <div className="slider-box">
                      <div className="slider-top">
                        <div className="slider-label-group">
                          <span className="slider-num-tag">01</span>
                          <label>Target Addressable Pool ($N$ Users)</label>
                        </div>
                        <span className="slider-val">{targetCustomers.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        min="2000" 
                        max="200000" 
                        step="1000" 
                        value={targetCustomers}
                        onChange={(e) => setTargetCustomers(Number(e.target.value))}
                        className="custom-range"
                      />
                      <div className="slider-quick-chips">
                        {[10000, 25000, 50000, 100000, 200000].map(val => (
                          <button
                            key={val}
                            type="button"
                            className={`quick-chip ${targetCustomers === val ? 'active' : ''}`}
                            onClick={() => setTargetCustomers(val)}
                          >
                            {val >= 1000 ? `${val / 1000}k` : val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slider 2: ACV / ARPU */}
                    <div className="slider-box">
                      <div className="slider-top">
                        <div className="slider-label-group">
                          <span className="slider-num-tag">02</span>
                          <label>Annual Contract Value / ARPU ($/yr)</label>
                        </div>
                        <span className="slider-val">${arpu.toLocaleString()}/yr</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="5000" 
                        step="50" 
                        value={arpu}
                        onChange={(e) => setArpu(Number(e.target.value))}
                        className="custom-range"
                      />
                      <div className="slider-quick-chips">
                        {[120, 300, 600, 1200, 2400, 5000].map(val => (
                          <button
                            key={val}
                            type="button"
                            className={`quick-chip ${arpu === val ? 'active' : ''}`}
                            onClick={() => setArpu(val)}
                          >
                            ${val >= 1000 ? `${val / 1000}k` : val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slider 3: Penetration */}
                    <div className="slider-box">
                      <div className="slider-top">
                        <div className="slider-label-group">
                          <span className="slider-num-tag">03</span>
                          <label>Year-1 Beachhead Penetration (%)</label>
                        </div>
                        <span className="slider-val">{penetrationRate}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.2" 
                        max="8.0" 
                        step="0.1" 
                        value={penetrationRate}
                        onChange={(e) => setPenetrationRate(Number(e.target.value))}
                        className="custom-range"
                      />
                      <div className="slider-quick-chips">
                        {[0.5, 1.0, 1.5, 2.5, 4.0, 6.0].map(val => (
                          <button
                            key={val}
                            type="button"
                            className={`quick-chip ${penetrationRate === val ? 'active' : ''}`}
                            onClick={() => setPenetrationRate(val)}
                          >
                            {val}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Reactive Unit Economics Formula Ticker */}
                  <div className="sim-formula-ticker">
                    <div className="ticker-left">
                      <span className="ticker-badge">Live Math</span>
                      <span className="ticker-text">
                        <strong>{targetCustomers.toLocaleString()}</strong> Pool × <strong>{penetrationRate}%</strong> Capture = <strong>{payingCustomersCount.toLocaleString()} Customers</strong> @ <strong>${arpu}/yr</strong>
                      </span>
                    </div>
                    <div className="ticker-right">
                      <span className="ticker-mrr">MRR: <strong>{projectedMRR}</strong> / mo</span>
                    </div>
                  </div>

                  {/* Simulator Dynamic Financial Forecast Output Cards */}
                  <div className="sim-output-grid">
                    <div className="sim-out-card">
                      <div className="sim-out-top">
                        <span className="sim-out-label">Calculated TAM Ceiling</span>
                        <span className="sim-out-icon cyan"><Icons.Globe /></span>
                      </div>
                      <h4 className="sim-out-value">{calculatedTAM}</h4>
                      <span className="sim-out-sub">Global 100% Market Ceiling</span>
                    </div>

                    <div className="sim-out-card">
                      <div className="sim-out-top">
                        <span className="sim-out-label">Target Serviceable (SAM)</span>
                        <span className="sim-out-icon blue"><Icons.Target /></span>
                      </div>
                      <h4 className="sim-out-value">{calculatedSAM}</h4>
                      <span className="sim-out-sub">Core Reachable Segment</span>
                    </div>

                    <div className="sim-out-card highlight-out">
                      <div className="sim-out-top">
                        <span className="sim-out-label">Year-1 Beachhead ARR (SOM)</span>
                        <span className="sim-out-icon purple"><Icons.Zap /></span>
                      </div>
                      <h4 className="sim-out-value">{projectedYear1ARR}</h4>
                      <span className="sim-out-sub">{payingCustomersCount.toLocaleString()} Paying Users ({projectedMRR}/mo)</span>
                    </div>

                    <div className="sim-out-card">
                      <div className="sim-out-top">
                        <span className="sim-out-label">Year-3 Growth Trajectory</span>
                        <span className="sim-out-icon emerald"><Icons.TrendingUp /></span>
                      </div>
                      <h4 className="sim-out-value">{projectedYear3ARR}</h4>
                      <span className="sim-out-sub">Compounding 3.8x Flywheel ARR</span>
                    </div>
                  </div>
                </div>

                {/* Customer Segmentation Breakdown */}
                {marketData.customer_segments && marketData.customer_segments.length > 0 && (
                  <div className="customer-segmentation-section">
                    <h3 className="pane-section-title">Customer Segmentation & Buyer Profiles</h3>
                    <div className="personas-grid">
                      {marketData.customer_segments.map((seg, idx) => (
                        <div key={idx} className="glass-card persona-card">
                          <div className="persona-header">
                            <span className="persona-badge">Segment {idx + 1}</span>
                            <h4 className="persona-name">{seg.segment_name}</h4>
                            <p className="persona-users"><strong>Target Profile:</strong> {seg.target_users}</p>
                          </div>

                          <div className="persona-body">
                            <div className="persona-block">
                              <span className="block-title pain-title">Core Friction Points</span>
                              <ul className="persona-list pain-list">
                                {seg.pain_points?.map((pain, pIdx) => (
                                  <li key={pIdx}>{pain}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="persona-block">
                              <span className="block-title motivation-title">Primary Purchase Drivers</span>
                              <ul className="persona-list motivation-list">
                                {seg.core_motivations?.map((mot, mIdx) => (
                                  <li key={mIdx}>{mot}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="persona-footer">
                              <div><strong>Procurement:</strong> {seg.buying_behavior}</div>
                              <div><strong>Willingness to Pay:</strong> <span className="wtp-tag">{seg.willingness_to_pay}</span></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Demand Drivers & Industry Terminology */}
                <div className="market-extra-grid">
                  {marketData.demand_drivers && (
                    <div className="glass-card demand-card">
                      <h4 className="card-subhead">Key Market Growth Drivers</h4>
                      <ul className="demand-list">
                        {marketData.demand_drivers.map((driver, dIdx) => (
                          <li key={dIdx}>
                            <span className="check-icon"><Icons.Check /></span>
                            <span>{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {marketData.industry_terminology && (
                    <div className="glass-card terms-card">
                      <h4 className="card-subhead">Industry Domain Terminology</h4>
                      <div className="terms-wrap">
                        {marketData.industry_terminology.map((term, tIdx) => (
                          <span key={tIdx} className="term-chip">{term}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: Competitor Discovery & 2x2 Positioning Quadrant */}
            {/* ======================================================== */}
            {activeTab === 'competitors' && competitorData && (
              <div className="tab-pane animate-fade-in">
                {/* Competitor Overview */}
                <div className="glass-card comp-summary-card">
                  <h3 className="pane-section-title">Competitive Landscape Overview</h3>
                  <p className="market-narrative">{competitorData.competitor_summary}</p>
                </div>

                {/* Visual 2x2 Competitive Positioning Quadrant (BCG/Gartner Style) */}
                <div className="glass-card quadrant-card">
                  <div className="quad-header">
                    <div>
                      <div className="quad-title-row">
                        <h3 className="card-title">2×2 Competitive Positioning Matrix</h3>
                        <span className="quad-legend-badge">Interactive Visual Scatter</span>
                      </div>
                      <p className="quad-subtext">Benchmarking market positioning across Domain Specialization and Autonomous AI Workflows.</p>
                    </div>
                    <button 
                      type="button" 
                      className={`quad-guide-toggle-btn ${showMatrixGuide ? 'active' : ''}`}
                      onClick={() => setShowMatrixGuide(!showMatrixGuide)}
                    >
                      <Icons.Info /> {showMatrixGuide ? 'Hide Matrix Guide' : 'How to Read Matrix'}
                    </button>
                  </div>

                  {/* Collapsible Explainer Guide */}
                  {showMatrixGuide && (
                    <div className="quad-guide-accordion animate-fade-in">
                      <div className="quad-guide-grid">
                        <div className="guide-box">
                          <div className="guide-title">
                            <span className="guide-badge axis-badge">X-Axis</span>
                            <strong>Domain Specialization</strong>
                          </div>
                          <p><strong>Left (Generic):</strong> Broad horizontal tools built for everyone (e.g. general spreadsheets, basic forms).</p>
                          <p><strong>Right (Vertical):</strong> Tailored software built specifically for this industry's unique workflows and data.</p>
                        </div>
                        <div className="guide-box">
                          <div className="guide-title">
                            <span className="guide-badge axis-badge">Y-Axis</span>
                            <strong>Autonomous AI Workflows</strong>
                          </div>
                          <p><strong>Bottom (Manual):</strong> Fragmented legacy tools requiring repetitive human clicking and copy-pasting.</p>
                          <p><strong>Top (Autonomous):</strong> Agentic AI workflows that execute, reason, and deliver end-to-end results automatically.</p>
                        </div>
                        <div className="guide-box highlight-guide-box">
                          <div className="guide-title">
                            <span className="guide-badge frontier-badge">★ Target Zone</span>
                            <strong>Frontier Disrupter (Top-Right)</strong>
                          </div>
                          <p><strong>Your Startup's Advantage:</strong> Combines deep domain specialization with autonomous AI execution to capture the highest-value market white space.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quadrant Filter Pills */}
                  <div className="quad-filter-bar">
                    <span className="filter-label">Filter Quadrant:</span>
                    <button 
                      type="button"
                      className={`quad-filter-pill ${activeQuadrantFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveQuadrantFilter('all')}
                    >
                      All Players ({quadrantCompetitors.length + 1})
                    </button>
                    <button 
                      type="button"
                      className={`quad-filter-pill ${activeQuadrantFilter === 'frontier' ? 'active' : ''}`}
                      onClick={() => setActiveQuadrantFilter('frontier')}
                    >
                      ★ Frontier Disrupter
                    </button>
                    <button 
                      type="button"
                      className={`quad-filter-pill ${activeQuadrantFilter === 'automation' ? 'active' : ''}`}
                      onClick={() => setActiveQuadrantFilter('automation')}
                    >
                      Autonomous Automation
                    </button>
                    <button 
                      type="button"
                      className={`quad-filter-pill ${activeQuadrantFilter === 'legacy' ? 'active' : ''}`}
                      onClick={() => setActiveQuadrantFilter('legacy')}
                    >
                      Vertical Legacy Suites
                    </button>
                    <button 
                      type="button"
                      className={`quad-filter-pill ${activeQuadrantFilter === 'incumbents' ? 'active' : ''}`}
                      onClick={() => setActiveQuadrantFilter('incumbents')}
                    >
                      Generic Incumbents
                    </button>
                  </div>

                  <div className="quadrant-box">
                    <div className="quad-bg-grid">
                      <div className={`quad-zone top-left ${activeQuadrantFilter === 'automation' ? 'filter-active-zone' : ''}`}>
                        <span className="zone-label">Autonomous Automation</span>
                      </div>
                      <div className={`quad-zone top-right highlight-zone ${activeQuadrantFilter === 'frontier' ? 'filter-active-zone' : ''}`}>
                        <span className="zone-label frontier-label">★ Frontier Disrupter (Target Niche)</span>
                      </div>
                      <div className={`quad-zone bottom-left ${activeQuadrantFilter === 'incumbents' ? 'filter-active-zone' : ''}`}>
                        <span className="zone-label">Generic Incumbents</span>
                      </div>
                      <div className={`quad-zone bottom-right ${activeQuadrantFilter === 'legacy' ? 'filter-active-zone' : ''}`}>
                        <span className="zone-label">Vertical Legacy Suites</span>
                      </div>
                    </div>

                    {/* Proposed Startup Bubble (Top Right Frontier) */}
                    <div 
                      className={`quad-bubble startup-bubble ${selectedCompetitor?.isStartup ? 'active-selected-bubble' : ''} ${activeQuadrantFilter !== 'all' && activeQuadrantFilter !== 'frontier' ? 'dimmed-bubble' : ''}`}
                      style={{ left: `84%`, top: `18%` }}
                      onClick={() => setSelectedCompetitor({
                        isStartup: true,
                        name: searchResult?.startup_idea || "Your Startup Concept",
                        quadName: "★ Frontier Disrupter (Top-Right Niche)",
                        strengths: "Autonomous AI agents + deep vertical domain intelligence tailored specifically for this market.",
                        weaknesses: "Early stage brand awareness (mitigated by rapid vertical GTM & high customer ROI).",
                        pricing: "Value-based subscription / usage tiers with instant ROI",
                        targetCustomer: searchResult?.target_market || "Target Domain Customers",
                        offering: searchResult?.problem_solved || "Autonomous AI platform solving core operational bottlenecks."
                      })}
                      onMouseEnter={() => setHoveredCompetitor({
                        name: "★ Your Startup Concept",
                        strengths: "Autonomous AI workflows + Deep Vertical Domain Specialization",
                        weaknesses: "Early-stage market entry",
                        pricing: "High-ROI Value Pricing"
                      })}
                      onMouseLeave={() => setHoveredCompetitor(null)}
                      title="Click to inspect startup strategic position"
                    >
                      <div className="bubble-pulse"></div>
                      <span className="bubble-name">★ Your Startup Concept</span>
                    </div>

                    {/* Competitor Bubbles */}
                    {quadrantCompetitors.map((comp, cIdx) => {
                      const isFilteredOut = activeQuadrantFilter !== 'all' && activeQuadrantFilter !== comp.quadId;
                      const isSelected = selectedCompetitor?.name === comp.name;
                      return (
                        <div 
                          key={cIdx} 
                          className={`quad-bubble competitor-bubble ${isSelected ? 'active-selected-bubble' : ''} ${isFilteredOut ? 'dimmed-bubble' : ''}`}
                          style={{ left: `${comp.x}%`, top: `${comp.y}%` }}
                          onClick={() => setSelectedCompetitor(comp)}
                          onMouseEnter={() => setHoveredCompetitor(comp)}
                          onMouseLeave={() => setHoveredCompetitor(null)}
                          title="Click to inspect competitor battle card"
                        >
                          <span className="bubble-dot-inner"></span>
                          <span className="bubble-name">{comp.name}</span>
                        </div>
                      );
                    })}

                    {/* Quadrant Axis Labels */}
                    <div className="axis-label x-axis-left">← Generic / Horizontal</div>
                    <div className="axis-label x-axis-right">Domain-Specialized Vertical →</div>
                    <div className="axis-label y-axis-top">Autonomous AI Workflows ↑</div>
                    <div className="axis-label y-axis-bottom">↓ Manual / Fragmented</div>

                    {/* Competitor Hover Tooltip (if nothing is selected or while hovering) */}
                    {hoveredCompetitor && !selectedCompetitor && (
                      <div className="quad-tooltip animate-fade-in">
                        <strong>{hoveredCompetitor.name}</strong>
                        <div className="tt-row"><span>Advantage:</span> {hoveredCompetitor.strengths}</div>
                        <div className="tt-row"><span>Limitation:</span> {hoveredCompetitor.weaknesses}</div>
                        <div className="tt-row"><span>Pricing Model:</span> {hoveredCompetitor.pricing}</div>
                      </div>
                    )}
                  </div>

                  {/* Interactive Selected Competitor / Startup Focus Inspector Card */}
                  {selectedCompetitor && (
                    <div className="quad-focus-inspector-card animate-fade-in">
                      <div className="focus-card-header">
                        <div className="focus-header-info">
                          <div className="focus-title-wrap">
                            <span className={`focus-quad-badge ${selectedCompetitor.isStartup ? 'startup-badge' : ''}`}>
                              {selectedCompetitor.quadName || 'Positioned Competitor'}
                            </span>
                            <h4 className="focus-comp-name">{selectedCompetitor.name}</h4>
                          </div>
                          {selectedCompetitor.targetCustomer && (
                            <span className="focus-target-sub">Target: {selectedCompetitor.targetCustomer}</span>
                          )}
                        </div>
                        <button 
                          type="button" 
                          className="focus-close-btn" 
                          onClick={() => setSelectedCompetitor(null)}
                          title="Close inspection"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <div className="focus-grid-cols">
                        <div className="focus-stat-box advantage-box">
                          <span className="focus-label">Primary Advantage</span>
                          <p>{selectedCompetitor.strengths}</p>
                        </div>
                        <div className="focus-stat-box weakness-box">
                          <span className="focus-label">Limitation & Complaints</span>
                          <p>{selectedCompetitor.weaknesses}</p>
                        </div>
                        <div className="focus-stat-box pricing-box">
                          <span className="focus-label">Pricing Architecture</span>
                          <p>{selectedCompetitor.pricing}</p>
                        </div>
                      </div>

                      {!selectedCompetitor.isStartup && (
                        <div className="focus-battle-card">
                          <div className="battle-header">
                            <Icons.Zap />
                            <strong>Why Your Concept Wins Against {selectedCompetitor.name}:</strong>
                          </div>
                          <p>
                            While {selectedCompetitor.name} suffers from <em>"{selectedCompetitor.weaknesses}"</em>, your concept replaces fragmented manual overhead with autonomous vertical intelligence, offering faster time-to-value and domain-specific precision.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Direct Competitors Cards */}
                {competitorData.direct_competitors && (
                  <div className="direct-comps-section">
                    <h3 className="pane-section-title">Direct Competitors</h3>
                    <div className="direct-comps-grid">
                      {competitorData.direct_competitors.map((comp, cIdx) => (
                        <div key={cIdx} className="glass-card competitor-profile-card">
                          <div className="comp-card-header">
                            <h4 className="comp-name">{comp.name}</h4>
                            <span className="comp-target-badge">{comp.target_customer}</span>
                          </div>
                          <p className="comp-offering">{comp.core_offering}</p>
                          
                          <div className="comp-traits">
                            <div className="trait-box strength-box">
                              <strong>Primary Advantage:</strong>
                              <p>{comp.strengths}</p>
                            </div>
                            <div className="trait-box weakness-box">
                              <strong>Limitation / Customer Complaints:</strong>
                              <p>{comp.weaknesses_and_complaints}</p>
                            </div>
                          </div>

                          <div className="comp-card-footer">
                            <span><strong>Pricing Structure:</strong> {comp.pricing_model}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feature Comparison Matrix Table */}
                {competitorData.comparison_matrix && (
                  <div className="glass-card matrix-card">
                    <h3 className="pane-section-title">Feature & Positioning Benchmark Matrix</h3>
                    <div className="table-responsive">
                      <table className="comparison-table">
                        <thead>
                          <tr>
                            <th>Evaluation Axis</th>
                            <th className="highlight-col">Proposed Startup Concept</th>
                            {competitorData.comparison_matrix.competitor_rows?.map((cr, idx) => (
                              <th key={idx}>{cr.name}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {competitorData.comparison_matrix.dimensions?.map((dim, dIdx) => (
                            <tr key={dIdx}>
                              <td className="dimension-name"><strong>{dim}</strong></td>
                              <td className="highlight-col startup-cell">
                                <span className="score-badge startup-badge">
                                  {competitorData.comparison_matrix.startup_idea?.scores?.[dim] || 'High'}
                                </span>
                              </td>
                              {competitorData.comparison_matrix.competitor_rows?.map((cr, cIdx) => (
                                <td key={cIdx} className="competitor-cell">
                                  <span className="score-badge">
                                    {cr.scores?.[dim] || 'Moderate'}
                                  </span>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Market White Spaces & Gaps */}
                {competitorData.market_gaps_and_white_space && (
                  <div className="glass-card gaps-card">
                    <div className="gaps-header">
                      <Icons.Target />
                      <h3 className="card-title">Identified Market Gaps & White Spaces</h3>
                    </div>
                    <p className="gaps-subtitle">Unmet customer friction points and underserved market vectors:</p>
                    <div className="gaps-grid">
                      {competitorData.market_gaps_and_white_space.map((gap, gIdx) => (
                        <div key={gIdx} className="gap-item-card">
                          <span className="gap-number">Opportunity {gIdx + 1}</span>
                          <p className="gap-text">{gap}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Differentiation Strategy */}
                {competitorData.differentiation_strategy && (
                  <div className="glass-card diff-card">
                    <h3 className="card-title">Strategic Differentiation Playbook</h3>
                    <div className="diff-steps-grid">
                      {competitorData.differentiation_strategy.map((strat, sIdx) => (
                        <div key={sIdx} className="diff-step-card">
                          <span className="diff-badge">Vector {sIdx + 1}</span>
                          <p>{strat}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB: SWOT & Risk Analysis Agent (Milestone 3)           */}
            {/* ======================================================== */}
            {activeTab === 'swot' && swotData && (
              <div className="tab-pane animate-fade-in">
                {/* Executive SWOT & Risk Summary */}
                <div className="glass-card swot-summary-card">
                  <div className="swot-top-meta">
                    <div className="swot-title-wrap">
                      <Icons.Shield />
                      <h3 className="pane-section-title">Strategic SWOT & Multi-Category Risk Audit</h3>
                    </div>
                    <div className="risk-score-pill">
                      <span className="risk-score-num">{swotData.overall_risk_score || 28}/100</span>
                      <span className="risk-score-label">{swotData.risk_verdict || 'Moderate Risk — Defensible'}</span>
                    </div>
                  </div>
                  <p className="market-narrative">{swotData.swot_summary}</p>
                </div>

                {/* 2x2 SWOT Grid */}
                <div className="swot-quadrant-grid">
                  {/* Strengths */}
                  <div className="glass-card swot-box swot-strengths">
                    <div className="swot-box-header">
                      <div className="swot-icon-badge strength-badge">S</div>
                      <div>
                        <h4 className="swot-box-title">Internal Strengths</h4>
                        <span className="swot-box-sub">Core capabilities & advantages</span>
                      </div>
                    </div>
                    <div className="swot-items-list">
                      {swotData.swot?.strengths?.map((item, idx) => (
                        <div key={idx} className="swot-item-card">
                          <div className="swot-item-top">
                            <strong className="swot-item-title">{item.title}</strong>
                            <span className="impact-tag impact-high">{item.strategic_impact || 'High Impact'}</span>
                          </div>
                          <p className="swot-item-desc">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div className="glass-card swot-box swot-weaknesses">
                    <div className="swot-box-header">
                      <div className="swot-icon-badge weakness-badge">W</div>
                      <div>
                        <h4 className="swot-box-title">Internal Weaknesses</h4>
                        <span className="swot-box-sub">Bottlenecks & resource constraints</span>
                      </div>
                    </div>
                    <div className="swot-items-list">
                      {swotData.swot?.weaknesses?.map((item, idx) => (
                        <div key={idx} className="swot-item-card">
                          <div className="swot-item-top">
                            <strong className="swot-item-title">{item.title}</strong>
                            <span className="impact-tag impact-med">{item.severity || 'Medium Severity'}</span>
                          </div>
                          <p className="swot-item-desc">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Opportunities */}
                  <div className="glass-card swot-box swot-opportunities">
                    <div className="swot-box-header">
                      <div className="swot-icon-badge opportunity-badge">O</div>
                      <div>
                        <h4 className="swot-box-title">External Opportunities</h4>
                        <span className="swot-box-sub">Market vectors & expansion tailwinds</span>
                      </div>
                    </div>
                    <div className="swot-items-list">
                      {swotData.swot?.opportunities?.map((item, idx) => (
                        <div key={idx} className="swot-item-card">
                          <div className="swot-item-top">
                            <strong className="swot-item-title">{item.title}</strong>
                            <span className="impact-tag impact-cyan">{item.potential_upside || 'High Upside'}</span>
                          </div>
                          <p className="swot-item-desc">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Threats */}
                  <div className="glass-card swot-box swot-threats">
                    <div className="swot-box-header">
                      <div className="swot-icon-badge threat-badge">T</div>
                      <div>
                        <h4 className="swot-box-title">External Threats</h4>
                        <span className="swot-box-sub">Incumbent response & regulatory risks</span>
                      </div>
                    </div>
                    <div className="swot-items-list">
                      {swotData.swot?.threats?.map((item, idx) => (
                        <div key={idx} className="swot-item-card">
                          <div className="swot-item-top">
                            <strong className="swot-item-title">{item.title}</strong>
                            <span className="impact-tag impact-rose">{item.urgency || 'Medium Urgency'}</span>
                          </div>
                          <p className="swot-item-desc">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Risk Assessment & Mitigation Matrix */}
                {swotData.risk_assessment && (
                  <div className="glass-card risk-matrix-card">
                    <div className="risk-matrix-header">
                      <Icons.Zap />
                      <div>
                        <h3 className="card-title">Multi-Category Risk Assessment & Mitigation Playbook</h3>
                        <p className="pane-subtext">Actionable safeguards across technical, market, regulatory, and financial dimensions:</p>
                      </div>
                    </div>

                    <div className="risk-cards-grid">
                      {swotData.risk_assessment.map((risk, rIdx) => (
                        <div key={rIdx} className="glass-card risk-detail-card">
                          <div className="risk-card-top">
                            <span className="risk-category-badge">{risk.category}</span>
                            <span className={`risk-severity-pill severity-${(risk.severity || 'medium').toLowerCase()}`}>
                              Severity: {risk.severity || 'Medium'}
                            </span>
                          </div>
                          <h4 className="risk-title">{risk.risk_title}</h4>
                          <div className="risk-mitigation-box">
                            <div className="mitigation-header">
                              <Icons.Sparkle />
                              <strong>Actionable Mitigation Playbook:</strong>
                            </div>
                            <p className="mitigation-text">{risk.mitigation_strategy}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB: MVP Feature Roadmap & MoSCoW (Milestone 3)         */}
            {/* ======================================================== */}
            {activeTab === 'mvp' && mvpData && (
              <div className="tab-pane animate-fade-in">
                {/* Build Philosophy & Tech Stack */}
                <div className="glass-card mvp-hero-card">
                  <div className="mvp-hero-top">
                    <div>
                      <span className="pill-category-badge">Product Strategy & Scoping</span>
                      <h3 className="pane-section-title">Lean MVP Product Philosophy</h3>
                    </div>
                    <div className="build-time-badge">
                      <Icons.Zap />
                      <span>Est. Build Time: {mvpData.estimated_mvp_build_time_weeks || 6} Weeks</span>
                    </div>
                  </div>
                  <p className="market-narrative">{mvpData.mvp_philosophy}</p>

                  {/* Recommended Stack Chips */}
                  {mvpData.recommended_tech_stack && (
                    <div className="mvp-stack-row">
                      <span className="stack-label">Recommended Tech Stack:</span>
                      <div className="stack-chips-wrap">
                        {mvpData.recommended_tech_stack.map((stk, sIdx) => (
                          <span key={sIdx} className="tech-stack-chip">{stk}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* MoSCoW Feature Prioritization Section */}
                <div className="moscow-section-wrap">
                  <div className="moscow-section-header">
                    <div>
                      <h3 className="pane-section-title">MoSCoW Product Scope & Feature Prioritization</h3>
                      <p className="pane-subtext">Disciplined feature stratification to guarantee MVP ship date within {mvpData.estimated_mvp_build_time_weeks || 6} weeks.</p>
                    </div>
                    
                    {/* Tier Filter Pills */}
                    <div className="moscow-filter-pills">
                      <button 
                        type="button"
                        className={`moscow-filter-pill ${moscowFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setMoscowFilter('all')}
                      >
                        All 4 Tiers (2×2 Matrix)
                      </button>
                      <button 
                        type="button"
                        className={`moscow-filter-pill pill-must ${moscowFilter === 'must' ? 'active' : ''}`}
                        onClick={() => setMoscowFilter('must')}
                      >
                        ★ Must Have ({mvpData.moscow_matrix?.must_have?.length || 0})
                      </button>
                      <button 
                        type="button"
                        className={`moscow-filter-pill pill-should ${moscowFilter === 'should' ? 'active' : ''}`}
                        onClick={() => setMoscowFilter('should')}
                      >
                        ⚡ Should Have ({mvpData.moscow_matrix?.should_have?.length || 0})
                      </button>
                      <button 
                        type="button"
                        className={`moscow-filter-pill pill-could ${moscowFilter === 'could' ? 'active' : ''}`}
                        onClick={() => setMoscowFilter('could')}
                      >
                        ✨ Could Have ({mvpData.moscow_matrix?.could_have?.length || 0})
                      </button>
                      <button 
                        type="button"
                        className={`moscow-filter-pill pill-wont ${moscowFilter === 'wont' ? 'active' : ''}`}
                        onClick={() => setMoscowFilter('wont')}
                      >
                        🛡️ Won't Have ({mvpData.moscow_matrix?.wont_have_v1?.length || 0})
                      </button>
                    </div>
                  </div>

                  {/* MoSCoW Balanced 2x2 Grid / Column View */}
                  <div className={`moscow-columns-grid ${moscowFilter !== 'all' ? 'single-tier-view' : ''}`}>
                    {/* Must Have */}
                    {(moscowFilter === 'all' || moscowFilter === 'must') && (
                      <div className="glass-card moscow-col col-must animate-fade-in">
                        <div className="moscow-col-header">
                          <div className="col-indicator indicator-must"></div>
                          <div className="col-title-group">
                            <div className="col-title-row">
                              <h4 className="moscow-col-title">Must Have (V1 Core Loop)</h4>
                              <span className="col-count-badge badge-must">{mvpData.moscow_matrix?.must_have?.length || 0} Features</span>
                            </div>
                            <span className="moscow-col-sub">Essential for initial problem-solution fit & core user retention</span>
                          </div>
                        </div>
                        <div className="moscow-items-list">
                          {mvpData.moscow_matrix?.must_have?.map((feat, idx) => (
                            <div key={idx} className="feature-item-card">
                              <div className="feature-card-top">
                                <span className="feature-cat-tag cat-must">{feat.category || 'Core Engine'}</span>
                                <div className="scores-pill">
                                  <span>Effort: <strong>{feat.effort_score || 5}/10</strong></span>
                                  <span>Impact: <strong className="score-high">{feat.impact_score || 9}/10</strong></span>
                                </div>
                              </div>
                              <h5 className="feature-name">{feat.feature_name}</h5>
                              <p className="feature-desc">{feat.description}</p>
                              {feat.user_value && (
                                <div className="feature-value-row">
                                  <span className="val-icon">★</span>
                                  <span><strong>User Value:</strong> {feat.user_value}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Should Have */}
                    {(moscowFilter === 'all' || moscowFilter === 'should') && (
                      <div className="glass-card moscow-col col-should animate-fade-in">
                        <div className="moscow-col-header">
                          <div className="col-indicator indicator-should"></div>
                          <div className="col-title-group">
                            <div className="col-title-row">
                              <h4 className="moscow-col-title">Should Have (V1.1 Retain)</h4>
                              <span className="col-count-badge badge-should">{mvpData.moscow_matrix?.should_have?.length || 0} Features</span>
                            </div>
                            <span className="moscow-col-sub">High value enhancements once core conversion loop is proven</span>
                          </div>
                        </div>
                        <div className="moscow-items-list">
                          {mvpData.moscow_matrix?.should_have?.map((feat, idx) => (
                            <div key={idx} className="feature-item-card">
                              <div className="feature-card-top">
                                <span className="feature-cat-tag cat-should">{feat.category || 'Integration'}</span>
                                <div className="scores-pill">
                                  <span>Effort: <strong>{feat.effort_score || 5}/10</strong></span>
                                  <span>Impact: <strong className="score-med">{feat.impact_score || 7}/10</strong></span>
                                </div>
                              </div>
                              <h5 className="feature-name">{feat.feature_name}</h5>
                              <p className="feature-desc">{feat.description}</p>
                              {feat.user_value && (
                                <div className="feature-value-row value-should">
                                  <span className="val-icon">⚡</span>
                                  <span><strong>Value Add:</strong> {feat.user_value}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Could Have */}
                    {(moscowFilter === 'all' || moscowFilter === 'could') && (
                      <div className="glass-card moscow-col col-could animate-fade-in">
                        <div className="moscow-col-header">
                          <div className="col-indicator indicator-could"></div>
                          <div className="col-title-group">
                            <div className="col-title-row">
                              <h4 className="moscow-col-title">Could Have (Delight)</h4>
                              <span className="col-count-badge badge-could">{mvpData.moscow_matrix?.could_have?.length || 0} Features</span>
                            </div>
                            <span className="moscow-col-sub">Delight & virality features if sprint capacity allows</span>
                          </div>
                        </div>
                        <div className="moscow-items-list">
                          {mvpData.moscow_matrix?.could_have?.map((feat, idx) => (
                            <div key={idx} className="feature-item-card">
                              <div className="feature-card-top">
                                <span className="feature-cat-tag cat-could">{feat.category || 'Delight'}</span>
                                <div className="scores-pill">
                                  <span>Effort: <strong>{feat.effort_score || 4}/10</strong></span>
                                  <span>Impact: <strong className="score-could">{feat.impact_score || 6}/10</strong></span>
                                </div>
                              </div>
                              <h5 className="feature-name">{feat.feature_name}</h5>
                              <p className="feature-desc">{feat.description}</p>
                              {feat.user_value && (
                                <div className="feature-value-row value-could">
                                  <span className="val-icon">✨</span>
                                  <span><strong>Delight Factor:</strong> {feat.user_value}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Won't Have V1 */}
                    {(moscowFilter === 'all' || moscowFilter === 'wont') && (
                      <div className="glass-card moscow-col col-wont animate-fade-in">
                        <div className="moscow-col-header">
                          <div className="col-indicator indicator-wont"></div>
                          <div className="col-title-group">
                            <div className="col-title-row">
                              <h4 className="moscow-col-title">Won't Have (Scope Fence)</h4>
                              <span className="col-count-badge badge-wont">{mvpData.moscow_matrix?.wont_have_v1?.length || 0} Exclusions</span>
                            </div>
                            <span className="moscow-col-sub">Explicitly excluded to protect runway and prevent scope creep</span>
                          </div>
                        </div>
                        <div className="moscow-items-list">
                          {mvpData.moscow_matrix?.wont_have_v1?.map((feat, idx) => (
                            <div key={idx} className="feature-item-card wont-card">
                              <div className="feature-card-top">
                                <span className="feature-cat-tag cat-wont">Scope Fence</span>
                              </div>
                              <h5 className="feature-name">{feat.feature_name}</h5>
                              <div className="wont-rationale-box">
                                <span className="rationale-tag">Exclusion Rationale:</span>
                                <p className="feature-desc">{feat.rationale || feat.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phased Sprint Milestones */}
                {mvpData.sprint_roadmap && (
                  <div className="glass-card sprint-roadmap-card">
                    <div className="sprint-header">
                      <Icons.Sliders />
                      <h3 className="card-title">Lean 30-Day vs 60-Day Sprint Roadmap</h3>
                    </div>
                    <div className="sprint-phases-grid">
                      <div className="sprint-phase-box phase-1">
                        <div className="sprint-phase-badge">Phase 1: Days 1–30</div>
                        <h4 className="sprint-phase-title">Core Problem-Solution Fit & Beta Pilot</h4>
                        <p className="sprint-phase-desc">{mvpData.sprint_roadmap.phase_1_30_days}</p>
                      </div>
                      <div className="sprint-phase-box phase-2">
                        <div className="sprint-phase-badge">Phase 2: Days 31–60</div>
                        <h4 className="sprint-phase-title">Integrations, Analytics & Monetization</h4>
                        <p className="sprint-phase-desc">{mvpData.sprint_roadmap.phase_2_60_days}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB: Go-To-Market & Traction Playbook (Milestone 3)      */}
            {/* ======================================================== */}
            {activeTab === 'gtm' && gtmData && (
              <div className="tab-pane animate-fade-in">
                {/* GTM Summary & Value Positioning Canvas */}
                <div className="glass-card gtm-hero-card">
                  <div className="gtm-top-meta">
                    <Icons.Target />
                    <h3 className="pane-section-title">Strategic Value Positioning & Acquisition Flywheel</h3>
                  </div>
                  <p className="market-narrative">{gtmData.gtm_executive_summary}</p>

                  {/* Positioning Framework */}
                  {gtmData.positioning_statement && (
                    <div className="positioning-canvas-card">
                      <h4 className="pos-canvas-title">Core Positioning Statement</h4>
                      <div className="pos-elements-grid">
                        <div className="pos-item">
                          <span className="pos-label">FOR (Target Customer):</span>
                          <p className="pos-val">{gtmData.positioning_statement.for_target}</p>
                        </div>
                        <div className="pos-item">
                          <span className="pos-label">WHO (Struggle With):</span>
                          <p className="pos-val">{gtmData.positioning_statement.who_struggle_with}</p>
                        </div>
                        <div className="pos-item">
                          <span className="pos-label">OUR SOLUTION (Is):</span>
                          <p className="pos-val">{gtmData.positioning_statement.our_solution_is}</p>
                        </div>
                        <div className="pos-item">
                          <span className="pos-label">THAT (Delivers):</span>
                          <p className="pos-val">{gtmData.positioning_statement.that_delivers}</p>
                        </div>
                        <div className="pos-item pos-span-full">
                          <span className="pos-label">UNLIKE (Competitor Alternatives):</span>
                          <p className="pos-val">{gtmData.positioning_statement.unlike_competitors}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Acquisition Channels Breakdown */}
                {gtmData.acquisition_channels && (
                  <div className="glass-card channels-section-card">
                    <div className="channels-header">
                      <Icons.Globe />
                      <div>
                        <h3 className="card-title">Customer Acquisition Channels & CAC Dynamics</h3>
                        <p className="pane-subtext">Ranked channels with target conversion benchmarks and execution playbooks:</p>
                      </div>
                    </div>

                    <div className="channels-grid">
                      {gtmData.acquisition_channels.map((ch, cIdx) => (
                        <div key={cIdx} className="glass-card channel-card">
                          <div className="channel-card-top">
                            <span className="channel-type-tag">{ch.channel_type || 'Organic'}</span>
                            <span className={`channel-priority-pill priority-${(ch.priority || 'primary').toLowerCase()}`}>
                              {ch.priority || 'Primary'} Channel
                            </span>
                          </div>
                          <h4 className="channel-title">{ch.channel_name}</h4>
                          <div className="channel-metrics-row">
                            <div className="ch-metric">
                              <span className="ch-lbl">Est. CAC:</span>
                              <strong className="ch-val">{ch.estimated_cac}</strong>
                            </div>
                            <div className="ch-metric">
                              <span className="ch-lbl">Target Conversion:</span>
                              <strong className="ch-val text-emerald">{ch.expected_conversion_rate || '4.5% - 8.0%'}</strong>
                            </div>
                          </div>
                          <div className="channel-playbook-box">
                            <strong>Execution Playbook:</strong>
                            <p>{ch.tactical_playbook}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* First 100 Customers & Pricing Grid */}
                <div className="gtm-bottom-grid">
                  {/* First 100 Customers Checklist */}
                  {gtmData.first_100_customers_playbook && (
                    <div className="glass-card first100-card">
                      <div className="first100-header">
                        <Icons.Check />
                        <h3 className="card-title">"First 100 Customers" Tactical Playbook</h3>
                      </div>
                      <p className="pane-subtext">Actionable 4-step sequence to achieve initial beachhead velocity:</p>
                      <div className="playbook-steps-list">
                        {gtmData.first_100_customers_playbook.map((step, sIdx) => {
                          const stepContent = typeof step === 'string'
                            ? step
                            : (step.action || step.description || step.title || '');
                          return (
                            <div key={sIdx} className="playbook-step-row">
                              <span className="playbook-step-num">{sIdx + 1}</span>
                              <p className="playbook-step-text">{stepContent}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Pricing & Monetization Ladder */}
                  {gtmData.pricing_and_monetization_strategy && (
                    <div className="glass-card pricing-ladder-card">
                      <div className="pricing-header">
                        <Icons.Zap />
                        <div>
                          <h3 className="card-title">Pricing & Monetization Strategy</h3>
                          <span className="pricing-model-badge">{gtmData.pricing_and_monetization_strategy.model_type || 'Tiered SaaS'}</span>
                        </div>
                      </div>
                      <p className="pricing-rationale">{gtmData.pricing_and_monetization_strategy.rationale}</p>
                      
                      <div className="pricing-tiers-stack">
                        <div className="pricing-tier-row tier-starter">
                          <span className="tier-tag">Starter / Pilot</span>
                          <p>{gtmData.pricing_and_monetization_strategy.starter_tier}</p>
                        </div>
                        <div className="pricing-tier-row tier-growth highlight-tier">
                          <span className="tier-tag">Growth / Pro</span>
                          <p>{gtmData.pricing_and_monetization_strategy.growth_tier}</p>
                        </div>
                        <div className="pricing-tier-row tier-enterprise">
                          <span className="tier-tag">Enterprise / Custom</span>
                          <p>{gtmData.pricing_and_monetization_strategy.enterprise_tier}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: Viability & Moat Defensibility Radar */}
            {/* ======================================================== */}
            {activeTab === 'strategy' && insights && (
              <div className="tab-pane animate-fade-in">
                <div className="insights-dashboard-grid">
                  {/* Feasibility score ring */}
                  <div className="glass-card gauge-card">
                    <h3 className="widget-title">Market Viability Score</h3>
                    <div className="gauge-container">
                      <svg className="radial-gauge" viewBox="0 0 120 120">
                        <circle className="gauge-track" cx="60" cy="60" r="50" fill="none" strokeWidth="10" />
                        <circle className="gauge-fill" cx="60" cy="60" r="50" fill="none" strokeWidth="10" 
                          strokeDasharray="314"
                          strokeDashoffset={314 - (314 * insights.score) / 100}
                        />
                      </svg>
                      <div className="gauge-value">
                        <span className="gauge-number">{insights.score}</span>
                        <span className="gauge-percent">%</span>
                      </div>
                    </div>
                    <div className="score-label">Strong Venture Potential</div>
                    
                    {/* Sub-metrics */}
                    <div className="sub-metrics-list">
                      <div className="metric-row">
                        <span>Market Demand:</span>
                        <div className="mini-progress">
                          <div className="mini-progress-fill" style={{ width: `${insights.subScores.demand}%` }}></div>
                        </div>
                        <span className="metric-val">{insights.subScores.demand}%</span>
                      </div>
                      <div className="metric-row">
                        <span>Execution Risk:</span>
                        <div className="mini-progress">
                          <div className="mini-progress-fill risk-fill" style={{ width: `${100 - insights.subScores.viability}%` }}></div>
                        </div>
                        <span className="metric-val">{100 - insights.subScores.viability}%</span>
                      </div>
                      <div className="metric-row">
                        <span>Growth Velocity:</span>
                        <div className="mini-progress">
                          <div className="mini-progress-fill growth-fill" style={{ width: `${insights.subScores.competition}%` }}></div>
                        </div>
                        <span className="metric-val">{insights.subScores.competition}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Pitch Copilot Generator Widget */}
                  <div className="glass-card copilot-card">
                    <h3 className="widget-title">Executive Pitch & Strategy Copilot</h3>
                    <div className="copilot-tabs">
                      <button 
                        type="button"
                        onClick={() => setPitchTab('pitch')} 
                        className={`copilot-tab-btn ${pitchTab === 'pitch' ? 'active' : ''}`}
                      >
                        Elevator Pitch
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPitchTab('icp')} 
                        className={`copilot-tab-btn ${pitchTab === 'icp' ? 'active' : ''}`}
                      >
                        Target Customer Profile
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPitchTab('gtm')} 
                        className={`copilot-tab-btn ${pitchTab === 'gtm' ? 'active' : ''}`}
                      >
                        Launch Strategy
                      </button>
                    </div>
                    
                    <div className="copilot-content">
                      {pitchTab === 'pitch' && (
                        <div className="copilot-pane animate-fade-in">
                          <p className="pitch-text">"{insights.pitch.elevatorPitch}"</p>
                          <div className="pitch-tip"><strong>Strategic Note:</strong> Optimized for landing pages, initial pitch decks, and investor summaries.</div>
                        </div>
                      )}
                      {pitchTab === 'icp' && (
                        <div className="copilot-pane animate-fade-in">
                          <div className="icp-item">
                            <strong>Ideal Buyer Profile:</strong>
                            <p>{insights.pitch.idealCustomerProfile.buyerPersona}</p>
                          </div>
                          <div className="icp-item">
                            <strong>Core Friction Point:</strong>
                            <p>{insights.pitch.idealCustomerProfile.primaryPainPoint}</p>
                          </div>
                          <div className="icp-item">
                            <strong>Conversion Trigger:</strong>
                            <p>{insights.pitch.idealCustomerProfile.keyTriggers}</p>
                          </div>
                        </div>
                      )}
                      {pitchTab === 'gtm' && (
                        <div className="copilot-pane animate-fade-in">
                          <ul className="gtm-list">
                            {insights.pitch.goToMarket.map((step, idx) => (
                              <li key={idx}>
                                <span className="gtm-badge">Phase {idx + 1}</span>
                                <span className="gtm-desc">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Venture Moat & Defensibility Radar Breakdown */}
                <div className="glass-card moat-card">
                  <div className="moat-header">
                    <Icons.Shield />
                    <h3 className="card-title">Venture Moat & Long-Term Defensibility Radar</h3>
                  </div>
                  <p className="moat-subtitle">Quantitative assessment of durable competitive advantages against legacy incumbents and Big Tech foundation models:</p>

                  <div className="moat-grid">
                    {insights.moats.map((moat, mIdx) => (
                      <div key={mIdx} className="moat-item-card">
                        <div className="moat-top">
                          <span className="moat-title">{moat.pillar}</span>
                          <span className="moat-score">{moat.score}%</span>
                        </div>
                        <div className="moat-progress">
                          <div className="moat-progress-fill" style={{ width: `${moat.score}%` }}></div>
                        </div>
                        <p className="moat-desc">{moat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB: Executive Validation Report & Multi-Format Exports (M4) */}
            {/* ======================================================== */}
            {activeTab === 'report' && (
              <div className="tab-pane animate-fade-in">
                <div className="glass-card report-dossier-wrapper">
                  <div className="report-header-toolbar">
                    <div className="report-header-info">
                      <div className="report-badge-row">
                        <span className="report-tag-badge">MILESTONE 4 • EXECUTIVE VALIDATION REPORT</span>
                        <span className="report-status-pill">● Publication Ready</span>
                      </div>
                      <h3 className="report-main-heading">
                        {searchResult.validation_report?.report_title || `Executive Startup Validation Dossier: ${searchResult.startup_idea}`}
                      </h3>
                      <p className="report-meta-line">
                        <strong>Vertical:</strong> {searchResult.industry} &nbsp;•&nbsp; 
                        <strong>Target Audience:</strong> {searchResult.target_market} &nbsp;•&nbsp; 
                        <strong>Generated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="report-action-buttons">
                      <button 
                        type="button" 
                        onClick={handleDownloadMarkdownReport} 
                        className="btn btn-export-primary"
                        title="Download publication-ready .md file"
                      >
                        <Icons.Download />
                        <span>Download Markdown (.md)</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={handleDownloadJsonDossier} 
                        className="btn btn-export-secondary"
                        title="Export complete structured JSON data"
                      >
                        <Icons.Layers />
                        <span>Export JSON</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={handlePrintPDF} 
                        className="btn btn-print-pdf"
                        title="Print or export clean browser PDF"
                      >
                        <Icons.Download />
                        <span>Print / Save PDF</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={handleCopyInvestmentMemo} 
                        className="btn btn-export-memo"
                        title="Copy formatted markdown to clipboard"
                      >
                        <Icons.Copy />
                        <span>Copy Memo</span>
                      </button>
                    </div>
                  </div>

                  {/* Executive Scorecard Metric Cards Grid */}
                  <div className="scorecard-metrics-grid">
                    <div className="scorecard-metric-card metric-feasibility">
                      <div className="scorecard-card-top">
                        <span className="scorecard-metric-label">Overall Feasibility</span>
                        <span className="scorecard-metric-badge badge-green">High Potential</span>
                      </div>
                      <div className="scorecard-metric-val">
                        {searchResult.validation_report?.executive_scorecard?.overall_feasibility_score || insights?.score || 88}%
                      </div>
                      <p className="scorecard-metric-sub">Weighted multi-agent technical & commercial viability index</p>
                    </div>

                    <div className="scorecard-metric-card metric-market">
                      <div className="scorecard-card-top">
                        <span className="scorecard-metric-label">Market Opportunity</span>
                        <span className="scorecard-metric-badge badge-blue">
                          {marketData?.market_size_and_growth?.cagr_growth_rate || '18.4%'} CAGR
                        </span>
                      </div>
                      <div className="scorecard-metric-val">
                        {marketData?.market_size_and_growth?.tam_estimate || '$14.2B'}
                      </div>
                      <p className="scorecard-metric-sub">Total addressable market ceiling with strong secular tailwinds</p>
                    </div>

                    <div className="scorecard-metric-card metric-defensibility">
                      <div className="scorecard-card-top">
                        <span className="scorecard-metric-label">Defensibility Moat</span>
                        <span className="scorecard-metric-badge badge-purple">High Retention</span>
                      </div>
                      <div className="scorecard-metric-val">
                        {searchResult.validation_report?.executive_scorecard?.defensibility_score || 84}%
                      </div>
                      <p className="scorecard-metric-sub">Proprietary workflow embedding & vertical switching costs</p>
                    </div>

                    <div className="scorecard-metric-card metric-risk">
                      <div className="scorecard-card-top">
                        <span className="scorecard-metric-label">Overall Risk Level</span>
                        <span className="scorecard-metric-badge badge-amber">Mitigated</span>
                      </div>
                      <div className="scorecard-metric-val">
                        {swotData?.overall_risk_score ? `${swotData.overall_risk_score}/100` : '24/100'}
                      </div>
                      <p className="scorecard-metric-sub">4-category risk exposure with structured action playbooks</p>
                    </div>
                  </div>

                  {/* Formatted Executive Report Content Pane */}
                  <div className="report-markdown-preview">
                    <div className="report-preview-header">
                      <div className="preview-header-left">
                        <Icons.Terminal />
                        <span>Compiled Validation Dossier Content</span>
                      </div>
                      <span className="preview-chars-count">
                        {(searchResult.validation_report?.markdown_report || '').length || 14200} characters synthesized
                      </span>
                    </div>

                    <div className="report-preview-body">
                      {/* 1. Executive Summary */}
                      <div className="report-section-block">
                        <h4 className="report-sec-title">1. Executive Summary & Market Narrative</h4>
                        <p className="report-sec-text">
                          {searchResult.answer || marketData?.market_summary || 'Validated market opportunity with multi-agent intelligence.'}
                        </p>
                      </div>

                      {/* 2. Market Sizing & Bounds */}
                      <div className="report-section-block">
                        <h4 className="report-sec-title">2. Market Sizing (TAM / SAM / SOM)</h4>
                        <div className="report-table-wrapper">
                          <table className="report-clean-table">
                            <thead>
                              <tr>
                                <th>Metric</th>
                                <th>Estimated Value</th>
                                <th>Strategic Context</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td><strong>TAM (Total Addressable)</strong></td>
                                <td><span className="table-highlight-blue">{marketData?.market_size_and_growth?.tam_estimate || '$14.2 Billion'}</span></td>
                                <td>Global addressable potential across all segments</td>
                              </tr>
                              <tr>
                                <td><strong>SAM (Serviceable Addressable)</strong></td>
                                <td><span className="table-highlight-purple">{marketData?.market_size_and_growth?.sam_estimate || '$3.8 Billion'}</span></td>
                                <td>Reachable market slice based on current domain focus</td>
                              </tr>
                              <tr>
                                <td><strong>SOM (Beachhead Capture)</strong></td>
                                <td><span className="table-highlight-green">{marketData?.market_size_and_growth?.som_estimate || '$280 Million'}</span></td>
                                <td>Year 1-3 targeted revenue capture target</td>
                              </tr>
                              <tr>
                                <td><strong>CAGR Growth Rate</strong></td>
                                <td><span className="table-highlight-amber">{marketData?.market_size_and_growth?.cagr_growth_rate || '18.4%'}</span></td>
                                <td>Projected annual compound industry growth trajectory</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* 3. Competitive White Spaces & Moats */}
                      <div className="report-section-block">
                        <h4 className="report-sec-title">3. Competitive White Spaces & Differentiators</h4>
                        <ul className="report-bullets-list">
                          {competitorData?.market_gaps_and_white_space?.map((gap, gIdx) => (
                            <li key={gIdx}>
                              <strong>White Space #{gIdx + 1}:</strong> {gap}
                            </li>
                          )) || (
                            <li><strong>White Space #1:</strong> Unserved specialized vertical automation tier.</li>
                          )}
                        </ul>
                      </div>

                      {/* 4. SWOT & Strategic Risks */}
                      <div className="report-section-block">
                        <h4 className="report-sec-title">4. Strategic SWOT & Risk Mitigation Summary</h4>
                        <div className="report-swot-summary-grid">
                          <div className="report-swot-mini-card">
                            <strong className="swot-mini-label text-green">Key Strengths:</strong>
                            <p>{swotData?.swot?.strengths?.[0]?.title ? `${swotData.swot.strengths[0].title}: ${swotData.swot.strengths[0].description}` : 'Vertical domain expertise and data flywheel.'}</p>
                          </div>
                          <div className="report-swot-mini-card">
                            <strong className="swot-mini-label text-amber">Key Mitigated Risk:</strong>
                            <p>{swotData?.risk_assessment?.[0]?.category ? `${swotData.risk_assessment[0].category} Risk: ${swotData.risk_assessment[0].mitigation_strategy}` : 'Phased beta rollouts to mitigate customer adoption friction.'}</p>
                          </div>
                        </div>
                      </div>

                      {/* 5. MVP MoSCoW Backlog */}
                      <div className="report-section-block">
                        <h4 className="report-sec-title">5. MVP Feature Prioritization (MoSCoW Core)</h4>
                        <div className="report-moscow-pills-row">
                          {mvpData?.moscow_matrix?.must_have?.map((feat, fIdx) => (
                            <div key={fIdx} className="report-feat-pill">
                              <span className="feat-pill-must">MUST-HAVE</span>
                              <strong className="feat-pill-name">{feat.feature_name}</strong>
                              <span className="feat-pill-effort">Effort: {feat.effort_score}/10 • Impact: {feat.impact_score}/10</span>
                            </div>
                          )) || (
                            <div className="report-feat-pill">
                              <span className="feat-pill-must">MUST-HAVE</span>
                              <strong className="feat-pill-name">Core AI Automation Loop</strong>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 6. GTM First 100 Playbook */}
                      <div className="report-section-block">
                        <h4 className="report-sec-title">6. Go-To-Market & First 100 Customers Traction</h4>
                        <p className="report-positioning-quote">
                          <em>"{gtmData?.positioning_statement?.our_solution_is || 'For forward-thinking teams, our platform delivers instant vertical automation.'}"</em>
                        </p>
                        <div className="report-gtm-playbook-steps">
                          {gtmData?.first_100_customers_playbook && gtmData.first_100_customers_playbook.length > 0 ? (
                            gtmData.first_100_customers_playbook.map((step, sIdx) => {
                              let stepTitle = `Milestone Step ${sIdx + 1}`;
                              let stepAction = '';

                              if (typeof step === 'object' && step !== null) {
                                stepTitle = step.title || step.step_name || `Step ${step.step_number || sIdx + 1}`;
                                stepAction = step.action || step.description || step.tactical_playbook || '';
                              } else if (typeof step === 'string') {
                                if (step.includes(':')) {
                                  const colonIdx = step.indexOf(':');
                                  stepTitle = step.substring(0, colonIdx).replace(/^Step\s*\d+\s*[:-]?\s*/i, '').trim() || `Step ${sIdx + 1}`;
                                  stepAction = step.substring(colonIdx + 1).trim();
                                } else {
                                  stepTitle = `Phase ${sIdx + 1} Tactic`;
                                  stepAction = step;
                                }
                              }

                              return (
                                <div key={sIdx} className="report-gtm-step-item">
                                  <span className="gtm-step-badge">Step {sIdx + 1}</span>
                                  <div className="gtm-step-content">
                                    <strong className="gtm-step-title">{stepTitle}</strong>
                                    <p className="gtm-step-desc">{stepAction || (typeof step === 'string' ? step : '')}</p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="report-gtm-step-item">
                              <span className="gtm-step-badge">Step 1</span>
                              <div className="gtm-step-content">
                                <strong className="gtm-step-title">Targeted Founder Design Partnerships</strong>
                                <p className="gtm-step-desc">Onboard 10-15 key pilot accounts with white-glove setup.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: Interactive 6-Slide Pitch Deck Generator */}
            {/* ======================================================== */}
            {activeTab === 'pitchdeck' && pitchSlides.length > 0 && (
              <div className="tab-pane animate-fade-in">
                <div className="glass-card pitch-deck-wrapper">
                  <div className="deck-header">
                    <div>
                      <div className="deck-eyebrow">
                        <Icons.Presentation />
                        <span>Investor Pitch Deck Generator</span>
                      </div>
                      <h3 className="card-title">6-Slide Venture Capital Deck Preview</h3>
                      <p className="deck-subtext">Interactive, slide-by-slide investor deck synthesized directly from autonomous agent validation:</p>
                    </div>
                    <button type="button" onClick={handleCopyPitchDeck} className="btn btn-export-memo">
                      <Icons.Copy />
                      <span>Copy Full Slide Deck</span>
                    </button>
                  </div>

                  {/* Slide Carousel Viewer */}
                  <div className="slide-viewer-box">
                    <div className="slide-card animate-fade-in">
                      <div className="slide-top-bar">
                        <span className="slide-tag-badge">{pitchSlides[activeSlideIndex].tag}</span>
                        <span className="slide-counter">Slide {pitchSlides[activeSlideIndex].slideNumber} / 06</span>
                      </div>
                      <h2 className="slide-main-title">{pitchSlides[activeSlideIndex].title}</h2>
                      
                      <div className="slide-points-list">
                        {pitchSlides[activeSlideIndex].points.map((pt, pIdx) => (
                          <div key={pIdx} className="slide-point-item">
                            <span className="point-bullet"><Icons.Check /></span>
                            <p>{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Slide Navigation Controls */}
                    <div className="slide-nav-controls">
                      <button 
                        type="button" 
                        disabled={activeSlideIndex === 0} 
                        onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                        className="btn btn-secondary slide-prev-btn"
                      >
                        ← Previous Slide
                      </button>

                      <div className="slide-dot-indicators">
                        {pitchSlides.map((_, idx) => (
                          <span 
                            key={idx} 
                            className={`slide-dot ${idx === activeSlideIndex ? 'active' : ''}`}
                            onClick={() => setActiveSlideIndex(idx)}
                          ></span>
                        ))}
                      </div>

                      <button 
                        type="button" 
                        disabled={activeSlideIndex === pitchSlides.length - 1} 
                        onClick={() => setActiveSlideIndex(prev => Math.min(pitchSlides.length - 1, prev + 1))}
                        className="btn btn-primary slide-next-btn"
                      >
                        Next Slide →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 5: Web Evidence & Sources */}
            {/* ======================================================== */}
            {activeTab === 'sources' && (
              <div className="tab-pane animate-fade-in">
                <div className="web-results-section">
                  {/* High-End Search Query Formulation & Grounding Architecture Card */}
                  <div className="glass-card search-formulation-card">
                    <div className="formulation-header">
                      <div className="formulation-title-group">
                        <div className="formulation-icon-box">
                          <Icons.Globe />
                        </div>
                        <div>
                          <div className="formulation-badge-row">
                            <span className="formulation-tag">Multi-Vector Grounding</span>
                            <span className="formulation-status-chip">
                              <span className="pulse-dot-cyan"></span>
                              Agent Formulated
                            </span>
                          </div>
                          <h3 className="pane-section-title" style={{ margin: 0 }}>Verified Web Intelligence Sources</h3>
                        </div>
                      </div>
                      
                      <button 
                        type="button" 
                        className="btn-copy-query"
                        onClick={() => {
                          if (searchResult.query) {
                            navigator.clipboard.writeText(searchResult.query);
                            setQueryCopied(true);
                            setTimeout(() => setQueryCopied(false), 2000);
                          }
                        }}
                      >
                        {queryCopied ? (
                          <>
                            <Icons.Check />
                            <span>Copied Query</span>
                          </>
                        ) : (
                          <>
                            <Icons.Terminal />
                            <span>Copy Formulated Query</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Structured Query Parameters Matrix */}
                    <div className="query-breakdown-grid">
                      <div className="query-param-box param-concept">
                        <span className="param-label">🎯 Targeted Venture Concept:</span>
                        <p className="param-val">"{searchResult.startup_idea}"</p>
                      </div>
                      <div className="query-param-box param-industry">
                        <span className="param-label">🏢 Industry Sector:</span>
                        <p className="param-val">{searchResult.industry}</p>
                      </div>
                      <div className="query-param-box param-market">
                        <span className="param-label">👥 Target Audience / ICP:</span>
                        <p className="param-val">{searchResult.target_market}</p>
                      </div>
                    </div>

                    {/* Formulated Keyword Directives Chips */}
                    <div className="query-directives-row">
                      <span className="directives-label">Formulated Search Vectors:</span>
                      <div className="directives-chips-wrap">
                        <span className="directive-chip">Top Competitors</span>
                        <span className="directive-chip">Market Size & TAM</span>
                        <span className="directive-chip">Pricing & Monetization</span>
                        <span className="directive-chip">Customer Reviews & Sentiment</span>
                        <span className="directive-chip">Regulatory & Risk Factors</span>
                      </div>
                    </div>

                    {/* Full Compiled Syntax Code Terminal */}
                    <div className="compiled-query-terminal">
                      <div className="terminal-top-bar">
                        <div className="terminal-dots">
                          <span className="tdot tdot-red"></span>
                          <span className="tdot tdot-yellow"></span>
                          <span className="tdot tdot-green"></span>
                        </div>
                        <span className="terminal-title">COMPILED SEARCH QUERY (MULTI-VECTOR SYNTAX)</span>
                      </div>
                      <div className="terminal-code-body">
                        <code>
                          <span className="tok-keyword">QUERY:</span> {searchResult.query}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Web Results Cards Grid */}
                  {searchResult.results && searchResult.results.length > 0 ? (
                    <div className="results-grid">
                      {searchResult.results.map((result, index) => (
                        <div key={index} className="glass-card result-item-card">
                          <div className="result-header">
                            <span className="result-number">Source {index + 1}</span>
                            {result.score > 0 && (
                              <span className="result-score">Relevance: {Math.round(result.score * 100)}%</span>
                            )}
                          </div>
                          <h4 className="result-title">{result.title}</h4>
                          <p className="result-snippet">{formatWebSnippet(result.content)}</p>
                          {result.url && result.url !== '#' && (
                            <a 
                              href={result.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="result-link-btn"
                            >
                              <span>Explore Source</span>
                              <Icons.ArrowRight />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass-card empty-card">
                      <p>No web records returned for this specific search query.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 6: Pipeline Logs */}
            {/* ======================================================== */}
            {activeTab === 'logs' && pipelineMeta && (
              <div className="tab-pane animate-fade-in">
                <div className="glass-card logs-card">
                  <div className="logs-header">
                    <div className="logs-header-left">
                      <div className="logs-icon-badge">
                        <Icons.Activity />
                      </div>
                      <div>
                        <h3 className="pane-section-title">Agent Pipeline Execution Audit Trail</h3>
                        <p className="logs-subheading">Autonomous multi-agent telemetry, latency metrics, and execution sequence</p>
                      </div>
                    </div>
                    <div className="logs-header-badges">
                      <span className="logs-agent-count-badge">
                        <Icons.Layers /> {pipelineMeta.execution_logs?.length || 0} Agent Cycles
                      </span>
                      <span className="total-time-badge">
                        <Icons.Clock /> Total: {pipelineMeta.total_duration_sec}s
                      </span>
                    </div>
                  </div>
                  <div className="logs-timeline">
                    {pipelineMeta.execution_logs?.map((log, lIdx) => (
                      <div key={lIdx} className="log-entry">
                        <div className="log-marker">
                          <span>{log.step}</span>
                        </div>
                        <div className="log-details">
                          <div className="log-top">
                            <div className="log-agent-meta">
                              <strong className="log-agent">{log.agent}</strong>
                              <span className="log-step-badge">Stage {log.step}</span>
                            </div>
                            <div className="log-status-wrap">
                              <span className={`log-status-tag status-${(log.status || 'success').toLowerCase()}`}>
                                <span className="status-dot"></span>
                                {log.status?.toUpperCase() || 'COMPLETED'}
                              </span>
                              <span className="log-duration">
                                <Icons.Clock /> {log.duration_sec}s
                              </span>
                            </div>
                          </div>
                          <div className="log-message-box">
                            <p className="log-message">{log.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Interactive Venture AI Copilot Widget */}
      {searchResult && (
        <div className="copilot-floating-container">
          {!isCopilotOpen ? (
            <button 
              type="button" 
              className="copilot-launch-fab animate-fade-in"
              onClick={() => setIsCopilotOpen(true)}
            >
              <Icons.MessageSquare />
              <span>Ask Venture Copilot</span>
              <span className="fab-pulse-dot"></span>
            </button>
          ) : (
            <div className="copilot-chat-modal animate-fade-in">
              <div className="copilot-chat-header">
                <div className="copilot-head-left">
                  <span className="copilot-avatar"><Icons.Sparkle /></span>
                  <div>
                    <strong>Venture AI Copilot</strong>
                    <span className="copilot-subhead">Context-Aware Advisory</span>
                  </div>
                </div>
                <button type="button" onClick={() => setIsCopilotOpen(false)} className="copilot-close-btn">✕</button>
              </div>

              {/* Starter Prompt Pills */}
              <div className="copilot-starters">
                <button type="button" onClick={() => handleSendCopilotMessage("How should I price this to maximize Year-1 ARR?")}>
                  💡 Pricing Model?
                </button>
                <button type="button" onClick={() => handleSendCopilotMessage("What is the best GTM channel to acquire the first 100 users?")}>
                  🚀 GTM Acquisition?
                </button>
                <button type="button" onClick={() => handleSendCopilotMessage("How do we protect against foundation model updates from Big Tech?")}>
                  🛡️ Defense against Big Tech?
                </button>
              </div>

              {/* Message Thread */}
              <div className="copilot-messages-box">
                {copilotMessages.map((msg, idx) => (
                  <div key={idx} className={`copilot-msg ${msg.role}`}>
                    <div className="msg-bubble">
                      {msg.role === 'assistant' ? renderCopilotMessage(msg.text) : <p>{msg.text}</p>}
                    </div>
                  </div>
                ))}
                {copilotThinking && (
                  <div className="copilot-msg assistant">
                    <div className="msg-bubble thinking-bubble">
                      <span className="thinking-dots">Synthesizing venture advisory...</span>
                    </div>
                  </div>
                )}
                <div ref={copilotEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendCopilotMessage()
                }} 
                className="copilot-input-bar"
              >
                <input 
                  type="text" 
                  placeholder="Ask about unit economics, GTM, or defensibility..."
                  value={copilotInput}
                  onChange={(e) => setCopilotInput(e.target.value)}
                />
                <button type="submit" className="copilot-send-btn" disabled={!copilotInput.trim()}>
                  <Icons.Send />
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Footer Section */}
      <footer className="app-footer">
        <p>© 2026 VenturePulse. All rights reserved. • AI Startup Idea Validator & Market Intelligence</p>
      </footer>
    </div>
  )
}

export default App
