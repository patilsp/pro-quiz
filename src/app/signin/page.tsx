"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  const [error, setError] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormValues) {
    setError("");
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    if (res?.error) setError(res.error);
    if (res?.ok && !res.error) window.location.href = "/";
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <div className="text-destructive text-sm">{error}</div>}
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </Form>
          <div className="flex flex-col gap-2 mt-6">
            <Button variant="outline" className="w-full" onClick={() => signIn("google")}>Sign in with Google</Button>
            <Button variant="outline" className="w-full" onClick={() => signIn("github")}>Sign in with GitHub</Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account? <Link href="/signup" className="underline">Sign Up</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 