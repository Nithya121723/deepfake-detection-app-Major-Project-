'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { UploadBox } from '@/components/upload-box'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { uploadImage, type ImagePredictionResponse } from '@/lib/api'
import { Image, AlertCircle, ArrowRight } from 'lucide-react'

export default function AnalyzeImagePage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setError(null)
  }

  const handleClear = () => {
    setSelectedFile(null)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await uploadImage(selectedFile)
      // Store result in sessionStorage for the result page
      sessionStorage.setItem('imageResult', JSON.stringify(result))
      router.push('/result/image')
    } catch (err) {
      setError('Failed to analyze image. Please make sure the backend server is running.')
      console.error('Error uploading image:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="ml-64 flex-1 p-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-3">
                  <Image className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Image Analysis
                  </h1>
                  <p className="text-muted-foreground">
                    Upload an image to detect deepfakes
                  </p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>
                  Supported formats: JPG, PNG, GIF, WebP. Max file size: 10MB
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader size="lg" text="Analyzing image..." />
                    <p className="mt-4 text-sm text-muted-foreground">
                      This may take a few seconds...
                    </p>
                  </div>
                ) : (
                  <>
                    <UploadBox
                      accept="image"
                      onFileSelect={handleFileSelect}
                      selectedFile={selectedFile}
                      onClear={handleClear}
                      disabled={isLoading}
                    />

                    {error && (
                      <div className="flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{error}</p>
                      </div>
                    )}

                    <Button
                      onClick={handleSubmit}
                      disabled={!selectedFile || isLoading}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                      size="lg"
                    >
                      Analyze Image
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Info Section */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">How it works</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ol className="list-inside list-decimal space-y-2">
                    <li>Upload your image file</li>
                    <li>Our AI ensemble analyzes the image</li>
                    <li>Get detailed results with confidence scores</li>
                    <li>View Grad-CAM visualization and model breakdown</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Models Used</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-inside list-disc space-y-2">
                    <li>ConvNeXt - Modern CNN architecture</li>
                    <li>Xception - Depthwise separable convolutions</li>
                    <li>EfficientNet B3 - Efficient scaling</li>
                    <li>ViT - Vision Transformer</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
