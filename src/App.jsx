import SceneCanvas from './components/SceneCanvas'
import './App.css'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <SceneCanvas />

      {/* Overlay UI */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        color: '#fff',
        fontFamily: 'monospace',
        background: 'rgba(0,0,0,0.5)',
        padding: '15px 20px',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
          ThreadBase
        </h1>
        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
          Interactive 3D Marketplace
        </p>
        <p style={{ margin: '10px 0 0 0', fontSize: '11px', opacity: 0.6 }}>
          Click to pulse • Hover to scale
        </p>
      </div>
    </div>
  )
}

export default App
