"use client"

import { useEffect, useState } from "react"
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
import { BarcodeReader } from "./BarcodeReader"
import DynamicImage from "./DynamicImage"
import { GoogleCustomImageSearchResponse } from "@/types/imageSearchTypes"
interface searchResultsType {
  id: number;
  url: string;
  alt: string;
}

export default function MainCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<searchResultsType[]>([])
  const [janCode, setJanCode] = useState("")

  const handleSearch = async () => {
    const res = await gsearchFetcher();
    const searchResults = res.items.map((elem, idx) => (
      {
        id: idx,
        url: elem.link,
        alt: elem.title,
      }
    ))
    setSearchResults(searchResults)
    setIsDrawerOpen(true)
  }

  const gsearchFetcher = async () => {
    const res = await fetch('/api/gsearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "query": janCode })
    });
    const data: GoogleCustomImageSearchResponse = await res.json();
    console.log(data.queries.request)
    console.log(data.items)
    return data
  }

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults])
  
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
              <img
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