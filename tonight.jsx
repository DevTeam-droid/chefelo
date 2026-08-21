import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChefHat, Flame, Clock, Utensils, Check, RotateCcw, Pin, Play, Pause, SkipForward, SkipBack } from "lucide-react";

// ---------- Data ----------
const MEALS = [
  { id: "m1", name: "Garlic butter chicken thighs", reason: "Ten minutes of hands-on time, then the oven does the rest.", effort: "10", pantry: ["chicken"], diet: ["dairy-free", "kid-friendly"], allergies: ["dairy"], health: ["diabetic-friendly"], image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80" },
  { id: "m2", name: "Sheet-pan chicken & veg", reason: "One pan, one wash-up, done.", effort: "30", pantry: ["chicken", "veg"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: ["diabetic-friendly", "low-sodium"], image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=600&q=80" },
  { id: "m3", name: "Chicken quesadillas", reason: "Kids eat it, you won't complain either.", effort: "10", pantry: ["chicken", "leftovers"], diet: ["kid-friendly"], allergies: ["dairy", "gluten"], health: [], image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80" },
  { id: "m4", name: "Cacio e pepe", reason: "Three ingredients, restaurant results.", effort: "10", pantry: ["pasta"], diet: ["vegetarian"], allergies: ["dairy", "gluten"], health: [], image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80" },
  { id: "m5", name: "Pasta with whatever's in the fridge", reason: "Built for exactly this moment.", effort: "10", pantry: ["pasta", "leftovers", "veg"], diet: ["vegetarian"], allergies: ["gluten"], health: [], image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },
  { id: "m6", name: "Baked ziti", reason: "Worth the wait, freezes well too.", effort: "cook", pantry: ["pasta"], diet: ["vegetarian", "kid-friendly"], allergies: ["dairy", "gluten"], health: [], image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80" },
  { id: "m7", name: "Stir-fried veg & rice", reason: "Whatever's wilting in the crisper, this'll use it.", effort: "10", pantry: ["veg", "leftovers"], diet: ["vegetarian", "dairy-free"], allergies: [], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m8", name: "Roasted veg grain bowl", reason: "Toss it in the oven, forget about it for 25.", effort: "30", pantry: ["veg"], diet: ["vegetarian", "dairy-free"], allergies: [], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" },
  { id: "m9", name: "Fridge-clearout fried rice", reason: "Exactly what leftover rice was waiting for.", effort: "10", pantry: ["leftovers", "veg"], diet: ["dairy-free"], allergies: ["eggs"], health: [], image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80" },
  { id: "m10", name: "Reinvented leftovers soup", reason: "Stock, whatever's left, twenty minutes.", effort: "10", pantry: ["leftovers"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
  { id: "m11", name: "Toast, eggs, whatever you've got", reason: "Nothing in the house? This always works.", effort: "10", pantry: ["empty"], diet: ["vegetarian", "kid-friendly"], allergies: ["gluten", "eggs"], health: [], image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80" },
  { id: "m12", name: "Beans on toast, upgraded", reason: "Pantry staples, five minutes, unreasonably good.", effort: "10", pantry: ["empty"], diet: ["vegetarian"], allergies: ["gluten"], health: [], image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80" },
  { id: "m13", name: "Instant ramen, doctored up", reason: "An egg and some chili oil changes everything.", effort: "10", pantry: ["empty"], diet: ["kid-friendly"], allergies: ["gluten", "eggs"], health: [], image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80" },
  { id: "m14", name: "Braised chicken thighs", reason: "Low effort now, big payoff at the table.", effort: "cook", pantry: ["chicken"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80" },
  { id: "m15", name: "Roast chicken, the whole bird", reason: "Sunday energy, leftovers for two more nights.", effort: "cook", pantry: ["chicken"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: ["diabetic-friendly"], image: "https://images.unsplash.com/photo-1598103442097-8b743e2b90ce?auto=format&fit=crop&w=600&q=80" },
  { id: "m16", name: "Chickpea curry", reason: "Freezer-friendly, better the next day.", effort: "30", pantry: ["veg", "empty"], diet: ["vegetarian", "dairy-free"], allergies: [], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" },
  { id: "m17", name: "Veggie fried noodles", reason: "Whatever vegetables need using, this'll take them.", effort: "10", pantry: ["pasta", "veg"], diet: ["vegetarian", "dairy-free"], allergies: ["gluten"], health: [], image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80" },
  { id: "m18", name: "Slow-simmered bolognese", reason: "Start it, walk away, thank yourself later.", effort: "cook", pantry: ["pasta"], diet: ["dairy-free"], allergies: ["gluten"], health: [], image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80" },
  { id: "m19", name: "Grilled cheese & tomato soup", reason: "The one that always feels like it's helping.", effort: "10", pantry: ["empty"], diet: ["vegetarian", "kid-friendly"], allergies: ["dairy", "gluten"], health: [], image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80" },
  { id: "m20", name: "Chicken & veg soup", reason: "Uses up the odds and ends, tastes like effort.", effort: "30", pantry: ["chicken", "veg", "leftovers"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: ["low-sodium", "diabetic-friendly"], image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80" },
  { id: "m21", name: "Beef & broccoli stir-fry", reason: "Quick sear, crisp broccoli, rich brown sauce.", effort: "10", pantry: ["beef", "veg"], diet: ["dairy-free"], allergies: ["gluten"], health: ["diabetic-friendly"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m22", name: "Pan-seared garlic salmon", reason: "Healthy fats, crispy skin, restaurant style in 10.", effort: "10", pantry: ["seafood"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly", "low-sodium"], image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80" },
  { id: "m23", name: "Garlic butter shrimp", reason: "Five ingredients, sweet shrimp in a rich garlicky sauce.", effort: "10", pantry: ["seafood"], diet: ["kid-friendly"], allergies: ["dairy"], health: [], image: "https://images.unsplash.com/photo-1559742811-82410b49c405?auto=format&fit=crop&w=600&q=80" },
  { id: "m24", name: "Pan-roasted pork chops", reason: "Thick, juicy chops seared with garlic and rosemary.", effort: "30", pantry: ["pork"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], image: "https://images.unsplash.com/photo-1432139548911-59b9dae9115f?auto=format&fit=crop&w=600&q=80" },
  { id: "m25", name: "Quick beef tacos", reason: "Warm tortillas, seasoned beef, and fresh toppings.", effort: "10", pantry: ["beef"], diet: ["kid-friendly"], allergies: ["gluten"], health: [], image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80" },
  { id: "m26", name: "Savory lentil stew", reason: "Warm, earthy lentils packed with vegetables and flavor.", effort: "30", pantry: ["staples", "veg"], diet: ["vegetarian", "dairy-free"], allergies: [], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
];

const RECIPES = {
  m1: { time: "25 min", ingredients: ["4 chicken thighs", "3 garlic cloves, minced", "2 tbsp butter", "Salt & pepper"], steps: ["Season thighs with salt and pepper.", "Sear skin-side down in a hot pan, 6–7 min, until golden.", "Flip, add butter and garlic, spoon over for 2 min.", "Move to 400°F oven for 12–15 min until cooked through."], durations: [120, 420, 120, 900] },
  m2: { time: "35 min", ingredients: ["2 chicken breasts, cubed", "2 cups mixed veg, chopped", "2 tbsp olive oil", "Salt, pepper, paprika"], steps: ["Heat oven to 425°F.", "Toss chicken and veg with oil and spices on one sheet pan.", "Spread in a single layer, don't crowd it.", "Roast 20–25 min, flipping once, until chicken hits 165°F."], durations: [120, 180, 60, 1320] },
  m3: { time: "15 min", ingredients: ["1½ cups cooked chicken, shredded", "4 tortillas", "1 cup shredded cheese", "Butter for the pan"], steps: ["Layer chicken and cheese between two tortillas.", "Butter the pan, cook quesadilla 3 min per side until golden.", "Repeat for remaining tortillas.", "Cut into wedges and serve."], durations: [120, 180, 180, 60] },
  m4: { time: "15 min", ingredients: ["200g spaghetti", "1 cup pecorino, finely grated", "1½ tsp cracked black pepper", "Reserved pasta water"], steps: ["Boil pasta until just shy of al dente.", "Toast black pepper in a dry pan 30 sec.", "Off heat, add a splash of pasta water, then cheese, tossing fast to form a sauce.", "Add drained pasta, toss to coat, loosen with more pasta water if needed."], durations: [480, 30, 120, 180] },
  m5: { time: "20 min", ingredients: ["200g any short pasta", "2 cups whatever's in the fridge (veg, leftover protein)", "2 tbsp olive oil", "Garlic, salt, pepper"], steps: ["Boil pasta per package instructions.", "Sauté garlic and anything from the fridge in olive oil until warmed through.", "Add drained pasta straight into the pan.", "Toss together with a splash of pasta water, season, serve."], durations: [600, 300, 60, 120] },
  m6: { time: "50 min", ingredients: ["300g penne or ziti", "2 cups marinara", "1½ cups ricotta", "1½ cups shredded mozzarella"], steps: ["Boil pasta 2 min under package time.", "Mix pasta with marinara and ricotta in a baking dish.", "Top with mozzarella.", "Bake at 375°F for 25 min until bubbling and golden."], durations: [480, 240, 60, 1500] },
  m7: { time: "20 min", ingredients: ["2 cups mixed veg, sliced", "2 cups cooked rice", "2 tbsp soy sauce", "1 tbsp oil, garlic, ginger"], steps: ["Heat oil in a wok or wide pan until shimmering.", "Stir-fry harder veg (carrot, broccoli) first, 3–4 min.", "Add softer veg, garlic and ginger, cook 2 min more.", "Add rice and soy sauce, toss until heated through."], durations: [180, 240, 120, 180] },
  m8: { time: "35 min", ingredients: ["4 cups mixed veg, chopped", "1½ cups cooked grain (rice, farro, quinoa)", "3 tbsp olive oil", "Lemon, salt, pepper"], steps: ["Heat oven to 425°F.", "Toss veg in oil, salt and pepper, spread on a tray.", "Roast 20–25 min until edges char slightly.", "Serve over the grain with a squeeze of lemon."], durations: [120, 180, 1320, 60] },
  m9: { time: "15 min", ingredients: ["2½ cups cold cooked rice", "2 eggs", "1 cup chopped veg", "2 tbsp soy sauce, 1 tbsp oil"], steps: ["Scramble eggs in a hot oiled pan, set aside.", "Add more oil, stir-fry veg 2–3 min.", "Add cold rice, breaking up clumps, fry 3–4 min.", "Return eggs, add soy sauce, toss and serve."], durations: [120, 180, 240, 120] },
  m10: { time: "20 min", ingredients: ["3 cups stock", "2 cups leftover protein and veg", "1 cup pasta or rice (optional)", "Salt, pepper, herbs"], steps: ["Bring stock to a simmer.", "Add pasta or rice if using, cook per package time.", "Stir in leftover protein and veg, warm through 5 min.", "Season to taste and serve."], durations: [120, 480, 300, 60] },
  m11: { time: "10 min", ingredients: ["2–3 eggs", "2 slices bread", "Butter", "Salt & pepper"], steps: ["Toast the bread.", "Melt butter in a pan, cook eggs your favorite way.", "Season with salt and pepper.", "Plate eggs on or beside the toast."], durations: [180, 180, 60, 60] },
  m12: { time: "10 min", ingredients: ["1 can white beans", "2 slices bread", "2 tbsp olive oil, garlic", "Chili flakes, parmesan if you have it"], steps: ["Warm beans with olive oil and garlic in a small pan.", "Mash roughly with a fork for texture.", "Toast the bread.", "Spoon beans over toast, top with chili flakes and parmesan."], durations: [300, 60, 120, 60] },
  m13: { time: "10 min", ingredients: ["1 pack instant ramen", "1 egg", "Chili oil or hot sauce", "Scallion if you have it"], steps: ["Cook noodles per package instructions.", "Crack egg into the pot in the last minute to poach softly.", "Add half the seasoning packet to taste.", "Top with chili oil and scallion."], durations: [180, 60, 60, 60] },
  m14: { time: "45 min", ingredients: ["4 chicken thighs", "1 onion, sliced", "1½ cups stock", "2 tbsp tomato paste"], steps: ["Sear thighs skin-side down until browned, set aside.", "Soften onion in the same pan.", "Stir in tomato paste, then stock, scraping up the browned bits.", "Return chicken, cover, simmer 30 min until tender."], durations: [300, 180, 180, 1800] },
  m15: { time: "1 hr 20 min", ingredients: ["1 whole chicken", "2 tbsp butter, softened", "Salt, pepper", "1 lemon, halved"], steps: ["Heat oven to 425°F. Pat chicken dry.", "Rub all over with butter, salt and pepper, stuff lemon inside.", "Roast 20 min, then reduce to 375°F.", "Continue roasting ~50 min until juices run clear, rest 10 min before carving."], durations: [600, 300, 1200, 3000] },
  m16: { time: "30 min", ingredients: ["2 cans chickpeas", "1 can coconut milk", "2 tbsp curry paste", "1 onion, garlic, ginger"], steps: ["Sauté onion, garlic and ginger until soft.", "Stir in curry paste, cook 1 min until fragrant.", "Add chickpeas and coconut milk, simmer 15 min.", "Season to taste, serve over rice."], durations: [300, 60, 900, 60] },
  m17: { time: "20 min", ingredients: ["200g noodles", "2 cups sliced veg", "2 tbsp soy sauce", "1 tbsp oil, garlic"], steps: ["Cook noodles per package instructions, drain.", "Stir-fry garlic and veg in hot oil 3–4 min.", "Add noodles and soy sauce to the pan.", "Toss everything together over high heat 2 min, serve."], durations: [480, 240, 60, 120] },
  m18: { time: "2 hr", ingredients: ["500g ground beef", "1 can crushed tomatoes", "1 onion, carrot, celery, diced", "300g spaghetti"], steps: ["Brown beef, breaking it up, then set aside.", "Soften onion, carrot and celery in the same pot.", "Return beef, add tomatoes, simmer uncovered 1.5–2 hrs, stirring occasionally.", "Cook pasta, toss with sauce, serve."], durations: [300, 240, 5400, 120] },
  m19: { time: "20 min", ingredients: ["4 slices bread", "2 slices cheese", "Butter", "1 can tomato soup"], steps: ["Butter the outside of the bread slices.", "Build sandwiches with cheese, grill in a pan until golden both sides.", "Meanwhile, heat the tomato soup.", "Serve sandwiches alongside the soup for dipping."], durations: [120, 360, 300, 60] },
  m20: { time: "35 min", ingredients: ["2 cups cooked chicken, shredded", "3 cups stock", "2 cups mixed veg, chopped", "Salt, pepper, herbs"], steps: ["Bring stock to a simmer with chopped veg.", "Cook 10–12 min until veg is tender.", "Stir in shredded chicken, warm through.", "Season to taste and serve."], durations: [600, 720, 120, 60] },
  m21: { time: "15 min", ingredients: ["300g flank steak, sliced", "2 cups broccoli florets", "3 tbsp soy sauce", "1 tbsp cornstarch", "2 garlic cloves, minced"], steps: ["Toss sliced beef with cornstarch and a splash of soy sauce.", "Stir-fry beef in a very hot pan for 3 minutes until browned, then set aside.", "Sauté broccoli and garlic with a splash of water for 3 minutes until tender-crisp.", "Return beef to the pan, add remaining soy sauce, and toss for 1 minute until sauce thickens."], durations: [120, 180, 180, 60] },
  m22: { time: "15 min", ingredients: ["2 salmon fillets", "1 tbsp olive oil", "2 tbsp lemon juice", "Salt & pepper"], steps: ["Pat salmon skin dry and season both sides with salt and pepper.", "Heat olive oil in a pan over medium-high heat.", "Sear salmon skin-side down for 5 minutes until crispy.", "Flip and cook for 3-4 minutes more, finishing with lemon juice."], durations: [120, 60, 300, 240] },
  m23: { time: "12 min", ingredients: ["250g shrimp, peeled & deveined", "2 tbsp butter", "3 garlic cloves, minced", "Lemon juice", "Parsley"], steps: ["Melt butter in a skillet over medium heat.", "Add garlic and sauté for 1 minute until fragrant.", "Add shrimp and cook for 2-3 minutes per side until pink.", "Squeeze lemon juice and sprinkle fresh parsley before serving."], durations: [60, 60, 180, 60] },
  m24: { time: "25 min", ingredients: ["2 thick pork chops", "1 tbsp olive oil", "2 garlic cloves, crushed", "1 sprig rosemary", "Salt & pepper"], steps: ["Season pork chops generously with salt and pepper.", "Sear chops in a hot skillet with olive oil for 4 minutes per side.", "Add garlic, rosemary, and a pat of butter if desired; spoon over chops for 2 minutes.", "Reduce heat and cook for 8-10 minutes, flipping once, until cooked through."], durations: [120, 480, 120, 540] },
  m25: { time: "15 min", ingredients: ["300g ground beef", "1 tbsp taco seasoning", "8 taco shells", "Shredded lettuce & cheese"], steps: ["Brown ground beef in a skillet over medium-high heat, draining excess fat.", "Stir in taco seasoning and 1/4 cup water; simmer for 5 minutes.", "Warm taco shells in the oven or microwave.", "Assemble tacos with beef, lettuce, cheese, and your favorite salsa."], durations: [300, 300, 120, 180] },
  m26: { time: "35 min", ingredients: ["1 cup brown lentils", "1 onion, diced", "2 carrots, sliced", "4 cups vegetable stock", "1 can diced tomatoes"], steps: ["Sauté onion and carrots in a pot with olive oil for 5 minutes.", "Add rinsed lentils, diced tomatoes, and vegetable stock to the pot.", "Bring to a boil, then reduce heat and simmer covered for 25 minutes.", "Season to taste with salt, pepper, and fresh spinach if available."], durations: [300, 120, 1500, 60] }
};

const EFFORT = [
  { id: "10", label: "10 min", icon: Flame },
  { id: "30", label: "30 min", icon: Clock },
  { id: "cook", label: "I'll cook", icon: Utensils },
];

const PANTRY = [
  { id: "chicken", label: "Chicken" },
  { id: "beef", label: "Beef" },
  { id: "pork", label: "Pork" },
  { id: "seafood", label: "Seafood" },
  { id: "pasta", label: "Pasta" },
  { id: "veg", label: "Mostly veg" },
  { id: "staples", label: "Beans & Grains" },
  { id: "leftovers", label: "Leftovers" },
  { id: "empty", label: "Basically nothing" },
];

const DIET = [
  { id: "vegetarian", label: "Veggie" },
  { id: "dairy-free", label: "No dairy" },
  { id: "kid-friendly", label: "Kid-friendly" },
];

const ALLERGIES = [
  { id: "gluten", label: "Gluten-free" },
  { id: "dairy", label: "Dairy-free" },
  { id: "eggs", label: "Egg-free" },
  { id: "nuts", label: "Nut-free" },
];

const HEALTH_CONDITIONS = [
  { id: "diabetic-friendly", label: "Diabetic-friendly" },
  { id: "low-sodium", label: "Low-sodium" },
];

// ---------- Audio Synth ----------
const playBellSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    // Metallic chime chord: D5, A5, D6, F#6
    const freqs = [587.33, 880, 1174.66, 1479.98];
    
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);
      
      // Short metallic strike shape
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(i === 0 ? 0.25 : 0.12, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 1.2);
    });
  } catch (e) {
    console.error("Audio Context error:", e);
  }
};

// ---------- Recipe Outsourcing API ----------
const fetchOutsourcedRecipe = async (filters) => {
  const { effort, pantry, diet, selectedAllergies, selectedHealth, rejectedIds = [] } = filters;

  // Map pantry to category
  let category = "Vegetarian";
  if (pantry === "chicken") category = "Chicken";
  else if (pantry === "beef") category = "Beef";
  else if (pantry === "pork") category = "Pork";
  else if (pantry === "seafood") category = "Seafood";
  else if (pantry === "pasta") category = "Pasta";
  else if (pantry === "veg") category = "Vegetarian";
  else if (pantry === "staples") category = "Side";
  else {
    const cats = ["Chicken", "Beef", "Pork", "Seafood", "Pasta", "Vegetarian", "Side"];
    category = cats[Math.floor(Math.random() * cats.length)];
  }

  try {
    const listRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    if (!listRes.ok) return null;
    const listData = await listRes.json();
    if (!listData.meals || listData.meals.length === 0) return null;

    // Filter out rejected IDs
    const filteredStubs = listData.meals.filter(
      m => !rejectedIds.includes("db_" + m.idMeal)
    );

    // Shuffle stubs
    const shuffledStubs = [...filteredStubs].sort(() => Math.random() - 0.5);

    // Try top 8 candidates
    for (let j = 0; j < Math.min(shuffledStubs.length, 8); j++) {
      const stub = shuffledStubs[j];
      const detailRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${stub.idMeal}`);
      if (!detailRes.ok) continue;
      const detailData = await detailRes.json();
      if (!detailData.meals || detailData.meals.length === 0) continue;

      const meal = detailData.meals[0];
      
      // Parse ingredients
      const rawIngredients = [];
      const normalizedIngredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const meas = meal[`strMeasure${i}`];
        if (ing && ing.trim() !== "") {
          rawIngredients.push(ing.toLowerCase());
          normalizedIngredients.push(`${meas ? meas.trim() + " " : ""}${ing.trim()}`);
        }
      }

      const instructions = meal.strInstructions || "";
      const instructionsLower = instructions.toLowerCase();

      // --- ALLERGY CHECKS ---
      let isAllergic = false;
      if (selectedAllergies.includes("gluten")) {
        const glutenTerms = ["flour", "pasta", "wheat", "bread", "spaghetti", "macaroni", "noodle", "couscous", "semolina", "barley", "rye"];
        if (glutenTerms.some(term => rawIngredients.some(ing => ing.includes(term)) || instructionsLower.includes(term))) {
          isAllergic = true;
        }
      }
      if (selectedAllergies.includes("dairy")) {
        const dairyTerms = ["milk", "butter", "cheese", "ricotta", "cream", "yogurt", "ghee"];
        if (dairyTerms.some(term => rawIngredients.some(ing => ing.includes(term)) || instructionsLower.includes(term))) {
          isAllergic = true;
        }
      }
      if (selectedAllergies.includes("eggs")) {
        const eggTerms = ["egg", "mayo"];
        if (eggTerms.some(term => rawIngredients.some(ing => ing.includes(term)) || instructionsLower.includes(term))) {
          isAllergic = true;
        }
      }
      if (isAllergic) continue;

      // --- DIET CHECKS ---
      let compliesDiet = true;
      if (diet.includes("vegetarian")) {
        const meatTerms = ["chicken", "beef", "pork", "shrimp", "fish", "salmon", "bacon", "meat", "steak", "lamb", "duck", "turkey", "seafood", "veal", "pepperoni", "ham"];
        if (meatTerms.some(term => rawIngredients.some(ing => ing.includes(term)) || instructionsLower.includes(term))) {
          compliesDiet = false;
        }
        if (!["vegetarian", "vegan", "side"].includes(category.toLowerCase())) {
          compliesDiet = false;
        }
      }
      if (diet.includes("dairy-free")) {
        const dairyTerms = ["milk", "butter", "cheese", "ricotta", "cream", "yogurt", "ghee"];
        if (dairyTerms.some(term => rawIngredients.some(ing => ing.includes(term)) || instructionsLower.includes(term))) {
          compliesDiet = false;
        }
      }
      if (diet.includes("kid-friendly")) {
        const spicyTerms = ["chili", "cayenne", "jalapeno", "spicy", "chilli", "sriracha", "habanero"];
        if (spicyTerms.some(term => rawIngredients.some(ing => ing.includes(term)) || instructionsLower.includes(term))) {
          compliesDiet = false;
        }
      }
      if (!compliesDiet) continue;

      // --- HEALTH CHECKS ---
      let compliesHealth = true;
      if (selectedHealth.includes("diabetic-friendly")) {
        const diabeticTerms = ["sugar", "syrup", "honey", "brown sugar", "sweetener"];
        if (diabeticTerms.some(term => rawIngredients.some(ing => ing.includes(term)))) {
          compliesHealth = false;
        }
      }
      if (selectedHealth.includes("low-sodium")) {
        const sodiumTerms = ["soy sauce", "fish sauce", "bouillon", "msg"];
        if (sodiumTerms.some(term => rawIngredients.some(ing => ing.includes(term)))) {
          compliesHealth = false;
        }
      }
      if (!compliesHealth) continue;

      // --- EFFORT ESTIMATION ---
      const steps = instructions
        .split(/\.\s+|\n+/)
        .map(step => step.trim())
        .filter(step => step.length > 5);

      const wordCount = instructions.split(/\s+/).length;
      
      let derivedEffort = "cook";
      if (wordCount < 160 || steps.length < 5) {
        derivedEffort = "10";
      } else if (wordCount < 300 || steps.length < 8) {
        derivedEffort = "30";
      }

      // If user requested 10-min, we strictly require it to be 10-min
      if (effort === "10" && derivedEffort !== "10") continue;
      // If user requested 30-min, it can be 10 or 30-min
      if (effort === "30" && derivedEffort === "cook") continue;

      // Calculate step durations
      const durations = steps.map(step => {
        const match = step.match(/(\d+)\s*(?:-|to)?\s*(\d+)?\s*(?:min|minute)/i);
        if (match) {
          const mins = parseInt(match[2] || match[1], 10);
          return mins * 60;
        }
        return 180; // default 3 mins
      });

      const totalMins = Math.ceil(durations.reduce((sum, d) => sum + d, 0) / 60);
      const timeStr = `${totalMins} min`;

      // Cache recipe details
      const id = "db_" + meal.idMeal;
      RECIPES[id] = {
        time: timeStr,
        ingredients: normalizedIngredients,
        steps: steps,
        durations: durations
      };

      const dietTags = [];
      if (["vegetarian", "vegan"].includes(category.toLowerCase()) || !rawIngredients.some(ing => ["chicken", "beef", "pork", "shrimp", "fish", "salmon", "meat"].some(term => ing.includes(term)))) {
        dietTags.push("vegetarian");
      }
      if (!rawIngredients.some(ing => ["milk", "butter", "cheese", "cream"].some(term => ing.includes(term)))) {
        dietTags.push("dairy-free");
      }
      if (!rawIngredients.some(ing => ["chili", "spicy"].some(term => ing.includes(term)))) {
        dietTags.push("kid-friendly");
      }

      return {
        id: id,
        name: meal.strMeal,
        reason: `Discovered live matching your ${pantry ? pantry : "seasonal"} cravings.`,
        effort: derivedEffort,
        pantry: [pantry || "empty"],
        diet: dietTags,
        image: meal.strMealThumb
      };
    }
  } catch (err) {
    console.error("Outsource fetch failed:", err);
  }
  return null;
};

// ---------- Logic ----------
function getTimeOfDayInfo() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return {
      eyebrow: "MORNING'S DECISION",
      title: "What's for breakfast?",
      mealType: "breakfast",
      revealEyebrow: "THIS MORNING, YOU'RE HAVING"
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      eyebrow: "AFTERNOON'S DECISION",
      title: "What's for lunch?",
      mealType: "lunch",
      revealEyebrow: "THIS AFTERNOON, YOU'RE HAVING"
    };
  } else {
    return {
      eyebrow: "TONIGHT'S DECISION",
      title: "What's for dinner?",
      mealType: "dinner",
      revealEyebrow: "TONIGHT, YOU'RE HAVING"
    };
  }
}

function pickMeal({ effort, pantry, diet, rejectedIds, lastId, selectedAllergies = [], selectedHealth = [] }) {
  const filteredMeals = MEALS.filter(m => {
    if (effort === "10" && m.effort !== "10") {
      return false;
    }
    if (effort === "30" && m.effort !== "10" && m.effort !== "30") {
      return false;
    }
    if (selectedAllergies.some(allergy => m.allergies?.includes(allergy))) {
      return false;
    }
    if (selectedHealth.some(hCond => !m.health?.includes(hCond))) {
      return false;
    }
    return true;
  });

  const mealsToScore = filteredMeals.length > 0 ? filteredMeals : MEALS.filter(m => !selectedAllergies.some(allergy => m.allergies?.includes(allergy)));
  const finalMeals = mealsToScore.length > 0 ? mealsToScore : MEALS;

  const score = (m) => {
    let s = 0;
    if (effort && m.effort === effort) s += 3;
    if (pantry && m.pantry.includes(pantry)) s += 3;
    diet.forEach((d) => { if (m.diet.includes(d)) s += 2; });
    if (diet.some((d) => !m.diet.includes(d))) s -= 5;
    if (m.id === lastId) s -= 10;
    if (rejectedIds.includes(m.id)) s -= 8;
    return s;
  };
  const scored = finalMeals.map((m) => ({ m, s: score(m) })).sort((a, b) => b.s - a.s);
  const top = scored.filter((x) => x.s >= scored[0].s - 1);
  return top[Math.floor(Math.random() * top.length)].m;
}

// ---------- Component ----------
export default function TonightApp() {
  const [stage, setStage] = useState("health"); // health | ask | reveal
  const [effort, setEffort] = useState(null);
  const [pantry, setPantry] = useState(null);
  const [diet, setDiet] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [current, setCurrent] = useState(null);
  const [rejectCount, setRejectCount] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedHealth, setSelectedHealth] = useState([]);
  const [isCooking, setIsCooking] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRinging, setIsRinging] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ringInterval = null;
    if (isRinging) {
      playBellSound();
      ringInterval = setInterval(() => {
        playBellSound();
      }, 1500);
    }
    return () => {
      if (ringInterval) clearInterval(ringInterval);
    };
  }, [isRinging]);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      setIsRinging(true);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const toggleDiet = (id) =>
    setDiet((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  const toggleAllergy = (id) =>
    setSelectedAllergies((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const toggleHealth = (id) =>
    setSelectedHealth((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]));

  const decide = async () => {
    setIsFetching(true);
    let meal = null;
    try {
      meal = await fetchOutsourcedRecipe({
        effort,
        pantry,
        diet,
        selectedAllergies,
        selectedHealth,
        rejectedIds: [...rejected, ...(current ? [current.id] : [])]
      });
    } catch (err) {
      console.error("decide outsource error:", err);
    }

    if (!meal) {
      meal = pickMeal({ effort, pantry, diet, rejectedIds: rejected, lastId: current?.id, selectedAllergies, selectedHealth });
    }

    setCurrent(meal);
    setStage("reveal");
    setFlip(false);
    setShowRecipe(false);
    setIsFetching(false);
    requestAnimationFrame(() => setFlip(true));
  };

  const notThis = () => {
    if (rejectCount >= 1) {
      // force acceptance path after one reroll — no infinite scrolling
      setRejectCount(0);
      setRejected([]);
      decide();
      return;
    }
    setRejected((r) => [...r, current.id]);
    setRejectCount((c) => c + 1);
    setShowRecipe(false);
    decide();
  };

  const startOver = () => {
    setStage("health");
    setCurrent(null);
    setRejected([]);
    setRejectCount(0);
    setIsCooking(false);
    setCurrentStepIndex(0);
    setTimeLeft(0);
    setIsTimerActive(false);
    setIsRinging(false);
  };

  const startCooking = () => {
    if (!current || !RECIPES[current.id]) return;
    setIsCooking(true);
    setCurrentStepIndex(0);
    const duration = RECIPES[current.id].durations?.[0] || 300;
    setTimeLeft(duration);
    setIsTimerActive(true);
    setIsRinging(false);
  };

  const nextStep = () => {
    if (!current || !RECIPES[current.id]) return;
    setIsRinging(false);
    const steps = RECIPES[current.id].steps;
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      const duration = RECIPES[current.id].durations?.[nextIdx] || 300;
      setTimeLeft(duration);
      setIsTimerActive(true);
    } else {
      setIsCooking(false);
      setStage("done");
    }
  };

  const prevStep = () => {
    if (!current || !RECIPES[current.id]) return;
    setIsRinging(false);
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      const duration = RECIPES[current.id].durations?.[prevIdx] || 300;
      setTimeLeft(duration);
      setIsTimerActive(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const timeInfo = getTimeOfDayInfo();

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
        .tn-root { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        .tn-mono { font-family: 'IBM Plex Mono', monospace; }
        .tn-chip {
          transition: transform .15s ease, background .15s ease, border-color .15s ease;
        }
        .tn-chip:active { transform: scale(0.96); }
        .tn-btn-primary { transition: transform .12s ease, box-shadow .12s ease; }
        .tn-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(208,95,13,0.35); }
        .tn-btn-primary:active { transform: translateY(0); }
        .tn-card-enter {
          animation: tnCardIn .4s cubic-bezier(.25, 1, .5, 1) both;
        }
        @keyframes tnCardIn {
          0% { opacity: 0; transform: translateY(12px) scale(.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .tn-pin {
          filter: drop-shadow(0 3px 4px rgba(0,0,0,0.35));
        }
        @media (prefers-reduced-motion: reduce) {
          .tn-card-enter, .tn-btn-primary, .tn-chip { animation: none !important; transition: none !important; }
        }
        .tn-focus:focus-visible {
          outline: 2px solid #0BE49B;
          outline-offset: 3px;
        }
        @keyframes tnAlarmPulse {
          0% { border-color: rgba(208, 95, 13, 0.4); box-shadow: 0 0 10px rgba(208, 95, 13, 0.2); }
          100% { border-color: rgba(208, 95, 13, 1); box-shadow: 0 0 25px rgba(208, 95, 13, 0.6); }
        }
        .tn-timer-alarm {
          animation: tnAlarmPulse 1s infinite alternate;
        }
        @keyframes tnFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .tn-float {
          animation: tnFloat 3s ease-in-out infinite;
        }
        @keyframes tnLoadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .tn-loading-bar-fill {
          animation: tnLoadingBar 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes tnPulseHat {
          0% { transform: scale(1); filter: drop-shadow(0 2px 4px rgba(4,81,55,0.08)); }
          50% { transform: scale(1.06); filter: drop-shadow(0 6px 14px rgba(4,81,55,0.18)); }
          100% { transform: scale(1); filter: drop-shadow(0 2px 4px rgba(4,81,55,0.08)); }
        }
        .tn-pulse-hat {
          animation: tnPulseHat 1.8s infinite ease-in-out;
        }
      `}</style>

      {isLoading ? (
        <div style={styles.loaderPage} className="tn-card-enter">
          <div style={styles.loaderContent} className="tn-float">
            <div style={styles.loaderAvatar}>
              <svg viewBox="0 0 100 100" style={styles.botSvg}>
                {/* White Chef Hat */}
                <path d="M30 32 C30 15, 70 15, 70 32 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
                <circle cx="40" cy="20" r="10" fill="#FFFFFF" />
                <circle cx="50" cy="15" r="12" fill="#FFFFFF" />
                <circle cx="60" cy="20" r="10" fill="#FFFFFF" />
                <rect x="33" y="28" width="34" height="8" rx="2" fill="#E2E8F0" />
                
                {/* Body & Jacket */}
                <rect x="46" y="65" width="8" height="10" fill="#CEE9DF" rx="2" />
                <path d="M 25 95 L 75 95 L 68 70 L 32 70 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
                <circle cx="46" cy="78" r="1.5" fill="#94A3B8" />
                <circle cx="46" cy="85" r="1.5" fill="#94A3B8" />
                <circle cx="54" cy="78" r="1.5" fill="#94A3B8" />
                <circle cx="54" cy="85" r="1.5" fill="#94A3B8" />
                <path d="M 45 70 L 50 82 L 55 70 Z" fill="#D05F0D" />
                
                {/* Head */}
                <rect x="32" y="38" width="36" height="28" rx="10" fill="#CEE9DF" stroke="#045137" strokeWidth="1" />
                <rect x="28" y="47" width="4" height="10" rx="1" fill="#045137" />
                <rect x="68" y="47" width="4" height="10" rx="1" fill="#045137" />
                <rect x="37" y="43" width="26" height="18" rx="5" fill="#23322D" />
                
                {/* Eyes */}
                <path d="M 41 50 Q 45 46 49 50" fill="none" stroke="#0BE49B" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 51 50 Q 55 46 59 50" fill="none" stroke="#0BE49B" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Mouth */}
                <path d="M 46 56 Q 50 60 54 56" fill="none" stroke="#0BE49B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 style={styles.loaderTitle}>Hi, I'm Elo, your Chef!</h2>
            <div style={styles.loaderBarBg}>
              <div style={styles.loaderBarFill} className="tn-loading-bar-fill" />
            </div>
          </div>
        </div>
      ) : isFetching ? (
        <div style={styles.loaderPage} className="tn-card-enter">
          <div style={styles.loaderContent} className="tn-float">
            <div style={styles.loaderAvatar} className="tn-pulse-hat">
              <svg viewBox="0 0 100 100" style={styles.botSvg}>
                {/* White Chef Hat */}
                <path d="M30 32 C30 15, 70 15, 70 32 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
                <circle cx="40" cy="20" r="10" fill="#FFFFFF" />
                <circle cx="50" cy="15" r="12" fill="#FFFFFF" />
                <circle cx="60" cy="20" r="10" fill="#FFFFFF" />
                <rect x="33" y="28" width="34" height="8" rx="2" fill="#E2E8F0" />
                
                {/* Body & Jacket */}
                <rect x="46" y="65" width="8" height="10" fill="#CEE9DF" rx="2" />
                <path d="M 25 95 L 75 95 L 68 70 L 32 70 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
                <circle cx="46" cy="78" r="1.5" fill="#94A3B8" />
                <circle cx="46" cy="85" r="1.5" fill="#94A3B8" />
                <circle cx="54" cy="78" r="1.5" fill="#94A3B8" />
                <circle cx="54" cy="85" r="1.5" fill="#94A3B8" />
                <path d="M 45 70 L 50 82 L 55 70 Z" fill="#D05F0D" />
                
                {/* Head */}
                <rect x="32" y="38" width="36" height="28" rx="10" fill="#CEE9DF" stroke="#045137" strokeWidth="1" />
                <rect x="28" y="47" width="4" height="10" rx="1" fill="#045137" />
                <rect x="68" y="47" width="4" height="10" rx="1" fill="#045137" />
                <rect x="37" y="43" width="26" height="18" rx="5" fill="#23322D" />
                
                {/* Eyes (Glowing LEDs) */}
                <circle cx="45" cy="51" r="2.5" fill="#0BE49B" />
                <circle cx="55" cy="51" r="2.5" fill="#0BE49B" />
                
                {/* Mouth */}
                <path d="M 46 56 Q 50 60 54 56" fill="none" stroke="#0BE49B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 style={styles.loaderTitle}>Elo is scouting the web...</h2>
            <p style={{ color: "#B8AF9A", fontSize: 14, fontFamily: "'Poppins', sans-serif", margin: "-8px 0 10px", textAlign: "center" }}>
              Finding the perfect recipe matching your pantry and filters.
            </p>
            <div style={styles.loaderBarBg}>
              <div style={{ ...styles.loaderBarFill, width: "100%", animation: "tnLoadingBar 3.5s infinite linear" }} className="" />
            </div>
          </div>
        </div>
      ) : (
        <div className="tn-root" style={styles.wrap}>
          {!isCooking && (
            <header style={styles.header}>
              <div className="tn-mono" style={styles.eyebrow}>
                <ChefHat size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                {timeInfo.eyebrow}
              </div>
              <h1 style={styles.h1}>{timeInfo.title}</h1>
            </header>
          )}

          {isCooking && current && RECIPES[current.id] ? (
            <div style={styles.cookingPanel} className="tn-card-enter">
              {/* Chef Bot Header Card */}
              <div style={styles.botCard}>
                <div style={styles.botAvatarContainer}>
                  <svg viewBox="0 0 100 100" style={styles.botSvg}>
                    {/* White Chef Hat */}
                    <path d="M30 32 C30 15, 70 15, 70 32 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
                    <circle cx="40" cy="20" r="10" fill="#FFFFFF" />
                    <circle cx="50" cy="15" r="12" fill="#FFFFFF" />
                    <circle cx="60" cy="20" r="10" fill="#FFFFFF" />
                    <rect x="33" y="28" width="34" height="8" rx="2" fill="#E2E8F0" />
                    
                    {/* Body & Jacket */}
                    <rect x="46" y="65" width="8" height="10" fill="#CEE9DF" rx="2" />
                    <path d="M 25 95 L 75 95 L 68 70 L 32 70 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
                    <circle cx="46" cy="78" r="1.5" fill="#94A3B8" />
                    <circle cx="46" cy="85" r="1.5" fill="#94A3B8" />
                    <circle cx="54" cy="78" r="1.5" fill="#94A3B8" />
                    <circle cx="54" cy="85" r="1.5" fill="#94A3B8" />
                    <path d="M 45 70 L 50 82 L 55 70 Z" fill="#D05F0D" />
                    
                    {/* Head */}
                    <rect x="32" y="38" width="36" height="28" rx="10" fill="#CEE9DF" stroke="#045137" strokeWidth="1" />
                    <rect x="28" y="47" width="4" height="10" rx="1" fill="#045137" />
                    <rect x="68" y="47" width="4" height="10" rx="1" fill="#045137" />
                    <rect x="37" y="43" width="26" height="18" rx="5" fill="#23322D" />
                    
                    {/* Eyes */}
                    <path d="M 41 50 Q 45 46 49 50" fill="none" stroke="#0BE49B" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 51 50 Q 55 46 59 50" fill="none" stroke="#0BE49B" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Mouth */}
                    <path d="M 46 56 Q 50 60 54 56" fill="none" stroke="#0BE49B" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={styles.speechBubble}>
                  <div className="tn-mono" style={styles.speechTitle}>CHEF BOT SAYS:</div>
                  <div style={styles.speechText}>
                    {RECIPES[current.id].steps[currentStepIndex]}
                  </div>
                </div>
              </div>

              {/* Timer and Controls */}
              <div 
                style={styles.timerBox} 
                className={timeLeft === 0 ? "tn-timer-alarm" : ""}
              >
                <div className="tn-mono" style={styles.stepIndicator}>
                  STEP {currentStepIndex + 1} OF {RECIPES[current.id].steps.length}
                </div>
                <div style={styles.timerDisplay}>
                  {formatTime(timeLeft)}
                </div>
                
                {/* Progress Bar */}
                <div style={styles.progressBarBg}>
                  <div style={{
                    ...styles.progressBarFill,
                    width: `${(timeLeft / (RECIPES[current.id].durations?.[currentStepIndex] || 300)) * 100}%`
                  }} />
                </div>

                <div style={styles.timerControls}>
                  <button 
                    className="tn-focus"
                    style={styles.timerControlBtn} 
                    disabled={currentStepIndex === 0} 
                    onClick={prevStep}
                  >
                    <SkipBack size={18} />
                  </button>
                  <button 
                    className="tn-focus"
                    style={{
                      ...styles.timerPlayBtn,
                      ...(isTimerActive ? styles.timerPlayBtnActive : {})
                    }} 
                    onClick={() => setIsTimerActive(!isTimerActive)}
                  >
                    {isTimerActive ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
                  </button>
                  <button 
                    className="tn-focus"
                    style={styles.timerControlBtn} 
                    onClick={() => {
                      const duration = RECIPES[current.id].durations?.[currentStepIndex] || 300;
                      setTimeLeft(duration);
                      setIsTimerActive(true);
                      setIsRinging(false);
                    }}
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button 
                    className="tn-focus"
                    style={styles.timerControlBtn} 
                    onClick={nextStep}
                  >
                    <SkipForward size={18} />
                  </button>
                </div>
              </div>

              {/* Complete or Back actions */}
              <div style={styles.cookingActions}>
                <button className="tn-focus" style={styles.quitBtn} onClick={() => {
                  setIsCooking(false);
                  setIsRinging(false);
                }}>
                  Quit cooking
                </button>
              </div>
            </div>
          ) : (
            <>
              {stage === "health" && (
                <div style={styles.askPanel} className="tn-card-enter">
                  <Section title="Any allergies?">
                    <ChipRow>
                      {ALLERGIES.map((a) => (
                        <Chip key={a.id} active={selectedAllergies.includes(a.id)} onClick={() => toggleAllergy(a.id)}>
                          {a.label}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <Section title="Health considerations">
                    <ChipRow>
                      {HEALTH_CONDITIONS.map((hc) => (
                        <Chip key={hc.id} active={selectedHealth.includes(hc.id)} onClick={() => toggleHealth(hc.id)}>
                          {hc.label}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <button className="tn-btn-primary tn-focus" style={styles.decideBtn} onClick={() => setStage("ask")}>
                    Continue
                  </button>
                </div>
              )}

              {stage === "ask" && (
                <div style={styles.askPanel}>
                  <Section title="What's around">
                    <ChipRow>
                      {PANTRY.map((p) => (
                        <Chip key={p.id} active={pantry === p.id} onClick={() => setPantry(pantry === p.id ? null : p.id)}>
                          {p.label}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <Section title="How much effort">
                    <ChipRow>
                      {EFFORT.map((e) => (
                        <Chip key={e.id} active={effort === e.id} onClick={() => setEffort(effort === e.id ? null : e.id)}>
                          <e.icon size={13} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                          {e.label}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <Section title="Anything to avoid">
                    <ChipRow>
                      {DIET.map((d) => (
                        <Chip key={d.id} active={diet.includes(d.id)} onClick={() => toggleDiet(d.id)}>
                          {d.label}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <button className="tn-btn-primary tn-focus" style={styles.decideBtn} onClick={decide}>
                    Decide for me
                  </button>
                </div>
              )}

              {stage === "reveal" && current && (
                <div style={styles.revealPanel}>
                  <div style={{ ...styles.cardShell }} className={flip ? "tn-card-enter" : ""}>
                    <Pin size={20} className="tn-pin" style={styles.pinIcon} />
                    <div style={styles.cardPaper}>
                      {current.image && (
                        <img src={current.image} alt={current.name} style={styles.cardImage} />
                      )}
                      <div className="tn-mono" style={styles.cardEyebrow}>{timeInfo.revealEyebrow}</div>
                      <div style={styles.cardName}>{current.name}</div>
                      <div style={styles.cardReason}>{current.reason}</div>
                      <div style={styles.cardTagRow}>
                        {[current.effort === "10" ? "10 min" : current.effort === "30" ? "30 min" : "worth cooking", ...current.diet]
                          .slice(0, 3)
                          .map((t, i) => (
                            <span key={i} className="tn-mono" style={styles.cardTag}>
                              {typeof t === "string" && (t === "vegetarian" ? "veggie" : t === "dairy-free" ? "no dairy" : t === "kid-friendly" ? "kid-friendly" : t)}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div style={styles.actionRow}>
                    <button className="tn-focus" style={styles.rejectBtn} onClick={notThis}>
                      Not this one
                    </button>
                    <button className="tn-focus" style={styles.acceptBtn} onClick={() => setStage("done")}>
                      <Check size={16} style={{ marginRight: 6, verticalAlign: "-3px" }} />
                      Doing this
                    </button>
                  </div>
                </div>
              )}

              {stage === "done" && current && (
                <div style={styles.donePanel}>
                  <div className="tn-mono" style={styles.eyebrow}>DECIDED</div>
                  <div style={styles.doneName}>{current.name}</div>
                  {current.image && (
                    <img src={current.image} alt={current.name} style={styles.doneImage} />
                  )}
                  <p style={styles.doneSub}>One less thing tonight.</p>

                  {!showRecipe && (
                    <button className="tn-focus" style={styles.recipeBtn} onClick={() => setShowRecipe(true)}>
                      <Utensils size={14} style={{ marginRight: 7, verticalAlign: "-2px" }} />
                      How do I make it
                    </button>
                  )}

                  {showRecipe && RECIPES[current.id] && (
                    <div style={styles.recipeBox} className="tn-card-enter">
                      <div className="tn-mono" style={styles.recipeTime}>
                        <Clock size={12} style={{ marginRight: 5, verticalAlign: "-2px" }} />
                        {RECIPES[current.id].time} · serves 2
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <button className="tn-btn-primary tn-focus" style={{ ...styles.decideBtn, marginTop: 0, padding: "12px 18px", fontSize: "14px" }} onClick={startCooking}>
                          <ChefHat size={16} style={{ marginRight: 8, verticalAlign: "-3px" }} />
                          Cook Step-by-Step
                        </button>
                      </div>

                      <div className="tn-mono" style={styles.recipeLabel}>INGREDIENTS</div>
                      <ul style={styles.ingList}>
                        {RECIPES[current.id].ingredients.map((ing, i) => (
                          <li key={i} style={styles.ingItem}>{ing}</li>
                        ))}
                      </ul>

                      <div className="tn-mono" style={styles.recipeLabel}>STEPS</div>
                      <ol style={styles.stepList}>
                        {RECIPES[current.id].steps.map((step, i) => (
                          <li key={i} style={styles.stepItem}>
                            <span className="tn-mono" style={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                            <span style={styles.stepText}>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <button className="tn-focus" style={styles.overBtn} onClick={startOver}>
                    <RotateCcw size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                    Decide again tomorrow
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ---------- Small building blocks ----------
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div className="tn-mono" style={styles.sectionTitle}>{title.toUpperCase()}</div>
      {children}
    </div>
  );
}

function ChipRow({ children }) {
  return <div style={styles.chipRow}>{children}</div>;
}

function Chip({ active, onClick, children }) {
  return (
    <button
      className="tn-chip tn-focus"
      onClick={onClick}
      style={{
        ...styles.chip,
        ...(active ? styles.chipActive : {}),
      }}
    >
      {children}
    </button>
  );
}

// ---------- Styles ----------
const styles = {
  page: {
    minHeight: "100%",
    width: "100%",
    background: "#FFFFFF",
    padding: "28px 16px 40px",
    display: "flex",
    justifyContent: "center",
  },
  wrap: { width: "100%", maxWidth: 420 },
  header: { marginBottom: 26, textAlign: "left" },
  eyebrow: {
    color: "#045137",
    fontSize: 11,
    letterSpacing: "0.14em",
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
    fontFamily: "'DM Sans', sans-serif",
  },
  h1: {
    color: "#23322D",
    fontSize: 34,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    margin: 0,
    lineHeight: 1.1,
    fontFamily: "'DM Sans', sans-serif",
  },
  askPanel: {},
  sectionTitle: {
    color: "#6B8F82",
    fontSize: 11,
    letterSpacing: "0.12em",
    marginBottom: 10,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
  },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: {
    background: "#F5F9F7",
    border: "1px solid #C2DDD4",
    color: "#23322D",
    borderRadius: 999,
    padding: "9px 16px",
    fontSize: 13.5,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
  },
  chipActive: {
    background: "#045137",
    border: "1px solid #045137",
    color: "#FFFFFF",
    fontWeight: 600,
  },
  decideBtn: {
    width: "100%",
    marginTop: 10,
    background: "#D05F0D",
    color: "#FFF",
    border: "none",
    borderRadius: 8,
    padding: "16px 20px",
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    boxShadow: "0 6px 22px rgba(208, 95, 13, 0.35)",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  },
  revealPanel: { display: "flex", flexDirection: "column", alignItems: "center" },
  cardShell: {
    position: "relative",
    width: "100%",
    maxWidth: 340,
    marginTop: 6,
    marginBottom: 24,
  },
  pinIcon: {
    position: "absolute",
    top: -10,
    left: "50%",
    transform: "translateX(-50%) rotate(8deg)",
    color: "#D05F0D",
    zIndex: 2,
  },
  cardPaper: {
    background: "#CEE9DF",
    borderRadius: "3px 3px 10px 10px",
    padding: "34px 26px 30px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.4), 0 2px 0 rgba(0,0,0,0.05)",
    clipPath:
      "polygon(0% 0%, 100% 0%, 100% 94%, 96% 96%, 92% 93%, 88% 97%, 84% 94%, 80% 97%, 76% 93%, 72% 96%, 68% 93%, 64% 97%, 60% 94%, 56% 97%, 52% 93%, 48% 96%, 44% 93%, 40% 97%, 36% 94%, 32% 97%, 28% 93%, 24% 96%, 20% 93%, 16% 97%, 12% 94%, 8% 96%, 4% 93%, 0% 96%)",
  },
  cardImage: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 12,
    marginBottom: 16,
    border: "1px solid rgba(4, 81, 55, 0.08)",
  },
  cardEyebrow: {
    color: "#045137",
    fontSize: 10.5,
    letterSpacing: "0.14em",
    marginBottom: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
  },
  cardName: {
    color: "#23322D",
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
    marginBottom: 10,
    fontFamily: "'DM Sans', sans-serif",
  },
  cardReason: {
    color: "#23322D",
    fontSize: 14.5,
    lineHeight: 1.5,
    marginBottom: 16,
    opacity: 0.85,
    fontFamily: "'Inter', sans-serif",
  },
  cardTagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  cardTag: {
    background: "rgba(4, 81, 55, 0.08)",
    color: "#045137",
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 11,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
  },
  actionRow: { display: "flex", gap: 10, width: "100%", maxWidth: 340 },
  rejectBtn: {
    flex: 1,
    background: "transparent",
    color: "#6B8F82",
    border: "1px solid #C2DDD4",
    borderRadius: 8,
    padding: "14px 10px",
    fontSize: 14.5,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    fontWeight: 500,
  },
  acceptBtn: {
    flex: 1.4,
    background: "#045137",
    color: "#FFF",
    border: "none",
    borderRadius: 8,
    padding: "14px 10px",
    fontSize: 14.5,
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  donePanel: { textAlign: "center", paddingTop: 30 },
  doneName: {
    color: "#23322D",
    fontSize: 26,
    fontWeight: 700,
    margin: "10px 0 8px",
    fontFamily: "'DM Sans', sans-serif",
  },
  doneImage: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 16,
    marginBottom: 20,
    border: "1px solid #E0EDE8",
    boxShadow: "0 8px 24px rgba(4,81,55,0.12)",
  },
  doneSub: { color: "#6B8F82", fontSize: 14, marginBottom: 22, fontFamily: "'Inter', sans-serif" },
  recipeBtn: {
    background: "#CEE9DF",
    border: "none",
    color: "#23322D",
    borderRadius: 8,
    padding: "12px 20px",
    fontSize: 13.5,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 26,
    display: "inline-flex",
    alignItems: "center",
  },
  recipeBox: {
    background: "#F3FAF7",
    border: "1px solid #C2DDD4",
    borderRadius: 12,
    padding: "22px 20px",
    textAlign: "left",
    marginBottom: 24,
  },
  recipeTime: {
    color: "#D05F0D",
    fontSize: 11,
    letterSpacing: "0.06em",
    marginBottom: 18,
    display: "flex",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
  },
  recipeLabel: {
    color: "#045137",
    fontSize: 11,
    letterSpacing: "0.12em",
    marginBottom: 10,
    marginTop: 18,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
  },
  ingList: { margin: 0, padding: 0, listStyle: "none" },
  ingItem: {
    color: "#23322D",
    fontSize: 14.5,
    lineHeight: 1.9,
    paddingLeft: 16,
    position: "relative",
    fontFamily: "'Inter', sans-serif",
  },
  stepList: { margin: 0, padding: 0, listStyle: "none" },
  stepItem: {
    display: "flex",
    gap: 12,
    marginBottom: 14,
    alignItems: "flex-start",
  },
  stepNum: {
    color: "#045137",
    fontSize: 12,
    paddingTop: 2,
    flexShrink: 0,
    fontFamily: "'IBM Plex Mono', monospace",
  },
  stepText: {
    color: "#23322D",
    fontSize: 14.5,
    lineHeight: 1.55,
    fontFamily: "'Inter', sans-serif",
  },
  overBtn: {
    background: "rgba(206, 233, 223, 0.06)",
    border: "1px solid rgba(206, 233, 223, 0.18)",
    color: "#CEE9DF",
    borderRadius: 8,
    padding: "12px 20px",
    fontSize: 13.5,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    fontWeight: 500,
  },
  cookingPanel: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },
  botCard: {
    display: "flex",
    gap: 16,
    background: "#F3FAF7",
    border: "1px solid #C2DDD4",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  botAvatarContainer: {
    width: 70,
    height: 70,
    flexShrink: 0,
  },
  botSvg: {
    width: "100%",
    height: "100%",
  },
  speechBubble: {
    flex: 1,
    background: "#CEE9DF",
    borderRadius: "12px 12px 12px 0px",
    padding: "14px 18px",
    position: "relative",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  },
  speechTitle: {
    color: "#045137",
    fontSize: 9.5,
    letterSpacing: "0.1em",
    marginBottom: 6,
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
  },
  speechText: {
    color: "#23322D",
    fontSize: 14.5,
    lineHeight: 1.45,
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
  },
  timerBox: {
    background: "#F3FAF7",
    border: "1px solid #C2DDD4",
    borderRadius: 16,
    padding: "24px 20px",
    textAlign: "center",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  timerAlarm: {
    borderColor: "#D05F0D",
    boxShadow: "0 0 20px rgba(208, 95, 13, 0.4)",
  },
  stepIndicator: {
    color: "#6B8F82",
    fontSize: 11,
    letterSpacing: "0.08em",
    marginBottom: 10,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
  },
  timerDisplay: {
    color: "#23322D",
    fontSize: 48,
    fontWeight: 700,
    fontFamily: "'IBM Plex Mono', monospace",
    lineHeight: 1,
    marginBottom: 16,
  },
  progressBarBg: {
    width: "100%",
    height: 6,
    background: "#E0EDE8",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBarFill: {
    height: "100%",
    background: "#0BE49B",
    borderRadius: 999,
    transition: "width 1s linear",
  },
  timerControls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  timerControlBtn: {
    background: "#FFFFFF",
    border: "1px solid #C2DDD4",
    color: "#23322D",
    width: 42,
    height: 42,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s ease, border-color 0.2s ease",
  },
  timerPlayBtn: {
    background: "#0BE49B",
    border: "none",
    color: "#23322D",
    width: 48,
    height: 48,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.15s ease, background 0.15s ease",
  },
  timerPlayBtnActive: {
    background: "#D05F0D",
  },
  cookingActions: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  quitBtn: {
    background: "transparent",
    border: "none",
    color: "#6B8F82",
    fontSize: 13.5,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: 500,
  },
  loaderPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "75vh",
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
  },
  loaderContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  loaderAvatar: {
    width: 140,
    height: 140,
    filter: "drop-shadow(0 4px 12px rgba(4,81,55,0.12))",
  },
  loaderTitle: {
    color: "#23322D",
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "'DM Sans', sans-serif",
    margin: "8px 0 16px",
    textAlign: "center",
  },
  loaderBarBg: {
    width: 200,
    height: 6,
    background: "#E0EDE8",
    borderRadius: 999,
    overflow: "hidden",
  },
  loaderBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #0BE49B 0%, #CEE9DF 100%)",
    borderRadius: 999,
  },
};
