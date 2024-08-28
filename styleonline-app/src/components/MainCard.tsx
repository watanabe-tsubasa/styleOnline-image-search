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
import Image, { ImageLoader } from "next/image"
import { BarcodeReader } from "./BarcodeReader"
import DynamicImage from "./DynamicImage"

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
          <CardTitle>商品画像確認アプリ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="JANコードをスキャンまたは入力"
            value={janCode}
            onChange={(e) => setJanCode(e.target.value)}
          />
            <DynamicImage
              janCode={janCode}
              width={400}
              height={400}
              altText="商品画像"
            />
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">JANコードをスキャン</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>JANコードスキャン</DialogTitle>
            <DialogDescription>
              JANコードをスキャンしてください
            </DialogDescription>
          </DialogHeader>
          <div>
            <BarcodeReader 
              setBarcode={setJanCode}
              isScanning={isModalOpen}
              setIsScanning={setIsModalOpen}
              open={isModalOpen}
              setOpen={setIsModalOpen}
            />
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