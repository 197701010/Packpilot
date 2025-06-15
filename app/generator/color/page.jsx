"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// HULPFUNCTIE: Bepaalt de tekstkleur voor een achtergrondkleur.
const getTextColorForBackground = (hexColor) => {
  if (!hexColor) return '#000000'; // Fallback voor het geval de kleur niet gevonden wordt
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

// De colorMap met alle kleuren en hun hex-codes
const colorMap = {
    "Carmine": "#960018", "Coral": "#FF7F50", "Maroon": "#800000", "Burgundy": "#800020", "Claret": "#7F1734", "Wine": "#722F37", "Oxblood": "#4A0000", "Amaranth": "#E52B50", "Orange": "#FFA500", "Tangerine Orange": "#F28500", "Orange Red": "#FF4500", "Rust": "#B7410E", "Persimmon": "#EC5800", "Burnt Sienna": "#E97451", "Amber": "#FFBF00", "Rufous": "#A81C07", "Umber": "#635147", "Ochre": "#CC7722", "Peach": "#FFE5B4", "Salmon": "#FA8072", "Melon": "#FDBE8F", "Apricot": "#FBCEB1", "Blush": "#DE5D83", "Brown": "#A52A2A", "Chocolate": "#D2691E", "Cocoa": "#D2691E", "Mahogany": "#C04000", "Russet": "#80461B", "SaddleBrown": "#8B4513", "Pullman Brown": "#644117", "Sepia": "#704214", "Buff": "#F0DC82", "Khaki": "#F0E68C", "Tan": "#D2B48C", "Sandy Brown": "#F4A460", "Caramel": "#FFD59A", "Sienna": "#A0522D", "Yellow": "#FFFF00", "Lemon Yellow": "#FFF44F", "Cheddar Yellow": "#FFD700", "Goldenrod": "#DAA520", "Saffron": "#F4C430", "Maize": "#FBEC5D", "Yellow Orange": "#FFAE42", "Lemon Chiffon": "#FFFACD", "Honeydew": "#F0FFF0", "Cornsilk": "#FFF8DC", "Aureolin": "#FDEE00", "Citrine": "#E4D00A", "Mustard": "#FFDB58", "Turmeric": "#FFC428", "Green": "#008000", "May Green": "#4C9141", "Spring Green": "#00FF7F", "Lime Green": "#32CD32", "Hunter Green": "#355E3B", "Emerald Green": "#50C878", "Parisian Green": "#50C878", "Viridian": "#40826D", "Olive Green": "#808000", "Jade": "#00A86B", "Caribbean Green": "#00CC99", "Yellow Green": "#9ACD32", "Chartreuse": "#7FFF00", "Mint Green": "#98FF98", "Sage": "#BCB88A", "Celadon": "#ACE1AF", "Teal": "#008080", "Turquoise": "#40E0D0", "Sea Green": "#2E8B57", "Cyan": "#00FFFF", "Aquamarine": "#7FFFD4", "Seafoam": "#93E9BE", "Cerulean": "#007BA7", "Blue": "#0000FF", "Navy Blue": "#000080", "Royal Blue": "#4169E1", "Pacific Blue": "#1CA9C9", "Sky Blue": "#87CEEB", "Powder Blue": "#B0E0E6", "Baby Blue": "#89CFF0", "Alice Blue": "#F0F8FF", "Cornflower Blue": "#6495ED", "Vivid Blue": "#1F75FE", "Midnight Blue": "#191970", "Prussian Blue": "#003153", "Spacey Blue": "#4F4F9A", "Slate Blue": "#6A5ACD", "Blue Gray": "#6699CC", "Blue Violet": "#8A2BE2", "Ultramarine Blue": "#4166F5", "Cobalt Blue": "#0047AB", "Lapis Lazuli": "#26619C", "Dodger Blue": "#1E90FF", "Indigo": "#4B0082", "Purple": "#800080", "Violet": "#EE82EE", "Royal Purple": "#7851A9", "Rebecca Purple": "#663399", "Amethyst Purple": "#9966CC", "Tartan Purple": "#5D3A5D", "Plum Purple": "#5946B2", "Plum": "#DDA0DD", "Wisteria Purple": "#C9A0DC", "Heliotrope": "#DF73FF", "Lavender": "#E6E6FA", "Lilac": "#C8A2C8", "Periwinkle": "#CCCCFF", "Aubergine": "#472C4C", "Eggplant": "#614051", "Mulberry": "#C54B8C", "Pink": "#FFC0CB", "Hot Pink": "#FF69B4", "Deep Pink": "#FF1493", "Magenta": "#FF00FF", "Cerise": "#DE3163", "Carnation Pink": "#FFA6C9", "Puce": "#CC8899", "Mauve": "#E0B0FF", "Raspberry Jam": "#A50B5E", "Gold": "#FFD700", "Silver": "#C0C0C0", "Brass": "#B5A642", "Bronze": "#CD7F32", "Copper": "#B87333", "Nickel": "#727472", "Rosegold": "#B76E79", "White": "#FFFFFF", "Cream": "#FFFDD0", "Ivory": "#FFFFF0", "Vanilla": "#F3E5AB", "Antique White": "#FAEBD7", "Linen": "#FAF0E6", "Alabaster": "#EDEADE", "Beige": "#F5F5DC", "Bisque": "#FFE4C4", "Blanched Almond": "#FFEBCD", "Sand": "#C2B280", "Taupe": "#483C32", "Gray": "#808080", "Ash Gray": "#B2BEB5", "Slate Gray": "#708090", "Charcoal": "#36454F", "Onyx": "#353839", "Ebony": "#555D50", "Black": "#000000",
};

export default function GeneratorColorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [company, setCompany] = useState("");
  const [slogan, setSlogan] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [packagingType, setPackagingType] = useState("");

  useEffect(() => {
    const pkg = searchParams.get('packaging');
    if (pkg) {
      setPackagingType(pkg);
    }
  }, [searchParams]);

  const toggleColor = (colorName) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorName));
    } else if (selectedColors.length < 4) {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const handleNext = () => {
    const selectedHexCodes = selectedColors.map(name => colorMap[name].replace('#', ''));
    
    const params = new URLSearchParams();
    if (packagingType) {
      params.append('packaging', packagingType);
    }
    if (company) {
      params.append('company', company);
    }
    if (slogan) {
      params.append('slogan', slogan);
    }
    if (selectedHexCodes.length > 0) {
      params.append('colors', selectedHexCodes.join(','));
    }

    router.push(`/generator/design?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#fffdf9] py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-yd-red font-serif mb-4">
          Voeg je branding toe
        </h1>
        
        <form className="bg-white border border-gray-200 rounded-2xl p-8 text-left mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bedrijfsnaam</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yd-red" placeholder="Naam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slogan</label>
              <input type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yd-red" placeholder="Bijv. Slimmere designs, sneller" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload je logo (optioneel)</label>
            <input type="file" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kies tot 4 kleuren (optioneel)</label>
            <div className="grid grid-cols-6 gap-2 max-h-[400px] overflow-y-scroll border p-4 rounded-lg border-gray-200">
              {Object.keys(colorMap).map((colorName) => (
                <button
                  type="button"
                  key={colorName}
                  className={`h-10 rounded text-xs font-medium shadow ${
                    selectedColors.includes(colorName)
                      ? "ring-2 ring-yd-red ring-offset-2"
                      : "opacity-90 hover:opacity-100"
                  }`}
                  style={{ 
                    backgroundColor: colorMap[colorName],
                    color: getTextColorForBackground(colorMap[colorName]) 
                  }}
                  onClick={() => toggleColor(colorName)}
                >
                  {colorName}
                </button>
              ))}
            </div>
          </div>
        </form>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition"
          onClick={handleNext}
        >
          Volgende
        </button>
      </div>
    </main>
  );
}