"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Code, MessageSquare, CheckCircle, LogOut, User } from "lucide-react"

const languages = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Python",
  "Node.js",
  "Java",
  "C#",
  "PHP",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Other",
]

const feedbackTypes = [
  { id: "functional", label: "Functional Accuracy" },
  { id: "quality", label: "Code Quality" },
  { id: "practices", label: "Best Practices" },
  { id: "security", label: "Security" },
  { id: "performance", label: "Performance" },
  { id: "readability", label: "Readability" },
  { id: "scalability", label: "Scalability" },
  { id: "uiux", label: "UI/UX" },
]

export default function ReviewPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [formData, setFormData] = useState({
    goal: "",
    prompt: "",
    aiOutput: "",
    language: "",
    concerns: "",
    feedbackTypes: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn")
    const email = localStorage.getItem("userEmail")

    if (loggedIn === "true" && email) {
      setIsAuthenticated(true)
      setUserEmail(email)
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const handleFeedbackTypeChange = (typeId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      feedbackTypes: checked ? [...prev.feedbackTypes, typeId] : prev.feedbackTypes.filter((id) => id !== typeId),
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.goal.trim()) newErrors.goal = "Please describe what you wanted to build"
    if (!formData.prompt.trim()) newErrors.prompt = "Please provide the AI prompt you used"
    if (!formData.aiOutput.trim()) newErrors.aiOutput = "Please paste the AI-generated code"
    if (!formData.language) newErrors.language = "Please select a language or framework"
    if (formData.feedbackTypes.length === 0) newErrors.feedbackTypes = "Please select at least one feedback type"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setShowFeedback(false)

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to get review")
      }

      const data = await response.json()
      setFeedback(data.feedback)
      setShowFeedback(true)
    } catch (error) {
      console.error("Error:", error)
      setFeedback("Sorry, there was an error processing your request. Please try again.")
      setShowFeedback(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

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
              <div className="flex items-center gap-2 text-gray-400">
                <User className="h-4 w-4" />
                <span className="text-sm">{userEmail}</span>
              </div>
              <Button variant="ghost" onClick={handleLogout} className="text-gray-400 hover:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Code Review Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Get expert feedback on your AI-generated code from a simulated senior developer
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Code Review Request
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below to get detailed feedback on your AI-generated code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Goal */}
                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-sm font-medium text-gray-200">
                    What did you want to build?
                  </Label>
                  <Input
                    id="goal"
                    value={formData.goal}
                    onChange={(e) => setFormData((prev) => ({ ...prev, goal: e.target.value }))}
                    placeholder="e.g., A user authentication system"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-zinc-600"
                    required
                  />
                  {errors.goal && <p className="text-red-400 text-sm mt-1">{errors.goal}</p>}
                </div>

                {/* AI Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-sm font-medium text-gray-200">
                    What prompt did you give to AI?
                  </Label>
                  <Textarea
                    id="prompt"
                    value={formData.prompt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, prompt: e.target.value }))}
                    placeholder="Paste the exact prompt you used..."
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-zinc-600 min-h-[100px]"
                    required
                  />
                  {errors.prompt && <p className="text-red-400 text-sm mt-1">{errors.prompt}</p>}
                </div>

                {/* AI Output */}
                <div className="space-y-2">
                  <Label htmlFor="aiOutput" className="text-sm font-medium text-gray-200">
                    What output did AI give you?
                  </Label>
                  <Textarea
                    id="aiOutput"
                    value={formData.aiOutput}
                    onChange={(e) => setFormData((prev) => ({ ...prev, aiOutput: e.target.value }))}
                    placeholder="Paste the AI-generated code here..."
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-zinc-600 min-h-[200px] font-mono text-sm"
                    required
                  />
                  {errors.aiOutput && <p className="text-red-400 text-sm mt-1">{errors.aiOutput}</p>}
                </div>

                {/* Language/Framework */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-200">What language or framework did you use?</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Select a language or framework" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang} className="text-white hover:bg-zinc-700">
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.language && <p className="text-red-400 text-sm mt-1">{errors.language}</p>}
                </div>

                {/* Concerns */}
                <div className="space-y-2">
                  <Label htmlFor="concerns" className="text-sm font-medium text-gray-200">
                    Which part are you most unsure about? <span className="text-gray-500">(Optional)</span>
                  </Label>
                  <Textarea
                    id="concerns"
                    value={formData.concerns}
                    onChange={(e) => setFormData((prev) => ({ ...prev, concerns: e.target.value }))}
                    placeholder="Describe any specific concerns or areas you'd like focus on..."
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-zinc-600 min-h-[80px]"
                  />
                </div>

                {/* Feedback Types */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-200">
                    What kind of feedback are you looking for?
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {feedbackTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={formData.feedbackTypes.includes(type.id)}
                          onCheckedChange={(checked) => handleFeedbackTypeChange(type.id, checked as boolean)}
                          className="border-zinc-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <Label htmlFor={type.id} className="text-sm text-gray-300 cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.feedbackTypes && <p className="text-red-400 text-sm mt-1">{errors.feedbackTypes}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || !formData.goal || !formData.prompt || !formData.aiOutput || !formData.language
                  }
                  className="w-full bg-white text-black hover:bg-gray-200 font-medium py-2.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Review...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Submit for Review
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Feedback Display */}
          <div className="space-y-6">
            {showFeedback && (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    Senior Developer Feedback
                  </CardTitle>
                  <CardDescription className="text-gray-400">Expert analysis of your AI-generated code</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">{feedback}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Card */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg">How it works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-white mt-0.5">
                    1
                  </div>
                  <p>Share your project goal and the AI prompt you used</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-white mt-0.5">
                    2
                  </div>
                  <p>Paste the AI-generated code you want reviewed</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-white mt-0.5">
                    3
                  </div>
                  <p>Get detailed feedback from our simulated senior developer</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
