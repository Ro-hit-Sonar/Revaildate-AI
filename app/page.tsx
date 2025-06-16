"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Code, CheckCircle, Users, Zap, ArrowRight, Linkedin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-white" />
              <span className="text-xl font-bold">Revaildate AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Stop Shipping
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {" "}
                Broken Code
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
              Get your AI-generated code reviewed by a simulated senior developer with 20+ years of experience.
              <br />
              <span className="text-white">Ship with confidence, not hope.</span>
            </p>
          </div>

          <div className="mb-12">
            <Link href="/login">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 h-auto">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Catch Issues Early</h3>
                <p className="text-gray-400 text-sm">
                  Identify bugs, security flaws, and performance issues before they reach production
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn Best Practices</h3>
                <p className="text-gray-400 text-sm">
                  Get mentorship-quality feedback that helps you grow as a developer
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ship Faster</h3>
                <p className="text-gray-400 text-sm">
                  Reduce debugging time and iterate quickly with confidence in your code quality
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who It Helps Section */}
      <section className="border-t border-zinc-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Perfect for developers who</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Use AI tools like ChatGPT, Claude, or Copilot for coding</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Want to ensure their AI-generated code is production-ready</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Are building MVPs and need to move fast without breaking things</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Don't have access to senior developers for code reviews</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Want to learn best practices and improve their coding skills</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Care about code quality, security, and performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">© 2024 Revaildate AI</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <span>Developed by Rohit Kumar</span>
              <a
                href="https://www.linkedin.com/in/rohittkumardev/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
