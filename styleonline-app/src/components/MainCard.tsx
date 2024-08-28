"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Image from "next/image"

// ダミーの画像検索結果

interface searchResultsType {
  id: number;
  url: string;
  alt: string;
}
const dummySearchResults = [
  { id: 1, url: "/placeholder.svg", alt: "検索結果1" },
  { id: 2, url: "/placeholder.svg", alt: "検索結果2" },
  { id: 3, url: "/placeholder.svg", alt: "検索結果3" },
]

export default function MainCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<searchResultsType[]>([])
  const [cardTitle, setCardTitle] = useState("")
  const [janCode, setJanCode] = useState("")

  const handleSearch = () => {
    // 実際のアプリケーションでは、ここでAPIを呼び出します
    // この例では、ダミーデータを使用しています
    setSearchResults(dummySearchResults)
    setIsDrawerOpen(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 space-y-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Input
            type="text"
            placeholder="カードタイトルを入力"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            className="text-lg font-semibold"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="JANコードをスキャンまたは入力"
            value={janCode}
            onChange={(e) => setJanCode(e.target.value)}
          />
          <Image
            src="/placeholder.svg"
            alt="カード画像"
            width={400}
            height={200}
            layout="responsive"
            className="rounded-md"
          />
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">モーダルを開く</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>モーダルタイトル</DialogTitle>
            <DialogDescription>
              ここにモーダルの内容を記述します。スマートフォンでも見やすいデザインになっています。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>モーダルの本文をここに記述できます。</p>
          </div>
          <Button onClick={() => setIsModalOpen(false)}>閉じる</Button>
        </DialogContent>
      </Dialog>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button onClick={handleSearch}>画像を検索</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>画像検索結果</DrawerTitle>
            <DrawerDescription>Google Search APIの検索結果</DrawerDescription>
          </DrawerHeader>
          <div className="grid grid-cols-2 gap-4 p-4">
            {searchResults.map((result) => (
              <Image
                key={result.id}
                src={result.url}
                alt={result.alt}
                width={150}
                height={150}
                className="rounded-md"
              />
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">閉じる</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}