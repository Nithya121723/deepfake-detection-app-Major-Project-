const API_BASE_URL = "http://127.0.0.1:8000"

/* ===========================
   IMAGE RESPONSE TYPE
=========================== */
export interface ImagePredictionResponse {
  label: 'Fake' | 'Real'
  confidence: number
  gradcam_url: string
  radar_url: string
  ensemble_fake_probability: number
  final_fake_probability: number
  watermark_probability: number
  decision_source: string
  models: {
    convnext: { label: string; confidence: number }
    xception: { label: string; confidence: number }
    efficientnet_b3: { label: string; confidence: number }
    vit: { label: string; confidence: number }
  }
  watermark: {
    probability: number
    override_triggered: boolean
  }
}

/* ===========================
   VIDEO RESPONSE TYPE
=========================== */
export interface VideoPredictionResponse {
  label: string
  confidence: number
  final_score: number
  bilstm_score: number
  temporal_score: number
  cnn_score: number
  quality_score: number
  needs_manual_review: boolean
  fusion_weights: Record<string, number>
}

/* ===========================
   IMAGE UPLOAD API
=========================== */
export async function uploadImage(file: File): Promise<ImagePredictionResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/predict/image`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Image upload failed")
  }

  return response.json()
}

/* ===========================
   VIDEO UPLOAD API
=========================== */
export async function uploadVideo(file: File): Promise<VideoPredictionResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/predict/video`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Video upload failed")
  }

  return response.json()
}

/* ===========================
   HELPER: FULL IMAGE URL
=========================== */
export function getFullImageUrl(path: string): string {
  return `${API_BASE_URL}${path}`
}