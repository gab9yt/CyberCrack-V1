"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    signIn(email);
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">&gt; E-mail</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="hacker@domain.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="bg-black border-primary focus:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">&gt; Mot de passe</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="************" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          className="bg-black border-primary focus:ring-primary"
        />
      </div>
      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
        [ LANCER LA CONNEXION ]
      </Button>
    </form>
  );

  return (
    <Card className="border-primary bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-primary">// AUTHENTIFICATION SÉCURISÉE</CardTitle>
        <CardDescription>Entrez vos identifiants pour accéder au réseau.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black border border-primary">
            <TabsTrigger value="login">[ CONNEXION ]</TabsTrigger>
            <TabsTrigger value="register">[ S'INSCRIRE ]</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-4">
            {formContent}
          </TabsContent>
          <TabsContent value="register" className="mt-4">
            {formContent}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
