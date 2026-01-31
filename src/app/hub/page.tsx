"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, LogOut, ShoppingCart, Swords, Bot, Users, Trophy } from 'lucide-react';

export default function HubPage() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex h-screen items-center justify-center"><p className="text-glow animate-pulse">AUTHENTIFICATION...</p></div>;
  }

  const gameLevels = [
    { level: 1, duration: 1, difficulty: 'Stagiaire' },
    { level: 2, duration: 2, difficulty: 'Débutant' },
    { level: 3, duration: 5, difficulty: 'Agent' },
    { level: 4, duration: 10, difficulty: 'Spécialiste' },
    { level: 5, duration: 15, difficulty: 'Élite' },
    { level: 6, duration: 30, difficulty: 'Légende' },
  ];

  const shopItems = [
      { name: 'Script de test automatique', price: 100, description: 'Teste automatiquement les modèles de mots de passe courants.' },
      { name: 'Scanner de vulnérabilités', price: 250, description: 'Analyse le système de fichiers à la recherche d\'indices potentiels.' },
      { name: 'Injecteur de base de données', price: 500, description: 'Simule une injection de base de données pour extraire des fragments.' },
  ];

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-4 pt-10">
      <header className="flex w-full max-w-4xl items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-glow font-headline">CYBER-CRACK // HUB</h1>
        <Button variant="ghost" onClick={signOut} className="text-primary hover:bg-primary/20">
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </header>

      <Card className="w-full max-w-4xl border-primary bg-black/50 backdrop-blur-sm">
        <CardContent className="p-4">
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black border border-primary mb-4">
            <TabsTrigger value="profile"><User className="mr-2"/>Profil</TabsTrigger>
            <TabsTrigger value="games"><Swords className="mr-2"/>Jeux</TabsTrigger>
            <TabsTrigger value="shop"><ShoppingCart className="mr-2"/>Boutique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="text-primary">// Profil du Hacker</CardTitle>
                <CardDescription>Bon retour, {user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <p className="flex items-center"><Trophy className="inline mr-2" />Rang: <span className="font-bold ml-2">{user.rank}</span></p>
                <p>Expérience: <span className="font-bold ml-2">{user.xp} XP</span></p>
                <p>Mots de passe craqués: <span className="font-bold ml-2">{user.crackedPasswords}</span></p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-primary/50">
                  <CardHeader>
                      <CardTitle className="text-primary flex items-center"><Bot className="mr-2" />Missions Solo</CardTitle>
                      <CardDescription>Affinez vos compétences contre des systèmes contrôlés par l'IA.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2">
                    {gameLevels.map(g => (
                      <Link key={g.level} href={`/game/${g.level}`} passHref>
                        <Button variant="outline" className="w-full justify-start">
                          Level {g.level}: {g.difficulty}
                        </Button>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
                <Card className="border-gray-600 bg-gray-900/50 text-gray-500">
                  <CardHeader>
                      <CardTitle className="flex items-center"><Users className="mr-2" />Multijoueur</CardTitle>
                      <CardDescription>Défiez d'autres hackers en temps réel. (Bientôt disponible)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" disabled className="w-full">Course de vitesse (10 joueurs)</Button>
                    <Button variant="outline" disabled className="w-full">Mode Créateur</Button>
                  </CardContent>
                </Card>
             </div>
          </TabsContent>
          
          <TabsContent value="shop">
            <Card className="border-primary/50">
                <CardHeader>
                    <CardTitle className="text-primary">// Scripts du marché noir</CardTitle>
                    <CardDescription>Achetez des outils avec vos jetons gagnés. (Fonctionnalité en développement)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {shopItems.map(item => (
                        <div key={item.name} className="flex justify-between items-center p-2 border border-primary/20 rounded-none">
                            <div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <Button disabled>Acheter pour {item.price} J</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
