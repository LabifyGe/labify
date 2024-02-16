"use client";
import React, { useRef, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

export default function UploadVideo() {
  const [lab, setLab] = useState("")
  const [loading, setLoading] = useState(false)
  const [textar, setTextar] = useState(`Python Classes/Objects

  Python is an object oriented programming language.
  
  Almost everything in Python is an object, with its properties and methods.
  
  A Class is like an object constructor, or a "blueprint" for creating objects.
  Create a Class
  
  To create a class, use the keyword class:
  Example
  Get your own Python Server
  
  Create a class named MyClass, with a property named x:
  class MyClass:
    x = 5
  Create Object
  
  Now we can use the class named MyClass to create objects:
  Example
  
  Create an object named p1, and print the value of x:
  p1 = MyClass()
  print(p1.x)
  The __init__() Function
  
  The examples above are classes and objects in their simplest form, and are not really useful in real life applications.
  
  To understand the meaning of classes we have to understand the built-in __init__() function.
  
  All classes have a function called __init__(), which is always executed when the class is being initiated.
  
  Use the __init__() function to assign values to object properties, or other operations that are necessary to do when the object is being created:
  Example
  
  Create a class named Person, use the __init__() function to assign values for name and age:
  class Person:
    def __init__(self, name, age):
      self.name = name
      self.age = age
  
  p1 = Person("John", 36)
  
  print(p1.name)
  print(p1.age) `)

  const ref = useRef<HTMLInputElement>(null)
  const getLab = async (text: string) => {
    setLoading(true)
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
      {/* <Input disabled={textar.length > 0} ref={ref} className="w-auto" placeholder="Enter YT Video ID" type="text" defaultValue={"rJzjDszODTI"} /> */}
      <Textarea className="max-w-[800px] h-[500px]" onChange={(e) => {
        setTextar(e.target.value)
      }} value={textar} placeholder="Enter text here" />
      <Button disabled={textar.length === 0} onClick={(e) => {
        e.preventDefault()
        if (textar.length === 0) return alert("Please enter text")
        getLab(textar)
        // fetchTranscript(ref.current?.value || "")
      }}>Generate Lab</Button>
    </div>
  }

  return <div>
    <div className="container p-0"><MarkdownPreview className="p-10" source={lab} /></div>
  </div>

}
