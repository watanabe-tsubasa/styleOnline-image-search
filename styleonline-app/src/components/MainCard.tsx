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
import { BarcodeReader } from "@/components/BarcodeReader"
import DynamicImage from "@/components/DynamicImage"
import { gsearchAPIResponse } from "@/app/api/gsearch/route"
import { CommonDialog } from "@/components/CommonDialog"
import { CommonDrawer } from "@/components/CommonDrawer"
import { Switch } from "@/components/ui/switch"
import { Label } from "./ui/label"
interface searchResultsType {
  id: number;
  url: string;
  alt: string;
}

export default function MainCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDrawerModalOpen, setIsDrawerModalOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<searchResultsType[]>([])
  const [janCode, setJanCode] = useState("")
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isQRMode, setIsQRMode] = useState<boolean>(false);
  
  const target = isQRMode ? 'QRコード': 'JANコード';

  const handleSearch = async () => {
    setStatusMessage('');
    setSearchResults([]);
    const res = await gsearchFetcher();
    if ('error' in res) {
      console.error(res.error);
      setStatusMessage('ネットワークエラーが発生しました。再度検索してください');
    } else {
      setStatusMessage('画像をクリックして拡大表示が可能です。');
      setSearchResults(res)
    }
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
    const data: gsearchAPIResponse = await res.json();
    console.log(data)
    return data
  }

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 space-y-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex">
            <CardTitle className="flex flex-grow items-center">商品画像確認アプリ</CardTitle>
            <div className="flex flex-col items-center">
              <Switch
                id="QRmode"
                checked={isQRMode}
                onCheckedChange={setIsQRMode}
              />
              <Label htmlFor="QRmode">QRMode</Label>
            </div>
          </div>
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

      <CommonDialog
        dialogTitle={`${target}をスキャン`}
        dialogDescription={`${target}をスキャンしてください`}
        dialogTrigger={<Button variant="outline">{`${target}をスキャン`}</Button>}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dialogChildren={
          <div>
            <BarcodeReader 
              setBarcode={setJanCode}
              isScanning={isModalOpen}
              setIsScanning={setIsModalOpen}
              open={isModalOpen}
              setOpen={setIsModalOpen}
              isQRMode={isQRMode}
            />
          </div>
        }
      />

      <CommonDrawer
        drawerTitle="画像検索結果"
        drawerDescription="Google 画像検索結果"
        drawerTrigger={<Button onClick={handleSearch}>画像を検索</Button>}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        statusMessage={statusMessage}
        drawerChildren={
          searchResults.map((result) => (
            <div>
              <img
                key={result.id}
                src={result.url}
                alt={result.alt}
                width={150}
                height={150}
                className="rounded-md"
              />
            </div>
          ))
        }
      />
    </div>
  )
}