"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter(); // Add this
  const onSubmit = async (data: LoginFormValues) => {
    // Dummy login logic
    if (data.email === "user@example.com" && data.password === "password123") {
      // Dummy JWT token
      const dummyToken = "dummy-jwt-token";
      localStorage.setItem("jwt", dummyToken);
      toast.success("Login successful!");
      setLoggedIn(true);
      // Redirect or perform any other action after login
      router.replace("/dashboard/default"); // Redirect after login
    } else {
      toast.error("Invalid credentials. Try user@example.com / password123");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    toast.success("Logged out!");
    setLoggedIn(false);
  };

  if (loggedIn) {
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="user@example.com" autoComplete="email" {...field} />
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
                  placeholder="password123"
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
