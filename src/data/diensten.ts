export interface DienstFAQ {
  vraag: string;
  antwoord: string;
}

export interface Dienst {
  slug: string;
  naam: string;
  korteOmschrijving: string;
  iconPath: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  intro: string;
  content: string[];
  faqs: DienstFAQ[];
}

export const diensten: Dienst[] = [
  {
    slug: 'herstellingen',
    naam: 'Herstellingen',
    korteOmschrijving: 'Lekkende kraan, klemmende deur, kapot slot of beschadigde muur? Wij komen ook voor kleine klussen. Snel ingepland, netjes afgewerkt.',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    metaTitle: 'Herstellingen aan huis | Wetteren | SLIM',
    metaDescription: 'Herstelling nodig? SLIM repareert kranen, deuren, sloten en muren in Wetteren en omstreken. Vakkundig en betaalbaar. Bel 0487 72 65 46.',
    keywords: 'herstellingen aan huis, klusjesman herstellingen, lekkende kraan repareren, kapot slot vervangen, muur herstellen, vakman wetteren',
    h1: 'Herstellingen aan huis in de regio Wetteren',
    intro: 'Een lekkende kraan, een deur die klemt, een kapot slot of een beschadigde muur — het zijn kleine problemen die uw dagelijks comfort flink verstoren. En toch wil geen enkele aannemer ervoor langskomen. Bij SLIM lossen we deze herstellingen snel en vakkundig op, zodat u er geen omkijken meer naar hebt.',
    content: [
      'Of het nu gaat om een klein defect of een groter probleem: SLIM komt bij u langs en regelt het. Van sanitaire herstellingen en leidingwerk tot muur- en vloerreparaties — we pakken het aan met de juiste materialen en jarenlange ervaring.',
      'Veel aannemers hebben geen interesse in "kleine werken." Bij SLIM is dat net onze specialiteit. We begrijpen dat een lekkende kraan of een los stopcontact voor u prioriteit heeft. Daarom reageren we snel en plannen we de herstelling in op een moment dat u past.',
      'Elke herstelling begint met een duidelijke diagnose. We leggen uit wat het probleem is, hoe we het oplossen en wat het kost — vóórdat we beginnen. Geen verrassingen achteraf, geen verborgen kosten.',
      'Na afloop ruimen we alles netjes op en controleren we samen het resultaat. Pas als u tevreden bent, is de klus af. Op alle herstellingen met nieuw materiaal bieden we garantie.',
    ],
    faqs: [
      { vraag: 'Welke herstellingen voert SLIM uit?', antwoord: 'Van lekkende kranen en klemmende deuren tot beschadigde muren, losse tegels, kapotte sloten en elektriciteitsdefecten. Kleine en grote herstellingen in en rond uw woning.' },
      { vraag: 'Hoe snel kan SLIM een herstelling uitvoeren?', antwoord: 'U krijgt antwoord binnen 24 uur. Voor dringende herstellingen is spoedservice mogelijk.' },
      { vraag: 'Wat kost een herstelling?', antwoord: 'Dat hangt af van het type werk. U ontvangt altijd een duidelijke offerte vooraf. Geen verborgen kosten.' },
      { vraag: 'Komt SLIM ook voor kleine herstellingen?', antwoord: 'Absoluut. Kleine herstellingen zijn net onze specialiteit. Geen klus is te klein.' },
      { vraag: 'Is er garantie op de herstelling?', antwoord: 'Ja. SLIM biedt garantie op alle herstellingen en nieuw geplaatste onderdelen.' },
      { vraag: 'Moet ik zelf materialen voorzien?', antwoord: 'Dat hoeft niet. SLIM kan de benodigde materialen aankopen en meebrengen. De kosten worden transparant doorgerekend.' },
    ],
  },
  {
    slug: 'montage',
    naam: 'Montage',
    korteOmschrijving: 'IKEA-keuken, meubels, tv-beugels, verlichting of gordijnrails? Alles correct gemonteerd, waterpas en stevig bevestigd.',
    iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    metaTitle: 'Montage & installatie | Wetteren | SLIM',
    metaDescription: 'Montage van keukens, meubels, tv-beugels en verlichting in Wetteren en omstreken. Stevig geïnstalleerd door uw vakman. Bel 0487 72 65 46.',
    keywords: 'montage keuken, meubels monteren, IKEA keuken plaatsen, tv-beugel ophangen, verlichting installeren, monteur wetteren',
    h1: 'Montage en installatie in de regio Wetteren',
    intro: 'Een nieuwe keuken, een flatpack-kast, een tv-beugel aan de muur of verlichting ophangen — montage lijkt eenvoudig, maar het verschil tussen goed en slecht gemonteerd merkt u elke dag. SLIM zorgt ervoor dat alles correct, stevig en netjes geïnstalleerd wordt.',
    content: [
      'Of u nu een IKEA-keuken hebt besteld of een maatmeubel wilt ophangen: SLIM monteert het vakkundig. We werken nauwkeurig, houden rekening met de ondergrond en gebruiken het juiste bevestigingsmateriaal voor een resultaat dat jarenlang meegaat.',
      'Bij montagewerk is precisie essentieel. Een scheef opgehangen kast, een wankel rek of een tv-beugel die niet stevig verankerd zit — het zijn problemen die u wilt vermijden. SLIM meet alles nauwkeurig op en gebruikt professioneel gereedschap voor een strak resultaat.',
      'We monteren onder andere: keukens (IKEA, Eggo, maatwerk), kasten en boekenrekken, tv-beugels en soundbars, verlichting en spots, gordijnrails en raamdecoratie, rekken en opbergsystemen, en sanitaire toestellen.',
      'Na de montage testen we alles: deuren gaan soepel open en dicht, lades lopen goed, en alles zit waterpas en stevig. We ruimen het verpakkingsmateriaal op en laten uw ruimte netjes achter.',
    ],
    faqs: [
      { vraag: 'Wat kan SLIM allemaal monteren?', antwoord: 'Keukens, kasten, boekenrekken, tv-beugels, verlichting, gordijnrails, sanitair en meer. Zowel flatpack als maatwerk.' },
      { vraag: 'Monteert SLIM ook IKEA-keukens?', antwoord: 'Ja. SLIM heeft ruime ervaring met het monteren van IKEA-keukens en andere flatpack-merken.' },
      { vraag: 'Hoe lang duurt een keukenplaatsing?', antwoord: 'Afhankelijk van de grootte: een kleine keuken duurt doorgaans 1 dag, een volledige keuken 2-3 dagen.' },
      { vraag: 'Kan ik mijn eigen materialen laten monteren?', antwoord: 'Uiteraard. U koopt aan, SLIM monteert. Of we regelen alles samen — hoe u wilt.' },
      { vraag: 'Is de montage gegarandeerd?', antwoord: 'Ja. Op alle montagewerken biedt SLIM garantie op de uitvoering.' },
      { vraag: 'Ruimt SLIM het verpakkingsmateriaal op?', antwoord: 'Ja. Na de montage wordt alles opgeruimd en netjes achtergelaten.' },
    ],
  },
  {
    slug: 'kleine-renovaties',
    naam: 'Kleine renovaties',
    korteOmschrijving: 'Badkamer opfrissen, vloer leggen of kamer schilderen? Vakkundig resultaat zonder de rompslomp en kosten van een groot bouwproject.',
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    metaTitle: 'Kleine renovaties | Wetteren | SLIM',
    metaDescription: 'Badkamer opfrissen, vloer leggen of muren schilderen? SLIM voert kleine renovaties uit in Wetteren en omstreken. Eerlijke prijs. Bel 0487 72 65 46.',
    keywords: 'kleine renovatie, badkamer renovatie wetteren, vloer leggen, schilderwerk, tegels plaatsen, renovatie wetteren, renovatie gent',
    h1: 'Kleine renovaties in de regio Wetteren',
    intro: 'Uw badkamer een opfrisbeurt geven, een nieuwe vloer leggen of een kamer schilderen — het hoeft geen maandenlang renovatieproject te zijn. SLIM pakt kleine renovaties efficiënt aan: vakkundig resultaat, op tijd klaar en tegen een eerlijke prijs.',
    content: [
      'Niet elke renovatie vraagt om een groot aannemersbedrijf. Voor het vervangen van een badkamermeubel, het leggen van een laminaatvloer of het schilderen van enkele kamers bent u bij SLIM aan het juiste adres. We werken snel, proper en met oog voor detail.',
      'Bij SLIM combineren we verschillende vaardigheden in één vakman. Dat betekent dat u niet drie verschillende aannemers hoeft in te schakelen voor een badkameropfrisbeurt. Sanitair, tegels, schilderwerk — we regelen het in één keer.',
      'Typische kleine renovaties die we uitvoeren: badkamermeubel vervangen, tegels plaatsen of vervangen, laminaat of vinyl vloer leggen, muren en plafonds schilderen, behang aanbrengen of verwijderen, een toilet of lavabo vervangen, en gyproc plaatsen of afwerken.',
      'Elke renovatie start met een gratis bespreking. We bekijken samen wat u wilt, bespreken de mogelijkheden en stellen een duidelijke offerte op. Tijdens de werken houden we u op de hoogte en na afloop controleren we samen het resultaat.',
    ],
    faqs: [
      { vraag: 'Wat zijn "kleine renovaties"?', antwoord: 'Alles wat uw woning opfrist zonder een volledig bouwproject: badkamer opfrissen, vloer leggen, schilderwerk, tegels vervangen, gyproc plaatsen en meer.' },
      { vraag: 'Hoe lang duurt een kleine renovatie?', antwoord: 'Afhankelijk van het werk: een badkameropfrisbeurt duurt doorgaans 3-5 werkdagen, een kamer schilderen 1-2 dagen.' },
      { vraag: 'Kan SLIM ook tegels plaatsen?', antwoord: 'Ja. Zowel vloer- als wandtegels, in badkamer, keuken of andere ruimtes.' },
      { vraag: 'Koopt SLIM de materialen aan?', antwoord: 'Dat kan. We adviseren u bij de keuze en kopen de materialen aan, of u kiest zelf en wij verwerken ze.' },
      { vraag: 'Is een kleine renovatie goedkoper dan een volledig project?', antwoord: 'Absoluut. U betaalt alleen voor wat er echt nodig is. Geen overhead van een groot renovatiebedrijf.' },
      { vraag: 'Wat als er tijdens de renovatie extra werk nodig blijkt?', antwoord: 'We bespreken dit eerst met u en passen de offerte aan. Nooit extra kosten zonder uw akkoord.' },
    ],
  },
  {
    slug: 'afbraak-recuperatie',
    naam: 'Afbraak met recuperatie',
    korteOmschrijving: 'Oude keuken of badkamer laten verwijderen? Bruikbare deuren, kranen of tegels worden zorgvuldig gerecupereerd voor hergebruik.',
    iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    metaTitle: 'Afbraak met recuperatie | Wetteren | SLIM',
    metaDescription: 'Oude keuken of badkamer laten afbreken? SLIM recupereert bruikbare materialen. Duurzaam slopen in de regio Wetteren. Bel 0487 72 65 46.',
    keywords: 'afbraak met recuperatie, duurzaam slopen, keuken afbreken, badkamer afbreken, materialen hergebruiken, recuperatie wetteren',
    h1: 'Afbraak met recuperatie in de regio Wetteren',
    intro: 'Een oude keuken, badkamer of inbouwkast die weg moet? SLIM breekt af met aandacht voor recuperatie. Bruikbare materialen zoals deuren, kranen, tegels of kasten krijgen een tweede leven — op uw vraag en wanneer het technisch verantwoord is.',
    content: [
      'Bij veel renovatieprojecten gaat er bruikbaar materiaal verloren. Dat is zonde. SLIM kijkt bij elke afbraak welke onderdelen nog waardevol zijn: een massief houten deur, een goed werkende kraan, mooie tegels of stevige kasten. Wat nog bruikbaar is, wordt zorgvuldig gedemonteerd.',
      'Recuperatie is niet altijd mogelijk of zinvol. We geven u eerlijk advies: als een materiaal versleten is of het demonteren meer kost dan het waard is, dan zeggen we dat. Geen valse beloftes — alleen praktische oplossingen.',
      'De gerecupereerde materialen kunt u zelf hergebruiken in een andere ruimte, weggeven of verkopen. Wilt u dat SLIM ze herplaatst op een andere locatie? Dat kan ook — zie onze dienst "Hergebruik & herplaatsing."',
      'Na de afbraak zorgen we voor een propere werkplaats. Puin en afval worden op een verantwoorde manier afgevoerd. U hoeft zich nergens zorgen over te maken.',
    ],
    faqs: [
      { vraag: 'Wat houdt afbraak met recuperatie in?', antwoord: 'We breken uw oude keuken, badkamer of andere ruimte af, en demonteren bruikbare materialen zorgvuldig zodat ze hergebruikt kunnen worden.' },
      { vraag: 'Welke materialen worden gerecupereerd?', antwoord: 'Deuren, kranen, tegels, kasten, verlichtingsarmaturen, sanitair — alles wat technisch in goede staat is en hergebruikt kan worden.' },
      { vraag: 'Is recuperatie altijd mogelijk?', antwoord: 'Nee. We beoordelen per situatie of het zinvol en haalbaar is. U krijgt altijd eerlijk advies vooraf.' },
      { vraag: 'Wat gebeurt er met het afval?', antwoord: 'Puin en niet-herbruikbaar afval worden verantwoord afgevoerd. We laten uw werkplaats proper achter.' },
      { vraag: 'Kan SLIM de gerecupereerde materialen ook herplaatsen?', antwoord: 'Ja, via onze dienst Hergebruik & herplaatsing. We installeren het materiaal op een andere locatie.' },
      { vraag: 'Kost recuperatie extra?', antwoord: 'Recuperatie vraagt meer tijd dan gewoon afbreken. De meerprijs is beperkt en wordt altijd vooraf besproken.' },
    ],
  },
  {
    slug: 'hergebruik-herplaatsing',
    naam: 'Hergebruik & herplaatsing',
    korteOmschrijving: 'Gerecupereerde deuren, kranen of tegels vakkundig herplaatsen in een andere ruimte of woning. Duurzaam en betaalbaar.',
    iconPath: 'M7 11l5-5m0 0l5 5m-5-5v12',
    metaTitle: 'Hergebruik & herplaatsing | Wetteren | SLIM',
    metaDescription: 'Gerecupereerde deuren, kasten of sanitair herplaatsen? SLIM geeft materialen een tweede leven. Duurzaam en betaalbaar. Bel 0487 72 65 46.',
    keywords: 'hergebruik materialen, herplaatsing deuren, vintage sanitair plaatsen, recuperatietegels, duurzaam bouwen wetteren',
    h1: 'Hergebruik en herplaatsing in de regio Wetteren',
    intro: 'Een massief houten deur uit een oud pand, een vintage wastafel of tegels met karakter — goede materialen verdienen een tweede kans. SLIM herplaatst gerecupereerde materialen vakkundig in uw woning of project.',
    content: [
      'Steeds meer mensen kiezen bewust voor hergebruik. Het is duurzamer, vaak goedkoper en geeft uw interieur een uniek karakter. SLIM helpt u bij het installeren van gerecupereerde materialen — of ze nu van een eerdere afbraak komen, van een kringloopwinkel of van een online marktplaats.',
      'Herplaatsing vraagt vakkennis. Een oude deur moet juist ingemeten en afgesteld worden. Vintage sanitair vraagt aangepaste leidingen. Recuperatietegels moeten zorgvuldig gelegd worden. SLIM heeft de ervaring om dit correct en duurzaam te doen.',
      'Enkele voorbeelden: massieve deuren inmeten en plaatsen, vintage of tweedehands sanitair aansluiten, recuperatietegels leggen in keuken of badkamer, kasten of rekken herplaatsen in een andere ruimte, en verlichtingsarmaturen opnieuw aansluiten.',
      'Belangrijk: op gerecupereerde materialen geldt geen garantie van SLIM. We garanderen wél dat de plaatsing vakkundig gebeurt. Als we tijdens het werk merken dat een materiaal niet meer bruikbaar is, laten we dit weten vóór we verdergaan.',
    ],
    faqs: [
      { vraag: 'Welke materialen kan SLIM herplaatsen?', antwoord: 'Deuren, sanitair (lavabo, kraan, toilet), tegels, kasten, rekken, verlichtingsarmaturen en meer. Alles wat technisch herbruikbaar is.' },
      { vraag: 'Moeten de materialen van een SLIM-afbraak komen?', antwoord: 'Nee. U kunt materialen van overal aanbrengen: eigen recuperatie, kringloop, Marketplace, tweedehands winkels — SLIM plaatst ze.' },
      { vraag: 'Geeft SLIM garantie op gerecupereerde materialen?', antwoord: 'Nee, op de materialen zelf niet. Wel op de vakkundige plaatsing en installatie.' },
      { vraag: 'Is hergebruik altijd goedkoper?', antwoord: 'Meestal wel. U bespaart op materiaalkosten, maar de plaatsing kan iets meer tijd vragen dan bij nieuw materiaal.' },
      { vraag: 'Kan SLIM adviseren of een materiaal nog herbruikbaar is?', antwoord: 'Ja. Stuur een foto via WhatsApp en we geven u eerlijk advies of het de moeite waard is.' },
      { vraag: 'Werkt SLIM ook met architecten of interieurontwerpers?', antwoord: 'Zeker. We werken regelmatig samen met ontwerpers die recuperatiematerialen in hun projecten verwerken.' },
    ],
  },
  {
    slug: 'kitwerken-siliconen',
    naam: 'Kitwerken & siliconen',
    korteOmschrijving: 'Beschimmelde of gescheurde kitvoegen? Siliconen vervangen in badkamer, keuken, ramen en deuren. Waterdicht en strak afgewerkt.',
    iconPath: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
    metaTitle: 'Kitwerken & siliconen | Wetteren | SLIM',
    metaDescription: 'Kitvoegen vervangen in badkamer, keuken of ramen? SLIM vernieuwt uw siliconen waterdicht en strak. Vakman in Wetteren en omstreken. Bel 0487 72 65 46.',
    keywords: 'kitwerken, siliconen vervangen, kitvoegen badkamer, kitvoegen keuken, ramen kitten, sanitairkit, klusjesman kitwerk wetteren',
    h1: 'Kitwerken en siliconen in de regio Wetteren',
    intro: 'Verouderde of beschimmelde kitvoegen zijn meer dan een schoonheidsfout — ze laten vocht door en kunnen ernstige schade veroorzaken. SLIM vervangt en vernieuwt kitvoegen in badkamer, keuken, bij ramen en deuren. Waterdicht, hygiënisch en strak afgewerkt.',
    content: [
      'Kitvoegen slijten na verloop van tijd. Ze verkleuren, scheuren of laten los van de ondergrond. Het gevolg: vocht dringt binnen, schimmel ontstaat en de afdichting faalt. Regelmatig kitten vernieuwen is daarom belangrijk voor het behoud van uw woning.',
      'SLIM verwijdert de oude kit volledig, reinigt de ondergrond en brengt nieuwe siliconen of acrylkit aan met de juiste techniek. We kiezen het product op basis van de toepassing: sanitairkit voor natte ruimtes, schilderskit voor ramen en deuren, en brandwerende kit waar nodig.',
      'Typische kitwerken die we uitvoeren: badkuip en douchebak afdichten, aanrechtblad en spoelbak kitten, ramen en deurlijsten afwerken, overgang tussen vloer en plint, rondom sanitaire toestellen en bij doorvoeren van leidingen.',
      'Een goede kitvoeg is meer dan een lijntje siliconen. Het vraagt de juiste voorbereiding, het correcte product en een strakke afwerking. SLIM levert dat vakmanschap — met oog voor detail en een proper resultaat.',
    ],
    faqs: [
      { vraag: 'Wanneer moeten kitvoegen vervangen worden?', antwoord: 'Als ze verkleurd, beschimmeld, gescheurd of losgelaten zijn. Gemiddeld gaan kitvoegen in een badkamer 5 tot 10 jaar mee.' },
      { vraag: 'Welk type kit gebruikt SLIM?', antwoord: 'Dat hangt af van de toepassing. Sanitairsiliconen voor natte ruimtes, acrylkit voor schilderwerk en speciale kit voor specifieke ondergronden.' },
      { vraag: 'Hoe lang duurt het kitten van een badkamer?', antwoord: 'Een gemiddelde badkamer is op een halve dag tot één dag afgewerkt, afhankelijk van de hoeveelheid voegen.' },
      { vraag: 'Kan ik de badkamer meteen na het kitten gebruiken?', antwoord: 'Sanitairkit moet doorgaans 24 uur uitharden voordat de voeg in contact mag komen met water. We informeren u altijd over de droogtijd.' },
      { vraag: 'Verwijdert SLIM ook de oude kit?', antwoord: 'Ja. We verwijderen altijd eerst de oude kitvoeg volledig en reinigen de ondergrond. Dat is essentieel voor een goede hechting.' },
      { vraag: 'Wat kost het vernieuwen van kitvoegen?', antwoord: 'De prijs hangt af van de hoeveelheid voegen en het type kit. U ontvangt altijd een duidelijke offerte vooraf.' },
    ],
  },
  {
    slug: 'schilderwerken',
    naam: 'Schilderwerken',
    korteOmschrijving: 'Muren, plafonds, deuren en houtwerk binnenshuis vakkundig geschilderd. Grondige voorbereiding, kwaliteitsverf en een strak resultaat.',
    iconPath: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
    metaTitle: 'Schilderwerken binnenshuis | Wetteren | SLIM',
    metaDescription: 'Muren, plafonds of houtwerk laten schilderen? SLIM zorgt voor strak schilderwerk in uw woning. Vakman in Wetteren en omstreken. Bel 0487 72 65 46.',
    keywords: 'schilderwerken, binnenschilderwerk, muren schilderen, plafond schilderen, houtwerk schilderen, schilder wetteren',
    h1: 'Schilderwerken binnenshuis in de regio Wetteren',
    intro: 'Een frisse verflaag doet wonderen voor uw interieur. SLIM schildert muren, plafonds en houtwerk binnenshuis — met de juiste voorbereiding, kwaliteitsverf en een strak resultaat. Van één kamer tot uw hele woning.',
    content: [
      'Goed schilderwerk begint met een goede voorbereiding. SLIM vult scheuren en gaatjes, schuurt het oppervlak en brengt waar nodig een primer aan. Pas als de ondergrond perfect is, starten we met schilderen. Dat verschil ziet u in het eindresultaat. Een goed voorbereide muur geeft een vlakker en duurzamer resultaat.',
      'We schilderen muren en plafonds, deuren en deurkozijnen, ramen en vensterbanken, trappenhuizen, plinten en lijstwerk. Zowel met latex-, acryl- als alkydverf — afhankelijk van de ruimte en het gewenste resultaat.',
      'Bij SLIM beschermen we uw vloeren, meubels en andere oppervlakken zorgvuldig met afdekmateriaal. We werken proper en gestructureerd, zodat u geen last hebt van verfspetters of rommel. Na afloop ruimen we alles netjes op.',
      'Twijfelt u over kleurkeuze of type verf? SLIM adviseert u graag. We werken met merken zoals Levis, Boss Paints en Sikkens — kwaliteitsverven die lang meegaan en mooi dekken.',
    ],
    faqs: [
      { vraag: 'Welke schilderwerken voert SLIM uit?', antwoord: 'Muren, plafonds, deuren, kozijnen, ramen, plinten, trappen en houtwerk binnenshuis. Zowel nieuwbouw als renovatie.' },
      { vraag: 'Hoe lang duurt het schilderen van een kamer?', antwoord: 'Een gemiddelde kamer (muren en plafond) is doorgaans in 1 tot 2 dagen geschilderd, inclusief voorbereiding en twee verflagen.' },
      { vraag: 'Moet ik zelf verf kopen?', antwoord: 'Dat hoeft niet. SLIM kan de verf aankopen op basis van uw kleurkeuze. De kosten worden transparant doorgerekend.' },
      { vraag: 'Schildert SLIM ook buitenshuis?', antwoord: 'SLIM richt zich voornamelijk op binnenschilderwerk. Voor buitenwerk kunt u altijd vrijblijvend contact opnemen.' },
      { vraag: 'Hoe bereiden jullie de muren voor?', antwoord: 'We vullen scheuren en gaten, schuren het oppervlak glad en brengen indien nodig een primer aan. Goede voorbereiding is de basis van strak schilderwerk.' },
      { vraag: 'Wat kost schilderwerk per kamer?', antwoord: 'De prijs hangt af van de grootte van de kamer, de staat van de muren en het aantal lagen. U ontvangt altijd een duidelijke offerte vooraf.' },
    ],
  },
  {
    slug: 'sanitair',
    naam: 'Sanitair',
    korteOmschrijving: 'Kraan vervangen, toilet aansluiten of lekkage verhelpen? Kleine sanitaire werken zonder de kosten van een volledige loodgieter.',
    iconPath: 'M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z',
    metaTitle: 'Sanitair | Klusjesman Wetteren | SLIM',
    metaDescription: 'Kraan vervangen, toilet aansluiten of lekkage verhelpen? SLIM voert kleine sanitaire werken uit in Wetteren en omstreken. Bel 0487 72 65 46.',
    keywords: 'sanitair klusjesman, kraan vervangen, toilet plaatsen, lekkage verhelpen, lavabo aansluiten, sanitair wetteren, loodgieter wetteren',
    h1: 'Sanitaire werken in de regio Wetteren',
    intro: 'Een lekkende kraan, een toilet dat blijft doorlopen of een lavabo die vervangen moet worden — kleine sanitaire problemen die u liever vandaag dan morgen opgelost ziet. SLIM helpt u snel en vakkundig met kleine sanitaire werken in en rond uw woning.',
    content: [
      'Voor veel sanitaire klussen hebt u geen loodgieter nodig die uw hele installatie wil vernieuwen. SLIM focust op kleine sanitaire werken: kranen vervangen, toiletten aansluiten, sifons herstellen, leidingen repareren en lavabo\'s of wasbakken plaatsen. Praktisch en betaalbaar.',
      'We werken met kwaliteitsmaterialen en zorgen dat elke aansluiting waterdicht is. Of het nu gaat om het plaatsen van een nieuwe mengkraan, het verhelpen van een lekkende afvoer of het aansluiten van een nieuw toiletblok — SLIM doet het correct en duurzaam.',
      'Typische sanitaire werken die SLIM uitvoert: mengkraan of thermostaatkraan vervangen, toilet plaatsen of vervangen, lavabo of wastafel aansluiten, sifon herstellen of vervangen, kleine lekkages opsporen en verhelpen, en douchekop of -slang vervangen.',
      'Hebt u een groter sanitair project in gedachten, zoals een volledige badkamerrenovatie? Ook dan kunt u bij SLIM terecht. We bekijken samen wat haalbaar is en stellen een plan op dat past bij uw budget.',
    ],
    faqs: [
      { vraag: 'Welke sanitaire werken voert SLIM uit?', antwoord: 'Kranen vervangen, toiletten plaatsen, lavabo\'s aansluiten, sifons herstellen, kleine lekkages verhelpen en doucheslangen vervangen. Kleine tot middelgrote sanitaire klussen.' },
      { vraag: 'Kan SLIM ook een nieuw toilet plaatsen?', antwoord: 'Ja. SLIM plaatst en sluit toiletten aan — zowel staande als hangtoiletten. Inclusief de aansluiting op de bestaande afvoer.' },
      { vraag: 'Hoe snel kan een lekkage verholpen worden?', antwoord: 'Bij dringende lekkages reageren we zo snel mogelijk. Neem contact op via telefoon of WhatsApp voor een snelle afspraak.' },
      { vraag: 'Moet ik zelf sanitair materiaal aankopen?', antwoord: 'Dat mag, maar het hoeft niet. SLIM kan kranen, sifons en andere onderdelen aankopen en meebrengen. De kosten worden transparant doorgerekend.' },
      { vraag: 'Is SLIM een erkend loodgieter?', antwoord: 'SLIM is een ervaren klusjesman gespecialiseerd in kleine tot middelgrote sanitaire werken. Voor complexe loodgieterswerken of gasinstallaties verwijzen we u graag door naar een erkend installateur.' },
      { vraag: 'Wat kost het vervangen van een kraan?', antwoord: 'Dat hangt af van het type kraan en de toegankelijkheid. U ontvangt altijd een duidelijke prijsindicatie vooraf.' },
    ],
  },
];
