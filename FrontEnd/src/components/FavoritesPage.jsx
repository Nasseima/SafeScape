import React, { useState, useEffect } from 'react';
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { MapPin, Image, Info, Hotel, Activity, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const storedUserId = localStorage.getItem('user_id');
    
  useEffect(() => {
    if (storedUserId) {
      setUserId(storedUserId);
      loadFavorites(storedUserId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadFavorites = (userId) => {
    setIsLoading(true);
    const storedFavorites = localStorage.getItem(`favorites_${userId}`);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setIsLoading(false);
  };

  const removeFromFavorites = (placeId) => {
    const newFavorites = favorites.filter(item => item.id !== placeId);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    toast.success('Removed from favorites');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
        <p>You need to be logged in to view your favorites.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/20 to-transparent -z-10"
      />
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl font-bold mb-8 text-center relative"
      >
        Your Favorites
      </motion.h1>
      
      {favorites.length === 0 ? (
        <p className="text-center text-lg">Your favorites list is empty. Start adding places you'd like to visit!</p>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {favorites.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <Tabs defaultValue="image" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 p-1 bg-muted rounded-t-lg">
                    <TabsTrigger 
                      value="image"
                      className="data-[state=active]:bg-background rounded-md transition-all duration-200 flex items-center justify-center py-2"
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Image
                    </TabsTrigger>
                    <TabsTrigger 
                      value="info"
                      className="data-[state=active]:bg-background rounded-md transition-all duration-200 flex items-center justify-center py-2"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      Info
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="image" className="m-0">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={place.url}
                        alt={`${place.city}, ${place.country}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <p className="absolute bottom-2 left-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {place.city}, {place.country}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="info" className="m-0 bg-background">
                    <CardContent className="p-4">
                      <h2 className="text-2xl font-bold mb-2">{place.city}</h2>
                      <p className="text-muted-foreground mb-4">{place.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="mr-1 h-4 w-4" />
                        {place.city}, {place.country}
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/hotels/${place.id}/hotels`}>
                          <Button variant="outline" className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200">
                            <Hotel className="mr-2 h-4 w-4" />
                            Hotels
                          </Button>
                        </Link>
                        <Link to={`/activities/${place.id}/activities`}>
                          <Button variant="outline" className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 border-green-200">
                            <Activity className="mr-2 h-4 w-4" />
                            Activities
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          onClick={() => removeFromFavorites(place.id)}
                          className="flex-1"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}