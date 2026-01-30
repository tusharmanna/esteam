'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/products/ProductCard'
import { products, categories } from '@/data/products'

export default function HandicraftsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  return (
    <main className="handicrafts-page">
      <div className="container py-5">
        {/* Page Header */}
        <motion.div
          className="page-header text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">Handicrafts Collection</h1>
          <p className="page-subtitle">
            Discover our unique collection of handcrafted items, each made with love and care by skilled artisans.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="category-filter mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="products-grid">
          <div className="row g-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="col-lg-3 col-md-4 col-sm-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products text-center py-5">
            <p className="text-muted">No products found in this category.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .handicrafts-page {
          min-height: 100vh;
          background: #f9f9f9;
        }
        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-title);
          margin-bottom: 1rem;
        }
        .page-subtitle {
          font-size: 1.1rem;
          color: var(--tertiary-title);
          max-width: 600px;
          margin: 0 auto;
        }
        .filter-btn {
          padding: 0.5rem 1.25rem;
          border: 2px solid #e0e0e0;
          background: #fff;
          border-radius: 25px;
          font-weight: 600;
          color: var(--secondary-title);
          cursor: pointer;
          transition: all 0.3s;
        }
        .filter-btn:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
        .filter-btn.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: #fff;
        }
        @media (max-width: 576px) {
          .page-title {
            font-size: 1.75rem;
          }
          .page-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </main>
  )
}
