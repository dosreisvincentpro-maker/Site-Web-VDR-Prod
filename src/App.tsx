import React, { useState, useEffect } from 'react';
import { PageTab, VideoProject } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { HomePage } from './pages/HomePage';
import { RealisationsPage } from './pages/RealisationsPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { ThemeProvider } from './context/ThemeContext';
import { requestFullScreenSafe } from './utils/fullscreen';

function AppContent() {
  const [activeTab, setActiveTab] = useState<PageTab>('accueil');
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);

  const handleSelectVideo = (video: VideoProject) => {
    // Au même clic, déclenche le plein écran natif via requestFullscreen
    requestFullScreenSafe();
    setSelectedVideo(video);
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen theme-bg-main theme-text-main flex flex-col font-sans transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'accueil' && (
          <HomePage
            setActiveTab={setActiveTab}
            onSelectVideo={handleSelectVideo}
            isVideoModalOpen={!!selectedVideo}
          />
        )}

        {activeTab === 'realisations' && (
          <RealisationsPage
            onSelectVideo={handleSelectVideo}
          />
        )}

        {activeTab === 'apropos' && (
          <AboutPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'services' && (
          <ServicesPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Video Player Modal */}
      <VideoModal
        project={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
