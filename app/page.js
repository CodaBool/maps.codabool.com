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

                {sections.map((section) => (
                  <div
                    key={section.key}
                    className="rounded-2xl border bg-background/40 p-4 shadow-sm my-4"
                  >
                    {/* Section header */}
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold tracking-tight">{section.title}</div>
                    </div>

                    {/* Main section items */}
                    {section.items?.length ? (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {section.items.map((it) => (
                          <div
                              key={it.href}
                            className="group flex items-center justify-between gap-3 rounded-xl border bg-background/30 px-3 py-2 text-sm transition hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="min-w-0">
                              <div className="truncate font-medium">{it.title}</div>
                              <div className="truncate text-xs text-muted-foreground group-hover:text-accent-foreground/80">
                                {it.note}
                              </div>
                            </div>

                            {it.additionalLink && (
                              <a href={it.additionalLink} target="_blank" className="shrink-0 rounded-lg border bg-background/40 px-2 py-1 text-[11px] text-muted-foreground transition group-hover:bg-background/20 group-hover:text-accent-foreground/90 text-xs">
                                {it.additionalLinkDesc} ↗
                              </a>
                            )}
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={it.href}

                            >
                            <span className="shrink-0 rounded-lg border bg-background/40 px-2 py-1 text-[11px] text-muted-foreground transition cursor-pointer group-hover:bg-background/20 group-hover:text-accent-foreground/90">
                              ↗
                                </span>
                              </a>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {/* Subsections (Map -> region/solar/jump/hex/station, etc.) */}
                    {section.subSections?.length ? (
                      <div className="mt-5 space-y-5">
                        {section.subSections.map((sub) => (
                          <div key={sub.key}>
                            <div className="mb-2 flex items-center gap-3">
                              <div className="text-xs font-semibold tracking-wide text-muted-foreground">
                                {sub.title.toUpperCase()}
                              </div>
                              <div className="h-px flex-1 bg-border" />
                            </div>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {sub.items.map((it) => (
                                <a
                                  key={it.href}
                                  href={it.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-center justify-between gap-3 rounded-xl border bg-background/30 px-3 py-2 text-sm transition hover:bg-accent hover:text-accent-foreground"
                                >
                                  <div className="min-w-0">
                                    <div className="truncate font-medium">{it.title}</div>
                                    {it.note ? (
                                      <div className="truncate text-xs text-muted-foreground group-hover:text-accent-foreground/80">
                                        {it.note}
                                      </div>
                                    ) : null}
                                  </div>
                                  <span className="shrink-0 rounded-lg border bg-background/40 px-2 py-1 text-[11px] text-muted-foreground transition group-hover:bg-background/20 group-hover:text-accent-foreground/90">
                                    ↗
                                  </span>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
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



const sections = [
  {
    key: "general",
    title: "General",
    items: [
      {
        href: "https://www.samcodes.co.uk/project/markov-namegen/",
        title: "Sam Twidale",
        note: "Uses Markov Chains to generate names",
      },
    ],
  },
  {
    key: "quickGen",
    title: "Quick Start",
    subSections: [

      {
        key: "planet",
        title: "Space",
        items: [
          {
            href: "https://anodyneprintware.com/planets",
            title: "Matt Umland",
            note: "planet encounter",
          },
          {
            href: "https://donjon.bin.sh/alien/system",
            title: "donjon alien system",
            note: "Solar system generator",
          },
        ],
      },
      {
        key: "ship",
        title: "Ship",
        items: [
          {
            href: "https://www.rolegenerator.com/en/module/spaceship",
            title: "RoleGenerator",
            note: "Random Ship",
          },

          {
            href: "https://pecios.netlify.app",
            title: "Delacannon",
            note: "node map",
          },
        ],
      },
      {
        key: "encounters",
        title: "Map",
        items: [

          {
            href: "https://sectorswithoutnumber.com",
            title: "mpigsley",
            note: "hex map",
          },
        ],
      },



    ],
  },

  {
    key: "create",
    title: "Create",
    items: [],
    subSections: [
      {
        key: "map-region",
        title: "Region",
        items: [
          {
            href: "https://azgaar.github.io",
            title: "Azgaar",
            note: "Customizable Region Map",
          },
        ],
      },
      {
        key: "map-city",
        title: "City",
        items: [
          {
            href: "https://anvaka.github.io/city-roads",
            title: "anvaka",
            note: "City roads",
          },
          {
            href: "https://probabletrain.itch.io/city-generator",
            title: "ProbableTrain",
            note: "City roads",
          },
        ],
      },
      {
        key: "planet",
        title: "Planet",
        items: [
          {
            href: "https://deep-fold.itch.io/pixel-planet-generator",
            title: "deep fold",
            note: "Pixel planet gif creator",
          },
        ],
      },
      {
        key: "map",
        title: "Map",
        items: [
          {
            href: "https://newtbb.netlify.app",
            title: "Delacannon",
            note: "Create a deck plan",
          },
        ],
      },
      {
        key: "variety",
        title: "Variety",
        items: [
          {
            href: "https://watabou.github.io/",
            title: "Watabou",
            note: "Region, City, Village, Cave/Glade, Dungeon, Dwelling",
          },
        ],
      },
      {
        key: "ships",
        title: "Ships",
        items: [
          {
            href: "https://rpggamer.org/main.php?page=cec-designer/cec-designer.php",
            title: "rpggamer.org",
            note: "ship builder",
          },
        ],
      },
    ],
  },

  {
    key: "mothership",
    title: "Mothership",
    items: [
      {
        href: "https://mothership-cockpit.netlify.app",
        title: "Oliver",
        note: "Resource Hub",
      },
      {
        href: "https://tools.dicedatalore.com/into-the-motherverse",
        title: "DiceDataLore",
        note: "Jump Map",
      },
      {
        href: "https://foundryvtt.com/packages/mothership-crew-relationships",
        title: "Eddie Dover",
        additionalLink: "https://github.com/EddieDover/mothership-crew-relationships/blob/master/src/lang/en.json",
        additionalLinkDesc: "Roll Table Link",
        note: "Player Relationships",
      },
      {
        href: "https://github.com/EddieDover/mothership-interactive-terminal",
        title: "Eddie Dover",
        note: "Terminal (coming soon)",
      },
      {
        href: "https://eddiedover.github.io/mothership-map-viewer/",
        title: "Eddie Dover",
        additionalLink: "https://foundryvtt.com/packages/mothership-map-viewer",
        additionalLinkDesc: "Foundry Package",
        note: "Map Creator",
      },
    ],
  },

  {
    key: "alienrpg",
    title: "Alien RPG",
    items: [
      {
        href: "https://sites.google.com/view/alienmobius-resources",
        title: "Mobius",
        note: "Resource Hub",
      },
      {
        href: "https://field.ludicrpg.com/alien-rpg/maps",
        title: "Ludic RPG maps",
        note: "Immersive deck plan map",
      },

    ],
  },
]
