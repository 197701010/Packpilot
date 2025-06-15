export function ModuleCard({ title, level }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <h4 className="text-lg font-semibold text-lucidia-blue">{title}</h4>
      <p className="text-sm text-gray-500">Niveau: {level}</p>
    </div>
  );
}
