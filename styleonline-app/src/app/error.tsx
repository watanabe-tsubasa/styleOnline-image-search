'use client'

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-muted">
      <h2 className="p-4 text-red-800">{ error.message }</h2>
      <Button onClick={() => reset()}>再読み込みする</Button>
    </div>
  )
}
