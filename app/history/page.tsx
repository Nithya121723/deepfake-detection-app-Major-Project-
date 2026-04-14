import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { History, Image, Video, CheckCircle, XCircle, Trash2 } from 'lucide-react'

// Mock data for history
const mockHistory = [
  {
    id: 1,
    type: 'image',
    filename: 'portrait_001.jpg',
    result: 'Real',
    confidence: 0.94,
    date: '2024-01-15T10:30:00',
  },
  {
    id: 2,
    type: 'video',
    filename: 'interview_clip.mp4',
    result: 'Fake',
    confidence: 0.87,
    date: '2024-01-15T09:15:00',
  },
  {
    id: 3,
    type: 'image',
    filename: 'headshot_2024.png',
    result: 'Fake',
    confidence: 0.92,
    date: '2024-01-14T16:45:00',
  },
  {
    id: 4,
    type: 'image',
    filename: 'photo_vacation.jpg',
    result: 'Real',
    confidence: 0.98,
    date: '2024-01-14T14:20:00',
  },
  {
    id: 5,
    type: 'video',
    filename: 'speech_segment.mp4',
    result: 'Fake',
    confidence: 0.79,
    date: '2024-01-13T11:00:00',
  },
  {
    id: 6,
    type: 'image',
    filename: 'profile_new.jpg',
    result: 'Real',
    confidence: 0.96,
    date: '2024-01-12T08:30:00',
  },
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function HistoryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="ml-64 flex-1 p-8">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-3">
                  <History className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Analysis History
                  </h1>
                  <p className="text-muted-foreground">
                    View your past analysis results
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear History
              </Button>
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Total Analyses</p>
                  <p className="text-2xl font-bold text-foreground">{mockHistory.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Images</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockHistory.filter((h) => h.type === 'image').length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Videos</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockHistory.filter((h) => h.type === 'video').length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Deepfakes Found</p>
                  <p className="text-2xl font-bold text-red-500">
                    {mockHistory.filter((h) => h.result === 'Fake').length}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* History List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
                <CardDescription>
                  Your analysis history from the past 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-lg p-2 ${
                            item.type === 'image'
                              ? 'bg-cyan-500/10'
                              : 'bg-purple-500/10'
                          }`}
                        >
                          {item.type === 'image' ? (
                            <Image className="h-5 w-5 text-cyan-500" />
                          ) : (
                            <Video className="h-5 w-5 text-purple-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {item.filename}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(item.date)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {item.result === 'Real' ? (
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span
                              className={`font-medium ${
                                item.result === 'Real'
                                  ? 'text-emerald-500'
                                  : 'text-red-500'
                              }`}
                            >
                              {item.result}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {(item.confidence * 100).toFixed(0)}% confidence
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
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
