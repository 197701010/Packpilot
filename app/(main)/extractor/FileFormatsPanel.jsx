'use client';

const formats = ['SVG extract', 'PDF extract', 'DXF extract', 'EPS extract'];

// We ontvangen nu props van de bovenliggende pagina
export default function FileFormatsPanel({ selectedFormat, setSelectedFormat }) {
  return (
    <div className="w-1/4 p-4 bg-white rounded-lg shadow-md mr-4">
      <h2 className="text-lg font-semibold mb-4">File formats</h2>
      <p className="text-sm text-gray-500 mb-6">
        All extractions include PNG vector as well as your selected vector format below. We recommend SVG for most use cases.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => setSelectedFormat(format)} // Gebruikt nu de functie uit de props
            className={`p-4 border rounded-lg text-center transition-all ${
              selectedFormat === format // Gebruikt nu de state uit de props
                ? 'bg-purple-100 border-purple-500 text-purple-700 font-semibold'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
            }`}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
}