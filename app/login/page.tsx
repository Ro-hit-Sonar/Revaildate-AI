"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, ArrowLeft, Loader2, AlertCircle, Info } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCreateUserInfo, setShowCreateUserInfo] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check credentials
    if (
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      // Store login state (in a real app, you'd use proper authentication)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      router.push("/review");
    } else {
      setError("Invalid email or password. Please try again.");
    }

    setIsLoading(false);
  };

  const handleCreateUser = () => {
    setShowCreateUserInfo(true);
  };

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
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription className="text-gray-400">
                Sign in to access your code review dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    required
                  />
                </div>

                {error && (
                  <Alert className="border-red-800 bg-red-900/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-400">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-zinc-800">
                <Button
                  variant="outline"
                  onClick={handleCreateUser}
                  className="w-full border-zinc-700 text-white hover:bg-zinc-800"
                >
                  Create New Account
                </Button>

                {showCreateUserInfo && (
                  <Alert className="mt-4 border-blue-800 bg-blue-900/20">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-blue-400">
                      <strong>MVP Stage:</strong> We're currently only allowing
                      5 new users per day. Please check back tomorrow or contact
                      us for early access.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
