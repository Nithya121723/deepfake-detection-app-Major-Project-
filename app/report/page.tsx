'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  Download, 
  CheckCircle, 
  XCircle,
  Image,
  Video,
  AlertCircle
} from 'lucide-react'
import { type ImagePredictionResponse, type VideoPredictionResponse } from '@/lib/api'

export default function ReportPage() {
  const [imageResult, setImageResult] = useState<ImagePredictionResponse | null>(null)
  const [videoResult, setVideoResult] = useState<VideoPredictionResponse | null>(null)

  useEffect(() => {
    const storedImageResult = sessionStorage.getItem('imageResult')
    const storedVideoResult = sessionStorage.getItem('videoResult')
    
    if (storedImageResult) {
      setImageResult(JSON.parse(storedImageResult))
    }
    if (storedVideoResult) {
      setVideoResult(JSON.parse(storedVideoResult))
    }
  }, [])

  const hasResults = imageResult || videoResult

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="ml-64 flex-1 p-8">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-3">
                  <FileText className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Analysis Report
                  </h1>
                  <p className="text-muted-foreground">
                    Detailed analysis results and documentation
                  </p>
                </div>
              </div>
              {hasResults && (
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              )}
            </div>

            {!hasResults ? (
              <Card className="text-center">
                <CardContent className="py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h2 className="mt-4 text-xl font-semibold text-foreground">
                    No Analysis Results
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Analyze an image or video first to generate a report
                  </p>
                  <div className="mt-6 flex justify-center gap-4">
                    <Link href="/analyze/image">
                      <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        <Image className="mr-2 h-4 w-4" />
                        Analyze Image
                      </Button>
                    </Link>
                    <Link href="/analyze/video">
                      <Button variant="outline">
                        <Video className="mr-2 h-4 w-4" />
                        Analyze Video
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Report Header */}
                <Card>
                  <CardHeader>
                    <CardTitle>DeepGuard Analysis Report</CardTitle>
                    <CardDescription>
                      Generated on {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Image Analysis Report */}
                {imageResult && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Image className="h-5 w-5 text-cyan-500" />
                        <CardTitle>Image Analysis Results</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Main Result */}
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex items-center gap-4">
                          {imageResult.label === 'Real' ? (
                            <CheckCircle className="h-8 w-8 text-emerald-500" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-500" />
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">Detection Result</p>
                            <p className={`text-2xl font-bold ${imageResult.label === 'Real' ? 'text-emerald-500' : 'text-red-500'}`}>
                              {imageResult.label}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Confidence</p>
                          <p className="text-2xl font-bold text-foreground">
                            {(imageResult.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* Visualizations */}
                      {(imageResult.gradcam_url || imageResult.radar_url) && (
                        <div className="grid gap-4 md:grid-cols-2">
                          {imageResult.gradcam_url && (
                            <div>
                              <p className="mb-2 text-sm font-medium text-muted-foreground">
                                Grad-CAM Visualization
                              </p>
                              <img
                                src={imageResult.gradcam_url}
                                alt="Grad-CAM"
                                className="w-full rounded-lg border border-border"
                              />
                            </div>
                          )}
                          {imageResult.radar_url && (
                            <div>
                              <p className="mb-2 text-sm font-medium text-muted-foreground">
                                Radar Plot
                              </p>
                              <img
                                src={imageResult.radar_url}
                                alt="Radar Plot"
                                className="w-full rounded-lg border border-border"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Model Details */}
                      <div>
                        <p className="mb-3 text-sm font-medium text-foreground">
                          Model Predictions
                        </p>
                        <div className="grid gap-2 md:grid-cols-2">
                          {Object.entries(imageResult.models).map(([name, data]) => (
                            <div
                              key={name}
                              className="flex items-center justify-between rounded-lg border border-border p-3"
                            >
                              <span className="text-sm capitalize text-muted-foreground">
                                {name.replace('_', ' ')}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${data.label === 'Real' ? 'text-emerald-500' : 'text-red-500'}`}>
                                  {data.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({(data.confidence * 100).toFixed(0)}%)
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Watermark Info */}
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm font-medium text-foreground">Watermark Analysis</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Probability</span>
                          <span className="text-sm font-medium text-foreground">
                            {(imageResult.watermark.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Override Triggered</span>
                          <span className={`text-sm font-medium ${imageResult.watermark.override_triggered ? 'text-amber-500' : 'text-muted-foreground'}`}>
                            {imageResult.watermark.override_triggered ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Video Analysis Report */}
                {videoResult && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-purple-500" />
                        <CardTitle>Video Analysis Results</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Main Result */}
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex items-center gap-4">
                          {videoResult.label.toLowerCase() === 'real' ? (
                            <CheckCircle className="h-8 w-8 text-emerald-500" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-500" />
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">Detection Result</p>
                            <p className={`text-2xl font-bold ${videoResult.label.toLowerCase() === 'real' ? 'text-emerald-500' : 'text-red-500'}`}>
                              {videoResult.label}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Confidence</p>
                          <p className="text-2xl font-bold text-foreground">
                            {(videoResult.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* Manual Review Warning */}
                      {videoResult.needs_manual_review && (
                        <div className="flex items-center gap-3 rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                          <p className="text-sm text-amber-500">
                            Manual review is recommended for this video
                          </p>
                        </div>
                      )}

                      {/* Scores */}
                      <div>
                        <p className="mb-3 text-sm font-medium text-foreground">
                          Analysis Scores
                        </p>
                        <div className="grid gap-2 md:grid-cols-2">
                          <div className="flex items-center justify-between rounded-lg border border-border p-3">
                            <span className="text-sm text-muted-foreground">Final Score</span>
                            <span className="text-sm font-medium text-foreground">
                              {(videoResult.final_score * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-border p-3">
                            <span className="text-sm text-muted-foreground">BiLSTM Score</span>
                            <span className="text-sm font-medium text-foreground">
                              {(videoResult.bilstm_score * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-border p-3">
                            <span className="text-sm text-muted-foreground">CNN Score</span>
                            <span className="text-sm font-medium text-foreground">
                              {(videoResult.cnn_score * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-border p-3">
                            <span className="text-sm text-muted-foreground">Temporal Score</span>
                            <span className="text-sm font-medium text-foreground">
                              {(videoResult.temporal_score * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-border p-3">
                            <span className="text-sm text-muted-foreground">Quality Score</span>
                            <span className="text-sm font-medium text-foreground">
                              {(videoResult.quality_score * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Fusion Weights */}
                      <div>
                        <p className="mb-3 text-sm font-medium text-foreground">
                          Fusion Weights
                        </p>
                        <div className="space-y-2">
                          {Object.entries(videoResult.fusion_weights).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between rounded-lg border border-border p-3"
                            >
                              <span className="text-sm capitalize text-muted-foreground">
                                {key.replace(/_/g, ' ')}
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {((value as number) * 100).toFixed(0)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Download Section */}
                <Card>
                  <CardContent className="flex items-center justify-between py-6">
                    <div>
                      <p className="font-medium text-foreground">
                        Download Full Report
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Get a PDF version of this analysis report
                      </p>
                    </div>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
