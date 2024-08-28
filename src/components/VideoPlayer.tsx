type VideoPlayerProps = {
  videoUrl: string;
};

const VideoPlayer = (props: VideoPlayerProps) => {
  const videoId = props.videoUrl.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      src={embedUrl}
      style={{
        width: "100%",
        height: "100%",
      }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default VideoPlayer;
