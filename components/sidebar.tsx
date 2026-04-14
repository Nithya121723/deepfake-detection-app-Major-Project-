'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Image,
  Video,
  History,
  User,
  FileText,
  Shield,
} from 'lucide-react'

const sidebarLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/analyze/image', label: 'Analyze Image', icon: Image },
  { href: '/analyze/video', label: 'Analyze Video', icon: Video },
  { href: '/history', label: 'History', icon: History },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/report', label: 'Report', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex items-center gap-2 px-2 py-4">
          <Shield className="h-6 w-6 text-cyan-500" />
          <span className="text-lg font-semibold text-sidebar-foreground">
            Analysis Hub
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-500'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border pt-4">
          <p className="px-3 text-xs text-muted-foreground">
            DeepGuard v1.0.0
          </p>
        </div>
      </div>
    </aside>
  )
}
