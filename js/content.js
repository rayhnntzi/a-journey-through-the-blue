/**
 * ============================================================================
 * ULIL AZMI · 23RD BIRTHDAY 3D EXPERIENCE CONTENT (ENGLISH)
 * Edit passcode, photos, 14 things, jar wishes, soundtrack, and letter here.
 * ============================================================================
 */

window.birthdayStoryConfig = {
  recipientName: "Ulil Azmi",
  nickname: "Ulil",
  age: 23,
  brandTitle: "Ulil Azmi · 23",

  // STEP 1: PASSCODE GATE
  passcode: {
    eyebrow: "23RD BIRTHDAY GIFT",
    subtitle:
      "The blue whale waits at the gate. Enter the passcode below to step inside your 23rd birthday space.",
    hint: "Clue from the whale: type your age today or your favorite colour.",
    placeholder: "Type the passcode...",
    buttonLabel: "Open the Gate",
    acceptedAnswers: ["23", "blue", "biru", "ulil", "ulil azmi", "whale", "paus"],
    wrongMessages: [
      "That word did not open the gate. Type your age today or your favorite colour.",
      "Close. Think of your age today or your favorite colour.",
      "Still locked. Try the age you turn today or your favorite colour."
    ],
    whaleIntro:
      "Hi Ulil. I am your blue whale guide today. Type the passcode first so we can go in together.",
    whaleOpened:
      "You got it. Follow me into your birthday surprise."
  },

  // STEP 2: ULIL AZMI'S REAL PHOTOS & 23RD BIRTHDAY GREETING
  birthday: {
    eyebrow: "HAPPY 23RD BIRTHDAY",
    subtitle:
      "I built this little 3D world for your 23rd birthday. Flip through all six photos in the 3D deck to continue.",
    photos: [
      {
        src: "assets/images/ulil/ulil-01.jpg",
        tag: "Hutan Kota, Jakarta",
        caption: "A calm smile under clear sky and Jakarta towers.",
        objectPosition: "50% 30%"
      },
      {
        src: "assets/images/ulil/ulil-05.jpg",
        tag: "Jakarta Library",
        caption: "Curious mind, warm energy, and room to keep growing.",
        objectPosition: "50% 24%"
      },
      {
        src: "assets/images/ulil/ulil-04.jpg",
        tag: "Color Wall",
        caption: "Loud colors behind you, steady calm right in the middle.",
        objectPosition: "50% 22%"
      },
      {
        src: "assets/images/ulil/ulil-03.jpg",
        tag: "Playful Detour",
        caption: "Exploring new corners and noticing small details along the way.",
        objectPosition: "50% 22%"
      },
      {
        src: "assets/images/ulil/ulil-02.jpg",
        tag: "Pause and Rest",
        caption: "A reminder to take a break between busy days at 23.",
        objectPosition: "50% 28%"
      },
      {
        src: "assets/images/ulil/ulil-07.jpg",
        tag: "Warmest Laugh",
        caption: "May this new year give you plenty of simple reasons to smile like this.",
        objectPosition: "50% 20%"
      }
    ],
    whaleGuide:
      "Happy 23rd birthday, Ulil. Tap the 3D photo deck to flip through all six photos before we move on.",
    whaleDone:
      "You saw every photo. Now let us look at 14 small things that remind me of you."
  },

  // STEP 3: 14 THINGS THAT REMIND ME OF YOU (CLEAN TEXT CARDS, NO OBJECT GRAPHICS)
  things: {
    eyebrow: "THINGS THAT REMIND ME OF YOU",
    subtitle:
      "Tap all 14 items below to read why each one brings you straight to mind.",
    whaleGuide:
      "Tap all 14 items one by one. Once you open all 14, the 3D Wish Jar opens.",
    whaleDone:
      "All 14 opened. Every single one belongs to you. Let us head to the 3D Wish Jar next.",
    items: [
      {
        id: "biru",
        label: "Blue",
        tint: "sky",
        note: "Clear sky, deep sea, or a random blue mug on a shelf. Every shade of blue makes me think of you.",
        whaleSay: "Blue. The calmest colour in the room, and the one that fits you best."
      },
      {
        id: "bawang-putih",
        label: "Garlic",
        tint: "butter",
        note: "One kitchen ingredient that turned into a running joke every time we pick food.",
        whaleSay: "Garlic. Nobody else turns a clove of garlic into a signature memory."
      },
      {
        id: "perpusat-bomba",
        label: "Perpusat & Bomba",
        tint: "mint",
        note: "Two familiar stops tied to long talks, shared laughs, and days worth keeping.",
        whaleSay: "Perpusat and Bomba. Two places packed with stories you will not forget."
      },
      {
        id: "paus",
        label: "Whales",
        tint: "sky",
        note: "Big, steady ocean creatures with a soft presence. That is why a blue whale guides your whole page today.",
        whaleSay: "That one is me. Thanks for liking whales enough to bring me along."
      },
      {
        id: "conan-gray",
        label: "Conan Gray",
        tint: "peach",
        note: "When one of his tracks comes on, the whole afternoon shifts straight into your playlist.",
        whaleSay: "One Conan Gray chorus and the mood turns straight into your soundtrack."
      },
      {
        id: "less-sugar",
        label: "Less sugar",
        tint: "mint",
        note: "Your default drink order. Simple, consistent, and impossible to hear without picturing you at a counter.",
        whaleSay: "Less sugar, every time. Consistent down to the last sip."
      },
      {
        id: "coffee",
        label: "Coffee",
        tint: "peach",
        note: "Your steady companion for busy mornings and slow afternoons.",
        whaleSay: "A fresh cup of coffee to fuel year 23."
      },
      {
        id: "women-lead",
        label: "Women lead",
        tint: "butter",
        note: "You back the people around you with respect and clarity, which makes talking with you refreshing.",
        whaleSay: "Respect and backbone. People notice how you show up for others."
      },
      {
        id: "kaliurang",
        label: "Kaliurang",
        tint: "mint",
        note: "Cool mountain air, tall pines, and slow fog. The exact place to catch your breath when life gets loud.",
        whaleSay: "Kaliurang mist and cold air. The best place to slow down."
      },
      {
        id: "peternakan-pribadi",
        label: "Private farm",
        tint: "mint",
        note: "A quiet dream of green pasture, fresh air, and slow mornings on your own land. I hope you build it one day.",
        whaleSay: "Your own green farm one day. I hope you get to build it."
      },
      {
        id: "martabak-keju",
        label: "Martabak manis keju without sugar",
        tint: "butter",
        note: "Sweet martabak packed with cheese, minus the sugar. Only you order that with total confidence.",
        whaleSay: "Sweet martabak with cheese and zero sugar. One of a kind."
      },
      {
        id: "roti-abon",
        label: "Roti abon Blok M",
        tint: "peach",
        note: "Warm soft bread piled with savory abon. One bite is enough reason to detour through Blok M.",
        whaleSay: "Roti abon Blok M. Warm bread, savory topping, zero regrets."
      },
      {
        id: "sisir-powder",
        label: "Comb & powder",
        tint: "sky",
        note: "Your trusty pocket duo that keeps you neat and camera-ready on short notice.",
        whaleSay: "Comb and powder on standby. Neat before the camera snaps."
      },
      {
        id: "oatmilk",
        label: "Oatmilk",
        tint: "butter",
        note: "The creamy match for your less-sugar coffee. Seeing oatmilk on a cafe menu brings you straight to mind.",
        whaleSay: "Oatmilk. The finishing touch on your coffee order."
      }
    ]
  },

  // STEP 4: 3D SHAKEABLE JAR OF WISHES & HOPES
  jar: {
    eyebrow: "3D JAR OF WISHES & HOPES",
    subtitle: "",
    whaleGuide:
      "Time to play. Shake the 3D glass jar by dragging left and right, tapping it, or pressing the button until all six stars come out.",
    whaleDone:
      "All six stars are out. Now open the final 3D envelope for your main birthday letter.",
    wishes: [
      {
        id: "w1",
        color: "#2E8BC0",
        pastel: "#DFF2FC",
        tag: "Wish 01 · Health & Rest",
        title: "Good health and real sleep",
        body: "At 23, I hope your body stays strong, your nights bring deep sleep, and your head gets room to breathe on packed weeks.",
        whaleSay: "First star out. Good health and rest come first."
      },
      {
        id: "w2",
        color: "#D96B27",
        pastel: "#FDECE0",
        tag: "Wish 02 · Work & Growth",
        title: "Steady wins from your hard work",
        body: "I hope the projects you put effort into pay off on time, without burning away the joy of building them.",
        whaleSay: "Shake again. Your steady effort deserves real rewards."
      },
      {
        id: "w3",
        color: "#357330",
        pastel: "#E2F5E5",
        tag: "Wish 03 · Good People",
        title: "Kind and honest company",
        body: "Wherever you live or work this year, I hope you meet people who listen, back you up, and match your kindness.",
        whaleSay: "Third star out. Good people make every city feel lighter."
      },
      {
        id: "w4",
        color: "#1B6B93",
        pastel: "#E1F4F8",
        tag: "Wish 04 · Everyday Joys",
        title: "Small wins in ordinary weeks",
        body: "An oatmilk less-sugar coffee, warm martabak manis keju, a good song on your ride home, or a clear blue afternoon. I hope you keep finding those.",
        whaleSay: "Halfway done. Ordinary days count just as much as big ones."
      },
      {
        id: "w5",
        color: "#C47D18",
        pastel: "#FEF4DC",
        tag: "Wish 05 · Big Dreams",
        title: "Closer to the life you picture",
        body: "Step by step toward the slower, greener life you imagine, including that private farm on your own piece of land.",
        whaleSay: "One star left inside the jar. Give it one more good shake."
      },
      {
        id: "w6",
        color: "#2F6E62",
        pastel: "#DFF5EF",
        tag: "Wish 06 · Self-Credit",
        title: "Pride in how far you came",
        body: "I hope you look at yourself at 23 and give yourself full credit for everything you handled to reach today.",
        whaleSay: "Six out of six. Your main birthday letter is ready to open."
      }
    ]
  },

  // STEP 5: MAIN 23RD BIRTHDAY LETTER + FINAL PAGE SOUNDTRACK
  letter: {
    eyebrow: "MAIN BIRTHDAY LETTER · 23",
    envelopeHint: "Tap the 3D envelope or press the button below to break the blue seal and read your letter with music.",
    whaleSealed:
      "Last stop. Tap the 3D envelope to open your main 23rd birthday letter and start the final song.",
    whaleOpened:
      "Happy 23rd birthday once more, Kak Ulil Azmi. Enjoy Hannah Montana while you read.",
    soundtrack: {
      title: "Hannah Montana",
      artist: "Rex Orange County",
      youtubeId: "xzMAqu2-k6A",
      youtubeUrl: "https://www.youtube.com/watch?v=xzMAqu2-k6A",
      // Optional offline MP3: put file at assets/audio/hannah-montana.mp3 and set useLocalAudio: true
      useLocalAudio: false,
      localAudioSrc: "assets/audio/hannah-montana.mp3"
    },
    dateLine: "For Kak Ulil Azmi · On Turning 23",
    salutation: "Dear Kak Ulil Azmi,",
    paragraphs: [
      "Happy 23rd birthday, Kak Ulil Azmi. Twenty-three years of living, holding on, and growing into the steady, grounded person you are today is worth celebrating. Reaching this point takes real grit. Your progress, your resilience, and the person you have built yourself into are things to be proud of.",
      "Twenty-three years brings plenty of steep turns that nobody else gets to see up close. There were tired days, uncertain stretches, and heavy decisions you carried on your own without making a fuss. Getting through all of that while staying calm and composed says a lot about your strength. Even when life has been bumpy, you kept moving forward at your own pace.",
      "One of the best things about you is the composure you bring into any room. You listen with real attention, treat people with real respect, and hold firm to clear principles. Your dry humor softens tense afternoons, and your steady attitude makes hard days feel manageable. Carrying that kind of character at twenty-three is rare.",
      "On your birthday, take a moment to give yourself full credit. Credit for every unfamiliar place you figured out on your own, every new skill you worked hard to learn, and every responsibility you saw through to the end. On the days self-doubt gets loud, remember how capable, thoughtful, and resourceful you have already proven yourself to be.",
      "As you step into twenty-three, may the world meet you with more ease. You do not have to be strong every single day. You do not have to carry every expectation, solve every problem on the spot, or stay on high alert all the time. Rest counts as progress too, and you have earned days where you can switch off, sleep well, and enjoy the afternoon.",
      "May the work and effort you have been putting in find their way back to you as real, lasting wins this year. Wishing you solid health, steady growth, clear opportunities, fair and supportive surroundings, and plenty of calm afternoons ahead. Happy 23rd birthday, Kak Ulil Azmi. Here is to everything you have built so far and everything still ahead of you."
    ],
    closing: "Happy 23rd birthday, Kak Ulil Azmi.",
    signature: "Wishing you a calm, strong, and bright year 23"
  }
};
