'use client'

import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { User, Mail, Calendar, Shield, LogOut, Settings } from 'lucide-react'

// Static user info
const userInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinedDate: 'January 2024',
  plan: 'Pro',
  totalAnalyses: 24,
  imagesAnalyzed: 18,
  videosAnalyzed: 6,
}

export default function ProfilePage() {
  const router = useRouter()

  const handleLogout = () => {
    // UI only - redirect to home
    router.push('/')
  }

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
                  <User className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Profile</h1>
                  <p className="text-muted-foreground">
                    Manage your account settings
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* User Card */}
              <Card className="md:col-span-1">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">
                      <span className="text-3xl font-bold text-white">
                        {userInfo.name.charAt(0)}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-foreground">
                      {userInfo.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                    <div className="mt-4 flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1">
                      <Shield className="h-4 w-4 text-cyan-500" />
                      <span className="text-sm font-medium text-cyan-500">
                        {userInfo.plan} Plan
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member since</span>
                      <span className="text-sm font-medium text-foreground">
                        {userInfo.joinedDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total analyses</span>
                      <span className="text-sm font-medium text-foreground">
                        {userInfo.totalAnalyses}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Images</span>
                      <span className="text-sm font-medium text-foreground">
                        {userInfo.imagesAnalyzed}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Videos</span>
                      <span className="text-sm font-medium text-foreground">
                        {userInfo.videosAnalyzed}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Settings Cards */}
              <div className="space-y-6 md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          defaultValue={userInfo.name}
                          className="pl-10"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          defaultValue={userInfo.email}
                          className="pl-10"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Member Since
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          defaultValue={userInfo.joinedDate}
                          className="pl-10"
                          readOnly
                        />
                      </div>
                    </div>

                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between rounded-lg border border-cyan-500/50 bg-cyan-500/5 p-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          {userInfo.plan} Plan
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Unlimited analyses, priority processing
                        </p>
                      </div>
                      <Button variant="outline">Manage Plan</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-500">Danger Zone</CardTitle>
                    <CardDescription>
                      Irreversible account actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
