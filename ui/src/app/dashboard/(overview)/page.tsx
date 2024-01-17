import MapComponent from './map';
 
export default async function Page() {
  const mapCenter = { lat: 37.7749, lng: -122.4194 }; // Initial map center
  const mapZoom = 12; // Initial zoom level
  const markerPosition = { lat: 37.7749, lng: -122.4194 }; // Marker position
  
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div>
      <MapComponent/>
    </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

      </div>
    </main>
  );
}