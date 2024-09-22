'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface LocationLinkQRProps {
  locationURL: string
  placeName: string
  setQrLinkOpen?: (value: boolean) => void;
  openDialog?: boolean;
}

export default function LocationLinkQR({ locationURL, placeName, openDialog, setQrLinkOpen }: LocationLinkQRProps) {
  return (
    <div className="flex justify-center p-4">
      <Dialog onOpenChange={setQrLinkOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{placeName} QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code to open the link for {placeName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-6 bg-background rounded-lg">
            <QRCodeSVG value={locationURL} size={200} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}