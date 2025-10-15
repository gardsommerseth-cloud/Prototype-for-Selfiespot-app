
import React, { useState } from "react";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium shadow-sm bg-white">
      {children}
    </span>
  );
}

const MOCK_SPOTS = [
  { id: 1, name: "Arctic Cathedral View", city: "Tromsø", rating: 4.8, tags:["Iconic","City"], lat:69.648, lng:18.956 },
  { id: 2, name: "Fjellheisen Plateau", city: "Tromsø", rating: 4.9, tags:["Mountain","Sunset"], lat:69.649, lng:18.987 },
  { id: 3, name: "Prestvannet Lake", city: "Tromsø", rating: 4.6, tags:["Nature","Reflection"], lat:69.66, lng:18.93 }
];

export default function App() {
  const [q, setQ] = useState("");
  const [spots, setSpots] = useState(MOCK_SPOTS);

  const filtered = spots.filter(s =>
    [s.name, s.city, ...(s.tags||[])].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">SelfieSpot</h1>
        <p className="text-gray-600">Vite + React + Tailwind starter. Search mock spots and interact.</p>
      </header>

      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Search Tromsø spots..."
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={()=>setQ("")}
          className="rounded-xl border px-4 py-3 font-medium hover:bg-gray-50 active:scale-[.99]"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(s => (
          <div key={s.id} className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <p className="text-sm text-gray-500">{s.city}</p>
              </div>
              <div className="text-sm font-semibold" aria-label="rating">⭐ {s.rating}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.tags?.map(t => <Badge key={t}>{t}</Badge>)}
            </div>
            <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm">
              <p><strong>Coordinates:</strong> {s.lat.toFixed(3)}, {s.lng.toFixed(3)}</p>
              <p className="text-gray-600">Tip: Try searching “sunset” or “mountain”.</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">Save</button>
              <button className="rounded-xl bg-indigo-600 text-white px-3 py-2 text-sm hover:bg-indigo-700">Open</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center text-gray-500">No results. Try a different search.</div>
      )}

      <footer className="mt-12 text-center text-xs text-gray-500">
        <p>Starter kit · no backend · ready for deploy on Vercel/Netlify.</p>
      </footer>
    </div>
  );
}
