"use client"

import { useState } from "react"
import { ArrowLeft, Leaf, Droplet, Apple, Egg, Fish, Milk, Wheat, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

type FoodCategory = {
  id: string
  name: string
  nameTamil: string
  icon: React.ElementType
  color: string
  foods: Food[]
}

type Food = {
  name: string
  nameTamil?: string
  benefit: string
  benefitTamil?: string
  trimester: number[]
  locallyAvailable: boolean
}

const foodCategories: FoodCategory[] = [
  {
    id: "vegetables",
    name: "Green Vegetables",
    nameTamil: "பச்சை காய்கறிகள்",
    icon: Leaf,
    color: "bg-safe",
    foods: [
      {
        name: "Spinach",
        nameTamil: "பசலைக்கீரை",
        benefit: "Rich in iron and folic acid, prevents anemia",
        benefitTamil: "இரும்பு மற்றும் ஃபோலிக் அமிலம் நிறைந்தது, இரத்த சோகையைத் தடுக்கிறது",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Bottle Gourd",
        nameTamil: "சுரைக்காய்",
        benefit: "Easy to digest, keeps body cool",
        benefitTamil: "எளிதில் ஜீரணமாகும், உடலைக் குளிர்ச்சியாக வைக்கும்",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Drumstick Leaves",
        nameTamil: "முருங்கை கீரை",
        benefit: "High in calcium and iron",
        benefitTamil: "கால்சியம் மற்றும் இரும்புச்சத்து அதிகம்",
        trimester: [2, 3],
        locallyAvailable: true,
      },
    ],
  },
  {
    id: "fruits",
    name: "Fruits",
    nameTamil: "பழங்கள்",
    icon: Apple,
    color: "bg-chart-3",
    foods: [
      {
        name: "Banana",
        nameTamil: "வாழைப்பழம்",
        benefit: "Energy and potassium for muscle health",
        benefitTamil: "தசைகளின் ஆரோக்கியத்திற்கு ஆற்றல் மற்றும் பொட்டாசியம்",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Pomegranate",
        nameTamil: "மாதுளை",
        benefit: "Increases blood, rich in antioxidants",
        benefitTamil: "இரத்தத்தை அதிகரிக்கிறது, ஆன்டிஆக்ஸிடன்ட்கள் நிறைந்தது",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Dates",
        nameTamil: "பேரீச்சம்பழம்",
        benefit: "Natural iron, good for third trimester",
        benefitTamil: "இயற்கை இரும்புச்சத்து, மூன்றாவது காலாண்டுக்கு நல்லது",
        trimester: [3],
        locallyAvailable: true,
      },
    ],
  },
  {
    id: "protein",
    name: "Protein",
    nameTamil: "புரதம்",
    icon: Egg,
    color: "bg-warning",
    foods: [
      {
        name: "Eggs",
        nameTamil: "முட்டை",
        benefit: "Complete protein for baby growth",
        benefitTamil: "குழந்தையின் வளர்ச்சிக்கு முழுமையான புரதம்",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Lentils (Dal)",
        nameTamil: "பருப்பு",
        benefit: "Protein and iron, easy to digest",
        benefitTamil: "புரதம் மற்றும் இரும்புச்சத்து, எளிதில் ஜீரணமாகும்",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Chickpeas",
        nameTamil: "கொண்டைக்கடலை",
        benefit: "Protein and fiber for digestion",
        benefitTamil: "செரிமானத்திற்கு புரதம் மற்றும் நார்ச்சத்து",
        trimester: [2, 3],
        locallyAvailable: true,
      },
    ],
  },
  {
    id: "dairy",
    name: "Dairy",
    nameTamil: "பால் பொருட்கள்",
    icon: Milk,
    color: "bg-chart-4",
    foods: [
      {
        name: "Milk",
        nameTamil: "பால்",
        benefit: "Calcium for baby bones",
        benefitTamil: "குழந்தையின் எலும்புகளுக்கு கால்சியம்",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Curd",
        nameTamil: "தயிர்",
        benefit: "Probiotics for gut health",
        benefitTamil: "குடல் ஆரோக்கியத்திற்கு புரோபயோடிக்ஸ்",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Paneer",
        nameTamil: "பனீர்",
        benefit: "Protein and calcium",
        benefitTamil: "புரதம் மற்றும் கால்சியம்",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
    ],
  },
  {
    id: "grains",
    name: "Grains",
    nameTamil: "தானியங்கள்",
    icon: Wheat,
    color: "bg-chart-5",
    foods: [
      {
        name: "Ragi",
        nameTamil: "ராகி",
        benefit: "High calcium, good for bones",
        benefitTamil: "அதிக கால்சியம், எலும்புகளுக்கு நல்லது",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Jowar",
        nameTamil: "சோளம்",
        benefit: "Rich in fiber and iron",
        benefitTamil: "நார்ச்சத்து மற்றும் இரும்புச்சத்து நிறைந்தது",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Brown Rice",
        nameTamil: "கைக்குத்தல் அரிசி",
        benefit: "Sustained energy release",
        benefitTamil: "நீடித்த ஆற்றலை வழங்குகிறது",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
    ],
  },
  {
    id: "hydration",
    name: "Hydration",
    nameTamil: "நீரேற்றம்",
    icon: Droplet,
    color: "bg-primary",
    foods: [
      {
        name: "Coconut Water",
        nameTamil: "இளநீர்",
        benefit: "Natural electrolytes, prevents dehydration",
        benefitTamil: "இயற்கை எலக்ட்ரோலைட்டுகள், நீர்ச்சத்தை பராமரிக்கிறது",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Buttermilk",
        nameTamil: "மோர்",
        benefit: "Cooling, aids digestion",
        benefitTamil: "குளிர்ச்சியானது, செரிமானத்திற்கு உதவுகிறது",
        trimester: [1, 2, 3],
        locallyAvailable: true,
      },
      {
        name: "Lemon Water",
        nameTamil: "எலுமிச்சை சாறு",
        benefit: "Vitamin C, reduces nausea",
        benefitTamil: "வைட்டமிண் சி, குமட்டலை குறைக்கிறது",
        trimester: [1, 2],
        locallyAvailable: true,
      },
    ],
  },
]

const trimesterFilters = [
  { value: 0, label: "All", labelTamil: "அனைத்தும்" },
  { value: 1, label: "Trimester 1", labelTamil: "முதல் காலாண்டு" },
  { value: 2, label: "Trimester 2", labelTamil: "இரண்டாம் காலாண்டு" },
  { value: 3, label: "Trimester 3", labelTamil: "மூன்றாம் காலாண்டு" },
]

export default function NutritionPage() {
  const [selectedTrimester, setSelectedTrimester] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filterFoods = (foods: Food[]) => {
    return foods.filter((food) => {
      const matchesTrimester = selectedTrimester === 0 || food.trimester.includes(selectedTrimester)
      const matchesSearch = searchQuery === "" || 
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (food.nameTamil && food.nameTamil.includes(searchQuery))
      return matchesTrimester && matchesSearch
    })
  }

  const activeCategory = selectedCategory 
    ? foodCategories.find((c) => c.id === selectedCategory)
    : null

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-safe">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="text-white">
            <h1 className="font-semibold">Nutrition Guide</h1>
            <p className="text-xs opacity-90">ஊட்டச்சத்து வழிகாட்டி</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search foods... / உணவைத் தேடுங்கள்..."
            className="w-full rounded-full border border-input bg-card py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Trimester Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {trimesterFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedTrimester === filter.value ? "default" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={() => setSelectedTrimester(filter.value)}
            >
              {filter.labelTamil}
            </Button>
          ))}
        </div>

        {/* Category View or Grid */}
        {activeCategory ? (
          <div className="space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to categories
            </Button>
            
            <Card className={cn("border-0 shadow-md", activeCategory.color)}>
              <CardHeader className="pb-2 text-white">
                <CardTitle className="flex items-center gap-2">
                  <activeCategory.icon className="h-5 w-5" />
                  {activeCategory.name}
                </CardTitle>
                <p className="text-sm opacity-90">{activeCategory.nameTamil}</p>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              {filterFoods(activeCategory.foods).map((food) => (
                <Card key={food.name} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{food.name}</h3>
                        <p className="text-sm text-muted-foreground">{food.nameTamil}</p>
                      </div>
                      {food.locallyAvailable && (
                        <span className="rounded-full bg-safe/10 px-2 py-1 text-xs text-safe">
                          Local
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-foreground">{food.benefit}</p>
                    <p className="text-xs text-muted-foreground">{food.benefitTamil}</p>
                    <div className="mt-2 flex gap-1">
                      {food.trimester.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                        >
                          T{t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Daily Recommendation */}
            <Card className="border-0 bg-primary/10 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground">Daily Recommendation</h3>
                <p className="text-sm text-muted-foreground">தினசரி பரிந்துரை</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  <li className="flex items-center gap-2">
                    <Milk className="h-4 w-4 text-primary" />
                    2-3 glasses of milk
                  </li>
                  <li className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-safe" />
                    1 bowl green vegetables
                  </li>
                  <li className="flex items-center gap-2">
                    <Apple className="h-4 w-4 text-chart-3" />
                    2 seasonal fruits
                  </li>
                  <li className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-primary" />
                    8-10 glasses of water
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Food Categories */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">Food Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {foodCategories.map((category) => {
                  const Icon = category.icon
                  const availableFoods = filterFoods(category.foods).length
                  return (
                    <Card
                      key={category.id}
                      className={cn(
                        "cursor-pointer border-0 shadow-md transition-transform hover:scale-105 active:scale-95",
                        category.color
                      )}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="flex flex-col items-center p-4 text-center text-white">
                        <div className="mb-2 rounded-full bg-white/20 p-3">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-xs opacity-90">{category.nameTamil}</p>
                        <p className="mt-1 text-xs opacity-80">{availableFoods} foods</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
