"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, ArrowRight, Users, Target, Zap } from "lucide-react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Lightbulb className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">
                Idea Incubator Board
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Welcome back, {session.user?.name}
                  </span>
                  <Link href="/dashboard">
                    <Button>Go to Dashboard</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/signin">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Turn Your Ideas Into
            <span className="text-blue-600"> Reality</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A private workspace where you can capture, organize, and evolve raw
            ideas into refined, actionable concepts using our intuitive
            stage-based system.
          </p>

          {!session && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Organizing Ideas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Capture Ideas</CardTitle>
              <CardDescription>
                Quickly capture and organize your thoughts with rich
                descriptions, tags, and categories.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Stage-Based System</CardTitle>
              <CardDescription>
                Move ideas through stages: Seed → Refining → Validating →
                Launching with drag-and-drop simplicity.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Track Progress</CardTitle>
              <CardDescription>
                Monitor your idea evolution with insights, progress tracking,
                and milestone achievements.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Credentials */}
        {!session && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Try it out!</CardTitle>
              <CardDescription className="text-center">
                Use these demo credentials to test the app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded">
                  <strong>Email:</strong> user@example.com
                  <br />
                  <strong>Password:</strong> password123
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong>Email:</strong> admin@example.com
                  <br />
                  <strong>Password:</strong> admin123
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
