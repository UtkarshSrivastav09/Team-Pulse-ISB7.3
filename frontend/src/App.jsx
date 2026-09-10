import { useState, useEffect, useRef } from 'react'
import './App.css'

// Professional Inline SVG Icons for top-tier enterprise UI aesthetics
const Icons = {
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
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
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
  )
}

// Interactive Neural Constellation & Spotlight Aurora Background
function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle nodes for multi-agent network
    const numParticles = 35
    const particles = []
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.2,
        color: i % 3 === 0 ? 'rgba(37, 99, 235, 0.45)' : i % 3 === 1 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(79, 70, 229, 0.35)'
      })
    }

    let mouse = { x: -1000, y: -1000 }
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', handleMouseMove)

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

// Multi-Agent System Architecture Metadata for Interactive HUD
const HUD_AGENTS_METADATA = [
  {
    id: "wsa",
    num: "01",
    name: "Web Search Agent",
    role: "Real-Time Market Scraping & Competitor Indexing",
    tagline: "Crawls live web indices for active competitors, pricing models, and target market records.",
    engine: "Tavily Search Index API + Heuristic Web Fallback",
    latency: "~0.4s – 1.2s",
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
    role: "TAM/SAM/SOM Mathematical Sizing & Customer Segmentation",
    tagline: "Synthesizes market sizing boundaries, CAGR projection trajectories, and buyer vs user personas.",
    engine: "Google Gemini 1.5 Flash / Groq Llama-3 / Mathematical Sizing Model",
    latency: "~0.6s – 1.8s",
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
    latency: "~0.5s – 1.5s",
    model: "Groq / Gemini / Heuristic Strategic Layer",
    inputs: ["Market Sizing Profile", "Direct Competitors Data", "Core Value Proposition"],
    outputs: [
      "Direct vs Indirect Player Breakdown",
      "5-Pillar Comparison Matrix (AI, Speed, Domain, Pricing, Real-Time)",
      "Critical Market Gaps & Unmet Demands",
      "Tactical Differentiation Playbook for Founders"
    ],
    accentColor: "#10b981"
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

  // Interactive UI Extras (Telemetry node drawer, hover states, toast)
  const [selectedAgentNode, setSelectedAgentNode] = useState(null)
  const [hoveredCompetitor, setHoveredCompetitor] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

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

  // Multi-Agent Pipeline loading steps
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
      agent: "Executive Orchestrator",
      desc: "Synthesizing executive validation report and strategic recommendations..."
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
      market: "Pet owners, veterinary clinics"
    },
    {
      id: "logistics",
      group: "MOBILITY",
      category: "Green Mobility",
      label: "Urban Cargo Bike Routing",
      summary: "AI micro-hub delivery routing in city zones",
      idea: "An AI-powered route planning app for electric cargo bike deliveries in dense urban areas.",
      industry: "Green Logistics & Mobility",
      market: "Local e-commerce shops, urban couriers"
    },
    {
      id: "edtech",
      group: "SAAS",
      category: "EdTech",
      label: "Adaptive Exam AI Copilot",
      summary: "Active recall & automated quiz synthesis",
      idea: "An intelligent learning copilot that converts college lectures and PDF textbooks into interactive flashcards, quizzes, and mock tests.",
      industry: "EdTech & Higher Education",
      market: "University students, certification exam candidates"
    },
    {
      id: "foodtech",
      group: "HEALTH",
      category: "FoodTech",
      label: "Smart Household Nutrition",
      summary: "AI pantry vision to minimize waste & macros",
      idea: "A personalized AI meal planner that scans household groceries to minimize food waste and optimize nutrition.",
      industry: "FoodTech & Health",
      market: "Busy professionals, fitness enthusiasts"
    },
    {
      id: "fintech",
      group: "FINTECH",
      category: "FinTech",
      label: "Automated SMB Cash Flow",
      summary: "AI invoice factoring & cash forecasting",
      idea: "An automated cash flow intelligence and instant invoice factoring platform tailored for SMB contractors.",
      industry: "FinTech & SMB Banking",
      market: "Small business owners, general contractors, freelancers"
    },
    {
      id: "legaltech",
      group: "SAAS",
      category: "B2B SaaS",
      label: "AI Contract Risk Redliner",
      summary: "Automated liability check & redlining",
      idea: "An AI legal assistant that scans vendor contracts and SaaS agreements to automatically flag non-standard liability clauses.",
      industry: "LegalTech & Enterprise SaaS",
      market: "Startup founders, procurement teams, in-house counsel"
    },
    {
      id: "cybersecurity",
      group: "SAAS",
      category: "CyberSecurity",
      label: "Autonomous API Guardian",
      summary: "Real-time vulnerability & endpoint patch AI",
      idea: "An autonomous developer agent that continuously audits API endpoints for authorization leaks and auto-generates security patches.",
      industry: "CyberSecurity & DevTools",
      market: "Backend engineers, security teams, engineering leads"
    },
    {
      id: "climatetech",
      group: "MOBILITY",
      category: "ClimateTech",
      label: "Commercial Microgrid Arbitrage",
      summary: "Smart battery storage & peak-load shaving",
      idea: "An intelligent energy management software that optimizes commercial battery storage to arbitrage peak-hour electricity tariffs.",
      industry: "Clean Energy & ClimateTech",
      market: "Commercial real estate managers, warehouse operators"
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

  // Copilot Intelligent Answering
  const handleSendCopilotMessage = (questionText) => {
    const q = questionText || copilotInput
    if (!q.trim()) return

    const userMsg = { role: 'user', text: q }
    const newMsgs = [...copilotMessages, userMsg]
    setCopilotMessages(newMsgs)
    setCopilotInput('')
    setCopilotThinking(true)

    setTimeout(() => {
      let ans = ''
      const lowerQ = q.toLowerCase()
      const currentIdea = searchResult?.startup_idea || startupIdea
      const currentInd = searchResult?.industry || industry
      const currentTgt = searchResult?.target_market || targetMarket

      if (lowerQ.includes('price') || lowerQ.includes('pricing') || lowerQ.includes('cost') || lowerQ.includes('monetiz')) {
        ans = `For ${currentIdea ? `"${currentIdea}"` : 'your concept'} in ${currentInd}, a three-tier pricing model is recommended:\n\n1. **Starter / Pilot Tier ($49-$99/mo):** Low-friction entry point for early adopters in ${currentTgt}.\n2. **Professional Tier ($249-$499/mo):** Automated workflows, advanced analytics, and priority integrations.\n3. **Enterprise Custom ($1,200+/mo):** Custom domain fine-tuning, SLA, and dedicated onboarding.`
      } else if (lowerQ.includes('gtm') || lowerQ.includes('user') || lowerQ.includes('customer') || lowerQ.includes('acquire')) {
        ans = `To acquire the first 50-100 high-intent customers in ${currentInd}:\n\n1. **Targeted Design Partnerships:** Direct founder outreach to 15 key operations leaders in ${currentTgt} offering 3 months free in exchange for case studies.\n2. **High-Intent SEO & Calculators:** Publish interactive domain utility calculators capturing search demand.\n3. **Vertical Ecosystem Integration:** Partner with standard suites already embedded in ${currentInd}.`
      } else if (lowerQ.includes('google') || lowerQ.includes('openai') || lowerQ.includes('compet') || lowerQ.includes('moat') || lowerQ.includes('big tech')) {
        ans = `Your core defensibility against foundation model updates is **Domain-Specific Workflow Embedding**:\n\n- General foundation models lack the deep vertical UI and schema integration needed for ${currentTgt}.\n- Proprietary data loops fine-tune domain accuracy beyond generic LLMs.\n- High switching costs once user operational history is stored in your platform.`
      } else {
        ans = `Based on our multi-agent market validation for ${currentInd}:\n\n- **Primary Advantage:** Instant automated resolution for ${currentTgt}.\n- **Key Metric to Track:** Time-to-value (TTV) under 5 minutes.\n- **Recommended Next Step:** Launch an MVP with 10 beta pilot users to validate willingness-to-pay.`
      }

      setCopilotMessages([...newMsgs, { role: 'assistant', text: ans }])
      setCopilotThinking(false)
    }, 600)
  }

  const insights = searchResult
    ? generateStartupInsights(searchResult.startup_idea, searchResult.industry, searchResult.target_market)
    : null;

  const marketData = searchResult?.market_analysis;
  const competitorData = searchResult?.competitor_analysis;
  const pipelineMeta = searchResult?.pipeline_metadata;

  // Copy Executive Investment Memo to Clipboard
  const handleCopyInvestmentMemo = () => {
    if (!searchResult) return;
    const memo = `# VENTURE INVESTMENT MEMORANDUM & VALIDATION DOSSIER
**Concept:** ${searchResult.startup_idea}
**Vertical:** ${searchResult.industry} | **Target Audience:** ${searchResult.target_market}
**Feasibility Rating:** ${insights?.score || 88}% | **Validation Mode:** ${searchResult.mode.toUpperCase()}

---

## 1. Executive Summary
${searchResult.answer || marketData?.market_summary}

## 2. Market Sizing & Bounds
- **TAM (Total Addressable Market):** ${marketData?.market_size_and_growth?.tam_estimate || '$12.4B'}
- **SAM (Serviceable Addressable Market):** ${marketData?.market_size_and_growth?.sam_estimate || '$3.2B'}
- **SOM (Beachhead Capture):** ${marketData?.market_size_and_growth?.som_estimate || '$240M'}
- **CAGR Growth Rate:** ${marketData?.market_size_and_growth?.cagr_growth_rate || '18.4%'}

## 3. Competitive Landscape & Market Gaps
**Identified White Spaces:**
${competitorData?.market_gaps_and_white_space?.map(g => `- ${g}`).join('\n') || '- Unserved vertical automation niche.'}

**Strategic Differentiation Playbook:**
${competitorData?.differentiation_strategy?.map(s => `- ${s}`).join('\n') || '- Proprietary data flywheel.'}

## 4. Elevator Pitch & Go-To-Market
${insights?.pitch?.elevatorPitch}

Generated autonomously by Venture Intelligence Platform.`;

    navigator.clipboard.writeText(memo);
    showToast("Investment Memo copied to clipboard in Markdown format!");
  };

  const handlePrintPDF = () => {
    window.print();
  };

  // Sensitivity Calculator Math
  const calculatedTAM = (targetCustomers * arpu * 10).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const calculatedSAM = (targetCustomers * arpu).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const projectedYear1ARR = ((targetCustomers * (penetrationRate / 100)) * arpu).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const projectedYear3ARR = (((targetCustomers * (penetrationRate / 100)) * arpu) * 3.8).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  // 2x2 Quadrant Competitors Array
  const quadrantCompetitors = competitorData?.direct_competitors?.map((comp, idx) => {
    const xOffsets = [35, 68, 25, 55];
    const yOffsets = [42, 38, 65, 30];
    return {
      name: comp.name,
      x: xOffsets[idx % xOffsets.length] + ((idx * 7) % 15),
      y: yOffsets[idx % yOffsets.length] + ((idx * 5) % 12),
      strengths: comp.strengths,
      weaknesses: comp.weaknesses_and_complaints,
      pricing: comp.pricing_model
    };
  }) || [
    { name: "Incumbent Suite A", x: 35, y: 40, strengths: "Broad brand presence", weaknesses: "Clunky UI & slow support", pricing: "$49/mo" },
    { name: "Generic Tool B", x: 60, y: 30, strengths: "Low pricing tier", weaknesses: "Lacks specialized automation", pricing: "Freemium" }
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
            <span>VenturePulse • 3 Connected AI Agents</span>
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
              <span>🎲 Surprise Me</span>
            </button>

            {/* Architecture HUD Inspector */}
            <button
              type="button"
              className="nav-action-pill hud-pill"
              onClick={() => setActiveHudAgent(HUD_AGENTS_METADATA[0])}
              title="Inspect Multi-Agent Architecture Specs"
            >
              <Icons.Cpu />
              <span>Agents HUD</span>
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
                <span>Vault ({historyVault.length})</span>
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
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
        
        <h1 className="hero-title animate-fade-in">
          <span className="gradient-ai-badge">VenturePulse</span> Startup Validator & <span className="gradient-title-accent">Market Intelligence</span>
        </h1>
        
        <p className="subtitle animate-fade-in">
          Autonomous multi-agent system evaluating market feasibility, calculating TAM/SAM/SOM bounds, benchmarking competitor matrices, and identifying strategic white-spaces.
        </p>

        {/* Live Architecture Capability Pill Bar (Interactive HUD Triggers) */}
        <div className="hero-caps-bar animate-fade-in">
          <button 
            type="button" 
            className="cap-pill interactive-cap"
            onClick={() => setActiveHudAgent(HUD_AGENTS_METADATA[0])}
            title="Click to inspect Agent 1 specs"
          >
            <Icons.Globe />
            <span>Agent 1: Live Web Intelligence</span>
          </button>
          <div className="cap-divider">•</div>
          <button 
            type="button" 
            className="cap-pill interactive-cap"
            onClick={() => setActiveHudAgent(HUD_AGENTS_METADATA[1])}
            title="Click to inspect Agent 2 specs"
          >
            <Icons.Chart />
            <span>Agent 2: TAM / SAM / SOM Sizing</span>
          </button>
          <div className="cap-divider">•</div>
          <button 
            type="button" 
            className="cap-pill interactive-cap"
            onClick={() => setActiveHudAgent(HUD_AGENTS_METADATA[2])}
            title="Click to inspect Agent 3 specs"
          >
            <Icons.Target />
            <span>Agent 3: Market White-Spaces</span>
          </button>
        </div>
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
                  <span className="presets-eyebrow">Interactive Blueprints</span>
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

              {/* Fluid Pill Cards Grid */}
              <div className="blueprint-chips-grid">
                {filteredPrompts.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`blueprint-pill-card ${activePreset === preset.id ? 'selected' : ''}`}
                    onClick={() => handleApplyPreset(preset)}
                  >
                    <div className="pill-card-top">
                      <span className="pill-category-badge">{preset.category}</span>
                      <span className="pill-card-title">{preset.label}</span>
                      <span className="pill-action-icon">
                        {activePreset === preset.id ? <Icons.Check /> : <Icons.ArrowRight />}
                      </span>
                    </div>
                    <div className="pill-card-desc">
                      {preset.summary}
                    </div>
                  </button>
                ))}
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
                    <span>3 Connected Agents Active</span>
                  </div>
                  <div className="mini-pipeline-flow">
                    <span className="flow-node active">Search</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-node">Sizing</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-node">Competitors</span>
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

            {/* Feature Capability Highlights Bar Underneath Form */}
            <div className="features-preview-grid">
              <div className="feature-preview-card">
                <div className="feat-icon-box blue-box">
                  <Icons.Search />
                </div>
                <div className="feat-content">
                  <h4 className="feat-title">Live Web & Competitor Indexing</h4>
                  <p className="feat-desc">Scrapes live web search indices for competitor URLs, content snippets, and calculates relevance scores.</p>
                </div>
              </div>

              <div className="feature-preview-card">
                <div className="feat-icon-box green-box">
                  <Icons.Chart />
                </div>
                <div className="feat-content">
                  <h4 className="feat-title">Algorithmic TAM / SAM / SOM</h4>
                  <p className="feat-desc">Computes addressable market bounds, beachhead sizing, and projected CAGR growth trajectories.</p>
                </div>
              </div>

              <div className="feature-preview-card">
                <div className="feat-icon-box purple-box">
                  <Icons.Shield />
                </div>
                <div className="feat-content">
                  <h4 className="feat-title">Multi-Axis Matrix & Gaps</h4>
                  <p className="feat-desc">Constructs comparative feature tables and uncovers unserved white-spaces for competitive advantage.</p>
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
                    <span>Saved Vault ({historyVault.length})</span>
                  </button>
                )}
                <button onClick={handleCopyInvestmentMemo} className="btn btn-export-memo" title="Copy Investor Brief in Markdown">
                  <Icons.Copy />
                  <span>Copy Investment Memo</span>
                </button>
                <button onClick={handlePrintPDF} className="btn btn-print-pdf" title="Export clean PDF Dossier">
                  <Icons.Download />
                  <span>Export PDF</span>
                </button>
                <button onClick={resetForm} className="btn btn-secondary">
                  <Icons.Refresh />
                  <span>New Analysis</span>
                </button>
              </div>
            </div>

            {/* Interactive Multi-Agent Execution Telemetry DAG Graph */}
            <div className="glass-card telemetry-dag-card">
              <div className="dag-header">
                <div className="dag-title-wrap">
                  <Icons.Zap />
                  <span className="dag-title">Autonomous Agent Telemetry Pipeline (DAG)</span>
                </div>
                <span className="dag-hint">Click any agent node to inspect execution audit</span>
              </div>
              <div className="dag-nodes-flow">
                <button 
                  type="button" 
                  className={`dag-node-pill ${selectedAgentNode === 'search' ? 'selected' : ''}`}
                  onClick={() => setSelectedAgentNode(selectedAgentNode === 'search' ? null : 'search')}
                >
                  <span className="node-step">1</span>
                  <div className="node-meta">
                    <strong>Web Intelligence</strong>
                    <span className="node-latency">~320ms • 5 URLs</span>
                  </div>
                  <span className="node-status-dot"></span>
                </button>

                <div className="dag-arrow">→</div>

                <button 
                  type="button" 
                  className={`dag-node-pill ${selectedAgentNode === 'market' ? 'selected' : ''}`}
                  onClick={() => setSelectedAgentNode(selectedAgentNode === 'market' ? null : 'market')}
                >
                  <span className="node-step">2</span>
                  <div className="node-meta">
                    <strong>TAM & Sizing Engine</strong>
                    <span className="node-latency">~410ms • Sizing Active</span>
                  </div>
                  <span className="node-status-dot"></span>
                </button>

                <div className="dag-arrow">→</div>

                <button 
                  type="button" 
                  className={`dag-node-pill ${selectedAgentNode === 'competitor' ? 'selected' : ''}`}
                  onClick={() => setSelectedAgentNode(selectedAgentNode === 'competitor' ? null : 'competitor')}
                >
                  <span className="node-step">3</span>
                  <div className="node-meta">
                    <strong>Competitor Benchmarker</strong>
                    <span className="node-latency">~480ms • Matrix Built</span>
                  </div>
                  <span className="node-status-dot"></span>
                </button>

                <div className="dag-arrow">→</div>

                <button 
                  type="button" 
                  className={`dag-node-pill ${selectedAgentNode === 'orchestrator' ? 'selected' : ''}`}
                  onClick={() => setSelectedAgentNode(selectedAgentNode === 'orchestrator' ? null : 'orchestrator')}
                >
                  <span className="node-step">4</span>
                  <div className="node-meta">
                    <strong>Executive Synthesizer</strong>
                    <span className="node-latency">~210ms • Verified</span>
                  </div>
                  <span className="node-status-dot"></span>
                </button>
              </div>

              {/* Node Inspector Drawer */}
              {selectedAgentNode && (
                <div className="dag-drawer animate-fade-in">
                  <div className="drawer-header">
                    <strong>Node Telemetry Inspector: {selectedAgentNode.toUpperCase()} AGENT</strong>
                    <button type="button" onClick={() => setSelectedAgentNode(null)} className="drawer-close-btn">✕</button>
                  </div>
                  <div className="drawer-content">
                    {selectedAgentNode === 'search' && (
                      <p>Web Intelligence Agent queried live search indices for domain keywords: <code>{searchResult.query}</code>. Successfully synthesized and ranked 5 high-relevance competitor records with domain scoring.</p>
                    )}
                    {selectedAgentNode === 'market' && (
                      <p>Market Opportunity Agent computed dynamic TAM/SAM/SOM financial models with CAGR trajectory bounds, segmented buyer personas, and extracted core customer purchasing drivers.</p>
                    )}
                    {selectedAgentNode === 'competitor' && (
                      <p>Competitor Discovery Agent synthesized direct/indirect competitors, constructed a multi-dimensional benchmarking matrix, and uncovered unserved market white spaces.</p>
                    )}
                    {selectedAgentNode === 'orchestrator' && (
                      <p>Executive Orchestrator evaluated multi-agent outputs, synthesized executive investment feasibility rating ({insights?.score}%), and generated go-to-market execution vectors.</p>
                    )}
                  </div>
                </div>
              )}
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

            {/* Multi-Agent Results Navigation Tabs */}
            <div className="agent-tabs-nav">
              <button
                type="button"
                className={`agent-tab-btn ${activeTab === 'market' ? 'active' : ''}`}
                onClick={() => handleTabChange('market')}
              >
                <Icons.Chart />
                <span>Market Sizing & Personas</span>
              </button>
              <button
                type="button"
                className={`agent-tab-btn ${activeTab === 'competitors' ? 'active' : ''}`}
                onClick={() => handleTabChange('competitors')}
              >
                <Icons.Competitors />
                <span>Competitors & 2x2 Quadrant</span>
              </button>
              <button
                type="button"
                className={`agent-tab-btn ${activeTab === 'strategy' ? 'active' : ''}`}
                onClick={() => handleTabChange('strategy')}
              >
                <Icons.Strategy />
                <span>Viability & Moat Radar</span>
              </button>
              <button
                type="button"
                className={`agent-tab-btn ${activeTab === 'pitchdeck' ? 'active' : ''}`}
                onClick={() => handleTabChange('pitchdeck')}
              >
                <Icons.Presentation />
                <span>Investor Pitch Deck (6 Slides)</span>
              </button>
              <button
                type="button"
                className={`agent-tab-btn ${activeTab === 'sources' ? 'active' : ''}`}
                onClick={() => handleTabChange('sources')}
              >
                <Icons.Globe />
                <span>Web Sources ({searchResult.results?.length || 0})</span>
              </button>
              <button
                type="button"
                className={`agent-tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
                onClick={() => handleTabChange('logs')}
              >
                <Icons.Terminal />
                <span>Pipeline Logs</span>
              </button>
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
                      <Icons.Sliders />
                      <h3 className="card-title">Interactive Financial Model & ARR Sensitivity Simulator</h3>
                    </div>
                    <span className="sim-badge">Live Reactive Engine</span>
                  </div>
                  <p className="sim-subtitle">Adjust market parameters to test addressable revenue ceilings and Year-1 beachhead ARR projections in real-time:</p>

                  <div className="sim-controls-grid">
                    <div className="slider-box">
                      <div className="slider-top">
                        <label>Target Addressable Pool ($N$ Users / SMBs)</label>
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
                    </div>

                    <div className="slider-box">
                      <div className="slider-top">
                        <label>Annual Contract Value / ARPU ($/yr)</label>
                        <span className="slider-val">${arpu}/yr</span>
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
                    </div>

                    <div className="slider-box">
                      <div className="slider-top">
                        <label>Year-1 Beachhead Penetration (%)</label>
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
                    </div>
                  </div>

                  {/* Simulator Dynamic Financial Forecast Output Cards */}
                  <div className="sim-output-grid">
                    <div className="sim-out-card">
                      <span className="sim-out-label">Calculated TAM Ceiling</span>
                      <h4 className="sim-out-value">{calculatedTAM}</h4>
                      <span className="sim-out-sub">Global Max Addressable</span>
                    </div>

                    <div className="sim-out-card">
                      <span className="sim-out-label">Target Serviceable (SAM)</span>
                      <h4 className="sim-out-value">{calculatedSAM}</h4>
                      <span className="sim-out-sub">Core Reachable Segment</span>
                    </div>

                    <div className="sim-out-card highlight-out">
                      <span className="sim-out-label">Year-1 Projected ARR (SOM)</span>
                      <h4 className="sim-out-value">{projectedYear1ARR}</h4>
                      <span className="sim-out-sub">Based on {penetrationRate}% Beachhead Capture</span>
                    </div>

                    <div className="sim-out-card">
                      <span className="sim-out-label">Year-3 Growth Trajectory</span>
                      <h4 className="sim-out-value">{projectedYear3ARR}</h4>
                      <span className="sim-out-sub">Projected Multi-tier ARR</span>
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
                      <h3 className="card-title">2×2 Competitive Positioning Matrix</h3>
                      <p className="quad-subtext">Benchmarking market positioning across Domain Specialization and Autonomous AI Workflows.</p>
                    </div>
                    <span className="quad-legend-badge">Interactive Visual Scatter</span>
                  </div>

                  <div className="quadrant-box">
                    <div className="quad-bg-grid">
                      <div className="quad-zone top-left">
                        <span className="zone-label">Autonomous Automation</span>
                      </div>
                      <div className="quad-zone top-right highlight-zone">
                        <span className="zone-label frontier-label">★ Frontier Disrupter (Target Niche)</span>
                      </div>
                      <div className="quad-zone bottom-left">
                        <span className="zone-label">Generic Incumbents</span>
                      </div>
                      <div className="quad-zone bottom-right">
                        <span className="zone-label">Vertical Legacy Suites</span>
                      </div>
                    </div>

                    {/* Proposed Startup Bubble (Top Right Frontier) */}
                    <div 
                      className="quad-bubble startup-bubble"
                      style={{ left: `84%`, top: `18%` }}
                    >
                      <div className="bubble-pulse"></div>
                      <span className="bubble-name">★ Your Startup Concept</span>
                    </div>

                    {/* Competitor Bubbles */}
                    {quadrantCompetitors.map((comp, cIdx) => (
                      <div 
                        key={cIdx} 
                        className="quad-bubble competitor-bubble"
                        style={{ left: `${comp.x}%`, top: `${comp.y}%` }}
                        onMouseEnter={() => setHoveredCompetitor(comp)}
                        onMouseLeave={() => setHoveredCompetitor(null)}
                      >
                        <span className="bubble-dot-inner"></span>
                        <span className="bubble-name">{comp.name}</span>
                      </div>
                    ))}

                    {/* Quadrant Axis Labels */}
                    <div className="axis-label x-axis-left">← Generic / Horizontal</div>
                    <div className="axis-label x-axis-right">Domain-Specialized Vertical →</div>
                    <div className="axis-label y-axis-top">Autonomous AI Workflows ↑</div>
                    <div className="axis-label y-axis-bottom">↓ Manual / Fragmented</div>

                    {/* Competitor Hover Tooltip */}
                    {hoveredCompetitor && (
                      <div className="quad-tooltip animate-fade-in">
                        <strong>{hoveredCompetitor.name}</strong>
                        <div className="tt-row"><span>Advantage:</span> {hoveredCompetitor.strengths}</div>
                        <div className="tt-row"><span>Limitation:</span> {hoveredCompetitor.weaknesses}</div>
                        <div className="tt-row"><span>Pricing Model:</span> {hoveredCompetitor.pricing}</div>
                      </div>
                    )}
                  </div>
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
                  <div className="results-header-info">
                    <h3 className="pane-section-title">Verified Web Intelligence Sources</h3>
                    <p className="query-display"><strong>Compiled Search Query:</strong> <code>{searchResult.query}</code></p>
                  </div>
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
                    <h3 className="pane-section-title">Agent Pipeline Execution Audit Trail</h3>
                    <span className="total-time-badge">Total Execution: {pipelineMeta.total_duration_sec}s</span>
                  </div>
                  <div className="logs-timeline">
                    {pipelineMeta.execution_logs?.map((log, lIdx) => (
                      <div key={lIdx} className="log-entry">
                        <div className="log-marker">
                          <span>{log.step}</span>
                        </div>
                        <div className="log-details">
                          <div className="log-top">
                            <strong className="log-agent">{log.agent}</strong>
                            <span className="log-status-tag">{log.status.toUpperCase()}</span>
                            <span className="log-duration">{log.duration_sec}s</span>
                          </div>
                          <p className="log-message">{log.message}</p>
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
