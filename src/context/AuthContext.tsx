"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

interface User {
  id: string
  username: string
  role: "admin" | "hr" | "manager" | "employee"
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in a real app, this would call an API
      if (username === "admin" && password === "password") {
        setUser({
          id: "1",
          username: "admin",
          role: "admin",
        })
        return true
      } else if (username === "hr" && password === "password") {
        setUser({
          id: "2",
          username: "hr",
          role: "hr",
        })
        return true
      } else if (username === "manager" && password === "password") {
        setUser({
          id: "3",
          username: "manager",
          role: "manager",
        })
        return true
      } else if (username === "employee" && password === "password") {
        setUser({
          id: "4",
          username: "employee",
          role: "employee",
        })
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

