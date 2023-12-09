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
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
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
import { images } from './maps'

export default function Home() {
  const [size, setSize] = useState()
  const [tag, setTag] = useState()
  const [search, setSearch] = useState("")
  const [showing, setShowing] = useState(images)
  const { toast } = useToast()
  
  useEffect(() => applyFilters(), [size, tag, search])

  function applyFilters() {
    let filtered = images
    if (!size && !tag && search === undefined) return
    if (size !== "all" && size !== undefined) {
      filtered = filtered.filter(card => card.size === size)
    }
    if (tag !== "all" && tag !== undefined) {
      filtered = filtered.filter(card => {
        if (!card.tags) return
        return card.tags.includes(tag)
      })
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
        <Input placeholder="Search" value={search} onChange={e => setSearch(e.target.value?.toLowerCase())} className="m-auto rounded  sm:w-[23.5rem] w-full center" />
        <div className="flex justify-center mt-4 mb-2 md:container md:mx-auto">
          <div className="mr-3">
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
        <div className="container mx-auto  sm:w-[50%] w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Alien RPG</AccordionTrigger>
              <AccordionContent>
                <p className="text-center text-ring">Check out these other creators</p>
                <ul className="leading-10 text-center">
                  <li><a href="https://newtbb.netlify.app/" target="_blank">Newt</a></li>
                  <li><a href="https://www.alienmobius.com/" target="_blank">Mobius</a></li>
                  <li><a href="http://game-mother.com/tools.html" target="_blank">Artifex</a></li>
                  {/* <li><a href="https://map.weylandyutani.company/dist/">Starmap (broken at the moment)</a></li> */}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>CodaBool</AccordionTrigger>
              <AccordionContent>
                <p className="text-center text-ring">Check out my other projects</p>
                <ul className="leading-10 text-center">
                  <li><a href="https://foundryvtt.com/packages/terminal" className="text-muted">Terminal</a> (coming soon)</li>
                  <li><a href="https://foundryvtt.com/packages/transit" className="text-muted">Transit</a> (coming soon)</li>
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
                <CardDescription>{image.id} | {image.size}</CardDescription>
              </CardHeader>
              <CardContent style={{height: "450px"}}>
                <Dialog>
                  <DialogTrigger>
                    <Image src={`/${image.id}.png`} width={400} height={400} alt={image.id} quality={40} className="cursor-pointer max-h-[400px]" />
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] h-[90vh] max-w-[90vw]">
                    <DialogHeader>
                      <DialogTitle>{image.title}<span className="m-10 text-ring">{image.size}</span></DialogTitle>
                      <Button variant="secondary" className="z-10 w-40 cursor-pointer" onClick={() => copyId(image.id)} style={{marginTop: "10px"}}><Copy className="w-4 h-4 mr-2" />Copy</Button>
                      <Image src={`/${image.id}.png`} fill alt="img" className="object-contain" />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <div className="">
                  {image.tags && image?.tags.map(tag => <Badge variant="secondary" key={tag}>{tag}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
  )
}
