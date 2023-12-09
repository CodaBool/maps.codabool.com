"use client"

import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const images = [
  { id: "020", title: "cool thang", size: "small", src: "/020.png", tags: ["elevator"] },
  { id: "VC04", title: "cool thing", size: "large", src: "/VC04.png", tags: ["elevator", "multifloor"] },
  { id: "112", title: "cool bean", size: "medium", src: "/112.png", tags: ["elevator"] },
  { id: "legacy", title: "cool true", size: "large", src: "/legacy.png", tags: ["elevator"] },
]

export default function Home() {
  const [size, setSize] = useState()
  const [tag, setTag] = useState()
  const [search, setSearch] = useState("")
  // const [modalImg, setModalImg] = useState()
  // const [loading, setLoading] = useState()
  const [showing, setShowing] = useState(images)
  const dialog = useRef()
  const { toast } = useToast()
  
  useEffect(() => applyFilters(), [size, tag, search])

  function applyFilters() {
    let filtered = images
    if (!size && !tag && search === undefined) return
    if (size !== "all" && size !== undefined) {
      filtered = filtered.filter(card => card.size === size)
    }
    if (tag !== "all" && tag !== undefined) {
      filtered = filtered.filter(card => card.tags.includes(tag))
    }
    if (search !== "" && search !== undefined) {
      filtered = filtered.filter(card => card.title.toLowerCase().includes(search))
    }
    setShowing(filtered)
  }

  function copyId(id) {
    navigator.clipboard.writeText(id)
    toast({
      title: id,
      description: "The map ID has been copied to your clipboard",
    })
  }

  return (
      <main className="mt-6">
        <Input placeholder="Search" value={search} onChange={e => setSearch(e.target.value?.toLowerCase())} className="m-auto rounded w-[25.2rem] center" />
        <div className="container flex justify-center mx-auto mt-4 mb-2">
          <div className="mr-10">
            <h4 className="mb-2 ml-1">Category</h4>
            <Select onValueChange={setTag}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="elevator">Elevator</SelectItem>
                <SelectItem value="multifloor">Multifloor</SelectItem>
                <SelectItem value="vehicle">Vehicle</SelectItem>
                <SelectItem value="hangar">Hangar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h4 className="mb-2">Size</h4>
            <Select onValueChange={setSize}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="container mx-auto w-[50%]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Alien RPG</AccordionTrigger>
              <AccordionContent>
                <ul className="leading-10 text-center">
                  <li><a href="https://newtbb.netlify.app/">Newt</a></li>
                  <li><a href="https://www.alienmobius.com/">Mobius</a></li>
                  <li><a href="http://game-mother.com/tools.html">Artifex</a></li>
                  {/* <li><a href="https://map.weylandyutani.company/dist/">Starmap (broken at the moment)</a></li> */}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {showing.map(image => (
            <Card key={image.id} id={image.id} className="min-w-[400px] m-4">
              <CardHeader onClick={() => copyId(image.id)} className="cursor-pointer">
                <CardTitle>{image.title}</CardTitle>
                <CardDescription>{image.id}</CardDescription>
              </CardHeader>
              <CardContent style={{height: "450px"}}>
                <Dialog>
                  <DialogTrigger>
                    <Image src={image.src} width={400} height={400} alt={image.id} quality={50} className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] h-[90vh] max-w-[90vw]" something={true}>
                    <DialogHeader>
                      <DialogTitle>{image.title}</DialogTitle>
                      <DialogDescription>
                        <Image src={image.src} placeholder="empty" fill alt="img" className="object-contain" />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <div className="">
                  {image.tags.map(tag => <Badge variant="secondary" key={tag}>{tag}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
  )
}
