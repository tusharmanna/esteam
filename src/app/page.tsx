import Preloader from '@/components/layout/Preloader'
import Footer from '@/components/layout/Footer'
import GoalSection from '@/components/sections/GoalSection'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <GoalSection />
      </main>
      <Footer />
      <ScrollToTop />
      <div className="overlay"></div>
    </>
  )
}
