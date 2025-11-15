import { useState } from 'react'
import SceneCanvas from './components/SceneCanvas'
import CustomizerPanel from './components/CustomizerPanel'
import './App.css'

function App() {
  const [customColor, setCustomColor] = useState('#ff6b9d')
  const [logoUrl, setLogoUrl] = useState(null)
  const [fabric, setFabric] = useState({ roughness: 0.8, metalness: 0.1 })

  const handleColorChange = (color) => {
    setCustomColor(color)
  }

  const handleLogoUpload = (url) => {
    setLogoUrl(url)
  }

  const handleFabricChange = (fabricData) => {
    setFabric({
      roughness: fabricData.roughness,
      metalness: fabricData.metalness
    })
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <SceneCanvas
        customColor={customColor}
        logoUrl={logoUrl}
        fabric={fabric}
      />

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

      {/* Customizer Panel */}
      <CustomizerPanel
        onColorChange={handleColorChange}
        onLogoUpload={handleLogoUpload}
        onFabricChange={handleFabricChange}
      />
    </div>
  )
}

export default App
