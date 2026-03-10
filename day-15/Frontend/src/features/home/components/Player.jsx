import React, { useRef, useState, useEffect, useContext } from "react";
import { ExpressionContext } from "../../expression/contexts/Expression.context";
import "../styles/player.scss";
import useSong from "../hooks/useSong";

const Player = () => {

  const { song, handlesong, loading } = useSong();
  const { expression } = useContext(ExpressionContext);

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastMood, setLastMood] = useState(null);

  // 🎵 Fetch song when mood changes
  useEffect(() => {

    if (!expression) return;

    if (expression === "neutral" || expression === "no face") return;

    const mood = expression.toLowerCase();

    if (mood !== lastMood) {

      console.log("🎵 Expression detected:", expression, "→ Mood:", mood);

      setLastMood(mood);

      handlesong({ mood });

    }

  }, [expression]);


  // 🎵 Auto play when new song arrives
  useEffect(() => {

    if (!song?.url || !audioRef.current) return;

    const audio = audioRef.current;

    console.log("🎵 New song received:", song.title);

    audio.pause();
    audio.currentTime = 0;

    audio.src = song.url;

    audio.load();

    audio.play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.log("Autoplay blocked:", err));

  }, [song]);


  const togglePlayPause = () => {

    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (audio.paused) {

      audio.play().catch(err => console.log("Play error:", err));

      setIsPlaying(true);

    } else {

      audio.pause();

      setIsPlaying(false);

    }

  };


  const skipForward = () => {

    if (!audioRef.current) return;

    audioRef.current.currentTime += 5;

  };


  const skipBackward = () => {

    if (!audioRef.current) return;

    audioRef.current.currentTime -= 5;

  };


  const handleTimeUpdate = () => {

    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);

  };


  const handleLoadedMetadata = () => {

    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);

  };


  const handleSeek = (e) => {

    if (!audioRef.current) return;

    const seekTime = (e.target.value / 100) * duration;

    audioRef.current.currentTime = seekTime;

    setCurrentTime(seekTime);

  };


  const formatTime = (secs) =>
    `${Math.floor(secs / 60)}:${Math.floor(secs % 60)
      .toString()
      .padStart(2, "0")}`;


  return (

    <div className="player">

      <div className="player__ambient" aria-hidden="true" />

      {/* Album Poster */}
      <div className="player__poster">
        <img src={song?.posterUrl || ""} alt={song?.title || "song"} />
      </div>

      <div className="player__center">

        {/* Song info */}
        <div className="player__info">
          <h3>{song?.title || "No song playing"}</h3>
          <p>Expression: {expression}</p>
        </div>

        {/* Audio */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />

        {/* Controls */}
        <div className="player__controls">

          <button onClick={skipBackward} className="player__button">
            −5s ↺
          </button>

          <button
            onClick={togglePlayPause}
            className="player__button player__button--play"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button onClick={skipForward} className="player__button">
            ↻ +5s
          </button>

        </div>

        {/* Progress */}
        <div className="player__progress">

          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="player__slider"
          />

          <div className="player__time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

        </div>

        {loading && (
          <span className="player__loading">
            Loading song...
          </span>
        )}

      </div>

    </div>

  );
};

export default Player;