import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FeatureSection } from './components/FeatureSection';
import { BenefitCard } from './components/BenefitCard';
import { EmailSignupModal } from './components/EmailSignupModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import ReleaseNotes from './components/ReleaseNotes';

type ButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; to?: string })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string });

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const benefits = [
    {
      icon: '📸',
      title: 'Photo Analysis',
      description: 'Advanced image processing for detailed insights'
    },
    {
      icon: '⭐',
      title: 'Multi-Category Scoring',
      description: 'Detailed ratings across 7 categories'
    },
    {
      icon: '🎯',
      title: 'Personalized Tasks',
      description: 'Ultra-specific improvement recommendations'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your transformation over time'
    }
  ];

  const features = [
    {
      imageSrc: '/uploadPhoto.png',
      imageAlt: 'Photo Analysis',
      title: 'Smart Photo Analysis',
      description: 'Upload your photo and get analyzed across multiple categories. Get detailed ratings for clothing, skin, facial structure, hair, eyes, smile, and overall presence.',
      isReversed: false
    },
    {
      imageSrc: '/profileSetup.png',
      imageAlt: 'Personalized Profile',
      title: 'Comprehensive User Profile',
      description: 'Complete our detailed questionnaire covering demographics, style preferences, beauty routines, goals, lifestyle, and concerns. This information helps provide ultra-personalized recommendations.',
      isReversed: true
    },
    {
      imageSrc: '/tasks.png',
      imageAlt: 'Improvement Tasks',
      title: 'Actionable Improvement Tasks',
      description: 'Receive prioritized, ultra-specific tasks tailored to your needs. Track your progress with our smart task management system and watch your transformation unfold.',
      isReversed: false
    },
    {
      imageSrc: '/myRatings.png',
      imageAlt: 'Detailed Ratings',
      title: 'In-Depth Category Ratings',
      description: 'View comprehensive scores for each category with professional interpretation. Tap any category to see detailed analysis and understand exactly where you excel and where you can improve.',
      isReversed: true
    }
  ];

  return (
    <Router>
      <EmailSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Container>
        <Nav>
          <NavGroup>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <LogoWrapper>
                <img src="/logo.png" alt="Baddie" />
              </LogoWrapper>
              <Logo>Baddie</Logo>
            </Link>
          </NavGroup>
          <NavEnd>
            <NavLink to="/">Home</NavLink>
          </NavEnd>
        </Nav>
        <MainContent>
          <Routes>
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/issues" element={<ReleaseNotes />} />
            <Route path="/" element={
              <>
                <HeroSection>
                  <div>
                    <MainHeading>TRANSFORM YOUR LOOK WITH PERSONALIZED STYLING</MainHeading>
                    <GetStartedButton as="button" onClick={() => setIsModalOpen(true)}>Join the Waitlist</GetStartedButton>
                  </div>
                  <LogoImageWrapper>
                    <img src="/logo.png" alt="Baddie Logo" />
                  </LogoImageWrapper>
                </HeroSection>

                <BenefitsSection>
                  {benefits.map((benefit, index) => (
                    <BenefitCard
                      key={index}
                      icon={benefit.icon}
                      title={benefit.title}
                      description={benefit.description}
                    />
                  ))}
                </BenefitsSection>

                {features.map((feature, index) => (
                  <FeatureSection
                    key={index}
                    imageSrc={feature.imageSrc}
                    imageAlt={feature.imageAlt}
                    title={feature.title}
                    description={feature.description}
                    isReversed={feature.isReversed}
                  />
                ))}

                <CTASection>
                  <CTAImageWrapper>
                    <img src="/logo.png" alt="Baddie" />
                  </CTAImageWrapper>
                  <CTATitle>Ready to transform your look?</CTATitle>
                  <GetStartedButton as="button" onClick={() => setIsModalOpen(true)}>Join the Waitlist</GetStartedButton>
                </CTASection>
              </>
            } />
          </Routes>
          <Footer>
            <FooterLinks>
              <FooterLinkExternal href="http://aes-alb-692757062.us-east-2.elb.amazonaws.com/static/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</FooterLinkExternal>
              <FooterLinkExternal href="http://aes-alb-692757062.us-east-2.elb.amazonaws.com/static/terms" target="_blank" rel="noopener noreferrer">Terms of Service</FooterLinkExternal>
            </FooterLinks>
            <Copyright>© {new Date().getFullYear()} Baddie. All rights reserved.</Copyright>
          </Footer>
        </MainContent>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #fff;
  color: #4b4b4b;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  overflow-x: hidden;
  padding: 0;
  width: 100%;
  position: relative;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 48px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  z-index: 1000;

  max-width: 800;
  margin: 0 auto;
  padding: 0.75rem 15%;

  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
  }
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const NavEnd = styled.div`
  display: flex;
  gap: 1rem;
  margin-right: 0;
`;

const LogoWrapper = styled.div`
  height: 40px;
  margin-top: 2px;
  
  img {
    height: 100%;
    width: auto;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #6366f1;
  display: flex;
  align-items: center;
`;

const MainContent = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 72px 24px 0;
  background-color: #fff;
`;

const HeroSection = styled.div`
  padding: 6rem 0 8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  margin: 0 auto;
  max-width: 960px;
  direction: rtl;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  > * {
    direction: ltr;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 4rem 1rem;
    text-align: center;
    gap: 1rem;
    direction: ltr;

    display: flex;
    flex-direction: column-reverse;
  }
`;

const MainHeading = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #1a1a1a;
  margin-bottom: 2rem;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.02em;
`;

const LogoImageWrapper = styled.div`
  height: 360px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 100%;
    height: 100%;
    max-width: 360px;
    max-height: 360px;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    height: 280px;
    margin-bottom: 2rem;
    
    img {
      max-width: 280px;
      max-height: 280px;
    }
  }
`;

const Button = styled.button<ButtonProps>`
  display: inline-block;
  width: auto;
  padding: 1.2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: none;
  text-decoration: none;
`;

const GetStartedButton = styled(Button)`
  background-color: #6366f1;
  color: #fff;
  border: none;
  padding: 0.875rem 1.75rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 4px 0 #4f46e5;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  
  &:hover {
    transform: translateY(-1px);
    background-color: #818cf8;
    color: #fff;
    text-decoration: none;
  }
  
  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #4f46e5;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    min-width: 120px;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #4b4b4b;
  transition: color 0.2s ease;

  &:hover {
    color: #6366f1;
  }
`;

const BenefitsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 3rem 2rem;
  margin: 0 auto;
  max-width: 960px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem 0;
  margin-top: 1rem;
  border-top: 1px solid #EEEEEE;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
    margin-top: 0.5rem;
  }
`;

const Copyright = styled.p`
  color: #999;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const CTASection = styled.section`
  text-align: center;
  padding: 8rem 2rem;
  background: #fff;
  margin: 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const CTAImageWrapper = styled.div`
  width: 140px;
  margin: 0 auto 1.5rem;
  animation: float 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: 100px;
    margin-bottom: 1rem;
  }
  
  img {
    width: 100%;
    height: auto;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const CTATitle = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FooterLinks = styled.div`
  margin-bottom: 1rem;
`;

const FooterLinkExternal = styled.a`
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #4b4b4b;
  transition: color 0.2s ease;

  &:hover {
    color: #6366f1;
  }
`;

export default App;
