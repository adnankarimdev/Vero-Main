'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, Image as ImageIcon, Link as LinkIcon, SmilePlus } from 'lucide-react'

export default function BlogWriter() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  const handlePublish = () => {
    console.log('Publishing:', { title, content, tags })
    // Here you would typically send the data to your backend
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Username</p>
            <p className="text-sm text-muted-foreground">Draft in @username</p>
          </div>
        </div>
        <Button onClick={handlePublish}>Publish</Button>
      </header>

      <main>
        <Input
          type="text"
          placeholder="Title"
          className="text-4xl font-bold mb-4 border-none placeholder:text-muted-foreground/50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Add tags..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border-none"
          />
        </div>

        <Card className="mb-4 p-2">
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon"><PlusCircle className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><ImageIcon className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><LinkIcon className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><SmilePlus className="h-4 w-4" /></Button>
          </div>
        </Card>

        <Textarea
          placeholder="Tell your story..."
          className="min-h-[300px] text-lg border-none resize-none placeholder:text-muted-foreground/50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </main>
    </div>
  )
}