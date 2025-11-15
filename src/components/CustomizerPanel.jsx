import { useState } from 'react'
import './CustomizerPanel.css'

export default function CustomizerPanel({ onColorChange, onLogoUpload, onFabricChange }) {
  const [selectedColor, setSelectedColor] = useState('#ff6b9d')
  const [selectedFabric, setSelectedFabric] = useState('cotton')
  const [logoPreview, setLogoPreview] = useState(null)

  const presetColors = [
    { name: 'Pink Neon', value: '#ff6b9d' },
    { name: 'Cyber Blue', value: '#4dabf7' },
    { name: 'Electric Purple', value: '#9b59b6' },
    { name: 'Mint Fresh', value: '#1dd1a1' },
    { name: 'Sunset Orange', value: '#ff6348' },
    { name: 'Cloud White', value: '#f1f2f6' },
    { name: 'Deep Black', value: '#2d3436' },
    { name: 'Gold Rush', value: '#feca57' },
  ]

  const fabricTypes = [
    { name: 'Cotton', value: 'cotton', roughness: 0.8, metalness: 0.1 },
    { name: 'Mesh', value: 'mesh', roughness: 0.6, metalness: 0.2 },
    { name: 'Fleece', value: 'fleece', roughness: 0.9, metalness: 0.05 },
    { name: 'Satin', value: 'satin', roughness: 0.2, metalness: 0.6 },
    { name: 'Wool', value: 'wool', roughness: 0.85, metalness: 0.1 },
    { name: 'Nylon', value: 'nylon', roughness: 0.3, metalness: 0.4 },
  ]

  const handleColorChange = (color) => {
    setSelectedColor(color)
    onColorChange(color)
  }

  const handleColorInput = (e) => {
    const color = e.target.value
    setSelectedColor(color)
    onColorChange(color)
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const logoUrl = event.target.result
        setLogoPreview(logoUrl)
        onLogoUpload(logoUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFabricChange = (fabric) => {
    setSelectedFabric(fabric.value)
    onFabricChange(fabric)
  }

  const clearLogo = () => {
    setLogoPreview(null)
    onLogoUpload(null)
  }

  return (
    <div className="customizer-panel">
      <div className="panel-header">
        <h2>Customize Your Sock</h2>
        <p className="panel-subtitle">Design your perfect piece</p>
      </div>

      {/* Color Picker Section */}
      <div className="section">
        <h3 className="section-title">Color</h3>
        <div className="color-grid">
          {presetColors.map((color) => (
            <button
              key={color.value}
              className={`color-swatch ${selectedColor === color.value ? 'active' : ''}`}
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorChange(color.value)}
              title={color.name}
            >
              {selectedColor === color.value && (
                <span className="checkmark">✓</span>
              )}
            </button>
          ))}
        </div>

        <div className="custom-color-picker">
          <label htmlFor="color-input">Custom Color:</label>
          <input
            id="color-input"
            type="color"
            value={selectedColor}
            onChange={handleColorInput}
            className="color-input"
          />
          <span className="color-hex">{selectedColor}</span>
        </div>
      </div>

      {/* Logo Upload Section */}
      <div className="section">
        <h3 className="section-title">Logo</h3>
        {logoPreview ? (
          <div className="logo-preview-container">
            <img src={logoPreview} alt="Logo preview" className="logo-preview" />
            <button onClick={clearLogo} className="clear-logo-btn">
              Remove Logo
            </button>
          </div>
        ) : (
          <label htmlFor="logo-upload" className="upload-btn">
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ display: 'none' }}
            />
            <span className="upload-icon">📤</span>
            <span>Upload Logo</span>
          </label>
        )}
        <p className="upload-hint">PNG or JPG • Max 2MB</p>
      </div>

      {/* Fabric Selector Section */}
      <div className="section">
        <h3 className="section-title">Fabric Type</h3>
        <div className="fabric-grid">
          {fabricTypes.map((fabric) => (
            <button
              key={fabric.value}
              className={`fabric-option ${selectedFabric === fabric.value ? 'active' : ''}`}
              onClick={() => handleFabricChange(fabric)}
            >
              <span className="fabric-name">{fabric.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-primary">Save Design</button>
        <button className="btn-secondary">Preview</button>
      </div>
    </div>
  )
}
