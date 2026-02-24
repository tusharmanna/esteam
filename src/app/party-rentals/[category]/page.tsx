'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import RentalProductRow from '@/components/rental/RentalProductRow'
import {
  chairProducts,
  tableProducts,
  cateringProducts,
  chinaAndChargersProducts,
  danceFloorProducts,
  disposablePartyGoodsProducts,
  eventDecorProducts,
  flatwareProducts,
  glasswareProducts,
  heatingAndCoolingProducts,
  linenProducts,
  packagesProducts,
  pipeAndDrapeProducts,
  stagingProducts,
  tentsAndAccessoriesProducts,
  weddingItemsProducts,
} from '@/data/rentalProducts'
import { Product } from '@/types'

const categoryConfig: Record<string, { title: string; products: Product[] }> = {
  catering: { title: 'Catering', products: cateringProducts },
  chairs: { title: 'Chairs', products: chairProducts },
  'china-and-chargers': { title: 'China and Chargers', products: chinaAndChargersProducts },
  'dance-floors': { title: 'Dance Floors', products: danceFloorProducts },
  'disposable-party-goods': { title: 'Disposable Party Goods', products: disposablePartyGoodsProducts },
  'event-decor': { title: 'Event Décor', products: eventDecorProducts },
  flatware: { title: 'Flatware', products: flatwareProducts },
  glassware: { title: 'Glassware', products: glasswareProducts },
  'heating-and-cooling': { title: 'Heating and Cooling', products: heatingAndCoolingProducts },
  linen: { title: 'Linen', products: linenProducts },
  packages: { title: 'Packages', products: packagesProducts },
  'pipe-and-drape': { title: 'Pipe and Drape', products: pipeAndDrapeProducts },
  staging: { title: 'Staging', products: stagingProducts },
  tables: { title: 'Tables', products: tableProducts },
  'tents-and-accessories': { title: 'Tents and Accessories', products: tentsAndAccessoriesProducts },
  'wedding-items': { title: 'Wedding Items', products: weddingItemsProducts },
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string

  const config = categoryConfig[category]

  if (!config) {
    notFound()
  }

  return (
    <main className="party-rentals-category-page">
      <div className="container py-5">
        <nav className="mb-4" aria-label="Breadcrumb">
          <Link href="/party-rentals" className="text-secondary text-decoration-none small">
            ← Party Rentals
          </Link>
        </nav>
        <h1 className="page-title mb-4">{config.title}</h1>
        <div className="rental-list">
          {config.products.map((product) => (
            <RentalProductRow key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
