"use client"

import { useState } from "react"
import {
  Bell,
  Key,
  Moon,
  Palette,
  Shield,
  Sun,
  User,
  Users,
  Zap,
  Check,
  Paintbrush,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ColorPicker } from "@/components/color-picker"
import { useTheme } from "@/contexts/theme-context"
import { cn } from "@/lib/utils"

type AccentColor = "blue" | "purple" | "green" | "orange" | "pink" | "yellow" | "custom"

interface ColorOption {
  name: AccentColor
  value: string
  textColor: string
}

const colorOptions: ColorOption[] = [
  { name: "blue", value: "bg-blue-500", textColor: "text-white" },
  { name: "purple", value: "bg-purple-500", textColor: "text-white" },
  { name: "green", value: "bg-green-500", textColor: "text-white" },
  { name: "orange", value: "bg-orange-500", textColor: "text-white" },
  { name: "pink", value: "bg-pink-500", textColor: "text-white" },
  { name: "yellow", value: "bg-yellow-500", textColor: "text-black" },
]

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile")
  const { theme, accentColor, customColor, setTheme, setAccentColor, setCustomColor, isColorLight } = useTheme()

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
  }

  const handleAccentColorChange = (color: AccentColor) => {
    setAccentColor(color)
  }

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color)
    setAccentColor("custom")
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <TabsTrigger value="profile" className="text-xs sm:text-sm">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="text-xs sm:text-sm">
            <Users className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="text-xs sm:text-sm">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs sm:text-sm">
            <Zap className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile picture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                  <AvatarFallback>JK</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-gray-500">
                    JPG, GIF or PNG. Max size 2MB. Square image recommended.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input id="display-name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Write a short bio about yourself..."
                  defaultValue="AI agent developer and blockchain enthusiast."
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Color Mode</Label>
                <div className="flex gap-4">
                  <div
                    className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer ${
                      theme === "light" ? "border-primary bg-primary/10" : ""
                    }`}
                    onClick={() => handleThemeChange("light")}
                  >
                    <div className="bg-white border shadow-sm p-2 rounded-full">
                      <Sun className="h-6 w-6 text-yellow-500" />
                    </div>
                    <span className="font-medium">Light</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer ${
                      theme === "dark" ? "border-primary bg-primary/10" : ""
                    }`}
                    onClick={() => handleThemeChange("dark")}
                  >
                    <div className="bg-gray-900 border shadow-sm p-2 rounded-full">
                      <Moon className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="font-medium">Dark</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.name}
                      className={cn(
                        "h-12 w-full rounded-md border-2 flex items-center justify-center transition-all",
                        color.value,
                        accentColor === color.name
                          ? "border-black dark:border-white scale-105"
                          : "border-transparent hover:scale-105",
                      )}
                      onClick={() => handleAccentColorChange(color.name)}
                    >
                      {accentColor === color.name && <Check className={cn("h-6 w-6", color.textColor)} />}
                    </button>
                  ))}

                  {/* Custom color option */}
                  <button
                    className={cn(
                      "h-12 w-full rounded-md border-2 flex items-center justify-center transition-all relative overflow-hidden",
                      accentColor === "custom"
                        ? "border-black dark:border-white scale-105"
                        : "border-transparent hover:scale-105",
                    )}
                    onClick={() => handleAccentColorChange("custom")}
                    style={{ backgroundColor: customColor }}
                  >
                    {accentColor === "custom" && (
                      <Check className={cn("h-6 w-6", isColorLight(customColor) ? "text-black" : "text-white")} />
                    )}
                    <Paintbrush className="h-5 w-5 absolute top-1 right-1 text-white drop-shadow-md" />
                  </button>
                </div>

                {accentColor === "custom" && (
                  <div className="space-y-3 p-4 border rounded-lg">
                    <Label>Custom Color</Label>
                    <ColorPicker onColorChange={handleCustomColorChange} />
                  </div>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Select an accent color to personalize your dashboard experience.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Other tabs can be added similarly */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="johndoe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-email">Email</Label>
                  <Input id="account-email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive emails about updates and features.</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive push notifications in your browser.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage third-party services connected to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Key className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">API Keys</p>
                    <p className="text-sm text-gray-500">Manage your API access keys</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

