"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";

type LoginFormValues = {
  username: string;
  password: string;
};

type JwtPayload = {
  exp: number;
  [key: string]: any;
};

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    return Date.now() / 1000 > decoded.exp;
  } catch {
    return true;
  }
}

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt");
      return token && !isTokenExpired(token);
    }
    return false;
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log(api.defaults.baseURL);
      const response = await api.post("/api/auth/login", {
        username: data.username,
        password: data.password,
      });
      const { accessToken, refreshToken } = response.data;
      if (isTokenExpired(accessToken)) {
        toast.error("Token is expired. Please login again.");
        return;
      }
      localStorage.setItem("jwt", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast.success("Login successful!");
      setLoggedIn(true);
      router.replace("/dashboard/default");
    } catch (error: any) {
      toast.error("Invalid credentials or server error.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    toast.success("Logged out!");
    setLoggedIn(false);
  };

  // Check token expiry on render
  if (loggedIn) {
    const token = localStorage.getItem("jwt");
    if (!token || isTokenExpired(token)) {
      handleLogout();
      router.replace("/auth/v2/login");
      return null;
    }
    return (
      <div className="space-y-4 text-center">
        <div className="font-medium">You are logged in!</div>
        <Button className="w-full" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input id="username" type="text" placeholder="username" autoComplete="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
