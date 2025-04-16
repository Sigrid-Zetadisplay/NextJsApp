// app/myProjects/page.js
import { getVinderenBordeauxRedWines } from "@/lib/vinmonopoletAPI";

export default async function MyProjectsPage() {
  // Fetch wines data on the server
  const wines = await getVinderenBordeauxRedWines();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Vinderen Bordeaux Red Wines</h1>
      {wines && wines.length > 0 ? (
        <ul>
          {wines.map((wine) => (
            <li key={wine.productId} className="mb-4 p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold">{wine.productShortName}</h2>
              {/* Render additional wine details as needed */}
              <p className="text-sm mt-1">ID: {wine.productId}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No wines found.</p>
      )}
    </div>
  );
}
