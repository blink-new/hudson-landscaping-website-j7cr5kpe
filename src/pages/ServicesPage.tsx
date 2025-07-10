import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Leaf, Snowflake, Sun, TreePine, Package, Users } from 'lucide-react'
import { servicesData, Service } from '../data/services'
import { Link } from 'react-router-dom'

const seasonIcons = {
  spring: TreePine,
  summer: Sun,
  fall: Leaf,
  winter: Snowflake
}

export default function ServicesPage() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('packages')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['packages', 'spring', 'summer', 'fall', 'winter'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const getServicesBySeason = (season: string) => {
    return servicesData.filter(service => service.season === season && !service.isPackage)
  }

  const getPackages = () => {
    return servicesData.filter(service => service.isPackage)
  }

  const ServiceCard = ({ service }: { service: Service }) => (
    <Card className="hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{service.name}</CardTitle>
          {service.isPackage ? (
            <Package className="w-6 h-6 text-purple-500" />
          ) : (
            (() => {
              const Icon = seasonIcons[service.season]
              return <Icon className="w-6 h-6 text-green-500" />
            })()
          )}
        </div>
        <CardDescription className="text-sm h-12 overflow-hidden">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          {service.isPackage && service.packageItems && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">What's Included:</h4>
              <ul className="list-disc list-inside text-xs text-gray-600">
                {service.packageItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="capitalize">
              {service.season}
            </Badge>
            {service.priceType === 'hourly' && service.personnel && (
              <div className="flex items-center gap-1 text-sm">
                <Users className="w-4 h-4" />
                <span>{service.personnel} Person{service.personnel > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          <div className="text-right">
            {service.priceType === 'fixed' ? (
              <span className="text-2xl font-bold text-green-600">${service.price}</span>
            ) : (
              <span className="text-2xl font-bold text-green-600">
                ${service.price}<span className="text-sm font-normal">/hr per person</span>
              </span>
            )}
          </div>
        </div>
        <Link to={`/booking?service=${service.id}`} className="block mt-4">
          <Button className="w-full">
            {service.isPackage ? 'Book Package' : 'Book Service'}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services & Packages</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Choose from our curated packages or select individual services. We offer flexible pricing to meet your needs.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="packages" className="flex items-center gap-2"><Package className="w-4 h-4" /> Packages</TabsTrigger>
          <TabsTrigger value="spring" className="flex items-center gap-2"><TreePine className="w-4 h-4" /> Spring</TabsTrigger>
          <TabsTrigger value="summer" className="flex items-center gap-2"><Sun className="w-4 h-4" /> Summer</TabsTrigger>
          <TabsTrigger value="fall" className="flex items-center gap-2"><Leaf className="w-4 h-4" /> Fall</TabsTrigger>
          <TabsTrigger value="winter" className="flex items-center gap-2"><Snowflake className="w-4 h-4" /> Winter</TabsTrigger>
        </TabsList>

        <TabsContent value="packages">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Package className="w-8 h-8" /> Service Packages
            </h2>
            <p className="text-gray-600">Get the best value with our seasonal and year-round packages.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getPackages().map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>

        {(['spring', 'summer', 'fall', 'winter'] as const).map((season) => (
          <TabsContent key={season} value={season}>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 capitalize flex items-center gap-2">
                {React.createElement(seasonIcons[season], { className: "w-8 h-8" })}
                {season} Services
              </h2>
              <p className="text-gray-600">
                Individual services priced at $20/hr per person.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getServicesBySeason(season).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
