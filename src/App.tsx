import GalleryGrid from "./components/gallery/GalleryGrid";
import LiveFeed from "./components/feed/LiveFeed";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Gallery Section */}
          <div className="lg:col-span-3 w-full">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                Real-Time Image Gallery
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Browse and react to beautiful images in real-time
              </p>
            </div>

            <GalleryGrid />
          </div>

          {/* Live Feed Section */}
          <div className="border border-gray-800 rounded-xl min-h-[80vh] p-6 bg-gray-900 shadow-lg">
            <LiveFeed />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
