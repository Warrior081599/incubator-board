"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Lightbulb, LogOut } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Client-side route protection
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Not authenticated (shouldn't happen due to middleware, but good fallback)
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need to sign in to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/signin")} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Protected content
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Lightbulb className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">
                Idea Incubator
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>🎉 Welcome to Your Idea Board!</CardTitle>
              <CardDescription>
                This is a protected route. You can only see this because you're
                authenticated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900">What's Next?</h3>
                  <p className="text-blue-700 text-sm mt-1">
                    Start creating your first idea and watch it evolve from seed
                    to launch!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Seed Ideas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-gray-500">Raw concepts</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Refining</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-gray-500">In development</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Validating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-gray-500">Testing phase</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Launching</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-gray-500">Ready to go</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
