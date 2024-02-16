"use client";
import React, { useRef, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function UploadVideo() {
  const [lab, setLab] = useState("")
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const getLab = async (text: string) => {
    const response = await fetch("/api/lab", {
      method: "POST",
      body: JSON.stringify({ text }),
    })
    const data = await response.json()
    setLab(data.result)
    setLoading(false)
  }

  const fetchTranscript = async (id: string) => {
    setLoading(true)
    const response = await fetch(`/api/trans?id=${id}`)
    const data = await response.json()
    getLab(data.result)
  }

  if (loading) {
    return <div className="text-xl text-center">Lab will be here soon...</div>
  }

  if (lab.length === 0) {
    return <div className="flex justify-center flex-col items-center gap-5">
      <Input ref={ref} className="w-auto" placeholder="Enter YT Video ID" type="text" defaultValue={"rJzjDszODTI"} />
      <Button onClick={(e) => {
        e.preventDefault()
        fetchTranscript(ref.current?.value || "")
      }}>Generate Lab</Button>
    </div>
  }

  return <div>
    <div className="container p-0"><MarkdownPreview className="p-10" source={lab} /></div>
  </div>

}
