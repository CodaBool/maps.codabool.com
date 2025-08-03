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
              <SelectItem value="multi-level">Multi-Level</SelectItem>
              <SelectItem value="vehicle">Vehicle</SelectItem>
              <SelectItem value="hangar">Hangar</SelectItem>
              <SelectItem value="bay">Vehicle Bay</SelectItem>
              <SelectItem value="destructable">Destructable</SelectItem>
              <SelectItem value="prop">prop</SelectItem>
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
            <AccordionTrigger>Other Creators</AccordionTrigger>
            <AccordionContent>
              <div className="text-center text-sm text-gray-400 italic mb-4">
                "Talk is cheap. Show me the code." ― Linus
              </div>
              <ul className="leading-10 text-center">
                <li><a href="https://watabou.github.io/" target="_blank" rel="noopener noreferrer">watabou (variety)</a></li>
                <li><a href="https://sites.google.com/view/alienmobius-resources" target="_blank" rel="noopener noreferrer">mobius (variety)</a></li>
                <li><a href="https://azgaar.github.io" target="_blank" rel="noopener noreferrer">azgaar (map)</a></li>
                <li><a href="https://newtbb.netlify.app/" target="_blank" rel="noopener noreferrer">Delacannon (map)</a></li>
                <li><a href="https://map.weylandyutani.company/" target="_blank" rel="noopener noreferrer">Clay DeGrunchy (Alien Map)</a></li>
                <li><a href="https://anvaka.github.io/city-roads" target="_blank" rel="noopener noreferrer">anvaka (city roads)</a></li>
                <li><a href="https://donjon.bin.sh/alien/system" target="_blank" rel="noopener noreferrer">donjon (solar system)</a></li>
                <li><a href="https://deep-fold.itch.io/pixel-planet-generator" target="_blank" rel="noopener noreferrer">deep-fold (planet)</a></li>
                <li><a href="https://anodyneprintware.com/planets" target="_blank">Matt Umland (planet)</a></li>
                <li><a href="https://www.rolegenerator.com/en/module/spaceship" target="_blank">rolegenerator.com (ships)</a></li>
                <li><a href="https://rpggamer.org/main.php?page=cec-designer/cec-designer.php" target="_blank" rel="noopener noreferrer">rpggamer.org (ships)</a></li>
                <li><a href="https://game-mother.com/tools.html" target="_blank">Artifex (character)</a></li>
                <li><a href="https://www.samcodes.co.uk/project/markov-namegen/" target="_blank">Sam Twidale (names)</a></li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>CodaBool</AccordionTrigger>
            <AccordionContent>
              <p className="text-center text-ring">Check out my other projects</p>
              <ul className="leading-10 text-center">
                <li className="animate-[changeColor_2s_ease-in-out_infinite,wiggle_2s_ease-in-out_infinite]"><a href="https://codabool.itch.io/terminal/" target="_blank">Terminal</a></li>
                <li className="text-ring"><a href="https://codabool.itch.io/stargazer" target="_blank">Stargazer</a></li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How to use</AccordionTrigger>
            <AccordionContent>
              <p className="text-xl text-center text-ring">This content is intended to be a companion app for a Foundry compendium. If you are using Foundry download the compendium first. It is called <a href="https://codabool.itch.io/maps-in-cyberspace" className="text-bold text-blue-300" target="_blank">Maps in CyberSpace</a> and can be downloaded for <span className="text-primary text-bold">free</span>. All walls and in some cases lighting have been added to the maps.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {showing.map((image, index) => (
          <Card key={image.id} id={image.id} className="min-w-[400px] m-4">
            <CardHeader onClick={() => copyId(image.id)} className="cursor-pointer">
              <CardTitle>{image.title}</CardTitle>
              <CardDescription>{image.id} | {image.size}</CardDescription>
            </CardHeader>
            <CardContent style={{ height: "450px" }}>
              <Dialog>
                <DialogTrigger>
                  <Image src={`/${image.id}.png`} width={400} height={400} priority={index < 10} alt={image.id} quality={40} className="cursor-pointer max-h-[400px] object-contain" />
                </DialogTrigger>
                <DialogContent className="w-[90vw] h-[90vh] max-w-[90vw]">
                  <DialogHeader>
                    <DialogTitle>{image.title}<span className="m-10 text-ring">{image.size}</span></DialogTitle>
                    <Button variant="secondary" className="z-10 w-40 cursor-pointer" onClick={() => copyId(image.id)} style={{ marginTop: "10px" }}><Copy className="w-4 h-4 mr-2" />Copy</Button>
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
