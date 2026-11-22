/**
 * ============================================================================
 * A JOURNEY THROUGH THE BLUE : CENTRALIZED CONFIGURATION
 * ============================================================================
 * Seluruh nama, ucapan, foto, caption, cerita chapter, memori, harapan,
 * surat, audio, dan warna diatur dari satu file ini.
 *
 * Tips personalisasi cepat:
 * 1. Ubah recipientName, senderName, dan birthdayDate di bawah ini.
 * 2. Semua gambar sudah terisi ilustrasi/artwork tematik lokal tanpa broken link.
 *    Untuk mengganti dengan foto asli Anda, cukup taruh file di assets/images/
 *    dan ganti path fotonya di sini tanpa perlu mengubah HTML.
 * ============================================================================
 */

window.birthdayConfig = {
  // --------------------------------------------------------------------------
  // 1. CORE IDENTITY & PERSONALIZATION
  // --------------------------------------------------------------------------
  recipientName: "You",
  senderName: "Someone Who Remembers",
  birthdayDate: "Happy Birthday",

  siteTitle: "A JOURNEY THROUGH THE BLUE",
  tagline: "A little world made from everything that makes you, you.",

  // --------------------------------------------------------------------------
  // 2. VISUAL PALETTE OVERRIDES (3 Core Blues + 1 Cyan Focus Accent)
  // --------------------------------------------------------------------------
  theme: {
    deepNavy: "#071C36",
    midnightBlue: "#0A2540",
    oceanBlue: "#123F67",
    royalBlue: "#246A9B",
    softCyan: "#70C9E8",
    iceBlue: "#B9E8F5",
    white: "#F4FBFF",
    warmAccent: "#E8B870"
  },

  // --------------------------------------------------------------------------
  // 3. SCENE 01 : THE SECRET GATE (Personal Verification)
  // --------------------------------------------------------------------------
  verification: {
    introText: "Before you enter this little ocean, I need to make sure it's really you.",
    question: "What color is this entire little ocean made of?",
    answer: ["blue", "biru"],
    inputPlaceholder: "Type your answer...",
    unlockButtonText: "Unlock the Ocean",
    wrongResponses: [
      "The current shifted slightly. Not quite that word, try once more.",
      "The blue whale paused in the distance and waited. Give it another guess.",
      "Almost there, yet the portal stays quiet. Try again."
    ]
  },

  // --------------------------------------------------------------------------
  // 4. SCENE 02 : WELCOME ("Somewhere Beyond the Blue")
  // --------------------------------------------------------------------------
  welcome: {
    title: "Somewhere Beyond the Blue",
    subtitle: "A little journey, made just for you.",
    ctaText: "Start Our Journey"
  },

  // --------------------------------------------------------------------------
  // 5. AUDIO CONFIGURATION (Procedural Underwater Audio + Optional Custom Files)
  // --------------------------------------------------------------------------
  audio: {
    ambientMusic: "",
    oceanCurrent: "",
    bubbleSfx: "",
    transitionSfx: "",
    defaultVolume: 0.42
  },

  // --------------------------------------------------------------------------
  // 6. THE BLUE WHALE GUIDE : INTERACTIVE WHISPERS
  // --------------------------------------------------------------------------
  whaleGuide: {
    name: "The Blue Whale Guide",
    clickHints: [
      "Every beacon on the Ocean Map opens a different corner built from things you love.",
      "Inside every chapter there is one quiet hidden note waiting beneath the page.",
      "When you feel ready, follow the bottom current toward Memories, Six Wishes, and the Ocean Letter.",
      "Tap shells, cups, books, film reels, and stars. Every object in this ocean opens something real.",
      "This whole blue world was stitched together from small details worth remembering."
    ]
  },

  // --------------------------------------------------------------------------
  // 7. SCENE 04 : THE JAKARTA CHAPTER (Destination 00)
  // --------------------------------------------------------------------------
  jakartaChapter: {
    id: "jakarta",
    number: "00",
    title: "The Jakarta Chapter",
    zone: "The Sunken Metropolis",
    shortDescription: "A submerged skyline of quiet blue towers holding every unfamiliar street and day you navigated in Jakarta.",
    introNarrative: "Beneath the tide rises a quiet blue skyline. Every glowing avenue and tower holds a piece of your time in Jakarta: first impressions, daily routes, small detours, late city lights, and the days you kept showing up.",
    dimensionTheme: "jakarta",
    transitionType: "depth",
    mapCoords: { x: -16, y: 2.5, z: -9 },
    backdropImage: "assets/images/fantasy/jakarta-underwater.jpg",
    hiddenMessage: "Surviving and growing in a fast, crowded city is never small work. I hope you always feel proud of how gracefully you carried yourself through every day there.",

    sections: [
      {
        id: "beginning",
        number: "01",
        title: "The Beginning",
        subtitle: "First impressions and unfamiliar horizons",
        date: "Phase One",
        story: "Everything started with unfamiliar streets, taller skylines, and learning how a new city breathes. Even when everything felt bigger and faster at first, you stepped into it with quiet courage.",
        photo: "assets/images/fantasy/jakarta-underwater.jpg",
        caption: "The first stretch of blue skyline as a brand new chapter began."
      },
      {
        id: "daily",
        number: "02",
        title: "The Daily Journey",
        subtitle: "Routines, commutes, and steady rhythms",
        date: "Everyday Tide",
        story: "Morning starts, packed commutes, familiar sidewalks, and finding your own pace in the middle of the rush. Slowly, routes that once needed a map started feeling second nature.",
        photo: "assets/images/coffee/underwater-coffee.svg",
        caption: "Small daily rituals that kept busy mornings grounded."
      },
      {
        id: "adventures",
        number: "03",
        title: "Little Adventures",
        subtitle: "Favorite stops, food quests, and good company",
        date: "Between The Days",
        story: "Beyond the schedule were the little detours: hunting down favorite bakery loaves, stopping for coffee, exploring new corners, and turning ordinary afternoons into stories worth retelling.",
        photo: "assets/images/food/roti-abon-blokm.svg",
        caption: "Sweet and savory detours that made navigating the city worth it."
      },
      {
        id: "after-hours",
        number: "04",
        title: "After Hours",
        subtitle: "Evenings when the city lights soften",
        date: "City Twilight",
        story: "Once the daytime noise settled, the skyline glowed softer. Quiet walks, late songs on repeat, and evenings where you finally got to exhale after long hours.",
        photo: "assets/images/jakarta/kokas-neon-corridor.svg",
        caption: "Neon reflections and unhurried hours after sunset."
      },
      {
        id: "working-days",
        number: "05",
        title: "The Working Days",
        subtitle: "Challenges, resilience, and quiet milestones",
        date: "Showing Up",
        story: "Some days stretched your patience and energy, yet you kept learning, adapting, and finishing what you started. Every quiet victory from those days stayed with you.",
        photo: "assets/images/fantasy/sanctuary-alcove.jpg",
        caption: "Every new thing you learned became part of who you are today."
      }
    ],

    mapPins: [
      {
        id: "jkt-pin-1",
        label: "First Horizon",
        x: 24,
        y: 34,
        tag: "Starting Point",
        note: "Where unfamiliar streets slowly began turning into places you could navigate by heart.",
        photo: "assets/images/fantasy/jakarta-underwater.jpg"
      },
      {
        id: "jkt-pin-2",
        label: "Morning Commute",
        x: 52,
        y: 26,
        tag: "Daily Route",
        note: "A tribute to every early departure, headphones on, steady coffee in hand.",
        photo: "assets/images/coffee/underwater-coffee.svg"
      },
      {
        id: "jkt-pin-3",
        label: "Blok M Bakery Stop",
        x: 72,
        y: 44,
        tag: "Food Quest",
        note: "Proof that a good loaf of Roti Abon can instantly turn any tiring day around.",
        photo: "assets/images/food/roti-abon-blokm.svg"
      },
      {
        id: "jkt-pin-4",
        label: "Neon Arcade",
        x: 38,
        y: 66,
        tag: "After Hours",
        note: "Bright mall corridors, unexpected plot twists, and stories that turn funnier with time.",
        photo: "assets/images/jakarta/kokas-neon-corridor.svg"
      },
      {
        id: "jkt-pin-5",
        label: "Quiet Milestone",
        x: 64,
        y: 72,
        tag: "Working Days",
        note: "Every effort you poured into your days here mattered more than you probably gave yourself credit for.",
        photo: "assets/images/fantasy/sanctuary-alcove.jpg"
      }
    ],

    flipCards: [
      {
        frontLabel: "First Impression",
        frontPrompt: "Stepping into a bigger skyline",
        backText: "What first felt overwhelming slowly became proof of how adaptable and capable you truly are."
      },
      {
        frontLabel: "Everyday Skill",
        frontPrompt: "Finding calm inside the rush",
        backText: "A good playlist, a cup of coffee, and knowing exactly which favorite snack waits nearby."
      },
      {
        frontLabel: "Small Comfort",
        frontPrompt: "When a long day needed a pause",
        backText: "Warm martabak keju without sugar or a soft loaf from Blok M never failed to help."
      },
      {
        frontLabel: "Quiet Victory",
        frontPrompt: "Showing up even on heavy days",
        backText: "Every single day you navigated on your own deserves genuine appreciation."
      }
    ],

    gallery: [
      { src: "assets/images/fantasy/jakarta-underwater.jpg", title: "Submerged Skyline", caption: "Tall blue towers glowing quietly beneath the tide.", date: "Jakarta" },
      { src: "assets/images/coffee/underwater-coffee.svg", title: "Morning Ritual", caption: "Warm coffee before stepping into the day.", date: "Daily Rhythm" },
      { src: "assets/images/food/roti-abon-blokm.svg", title: "Blok M Reward", caption: "A well-earned bakery stop after busy hours.", date: "Little Detour" },
      { src: "assets/images/jakarta/kokas-neon-corridor.svg", title: "After Dark Lights", caption: "Blue reflections along lively evening corridors.", date: "After Hours" },
      { src: "assets/images/food/martabak-keju.jpg", title: "Evening Comfort", caption: "Golden cheese martabak, strictly zero sugar.", date: "Favorite Treat" },
      { src: "assets/images/fantasy/sanctuary-alcove.jpg", title: "Quiet Reflection", caption: "Looking back on everything you managed to carry.", date: "Milestone" }
    ],

    specialSection: {
      title: "To the Version of You Who Was in Jakarta",
      message: "I hope you give yourself credit for all the little things you managed to do during that time. Every unfamiliar place you navigated, every new thing you learned, and every day you showed up became part of your journey."
    }
  },

  // --------------------------------------------------------------------------
  // 8. THE FOURTEEN PERSONAL DESTINATIONS (Chapters 01 to 14)
  // --------------------------------------------------------------------------
  chapters: [
    // CHAPTER 01 : THE GUIDING LIGHT (Beach)
    {
      id: "ch01",
      number: "01",
      title: "The Guiding Light",
      theme: "Beach",
      zone: "The Hidden Shoreline",
      shortDescription: "Sunlit shallows, gentle waves, and glowing shells holding coastal calm.",
      introNarrative: "Where soft turquoise waves wash over quiet sand, each glowing shell keeps a piece of coastal peace ready whenever you need to exhale.",
      message: "Some places make you feel like you can breathe a little easier. I hope you always find your way to places that bring you that kind of peace.",
      dimensionTheme: "beach",
      transitionType: "ripple",
      mapCoords: { x: -24, y: 4, z: 4 },
      backdropImage: "assets/images/fantasy/coral-beach-realm.jpg",
      hiddenMessage: "Whenever life feels crowded or noisy, I hope you always have a quiet shoreline waiting for you, whether beside the real sea or right inside your own peace of mind.",
      seashells: [
        {
          id: "shell-1",
          name: "Pearl of Open Horizons",
          title: "Where the Horizon Slows Down",
          caption: "Clear blue water stretching far enough to quiet a busy mind.",
          note: "There is something healing about standing where the tide meets the sand. May this new year bring you plenty of slow, sunlit coastal days.",
          date: "Shoreline I",
          photo: "assets/images/fantasy/coral-beach-realm.jpg"
        },
        {
          id: "shell-2",
          name: "Shell of Salt Breeze",
          title: "Sunlight Through Shallow Waves",
          caption: "Gentle caustics dancing across turquoise sand.",
          note: "Even a short pause near the ocean reminds you that not everything needs to be rushed. Breathe easy and enjoy the moment.",
          date: "Shoreline II",
          photo: "assets/images/beach/coral-shore-2.jpg"
        },
        {
          id: "shell-3",
          name: "Lantern Conch",
          title: "Sound of Steady Waves",
          caption: "Rhythmic ocean currents that never ask you to hurry.",
          note: "Like the waves returning faithfully to shore, I hope peace always finds its way back to you on ordinary and extraordinary days alike.",
          date: "Shoreline III",
          photo: "assets/images/fantasy/ocean-whale-realm.jpg"
        },
        {
          id: "shell-4",
          name: "Tideglass Scallop",
          title: "A Pocket of Calm",
          caption: "Blue sea, soft light, and room to simply be yourself.",
          note: "Wishing you journeys that lead to clear water, gentle breezes, and sunsets you never want to leave.",
          date: "Shoreline IV",
          photo: "assets/images/beach/coral-shore-2.jpg"
        }
      ]
    },

    // CHAPTER 02 : BENEATH THE BLUE (Blue)
    {
      id: "ch02",
      number: "02",
      title: "Beneath the Blue",
      theme: "Blue",
      zone: "The Sapphire Coral Garden",
      shortDescription: "Five shades of blue woven into coral gardens, drifting jellyfish, and small treasures.",
      introNarrative: "Drift through a bioluminescent reef painted strictly in blues, from deep midnight navy to clear ice blue. Tap each shade to see why it belongs here.",
      message: "Out of all the colors in this world, somehow blue became a little part of your story. So I made this entire world blue.",
      dimensionTheme: "blue-garden",
      transitionType: "bubbles",
      mapCoords: { x: -13, y: -1, z: 10 },
      backdropImage: "assets/images/fantasy/coral-beach-realm.jpg",
      hiddenMessage: "Funny how once you associate a color with someone, you start noticing it everywhere: clear skies, deep water, quiet twilight, and calm afternoons.",
      blueObjects: [
        {
          id: "blue-1",
          name: "Midnight Jellyfish",
          shadeName: "Deep Navy",
          hex: "#071C36",
          title: "Calm of the Deep Night",
          caption: "Quiet, steady, and effortlessly composed.",
          note: "Deep navy is the anchor of this ocean: calm under pressure, grounded, and quietly reassuring.",
          photo: "assets/images/memories/blue-spectrum-garden.svg"
        },
        {
          id: "blue-2",
          name: "Cerulean Coral Branch",
          shadeName: "Royal Blue",
          hex: "#246A9B",
          title: "Heart of the Current",
          caption: "Vibrant without ever needing to be loud.",
          note: "Royal blue carries quiet confidence and warmth, the exact balance that makes your presence easy to appreciate.",
          photo: "assets/images/fantasy/coral-beach-realm.jpg"
        },
        {
          id: "blue-3",
          name: "Luminous Sea Glass",
          shadeName: "Soft Cyan",
          hex: "#70C9E8",
          title: "Light Catching the Tide",
          caption: "Bright, curious, and full of gentle energy.",
          note: "Like sunlight filtering into clear water, soft cyan celebrates every cheerful spark and laugh you bring to ordinary days.",
          photo: "assets/images/beach/coral-shore-2.jpg"
        },
        {
          id: "blue-4",
          name: "Ice Horizon Orb",
          shadeName: "Ice Blue",
          hex: "#B9E8F5",
          title: "Morning Sky Clarity",
          caption: "Fresh air and open possibilities ahead.",
          note: "Ice blue is for fresh beginnings, clear mornings, and every beautiful new chapter waiting in the year ahead.",
          photo: "assets/images/fantasy/ocean-whale-realm.jpg"
        },
        {
          id: "blue-5",
          name: "Abyssal Lantern",
          shadeName: "Ocean Blue",
          hex: "#123F67",
          title: "Everything in Between",
          caption: "Because one shade of blue was never enough.",
          note: "Combining every blue into one place felt like the only fitting way to celebrate your birthday.",
          photo: "assets/images/memories/blue-spectrum-garden.svg"
        }
      ]
    },

    // CHAPTER 03 : THE WHALE THAT CARRIED MEMORIES (Whale)
    {
      id: "ch03",
      number: "03",
      title: "The Whale That Carried Memories",
      theme: "Whale",
      zone: "The Pelagic Sanctuary",
      shortDescription: "A sunlit open ocean where The Blue Whale Guide guards drifting memory spheres.",
      introNarrative: "Tap the Blue Whale button below to surface a random memory bubble, or open any floating sphere orbiting quietly around the sanctuary.",
      message: "Every whale carries its own journey across the ocean. And this one carries little pieces of your story.",
      dimensionTheme: "whale-sanctuary",
      transitionType: "whale",
      mapCoords: { x: 0, y: 4.5, z: -2 },
      backdropImage: "assets/images/fantasy/ocean-whale-realm.jpg",
      hiddenMessage: "Just like a blue whale traveling thousands of miles at its own unhurried rhythm, you never have to rush your timeline to reach wonderful places.",
      memoryBubbles: [
        {
          id: "wb-1",
          title: "Gentle Giant of the Blue",
          date: "Memory Bubble 01",
          caption: "Graceful, steady, and completely comfortable in deep waters.",
          story: "The blue whale became the guide of this world because it moves with quiet strength, patience, and wonder through vast oceans.",
          photo: "assets/images/fantasy/ocean-whale-realm.jpg"
        },
        {
          id: "wb-2",
          title: "Fragments of Favorite Things",
          date: "Memory Bubble 02",
          caption: "Coffee, seaside breezes, misty pine air, and late-night songs.",
          story: "Inside this bubble floats a reminder that even the smallest preferences are worth noticing and remembering.",
          photo: "assets/images/whale/whale-sanctuary-2.jpg"
        },
        {
          id: "wb-3",
          title: "Carried Across Every Chapter",
          date: "Memory Bubble 03",
          caption: "From busy city lights to quiet mountain mist.",
          story: "No matter how different each season of life feels, every stop adds richness to the story you are writing.",
          photo: "assets/images/fantasy/jakarta-underwater.jpg"
        },
        {
          id: "wb-4",
          title: "Moments Worth Smiling At",
          date: "Memory Bubble 04",
          caption: "Inside jokes, garlic mysteries, and strictly sugar-free martabak.",
          story: "Not every meaningful memory has to be solemn. Sometimes the funniest little details are the warmest ones to keep.",
          photo: "assets/images/food/martabak-keju.jpg"
        },
        {
          id: "wb-5",
          title: "Next Horizon Ahead",
          date: "Memory Bubble 05",
          caption: "Wishing you wider oceans and brighter skies this year.",
          story: "May the tide carry you toward kind people, peaceful places, and moments that feel genuinely yours.",
          photo: "assets/images/whale/whale-sanctuary-2.jpg"
        }
      ]
    },

    // CHAPTER 04 : THE MYSTERY OF BAWANG PUTIH (Garlic)
    {
      id: "ch04",
      number: "04",
      title: "The Mystery of Bawang Putih",
      theme: "Bawang Putih",
      zone: "The Culinary Grotto",
      shortDescription: "A playful underwater kitchen guarding one unmistakably fragrant little mystery.",
      introNarrative: "Something famously aromatic is hiding in this quiet blue underwater kitchen. Inspect the four kitchen spots below to crack the Great Garlic Mystery.",
      message: "Even the funniest, most specific little details deserve their own underwater legend.",
      dimensionTheme: "garlic-kitchen",
      transitionType: "bubbles",
      mapCoords: { x: 11, y: 1.5, z: -13 },
      hiddenMessage: "Case officially closed, yet somehow bawang putih will always earn a smile whenever it shows up unexpectedly.",
      mystery: {
        prompt: "Detective Objective: Inspect the four kitchen spots below to locate the legendary Bawang Putih.",
        suspects: [
          {
            id: "suspect-pot",
            label: "The Bubbling Coral Pot",
            icon: "pot",
            isGarlic: false,
            clueText: "Only sea salt and overconfident steam inside this pot. Keep investigating, detective."
          },
          {
            id: "suspect-jar",
            label: "The Floating Spice Jar",
            icon: "jar",
            isGarlic: false,
            clueText: "A pinch of pepper and a tiny waterproof note reading: 'Getting warmer. Follow the aroma.'"
          },
          {
            id: "suspect-basket",
            label: "The Woven Pantry Basket",
            icon: "basket",
            isGarlic: false,
            clueText: "Nothing here except a floating wooden spoon refusing to confess. Check the glass dome."
          },
          {
            id: "suspect-cloche",
            label: "The Crystal Glass Cloche",
            icon: "cloche",
            isGarlic: true,
            clueText: "CASE SOLVED. Resting proudly beneath the crystal glass dome is the legendary Bawang Putih itself, undefeated and officially enshrined in this birthday ocean."
          }
        ],
        solvedTitle: "Mystery Solved: The Legend of Bawang Putih",
        solvedNote: "Every great world needs a little playful mystery alongside the heartfelt parts. Here is to all the quirky little food details and laughs that make your story genuinely yours.",
        photo: "assets/images/food/bawang-putih-kitchen.svg",
        caption: "Exhibit A: Safely preserved beneath a royal-blue glass cloche."
      }
    },

    // CHAPTER 05 : THE SECRET BETWEEN PERPUSAT AND BOMBA CIRCLE
    {
      id: "ch05",
      number: "05",
      title: "The Secret Between Perpusat and Bomba Circle",
      theme: "Perpusat & Bomba Circle",
      zone: "The Twin Portals",
      shortDescription: "Two glowing portals opening onto two cherished circles of company and shared stories.",
      introNarrative: "Side by side shimmer two distinct portals beneath the tide. Step into either circle to open its gallery and warm birthday note.",
      message: "Every journey becomes a little more meaningful because of the people we meet along the way.",
      dimensionTheme: "twin-portals",
      transitionType: "warp",
      mapCoords: { x: -7, y: 2.8, z: -17 },
      hiddenMessage: "Good circles are rare treasures: the ones where quiet hours feel comfortable and lively conversations make time disappear.",
      portals: {
        perpusat: {
          name: "Perpusat Circle",
          tagline: "Portal I: Quiet company, shared hours, and familiar warmth",
          story: "Some friendships grow naturally through shared hours, comfortable silences, and showing up beside each other through everyday milestones. Perpusat Circle holds its own special place in this ocean.",
          personalMessage: "Grateful for every quiet hour, shared focus, and genuine friendship carried out of Perpusat Circle.",
          photos: [
            { src: "assets/images/perpusat/perpusat-portal.svg", title: "Portal of Perpusat", caption: "A calm sapphire arch dedicated to familiar company.", date: "Perpusat Circle" },
            { src: "assets/images/books/floating-library-pages.svg", title: "Shared Quiet Hours", caption: "Side-by-side days that turned into lasting memories.", date: "Perpusat Circle" },
            { src: "assets/images/coffee/underwater-coffee.svg", title: "Between Chapters", caption: "Short breaks and easy conversations.", date: "Perpusat Circle" }
          ]
        },
        bomba: {
          name: "Bomba Circle",
          tagline: "Portal II: Laughter, bright energy, and unforgettable stories",
          story: "Then there is the circle that turns ordinary hangouts into stories you still laugh about months later. Bomba Circle brings bright currents, effortless humor, and warm energy to every chapter.",
          personalMessage: "Here is to more laughter, spontaneous plans, and unforgettable moments ahead with Bomba Circle.",
          photos: [
            { src: "assets/images/bomba/bomba-portal.svg", title: "Portal of Bomba", caption: "Rippling tides of shared energy and laughter.", date: "Bomba Circle" },
            { src: "assets/images/fantasy/coral-beach-realm.jpg", title: "Bright Currents", caption: "Good people make every destination brighter.", date: "Bomba Circle" },
            { src: "assets/images/food/martabak-keju.jpg", title: "Good Food, Better Company", caption: "Stories always taste better when shared together.", date: "Bomba Circle" }
          ]
        }
      }
    },

    // CHAPTER 06 : MARTABAK MANIS KEJU WITHOUT SUGAR
    {
      id: "ch06",
      number: "06",
      title: "The Forgotten Recipe of Martabak Manis Keju Without Sugar",
      theme: "Martabak Manis Keju Tanpa Gula",
      zone: "The Golden Reef Bakery",
      shortDescription: "An underwater bakery vault guarding one unmistakably specific cheese martabak order.",
      introNarrative: "Warm golden light glows softly inside royal-blue water. Open the bakery treasure chest to inspect the sacred, strictly sugar-free cheese recipe.",
      message: "Remembering someone's exact order, right down to 'no sugar, generous cheese', is its own quiet way of saying I pay attention.",
      dimensionTheme: "bakery-martabak",
      transitionType: "fade",
      mapCoords: { x: 18, y: -0.5, z: -5 },
      hiddenMessage: "May every martabak stall you ever visit listen carefully on the first try and never accidentally sprinkle sugar over your golden cheese.",
      treasureChest: {
        chestTitle: "Vault of the Sacred Order",
        recipeName: "Martabak Manis Keju (Strictly Without Sugar)",
        goldenRule: "Rule #1: Zero added sugar. Let the warm fluffy honeycomb batter, melted butter, and generous savory cheese do all the talking.",
        ingredients: [
          "Thick, soft golden honeycomb batter fresh off the cast-iron pan",
          "Generous mountain of savory grated cheddar cheese",
          "Warm melted butter brushed smoothly across every slice",
          "Strictly zero grams of sprinkled sugar (non-negotiable)"
        ],
        personalNote: "People rarely forget a taste preference this iconic. It is simple, honest, savory-sweet perfection, and it absolutely earned its own underwater treasure vault.",
        photos: [
          { src: "assets/images/food/martabak-keju.jpg", title: "The Golden Standard", caption: "Warm honeycomb batter folded generously with cheddar cheese, zero sugar.", date: "Sacred Order" },
          { src: "assets/images/fantasy/sanctuary-alcove.jpg", title: "Golden Reef Bakery", caption: "Cozy amber light glowing inside deep ocean blue.", date: "Bakery Vault" }
        ]
      }
    },

    // CHAPTER 07 : THE LAST LOAF OF ROTI ABON BLOK M
    {
      id: "ch07",
      number: "07",
      title: "The Last Loaf of Roti Abon Blok M",
      theme: "Roti Abon Blok M",
      zone: "The Glowing Bakery Window",
      shortDescription: "An illuminated blue bakery showcase guarding soft golden loaves of Roti Abon.",
      introNarrative: "Behind glowing arched panes drift warm loaves of Roti Abon Blok M. Tap any floating loaf to unwrap its story and birthday note.",
      message: "Some favorite cravings are worth crossing half a city, or diving beneath an entire blue ocean, just to find.",
      dimensionTheme: "bakery-roti",
      transitionType: "ripple",
      mapCoords: { x: 22, y: 2.2, z: 6 },
      hiddenMessage: "May your favorite bakery shelf never run out before you arrive, and may there always be one warm loaf waiting with your name on it.",
      loaves: [
        {
          id: "loaf-1",
          name: "The First Warm Bite",
          tag: "Fresh From The Window",
          story: "Soft fluffy bread crowned with savory golden abon: the kind of unmistakable comfort snack that instantly lifts a long afternoon.",
          caption: "Warm bakery glow framed in midnight blue.",
          date: "Blok M Classic",
          photo: "assets/images/food/roti-abon-blokm.svg"
        },
        {
          id: "loaf-2",
          name: "The Blok M Legend",
          tag: "Worth The Detour",
          story: "Part of the joy is the little mission itself: heading toward Blok M knowing exactly which treat is waiting inside the paper bag.",
          caption: "A tiny reward that turns a busy commute into a small celebration.",
          date: "City Craving",
          photo: "assets/images/food/roti-abon-blokm.svg"
        },
        {
          id: "loaf-3",
          name: "The Last Loaf Saved For You",
          tag: "Reserved Special",
          story: "Consider this underwater showcase permanently stocked. On your birthday and every day after, you deserve the very best last loaf on the tray.",
          caption: "Always reserved on the warmest shelf.",
          date: "Birthday Reserve",
          photo: "assets/images/food/martabak-keju.jpg"
        }
      ]
    },

    // CHAPTER 08 : A THOUSAND STORIES IN A CUP OF COFFEE
    {
      id: "ch08",
      number: "08",
      title: "A Thousand Stories in a Cup of Coffee",
      theme: "Coffee",
      zone: "The Submerged Cafe",
      shortDescription: "Floating bistro tables, warm lantern light, and cups brimming with quiet moments.",
      introNarrative: "Take a seat at a calm underwater cafe where warm amber light meets midnight blue water. Tap each cup to read the moment brewed inside.",
      message: "Every good conversation, focused morning, or unhurried breath seems to begin right beside a warm cup of coffee.",
      dimensionTheme: "coffee-cafe",
      transitionType: "fade",
      mapCoords: { x: 10, y: -1.8, z: 12 },
      backdropImage: "assets/images/fantasy/sanctuary-alcove.jpg",
      hiddenMessage: "Wishing you a year filled with smooth brews, cozy corner tables, unhurried conversations, and coffee shops that feel like second homes.",
      cups: [
        {
          id: "cup-1",
          brewName: "Cup I: The Familiar Order",
          mood: "Warm & Steady",
          story: "That reliable first sip that gently wakes up the morning and tells you today is going to be manageable after all.",
          caption: "Warm ceramic cup beside rain-kissed blue glass.",
          date: "Morning Pour",
          photo: "assets/images/coffee/underwater-coffee.svg"
        },
        {
          id: "cup-2",
          brewName: "Cup II: Slow Afternoon Table",
          mood: "Unhurried & Calm",
          story: "Sunlight leaning across a wooden table, no rush to leave, just space to read, think, or catch up with people who feel easy to talk to.",
          caption: "Amber lamp glow over deep ocean blue.",
          date: "Afternoon Pause",
          photo: "assets/images/fantasy/sanctuary-alcove.jpg"
        },
        {
          id: "cup-3",
          brewName: "Cup III: Quiet Companion",
          mood: "Deep Blue Focus",
          story: "For all the long working hours and late creative stretches when a glass of iced coffee quietly kept you company until the finish line.",
          caption: "Swirling iced coffee for steady focus.",
          date: "Focus Hour",
          photo: "assets/images/coffee/underwater-coffee.svg"
        },
        {
          id: "cup-4",
          brewName: "Cup IV: Next Cafe Ahead",
          mood: "Future Discovery",
          story: "Here is to discovering ten more tucked-away coffee corners in the coming year, each with its own new favorite memory.",
          caption: "Always one more table waiting to be discovered.",
          date: "Birthday Toast",
          photo: "assets/images/fantasy/sanctuary-alcove.jpg"
        }
      ]
    },

    // CHAPTER 09 : THE UNLUCKY DAYS OF NIGHTMARE OF KOKAS
    {
      id: "ch09",
      number: "09",
      title: "The Unlucky Days of Nightmare of Kokas",
      theme: "Nightmare of Kokas",
      zone: "The Neon Arcade Corridor",
      shortDescription: "A blue-neon submerged corridor celebrating playful twists and laugh-later moments.",
      introNarrative: "Cyan signs flicker softly along an underwater shopping corridor. Tap each glowing sign to revisit the lighthearted legend of 'Nightmare of Kokas'.",
      message: "Even the slightly unlucky detours become the funniest stories once the tide turns them into laughter.",
      dimensionTheme: "neon-kokas",
      transitionType: "warp",
      mapCoords: { x: -21, y: -2.2, z: -2 },
      hiddenMessage: "Official birthday blessing: from today onward, every escalator works, every turn leads straight to your destination, and Kokas owes you 100% smooth luck.",
      mishapCards: [
        {
          id: "kokas-1",
          signLabel: "EXIT? THIS WAY",
          objectName: "The Plot-Twist Corridor",
          title: "The Legendary Detour",
          story: "Sometimes you walk into a mall expecting a simple five-minute errand and somehow end up starring in an unexpected side quest. At least it makes for an undefeated story later.",
          luckRating: "Luck Level: Plot Twist",
          caption: "Submerged neon corridor reflections.",
          photo: "assets/images/jakarta/kokas-neon-corridor.svg"
        },
        {
          id: "kokas-2",
          signLabel: "FLOOR B1 / L3 / ???",
          objectName: "The Endless Escalator Loop",
          title: "Testing Your Patience",
          story: "When timing, crowds, and little coincidences all decide to team up on the exact same afternoon, all you can do is shake your head, laugh, and survive with grace.",
          luckRating: "Luck Level: Side Quest",
          caption: "Glowing blue signs pointing in mysterious directions.",
          photo: "assets/images/jakarta/kokas-neon-corridor.svg"
        },
        {
          id: "kokas-3",
          signLabel: "LUCKY CHARM REFILL",
          objectName: "The Birthday Luck Reset",
          title: "Smooth Sailing From Here",
          story: "Consider this chapter your official underwater luck recharge. May every future trip be effortless, well-timed, and full of pleasant surprises.",
          luckRating: "Luck Level: Fully Redeemed",
          caption: "Cleared currents ahead.",
          photo: "assets/images/fantasy/jakarta-underwater.jpg"
        }
      ]
    },

    // CHAPTER 10 : THE SECRET LIFE OF A PRIVATE FARM
    {
      id: "ch10",
      number: "10",
      title: "The Secret Life of a Private Farm",
      theme: "Private Farm",
      zone: "The Bioluminescent Meadow",
      shortDescription: "A tranquil blue-hour fantasy farm glowing with calm flora, gentle animals, and space to breathe.",
      introNarrative: "Far from busy streets lies a serene underwater meadow of misty hills, a warm timber-and-glass barn, and peaceful pasture companions.",
      message: "There is something genuinely lovely about dreaming of a quiet, cozy sanctuary all your own.",
      dimensionTheme: "private-farm",
      transitionType: "ripple",
      mapCoords: { x: 3, y: -2.8, z: 18 },
      backdropImage: "assets/images/memories/private-farm-meadow.jpg",
      hiddenMessage: "Whether that private farm lives as a future dream or a peaceful state of mind, I hope you always have room in your life for slow mornings and living things that bring joy.",
      farmSpots: [
        {
          id: "farm-1",
          icon: "sprout",
          name: "The Glowing Garden",
          title: "Patience That Blooms",
          note: "Rows of thriving plants cared for without hurry, reminding you that good things take gentle time to grow.",
          caption: "Bioluminescent garden plants at twilight.",
          photo: "assets/images/memories/private-farm-meadow.jpg"
        },
        {
          id: "farm-2",
          icon: "animal",
          name: "The Gentle Pasture",
          title: "Peaceful Company",
          note: "Calm animals resting across rolling misty hills, far away from traffic horns and crowded schedules.",
          caption: "Quiet hillside pasture beneath a blue sky.",
          photo: "assets/images/memories/private-farm-meadow.jpg"
        },
        {
          id: "farm-3",
          icon: "barn",
          name: "The Glass Barn Sanctuary",
          title: "Warm Window at Blue Hour",
          note: "A cozy timber-and-glass barn glowing warmly against twilight mist: coffee in the morning, open air all afternoon.",
          caption: "Lantern glow inside the blue-hour meadow.",
          photo: "assets/images/memories/private-farm-meadow.svg"
        },
        {
          id: "farm-4",
          icon: "lantern",
          name: "The Firefly Meadow",
          title: "A Dream Worth Keeping",
          note: "May every dream you carry quietly, big or small, find a real way to take root and flourish.",
          caption: "Soft glowing motes drifting across the hills.",
          photo: "assets/images/memories/private-farm-meadow.jpg"
        }
      ]
    },

    // CHAPTER 11 : THE WOMAN WHO CHANGED THE STORY
    {
      id: "ch11",
      number: "11",
      title: "The Woman Who Changed the Story",
      theme: "Female-Lead Action Series",
      zone: "The Abyssal Cinema",
      shortDescription: "An Art-Deco underwater theater celebrating fearless, sharp-minded female leads.",
      introNarrative: "Volumetric blue projector shafts cut through the quiet theater. Spin any floating film reel below to illuminate an original tribute card.",
      message: "Stories feel electric the moment the heroine steps forward, rewrites the rules, and refuses to stay in the background.",
      dimensionTheme: "cinema",
      transitionType: "depth",
      mapCoords: { x: -16, y: 1.2, z: 16 },
      backdropImage: "assets/images/fantasy/harmonic-cinema.jpg",
      hiddenMessage: "You are drawn to resilient, sharp, courageous protagonists because a piece of that exact quiet strength lives in you too.",
      filmReels: [
        {
          id: "reel-1",
          reelNumber: "REEL 01",
          seriesTitle: "The Sharp Strategist",
          archetype: "Brains Under Pressure",
          vibeTag: "Tactical & Unflinching",
          note: "The best female-lead action stories are never just about loud explosions; they shine when the protagonist thinks three moves ahead and stays calm when the room panics.",
          caption: "Volumetric cyan light inside the underwater cinema.",
          photo: "assets/images/fantasy/harmonic-cinema.jpg"
        },
        {
          id: "reel-2",
          reelNumber: "REEL 02",
          seriesTitle: "The Unstoppable Trailblazer",
          archetype: "Heart & Grit",
          vibeTag: "Fearless & Loyal",
          note: "For every action series where she gets knocked down, catches her breath, stands right back up, and changes the entire fate of the story.",
          caption: "Cinematic blue spotlight on bold storytelling.",
          photo: "assets/images/fantasy/harmonic-cinema.jpg"
        },
        {
          id: "reel-3",
          reelNumber: "REEL 03",
          seriesTitle: "Season Ahead: Your Own Story",
          archetype: "Lead Character Energy",
          vibeTag: "Resilient & Iconic",
          note: "May your upcoming year play like the very best season of a series you cannot stop watching: bold turns, earned victories, and moments you remember fondly.",
          caption: "Reserved front-row seat beneath the tide.",
          photo: "assets/images/fantasy/ocean-whale-realm.jpg"
        }
      ]
    },

    // CHAPTER 12 : SONGS WE LEFT BENEATH THE TIDE
    {
      id: "ch12",
      number: "12",
      title: "Songs We Left Beneath the Tide",
      theme: "Conan Gray & Her by JVKE",
      zone: "The Harmonic Resonance Chamber",
      shortDescription: "Floating ripples of sound celebrating Conan Gray and Her by JVKE.",
      introNarrative: "Sound travels farther underwater. Step inside the harmonic chamber to explore the music woven into your soundtrack, complete with official listening links.",
      message: "Some songs become little time capsules: one opening chord and you are right back inside a feeling.",
      dimensionTheme: "music-chamber",
      transitionType: "ripple",
      mapCoords: { x: 16, y: 4.2, z: 14 },
      backdropImage: "assets/images/fantasy/harmonic-cinema.jpg",
      hiddenMessage: "Whenever these tracks come on shuffle, I hope they remind you that someone out there noticed the soundtrack you love.",
      musicSections: [
        {
          id: "conan-gray",
          badge: "Artist Spotlight",
          title: "Conan Gray",
          subtitle: "Midnight storytelling, heartfelt indie pop, and honest melodies",
          description: "Songs built for late-night drives, window seats, and feelings too honest to leave unspoken. Effortlessly expressive, cinematic, and deeply relatable.",
          personalNote: "There is something timeless about how Conan Gray turns quiet, bittersweet thoughts into melodies you want to replay all night.",
          photo: "assets/images/memories/music-tide-vinyl.svg",
          caption: "Midnight-blue vinyl spinning softly beneath ocean light.",
          links: [
            { label: "Spotify", url: "https://open.spotify.com/artist/4Uc8Dsxct0oMqx0P6i60ea" },
            { label: "YouTube Music", url: "https://music.youtube.com/search?q=Conan+Gray" },
            { label: "Apple Music", url: "https://music.apple.com/search?term=Conan%20Gray" }
          ]
        },
        {
          id: "her-jvke",
          badge: "Featured Song",
          title: "Her by JVKE",
          subtitle: "Sweeping piano swells, gentle warmth, and cinematic devotion",
          description: "A track that rises like an ocean swell: tender piano notes building into a warm, luminous crescendo that lingers long after the final second.",
          personalNote: "Soft, glowing, and unforgettable, fitting right into the calm blue atmosphere of this entire world.",
          photo: "assets/images/fantasy/harmonic-cinema.jpg",
          caption: "Harmonic wave rings echoing through deep royal blue.",
          links: [
            { label: "Spotify", url: "https://open.spotify.com/search/Her%20JVKE" },
            { label: "YouTube Music", url: "https://music.youtube.com/search?q=Her+JVKE" },
            { label: "Apple Music", url: "https://music.apple.com/search?term=Her%20JVKE" }
          ]
        }
      ]
    },

    // CHAPTER 13 : THE WORLD BETWEEN THE PAGES
    {
      id: "ch13",
      number: "13",
      title: "The World Between the Pages",
      theme: "Reading",
      zone: "The Sunken Library",
      shortDescription: "Levitating illuminated volumes, drifting pages, and quiet worlds opened one chapter at a time.",
      introNarrative: "Curved shelves fade into calm sapphire twilight while open books float softly through the water. Tap any book below to open its reading note.",
      message: "Readers carry whole universes quietly inside their heads, and yours is one of the brightest.",
      dimensionTheme: "library",
      transitionType: "fade",
      mapCoords: { x: 4, y: 3.5, z: -18 },
      backdropImage: "assets/images/fantasy/sanctuary-alcove.jpg",
      hiddenMessage: "Bookmark wish: may you always find quiet hours where nobody interrupts your favorite chapter.",
      books: [
        {
          id: "book-1",
          spineColor: "#1B5685",
          title: "Volume I: Quiet Escapes",
          author: "The Reading Corner",
          leftPageHeading: "Chapter Note",
          leftPageText: "Few things match the peace of losing track of time between good pages while the outside world slows down.",
          rightPageQuote: "May your shelf stay full of stories that pull you in from the very first paragraph.",
          caption: "Open pages illuminated beneath arched blue windows.",
          photo: "assets/images/books/floating-library-pages.svg"
        },
        {
          id: "book-2",
          spineColor: "#246A9B",
          title: "Volume II: Curious Mind",
          author: "Collected Thoughts",
          leftPageHeading: "Favorite Habit",
          leftPageText: "Loving to read shows up in the way you notice details, think deeply, and appreciate stories with real substance.",
          rightPageQuote: "Every book you finish adds another lantern to the way you see the world.",
          caption: "Warm sanctuary alcove designed for unhurried reading.",
          photo: "assets/images/fantasy/sanctuary-alcove.jpg"
        },
        {
          id: "book-3",
          spineColor: "#123F67",
          title: "Volume III: Unwritten Pages",
          author: "Your Next Year",
          leftPageHeading: "Birthday Chapter",
          leftPageText: "Today turns the page to a brand new chapter of your own story, completely fresh and ready for joyful surprises.",
          rightPageQuote: "May this next year read like a book you never want to put down.",
          caption: "Fresh pages drifting upward into clear light.",
          photo: "assets/images/books/floating-library-pages.svg"
        }
      ]
    },

    // CHAPTER 14 : WHERE THE MIST MEETS KALIURANG
    {
      id: "ch14",
      number: "14",
      title: "Where the Mist Meets Kaliurang",
      theme: "Kaliurang",
      zone: "The Submerged Pine Highlands",
      shortDescription: "Cool highland pine silhouettes, cascading underwater waterfalls, and serene blue mist.",
      introNarrative: "Cool mountain air merges seamlessly with deep ocean currents. Tall pine trees stand quietly beneath a luminous underwater waterfall, preserving the calm magic of Kaliurang.",
      message: "May you always carry a pocket of cool Kaliurang mist inside you whenever the world feels too loud.",
      dimensionTheme: "kaliurang",
      transitionType: "depth",
      mapCoords: { x: -4, y: 5.2, z: 12 },
      backdropImage: "assets/images/fantasy/kaliurang-mist.jpg",
      hiddenMessage: "If peace had a temperature and a view, it would look a lot like cool morning mist weaving quietly through Kaliurang pines.",
      mistObjects: [
        {
          id: "kali-1",
          name: "The Cascading Waterfall",
          title: "Cool Highland Air",
          note: "Soft silver-blue mist rising where cool water meets stone, instantly calming everything around it.",
          caption: "Underwater waterfall cascading through pine-lined cliffs.",
          date: "Kaliurang I",
          photo: "assets/images/fantasy/kaliurang-mist.jpg"
        },
        {
          id: "kali-2",
          name: "The Pine Trail Lantern",
          title: "Unhurried Mountain Walks",
          note: "Tall pine trees filtering soft light, crisp air, and the kind of stillness that makes every breath feel lighter.",
          caption: "Blue mist drifting softly between towering pines.",
          date: "Kaliurang II",
          photo: "assets/images/fantasy/kaliurang-mist.jpg"
        },
        {
          id: "kali-3",
          name: "The Warm Highland Stop",
          title: "Warm Sip in Cool Air",
          note: "Nothing pairs better with cool highland weather than a warm drink and unhurried conversation.",
          caption: "Warm glow nestled inside cool twilight blue.",
          date: "Kaliurang III",
          photo: "assets/images/coffee/underwater-coffee.svg"
        },
        {
          id: "kali-4",
          name: "The Mist Overlook",
          title: "A Place Worth Returning To",
          note: "Here is to future trips back to cool mountain air whenever your soul asks for quiet scenery.",
          caption: "Crystalline river winding beneath misty ridges.",
          date: "Kaliurang IV",
          photo: "assets/images/fantasy/kaliurang-mist.jpg"
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 9. SCENE 06 : LITTLE THINGS I REMEMBER ABOUT YOU (8 Categories)
  // --------------------------------------------------------------------------
  memoryCategories: [
    "Things You Love",
    "Things That Make You Laugh",
    "Favorite Places",
    "Favorite Foods",
    "Songs You Listen To",
    "Little Habits",
    "Dreams and Interests",
    "Funny Experiences"
  ],

  personalMemories: [
    {
      id: "mem-01",
      category: "Things You Love",
      style: "polaroid",
      title: "Every Shade of Blue",
      caption: "From deep midnight navy to soft sky cyan, blue simply feels like your signature.",
      date: "Always",
      image: "assets/images/memories/blue-spectrum-garden.svg",
      hiddenMessage: "Building an entire blue world felt like the most honest tribute I could give."
    },
    {
      id: "mem-02",
      category: "Things You Love",
      style: "bottle",
      title: "Grace of the Blue Whale",
      caption: "Calm, gentle, and majestic while gliding across wide oceans.",
      date: "Guide of the Blue",
      image: "assets/images/fantasy/ocean-whale-realm.jpg",
      hiddenMessage: "That is why a blue whale was the very first guide placed in this ocean."
    },
    {
      id: "mem-03",
      category: "Things That Make You Laugh",
      style: "polaroid",
      title: "The Great Bawang Putih Mystery",
      caption: "Some kitchen details are simply too iconic not to turn into a playful detective case.",
      date: "Inside Smile",
      image: "assets/images/food/bawang-putih-kitchen.svg",
      hiddenMessage: "Hope the underwater kitchen mystery caught you smiling."
    },
    {
      id: "mem-04",
      category: "Things That Make You Laugh",
      style: "bottle",
      title: "Unfiltered Lighthearted Stories",
      caption: "The kind of small random twists that get funnier every time they are retold.",
      date: "Good Humor",
      image: "assets/images/bomba/bomba-portal.svg",
      hiddenMessage: "May this year keep giving you genuine, breathless laughs."
    },
    {
      id: "mem-05",
      category: "Favorite Places",
      style: "polaroid",
      title: "Peace by the Beach",
      caption: "Open water, gentle waves, and the freedom to breathe a little easier.",
      date: "Coastal Peace",
      image: "assets/images/fantasy/coral-beach-realm.jpg",
      hiddenMessage: "May you visit clear shorelines again soon."
    },
    {
      id: "mem-06",
      category: "Favorite Places",
      style: "polaroid",
      title: "Cool Mist of Kaliurang",
      caption: "Tall pines, crisp mountain air, and serene quiet away from the noise.",
      date: "Highland Calm",
      image: "assets/images/fantasy/kaliurang-mist.jpg",
      hiddenMessage: "A timeless favorite whenever life needs a cool reset."
    },
    {
      id: "mem-07",
      category: "Favorite Foods",
      style: "polaroid",
      title: "Martabak Manis Keju (Zero Sugar)",
      caption: "Warm golden batter and generous grated cheese with strictly no sprinkled sugar.",
      date: "Sacred Order",
      image: "assets/images/food/martabak-keju.jpg",
      hiddenMessage: "Yes, I remembered the exact 'without sugar' rule."
    },
    {
      id: "mem-08",
      category: "Favorite Foods",
      style: "bottle",
      title: "Roti Abon Blok M",
      caption: "Soft, savory, warm, and always worth tracking down in Blok M.",
      date: "Bakery Classic",
      image: "assets/images/food/roti-abon-blokm.svg",
      hiddenMessage: "May your favorite loaf always still be warm on the shelf."
    },
    {
      id: "mem-09",
      category: "Songs You Listen To",
      style: "bottle",
      title: "Conan Gray on Late Evenings",
      caption: "Honest lyrics and glowing midnight melodies that fit blue twilight perfectly.",
      date: "Soundtrack",
      image: "assets/images/memories/music-tide-vinyl.svg",
      hiddenMessage: "A soundtrack with real heart behind every chorus."
    },
    {
      id: "mem-10",
      category: "Songs You Listen To",
      style: "polaroid",
      title: "Her by JVKE",
      caption: "Cinematic piano swells that feel just like sunlight rippling across calm water.",
      date: "On Repeat",
      image: "assets/images/fantasy/harmonic-cinema.jpg",
      hiddenMessage: "Easy to listen to on repeat without ever growing tired of it."
    },
    {
      id: "mem-11",
      category: "Little Habits",
      style: "bottle",
      title: "A Cup of Coffee Beside the Day",
      caption: "Whether starting busy mornings or slowing down in a quiet corner cafe.",
      date: "Daily Ritual",
      image: "assets/images/coffee/underwater-coffee.svg",
      hiddenMessage: "A comforting little ritual that suits you effortlessly."
    },
    {
      id: "mem-12",
      category: "Little Habits",
      style: "polaroid",
      title: "Getting Lost Between Book Pages",
      caption: "Carrying quiet curiosity into every story and chapter you pick up.",
      date: "Quiet Hours",
      image: "assets/images/books/floating-library-pages.svg",
      hiddenMessage: "One of the loveliest habits someone can keep."
    },
    {
      id: "mem-13",
      category: "Dreams and Interests",
      style: "polaroid",
      title: "A Peaceful Private Farm",
      caption: "Open green hills, glowing mornings, gentle animals, and space that feels wholly yours.",
      date: "Future Vision",
      image: "assets/images/memories/private-farm-meadow.jpg",
      hiddenMessage: "Rooting wholeheartedly for every peaceful dream you hold."
    },
    {
      id: "mem-14",
      category: "Dreams and Interests",
      style: "bottle",
      title: "Bold Female-Lead Action Series",
      caption: "Stories led by sharp, fearless heroines who reshape the plot on their own terms.",
      date: "Watchlist",
      image: "assets/images/fantasy/harmonic-cinema.jpg",
      hiddenMessage: "Always great taste in unforgettable protagonists."
    },
    {
      id: "mem-15",
      category: "Funny Experiences",
      style: "polaroid",
      title: "Surviving Nightmare of Kokas",
      caption: "Because even the unluckiest mall detours become comedy gold once they are behind you.",
      date: "Plot Twist",
      image: "assets/images/jakarta/kokas-neon-corridor.svg",
      hiddenMessage: "Wishing you permanent VIP luck on every future visit."
    },
    {
      id: "mem-16",
      category: "Funny Experiences",
      style: "bottle",
      title: "Navigating the Jakarta Maze",
      caption: "Unfamiliar routes turned into real-life experience and stories worth laughing about.",
      date: "Jakarta Tales",
      image: "assets/images/fantasy/jakarta-underwater.jpg",
      hiddenMessage: "You handled every curveball better than you think."
    }
  ],

  // --------------------------------------------------------------------------
  // 10. SCENE 07 : THINGS YOU MIGHT HAVE FORGOTTEN (Glowing Envelopes)
  // --------------------------------------------------------------------------
  forgottenMemories: [
    {
      id: "env-01",
      sealLabel: "Envelope I",
      category: "Small Detail",
      title: "The Way You Appreciate Quiet Places",
      note: "Whether it is a breeze by the beach, cool Kaliurang pine mist, or a peaceful corner with a book, you notice calm beauty that hurried people walk right past.",
      signature: "Remembered beneath the blue"
    },
    {
      id: "env-02",
      sealLabel: "Envelope II",
      category: "Playful Note",
      title: "Specific Orders Matter",
      note: "Martabak manis keju without sugar, Roti Abon Blok M, a good cup of coffee, and the mystery of bawang putih: every tiny detail tells a story about who you are.",
      signature: "Still smiling about these details"
    },
    {
      id: "env-03",
      sealLabel: "Envelope III",
      category: "Quiet Resilience",
      title: "Every Day You Showed Up in Jakarta",
      note: "In case nobody reminded you lately: stepping into unfamiliar places, managing daily routines, and learning through working days takes real strength. You did wonderfully.",
      signature: "Seen and appreciated"
    },
    {
      id: "env-04",
      sealLabel: "Envelope IV",
      category: "Shared Company",
      title: "The Warmth of Your Circles",
      note: "Between Perpusat Circle and Bomba Circle, it is easy to see how much meaningful company and genuine laughter follow wherever you go.",
      signature: "Grateful for good people"
    },
    {
      id: "env-05",
      sealLabel: "Envelope V",
      category: "Personal Observation",
      title: "Gentle Heart, Sharp Mind",
      note: "You can dream of a peaceful private farm in one breath and cheer for a fearless action heroine in the next. That rare mix is part of what makes you unforgettable.",
      signature: "Noticed quietly"
    },
    {
      id: "env-06",
      sealLabel: "Envelope VI",
      category: "Birthday Keepsake",
      title: "You Deserve Thoughtful Things",
      note: "You do not have to earn kindness or celebration only on huge milestones. Simply being who you are is already more than enough reason to celebrate you today.",
      signature: "Saved especially for your birthday"
    }
  ],

  // --------------------------------------------------------------------------
  // 11. SCENE 08 : SIX WISHES FOR YOU (Constellation)
  // --------------------------------------------------------------------------
  birthdayWishes: [
    {
      id: "star-01",
      number: "01",
      category: "For Your Dreams",
      message: "I hope the things you have been working toward slowly find their way to you.",
      pos: { x: 16, y: 58 }
    },
    {
      id: "star-02",
      number: "02",
      category: "For Your Journey",
      message: "I hope you get to see more places, meet wonderful people, and experience things that make life interesting.",
      pos: { x: 32, y: 30 }
    },
    {
      id: "star-03",
      number: "03",
      category: "For Your Happiness",
      message: "I hope you always find little reasons to enjoy the days, even ordinary ones.",
      pos: { x: 48, y: 46 }
    },
    {
      id: "star-04",
      number: "04",
      category: "For Your Growth",
      message: "I hope you keep learning, discovering, and becoming someone you are proud of.",
      pos: { x: 63, y: 24 }
    },
    {
      id: "star-05",
      number: "05",
      category: "For Your Peace",
      message: "I hope you find places and people where you can feel comfortable being yourself.",
      pos: { x: 76, y: 54 }
    },
    {
      id: "star-06",
      number: "06",
      category: "For Your Future",
      message: "I hope the future holds beautiful surprises you have not even imagined yet.",
      pos: { x: 88, y: 34 }
    }
  ],

  // --------------------------------------------------------------------------
  // 12. SCENE 09 : A LETTER ACROSS THE OCEAN
  // --------------------------------------------------------------------------
  letter: `Dear [NAME],

Happy Birthday!

I wanted to make something a little different for you this year.

So I collected little pieces of your world and turned them into this tiny ocean.

Your favorite things, the places you have been, the food you love, the songs you listen to, the stories you enjoy, and even some of the little things that might seem ordinary.

I hope that as you explore this place, you find a few things that make you smile.

I hope you continue to have opportunities to discover new places, meet good people, learn wonderful things, and experience moments worth remembering.

And when life gets busy, I hope you still find time for the little things that make you happy.

You deserve a year filled with meaningful experiences, good health, unexpected happiness, and beautiful new chapters.

Thank you for being exactly who you are.

Happy Birthday.

With all the best wishes,
[YOUR NAME]`,

  // --------------------------------------------------------------------------
  // 13. SCENE 10 : UNTIL THE NEXT TIDE (Final Ending)
  // --------------------------------------------------------------------------
  ending: {
    mainHeadline: "Happy Birthday, [NAME]!",
    subHeadline: "Thank you for letting me explore a little part of your world.",
    finalMessage: "Of all the oceans in this world, I'm glad this little journey could be a place where your story is celebrated."
  }
};
