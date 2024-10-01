"use client"

import { useState, useRef, ChangeEvent } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fontOptions = [
  { value: "font-sans", label: "Sans-serif" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Monospace" },
]

export default function QRCodeDesigner() {
  const [qrContent, setQrContent] = useState("https://example.com")
  const [logoType, setLogoType] = useState<"image" | "text">("text")
  const [logoText, setLogoText] = useState("My Logo")
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [description, setDescription] = useState("Scan to visit our website")
  const [qrSize, setQrSize] = useState(200)
  const [logoSize, setLogoSize] = useState(64)
  const [selectedFont, setSelectedFont] = useState("font-sans")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Banner Designer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="qr-content">QR Code Content</Label>
            <Input
              id="qr-content"
              value={qrContent}
              onChange={(e) => setQrContent(e.target.value)}
              placeholder="Enter URL or text for QR code"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="logo-type"
              checked={logoType === "image"}
              onCheckedChange={(checked) => setLogoType(checked ? "image" : "text")}
            />
            <Label htmlFor="logo-type">Use Image Logo</Label>
          </div>
          {logoType === "text" ? (
            <div>
              <Label htmlFor="logo-text">Logo Text</Label>
              <Input
                id="logo-text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                placeholder="Enter logo text"
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="logo-image">Logo Image</Label>
              <Input
                id="logo-image"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                Upload Logo Image
              </Button>
            </div>
          )}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div>
            <Label htmlFor="qr-size">QR Code Size</Label>
            <Slider
              id="qr-size"
              min={100}
              max={300}
              step={10}
              value={[qrSize]}
              onValueChange={(value) => setQrSize(value[0])}
            />
          </div>
          <div>
            <Label htmlFor="logo-size">Logo Size</Label>
            <Slider
              id="logo-size"
              min={32}
              max={128}
              step={8}
              value={[logoSize]}
              onValueChange={(value) => setLogoSize(value[0])}
            />
          </div>
          <div>
            <Label htmlFor="font-select">Font</Label>
            <Select onValueChange={setSelectedFont} defaultValue={selectedFont}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className={`flex flex-col items-center space-y-4 ${selectedFont}`}>
            {logoType === "text" ? (
              <div
                className="text-2xl font-bold"
                style={{ fontSize: `${logoSize / 2}px` }}
              >
                {logoText}
              </div>
            ) : logoImage ? (
              <img
                src={logoImage}
                alt="Logo"
                className="object-contain"
                style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
              />
            ) : null}
            <QRCodeSVG value={qrContent} size={qrSize} />
            <p className="text-center text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}