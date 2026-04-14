'use client'

import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UploadBoxProps {
  accept: 'image' | 'video'
  onFileSelect: (file: File) => void
  selectedFile: File | null
  onClear: () => void
  disabled?: boolean
}

export function UploadBox({
  accept,
  onFileSelect,
  selectedFile,
  onClear,
  disabled,
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const acceptedTypes = accept === 'image' 
    ? 'image/jpeg,image/png,image/gif,image/webp' 
    : 'video/mp4,video/webm,video/avi,video/mov'

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [accept]
  )

  const handleFile = (file: File) => {
    const isValid =
      accept === 'image'
        ? file.type.startsWith('image/')
        : file.type.startsWith('video/')

    if (isValid) {
      onFileSelect(file)
      if (accept === 'image') {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreview(URL.createObjectURL(file))
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleClear = () => {
    setPreview(null)
    onClear()
  }

  const Icon = accept === 'image' ? ImageIcon : Video

  return (
    <div className="w-full">
      {selectedFile && preview ? (
        <div className="relative rounded-lg border border-border bg-card p-4">
          <button
            onClick={handleClear}
            className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/80"
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col items-center gap-4">
            {accept === 'image' ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 rounded-lg object-contain"
              />
            ) : (
              <video
                src={preview}
                className="max-h-64 rounded-lg"
                controls
              />
            )}
            <p className="text-sm text-muted-foreground">
              {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          </div>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-all',
            isDragging
              ? 'border-cyan-500 bg-cyan-500/10'
              : 'border-border hover:border-cyan-500/50 hover:bg-accent/50',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <input
            type="file"
            accept={acceptedTypes}
            onChange={handleInputChange}
            className="hidden"
            disabled={disabled}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-cyan-500/10 p-4">
              <Upload className="h-8 w-8 text-cyan-500" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">
                Drop your {accept} here
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                or click to browse
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="h-4 w-4" />
              <span>
                {accept === 'image'
                  ? 'JPG, PNG, GIF, WebP'
                  : 'MP4, WebM, AVI, MOV'}
              </span>
            </div>
          </div>
        </label>
      )}
    </div>
  )
}
