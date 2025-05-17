"use client";

/**
 * IframeVideoHero Component
 * 
 * Uses an iframe to display the video
 */
export default function IframeVideoHero() {
  // Create a simple HTML page with a video element
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: black;
        }
        video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .debug {
          position: absolute;
          top: 16px;
          left: 16px;
          background-color: purple;
          color: white;
          padding: 8px;
          font-size: 12px;
          font-weight: bold;
          z-index: 50;
        }
      </style>
    </head>
    <body>
      <video muted playsinline loop autoplay preload="auto">
        <source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm">
        <source src="/images/home/hero/mobile-video/heromobilevid.mp4" type="video/mp4">
      </video>
      <div class="debug">IFRAME VIDEO ACTIVE</div>
      <script>
        // Try to play the video after a delay
        setTimeout(() => {
          const video = document.querySelector('video');
          if (video) {
            video.play().catch(err => {
              console.error('Error playing video:', err);
            });
          }
        }, 1000);
      </script>
    </body>
    </html>
  `;
  
  // Convert the HTML content to a data URL
  const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <iframe
        src={dataUrl}
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
}
