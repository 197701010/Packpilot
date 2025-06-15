"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingForm() {
  const [bedrijf, setBedrijf] = useState("");
  const [slogan, setSlogan] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const router = useRouter();

  const roles = ["Founder", "Marketing", "Ontwerper", "Leverancier", "Verkoop", "Anders"];
  const opties = ["Verpakking ontwerpen", "Mockups maken", "AI inzetten in mijn proces"];

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bedrijf && selectedRole) {
      // optioneel: data opslaan in localStorage of context
      router.push("/packaging"); // of jouw volgende stap
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-yd-red mb-4">
        Welkom bij PackPilot
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Laten we je account personaliseren om de beste ervaring te bieden.
      </p>

      {/* Bedrijfsnaam */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Bedrijfsnaam</label>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yd-red"
        placeholder="Voer je bedrijfsnaam in"
        value={bedrijf}
        onChange={(e) => setBedrijf(e.target.value)}
      />

      {/* Slogan */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Slogan (optioneel)</label>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-yd-red"
        placeholder="Voer je slogan in"
        value={slogan}
        onChange={(e) => setSlogan(e.target.value)}
      />

      {/* Rollen */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {roles.map((rol) => (
          <button
            key={rol}
            type="button"
            onClick={() => setSelectedRole(rol)}
            className={`p-3 rounded-lg border text-sm transition ${
              selectedRole === rol
                ? "bg-yd-red text-white border-yd-red"
                : "bg-white border-gray-300 text-gray-700 hover:bg-yd-gray"
            }`}
          >
            {rol}
          </button>
        ))}
      </div>

      {/* Checkboxen */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Wat wil je doen? (meerdere keuzes mogelijk)
        </label>
        <div className="space-y-2">
          {opties.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Volgende knop */}
      <button
        type="submit"
        disabled={!bedrijf || !selectedRole}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          bedrijf && selectedRole
            ? "bg-yd-red text-white hover:bg-red-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Volgende
      </button>
    </form>
  );
}
