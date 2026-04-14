import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Shield, Image, Video, CheckCircle, Zap, Lock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
                <Shield className="h-5 w-5 text-cyan-500" />
                <span className="text-sm font-medium text-cyan-500">
                  AI-Powered Detection
                </span>
              </div>
              
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Detect Deepfakes with
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  {' '}Advanced AI
                </span>
              </h1>
              
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
                DeepGuard uses state-of-the-art machine learning models to analyze images and videos, 
                detecting manipulated content with high accuracy. Protect yourself from misinformation.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/analyze/image">
                  <Button size="lg" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white sm:w-auto">
                    <Image className="mr-2 h-5 w-5" />
                    Analyze Image
                  </Button>
                </Link>
                <Link href="/analyze/video">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Video className="mr-2 h-5 w-5" />
                    Analyze Video
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-card/50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Why Choose DeepGuard?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our platform combines multiple AI models for accurate deepfake detection
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-8 transition-all hover:border-cyan-500/50">
                <div className="mb-4 inline-flex rounded-lg bg-cyan-500/10 p-3">
                  <Zap className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Fast Analysis
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Get results in seconds with our optimized AI pipeline processing
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-8 transition-all hover:border-cyan-500/50">
                <div className="mb-4 inline-flex rounded-lg bg-emerald-500/10 p-3">
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  High Accuracy
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Ensemble of 4+ models including ConvNeXt, Xception, EfficientNet, and ViT
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-8 transition-all hover:border-cyan-500/50">
                <div className="mb-4 inline-flex rounded-lg bg-purple-500/10 p-3">
                  <Lock className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Secure Processing
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Your files are processed securely and never stored permanently
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Ready to Detect Deepfakes?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Start analyzing your images and videos today
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>DeepGuard - AI Deepfake Detection System</p>
        </div>
      </footer>
    </div>
  )
}
