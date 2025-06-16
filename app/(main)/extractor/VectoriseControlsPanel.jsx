'use client';

// De Switch component ontvangt nu ook 'checked' en 'onChange' props
function Switch({ label, checked, onChange }) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
        <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900">{label}</span>
    </label>
  );
}

export default function VectoriseControlsPanel({ activeTab, setActiveTab, settings, onSettingChange }) {
  return (
    <div className="w-1/4 p-4 bg-white rounded-lg shadow-md ml-4">
      <h2 className="text-lg font-semibold mb-4">Vectorise controls</h2>
      
      {/* Tab Knoppen */}
      <div className="flex border-b mb-4">
        <button onClick={() => setActiveTab('Basic')} className={`px-4 py-2 -mb-px text-sm font-medium ${activeTab === 'Basic' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500 hover:text-purple-600'}`}>
          Basic
        </button>
        <button onClick={() => setActiveTab('Advanced')} className={`px-4 py-2 -mb-px text-sm font-medium ${activeTab === 'Advanced' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500 hover:text-purple-600'}`}>
          Advanced
        </button>
      </div>

      {activeTab === 'Basic' && (
        <div>
          <h3 className="font-bold text-gray-800">BASIC</h3>
          <p className="text-sm text-gray-600 mt-2">
            We have chosen the optimum and scalable settings for this extraction. If you want more control over the parameters, choose advanced above.
          </p>
        </div>
      )}

      {activeTab === 'Advanced' && (
        <div className="space-y-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Ink selection</h3>
            <div className="flex space-x-4">
                <label className="flex items-center"><input type="radio" name="ink" value="CMYK" checked={settings.inkSelection === 'CMYK'} onChange={(e) => onSettingChange('inkSelection', e.target.value)} className="mr-2" /> CMYK</label>
                <label className="flex items-center"><input type="radio" name="ink" value="W+CMYK" checked={settings.inkSelection === 'W+CMYK'} onChange={(e) => onSettingChange('inkSelection', e.target.value)} className="mr-2" /> W+CMYK</label>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Fill Options</h3>
            <div className="space-y-2">
                <Switch label="Fill Shape" checked={settings.fillShape} onChange={(e) => onSettingChange('fillShape', e.target.checked)} />
                <Switch label="Adobe compatibility mode" checked={settings.adobeCompatibility} onChange={(e) => onSettingChange('adobeCompatibility', e.target.checked)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}