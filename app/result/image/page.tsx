'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { ResultCard } from '@/components/result-card'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type ImagePredictionResponse } from '@/lib/api'
import { 
  Image, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ArrowLeft,
  FileText,
  Eye,
  Radar
} from 'lucide-react'

export default function ImageResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<ImagePredictionResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResult = sessionStorage.getItem('imageResult')
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader size="lg" text="Loading results..." />
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="ml-64 flex flex-1 items-center justify-center p-8">
            <Card className="max-w-md text-center">
              <CardHeader>
                <CardTitle>No Results Found</CardTitle>
                <CardDescription>
                  Please analyze an image first to see results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/analyze/image">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    Analyze Image
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  const isReal = result.label === 'Real'

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="ml-64 flex-1 p-8">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-3 ${isReal ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  {isReal ? (
                    <CheckCircle className="h-6 w-6 text-emerald-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Analysis Complete
                  </h1>
                  <p className="text-muted-foreground">
                    Image deepfake detection results
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/analyze/image">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Analyze Another
                  </Button>
                </Link>
                <Link href="/report">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    <FileText className="mr-2 h-4 w-4" />
                    View Report
                  </Button>
                </Link>
              </div>
            </div>

            {/* Main Result */}
            <Card className={`mb-8 border-2 ${isReal ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-red-500/50 bg-red-500/5'}`}>
              <CardContent className="flex items-center justify-between p-8">
                <div className="flex items-center gap-6">
                  <div className={`rounded-full p-4 ${isReal ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                    {isReal ? (
                      <CheckCircle className="h-12 w-12 text-emerald-500" />
                    ) : (
                      <XCircle className="h-12 w-12 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Detection Result</p>
                    <p className={`text-4xl font-bold ${isReal ? 'text-emerald-500' : 'text-red-500'}`}>
                      {result.label}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                  <p className={`text-4xl font-bold ${isReal ? 'text-emerald-500' : 'text-red-500'}`}>
                    {(result.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Visualizations */}
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-cyan-500" />
                    <CardTitle>Grad-CAM Visualization</CardTitle>
                  </div>
                  <CardDescription>
                    Highlights regions the AI focused on
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result.gradcam_url ? (
                    <img
                      src={`http://127.0.0.1:8000${result.gradcam_url}`}
                      alt="Grad-CAM visualization"
                      className="w-full rounded-lg border border-border"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center rounded-lg border border-border bg-muted">
                      <p className="text-muted-foreground">No visualization available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Radar className="h-5 w-5 text-purple-500" />
                    <CardTitle>Radar Plot</CardTitle>
                  </div>
                  <CardDescription>
                    Model confidence comparison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result.radar_url ? (
                    <img
                      src={`http://127.0.0.1:8000${result.radar_url}`}
                      alt="Radar plot"
                      className="w-full rounded-lg border border-border"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center rounded-lg border border-border bg-muted">
                      <p className="text-muted-foreground">No visualization available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Detailed Scores */}
            <div className="mb-8 grid gap-4 md:grid-cols-4">
              <ResultCard
                title="Ensemble Fake Probability"
                value={result.ensemble_fake_probability}
                variant={result.ensemble_fake_probability > 0.5 ? 'danger' : 'success'}
              />
              <ResultCard
                title="Final Fake Probability"
                value={result.final_fake_probability}
                variant={result.final_fake_probability > 0.5 ? 'danger' : 'success'}
              />
              <ResultCard
                title="Watermark Probability"
                value={result.watermark_probability}
                variant="default"
              />
              <ResultCard
                title="Decision Source"
                value={result.decision_source}
                variant="default"
              />
            </div>

            {/* Model Breakdown */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Model Breakdown</CardTitle>
                <CardDescription>
                  Individual predictions from each model in the ensemble
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(result.models || {}).map(([modelName, modelResult]) => (
                    <div
                      key={modelName}
                      className="rounded-lg border border-border p-4"
                    >
                      <p className="text-sm font-medium text-muted-foreground capitalize">
                        {modelName.replace('_', ' ')}
                      </p>
                      <p className={`text-xl font-bold ${modelResult.label === 'Real' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {modelResult.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(modelResult.confidence * 100).toFixed(1)}% confidence
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Watermark Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Watermark Analysis</CardTitle>
                <CardDescription>
                  Detection of AI-generated image watermarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Watermark Probability
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {(result.watermark.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">
                      Override Status
                    </p>
                    <p className={`text-lg font-medium ${result.watermark.override_triggered ? 'text-amber-500' : 'text-muted-foreground'}`}>
                      {result.watermark.override_triggered ? (
                        <span className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Override Triggered
                        </span>
                      ) : (
                        'No Override'
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
