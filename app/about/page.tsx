import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, ArrowLeft, Target, Users, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Code className="h-6 w-6 text-white" />
              <span className="text-xl font-bold">Revaildate AI</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="container mx-auto px-4 py-16 mb-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Revaildate AI</h1>
            <p className="text-xl text-gray-400">
              Bridging the gap between AI-generated code and production-ready
              software
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4"> Hi, I'm Rohit Kumar,</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                a software developer passionate about solving real-world
                problems with code. I built Digital Queue as part of my{" "}
                <strong>"7 Days, 7 Projects"</strong> series on LinkedIn — an
                initiative where I challenged myself to build a new project
                every day using modern tools like Next.js and Vercel's v0.
              </p>
            </div>
          </div>
          <br />
          <br />
          <br />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  To help developers ship better code by providing expert-level
                  feedback on AI-generated solutions, ensuring quality and best
                  practices are maintained.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  Who We Serve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Solo developers, startups, and teams who rely on AI coding
                  assistants but need the confidence that comes with
                  senior-level code review.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  Why It Matters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  AI tools are powerful but not perfect. Our simulated senior
                  developer catches issues, suggests improvements, and helps you
                  learn—making your code production-ready.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
              >
                Try Revaildate AI
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
