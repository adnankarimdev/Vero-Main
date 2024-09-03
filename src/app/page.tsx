"use client";

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { Star, MessageCircle, ThumbsUp, Shield, ArrowRight, Menu } from "lucide-react"
import Link from "next/link"
import MindMap from '@/components/ui/MindMap';
import Logo from '@/components/ui/Logo';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter();
  const onGetStarted = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      router.push("/dashboard");
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
          <Logo></Logo>
            {/* <span className="text-2xl font-bold text-gray-900">edefeyn</span> */}
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">Features</Link>
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">Pricing</Link>
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">About</Link>
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">Contact</Link>
          </nav>
          <Button variant="outline" className="hidden md:inline-flex" onClick={onGetStarted}>Get Started</Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white p-4 shadow-md">
            <Link className="block py-2 text-sm font-medium hover:text-blue-600 transition-colors" href="#">Features</Link>
            <Link className="block py-2 text-sm font-medium hover:text-blue-600 transition-colors" href="#">Pricing</Link>
            <Link className="block py-2 text-sm font-medium hover:text-blue-600 transition-colors" href="#">About</Link>
            <Link className="block py-2 text-sm font-medium hover:text-blue-600 transition-colors" href="#">Contact</Link>
            <Button variant="outline" className="mt-4 w-full" onClick={onGetStarted}>Get Started</Button>
          </nav>
        )}
      </header>
      <main className="flex-1 pt-20">
        <section className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Redefeyn Reviews
            </h1>
            {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            At Redefeyn, we’re committed to helping you connect with customers authentically. We simplify gathering genuine reviews, managing feedback, and boosting your online reputation, all with a personal touch.
            </p> */}
            <MindMap/>
            <div className="flex justify-center space-x-4">
              <Button variant="default" size="lg" onClick={onGetStarted}>Get Started</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Improve Your Online Reputation?</h2>
            <p className="text-xl text-gray-600">
              Join Redefeyn today and start collecting better, more meaningful reviews for your business.
            </p>
            <form className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button variant="default" type="submit">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-sm text-gray-500">
              By signing up, you agree to our <Link className="underline hover:text-blue-600" href="#">Terms & Conditions</Link>
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="ml-2 text-xl font-bold text-gray-900">Redefeyn</span>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link className="text-sm text-gray-600 hover:text-blue-600 transition-colors" href="#">Terms of Service</Link>
              <Link className="text-sm text-gray-600 hover:text-blue-600 transition-colors" href="#">Privacy Policy</Link>
              <Link className="text-sm text-gray-600 hover:text-blue-600 transition-colors" href="#">Contact Us</Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Redefeyn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}