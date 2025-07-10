export interface Service {
  id: string
  name: string
  description: string
  season: 'spring' | 'summer' | 'fall' | 'winter'
  price?: number
  priceType?: 'fixed' | 'hourly'
  personnel?: number
  isPackage?: boolean
  packageItems?: string[]
}

export const servicesData: Service[] = [
  // Spring Packages
  {
    id: 'pkg-spring-basic',
    name: 'Spring Cleanup Basic Package',
    description: 'Get your yard ready for the season with our essential spring cleanup services.',
    season: 'spring',
    price: 350,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Garden Cleanup', 'Lawn Dethatching', 'Edging & Borders']
  },
  {
    id: 'pkg-spring-premium',
    name: 'Spring Garden Premium Package',
    description: 'A complete package for a vibrant spring garden, including mulch and planting.',
    season: 'spring',
    price: 600,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Mulch Installation', 'Flower Bed Preparation', 'Shrub Planting', 'Weed Control']
  },

  // Summer Packages
  {
    id: 'pkg-summer-lawn',
    name: 'Summer Lawn Care Package',
    description: 'Keep your lawn pristine all summer with our weekly maintenance package.',
    season: 'summer',
    price: 280,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Weekly Lawn Mowing (4 weeks)', 'Lawn Edging', 'Weed Suppression']
  },
  {
    id: 'pkg-summer-living',
    name: 'Outdoor Living Package',
    description: 'Perfect for enjoying your outdoor spaces, this package keeps your patio and pool area looking great.',
    season: 'summer',
    price: 450,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Patio & Deck Maintenance', 'Pool Area Landscaping', 'Hardscape Cleaning']
  },

  // Fall Packages
  {
    id: 'pkg-fall-cleanup',
    name: 'Fall Cleanup Package',
    description: 'Comprehensive fall cleanup to prepare your yard for winter.',
    season: 'fall',
    price: 400,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Leaf Removal', 'Gutter Cleaning', 'Garden Bed Cleanup']
  },
  {
    id: 'pkg-fall-winter-prep',
    name: 'Winterization Prep Package',
    description: 'Everything you need to protect your landscape during the winter months.',
    season: 'fall',
    price: 550,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Winterization Prep', 'Irrigation Winterization', 'Root Protection', 'Perennial Cutback']
  },

  // Winter Packages
  {
    id: 'pkg-winter-basic',
    name: 'Basic Snow Removal Package',
    description: 'Keep your driveway and sidewalks clear with our basic snow removal service.',
    season: 'winter',
    price: 250,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Snow Plowing (4 events)', 'Sidewalk Snow Removal', 'Pathway Salt Application']
  },
  {
    id: 'pkg-winter-premium',
    name: 'Premium Snow & Ice Package',
    description: 'Complete snow and ice management for your property, including roof and gutter services.',
    season: 'winter',
    price: 750,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Emergency Snow Service', 'Roof Snow Removal', 'Gutter Ice Dam Removal', 'Ice Removal & De-icing']
  },
  {
    id: 'pkg-year-round',
    name: 'Year-Round Maintenance Package',
    description: 'The ultimate hands-off solution for a perfect landscape all year long.',
    season: 'spring', // Or any, it's year-round
    price: 2500,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Seasonal Cleanup (4x)', 'Lawn Care Program', 'Snow Removal Contract', 'Priority Scheduling']
  },
  {
    id: 'pkg-custom-design',
    name: 'Landscape Design & Build Package',
    description: 'A complete design and installation package for your dream landscape.',
    season: 'spring',
    price: 3000,
    priceType: 'fixed',
    isPackage: true,
    packageItems: ['Landscape Design Consultation', 'Pathway Installation', 'Retaining Wall Construction', 'Tree & Shrub Planting']
  },

  // Individual Services - Priced Hourly
  { id: 'spring-1', name: 'Lawn Aeration', description: 'Core aeration to improve soil compaction.', season: 'spring', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'spring-2', name: 'Fertilization Program', description: 'Custom fertilization plan.', season: 'spring', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'spring-3', name: 'Mulch Installation', description: 'Fresh mulch application.', season: 'spring', price: 20, priceType: 'hourly', personnel: 2 },
  { id: 'spring-4', name: 'Tree Trimming', description: 'Professional pruning and shaping.', season: 'spring', price: 20, priceType: 'hourly', personnel: 2 },
  { id: 'spring-5', name: 'Flower Bed Preparation', description: 'Soil preparation and planting.', season: 'spring', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'summer-1', name: 'Weekly Lawn Mowing', description: 'Regular mowing service.', season: 'summer', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'summer-2', name: 'Watering & Irrigation', description: 'Automated and manual watering.', season: 'summer', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'summer-3', name: 'Flower Bed Maintenance', description: 'Weeding and deadheading.', season: 'summer', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'summer-4', name: 'Hedge Trimming', description: 'Shaping and maintenance of hedges.', season: 'summer', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'summer-5', name: 'Pest Control', description: 'Treatment for lawn and garden pests.', season: 'summer', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'fall-1', name: 'Leaf Removal', description: 'Complete removal of fallen leaves.', season: 'fall', price: 20, priceType: 'hourly', personnel: 2 },
  { id: 'fall-2', name: 'Gutter Cleaning', description: 'Thorough cleaning of gutters.', season: 'fall', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'fall-3', name: 'Winterization Prep', description: 'Preparing plants for winter.', season: 'fall', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'fall-4', name: 'Fall Fertilization', description: 'Winter prep fertilization.', season: 'fall', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'fall-5', name: 'Tree Pruning (Fall)', description: 'Dormant season pruning.', season: 'fall', price: 20, priceType: 'hourly', personnel: 2 },
  { id: 'winter-1', name: 'Snow Plowing', description: 'Driveway and parking area snow removal.', season: 'winter', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'winter-2', name: 'Sidewalk Snow Removal', description: 'Hand shoveling of sidewalks.', season: 'winter', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'winter-3', name: 'Ice Removal & De-icing', description: 'Safe removal of ice.', season: 'winter', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'winter-4', name: 'Emergency Snow Service', description: '24/7 emergency snow removal.', season: 'winter', price: 20, priceType: 'hourly', personnel: 1 },
  { id: 'winter-5', name: 'Roof Snow Removal', description: 'Safe removal of snow from roofs.', season: 'winter', price: 20, priceType: 'hourly', personnel: 2 }
];
