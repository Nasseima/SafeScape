import React, { useState } from 'react'
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card"
import { ScrollArea } from "../ui/Scroll-area"
import { Globe, Search } from 'lucide-react'

const lawsData = {
  "France": [
    { law: "Always carry a photo ID, such as your passport" },
    { law: "It's illegeal to cover your face in public, including at the airport"},
    { law: "It's illegal to take photos of security forces, including the police."},
    { law: "If you see an accident or someone asks for help, you must stop to help unless it would put you or others in danger"},
    { law: "Keep your voice down in public spaces, such as restaurants and trains."},
    { law: "Your passport must be valid for at least three months after your intended departure date from the Schengen Area." },
    { link:"https://www.smartraveller.gov.au/destinations/europe/france"}
  ],
  "Italy": [
    { law: "It is illegal to eat messy foods near ancient monuments", link: "http://www.turismoroma.it/en/page/tourist-regulations" },
    { law: "Feeding pigeons is prohibited in many cities, including Venice", link: "https://www.comune.venezia.it/en/content/administrative-sanctions" },
    { law: "It is forbidden to sit on the Spanish Steps in Rome", link: "http://www.comune.roma.it/web/it/welcome.page" },
    { law: "Making loud noises between 1:00 PM and 4:00 PM is prohibited in many towns", link: "https://www.anci.it/" },
    { law: "It is illegal to build sandcastles on some beaches without a permit", link: "http://www.turismo.intoscana.it/site/en/tourist-info/useful-tips/beach-regulations/" },
    { law: "Wearing flip-flops while hiking in Cinque Terre can result in fines", link: "https://www.parconazionale5terre.it/dettaglio.php?id=44258" },
    { law: "It is prohibited to eat or drink in certain areas of Florence's historic center", link: "https://www.comune.fi.it/pagina/polizia-municipale/regolamento-di-polizia-urbana" },
    { law: "Feeding stray cats is only allowed by registered cat caretakers in Rome", link: "https://www.comune.roma.it/web/it/scheda-servizi.page?contentId=INF39750" },
    { law: "It is illegal to remove pebbles or sand from Sardinian beaches", link: "http://www.regione.sardegna.it/j/v/25?s=46265&v=2&c=3692&t=1" },
    { law: "Wearing a swimming costume in the town center is prohibited in many coastal towns", link: "https://www.enit.it/wwwenit/en/studi/mappa-turismo.html" }
  ],
  "Japan": [
    { law: "It is illegal to be taller than 2 meters on public transportation", link: "https://www.metro.tokyo.lg.jp/english/guide/transport/index.html" },
    { law: "Eating while walking is considered rude and is discouraged in many areas", link: "https://www.jnto.go.jp/eng/basic-info/etiquette/" },
    { law: "It is forbidden to use certain types of deodorants in public", link: "https://www.mhlw.go.jp/english/policy/health-medical/food/index.html" },
    { law: "Talking on your phone while on public transport is prohibited", link: "https://www.jreast.co.jp/e/customer_support/passenger_etiquette.html" },
    { law: "It is illegal to smoke while walking in many cities", link: "https://www.japan.travel/en/practical-information/smoking-rules/" },
    { law: "Tattoos are banned in many public baths and hot springs", link: "https://www.japan.travel/en/guide/tattoos/" },
    { law: "It is prohibited to dance after midnight in clubs without a special license", link: "https://www.npa.go.jp/english/index.html" },
    { law: "Blowing your nose in public is considered extremely rude", link: "https://www.jnto.go.jp/eng/basic-info/etiquette/" },
    { law: "It is illegal to take certain over-the-counter medicines into the country", link: "https://www.mhlw.go.jp/english/policy/health-medical/pharmaceuticals/01.html" },
    { law: "Using a handheld phone while driving is strictly prohibited", link: "https://www.npa.go.jp/english/bureau/traffic/index.html" }
  ],
  "USA": [
    { law: "It is illegal to sing off-key in North Carolina", link: "https://www.ncleg.gov/Laws/GeneralStatutes" },
    { law: "In Alabama, it's illegal to carry an ice cream cone in your back pocket", link: "http://alisondb.legislature.state.al.us/alison/codeofalabama/1975/coatoc.htm" },
    { law: "In Arizona, it's illegal for a donkey to sleep in a bathtub", link: "https://www.azleg.gov/arstitle/" },
    { law: "In California, it's illegal to eat an orange in your bathtub", link: "https://leginfo.legislature.ca.gov/faces/codes.xhtml" },
    { law: "In Florida, it's illegal to sing in a public place while wearing a swimsuit", link: "http://www.leg.state.fl.us/statutes/" },
    { law: "In Kentucky, it's illegal to dye a duckling blue and offer it for sale unless more than six are for sale at once", link: "https://apps.legislature.ky.gov/law/statutes/" },
    { law: "In Maine, it's illegal to step out of a plane in flight", link: "http://legislature.maine.gov/statutes/" },
    { law: "In Oklahoma, it's illegal to take a bite out of another person's hamburger", link: "http://www.oklegislature.gov/osstatuestitle.html" },
    { law: "In Washington, it's illegal to harass Bigfoot, Sasquatch, or any other undiscovered subspecies of hominin", link: "https://app.leg.wa.gov/rcw/" },
    { law: "In Wisconsin, it's illegal to serve apple pie in public restaurants without cheese", link: "https://docs.legis.wisconsin.gov/statutes/prefaces/toc" }
  ],
  "Spain": [
    { law: "It is illegal to wear flip-flops while driving", link: "https://www.dgt.es/conoce-las-normas-de-trafico/" },
    { law: "Walking around shirtless in town centers is prohibited in many cities", link: "https://www.barcelona.cat/en/living-in-bcn/rules-and-regulations" },
    { law: "It is forbidden to drink alcohol on the streets in many regions", link: "https://www.policia.es/consejos/normas_convivencia.html" },
    { law: "Building sandcastles is prohibited on some beaches without a permit", link: "https://www.miteco.gob.es/es/costas/temas/proteccion-costa/actuaciones-proteccion-costa/default.aspx" },
    { law: "It is illegal to wear a bikini or swim trunks away from the beach area in some towns", link: "https://www.spain.info/en/practical-information/practical-information-tourists/" },
    { law: "Reserving a spot on the beach with a towel and leaving is prohibited in some areas", link: "https://www.miteco.gob.es/es/costas/temas/proteccion-costa/actuaciones-proteccion-costa/default.aspx" },
    { law: "It is illegal to gather sand or seashells from many beaches", link: "https://www.miteco.gob.es/es/costas/temas/proteccion-costa/actuaciones-proteccion-costa/default.aspx" },
    { law: "Smoking is prohibited on some beaches", link: "https://www.mscbs.gob.es/ciudadanos/proteccionSalud/tabaco/home.htm" },
    { law: "It is illegal to use a barbecue on many beaches and in some public areas", link: "https://www.miteco.gob.es/es/red-parques-nacionales/default.aspx" },
    { law: "Playing ball games outside designated areas on beaches can result in fines", link: "https://www.miteco.gob.es/es/costas/temas/proteccion-costa/actuaciones-proteccion-costa/default.aspx" }
  ],
  "Germany": [
    { law: "It is illegal to run out of fuel on the Autobahn", link: "https://www.bmvi.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/autobahn.html" },
    { law: "Keeping a hedgehog as a pet is prohibited", link: "https://www.bmel.de/DE/themen/tiere/tierschutz/tierschutzgesetz.html" },
    { law: "It is forbidden to use up all your printer ink", link: "https://www.gesetze-im-internet.de/urhg/" },
    { law: "Dancing is prohibited on certain religious holidays", link: "https://www.gesetze-im-internet.de/feiertagsgesetz/" },
    { law: "It is illegal to tune your piano at midnight", link: "https://www.umweltbundesamt.de/themen/verkehr-laerm/nachbarschaftslaerm" },
    { law: "Keeping your car dirty can result in a fine", link: "https://www.bmvi.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/strassenverkehrs-ordnung.html" },
    { law: "It is prohibited to wear a mask or disguise in public gatherings", link: "https://www.gesetze-im-internet.de/versammlg/" },
    { law: "Crossing the street when the pedestrian light is red is illegal", link: "https://www.bmvi.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/strassenverkehrs-ordnung.html" },
    { law: "It is illegal to mow your lawn on Sundays", link: "https://www.umweltbundesamt.de/themen/verkehr-laerm/nachbarschaftslaerm" },
    { law: "Homeschooling is generally prohibited", link: "https://www.kmk.org/themen/allgemeinbildende-schulen/bildungswege-und-abschluesse.html" }
  ],
  "Canada": [
    { law: "It is illegal to remove a bandage in public in Canada", link: "https://laws-lois.justice.gc.ca/eng/" },
    { law: "In Petrolia, Ontario, it's illegal to whistle or sing while walking down the street", link: "https://www.petrolia.ca/town-hall/by-laws/" },
    { law: "In Alberta, it's illegal to paint a wooden ladder", link: "https://www.alberta.ca/laws-online.aspx" },
    { law: "In Toronto, it's illegal to drag a dead horse down Yonge Street on Sundays", link: "https://www.toronto.ca/city-government/accountability-operations-customer-service/city-administration/city-managers-office/bylaws-and-municipal-code/" },
    { law: "In Montreal, it's illegal to swear in French", link: "https://montreal.ca/en/topics/municipal-by-laws" },
    { law: "In Prince Edward Island, it's illegal for non-residents to own land facing the sea", link: "https://www.princeedwardisland.ca/en/topic/legislation" },
    { law: "In Sudbury, Ontario, it's illegal to attach a siren to your bike", link: "https://www.greatersudbury.ca/city-hall/by-laws/" },
    { law: "In British Columbia, it's illegal to kill a Sasquatch", link: "https://www.bclaws.gov.bc.ca/" },
    { law: "In Ottawa, it's illegal to eat ice cream on Bank Street on Sundays", link: "https://ottawa.ca/en/living-ottawa/laws-licences-and-permits/laws" },
    { law: "In Winnipeg, it's illegal to disassemble a pay phone", link: "https://winnipeg.ca/clerks/bylaws/bylaws.stm" }
  ]
}

export default function TravelLaws() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearch = () => {
    const country = Object.keys(lawsData).find(
      country => country.toLowerCase() === searchTerm.toLowerCase()
    )
    setSelectedCountry(country || null)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Travel Laws and Regulations</h1>
      <div className="flex gap-2 mb-6">
        <Input 
          type="text" 
          placeholder="Search by country" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
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
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                      Learn more
                    </a>
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