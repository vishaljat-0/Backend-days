import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  landmarkerRef.current = await FaceLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1,
    }
  );

  streamRef.current = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoRef.current.srcObject = streamRef.current;
};



export const detect = async ({ landmarkerRef, videoRef }) => {

  if (!landmarkerRef.current || !videoRef.current) return null;

  const video = videoRef.current;
  const landmarker = landmarkerRef.current;

  const results = await landmarker.detectForVideo(video, Date.now());

  if (!results.faceBlendshapes || results.faceBlendshapes.length === 0) {
    return "no face";
  }

  const shapes = results.faceBlendshapes[0].categories;

  const getScore = (name) => {
    const item = shapes.find((s) => s.categoryName === name);
    return item ? item.score : 0;
  };

  const happyScore =
    getScore("mouthSmileLeft") + getScore("mouthSmileRight");

  const sadScore =
    getScore("mouthFrownLeft") + getScore("mouthFrownRight");

  const surpriseScore =
    getScore("jawOpen") +
    getScore("eyeWideLeft") +
    getScore("eyeWideRight");

  let emotion = "neutral";

  const maxScore = Math.max(happyScore, sadScore, surpriseScore);

  if (maxScore === happyScore && happyScore > 0.4) {
    emotion = "happy";
  }
  else if (maxScore === sadScore && sadScore > 0.4) {
    emotion = "sad";
  }
  else if (maxScore === surpriseScore && surpriseScore > 0.5) {
    emotion = "surprised";
  }

  return emotion;
};