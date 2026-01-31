'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import OrderRequestForm from './OrderRequestForm'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function GoalSection() {
  return (
    <section className="goal-area position-relative">
      <div className="container">
        {/* Hero Banner with ESteam logo overlay */}
        <div className="row g-4">
          <div className="col-xxl-12 col-md-12 col-sm-12 position-relative">
            <div className="hero-banner-wrap" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              <Image
                src="/images/hero/hero-banner-1.jpg"
                alt="ESteam Hero Banner"
                width={1200}
                height={400}
                className="img-cover"
                style={{ width: '100%', height: 'auto' }}
                priority
              />
              <div
                className="hero-logo-overlay"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'clamp(240px, 38vw, 420px)',
                  height: 'clamp(240px, 38vw, 420px)',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                }}
              >
                <Image
                  src="/images/logo/esteam-logo.png"
                  alt="ESteam"
                  width={280}
                  height={84}
                  style={{ width: '75%', height: 'auto', maxWidth: '280px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row g-4">
          {/* Order Form Column */}
          <div className="col-xxl-6 col-md-6 col-sm-6">
            <motion.div
              className="goal-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="title line-clamp-1 text-color-primary">ESteam Order Request</h4>
              <p className="pera text-color-tertiary">
                After you fill out this order request, we will contact you to go over details and
                availability before the order is completed. If you would like faster service and
                direct information on current stock and pricing please contact us at{' '}
                <a href="tel:+17708158221">(770) 815-8221</a> or{' '}
                <a href="mailto:sales@esteam.com">sales@esteam.com</a>
              </p>

              <p className="pera text-color-tertiary mb-2">Fill out the form below</p>
              <OrderRequestForm />
            </motion.div>
          </div>

          {/* Content Column */}
          <div className="col-xxl-6 col-md-6 col-sm-6">
            <motion.div
              className="goal-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="title text-color-primary">
                WELCOME TO YOUR ONE-STOP SHOP FOR PERSONALIZED GIFTS!
              </h4>
              <p className="pera text-color-tertiary">
                At ESteam, every gift should be as unique as the recipient. That&apos;s why we
                specialize in crafting high-quality, customized products that are perfect for any
                occasion. Whether you&apos;re looking to commemorate a special event, promote your
                business, or express your style, our range of customizable t-shirts, coffee mugs,
                key chains, and coasters is designed to make you feel exceptional.
              </p>

              <p className="pera text-color-tertiary" style={{ color: '#ef4023' }}>
                <strong>WHY CHOOSE US?</strong>
              </p>
              <p className="pera text-color-tertiary">
                <strong>1. Unmatched Quality:</strong> We pride ourselves on using only the best
                materials and the latest printing technology to ensure your custom products are
                beautiful and durable. Every item, from our T-shirts&apos; fabric to our mugs&apos;
                ceramic, is crafted to last.
                <br />
                <strong>2. Easy Customization:</strong> Our user-friendly design team will help you
                easily create the perfect personalized gift. Fill out the given form, send us your
                designs, add text, and choose from various colors and styles to make each item a
                unique reflection of your creativity.
                <br />
                <strong>3. Fast and Reliable Completion:</strong> We understand timing is crucial,
                especially regarding gifts. That&apos;s why we offer quick turnaround times,
                ensuring you relax knowing your products will always be printed on time.
                <br />
                <strong>4. Exceptional Customer Service:</strong> Our dedicated team is here to help
                you every step of the way. Whether you have a question about your order or need
                assistance with the design process, we&apos;re just a click or a call away.
              </p>

              <p className="pera text-color-tertiary" style={{ color: '#ef4023' }}>
                <strong>OUR PRODUCTS</strong>
              </p>
              <p className="pera text-color-tertiary">
                <strong>Custom T-Shirts:</strong> Make your fashion statement with our custom
                T-shirts. Choose from various styles and sizes for men, women, and children. Whether
                for a family reunion, a bachelorette party, or a sports team, our T-shirts are the
                perfect canvas for your creativity.
                <br />
                <strong>Personalized Coffee Mugs:</strong> Start your day with a smile by designing
                your coffee mug. Perfect for home or the office, our mugs make great gifts for
                birthdays, holidays, or just because. Add your favorite photo, a special message, or
                a fun design to make it unique.
                <br />
                <strong>Customized Key Chains:</strong> Keep your memories close with our custom key
                chains. Small in size but big on impact, these key chains are a great way to carry a
                piece of your personality wherever you go. They are ideal for promotional giveaways,
                wedding favors, or personal keepsakes.
                <br />
                <strong>Unique Coasters:</strong> Protect your surfaces in style with our
                personalized coasters. Perfect for parties, corporate events, or everyday use, we
                can customize your coasters with designs, logos, or messages. They&apos;re a
                practical and stylish addition to any home or office.
              </p>

              <p className="pera text-color-tertiary" style={{ color: '#ef4023' }}>
                <strong>HOW IT WORKS</strong>
              </p>
              <ul className="listings">
                <li className="list">
                  <strong>1. Select Your Product:</strong> Choose from our wide range of
                  customizable items, fill out the given form, and send it to us.
                </li>
                <li className="list">
                  <strong>2. Customize Your Design:</strong> Call or email us to discuss your ideas.
                </li>
                <li className="list">
                  <strong>3. Place Your Order:</strong> Once you&apos;re happy with your design,
                  we&apos;ll send you an invoice and payment link.
                </li>
                <li className="list">
                  <strong>4. Enjoy Your Custom Creation:</strong> Your personalized product will be
                  printed, packed, and handed over to you.
                </li>
              </ul>

              <p className="pera text-color-tertiary" style={{ color: '#ef4023' }}>
                <strong>SATISFACTION GUARANTEED</strong>
              </p>
              <p className="pera text-color-tertiary">
                At ESteam, your satisfaction is our top priority. We stand by the quality of our
                products and are committed to providing you with a seamless shopping experience.
                Please fill out our form today and start creating your custom masterpieces. With
                ESteam, the possibilities are endless! Ready to get started? Please fill out our
                form now, and let&apos;s bring your ideas to life!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
