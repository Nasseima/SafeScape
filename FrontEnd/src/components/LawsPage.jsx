import React, { useState, useMemo, useCallback } from 'react'
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card"
import { ScrollArea } from "../ui/Scroll-area"
import { Globe, Search, X} from 'lucide-react'

const lawsData = {
  "France": [
    { law: "Public drinking is generally allowed, but it's best to check for local restrictions in specific areas." },
    { law: "Smoking is prohibited in all indoor public spaces, including restaurants, cafes, and public transport." },
    { law: "Noise regulations apply, especially during nighttime; excessive noise can result in fines." },
    { law: "Maintain a quiet demeanor on public transport, and eating is discouraged." },
    { law: "The legal drinking age is 18." },
    { law: "The emergency number for police is 17, and for fire and medical emergencies, it is 18." },
    { law: "Jaywalking can result in fines; always use pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists must use bike lanes and are encouraged to wear helmets." },
    { law: "Photography of individuals should be done with permission, especially in private settings." },
    { link:"https://www.smartraveller.gov.au/destinations/europe/france"},
  ],
  "Italy": [
    { law: "Public drinking is generally allowed, but restrictions may apply in certain areas." },
    { law: "Smoking is banned in all indoor public spaces, including restaurants, bars, and public transport." },
    { law: "Noise regulations are enforced, especially during nighttime hours; excessive noise can lead to fines." },
    { law: "Maintain a quiet demeanor on public transport, and eating is generally discouraged." },
    { law: "The legal drinking age is 18." },
    { law: "The emergency number for police is 113, and for fire and medical emergencies, it is 115." },
    { law: "Jaywalking is discouraged; always use designated pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists should follow traffic rules and use bike lanes where available." },
    { law: "Photography restrictions may apply at certain cultural sites; always check for signs." },
    { link:"https://www.smartraveller.gov.au/destinations/europe/italy"},
  ],
  "Japan": [
    { law: "Public drinking is generally allowed, but certain areas may have restrictions." },
    { law: "Smoking is prohibited in many public places; designated smoking areas are provided." },
    { law: "Quietness is expected on public transport; phone conversations and eating are generally discouraged." },
    { law: "The legal drinking age is 20." },
    { law: "The emergency number for police is 110, and for fire and medical emergencies, it is 119." },
    { law: "Jaywalking is discouraged; always use pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists must use designated bike lanes and wear helmets." },
    { law: "Photography restrictions may apply at certain cultural sites; always ask for permission." },
    { law: "Bringing items that glorify fascism or the Nazi past into Japan is illegal." },
    { link: "https://www.smartraveller.gov.au/destinations/asia/japan"},
  ],
  "USA": [
     { law: "Public drinking is generally prohibited in streets and parks, except in designated areas." },
    { law: "Smoking is banned in all indoor public spaces, including restaurants, bars, and public transport." },
    { law: "Noise regulations are enforced, especially during nighttime hours; excessive noise can lead to fines." },
    { law: "Maintain quietness and give up seats for the elderly or disabled on public transport; eating is discouraged." },
    { law: "The legal drinking age is 21." },
    { law: "The emergency number for police is 911, and for fire and medical emergencies, it is also 911." },
    { law: "Jaywalking can result in fines; always use designated pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists must use bike lanes where available and follow all traffic rules." },
    { law: "Littering can result in significant fines." },
    { link: "https://www.smartraveller.gov.au/destinations/americas/united-states-america" },
   
  ],
  "Spain": [
    { law: "Public drinking is allowed in certain areas, but restrictions apply in others, particularly during events." },
    { law: "Smoking is banned in all indoor public spaces, including restaurants and public transport." },
    { law: "Noise regulations apply, especially during nighttime; excessive noise can lead to fines." },
    { law: "Maintain a quiet demeanor on public transport; eating is generally discouraged." },
    { law: "The legal drinking age is 18." },
    { law: "The emergency number for police is 112, and for fire and medical emergencies, it is also 112." },
    { law: "Jaywalking is discouraged; always use pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists should follow traffic rules and use bike lanes where available." },
    { law: "Photography restrictions may apply in some public areas; always check for signs." },
    { link: "https://www.smartraveller.gov.au/destinations/europe/spain" },
  ],
  "Germany": [
    { law: "It is illegal to bring into or take out of Germany any literature, music, or paraphernalia that glorifies fascism or the Nazi past." },
    { law: "Smoking is banned in all indoor public spaces, including restaurants, bars, and public transport." },
    { law: "Quiet hours (typically from 10 PM to 6 AM) are observed, especially in residential areas; excessive noise can lead to fines." },
    { law: "Maintain a quiet demeanor and give up seats for the elderly or disabled on public transport; eating is generally discouraged." },
    { law: "The legal drinking age is 16 for beer and wine, and 18 for spirits." },
    { law: "The emergency number for police is 110, and for fire and medical emergencies, it is 112." },
    { law: "Jaywalking is discouraged; always use pedestrian crossings to avoid fines." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists must use bike lanes where available and wear helmets, although not mandatory." },
    { law: "Photography in some areas may have restrictions; always ask for permission if in doubt." },
    {link: "https://www.smartraveller.gov.au/destinations/europe/germany" },
  ],
  "Jamaica": [
    { law: "Public drinking is generally allowed in designated areas, but specific restrictions may apply in certain locations." },
    { law: "Smoking is prohibited in indoor public spaces and certain outdoor areas, including some beaches." },
    { law: "Noise regulations are enforced, especially during nighttime hours. Excessive noise can result in fines." },
    { law: "Respect personal space on public transport and avoid loud conversations; eating is generally discouraged." },
    { law: "The legal drinking age in Jamaica is 18." },
    { law: "The emergency number for police is 119, and for fire and medical emergencies, it is 110." },
    { law: "Jaywalking is discouraged; use designated pedestrian crossings to avoid fines." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists are encouraged to wear helmets and must follow traffic rules." },
    { law: "Photography of individuals, especially children, should be done with permission to respect privacy." },
    {link: "https://www.smartraveller.gov.au/destinations/americas/jamaica" }
  ],

"Canada": [
  { law: "Public drinking is generally prohibited in streets and parks, except in designated areas." },
  { law: "Smoking is banned in all indoor public spaces, including restaurants, bars, and public transport." },
  { law: "Noise regulations apply, especially during nighttime hours; excessive noise can result in fines." },
  { law: "Maintain a quiet demeanor on public transport; eating is generally discouraged." },
  { law: "The legal drinking age is 19 in most provinces, including Ontario and British Columbia." },
  { law: "The emergency number for police is 911, and for fire and medical emergencies, it is also 911." },
  { law: "Jaywalking can result in fines; always use designated pedestrian crossings." },
  { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
  { law: "Cyclists must use bike lanes and follow traffic rules." },
  { law: "Littering can result in significant fines." },
    {link: "https://www.smartraveller.gov.au/destinations/americas/canada" },
  ],

  "India": [
    { law: "Public drinking is generally prohibited in many areas; check local regulations." },
    { law: "Smoking is banned in all indoor public spaces, including restaurants, bars, and public transport." },
    { law: "Noise regulations apply; excessive noise can lead to fines." },
    { law: "Maintain a respectful demeanor on public transport; eating is generally discouraged." },
    { law: "The legal drinking age is 21 in most states, including Delhi and Maharashtra." },
    { law: "The emergency number for police is 100, and for fire and medical emergencies, it is 101." },
    { law: "Jaywalking is discouraged; always use designated pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists should follow traffic rules and be aware of their surroundings." },
    { law: "Photography restrictions may apply at certain cultural sites; always check for signs." },
    {link: "https://www.smartraveller.gov.au/destinations/asia/india" },
  ],

  "Indonesia": [
    { law: "Public drinking is generally allowed, but certain areas may have restrictions." },
    { law: "Smoking is prohibited in many public places; designated smoking areas are provided." },
    { law: "Noise regulations apply, especially during nighttime; excessive noise can lead to fines." },
    { law: "Maintain a respectful demeanor on public transport; eating is generally discouraged." },
    { law: "The legal drinking age is 21." },
    { law: "The emergency number for police is 110, and for fire and medical emergencies, it is 113." },
    { law: "Jaywalking is discouraged; always use pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists should follow traffic rules and use designated bike lanes where available." },
    { law: "Photography restrictions may apply at certain cultural sites; always ask for permission." },
    {link: "https://www.smartraveller.gov.au/destinations/asia/indonesia" },
  ],

  "Egypt": [
    { law: "Public drinking is generally prohibited; check local regulations for specific areas." },
    { law: "Smoking is banned in all indoor public spaces, including restaurants and public transport." },
    { law: "Noise regulations apply; excessive noise can lead to fines." },
    { law: "Maintain a respectful demeanor on public transport; eating is generally discouraged." },
    { law: "The legal drinking age is 21." },
    { law: "The emergency number for police is 122, and for fire and medical emergencies, it is 180." },
    { law: "Jaywalking is discouraged; always use designated pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists should follow traffic rules and be cautious on the roads." },
    { law: "Photography restrictions may apply at certain historical sites; always check for signs." },
    {link: "https://www.smartraveller.gov.au/destinations/africa/egypt" },
  ],

  "Portugal": [
    { law: "Public drinking is generally allowed in certain areas, but check local regulations for specific restrictions." },
    { law: "Smoking is prohibited in all indoor public spaces, including restaurants, bars, and public transport." },
    { law: "Noise regulations apply, especially during nighttime; excessive noise can lead to fines." },
    { law: "Maintain a respectful demeanor on public transport; eating is generally discouraged." },
    { law: "The legal drinking age is 18." },
    { law: "The emergency number for police is 112, and for fire and medical emergencies, it is also 112." },
    { law: "Jaywalking can result in fines; always use designated pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists should use bike lanes and follow traffic rules." },
    { law: "Photography restrictions may apply in some cultural and religious sites; always check for signs." },
    {link: "https://www.smartraveller.gov.au/destinations/europe/portugal" },
  ],

  "Mexico": [
    { law: "Public drinking is generally allowed, but some areas may have restrictions." },
    { law: "Smoking is banned in indoor public spaces, including restaurants, bars, and public transport." },
    { law: "Noise regulations apply; excessive noise can lead to fines." },
    { law: "Maintain a respectful demeanor on public transport; eating is generally discouraged." },
    { law: "The legal drinking age is 18." },
    { law: "The emergency number for police is 911, and for fire and medical emergencies, it is also 911." },
    { law: "Jaywalking can result in fines; always use designated pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists should use bike lanes and follow traffic rules." },
    { law: "Photography restrictions may apply in certain historical and cultural sites; always ask for permission." },
    {link: "https://www.smartraveller.gov.au/destinations/americas/mexico" },
  ],

  "Aruba": [
    { law: "Public drinking is generally allowed, but be mindful of local regulations and events." },
    { law: "Smoking is banned in indoor public spaces, including restaurants, bars, and public transport." },
    { law: "Noise regulations apply; excessive noise can lead to fines." },
    { law: "Maintain a respectful demeanor on public transport; eating is generally discouraged." },
    { law: "The legal drinking age is 18." },
    { law: "The emergency number for police is 911, and for fire and medical emergencies, it is also 911." },
    { law: "Jaywalking can result in fines; always use designated pedestrian crossings." },
    { law: "Dogs must be leashed in public areas, and owners are responsible for cleaning up after their pets." },
    { law: "Cyclists should use bike lanes and follow traffic rules." },
    { law: "Photography restrictions may apply at certain cultural sites; always check for signs." },
    {link: "https://www.smartraveller.gov.au/destinations/aruba" },
  ],
}

export default function TravelLaws() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [isFocused, setIsFocused] = useState(false)

  const filteredCountries = useMemo(() => {
    return Object.keys(lawsData).filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleSearch = useCallback((country) => {
    setSelectedCountry(country)
    setSearchTerm(country)
    setIsFocused(false)
  }, [])

  const handleInputChange = useCallback((e) => {
    setSearchTerm(e.target.value)
    setSelectedCountry(null)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setSelectedCountry(null)
    setIsFocused(false)
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsFocused(false)
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Travel Laws and Regulations</h1>
      <div className="relative mb-6">
        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="h-5 w-5 text-gray-400 ml-3" />
          <Input 
            type="text" 
            placeholder="Search by country" 
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            className="border-none focus:ring-0 pl-2"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="p-2"
              aria-label="Clear search"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
        {filteredCountries.length > 0 && isFocused && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                onClick={() => handleSearch(country)}
              >
                {country}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedCountry ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              {selectedCountry}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <ul className="space-y-4">
                {lawsData[selectedCountry].map((item, index) => (
                  <li key={index} className="border-b pb-2">
                    <p className="font-medium mb-1">{item.law}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                        Learn more
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Please search for a country to view its laws and regulations.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}