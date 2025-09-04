import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { FormatsSection } from "@/components/formats-section"
import { SelfStudySection } from "@/components/self-study-section"
import { TestimonialsFeed } from "@/components/testimonials-feed"
import { InteractiveGame } from "@/components/interactive-game"
import { LearningJourney } from "@/components/learning-journey"
import { ResultsSlider } from "@/components/results-slider"
import { TeacherMatching } from "@/components/teacher-matching"
import { PricingSection } from "@/components/pricing-section"
import { ReadinessQuiz } from "@/components/readiness-quiz"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <HowItWorks />
        <FormatsSection />
        <SelfStudySection />
        <TestimonialsFeed />
        <InteractiveGame />
        <LearningJourney />
        <ResultsSlider />
        <TeacherMatching />
        <PricingSection />
        <ReadinessQuiz />
        <Footer />
      </div>
    </main>
  )
}
