import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Core
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import CareersPage from './pages/CareersPage'
import {
  CookiesPage,
  IBecomePage,
  InnovationPage,
  IYouthPage,
  PartnershipsPage,
  PrivacyPage,
  ServicesOverviewPage,
  TermsPage,
} from './pages/UtilityPages'

// Solutions
import SolutionsPage from './pages/SolutionsPage'
import MobilePrivateNetworksPage from './pages/MobilePrivateNetworksPage'
import TelecomsAIPage from './pages/TelecomsAIPage'
import GenerativeAIPage from './pages/GenerativeAIPage'
import SmartCitiesPage from './pages/SmartCitiesPage'
import Industry4Page from './pages/Industry4Page'
import SmartHealthPage from './pages/SmartHealthPage'

// Services
import ServicesConsultancyPage from './pages/ServicesConsultancyPage'
import ServicesEngineeringPage from './pages/ServicesEngineeringPage'
import ServicesSoftwarePage from './pages/ServicesSoftwarePage'
import ServicesDigitalTransformationPage from './pages/ServicesDigitalTransformationPage'
import ServicesIoTPage from './pages/ServicesIoTPage'
import ServicesAIMLPage from './pages/ServicesAIMLPage'

// Industries
import IndustriesEnterprisePage from './pages/IndustriesEnterprisePage'
import IndustriesTelecomsPage from './pages/IndustriesTelecomsPage'
import IndustriesPublicSectorPage from './pages/IndustriesPublicSectorPage'
import IndustriesHealthTechPage from './pages/IndustriesHealthTechPage'
import IndustriesEducationPage from './pages/IndustriesEducationPage'
import IndustriesRetailPage from './pages/IndustriesRetailPage'
import IndustriesDefencePage from './pages/IndustriesDefencePage'

// Products
import AruvaPage from './pages/AruvaPage'
import KaiPage from './pages/KaiPage'
import IcmapPage from './pages/IcmapPage'

// About
import AboutOverviewPage from './pages/AboutOverviewPage'
import AboutLeadershipPage from './pages/AboutLeadershipPage'
import AboutCertificationsPage from './pages/AboutCertificationsPage'
import AboutSustainabilityPage from './pages/AboutSustainabilityPage'

// Insights
import InsightsPage from './pages/InsightsPage'
import InsightsBlogPage from './pages/InsightsBlogPage'
import InsightsCaseStudiesPage from './pages/InsightsCaseStudiesPage'
import InsightsWhitePapersPage from './pages/InsightsWhitePapersPage'
import InsightsBlogPostPage from './pages/InsightsBlogPostPage'
import DesignRationalePage from './pages/DesignRationalePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Core */}
        <Route index element={<Home />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="ibecome" element={<IBecomePage />} />
        <Route path="iyouth" element={<IYouthPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="cookies" element={<CookiesPage />} />

        {/* Products */}
        <Route path="kai" element={<KaiPage />} />
        <Route path="aruva" element={<AruvaPage />} />
        <Route path="products/aruva" element={<AruvaPage />} />
        <Route path="products/kai" element={<KaiPage />} />
        <Route path="products/icmap" element={<IcmapPage />} />

        {/* Solutions */}
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="solutions/mobile-private-networks" element={<MobilePrivateNetworksPage />} />
        <Route path="solutions/telecoms-ai" element={<TelecomsAIPage />} />
        <Route path="solutions/generative-ai" element={<GenerativeAIPage />} />
        <Route path="solutions/smart-cities" element={<SmartCitiesPage />} />
        <Route path="solutions/industry-4" element={<Industry4Page />} />
        <Route path="solutions/smart-health" element={<SmartHealthPage />} />

        {/* Services */}
        <Route path="services" element={<ServicesOverviewPage />} />
        <Route path="services/consultancy" element={<ServicesConsultancyPage />} />
        <Route path="services/engineering" element={<ServicesEngineeringPage />} />
        <Route path="services/software" element={<ServicesSoftwarePage />} />
        <Route path="services/digital-transformation" element={<ServicesDigitalTransformationPage />} />
        <Route path="services/iot" element={<ServicesIoTPage />} />
        <Route path="services/ai-ml" element={<ServicesAIMLPage />} />

        {/* Industries */}
        <Route path="industries/enterprise" element={<IndustriesEnterprisePage />} />
        <Route path="industries/telecoms" element={<IndustriesTelecomsPage />} />
        <Route path="industries/public-sector" element={<IndustriesPublicSectorPage />} />
        <Route path="industries/health-tech" element={<IndustriesHealthTechPage />} />
        <Route path="industries/education" element={<IndustriesEducationPage />} />
        <Route path="industries/retail" element={<IndustriesRetailPage />} />
        <Route path="industries/defence" element={<IndustriesDefencePage />} />

        {/* About */}
        <Route path="about" element={<AboutOverviewPage />} />
        <Route path="about/overview" element={<AboutOverviewPage />} />
        <Route path="about/partnerships" element={<PartnershipsPage />} />
        <Route path="about/innovation" element={<InnovationPage />} />
        <Route path="about/leadership" element={<AboutLeadershipPage />} />
        <Route path="about/certifications" element={<AboutCertificationsPage />} />
        <Route path="about/sustainability" element={<AboutSustainabilityPage />} />

        {/* Insights */}
        <Route path="insights" element={<InsightsPage />} />
        <Route path="insights/blog" element={<InsightsBlogPage />} />
        <Route path="insights/case-studies" element={<InsightsCaseStudiesPage />} />
        <Route path="insights/white-papers" element={<InsightsWhitePapersPage />} />
        <Route path="insights/blog/:slug" element={<InsightsBlogPostPage />} />

        {/* Internal */}
        <Route path="design-rationale" element={<DesignRationalePage />} />

      </Route>
    </Routes>
  )
}
