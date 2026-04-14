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
import { type VideoPredictionResponse } from '@/lib/api'
import { 
  Video, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ArrowLeft,
  FileText,
  Activity,
  Brain,
  Gauge,
  Layers
} from 'lucide-react'

export default function VideoResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<VideoPredictionResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResult = sessionStorage.getItem('videoResult')
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
                  Please analyze a video first to see results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/analyze/video">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Analyze Video
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  const isReal = result.label.toLowerCase() === 'real'

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
                    Video deepfake detection results
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/analyze/video">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Analyze Another
                  </Button>
                </Link>
                <Link href="/report">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <FileText className="mr-2 h-4 w-4" />
                    View Report
                  </Button>
                </Link>
              </div>
            </div>

            {/* Manual Review Warning */}
            {result.needs_manual_review && (
              <div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <div>
                  <p className="font-medium text-amber-500">Manual Review Recommended</p>
                  <p className="text-sm text-muted-foreground">
                    The analysis results are inconclusive. Manual review is recommended for this video.
                  </p>
                </div>
              </div>
            )}

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
                    {(result.confidence ? result.confidence * 100 : 0).toFixed(1)}%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Signal Scores */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Signal Analysis</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <ResultCard
                  title="Final Score"
                  value={result.final_score}
                  variant={result.final_score > 0.5 ? 'danger' : 'success'}
                  icon={<Gauge className="h-4 w-4" />}
                />
                <ResultCard
                  title="BiLSTM Score"
                  value={result.bilstm_score}
                  subtitle="Temporal sequence analysis"
                  variant={result.bilstm_score > 0.5 ? 'danger' : 'success'}
                  icon={<Brain className="h-4 w-4" />}
                />
                <ResultCard
                  title="CNN Score"
                  value={result.cnn_score}
                  subtitle="Frame analysis"
                  variant={result.cnn_score > 0.5 ? 'danger' : 'success'}
                  icon={<Layers className="h-4 w-4" />}
                />
                <ResultCard
                  title="Temporal Score"
                  value={result.temporal_score}
                  subtitle="Motion patterns"
                  variant={result.temporal_score > 0.5 ? 'danger' : 'success'}
                  icon={<Activity className="h-4 w-4" />}
                />
              </div>
            </div>

            {/* Quality Score */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quality Analysis</CardTitle>
                <CardDescription>
                  Video quality and artifact detection score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Quality Score</p>
                    <p className="text-3xl font-bold text-foreground">
                      {(result.quality_score * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="h-4 w-64 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full transition-all ${
                        result.quality_score > 0.7
                          ? 'bg-emerald-500'
                          : result.quality_score > 0.4
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${result.quality_score * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fusion Weights */}
            <Card>
              <CardHeader>
                <CardTitle>Fusion Weights</CardTitle>
                <CardDescription>
                  Weight distribution across different analysis methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(result.fusion_weights || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <span className="text-sm font-medium capitalize text-muted-foreground">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-purple-500 transition-all"
                            style={{ width: `${(value as number) * 100}%` }}
                          />
                        </div>
                        <span className="min-w-[3rem] text-right text-sm font-medium text-foreground">
                          {((value as number) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
