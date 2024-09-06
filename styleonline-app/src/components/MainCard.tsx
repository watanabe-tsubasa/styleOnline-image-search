"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BarcodeReader } from "@/components/atoms/BarcodeReader"
import { DynamicImage } from "@/components/atoms/DynamicImage"
import { CommonDialog } from "@/components/atoms/CommonDialog"
import { CommonDrawer } from "@/components/atoms/CommonDrawer"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SearchDrawerBody } from "./SearchDrawerBody"
import { Skeleton } from "@/components/ui/skeleton"
import { ShelfPlacement } from "./ShelfPlacement"

export default function MainCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [janCode, setJanCode] = useState("")
  const [isQRMode, setIsQRMode] = useState<boolean>(true);
  
  const target = isQRMode ? 'QRコード': 'JANコード';

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
          <ShelfPlacement janCode={janCode} />
        </CardContent>
      </Card>

      <CommonDialog
        dialogTitle={`${target}をスキャン`}
        dialogDescription={`${target}をスキャンしてください`}
        dialogTrigger={<Button variant="outline">{`${target}をスキャン`}</Button>}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
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
      </CommonDialog>

      <CommonDrawer
        drawerTitle="画像検索結果"
        drawerDescription="Google 画像検索結果"
        drawerTrigger={
          <Button disabled={janCode.length === 0}>
            画像を検索
          </Button>
        }
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      >
        <Suspense fallback={
          <div className="grid grid-cols-2 gap-4 p-4">
            <Skeleton className="rounded-md aspect-square" />
            <Skeleton className="rounded-md aspect-square" />
            <Skeleton className="rounded-md aspect-square" />
            <Skeleton className="rounded-md aspect-square" />
          </div>
          }
        >
          
          <SearchDrawerBody query={janCode} />
        </Suspense>
      </CommonDrawer>
    </div>
  )
}
