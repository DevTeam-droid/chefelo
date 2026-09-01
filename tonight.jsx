import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChefHat, Flame, Clock, Utensils, Check, RotateCcw, Pin, Play, Pause, SkipForward, SkipBack, Globe, Smartphone, Download, Menu, Settings, FileText, ShieldCheck, MessageCircle, Volume2, VolumeX } from "lucide-react";

// ---------- Internationalization & Multi-Language Support ----------
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

const TRANSLATIONS = {
  en: {
    settings: "Settings",
    settings_header: "SETTINGS & OPTIONS",
    free_trial_sub: "Then $4.99/mo. Cancel anytime in App Store or Settings.",
    free_trial_title: "Start 7-Day Free Trial",
    something_amazing: "Something amazing is coming!",
    decided_eyebrow: "DECIDED",
    cancel_anytime: "7 Days Free · Cancel Anytime in 1 Tap",
    pro_trial_badge: "CHEF ELO PRO · 7-DAY FREE TRIAL",
    serves_2: "serves 2",
    bon_appetit: "BON APPÉTIT",
    dinner_decision: "YOUR DINNER DECISION IS",
    lunch_decision: "YOUR LUNCH DECISION IS",
    breakfast_decision: "YOUR BREAKFAST DECISION IS",
    app_title: "Chef Elo",
    lets_get_started: "Let's get started",
    morning_eyebrow: "MORNING'S DECISION",
    morning_title: "What's for breakfast?",
    afternoon_eyebrow: "AFTERNOON'S DECISION",
    afternoon_title: "What's for lunch?",
    tonight_eyebrow: "TONIGHT'S DECISION",
    tonight_title: "What's for dinner?",
    meal_decision_eyebrow: "MEAL DECISION",
    meal_type_title: "WHICH MEAL ARE WE DECIDING FOR?",
    meal_breakfast: "Breakfast",
    meal_lunch: "Lunch",
    meal_dinner: "Dinner",
    pantry_title: "WHAT'S IN THE PANTRY?",
    time_title: "HOW MUCH TIME DO YOU HAVE?",
    diet_title: "ANY DIETARY RESTRICTIONS?",
    allergies_title: "ALLERGIES & RESTRICTIONS",
    health_title: "HEALTH CONSIDERATIONS",
    decide_btn: "Decide for me",
    not_this: "Not this, pick another",
    doing_this: "Doing this",
    cook_now: "Cook this now",
    view_recipe: "How do I make it",
    cook_step_by_step: "Cook Step-by-Step",
    decide_again_tomorrow: "Decide again tomorrow",
    ingredients: "INGREDIENTS",
    steps: "PREPARATION STEPS",
    step_of: "STEP",
    of: "OF",
    quit_cooking: "Quit cooking",
    next_step: "Next step",
    prev_step: "Previous step",
    done: "Done",
    thanks_chef: "Thanks Chef",
    food_ready: "Food is ready, please serve!",
    hi_elo: "Hi, I'm Elo, your Chef!",
    menu: "Menu",
    support: "Support",
    live_chat: "Live Chat & Support",
    undergoing_maintenance: "Undergoing maintenance",
    filters_active: "FILTER(S) ACTIVE",
    filters_off: "ALL DIETARY FILTERS OFF",
    edit_preferences: "Edit preferences",
    restore_purchases: "Restore Purchases",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    loading: "Loading...",
    scouting: "Elo is scouting the web...",
    scouting_sub: "Finding the perfect recipe matching your pantry and filters.",
    chef_elo_says: "CHEF ELO SAYS",
    voice_on: "Listen & Read: ON",
    voice_off: "Voice: OFF",
    install_app: "Install App",
    install_app_title: "Install Chef Elo",
    install_app_sub: "Add Chef Elo to your Home Screen for 1-tap access and offline cooking.",
    install_app_btn: "Install App Now",
    update_required: "UPDATE REQUIRED",
    update_title: "App Update Available",
    update_now: "Update Now",
    got_it: "Got It",
    annual_plan: "Annual Plan",
    monthly_plan: "Monthly Plan",
    standard_monthly: "Standard monthly billing",
    start_free_trial: "Start 7-Day Free Trial",
    after_trial: "after trial",
    legal: "LEGAL",
    language: "LANGUAGE",
    pantry_chicken: "Chicken",
    pantry_beef: "Beef",
    pantry_pork: "Pork",
    pantry_seafood: "Seafood",
    pantry_pasta: "Pasta",
    pantry_veg: "Mostly veg",
    pantry_staples: "Beans & Grains",
    pantry_leftovers: "Leftovers",
    pantry_empty: "Basically nothing",
    effort_10: "10 min",
    effort_30: "30 min",
    effort_cook: "I'll cook",
    diet_vegetarian: "Veggie",
    diet_dairy_free: "No dairy",
    diet_kid_friendly: "Kid-friendly",
    allergy_gluten: "Gluten-free",
    allergy_dairy: "Dairy-free",
    allergy_eggs: "Egg-free",
    allergy_nuts: "Nut-free",
    health_diabetic_friendly: "Diabetic-friendly",
    health_low_sodium: "Low-sodium"
  },
  es: {
    settings: "Ajustes",
    settings_header: "AJUSTES Y OPCIONES",
    app_title: "Chef Elo",
    lets_get_started: "¡Empecemos!",
    morning_eyebrow: "DECISIÓN DE LA MAÑANA",
    morning_title: "¿Qué hay de desayuno?",
    afternoon_eyebrow: "DECISIÓN DEL MEDIODÍA",
    afternoon_title: "¿Qué hay de almuerzo?",
    tonight_eyebrow: "DECISIÓN DE LA NOCHE",
    tonight_title: "¿Qué hay de cena?",
    meal_decision_eyebrow: "DECISIÓN DE COMIDA",
    meal_type_title: "¿PARA QUÉ COMIDA DECIDIMOS?",
    meal_breakfast: "Desayuno",
    meal_lunch: "Almuerzo",
    meal_dinner: "Cena",
    pantry_title: "¿QUÉ HAY EN LA DESPENSA?",
    time_title: "¿CUÁNTO TIEMPO TIENES?",
    diet_title: "¿RESTRICCIONES DIETÉTICAS?",
    allergies_title: "ALERGIAS Y RESTRICCIONES",
    health_title: "CONSIDERACIONES DE SALUD",
    decide_btn: "Decide por mí",
    not_this: "Este no, elige otro",
    doing_this: "Elegir este",
    cook_now: "Cocinar ahora",
    view_recipe: "¿Cómo se hace?",
    cook_step_by_step: "Cocinar paso a paso",
    decide_again_tomorrow: "Decidir de nuevo mañana",
    ingredients: "INGREDIENTES",
    steps: "PASOS DE PREPARACIÓN",
    step_of: "PASO",
    of: "DE",
    quit_cooking: "Salir de cocina",
    next_step: "Siguiente paso",
    prev_step: "Paso anterior",
    done: "Listo",
    thanks_chef: "Gracias Chef",
    food_ready: "¡La comida está lista, a servir!",
    hi_elo: "¡Hola, soy Elo, tu Chef!",
    menu: "Menú",
    support: "Soporte",
    live_chat: "Chat en vivo y Soporte",
    undergoing_maintenance: "En mantenimiento",
    filters_active: "FILTRO(S) ACTIVO(S)",
    filters_off: "FILTROS DESACTIVADOS",
    edit_preferences: "Editar preferencias",
    restore_purchases: "Restaurar compras",
    terms: "Términos de servicio",
    privacy: "Política de privacidad",
    loading: "Cargando...",
    scouting: "Elo está buscando en la web...",
    scouting_sub: "Encontrando la receta perfecta según tu despensa.",
    chef_elo_says: "CHEF ELO DICE",
    voice_on: "Escuchar y Leer: ON",
    voice_off: "Voz: OFF",
    install_app: "Instalar App",
    install_app_title: "Instalar Chef Elo",
    install_app_sub: "Añade Chef Elo a tu pantalla de inicio para acceso directo.",
    install_app_btn: "Instalar aplicación ahora",
    update_required: "ACTUALIZACIÓN REQUERIDA",
    update_title: "Actualización disponible",
    update_now: "Actualizar ahora",
    got_it: "Entendido",
    annual_plan: "Plan Anual",
    monthly_plan: "Plan Mensual",
    standard_monthly: "Facturación mensual estándar",
    start_free_trial: "Iniciar prueba gratis de 7 días",
    after_trial: "tras prueba",
    legal: "LEGAL",
    language: "IDIOMA",
    pantry_chicken: "Pollo",
    pantry_beef: "Carne de res",
    pantry_pork: "Cerdo",
    pantry_seafood: "Mariscos",
    pantry_pasta: "Pasta",
    pantry_veg: "Verduras",
    pantry_staples: "Legumbres y Granos",
    pantry_leftovers: "Sobras",
    pantry_empty: "Casi nada",
    effort_10: "10 min",
    effort_30: "30 min",
    effort_cook: "Yo cocino",
    diet_vegetarian: "Vegetariano",
    diet_dairy_free: "Sin lácteos",
    diet_kid_friendly: "Apto para niños",
    allergy_gluten: "Sin gluten",
    allergy_dairy: "Sin lácteos",
    allergy_eggs: "Sin huevo",
    allergy_nuts: "Sin frutos secos",
    health_diabetic_friendly: "Apto para diabéticos",
    health_low_sodium: "Bajo en sodio"
  },
  fr: {
    settings: "Paramètres",
    settings_header: "PARAMÈTRES ET OPTIONS",
    app_title: "Chef Elo",
    lets_get_started: "Commençons !",
    morning_eyebrow: "DÉCISION DU MATIN",
    morning_title: "Qu'est-ce qu'on mange au petit-déjeuner ?",
    afternoon_eyebrow: "DÉCISION DU MIDI",
    afternoon_title: "Qu'est-ce qu'on mange au déjeuner ?",
    tonight_eyebrow: "DÉCISION DU SOIR",
    tonight_title: "Qu'est-ce qu'on mange au dîner ?",
    meal_decision_eyebrow: "DÉCISION DE REPAS",
    meal_type_title: "POUR QUEL REPAS DÉCIDONS-NOUS ?",
    meal_breakfast: "Petit-déjeuner",
    meal_lunch: "Déjeuner",
    meal_dinner: "Dîner",
    pantry_title: "QU'Y A-T-IL DANS LE PLACARD ?",
    time_title: "COMBIEN DE TEMPS AVEZ-VOUS ?",
    diet_title: "RESTRICTIONS ALIMENTAIRES ?",
    allergies_title: "ALLERGIES ET RESTRICTIONS",
    health_title: "CONSIDÉRATIONS DE SANTÉ",
    decide_btn: "Décide pour moi",
    not_this: "Pas celui-ci, choisis-en un autre",
    doing_this: "Choisir ce plat",
    cook_now: "Cuisiner maintenant",
    view_recipe: "Comment préparer ?",
    cook_step_by_step: "Cuisiner étape par étape",
    decide_again_tomorrow: "Rechoisir demain",
    ingredients: "INGRÉDIENTS",
    steps: "ÉTAPES DE PRÉPARATION",
    step_of: "ÉTAPE",
    of: "SUR",
    quit_cooking: "Quitter la cuisine",
    next_step: "Étape suivante",
    prev_step: "Étape précédente",
    done: "Terminé",
    thanks_chef: "Merci Chef",
    food_ready: "Le repas est prêt, servez !",
    hi_elo: "Salut, je suis Elo, ton Chef !",
    menu: "Menu",
    support: "Support",
    live_chat: "Chat en direct & Support",
    undergoing_maintenance: "En cours de maintenance",
    filters_active: "FILTRE(S) ACTIF(S)",
    filters_off: "FILTRES DESACTIVÉS",
    edit_preferences: "Modifier les préférences",
    restore_purchases: "Restaurer les achats",
    terms: "Conditions d'utilisation",
    privacy: "Politique de confidentialité",
    loading: "Chargement...",
    scouting: "Elo recherche sur le web...",
    scouting_sub: "Recherche de la recette parfaite selon votre placard.",
    chef_elo_says: "CHEF ELO DIT",
    voice_on: "Écouter & Lire : OUI",
    voice_off: "Voix : NON",
    install_app: "Installer l'app",
    install_app_title: "Installer Chef Elo",
    install_app_sub: "Ajoutez Chef Elo à votre écran d'accueil en 1 clic.",
    install_app_btn: "Installer l'application maintenant",
    update_required: "MISE À JOUR REQUISE",
    update_title: "Mise à jour disponible",
    update_now: "Mettre à jour maintenant",
    got_it: "J'ai compris",
    annual_plan: "Plan Annuel",
    monthly_plan: "Plan Mensuel",
    standard_monthly: "Facturation mensuelle standard",
    start_free_trial: "Essai gratuit de 7 jours",
    after_trial: "après l'essai",
    legal: "MENTIONS LÉGALES",
    language: "LANGUE",
    pantry_chicken: "Poulet",
    pantry_beef: "Bœuf",
    pantry_pork: "Porc",
    pantry_seafood: "Fruits de mer",
    pantry_pasta: "Pâtes",
    pantry_veg: "Légumes",
    pantry_staples: "Légumineuses & Céréales",
    pantry_leftovers: "Restes",
    pantry_empty: "Presque rien",
    effort_10: "10 min",
    effort_30: "30 min",
    effort_cook: "Je cuisine",
    diet_vegetarian: "Végétarien",
    diet_dairy_free: "Sans produit laitier",
    diet_kid_friendly: "Adapté aux enfants",
    allergy_gluten: "Sans gluten",
    allergy_dairy: "Sans lactose",
    allergy_eggs: "Sans œuf",
    allergy_nuts: "Sans fruits à coque",
    health_diabetic_friendly: "Adapté aux diabétiques",
    health_low_sodium: "Pauvre en sel"
  },
  de: {
    settings: "Einstellungen",
    settings_header: "EINSTELLUNGEN & OPTIONEN",
    app_title: "Chef Elo",
    lets_get_started: "Lass uns anfangen!",
    morning_eyebrow: "MORGENS ENTSCHEIDUNG",
    morning_title: "Was gibt's zum Frühstück?",
    afternoon_eyebrow: "MITTAGS ENTSCHEIDUNG",
    afternoon_title: "Was gibt's zum Mittagessen?",
    tonight_eyebrow: "ABENDS ENTSCHEIDUNG",
    tonight_title: "Was gibt's zum Abendessen?",
    meal_decision_eyebrow: "MAHLZEIT ENTSCHEIDUNG",
    meal_type_title: "FÜR WELCHE MAHLZEIT ENTSCHEIDEN WIR?",
    meal_breakfast: "Frühstück",
    meal_lunch: "Mittagessen",
    meal_dinner: "Abendessen",
    pantry_title: "WAS IST IM VORRATSSCHRANK?",
    time_title: "WIE VIEL ZEIT HAST DU?",
    diet_title: "ERNÄHRUNGSEINSCHRÄNKUNGEN?",
    allergies_title: "ALLERGIEN & EINSCHRÄNKUNGEN",
    health_title: "GESUNDHEITSZIELE",
    decide_btn: "Entscheide für mich",
    not_this: "Nicht dieses, wähle ein anderes",
    doing_this: "Dieses wählen",
    cook_now: "Jetzt kochen",
    view_recipe: "Wie koche ich das?",
    cook_step_by_step: "Schritt für Schritt kochen",
    decide_again_tomorrow: "Morgen neu entscheiden",
    ingredients: "ZUTATEN",
    steps: "ZUBEREITUNGSSCHRITTE",
    step_of: "SCHRITT",
    of: "VON",
    quit_cooking: "Kochen beenden",
    next_step: "Nächster Schritt",
    prev_step: "Vorheriger Schritt",
    done: "Fertig",
    thanks_chef: "Danke Chef",
    food_ready: "Essen ist fertig, bitte servieren!",
    hi_elo: "Hi, ich bin Elo, dein Chef!",
    menu: "Menü",
    support: "Support",
    live_chat: "Live Chat & Support",
    undergoing_maintenance: "Wartungsarbeiten",
    filters_active: "FILTER AKTIV",
    filters_off: "ALLE FILTER AUS",
    edit_preferences: "Einstellungen bearbeiten",
    restore_purchases: "Käufe wiederherstellen",
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutz",
    loading: "Wird geladen...",
    scouting: "Elo sucht im Web...",
    scouting_sub: "Findet das perfekte Rezept für deinen Vorrat.",
    chef_elo_says: "CHEF ELO SAGT",
    voice_on: "Hören & Lesen: AN",
    voice_off: "Stimme: AUS",
    install_app: "App installieren",
    install_app_title: "Chef Elo installieren",
    install_app_sub: "Füge Chef Elo für 1-Klick-Zugriff hinzu.",
    install_app_btn: "Jetzt installieren",
    update_required: "UPDATE ERFORDERLICH",
    update_title: "Update verfügbar",
    update_now: "Jetzt aktualisieren",
    got_it: "Verstanden",
    annual_plan: "Jahresplan",
    monthly_plan: "Monatsplan",
    standard_monthly: "Standard monatliche Abrechnung",
    start_free_trial: "7 Tage kostenlos testen",
    after_trial: "nach Testphase",
    legal: "RECHTLICHES",
    language: "SPRACHE",
    pantry_chicken: "Hähnchen",
    pantry_beef: "Rindfleisch",
    pantry_pork: "Schweinefleisch",
    pantry_seafood: "Meeresfrüchte",
    pantry_pasta: "Nudeln",
    pantry_veg: "Gemüse",
    pantry_staples: "Hülsenfrüchte & Getreide",
    pantry_leftovers: "Reste",
    pantry_empty: "Fast nichts",
    effort_10: "10 Min",
    effort_30: "30 Min",
    effort_cook: "Ich koche",
    diet_vegetarian: "Vegetarisch",
    diet_dairy_free: "Laktosefrei",
    diet_kid_friendly: "Kinderfreundlich",
    allergy_gluten: "Glutenfrei",
    allergy_dairy: "Laktosefrei",
    allergy_eggs: "Eifrei",
    allergy_nuts: "Nussfrei",
    health_diabetic_friendly: "Diabetikerfreundlich",
    health_low_sodium: "Natriumarm"
  },
  it: {
    settings: "Impostazioni",
    settings_header: "IMPOSTAZIONI E OPZIONI",
    app_title: "Chef Elo",
    lets_get_started: "Iniziamo!",
    morning_eyebrow: "DECISIONE DEL MATTINO",
    morning_title: "Cosa c'è per colazione?",
    afternoon_eyebrow: "DECISIONE DEL PRANZO",
    afternoon_title: "Cosa c'è per pranzo?",
    tonight_eyebrow: "DECISIONE DELLA SERA",
    tonight_title: "Cosa c'è per cena?",
    meal_decision_eyebrow: "DECISIONE DEL PASTO",
    meal_type_title: "PER QUALE PASTO DECIDIAMO?",
    meal_breakfast: "Colazione",
    meal_lunch: "Pranzo",
    meal_dinner: "Cena",
    pantry_title: "COSA C'È IN DISPENSA?",
    time_title: "QUANTO TEMPO HAI?",
    diet_title: "RESTRIZIONI ALIMENTARI?",
    allergies_title: "ALLERGIE E RESTRIZIONI",
    health_title: "CONSIDERAZIONI DI SALUTE",
    decide_btn: "Decidi per me",
    not_this: "Non questo, scegli un altro",
    doing_this: "Scegli questo",
    cook_now: "Cucina ora",
    view_recipe: "Come si prepara?",
    cook_step_by_step: "Cucina passo dopo passo",
    decide_again_tomorrow: "Decidi di nuovo domani",
    ingredients: "INGREDIENTI",
    steps: "PASSAGGI DI PREPARAZIONE",
    step_of: "PASSO",
    of: "DI",
    quit_cooking: "Esci dalla cucina",
    next_step: "Passo successivo",
    prev_step: "Passo precedente",
    done: "Fatto",
    thanks_chef: "Grazie Chef",
    food_ready: "Il cibo è pronto, servire!",
    hi_elo: "Ciao, sono Elo, il tuo Chef!",
    menu: "Menu",
    support: "Supporto",
    live_chat: "Chat dal vivo & Supporto",
    undergoing_maintenance: "In manutenzione",
    filters_active: "FILTRO/I ATTIVI",
    filters_off: "TUTTI I FILTRI DISATTIVATI",
    edit_preferences: "Modifica preferenze",
    restore_purchases: "Ripristina acquisti",
    terms: "Termini di servizio",
    privacy: "Informativa sulla privacy",
    loading: "Caricamento...",
    scouting: "Elo sta cercando sul web...",
    scouting_sub: "Trovando la ricetta perfetta per la tua dispensa.",
    chef_elo_says: "CHEF ELO DICE",
    voice_on: "Ascolta & Leggi: ON",
    voice_off: "Voce: OFF",
    install_app: "Installa App",
    install_app_title: "Installa Chef Elo",
    install_app_sub: "Aggiungi Chef Elo alla schermata home.",
    install_app_btn: "Installa l'app ora",
    update_required: "AGGIORNAMENTO RICHIESTO",
    update_title: "Aggiornamento disponibile",
    update_now: "Aggiorna ora",
    got_it: "Ho capito",
    annual_plan: "Piano Annuale",
    monthly_plan: "Piano Mensile",
    standard_monthly: "Fatturazione mensile standard",
    start_free_trial: "Inizia la prova gratuita di 7 giorni",
    after_trial: "dopo la prova",
    legal: "NOTE LEGALI",
    language: "LINGUA",
    pantry_chicken: "Pollo",
    pantry_beef: "Manzo",
    pantry_pork: "Maiale",
    pantry_seafood: "Frutti di mare",
    pantry_pasta: "Pasta",
    pantry_veg: "Verdure",
    pantry_staples: "Legumi & Cereali",
    pantry_leftovers: "Avanzi",
    pantry_empty: "Quasi niente",
    effort_10: "10 min",
    effort_30: "30 min",
    effort_cook: "Cucino io",
    diet_vegetarian: "Vegetariano",
    diet_dairy_free: "Senza lattosio",
    diet_kid_friendly: "Adatto ai bambini",
    allergy_gluten: "Senza glutine",
    allergy_dairy: "Senza lattosio",
    allergy_eggs: "Senza uova",
    allergy_nuts: "Senza frutta a guscio",
    health_diabetic_friendly: "Adatto ai diabetici",
    health_low_sodium: "Basso contenuto di sodio"
  },
  pt: {
    settings: "Configurações",
    settings_header: "CONFIGURAÇÕES E OPÇÕES",
    app_title: "Chef Elo",
    lets_get_started: "Vamos começar!",
    morning_eyebrow: "DECISÃO DA MANHÃ",
    morning_title: "O que tem para o café da manhã?",
    afternoon_eyebrow: "DECISÃO DO ALMOÇO",
    afternoon_title: "O que tem para o almoço?",
    tonight_eyebrow: "DECISÃO DA NOITE",
    tonight_title: "O que tem para o jantar?",
    meal_decision_eyebrow: "DECISÃO DA REFEIÇÃO",
    meal_type_title: "PARA QUAL REFEIÇÃO ESTAMOS DECIDINDO?",
    meal_breakfast: "Café da manhã",
    meal_lunch: "Almoço",
    meal_dinner: "Jantar",
    pantry_title: "O QUE TEM NA DESPENSA?",
    time_title: "QUANTO TEMPO VOCÊ TEM?",
    diet_title: "RESTRIÇÕES ALIMENTARES?",
    allergies_title: "ALERGIAS E RESTRIÇÕES",
    health_title: "CONSIDERAÇÕES DE SAÚDE",
    decide_btn: "Decida por mim",
    not_this: "Este não, escolha outro",
    doing_this: "Escolher este",
    cook_now: "Cozinhar agora",
    view_recipe: "Como preparar?",
    cook_step_by_step: "Cozinhar passo a passo",
    decide_again_tomorrow: "Decidir novamente amanhã",
    ingredients: "INGREDIENTES",
    steps: "PASSO A PASSO DA PREPARAÇÃO",
    step_of: "PASSO",
    of: "DE",
    quit_cooking: "Sair da cozinha",
    next_step: "Próximo passo",
    prev_step: "Passo anterior",
    done: "Concluído",
    thanks_chef: "Obrigado Chef",
    food_ready: "A comida está pronta, sirva-se!",
    hi_elo: "Olá, sou o Elo, seu Chef!",
    menu: "Menu",
    support: "Suporte",
    live_chat: "Chat ao vivo & Suporte",
    undergoing_maintenance: "Em manutenção",
    filters_active: "FILTRO(S) ATIVO(S)",
    filters_off: "TODOS OS FILTROS DESLIGADOS",
    edit_preferences: "Editar preferências",
    restore_purchases: "Restaurar compras",
    terms: "Termos de serviço",
    privacy: "Política de privacidade",
    loading: "Carregando...",
    scouting: "Elo está procurando na web...",
    scouting_sub: "Encontrando a receita perfeita para sua dispensa.",
    chef_elo_says: "CHEF ELO DIZ",
    voice_on: "Ouvir & Ler: LIGADO",
    voice_off: "Voz: DESLIGADO",
    install_app: "Instalar App",
    install_app_title: "Instalar Chef Elo",
    install_app_sub: "Adicione o Chef Elo à sua tela inicial.",
    install_app_btn: "Instalar aplicativo agora",
    update_required: "ATUALIZAÇÃO NECESSÁRIA",
    update_title: "Atualização disponível",
    update_now: "Atualizar agora",
    got_it: "Entendi",
    annual_plan: "Plano Anual",
    monthly_plan: "Plano Mensal",
    standard_monthly: "Cobrança mensal padrão",
    start_free_trial: "Iniciar teste grátis de 7 dias",
    after_trial: "após o teste",
    legal: "JURÍDICO",
    language: "IDIOMA",
    pantry_chicken: "Frango",
    pantry_beef: "Carne bovina",
    pantry_pork: "Porco",
    pantry_seafood: "Frutos do mar",
    pantry_pasta: "Massa",
    pantry_veg: "Vegetais",
    pantry_staples: "Leguminosas & Grãos",
    pantry_leftovers: "Sobras",
    pantry_empty: "Quase nada",
    effort_10: "10 min",
    effort_30: "30 min",
    effort_cook: "Eu cozinho",
    diet_vegetarian: "Vegetariano",
    diet_dairy_free: "Sem laticínios",
    diet_kid_friendly: "Para crianças",
    allergy_gluten: "Sem glúten",
    allergy_dairy: "Sem laticínios",
    allergy_eggs: "Sem ovo",
    allergy_nuts: "Sem nozes",
    health_diabetic_friendly: "Para diabéticos",
    health_low_sodium: "Baixo teor de sódio"
  },
  zh: {
    settings: "设置",
    settings_header: "设置与选项",
    app_title: "Chef Elo",
    lets_get_started: "让我们开始吧！",
    morning_eyebrow: "早晨的决定",
    morning_title: "早餐吃什么？",
    afternoon_eyebrow: "午间的决定",
    afternoon_title: "午餐吃什么？",
    tonight_eyebrow: "今晚的决定",
    tonight_title: "晚餐吃什么？",
    meal_decision_eyebrow: "用餐决定",
    meal_type_title: "我们要为何餐做决定？",
    meal_breakfast: "早餐",
    meal_lunch: "午餐",
    meal_dinner: "晚餐",
    pantry_title: "储物柜里有什么？",
    time_title: "你有多少时间？",
    diet_title: "有饮食限制吗？",
    allergies_title: "过敏与饮食限制",
    health_title: "健康考虑",
    decide_btn: "帮我决定",
    not_this: "换一个，再挑挑",
    doing_this: "就选这个",
    cook_now: "现在开始做饭",
    view_recipe: "怎么做？",
    cook_step_by_step: "逐步烹饪指导",
    decide_again_tomorrow: "明天再决定",
    ingredients: "食材清单",
    steps: "烹饪步骤",
    step_of: "步骤",
    of: "/",
    quit_cooking: "退出烹饪",
    next_step: "下一步",
    prev_step: "上一步",
    done: "完成",
    thanks_chef: "谢谢大厨",
    food_ready: "美食准备好了，请享用！",
    hi_elo: "嗨，我是Elo，你的主厨！",
    menu: "菜单",
    support: "支持",
    live_chat: "在线客服与支持",
    undergoing_maintenance: "维护中",
    filters_active: "已启用筛选",
    filters_off: "关闭所有筛选",
    edit_preferences: "编辑偏好",
    restore_purchases: "恢复购买",
    terms: "服务条款",
    privacy: "隐私政策",
    loading: "加载中...",
    scouting: "Elo 正在为您寻找最佳食谱...",
    scouting_sub: "匹配您的食材和饮食偏好。",
    chef_elo_says: "CHEF ELO 提示",
    voice_on: "语音朗读：开启",
    voice_off: "语音朗读：关闭",
    install_app: "安装应用",
    install_app_title: "安装 Chef Elo",
    install_app_sub: "添加到主屏幕，一键快速使用。",
    install_app_btn: "立即安装应用",
    update_required: "需要更新",
    update_title: "发现新版本",
    update_now: "立即更新",
    got_it: "知道了",
    annual_plan: "年度计划",
    monthly_plan: "月度计划",
    standard_monthly: "标准按月计费",
    start_free_trial: "开启 7 天免费试用",
    after_trial: "试用期后",
    legal: "法律信息",
    language: "语言",
    pantry_chicken: "鸡肉",
    pantry_beef: "牛肉",
    pantry_pork: "猪肉",
    pantry_seafood: "海鲜",
    pantry_pasta: "意面",
    pantry_veg: "蔬菜为主",
    pantry_staples: "豆类与谷物",
    pantry_leftovers: "剩菜",
    pantry_empty: "基本没有",
    effort_10: "10分钟",
    effort_30: "30分钟",
    effort_cook: "下厨烹饪",
    diet_vegetarian: "素食",
    diet_dairy_free: "无乳制品",
    diet_kid_friendly: "适合儿童",
    allergy_gluten: "无麸质",
    allergy_dairy: "无乳制品",
    allergy_eggs: "无鸡蛋",
    allergy_nuts: "无坚果",
    health_diabetic_friendly: "糖尿病友好",
    health_low_sodium: "低钠"
  },
  ja: {
    settings: "設定",
    settings_header: "設定とオプション",
    app_title: "Chef Elo",
    lets_get_started: "はじめましょう！",
    morning_eyebrow: "朝の決定",
    morning_title: "朝食は何にする？",
    afternoon_eyebrow: "昼の決定",
    afternoon_title: "昼食は何にする？",
    tonight_eyebrow: "夜の決定",
    tonight_title: "夕食は何にする？",
    meal_decision_eyebrow: "食事の決定",
    meal_type_title: "どの食事を決めますか？",
    meal_breakfast: "朝食",
    meal_lunch: "昼食",
    meal_dinner: "夕食",
    pantry_title: "パントリーに何がある？",
    time_title: "時間はどれくらいある？",
    diet_title: "食事制限はある？",
    allergies_title: "アレルギーと制限",
    health_title: "健康上の配慮",
    decide_btn: "シェフにおまかせ",
    not_this: "これじゃない、他を選ぶ",
    doing_this: "これにする",
    cook_now: "今すぐ調理する",
    view_recipe: "作り方を見る",
    cook_step_by_step: "ステップ順に作る",
    decide_again_tomorrow: "明日また決める",
    ingredients: "材料",
    steps: "調理手順",
    step_of: "ステップ",
    of: "/",
    quit_cooking: "調理を終了",
    next_step: "次へ",
    prev_step: "前へ",
    done: "完了",
    thanks_chef: "ありがとうシェフ",
    food_ready: "料理の完成です、召し上がれ！",
    hi_elo: "こんにちは、専属シェフのEloです！",
    menu: "メニュー",
    support: "サポート",
    live_chat: "ライブチャット＆サポート",
    undergoing_maintenance: "メンテナンス中",
    filters_active: "フィルター適用中",
    filters_off: "全フィルターOFF",
    edit_preferences: "設定を編集",
    restore_purchases: "購入を復元",
    terms: "利用規約",
    privacy: "プライバシーポリシー",
    loading: "読み込み中...",
    scouting: "Eloがウェブ検索中...",
    scouting_sub: "あなたのパントリーに最適なレシピを探しています。",
    chef_elo_says: "CHEF ELOの指示",
    voice_on: "音声読み上げ: ON",
    voice_off: "音声読み上げ: OFF",
    install_app: "アプリをインストール",
    install_app_title: "Chef Eloをインストール",
    install_app_sub: "ホーム画面に追加してワンタップで起動。",
    install_app_btn: "今すぐインストール",
    update_required: "アップデートが必要です",
    update_title: "最新バージョンが利用可能",
    update_now: "今すぐ更新",
    got_it: "了解",
    annual_plan: "年額プラン",
    monthly_plan: "月額プラン",
    standard_monthly: "月額標準請求",
    start_free_trial: "7日間無料体験を開始",
    after_trial: "無料体験終了後",
    legal: "法的情報",
    language: "言語",
    pantry_chicken: "鶏肉",
    pantry_beef: "牛肉",
    pantry_pork: "豚肉",
    pantry_seafood: "魚介類",
    pantry_pasta: "パスタ",
    pantry_veg: "野菜中心",
    pantry_staples: "豆・穀物",
    pantry_leftovers: "残り物",
    pantry_empty: "ほぼ何もなし",
    effort_10: "10分",
    effort_30: "30分",
    effort_cook: "じっくり調理",
    diet_vegetarian: "ベジタリアン",
    diet_dairy_free: "乳製品不使用",
    diet_kid_friendly: "子供向け",
    allergy_gluten: "グルテンフリー",
    allergy_dairy: "乳製品フリー",
    allergy_eggs: "卵フリー",
    allergy_nuts: "ナッツフリー",
    health_diabetic_friendly: "糖尿病配慮",
    health_low_sodium: "减塩"
  },
  ar: {
    settings: "الإعدادات",
    settings_header: "الإعدادات والخيارات",
    app_title: "Chef Elo",
    lets_get_started: "هيا لنبدأ!",
    morning_eyebrow: "قرار الصباح",
    morning_title: "ماذا سنأكل في الإفطار؟",
    afternoon_eyebrow: "قرار الغداء",
    afternoon_title: "ماذا سنأكل في الغداء؟",
    tonight_eyebrow: "قرار المساء",
    tonight_title: "ماذا سنأكل في العشاء؟",
    meal_decision_eyebrow: "قرار الوجبة",
    meal_type_title: "أي وجبة نحددها الآن؟",
    meal_breakfast: "الإفطار",
    meal_lunch: "الغداء",
    meal_dinner: "العشاء",
    pantry_title: "ماذا يوجد في الخزانة؟",
    time_title: "كم من الوقت لديك؟",
    diet_title: "هل لديك أي قيود غذائية؟",
    allergies_title: "الحساسية والقيود",
    health_title: "اعتبارات صحية",
    decide_btn: "قرر نيابة عني",
    not_this: "ليس هذا، اختر وجبة أخرى",
    doing_this: "سأطبخ هذا",
    cook_now: "ابدأ الطبخ الآن",
    view_recipe: "كيف أطبخها؟",
    cook_step_by_step: "الطبخ خطوة بخطوة",
    decide_again_tomorrow: "قرر غداً مجدداً",
    ingredients: "المكونات",
    steps: "خطوات التحضير",
    step_of: "الخطوة",
    of: "من",
    quit_cooking: "إنهاء الطبخ",
    next_step: "الخطوة التالية",
    prev_step: "الخطوة السابقة",
    done: "تم",
    thanks_chef: "شكراً لك شيف",
    food_ready: "الطعام جاهز، تفضل بالتقديم!",
    hi_elo: "مرحباً، أنا إيلو الشيف الخاص بك!",
    menu: "القائمة",
    support: "الدعم",
    live_chat: "المحادثة المباشرة والدعم",
    undergoing_maintenance: "قيد الصيانة حالياً",
    filters_active: "الفلاتر مفعّلة",
    filters_off: "إيقاف كل الفلاتر",
    edit_preferences: "تعديل التفضيلات",
    restore_purchases: "استعادة المشتريات",
    terms: "شروط الخدمة",
    privacy: "سياسة الخصوصية",
    loading: "جاري التحميل...",
    scouting: "إيلو يبحث في الويب...",
    scouting_sub: "العثور على الوصفة المثالية المتوافقة مع مكوناتك.",
    chef_elo_says: "تعليمات الشيف إيلو",
    voice_on: "القراءة الصوتية: مفعلة",
    voice_off: "القراءة الصوتية: معطلة",
    install_app: "تثبيت التطبيق",
    install_app_title: "تثبيت Chef Elo",
    install_app_sub: "إضافة الشيف إيلو للشاشة الرئيسية للوصول السريع.",
    install_app_btn: "تثبيت التطبيق الآن",
    update_required: "تحديث مطلوب",
    update_title: "يتوفر تحديث جديد",
    update_now: "تحديث الآن",
    got_it: "فهمت",
    annual_plan: "الخطة السنوية",
    monthly_plan: "الخطة الشهرية",
    standard_monthly: "الفواتير الشهرية القياسية",
    start_free_trial: "بدء التجربة المجانية لمدة 7 أيام",
    after_trial: "بعد التجربة",
    legal: "معلومات قانونية",
    language: "اللغة",
    pantry_chicken: "دجاج",
    pantry_beef: "لحم بقر",
    pantry_pork: "لحم خنزير",
    pantry_seafood: "مأكولات بحرية",
    pantry_pasta: "باستا",
    pantry_veg: "خضار غالبًا",
    pantry_staples: "بقوليات وحبوب",
    pantry_leftovers: "بقايا طعام",
    pantry_empty: "لا شيء تقريبًا",
    effort_10: "10 دقائق",
    effort_30: "30 دقيقة",
    effort_cook: "سأطبخ بنفسي",
    diet_vegetarian: "نباتي",
    diet_dairy_free: "خالي من الالبان",
    diet_kid_friendly: "مناسب للأطفال",
    allergy_gluten: "خالي من الجلوتين",
    allergy_dairy: "خالي من اللكتوز",
    allergy_eggs: "خالي من البيض",
    allergy_nuts: "خالي من المكسرات",
    health_diabetic_friendly: "مناسب لمرضى السكري",
    health_low_sodium: "قليل الصوديوم"
  }
};

// ---------- Data ----------
const MEALS = [
  { id: "m1", name: "Garlic butter chicken thighs", reason: "Ten minutes of hands-on time, then the oven does the rest.", effort: "10", pantry: ["chicken"], diet: ["dairy-free", "kid-friendly"], allergies: ["dairy"], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80" },
  { id: "m2", name: "Sheet-pan chicken & veg", reason: "One pan, one wash-up, done.", effort: "30", pantry: ["chicken", "veg"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: ["diabetic-friendly", "low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=600&q=80" },
  { id: "m3", name: "Chicken quesadillas", reason: "Kids eat it, you won't complain either.", effort: "10", pantry: ["chicken", "leftovers"], diet: ["kid-friendly"], allergies: ["dairy", "gluten"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80" },
  { id: "m4", name: "Cacio e pepe", reason: "Three ingredients, restaurant results.", effort: "10", pantry: ["pasta"], diet: ["vegetarian"], allergies: ["dairy", "gluten"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80" },
  { id: "m5", name: "Pasta with whatever's in the fridge", reason: "Built for exactly this moment.", effort: "10", pantry: ["pasta", "leftovers", "veg"], diet: ["vegetarian"], allergies: ["gluten"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },
  { id: "m6", name: "Baked ziti", reason: "Worth the wait, freezes well too.", effort: "cook", pantry: ["pasta"], diet: ["vegetarian", "kid-friendly"], allergies: ["dairy", "gluten"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80" },
  { id: "m7", name: "Stir-fried veg & rice", reason: "Whatever's wilting in the crisper, this'll use it.", effort: "10", pantry: ["veg", "leftovers"], diet: ["vegetarian", "dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m8", name: "Roasted veg grain bowl", reason: "Toss it in the oven, forget about it for 25.", effort: "30", pantry: ["veg"], diet: ["vegetarian", "dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" },
  { id: "m9", name: "Fridge-clearout fried rice", reason: "Exactly what leftover rice was waiting for.", effort: "10", pantry: ["leftovers", "veg"], diet: ["dairy-free"], allergies: ["eggs"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80" },
  { id: "m10", name: "Reinvented leftovers soup", reason: "Stock, whatever's left, twenty minutes.", effort: "10", pantry: ["leftovers"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: ["low-sodium"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
  { id: "m11", name: "Toast, eggs, whatever you've got", reason: "Nothing in the house? This always works.", effort: "10", pantry: ["empty"], diet: ["vegetarian", "kid-friendly"], allergies: ["gluten", "eggs"], health: [], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80" },
  { id: "m12", name: "Beans on toast, upgraded", reason: "Pantry staples, five minutes, unreasonably good.", effort: "10", pantry: ["empty"], diet: ["vegetarian"], allergies: ["gluten"], health: [], mealType: ["breakfast", "lunch"], image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80" },
  { id: "m13", name: "Instant ramen, doctored up", reason: "An egg and some chili oil changes everything.", effort: "10", pantry: ["empty"], diet: ["kid-friendly"], allergies: ["gluten", "eggs"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80" },
  { id: "m14", name: "Braised chicken thighs", reason: "Low effort now, big payoff at the table.", effort: "cook", pantry: ["chicken"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80" },
  { id: "m15", name: "Roast chicken, the whole bird", reason: "Sunday energy, leftovers for two more nights.", effort: "cook", pantry: ["chicken"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1598103442097-8b743e2b90ce?auto=format&fit=crop&w=600&q=80" },
  { id: "m16", name: "Chickpea curry", reason: "Freezer-friendly, better the next day.", effort: "30", pantry: ["veg", "empty"], diet: ["vegetarian", "dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" },
  { id: "m17", name: "Veggie fried noodles", reason: "Whatever vegetables need using, this'll take them.", effort: "10", pantry: ["pasta", "veg"], diet: ["vegetarian", "dairy-free"], allergies: ["gluten"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80" },
  { id: "m18", name: "Slow-simmered bolognese", reason: "Start it, walk away, thank yourself later.", effort: "cook", pantry: ["pasta"], diet: ["dairy-free"], allergies: ["gluten"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80" },
  { id: "m19", name: "Grilled cheese & tomato soup", reason: "The one that always feels like it's helping.", effort: "10", pantry: ["empty"], diet: ["vegetarian", "kid-friendly"], allergies: ["dairy", "gluten"], health: [], mealType: ["lunch"], image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80" },
  { id: "m20", name: "Chicken & veg soup", reason: "Uses up the odds and ends, tastes like effort.", effort: "30", pantry: ["chicken", "veg", "leftovers"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: ["low-sodium", "diabetic-friendly"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80" },
  { id: "m21", name: "Beef & broccoli stir-fry", reason: "Quick sear, crisp broccoli, rich brown sauce.", effort: "10", pantry: ["beef", "veg"], diet: ["dairy-free"], allergies: ["gluten"], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m22", name: "Pan-seared garlic salmon", reason: "Healthy fats, crispy skin, restaurant style in 10.", effort: "10", pantry: ["seafood"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly", "low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80" },
  { id: "m23", name: "Garlic butter shrimp", reason: "Five ingredients, sweet shrimp in a rich garlicky sauce.", effort: "10", pantry: ["seafood"], diet: ["kid-friendly"], allergies: ["dairy"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1559742811-82410b49c405?auto=format&fit=crop&w=600&q=80" },
  { id: "m24", name: "Pan-roasted pork chops", reason: "Thick, juicy chops seared with garlic and rosemary.", effort: "30", pantry: ["pork"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1432139548911-59b9dae9115f?auto=format&fit=crop&w=600&q=80" },
  { id: "m25", name: "Quick beef tacos", reason: "Warm tortillas, seasoned beef, and fresh toppings.", effort: "10", pantry: ["beef"], diet: ["kid-friendly"], allergies: ["gluten"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80" },
  { id: "m26", name: "Savory lentil stew", reason: "Warm, earthy lentils packed with vegetables and flavor.", effort: "30", pantry: ["staples", "veg"], diet: ["vegetarian", "dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
  { id: "m27", name: "Spicy peanut sesame noodles", reason: "Creamy, savory peanut sauce tossed with warm noodles and scallions.", effort: "10", pantry: ["pasta"], diet: ["vegetarian"], allergies: ["nuts", "gluten"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80" },
  { id: "m28", name: "Walnut & spinach pesto pasta", reason: "Rich, vibrant nutty pesto ready in fifteen minutes.", effort: "10", pantry: ["pasta", "veg"], diet: ["vegetarian"], allergies: ["nuts", "dairy", "gluten"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80" },
  // --- Extended Meal Library ---
  { id: "m29", name: "Slow-roasted lamb shoulder", reason: "Fork-tender lamb that practically shreds itself.", effort: "cook", pantry: ["beef"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
  { id: "m30", name: "Turkish lamb kofta", reason: "Spiced minced lamb patties, perfect over flatbread.", effort: "30", pantry: ["beef"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80" },
  { id: "m31", name: "Scrambled eggs & avocado", reason: "Creamy eggs, buttery avo — breakfast any time.", effort: "10", pantry: ["empty", "veg"], diet: ["vegetarian", "dairy-free", "kid-friendly"], allergies: ["eggs"], health: ["diabetic-friendly", "low-sodium"], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80" },
  { id: "m32", name: "Shakshuka", reason: "Poached eggs in spiced tomato sauce — one pan wonder.", effort: "30", pantry: ["veg", "empty"], diet: ["vegetarian", "dairy-free"], allergies: ["eggs"], health: ["low-sodium"], mealType: ["breakfast", "lunch"], image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80" },
  { id: "m33", name: "Fluffy pancakes", reason: "Weekend mood? Stack them high.", effort: "30", pantry: ["empty", "staples"], diet: ["vegetarian", "kid-friendly"], allergies: ["gluten", "eggs", "dairy"], health: [], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80" },
  { id: "m34", name: "Chicken tikka masala", reason: "Rich, fragrant curry that warms every corner.", effort: "cook", pantry: ["chicken"], diet: ["kid-friendly"], allergies: ["dairy"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" },
  { id: "m35", name: "Prawn pad Thai", reason: "Sweet, tangy, nutty — the classic Thai street dish.", effort: "30", pantry: ["seafood", "pasta"], diet: ["dairy-free"], allergies: ["nuts", "gluten", "eggs"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80" },
  { id: "m36", name: "Slow cooker beef stew", reason: "Set it in the morning, eat like a king at dinner.", effort: "cook", pantry: ["beef", "veg"], diet: ["dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=600&q=80" },
  { id: "m37", name: "Pork pulled buns", reason: "Sweet slow-cooked pork piled into soft buns.", effort: "cook", pantry: ["pork"], diet: ["kid-friendly"], allergies: ["gluten"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
  { id: "m38", name: "Smoked sausage & bean casserole", reason: "Hearty, smoky, satisfying — done in 30.", effort: "30", pantry: ["pork", "staples"], diet: ["dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
  { id: "m39", name: "Tuna pasta bake", reason: "Store cupboard staples, creamy oven finish.", effort: "30", pantry: ["seafood", "pasta"], diet: ["kid-friendly"], allergies: ["dairy", "gluten"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },
  { id: "m40", name: "Thai green chicken curry", reason: "Fragrant coconut broth, crisp veg, aromatic herbs.", effort: "30", pantry: ["chicken", "veg"], diet: ["dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80" },
  { id: "m41", name: "Mushroom risotto", reason: "Silky, earthy, properly comforting.", effort: "cook", pantry: ["veg", "staples"], diet: ["vegetarian"], allergies: ["dairy"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80" },
  { id: "m42", name: "Teriyaki salmon bowls", reason: "Sweet-glazed salmon over steaming rice — 20 minutes.", effort: "30", pantry: ["seafood"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly", "low-sodium"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80" },
  { id: "m43", name: "Mexican black bean quesadillas", reason: "Crispy, melty, no meat needed.", effort: "10", pantry: ["staples", "veg"], diet: ["vegetarian", "kid-friendly"], allergies: ["dairy", "gluten"], health: ["low-sodium"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80" },
  { id: "m44", name: "Honey garlic chicken drumsticks", reason: "Sticky, sweet-savory glaze that everyone fights over.", effort: "30", pantry: ["chicken"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80" },
  { id: "m45", name: "Beef burger from scratch", reason: "Juicy patty, your toppings, your rules.", effort: "30", pantry: ["beef"], diet: ["kid-friendly"], allergies: ["gluten"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
  { id: "m46", name: "Vietnamese pho broth", reason: "Deeply aromatic, restorative, surprisingly simple.", effort: "cook", pantry: ["beef", "veg"], diet: ["dairy-free"], allergies: ["gluten"], health: ["low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80" },
  { id: "m47", name: "Caprese stuffed chicken breast", reason: "Mozzarella, basil, tomato — baked to perfection.", effort: "30", pantry: ["chicken", "veg"], diet: ["kid-friendly"], allergies: ["dairy"], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=600&q=80" },
  { id: "m48", name: "Japanese gyudon (beef rice bowl)", reason: "Soy-simmered beef slices over fluffy rice — umami heaven.", effort: "30", pantry: ["beef", "staples"], diet: ["dairy-free"], allergies: ["gluten"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m49", name: "Egg fried rice with ham", reason: "The ultimate fridge-clearout meal in 15 minutes.", effort: "10", pantry: ["pork", "leftovers", "staples"], diet: ["dairy-free", "kid-friendly"], allergies: ["eggs"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80" },
  { id: "m50", name: "Minestrone soup", reason: "Hearty Italian vegetable soup — better the next day.", effort: "30", pantry: ["veg", "staples", "leftovers"], diet: ["vegetarian", "dairy-free"], allergies: ["gluten"], health: ["low-sodium", "diabetic-friendly"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80" },
  // --- Breakfast meals ---
  { id: "m51", name: "Avocado toast with poached egg", reason: "The breakfast that earned its cult status — for good reason.", effort: "10", pantry: ["empty", "veg"], diet: ["vegetarian", "dairy-free"], allergies: ["gluten", "eggs"], health: ["diabetic-friendly", "low-sodium"], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80" },
  { id: "m52", name: "Classic French omelette", reason: "Three eggs, a hot pan, three minutes of focus.", effort: "10", pantry: ["empty"], diet: ["vegetarian", "kid-friendly"], allergies: ["eggs", "dairy"], health: ["diabetic-friendly"], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80" },
  { id: "m53", name: "Overnight oats", reason: "Prep tonight, breakfast done tomorrow.", effort: "10", pantry: ["staples"], diet: ["vegetarian", "dairy-free"], allergies: ["gluten"], health: ["diabetic-friendly", "low-sodium"], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" },
  { id: "m54", name: "Breakfast burrito", reason: "Eggs, cheese, salsa — wrapped up for the morning rush.", effort: "10", pantry: ["empty"], diet: ["kid-friendly"], allergies: ["gluten", "eggs", "dairy"], health: [], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80" },
  { id: "m55", name: "Greek yogurt parfait", reason: "Creamy yogurt, granola, fresh fruit — done in two minutes.", effort: "10", pantry: ["empty", "staples"], diet: ["vegetarian", "kid-friendly"], allergies: ["dairy", "nuts", "gluten"], health: ["diabetic-friendly", "low-sodium"], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80" },
  { id: "m56", name: "Banana smoothie bowl", reason: "Thick, satisfying, no cooking required.", effort: "10", pantry: ["empty", "veg"], diet: ["vegetarian", "dairy-free", "kid-friendly"], allergies: [], health: ["low-sodium"], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" },
  { id: "m57", name: "Smashed avo on sourdough", reason: "Lemon, chilli flakes, good bread. Simple wins.", effort: "10", pantry: ["empty", "veg"], diet: ["vegetarian", "dairy-free"], allergies: ["gluten"], health: ["low-sodium", "diabetic-friendly"], mealType: ["breakfast"], image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80" },
  // --- Lunch meals ---
  { id: "m58", name: "Club sandwich", reason: "Stacked, toasted, and always satisfying.", effort: "10", pantry: ["chicken", "empty"], diet: ["kid-friendly"], allergies: ["gluten", "dairy", "eggs"], health: [], mealType: ["lunch"], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
  { id: "m59", name: "Caesar salad with croutons", reason: "Crisp romaine, punchy dressing, satisfying crunch.", effort: "10", pantry: ["empty", "veg"], diet: ["vegetarian", "kid-friendly"], allergies: ["dairy", "gluten", "eggs"], health: ["low-sodium"], mealType: ["lunch"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m60", name: "Tuna nicoise salad", reason: "French bistro vibes, no reservation required.", effort: "30", pantry: ["seafood", "veg"], diet: ["dairy-free"], allergies: ["eggs"], health: ["diabetic-friendly", "low-sodium"], mealType: ["lunch"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m61", name: "Tomato & mozzarella flatbread", reason: "Pizza vibes, no oven needed.", effort: "10", pantry: ["empty", "veg"], diet: ["vegetarian", "kid-friendly"], allergies: ["gluten", "dairy"], health: [], mealType: ["lunch"], image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80" },
  { id: "m62", name: "Lemon herb chickpea wrap", reason: "Protein-packed, fresh, and ready in ten.", effort: "10", pantry: ["empty", "veg"], diet: ["vegetarian", "dairy-free"], allergies: ["gluten"], health: ["low-sodium"], mealType: ["lunch"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" },
  { id: "m63", name: "Prawn & avocado salad", reason: "Light, fresh, and ready in minutes.", effort: "10", pantry: ["seafood", "veg"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly", "low-sodium"], mealType: ["lunch"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" },
  // --- Global Culinary Library (West Africa, East Asia, Caribbean, Latin America, Mediterranean, Middle East) ---
  { id: "m64", name: "Nigerian Jollof Rice", reason: "Rich, smoky, spicy long-grain rice  the pride of West African celebration.", effort: "30", pantry: ["staples", "veg"], diet: ["vegetarian", "dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" },
  { id: "m65", name: "Moroccan Chicken Tagine", reason: "Fragrant slow-cooked chicken with preserved lemons and green olives.", effort: "cook", pantry: ["chicken", "veg"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80" },
  { id: "m66", name: "Ethiopian Doro Wat", reason: "Spiced chicken leg stew slow-simmered in berbere and hard-boiled eggs.", effort: "cook", pantry: ["chicken"], diet: ["dairy-free"], allergies: ["eggs"], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" },
  { id: "m67", name: "South African Bobotie", reason: "Spiced minced beef baked with a golden custard topping and bay leaves.", effort: "30", pantry: ["beef"], diet: ["kid-friendly"], allergies: ["dairy", "eggs"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80" },
  { id: "m68", name: "Jamaican Jerk Chicken", reason: "Fiery, smoky marinated chicken with pimento, allspice and Scotch bonnet.", effort: "30", pantry: ["chicken"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1598103442097-8b743e2b90ce?auto=format&fit=crop&w=600&q=80" },
  { id: "m69", name: "Mexican Birria Tacos", reason: "Slow-braised spiced beef stuffed into crisp tortillas dipped in consomm.", effort: "cook", pantry: ["beef"], diet: ["kid-friendly"], allergies: ["gluten"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80" },
  { id: "m70", name: "Peruvian Lomo Saltado", reason: "High-heat stir-fried beef tenderloin with onions, tomatoes & crispy fries.", effort: "10", pantry: ["beef", "veg"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m71", name: "Brazilian Feijoada", reason: "Deep, rich black bean stew packed with smoked pork belly and garlic.", effort: "cook", pantry: ["pork", "staples"], diet: ["dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
  { id: "m72", name: "Argentinian Chimichurri Steak", reason: "Juicy seared steak slathered in fresh parsley, garlic & red wine vinegar.", effort: "10", pantry: ["beef"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly", "low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
  { id: "m73", name: "Indian Butter Chicken", reason: "Velvety, rich tomato & butter cream sauce over tender chicken morsels.", effort: "30", pantry: ["chicken"], diet: ["kid-friendly"], allergies: ["dairy"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" },
  { id: "m74", name: "Japanese Chicken Katsu Curry", reason: "Golden panko-crusted chicken cutlet served over rice with aromatic curry.", effort: "30", pantry: ["chicken", "staples"], diet: ["kid-friendly"], allergies: ["gluten", "eggs"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80" },
  { id: "m75", name: "Korean Bibimbap", reason: "Vibrant rice bowl topped with seasoned vegetables, beef, fried egg & gochujang.", effort: "30", pantry: ["beef", "veg", "leftovers"], diet: ["dairy-free"], allergies: ["eggs"], health: ["diabetic-friendly"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m76", name: "Indonesian Nasi Goreng", reason: "Aromatic sweet soy & chili fried rice topped with a crispy sunny-side egg.", effort: "10", pantry: ["leftovers", "staples"], diet: ["dairy-free"], allergies: ["eggs"], health: [], mealType: ["breakfast", "lunch"], image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80" },
  { id: "m77", name: "Filipino Chicken Adobo", reason: "Tender chicken braised in garlic, cane vinegar, soy sauce and peppercorns.", effort: "30", pantry: ["chicken"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80" },
  { id: "m78", name: "Thai Tom Yum Goong", reason: "Tangy, spicy lemongrass broth loaded with juicy prawns & mushrooms.", effort: "10", pantry: ["seafood", "veg"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly", "low-sodium"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1559742811-82410b49c405?auto=format&fit=crop&w=600&q=80" },
  { id: "m79", name: "Vietnamese Lemongrass Beef Bun", reason: "Cool rice noodles topped with warm lemongrass beef, fresh herbs & crushed peanuts.", effort: "30", pantry: ["beef", "pasta", "veg"], diet: ["dairy-free"], allergies: ["nuts"], health: ["diabetic-friendly"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80" },
  { id: "m80", name: "Lebanese Falafel Wrap", reason: "Crispy herb chickpea patties wrapped in warm pita with tahini & tangy pickles.", effort: "10", pantry: ["staples", "veg"], diet: ["vegetarian", "dairy-free"], allergies: ["gluten"], health: ["low-sodium"], mealType: ["lunch"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" },
  { id: "m81", name: "Turkish Lamb Doner Bowl", reason: "Savoury spiced lamb slices served over garlic grain pilaf with sumac onions.", effort: "30", pantry: ["beef", "staples"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80" },
  { id: "m82", name: "Greek Moussaka", reason: "Comforting layers of roasted eggplant, spiced lamb sauce & rich creamy bchamel.", effort: "cook", pantry: ["beef", "veg"], diet: ["kid-friendly"], allergies: ["dairy", "gluten", "eggs"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80" },
  { id: "m83", name: "Spanish Seafood Paella", reason: "Golden saffron rice studded with prawns, squid, mussels & sweet bell peppers.", effort: "cook", pantry: ["seafood", "staples"], diet: ["dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80" },
  { id: "m84", name: "French Coq au Vin", reason: "Rustic French chicken braised in red wine, smoky bacon & mushrooms.", effort: "cook", pantry: ["chicken", "pork"], diet: ["dairy-free"], allergies: [], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=600&q=80" },
  { id: "m85", name: "Hungarian Beef Goulash", reason: "Rich, paprika-scented stew of tender beef onions and sweet bell peppers.", effort: "cook", pantry: ["beef", "veg"], diet: ["dairy-free"], allergies: [], health: ["low-sodium"], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=600&q=80" },
  { id: "m86", name: "Italian Pasta Carbonara", reason: "Silky sauce of fresh egg yolks, pecorino cheese & crispy guanciale over pasta.", effort: "10", pantry: ["pasta", "pork"], diet: ["kid-friendly"], allergies: ["dairy", "gluten", "eggs"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80" },
  { id: "m87", name: "Southern American Gumbo", reason: "Deep-flavored Cajun roux stew with smoked sausage, chicken & okra.", effort: "cook", pantry: ["chicken", "pork"], diet: ["dairy-free"], allergies: ["gluten"], health: [], mealType: ["dinner"], image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
  { id: "m88", name: "Mexican Chiles Rellenos", reason: "Fire-roasted poblano peppers filled with melty cheese in a light tomato broth.", effort: "30", pantry: ["veg"], diet: ["vegetarian", "kid-friendly"], allergies: ["dairy", "eggs"], health: [], mealType: ["lunch", "dinner"], image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80" },
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
  m26: { time: "35 min", ingredients: ["1 cup brown lentils", "1 onion, diced", "2 carrots, sliced", "4 cups vegetable stock", "1 can diced tomatoes"], steps: ["Sauté onion and carrots in a pot with olive oil for 5 minutes.", "Add rinsed lentils, diced tomatoes, and vegetable stock to the pot.", "Bring to a boil, then reduce heat and simmer covered for 25 minutes.", "Season to taste with salt, pepper, and fresh spinach if available."], durations: [300, 120, 1500, 60] },
  m27: { time: "10 min", ingredients: ["200g ramen or egg noodles", "3 tbsp smooth peanut butter", "1 tbsp soy sauce", "1 tbsp sesame oil", "1 tsp chili crisp", "2 scallions, sliced"], steps: ["Cook noodles in boiling water according to package instructions, reserving 1/4 cup pasta water.", "Whisk peanut butter, soy sauce, sesame oil, chili crisp, and warm pasta water into a smooth creamy sauce.", "Toss drained noodles with sauce until completely coated.", "Garnish with sliced scallions and toasted sesame seeds."], durations: [300, 120, 120, 60] },
  m28: { time: "15 min", ingredients: ["250g pasta", "1/2 cup walnuts, toasted", "2 cups baby spinach", "1/3 cup grated parmesan", "1/3 cup olive oil", "1 clove garlic"], steps: ["Boil pasta in salted water until al dente.", "Pulse toasted walnuts, spinach, garlic, parmesan, and olive oil in a food processor until smooth.", "Drain pasta, reserving 2 tbsp cooking water.", "Toss hot pasta with walnut pesto and reserved water until glossy."], durations: [480, 180, 60, 120] },
  m29: { time: "3 hr 30 min", ingredients: ["1.5kg lamb shoulder", "4 garlic cloves, slivered", "2 tbsp olive oil", "1 tbsp rosemary, chopped", "Salt & pepper"], steps: ["Heat oven to 325°F. Score lamb all over and insert garlic slivers.", "Rub with olive oil, rosemary, salt and pepper.", "Place on a rack in a roasting tin, cover tightly with foil.", "Roast 3–3.5 hrs until meat falls from the bone; rest 20 min before shredding."], durations: [600, 300, 60, 10800] },
  m30: { time: "25 min", ingredients: ["500g ground lamb", "1 tsp cumin", "1 tsp coriander", "1/2 tsp paprika", "Salt & pepper", "4 flatbreads"], steps: ["Mix lamb with spices, salt and pepper; shape into 8 oval patties.", "Grill or fry on medium-high heat 4 min per side.", "Warm flatbreads alongside.", "Serve kofta on flatbreads with yogurt and fresh salad."], durations: [300, 480, 180, 60] },
  m31: { time: "8 min", ingredients: ["3 eggs", "1 ripe avocado", "1 tbsp butter", "Salt, pepper & chili flakes"], steps: ["Halve and scoop avocado; season with salt and a squeeze of lemon.", "Melt butter in a non-stick pan over low heat.", "Add eggs and scramble slowly, pulling curds with a spatula.", "Pile onto toast, top with avocado and chili flakes."], durations: [120, 60, 300, 60] },
  m32: { time: "25 min", ingredients: ["1 can crushed tomatoes", "1 onion, diced", "2 garlic cloves", "1 tsp cumin & paprika", "4 eggs", "Feta to crumble"], steps: ["Sauté onion and garlic in olive oil 5 min until soft.", "Add spices, cook 1 min, then add crushed tomatoes; simmer 10 min.", "Make 4 wells in the sauce and crack in the eggs.", "Cover and cook 5–6 min until whites are set; top with feta and fresh herbs."], durations: [300, 660, 60, 360] },
  m33: { time: "20 min", ingredients: ["1½ cups flour", "1 tbsp baking powder", "1 tbsp sugar", "1 egg, 1 cup milk, 2 tbsp butter"], steps: ["Whisk flour, baking powder, sugar and a pinch of salt together.", "Beat egg with milk and melted butter; fold into dry ingredients until just combined — lumps are fine.", "Heat a buttered non-stick pan over medium heat.", "Cook pancakes 2–3 min per side until bubbles form on top; serve stacked with syrup."], durations: [120, 120, 60, 600] },
  m34: { time: "45 min", ingredients: ["600g chicken thighs, cubed", "1 can crushed tomatoes", "150ml heavy cream", "2 tbsp tikka spice paste", "1 onion, garlic, ginger"], steps: ["Marinate chicken in half the tikka paste 10 min.", "Sear chicken in a hot pan until charred, set aside.", "Sauté onion, garlic and ginger; add remaining paste and tomatoes.", "Return chicken, pour in cream, simmer 20 min until rich and thick."], durations: [600, 300, 300, 1200] },
  m35: { time: "25 min", ingredients: ["250g rice noodles", "300g prawns, peeled", "3 tbsp tamarind paste", "2 tbsp fish sauce", "2 eggs, 100g beansprouts", "Lime, peanuts, chili"], steps: ["Soak noodles in warm water 10 min, drain.", "Stir-fry prawns in a hot wok 2 min, push aside.", "Crack in eggs, scramble lightly, then toss with noodles.", "Add tamarind, fish sauce and beansprouts; toss 2 min on high heat; top with peanuts and lime."], durations: [600, 120, 120, 120] },
  m36: { time: "3 hr", ingredients: ["800g beef chuck, cubed", "3 carrots, 3 potatoes, chopped", "1 onion, 3 garlic cloves", "2 cups beef stock", "2 tbsp tomato paste"], steps: ["Brown beef in batches in oil; transfer to slow cooker.", "Sauté onion and garlic, add tomato paste, cook 1 min.", "Add all veg, stock and the beef; stir to combine.", "Cook on high 3 hrs or low 6 hrs until beef is fork-tender."], durations: [300, 180, 60, 10800] },
  m37: { time: "4 hr", ingredients: ["1.2kg pork shoulder", "3 tbsp BBQ sauce", "1 tsp smoked paprika", "Salt & pepper", "8 soft buns, coleslaw"], steps: ["Rub pork all over with paprika, salt and pepper.", "Slow-cook at 300°F in a covered dish with 1/2 cup water for 4 hrs.", "Shred pork with two forks; mix in BBQ sauce.", "Pile into buns and top with coleslaw."], durations: [300, 60, 14400, 120] },
  m38: { time: "30 min", ingredients: ["400g smoked sausage, sliced", "2 cans cannellini beans", "1 can chopped tomatoes", "1 tsp smoked paprika", "2 garlic cloves"], steps: ["Brown sausage slices in a casserole dish over medium heat.", "Add garlic and paprika; cook 1 min.", "Pour in tomatoes and beans; stir to combine.", "Simmer 20 min until thick and bubbling; season and serve with crusty bread."], durations: [180, 60, 120, 1200] },
  m39: { time: "30 min", ingredients: ["250g pasta", "2 cans tuna, drained", "1 can cream of mushroom soup", "100g frozen peas", "1 cup grated cheddar"], steps: ["Cook pasta 2 min under package time; drain.", "Mix pasta, tuna, soup and peas in a baking dish.", "Top generously with grated cheddar.", "Bake at 375°F for 20 min until golden and bubbling."], durations: [480, 120, 60, 1200] },
  m40: { time: "30 min", ingredients: ["4 chicken thighs, boneless", "1 can coconut milk", "2 tbsp green curry paste", "1 cup green beans", "1 lime, fish sauce, basil"], steps: ["Fry green curry paste in a pan for 1 min.", "Add coconut milk and bring to a gentle simmer.", "Add chicken and green beans; cook 15 min until chicken is cooked through.", "Finish with lime juice, fish sauce and fresh Thai basil; serve with jasmine rice."], durations: [60, 120, 900, 60] },
  m41: { time: "50 min", ingredients: ["350g arborio rice", "250g mushrooms, sliced", "1 onion, 2 garlic cloves", "1L warm vegetable stock", "60g parmesan, 50g butter"], steps: ["Sauté onion and garlic in butter; add mushrooms and cook until golden.", "Add rice and toast 2 min, then add a ladle of warm stock.", "Keep adding stock ladle by ladle, stirring constantly, 20–25 min.", "Off heat, stir in parmesan and remaining butter; rest 2 min before serving."], durations: [300, 120, 1500, 120] },
  m42: { time: "20 min", ingredients: ["2 salmon fillets", "3 tbsp soy sauce", "2 tbsp mirin", "1 tbsp honey", "Steamed rice, sesame seeds"], steps: ["Whisk soy, mirin and honey into a teriyaki glaze.", "Sear salmon in a lightly oiled pan 3 min per side.", "Pour glaze over and cook 1 min more, spooning over the fish.", "Serve over rice with a sprinkle of sesame seeds."], durations: [60, 360, 60, 60] },
  m43: { time: "15 min", ingredients: ["1 can black beans, drained", "4 large tortillas", "1 cup shredded cheese", "1 tsp cumin & smoked paprika", "Salsa and sour cream"], steps: ["Mash half the beans; stir in spices and whole beans.", "Spread bean mix over half of each tortilla; top with cheese and fold.", "Cook in a dry pan 2–3 min per side until crispy and golden.", "Serve with salsa and sour cream."], durations: [120, 120, 300, 60] },
  m44: { time: "40 min", ingredients: ["8 chicken drumsticks", "3 tbsp honey", "3 garlic cloves, minced", "2 tbsp soy sauce", "1 tbsp olive oil"], steps: ["Mix honey, garlic, soy sauce and oil into a glaze.", "Toss drumsticks in glaze; marinate 10 min.", "Roast at 425°F for 30 min, turning and basting halfway.", "Rest 5 min; serve with the pan juices drizzled over."], durations: [600, 60, 1800, 300] },
  m45: { time: "20 min", ingredients: ["500g ground beef (80% lean)", "4 burger buns", "Salt & pepper", "Cheese, lettuce, tomato, onion"], steps: ["Divide beef into 4 patties; press a thumb indent in the center.", "Season both sides generously with salt and pepper.", "Cook on a hot griddle or pan 3–4 min per side for medium.", "Rest 2 min; build burgers with cheese and your favorite toppings."], durations: [120, 60, 420, 120] },
  m46: { time: "3 hr 30 min", ingredients: ["1kg beef bones", "1 onion & 4 garlic cloves, charred", "2 star anise, 3 cloves, 1 cinnamon stick", "Fish sauce & sugar to season", "250g rice noodles, beef slices, herbs"], steps: ["Char onion and garlic directly over flame or under broiler.", "Simmer bones 3 hrs with star anise, cloves, cinnamon and charred aromatics.", "Strain broth; season with fish sauce, sugar and salt.", "Soak noodles, divide into bowls; ladle hot broth over thin beef slices and top with bean sprouts, basil and lime."], durations: [300, 10800, 300, 120] },
  m47: { time: "35 min", ingredients: ["4 chicken breasts", "100g mozzarella, sliced", "8 cherry tomatoes, halved", "Fresh basil", "Salt, pepper, olive oil"], steps: ["Cut a deep pocket into each chicken breast.", "Stuff with mozzarella, tomatoes and basil; secure with a toothpick.", "Sear in an oven-safe pan 3 min per side until golden.", "Transfer to 400°F oven; bake 18–20 min until cooked through."], durations: [180, 120, 180, 1200] },
  m48: { time: "20 min", ingredients: ["300g thinly sliced beef (rib-eye or sirloin)", "1 onion, thinly sliced", "3 tbsp soy sauce", "1 tbsp sugar, 1 tbsp mirin", "Steamed rice, pickled ginger"], steps: ["Combine soy sauce, sugar, mirin and 1/4 cup water in a pan.", "Add onion and simmer 5 min until softened.", "Add beef slices and cook 3–4 min, turning once.", "Serve over steamed rice; top with pickled ginger."], durations: [60, 300, 240, 60] },
  m49: { time: "15 min", ingredients: ["2 cups cold cooked rice", "100g cooked ham, diced", "3 eggs", "2 tbsp soy sauce", "1 tbsp sesame oil, scallions"], steps: ["Beat eggs and pour into a hot oiled wok; scramble lightly and push to the side.", "Add diced ham, stir-fry 1 min.", "Add cold rice, breaking clumps, and fry on high heat 3 min.", "Add soy sauce and sesame oil; toss everything together; top with scallions."], durations: [60, 60, 180, 60] },
  m50: { time: "35 min", ingredients: ["1 can cannellini beans", "2 carrots, 2 celery stalks, 1 zucchini, diced", "1 can diced tomatoes", "1L vegetable stock", "100g small pasta, parmesan rind"], steps: ["Sauté carrot and celery in olive oil 5 min.", "Add zucchini, tomatoes and stock; bring to a boil.", "Add beans, pasta and parmesan rind; simmer 12 min.", "Remove rind, season well; serve with grated parmesan and crusty bread."], durations: [300, 120, 720, 60] },
  m51: { time: "25 min", ingredients: ["200g halloumi, sliced", "2 pita breads", "1 cup cherry tomatoes, halved", "1 cucumber, diced", "2 tbsp olive oil & oregano"], steps: ["Pan-fry halloumi slices in a dry skillet over medium-high heat for 2 min per side until golden brown.", "Warm pita breads in oven or toaster.", "Toss cherry tomatoes and cucumber with olive oil, oregano, salt, and pepper.", "Fill pitas with golden halloumi and fresh salad, serve immediately."], durations: [240, 120, 180, 120] },
  m52: { time: "20 min", ingredients: ["2 slices sourdough", "1 ripe avocado, mashed", "2 eggs", "1 tbsp chili flakes", "Lemon juice, salt"], steps: ["Toast sourdough slices until golden and crisp.", "Mash avocado with lemon juice, salt, and pepper.", "Poach or fry eggs to desired soft yolk.", "Spread avocado on toast, top with eggs, and sprinkle with chili flakes."], durations: [180, 120, 240, 60] },
  m53: { time: "15 min", ingredients: ["2 cups spinach & mixed greens", "1 green apple, sliced", "½ cup walnuts", "100g goat cheese", "2 tbsp vinaigrette"], steps: ["Wash and dry mixed greens, place in a large bowl.", "Slice green apple thinly and crumble goat cheese.", "Toast walnuts in a dry pan for 2 min until fragrant.", "Toss greens, apples, walnuts, and goat cheese with vinaigrette."], durations: [120, 120, 120, 120] },
  m54: { time: "30 min", ingredients: ["1 small pumpkin/squash, cubed", "1 onion, chopped", "2 garlic cloves", "3 cups vegetable broth", "½ cup cream or coconut milk"], steps: ["Sauté onion and garlic in olive oil for 4 min until soft.", "Add cubed pumpkin and broth, bring to a boil, then simmer 20 min until soft.", "Puree soup with a blender until smooth and creamy.", "Stir in cream/coconut milk, season with nutmeg, salt, and pepper."], durations: [240, 1200, 180, 120] },
  m55: { time: "25 min", ingredients: ["200g soba noodles", "1 cup edamame, cooked", "1 cucumber, julienned", "2 tbsp sesame oil", "2 tbsp soy sauce & ginger"], steps: ["Boil soba noodles for 4-5 min, drain and rinse under cold water.", "Whisk sesame oil, soy sauce, grated ginger, and rice vinegar.", "Combine chilled noodles, edamame, and cucumber in a bowl.", "Pour sesame ginger dressing over noodles and toss."], durations: [300, 180, 120, 120] },
  m56: { time: "35 min", ingredients: ["2 cans black beans", "1 onion, diced", "2 garlic cloves", "1 tsp cumin & oregano", "Cooked white rice"], steps: ["Sauté onion and garlic in oil for 5 min.", "Add black beans (with liquid), cumin, oregano, and salt.", "Simmer on low heat for 20-25 min, mashing some beans to thicken.", "Serve hot over steamed white rice with fresh cilantro."], durations: [300, 1200, 120, 120] },
  m57: { time: "20 min", ingredients: ["4 large eggs", "1 cup cherry tomatoes", "½ cup feta cheese", "1 tbsp olive oil", "Fresh basil"], steps: ["Whisk eggs with salt and pepper.", "Heat oil in an oven-safe skillet, cook cherry tomatoes for 3 min.", "Pour eggs over tomatoes, sprinkle feta on top.", "Cook on stovetop for 3 min, then broiler for 3 min until set."], durations: [120, 180, 180, 180] },
  m58: { time: "25 min", ingredients: ["1 block firm tofu, cubed", "2 cups broccoli florets", "2 tbsp peanut butter", "2 tbsp soy sauce", "1 tbsp maple syrup"], steps: ["Press and cube tofu, pan-fry in oil for 8 min until crispy.", "Steam or stir-fry broccoli florets for 4 min.", "Whisk peanut butter, soy sauce, maple syrup, and warm water for sauce.", "Combine tofu, broccoli, and peanut sauce in pan and toss."], durations: [480, 240, 120, 120] },
  m59: { time: "30 min", ingredients: ["2 eggplant, sliced", "2 tomatoes, sliced", "2 zucchini, sliced", "2 tbsp olive oil", "Garlic & thyme"], steps: ["Preheat oven to 375°F (190°C).", "Arrange alternating slices of eggplant, tomato, and zucchini in a baking dish.", "Drizzle generously with olive oil, minced garlic, thyme, salt, and pepper.", "Bake covered for 20 min, then uncovered for 10 min."], durations: [300, 300, 1200, 600] },
  m60: { time: "20 min", ingredients: ["1 package rice paper wrappers", "1 cup cooked vermicelli", "1 cup shredded lettuce & mint", "Cooked shrimp or tofu"], steps: ["Dip rice paper wrapper in warm water for 5 seconds until soft.", "Lay flat, place lettuce, mint, vermicelli, and shrimp/tofu in middle.", "Fold bottom over filling, roll tightly, tucking in sides.", "Serve fresh with peanut dipping sauce."], durations: [60, 240, 180, 120] },
  m61: { time: "25 min", ingredients: ["200g soba or udon noodles", "1 cup kimchi, chopped", "1 tbsp gochujang", "1 egg", "Green onions"], steps: ["Boil noodles according to package, drain.", "Sauté kimchi and gochujang paste in sesame oil for 3 min.", "Toss noodles with kimchi sauce until hot.", "Top with a fried egg and sliced green onions."], durations: [300, 180, 120, 120] },
  m62: { time: "35 min", ingredients: ["1 can chickpeas, drained", "1 small cauliflower, chopped", "2 tbsp olive oil", "1 tsp paprika & cumin", "Tahini dressing"], steps: ["Preheat oven to 400°F (200°C).", "Toss chickpeas and cauliflower with oil, paprika, cumin, and salt.", "Roast on a baking sheet for 25 min until golden and crispy.", "Drizzle with tahini dressing before serving."], durations: [300, 1500, 60, 60] },
  m63: { time: "15 min", ingredients: ["1 can tuna", "2 tbsp mayonnaise", "4 slices bread", "2 slices cheddar cheese", "Butter"], steps: ["Mix canned tuna with mayonnaise, salt, and pepper.", "Spread tuna mix on bread slices, top with cheddar cheese.", "Butter the outside of the sandwiches.", "Grill in a skillet for 3-4 min per side until cheese melts."], durations: [120, 120, 60, 240] },
  m64: { time: "35 min", ingredients: ["2 cups rice", "400g chicken or beef, cubed", "2 tbsp tomato paste", "1 onion, diced", "1 cup vegetable oil"], steps: ["Blend tomatoes, red peppers, and onions into a smooth puree.", "Sauté onions in hot oil, add tomato paste and stir-fry 5 min.", "Pour in blended mixture and cook 15 min until reduced.", "Add rice, stock, and seasoning; cover tightly and cook on low heat for 20 min."], durations: [300, 300, 900, 1200] },
  m65: { time: "40 min", ingredients: ["500g chicken thighs", "2 tbsp Moroccan spices (ras el hanout)", "1 onion, 2 garlic cloves", "1 cup chicken stock", "½ cup olives & preserved lemon"], steps: ["Rub chicken thighs with Moroccan spices, salt, and olive oil.", "Sauté onion and garlic in a tagine or heavy pot until soft.", "Add chicken, stock, olives, and preserved lemon slices.", "Cover and simmer on low heat for 30 min until chicken is tender."], durations: [300, 300, 1800, 120] },
  m66: { time: "50 min", ingredients: ["600g chicken pieces", "3 tbsp berbere spice blend", "2 onions, finely chopped", "2 tbsp niter kibbeh (spiced butter)", "4 hard-boiled eggs"], steps: ["Slow-cook chopped onions in dry pot for 15 min until sweet.", "Add spiced butter, garlic, ginger, and berbere spice; sauté 5 min.", "Add chicken pieces and water; simmer covered for 25 min.", "Add hard-boiled eggs, simmer 5 min more, and serve with injera."], durations: [900, 300, 1500, 300] },
  m67: { time: "45 min", ingredients: ["500g ground beef or lamb", "1 cup milk", "2 slices bread", "1 onion, 2 tbsp curry powder", "½ cup raisins, 2 eggs"], steps: ["Soak bread in milk, mash fine; sauté onion and curry powder.", "Combine ground meat, soaked bread, onions, raisins, and chutney.", "Press mixture into a baking dish.", "Whisk eggs with remaining milk, pour on top, bake at 350°F for 35 min."], durations: [300, 300, 120, 2100] },
  m68: { time: "35 min", ingredients: ["500g chicken thighs, cubed", "3 tbsp jerk seasoning paste", "1 tbsp lime juice", "2 tbsp brown sugar", "Soy sauce & thyme"], steps: ["Marinate chicken in jerk paste, lime juice, brown sugar, and soy sauce.", "Preheat grill or grill pan over medium-high heat.", "Grill chicken for 6-8 min per side until charred and cooked through.", "Rest 5 min before serving with rice and peas."], durations: [600, 120, 480, 300] },
  m69: { time: "45 min", ingredients: ["600g beef chuck", "3 dried guajillo chilies", "2 dried ancho chilies", "3 garlic cloves, cumin", "Corn tortillas & cilantro"], steps: ["Deseed and boil dried chilies, then blend with garlic, cumin, and vinegar.", "Marinate beef cubes in chili marinade.", "Braise beef in a pot with broth for 35 min until shreddable.", "Shred beef, dip tortillas in consommé, fry, fill with beef and cheese."], durations: [600, 300, 2100, 300] },
  m70: { time: "25 min", ingredients: ["400g beef sirloin, strips", "1 red onion, wedged", "2 tomatoes, wedged", "2 tbsp soy sauce & red wine vinegar", "French fries"], steps: ["Stir-fry beef strips in a piping hot wok for 3 min, set aside.", "Sauté red onions and tomatoes over high heat for 2 min.", "Add soy sauce, vinegar, and beef back to wok; toss 1 min.", "Serve hot alongside or mixed with crispy French fries."], durations: [180, 120, 60, 120] },
  m71: { time: "1 hr 15 min", ingredients: ["1 can black beans", "200g smoked sausage, sliced", "200g pork shoulder, cubed", "1 onion, 3 garlic cloves", "Orange zest"], steps: ["Sauté smoked sausage, pork, onion, and garlic in a heavy pot.", "Add black beans, water, bay leaf, and orange zest.", "Simmer on low heat for 55 min until rich and thick.", "Serve hot with white rice, farofa, and orange slices."], durations: [300, 180, 3300, 120] },
  m72: { time: "20 min", ingredients: ["400g flank steak", "½ cup parsley, finely chopped", "3 garlic cloves, minced", "2 tbsp oregano", "⅓ cup olive oil, 2 tbsp red wine vinegar"], steps: ["Whisk parsley, garlic, oregano, olive oil, vinegar, salt, and red pepper flakes.", "Season steak generously with salt and black pepper.", "Grill or sear steak in a hot skillet for 4-5 min per side.", "Slice steak against the grain and spoon chimichurri over top."], durations: [300, 120, 300, 120] },
  m73: { time: "30 min", ingredients: ["500g chicken breast, cubed", "2 tbsp butter", "1 tbsp garram masala", "1 cup tomato puree", "½ cup heavy cream"], steps: ["Sear chicken pieces in butter until lightly browned.", "Add tomato puree, garlic, ginger, and garam masala; simmer 15 min.", "Stir in heavy cream and 1 tbsp butter; simmer on low for 5 min.", "Serve rich curry over warm basmati rice or with naan."], durations: [300, 900, 300, 60] },
  m74: { time: "25 min", ingredients: ["4 chicken cutlets", "1 cup panko breadcrumbs", "1 egg, ½ cup flour", "Japanese curry roux block", "Potatoes & carrots"], steps: ["Dredge chicken cutlets in flour, beaten egg, then panko breadcrumbs.", "Deep fry cutlets in oil at 340°F for 5-6 min until golden; drain.", "Boil potatoes and carrots in water, add curry roux block and melt.", "Slice katsu cutlet, lay over rice, and spoon curry sauce beside it."], durations: [300, 360, 480, 120] },
  m75: { time: "25 min", ingredients: ["2 cups cooked rice", "100g beef strips", "1 cup spinach & bean sprouts", "1 egg", "2 tbsp gochujang paste"], steps: ["Sauté beef strips in sesame oil and soy sauce.", "Blanch spinach and bean sprouts; sauté sliced carrots and mushrooms.", "Place warm rice in a bowl, arrange vegetables and beef on top.", "Top with a fried egg and gochujang paste, mix thoroughly before eating."], durations: [180, 240, 120, 60] },
  m76: { time: "20 min", ingredients: ["3 cups cold cooked rice", "2 tbsp sweet soy sauce (kecap manis)", "1 tbsp chili paste", "1 egg, 2 garlic cloves", "Chicken or shrimp"], steps: ["Heat oil in wok, fry garlic, chili paste, and chicken/shrimp 3 min.", "Add cold rice, kecap manis, and soy sauce; stir-fry vigorously 4 min.", "Fry an egg sunny-side up in a separate pan.", "Plate fried rice, top with fried egg and cucumber slices."], durations: [180, 240, 120, 60] },
  m77: { time: "30 min", ingredients: ["500g chicken thighs, cut", "⅓ cup soy sauce", "⅓ cup cane vinegar", "4 garlic cloves, crushed", "2 bay leaves & black peppercorns"], steps: ["Combine chicken, soy sauce, vinegar, garlic, bay leaves, and peppercorns in pot.", "Bring to a boil, then cover and simmer 20 min until tender.", "Remove chicken and sear in a hot skillet for 3 min until browned.", "Reduce remaining marinade into a glaze, pour over browned chicken."], durations: [120, 1200, 180, 180] },
  m78: { time: "20 min", ingredients: ["250g jumbo shrimp", "2 lemongrass stalks, bruised", "3 kaffir lime leaves", "2 tbsp Tom Yum paste", "Mushrooms & lime juice"], steps: ["Boil water or broth with lemongrass, lime leaves, and galangal for 5 min.", "Stir in Tom Yum paste and sliced mushrooms; simmer 3 min.", "Add shrimp and cook for 2-3 min until pink.", "Remove from heat, stir in lime juice and fish sauce, garnish with cilantro."], durations: [300, 180, 180, 60] },
  m79: { time: "25 min", ingredients: ["300g flank steak, sliced", "2 lemongrass stalks, minced", "2 tbsp fish sauce", "Rice vermicelli noodles", "Fresh mint, cucumber, peanuts"], steps: ["Marinate steak strips in minced lemongrass, garlic, fish sauce, and sugar.", "Cook vermicelli noodles, drain and place in bowls.", "Stir-fry steak in a hot skillet for 3-4 min.", "Top noodles with steak, fresh mint, cucumber, and crushed peanuts."], durations: [300, 180, 240, 120] },
  m80: { time: "20 min", ingredients: ["1 can chickpeas, drained", "½ cup parsley & cilantro", "3 garlic cloves", "1 tsp cumin & coriander", "Pita & tahini sauce"], steps: ["Pulse chickpeas, herbs, garlic, spices, and 2 tbsp flour in a food processor.", "Form mixture into small patties or balls.", "Deep-fry or pan-fry in hot oil for 3-4 min per side until golden brown.", "Serve in pita bread with tahini sauce and tomatoes."], durations: [300, 120, 240, 60] },
  m81: { time: "25 min", ingredients: ["400g lamb or chicken strips", "2 tbsp shawarma spice blend", "3 garlic cloves, minced", "Flatbreads", "Garlic sauce (toum) & pickles"], steps: ["Toss lamb/chicken strips with shawarma spices, garlic, lemon, and oil.", "Sear in a hot cast-iron skillet for 6-8 min until charred.", "Warm flatbreads on grill or pan.", "Spread garlic sauce on bread, add meat, pickles, and roll tightly."], durations: [300, 480, 60, 120] },
  m82: { time: "50 min", ingredients: ["2 large eggplants, sliced", "300g ground lamb or beef", "1 can tomato sauce", "2 tbsp flour, 2 tbsp butter", "1 cup milk (for béchamel)"], steps: ["Salt and roast eggplant slices at 400°F for 20 min.", "Sauté ground meat with onion, garlic, and tomato sauce for 15 min.", "Make béchamel sauce by whisking butter, flour, and milk until thick.", "Layer eggplant and meat in dish, top with béchamel, bake 25 min."], durations: [1200, 900, 300, 1500] },
  m83: { time: "40 min", ingredients: ["300g bomba rice", "200g shrimp & squid", "1 pinch saffron threads", "3 cups fish stock", "1 red bell pepper, diced"], steps: ["Warm fish stock with saffron threads in a saucepan.", "Sauté bell pepper and seafood in a paella pan, remove seafood.", "Add rice and tomato paste, stir 2 min, then pour in saffron stock.", "Simmer undisturbed 18 min, return seafood on top, rest 5 min."], durations: [300, 240, 1080, 300] },
  m84: { time: "1 hr 10 min", ingredients: ["600g chicken thighs", "2 cups red wine (or beef stock)", "150g bacon lardons", "200g mushrooms, halved", "2 tbsp butter & flour"], steps: ["Fry bacon lardons until crispy, set aside; sear chicken in bacon fat.", "Add mushrooms and onions to pan, cook 5 min.", "Pour in red wine/stock and herbs, simmer covered 45 min.", "Thicken sauce with butter-flour paste and serve."], durations: [300, 300, 2700, 300] },
  m85: { time: "1 hr 30 min", ingredients: ["600g beef chuck, cubed", "2 onions, 2 bell peppers, chopped", "2 tbsp sweet Hungarian paprika", "3 cups beef broth", "Caraway seeds"], steps: ["Sauté onions in lard or oil until golden, stir in sweet paprika.", "Add beef cubes, caraway seeds, salt, and broth; cover and simmer 1 hr.", "Add chopped bell peppers and potatoes; simmer 20 min more.", "Serve hot with crusty bread or egg noodles."], durations: [300, 3600, 1200, 120] },
  m86: { time: "20 min", ingredients: ["250g spaghetti", "150g pancetta or bacon, diced", "2 large eggs + 1 yolk", "50g Pecorino Romano, grated", "Black pepper"], steps: ["Boil spaghetti in salted water until al dente.", "Crisp pancetta in a skillet over medium heat for 5 min.", "Whisk eggs, yolk, and grated cheese together in a bowl.", "Toss drained pasta with pancetta, remove from heat, stir in egg mix until creamy."], durations: [600, 300, 120, 120] },
  m87: { time: "40 min", ingredients: ["400g chicken or shrimp", "1 cup holy trinity (onion, celery, bell pepper)", "2 tbsp flour, 2 tbsp oil (roux)", "2 cups chicken stock", "1 tsp Cajun seasoning"], steps: ["Make dark roux by stirring flour and oil over medium heat for 15 min.", "Add onion, celery, and bell pepper; cook 5 min until soft.", "Pour in stock and Cajun seasoning, simmer 15 min.", "Add chicken/shrimp, cook 5 min, and serve over rice."], durations: [900, 300, 900, 300] },
  m88: { time: "35 min", ingredients: ["4 poblano peppers", "300g ground pork or beef", "1 can tomato sauce", "½ cup raisins & almonds", "2 eggs (for batter)"], steps: ["Roast poblanos over flame, peel skin, and slit open.", "Sauté ground meat with diced onions, raisins, and almonds.", "Stuff poblanos with meat mixture.", "Dip in beaten egg batter, fry 3 min per side until golden."], durations: [600, 600, 300, 360] }
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


// ---------- Interactive Kitchen Setting for "Chef Elo Says" ----------
function ChefEloKitchenStage({ stepText, currentStep, totalSteps, isVoiceActive, onToggleVoice, lang = "en", t }) {
  // Local safety fallback for translation helper t
  const translate = t || ((key, fallback = "") => (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS.en && TRANSLATIONS.en[key]) || fallback || key);
  // Helper to speak text with proper browser voice & language
  const speakText = (textToSpeak) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      const langTags = {
        en: "en-US",
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        it: "it-IT",
        pt: "pt-PT",
        zh: "zh-CN",
        ja: "ja-JP",
        ar: "ar-SA"
      };
      const targetLang = langTags[lang] || "en-US";
      utterance.lang = targetLang;

      // Select consistent MALE voice matching language
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const maleVoice = voices.find(v => 
          v.lang.startsWith(targetLang.slice(0, 2)) && 
          /male|david|george|thomas|henri|jorge|daniel|nicolas|stefan|diego|paul|gilles|remy|bruno/i.test(v.name)
        ) || voices.find(v => v.lang.startsWith(targetLang.slice(0, 2)));

        if (maleVoice) {
          utterance.voice = maleVoice;
        }
      }

      // Rich, warm, masculine voice timbre pitch & rate
      utterance.pitch = 0.86;
      utterance.rate = 0.95;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  };

  useEffect(() => {
    if (isVoiceActive && stepText) {
      speakText("Step " + currentStep + ". " + stepText);
    } else if (!isVoiceActive && typeof window !== "undefined" && "speechSynthesis" in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }, [stepText, currentStep, isVoiceActive]);

  const handleVoiceToggle = () => {
    const nextState = !isVoiceActive;
    onToggleVoice();
    if (nextState) {
      speakText("Voice guidance active. Step " + currentStep + ". " + stepText);
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
    }
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      background: "linear-gradient(180deg, #13241E 0%, #1A2D26 100%)",
      borderRadius: 24,
      border: "1px solid #2B4239",
      padding: "24px 20px 20px",
      overflow: "hidden",
      boxShadow: "none"
    }}>
      {/* Kitchen Background Details (Hanging Utensils & Warm Lighting Glow) */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        background: "radial-gradient(ellipse at 50% 0%, rgba(11,228,155,0.08) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Top Banner: CHEF ELO SAYS */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        position: "relative",
        zIndex: 2
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#045137",
            padding: "5px 12px",
            borderRadius: 999,
            color: "#0BE49B",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: "0.06em"
          }}>
            <span>{translate("chef_elo_says", "🍳 CHEF ELO SAYS")}</span>
          </div>
          <button
            type="button"
            onClick={handleVoiceToggle}
            className="tn-mono tn-focus"
            style={{
              background: isVoiceActive ? "#0BE49B" : "rgba(255,255,255,0.08)",
              color: isVoiceActive ? "#23322D" : "#CEE9DF",
              border: "1px solid " + (isVoiceActive ? "#0BE49B" : "#3C5A4F"),
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: 11,
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 700,
              letterSpacing: "0.06em",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 5
            }}
          >
            {isVoiceActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{isVoiceActive ? translate("voice_on", "Listen & Read: ON") : translate("voice_off", "Voice: OFF")}</span>
          </button>
        </div>
        <div className="tn-mono" style={{
          color: "#CEE9DF",
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "0.06em",
          background: "rgba(255,255,255,0.08)",
          padding: "5px 12px",
          borderRadius: 999
        }}>
          STEP {currentStep} / {totalSteps}
        </div>
      </div>

      {/* Kitchen Stage Grid: Chef Elo on Left, Recipe Blackboard on Right */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "130px 1fr",
        gap: 16,
        alignItems: "end",
        position: "relative",
        zIndex: 2
      }}>
        {/* Left: Chef Elo in Kitchen with Stove & Steaming Pan */}
        <div style={{
          position: "relative",
          width: 130,
          height: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end"
        }}>
          {/* Animated Steam Wisps from Pot */}
          <div style={{
            position: "absolute",
            top: 25,
            left: 20,
            display: "flex",
            gap: 6,
            zIndex: 3
          }}>
            <div className="tn-steam-wisp-1" style={{ width: 4, height: 16, borderRadius: 999, background: "rgba(255,255,255,0.65)" }} />
            <div className="tn-steam-wisp-2" style={{ width: 4, height: 20, borderRadius: 999, background: "rgba(255,255,255,0.75)" }} />
            <div className="tn-steam-wisp-3" style={{ width: 4, height: 14, borderRadius: 999, background: "rgba(255,255,255,0.55)" }} />
          </div>

          {/* Full Figure Chef Elo Standing in Kitchen */}
          <img
            src="/chef-elo-avatar.png"
            alt="Chef Elo Cooking"
            style={{
              width: 125,
              height: 165,
              objectFit: "contain",
              objectPosition: "bottom center",
              position: "relative",
              zIndex: 2
            }}
          />

          {/* Kitchen Counter / Stove Base */}
          <div style={{
            width: "100%",
            height: 28,
            background: "linear-gradient(180deg, #2D443B 0%, #1F3029 100%)",
            borderRadius: "8px 8px 0 0",
            border: "1px solid #3C5A4F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            marginTop: -10
          }}>
            {/* Stove Burner Glow */}
            <div style={{
              width: 45,
              height: 6,
              background: "#D05F0D",
              borderRadius: 999,
              boxShadow: "0 0 12px #D05F0D"
            }} />
          </div>
        </div>

        {/* Right: Recipe Instructions Speech Card */}
        <div style={{
          background: "#CEE9DF",
          borderRadius: "16px 16px 16px 4px",
          padding: "18px 18px",
          position: "relative",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          marginBottom: 10
        }}>
          <div style={{
            color: "#23322D",
            fontSize: 15,
            lineHeight: 1.55,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif"
          }}>
            {stepText}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Reusable Chef Bot Avatar ----------
function ChefBotAvatar({ style, isScouting = false }) {
  return (
    <img
      src="/chef-elo-avatar.png"
      alt="Chef Elo"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
        ...(style || styles.botSvg)
      }}
    />
  );
}

// ---------- Reusable Chef Bot at Dining Table ----------
function ChefBotDiningTable({ style }) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 260, height: 200, margin: "0 auto 10px" }}>
      <img
        src="/chef-elo-avatar.png"
        alt="Chef Elo"
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          width: 145,
          height: "auto",
          maxHeight: 165,
          objectFit: "contain",
          zIndex: 1
        }}
      />
      <svg viewBox="0 0 240 100" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 95, zIndex: 2 }}>
        <ellipse cx="120" cy="80" rx="95" ry="14" fill="#EBF4F0" />
        <rect x="42" y="45" width="8" height="40" rx="3" fill="#23322D" />
        <rect x="190" y="45" width="8" height="40" rx="3" fill="#23322D" />
        <ellipse cx="120" cy="46" rx="100" ry="20" fill="#23322D" />
        <ellipse cx="120" cy="43" rx="96" ry="18" fill="#CEE9DF" stroke="#045137" strokeWidth="1" />
        <ellipse cx="120" cy="41" rx="46" ry="11" fill="#FFFFFF" stroke="#C2DDD4" strokeWidth="1.5" />
        <ellipse cx="120" cy="40" rx="32" ry="7" fill="#F5F9F7" />
        <ellipse cx="120" cy="38" rx="22" ry="5.5" fill="#D05F0D" />
        <circle cx="112" cy="37" r="3" fill="#0BE49B" />
        <circle cx="124" cy="36" r="2.5" fill="#F2A93B" />
        <circle cx="118" cy="38" r="2" fill="#045137" />
        <path d="M 112 28 Q 109 19 114 12" fill="none" stroke="#6B8F82" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
        <path d="M 120 26 Q 124 17 119 8" fill="none" stroke="#6B8F82" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        <path d="M 128 28 Q 132 19 127 11" fill="none" stroke="#6B8F82" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
        <path d="M 58 33 L 58 47 M 55 33 L 55 39 Q 58 41 61 39 L 61 33" fill="none" stroke="#6B8F82" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 182 33 Q 185 38 185 47" fill="none" stroke="#6B8F82" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ---------- Audio Synth (Reuses single AudioContext to prevent leak) ----------
let sharedAudioCtx = null;
function getSharedAudioContext() {
  try {
    if (typeof window === "undefined") return null;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
      sharedAudioCtx = new AudioContext();
    }
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch (e) {
    console.error("Audio Context initialization error:", e);
    return null;
  }
}

const playBellSound = () => {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
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

// ---------- Recipe Outsourcing API (Parallelized Lookups & Nut Allergy Check) ----------
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

  // Expanded: search 2 primary categories + 1 cuisine area in parallel for more variety
  const primaryCategories = [category];

  // Add a cuisine-area parallel search based on pantry
  let areaSearch = null;
  if (pantry === "chicken") areaSearch = "Indian";
  else if (pantry === "beef") areaSearch = "Mexican";
  else if (pantry === "seafood") areaSearch = "Japanese";
  else if (pantry === "pork") areaSearch = "Chinese";
  else if (pantry === "pasta" || pantry === "veg") areaSearch = "Italian";
  else if (pantry === "staples") areaSearch = "Turkish";
  else {
    const areas = ["Indian", "Mexican", "Thai", "Japanese", "Italian", "British", "American", "Chinese", "French", "Moroccan", "Turkish", "Greek", "Spanish", "Vietnamese", "Jamaican", "Malaysian", "Egyptian", "Kenyan", "Tunisian", "Polish", "Portuguese", "Russian"];
    areaSearch = areas[Math.floor(Math.random() * areas.length)];
  }

  try {
    // Fetch from category AND cuisine area in parallel
    const [listRes, areaRes] = await Promise.all([
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`),
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaSearch}`),
    ]);

    const listData = listRes.ok ? await listRes.json() : null;
    const areaData = areaRes.ok ? await areaRes.json() : null;

    // Merge results, deduplicate by ID
    const seen = new Set();
    const allMeals = [];
    for (const src of [listData?.meals, areaData?.meals]) {
      if (src) {
        for (const m of src) {
          if (!seen.has(m.idMeal)) {
            seen.add(m.idMeal);
            allMeals.push(m);
          }
        }
      }
    }

    if (allMeals.length === 0) return null;

    // Filter out rejected IDs
    const filteredStubs = allMeals.filter(
      m => !rejectedIds.includes("db_" + m.idMeal)
    );

    // Shuffle stubs and take top 8 candidates for parallel lookup (wider net)
    const shuffledStubs = [...filteredStubs].sort(() => Math.random() - 0.5);
    const candidateStubs = shuffledStubs.slice(0, 8);

    const lookupPromises = candidateStubs.map(stub =>
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${stub.idMeal}`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null)
    );

    const lookupResults = await Promise.all(lookupPromises);

    for (const detailData of lookupResults) {
      if (!detailData || !detailData.meals || detailData.meals.length === 0) continue;

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
      if (selectedAllergies.includes("nuts")) {
        const nutTerms = ["nut", "peanut", "almond", "walnut", "cashew", "pecan", "hazelnut", "pistachio", "macadamia", "pine nut", "chestnut", "praline", "marzipan", "nutella", "almond milk", "peanut butter"];
        if (nutTerms.some(term => rawIngredients.some(ing => ing.includes(term)) || instructionsLower.includes(term))) {
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

      // If user requested 10-min, strictly require 10-min
      if (effort === "10" && derivedEffort !== "10") continue;
      // If user requested 30-min, require 10 or 30-min
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

      const id = "db_" + meal.idMeal;
      const recipeData = {
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
        image: meal.strMealThumb,
        recipe: recipeData
      };
    }
  } catch (err) {
    console.error("Outsource fetch failed:", err);
  }
  return null;
};

// ---------- Logic ----------
const MEAL_TYPES = [
  { id: "breakfast", label: "Breakfast", icon: "🌅" },
  { id: "lunch", label: "Lunch", icon: "☀️" },
  { id: "dinner", label: "Dinner", icon: "🌙" },
];

function getTimeOfDayInfo() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) {
    return {
      eyebrow: "MEAL DECISION",
      title: "What are we cooking?",
      mealType: "breakfast",
      revealEyebrow: "YOUR BREAKFAST DECISION IS"
    };
  } else if (hour >= 11 && hour < 16) {
    return {
      eyebrow: "MEAL DECISION",
      title: "What are we cooking?",
      mealType: "lunch",
      revealEyebrow: "YOUR LUNCH DECISION IS"
    };
  } else {
    return {
      eyebrow: "MEAL DECISION",
      title: "What are we cooking?",
      mealType: "dinner",
      revealEyebrow: "YOUR DINNER DECISION IS"
    };
  }
}

function pickMeal({ effort, pantry, diet = [], rejectedIds = [], lastId, selectedAllergies = [], selectedHealth = [], selectedMealType = "dinner" }) {
  // 1. Strict mealType filter
  let mealsToFilter = MEALS.filter((m) => m.mealType && m.mealType.includes(selectedMealType));
  if (mealsToFilter.length === 0) mealsToFilter = MEALS;

  // 2. Strict Allergies, Health, Effort, and Veggie filtering
  const filteredMeals = mealsToFilter.filter((m) => {
    if (effort === "10" && m.effort !== "10") return false;
    if (effort === "30" && m.effort !== "10" && m.effort !== "30") return false;
    
    // Strict Allergy check: reject if meal contains any selected allergen
    if (selectedAllergies.some((allergy) => m.allergies && m.allergies.includes(allergy))) {
      return false;
    }
    
    // Health check
    if (selectedHealth.some((hCond) => !m.health || !m.health.includes(hCond))) {
      return false;
    }

    // Vegetarian check
    if (diet.includes("vegetarian") && (!m.diet || !m.diet.includes("vegetarian"))) {
      return false;
    }

    return true;
  });

  const mealsToScore = filteredMeals.length > 0 
    ? filteredMeals 
    : mealsToFilter.filter((m) => !selectedAllergies.some((allergy) => m.allergies && m.allergies.includes(allergy)));
  const finalMeals = mealsToScore.length > 0 ? mealsToScore : mealsToFilter;

  const score = (m) => {
    let s = 0;
    if (effort && m.effort === effort) s += 4;
    if (pantry && m.pantry && m.pantry.includes(pantry)) s += 4;
    if (diet && diet.length > 0) {
      diet.forEach((d) => { if (m.diet && m.diet.includes(d)) s += 2; });
    }
    if (m.id === lastId) s -= 12;
    if (rejectedIds && rejectedIds.includes(m.id)) s -= 10;
    return s;
  };
  const scored = finalMeals.map((m) => ({ m, s: score(m) })).sort((a, b) => b.s - a.s);
  const top = scored.filter((x) => x.s >= scored[0].s - 1);
  return top[Math.floor(Math.random() * top.length)].m;
}

// ---------- Fullscreen Helper ----------
function requestAppFullscreen() {
  try {
    if (typeof document === "undefined") return;
    const doc = document;
    const isFs = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;
    if (!isFs) {
      const el = doc.documentElement;
      const rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
      if (rfs) {
        rfs.call(el).catch(() => {});
      }
    }
  } catch {}
}

// ---------- Component ----------
export default function TonightApp() {
  // ---------- Internationalization State ----------
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("elo_lang") || "en";
    } catch {
      return "en";
    }
  });
  const [showLangModal, setShowLangModal] = useState(false);

  const t = (key, fallback = "") => {
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      return TRANSLATIONS[lang][key];
    }
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return fallback || key;
  };
  // Helper to translate meal names, reasons, ingredients, and steps dynamically
  const tMealText = (str) => {
    if (!str || typeof str !== "string" || lang === "en") return str;
    
    // Check if exact key exists in TRANSLATIONS
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][str]) {
      return TRANSLATIONS[lang][str];
    }
    
    return str;
  };


  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem("elo_lang", newLang);
    } catch {}
    setShowLangModal(false);
  };

  const [stage, setStage] = useState(() => {
    try {
      return localStorage.getItem("elo_preferences_set") ? "ask" : "health";
    } catch {
      return "health";
    }
  }); // health | ask | reveal | done
  const [showMenu, setShowMenu] = useState(false);

  const openLiveSupport = () => {
    setShowMenu(false);
    setChatError("");
    setShowPreChatModal(true);
  };

  const startChatSession = (e) => {
    if (e) e.preventDefault();
    if (!chatName.trim()) {
      setChatError(t("error_name_required", "Please enter your full name."));
      return;
    }
    if (!chatEmail.trim() || !chatEmail.includes("@")) {
      setChatError(t("error_email_required", "Please enter a valid email address."));
      return;
    }
    if (!chatPhone.trim() || chatPhone.trim().length < 6) {
      setChatError(t("error_phone_required", "Please enter your phone number."));
      return;
    }

    setChatError("");
    setShowPreChatModal(false);

    if (typeof window !== "undefined" && window.Tawk_API) {
      try {
        window.Tawk_API.visitor = {
          name: chatName.trim(),
          email: chatEmail.trim(),
          phone: chatPhone.trim()
        };
        if (typeof window.Tawk_API.setAttributes === "function") {
          window.Tawk_API.setAttributes({
            name: chatName.trim(),
            email: chatEmail.trim(),
            phone: chatPhone.trim()
          }, function(err){});
        }
        if (typeof window.Tawk_API.showWidget === "function") {
          window.Tawk_API.showWidget();
        }
        if (typeof window.Tawk_API.maximize === "function") {
          window.Tawk_API.maximize();
          return;
        }
        if (typeof window.Tawk_API.toggle === "function") {
          window.Tawk_API.toggle();
          return;
        }
      } catch (err) {
        console.warn("Tawk API error:", err);
      }
    }
    setShowSupportModal(true);
  };

  
  const [showPreChatModal, setShowPreChatModal] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [chatPhone, setChatPhone] = useState("");
  const [chatError, setChatError] = useState("");
const [showSupportModal, setShowSupportModal] = useState(false);
  const [effort, setEffort] = useState(null);
  const [pantry, setPantry] = useState(null);
  const [diet, setDiet] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [current, setCurrent] = useState(null);
  const [rejectCount, setRejectCount] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState(() => {
    try {
      const saved = localStorage.getItem("elo_allergies");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedHealth, setSelectedHealth] = useState(() => {
    try {
      const saved = localStorage.getItem("elo_health");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedMealType, setSelectedMealType] = useState(() => {
    // Default to the time-of-day appropriate meal type
    return getTimeOfDayInfo().mealType;
  });
  const [isCooking, setIsCooking] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem("elo_intro_seen");
    } catch {
      return false;
    }
  });
  const [isRinging, setIsRinging] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installStepText, setInstallStepText] = useState("Preparing installation...");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [isApplyingUpdate, setIsApplyingUpdate] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [updateStepText, setUpdateStepText] = useState("Downloading latest version...");

  useEffect(() => {
    if (isLoading) {
      setLoadPercent(0);
      const interval = setInterval(() => {
        setLoadPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 12;
        });
      }, 160);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // ---------- Paywall & Subscription State ----------
  const [subStatus, setSubStatus] = useState(() => {
    try {
      return localStorage.getItem("elo_sub_status") || "none";
    } catch {
      return "none";
    }
  }); // "none" | "trialing" | "active" | "past_due" | "trial_ended_pending_charge"
  const [trialEndDate, setTrialEndDate] = useState(() => {
    try {
      return localStorage.getItem("elo_trial_end") || null;
    } catch {
      return null;
    }
  });
  const [selectedPlan, setSelectedPlan] = useState(() => {
    try {
      return localStorage.getItem("elo_selected_plan") || "annual";
    } catch {
      return "annual";
    }
  }); // "annual" | "monthly"
  const [showPaywall, setShowPaywall] = useState(() => {
    // Only show paywall immediately if subscription has expired or is past due
    try {
      const savedStatus = localStorage.getItem("elo_sub_status");
      return savedStatus === "trial_ended_pending_charge" || savedStatus === "past_due";
    } catch {
      return false;
    }
  });
  const [userEmail, setUserEmail] = useState(() => {
    try {
      return localStorage.getItem("elo_user_email") || "";
    } catch {
      return "";
    }
  });
  const [emailError, setEmailError] = useState("");
  const [isVerifyingTrial, setIsVerifyingTrial] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState("");
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // NOTE: Decision count is now tracked server-side in Supabase (free_usage table).
  // localStorage is no longer the source of truth — do not re-add client-side counters.

  // Verify real subscription status from server on load (skipped if testing or no server)
  useEffect(() => {
    const emailToVerify = userEmail || localStorage.getItem("elo_user_email");
    if (emailToVerify && emailToVerify.includes("@")) {
      fetch(`/api/subscription-status?email=${encodeURIComponent(emailToVerify.trim().toLowerCase())}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status && data.status !== "none") {
            setSubStatus(data.status);
            localStorage.setItem("elo_sub_status", data.status);
            if (data.trialEnd) {
              setTrialEndDate(data.trialEnd);
              localStorage.setItem("elo_trial_end", data.trialEnd);
            }
          }
        })
        .catch((err) => console.warn("Subscription status verify error:", err));
    }
  }, []);

  useEffect(() => {
    // If trial ended or past due, enforce mandatory paywall
    if (subStatus === "trial_ended_pending_charge" || subStatus === "past_due") {
      setShowPaywall(true);
    }
  }, [subStatus]);

  const startFreeTrial = async (planToUse = selectedPlan) => {
    const trimmedEmail = (userEmail || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");

    const planLabel = planToUse === "annual" ? "Annual ($29.99/yr after 7-day trial)" : "Monthly ($4.99/mo after 7-day trial)";

    if (typeof window !== "undefined" && typeof window.FlutterwaveCheckout === "function") {
      window.FlutterwaveCheckout({
        public_key: import.meta.env.VITE_FLW_PUBLIC_KEY || "FLWPUBK-00b20d5dc708ea1b8e95d9baa7f5fed0-X",
        tx_ref: `elo_verify_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        amount: 1, // $1 USD card verification check (instantly auto-refunded)
        currency: "USD",
        payment_options: "card",
        customer: {
          email: trimmedEmail,
          name: "Chef Elo Member",
        },
        customizations: {
          title: "Chef Elo",
          description: `7-Day Free Trial ($0 net cost, $1 check auto-refunded). Then ${planLabel}.`,
          logo: "",
        },
        callback: async function (data) {
          setIsVerifyingTrial(true);
          try {
            const res = await fetch("/api/trial-start", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: trimmedEmail,
                plan: planToUse,
                cardDetails: {
                  token: data.transaction_id || data.id,
                  flw_ref: data.flw_ref,
                  tx_ref: data.tx_ref,
                },
              }),
            });
            const result = await res.json();

            if (res.ok && result.status === "trialing") {
              setSubStatus("trialing");
              if (result.trialEnd) {
                setTrialEndDate(result.trialEnd);
                localStorage.setItem("elo_trial_end", result.trialEnd);
              }
              localStorage.setItem("elo_sub_status", "trialing");
              localStorage.setItem("elo_selected_plan", planToUse);
              localStorage.setItem("elo_user_email", trimmedEmail);
              setShowPaywall(false);
            } else {
              // If running on local Vite without serverless backend, activate locally for preview
              setSubStatus("trialing");
              localStorage.setItem("elo_sub_status", "trialing");
              setShowPaywall(false);
              alert("Test verification complete! Trial active in test mode.");
            }
          } catch (err) {
            console.warn("Local trial start fallback:", err);
            setSubStatus("trialing");
            localStorage.setItem("elo_sub_status", "trialing");
            setShowPaywall(false);
            alert("Test verification complete! Trial active in test mode.");
          } finally {
            setIsVerifyingTrial(false);
          }
        },
        onclose: function () {},
      });
    } else {
      setEmailError("Payment gateway is initializing. Please try again in a moment.");
    }
  };

  const handleRestorePurchases = async () => {
    const emailToRestore = (restoreEmail || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailToRestore || !emailRegex.test(emailToRestore)) {
      setRestoreMessage("Please enter a valid email address.");
      return;
    }

    setRestoreLoading(true);
    setRestoreMessage("");
    try {
      const res = await fetch(`/api/subscription-status?email=${encodeURIComponent(emailToRestore)}`);
      const data = await res.json();

      if (res.ok && (data.status === "active" || data.status === "trialing")) {
        setSubStatus(data.status);
        setUserEmail(emailToRestore);
        localStorage.setItem("elo_sub_status", data.status);
        localStorage.setItem("elo_user_email", emailToRestore);
        if (data.trialEnd) {
          setTrialEndDate(data.trialEnd);
          localStorage.setItem("elo_trial_end", data.trialEnd);
        }
        setShowRestoreModal(false);
        setShowPaywall(false);
        alert(`Subscription restored! Status: ${data.status.toUpperCase()}`);
      } else if (data.status === "none" || !data.status) {
        setRestoreMessage("No active subscription found for this email address.");
      } else {
        setRestoreMessage(`Account status: ${data.status}. Please enter card details to continue.`);
      }
    } catch (err) {
      console.error("Restore error:", err);
      setRestoreMessage("Error connecting to server. Please try again.");
    } finally {
      setRestoreLoading(false);
    }
  };

  const markFirstUseAndCheckPaywall = () => {
    if (!hasUsedOnce) {
      setHasUsedOnce(true);
      try {
        localStorage.setItem("elo_has_used_once", "true");
      } catch {}
      if (subStatus === "none") {
        setTimeout(() => {
          setShowPaywall(true);
        }, 1200);
      }
    }
  };

  const currentRecipe = current?.recipe || (current && RECIPES[current.id] ? RECIPES[current.id] : (current ? {
  time: current.time || "25 min",
  ingredients: current.pantry || ["Main ingredients", "Salt, pepper & oil"],
  steps: [
    `Prep all ingredients for ${current.name || "your meal"}.`,
    `Heat oil or butter in a pan over medium heat.`,
    `Add ingredients and cook 10–15 min until tender and fragrant.`,
    `Season to taste with salt, pepper, and serve hot!`
  ],
  durations: [180, 120, 600, 180]
} : null));

  useEffect(() => {
    // Check if running in standalone PWA mode
    const standalone = (typeof window !== "undefined") && (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
    setIsStandalone(standalone);

    // Detect iOS devices
    const isIosDevice = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    if (standalone) return;

    // Listen for browser beforeinstallprompt event (Android / Chrome / Edge)
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Auto show install modal when browser fires beforeinstallprompt
      setShowInstallModal(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Auto-show install prompt for iOS/browsers on launch if not dismissed before
    const timer = setTimeout(() => {
      try {
        if (!standalone && !sessionStorage.getItem("elo_install_dismissed")) {
          setShowInstallModal(true);
        }
      } catch {}
    }, 1200);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    setIsInstalling(true);
    setInstallProgress(12);
    setInstallStepText("Connecting to browser service...");

    let currentProg = 12;
    const progressInterval = setInterval(() => {
      currentProg += Math.floor(Math.random() * 16) + 14;
      if (currentProg >= 95) {
        currentProg = 95;
        clearInterval(progressInterval);
      }
      setInstallProgress(currentProg);
      if (currentProg > 70) {
        setInstallStepText("Adding Chef Elo to your Home Screen...");
      } else if (currentProg > 40) {
        setInstallStepText("Caching recipes and timers for offline use...");
      } else {
        setInstallStepText("Configuring application manifest...");
      }
    }, 200);

    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
          clearInterval(progressInterval);
          setInstallProgress(100);
          setInstallStepText("Chef Elo successfully installed!");
          setTimeout(() => {
            setIsInstalling(false);
            setShowInstallModal(false);
          }, 900);
        } else {
          clearInterval(progressInterval);
          setIsInstalling(false);
        }
      } catch {
        clearInterval(progressInterval);
        setIsInstalling(false);
      }
      setDeferredPrompt(null);
    } else {
      setTimeout(() => {
        clearInterval(progressInterval);
        setInstallProgress(100);
        setInstallStepText("Ready! Follow the instructions below.");
        setTimeout(() => {
          setIsInstalling(false);
        }, 600);
      }, 1200);
    }
  };

  // Service Worker Mandatory Update Detector
  useEffect(() => {
    if (typeof window === "undefined" || !('serviceWorker' in navigator)) return;

    let refreshing = false;
    const handleControllerChange = () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    };
    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;

      if (reg.waiting) {
        setWaitingWorker(reg.waiting);
        setShowUpdateModal(true);
      }

      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            setWaitingWorker(newWorker);
            setShowUpdateModal(true);
          }
        });
      });
    }).catch(() => {});

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    };
  }, []);

  const handleApplyUpdate = () => {
    setIsApplyingUpdate(true);
    setUpdateProgress(15);
    setUpdateStepText("Downloading latest version...");

    let prog = 15;
    const interval = setInterval(() => {
      prog += Math.floor(Math.random() * 20) + 15;
      if (prog >= 98) {
        prog = 98;
        clearInterval(interval);
      }
      setUpdateProgress(prog);
      if (prog > 70) {
        setUpdateStepText("Applying new version...");
      } else if (prog > 40) {
        setUpdateStepText("Updating offline cache assets...");
      } else {
        setUpdateStepText("Verifying update integrity...");
      }
    }, 180);

    setTimeout(() => {
      clearInterval(interval);
      setUpdateProgress(100);
      setUpdateStepText("Reloading...");
      if (waitingWorker) {
        waitingWorker.postMessage({ type: "SKIP_WAITING" });
      }
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 1200);
  };

  useEffect(() => {
    // Attempt fullscreen immediately
    requestAppFullscreen();

    // Trigger on first user interaction to satisfy browser gesture requirements
    const handleFirstTouch = () => {
      requestAppFullscreen();
    };

    window.addEventListener("click", handleFirstTouch, { passive: true });
    window.addEventListener("touchstart", handleFirstTouch, { passive: true });
    window.addEventListener("pointerdown", handleFirstTouch, { passive: true });

    return () => {
      window.removeEventListener("click", handleFirstTouch);
      window.removeEventListener("touchstart", handleFirstTouch);
      window.removeEventListener("pointerdown", handleFirstTouch);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    try {
      sessionStorage.setItem("elo_intro_seen", "true");
    } catch {}
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    try {
      localStorage.setItem("elo_allergies", JSON.stringify(selectedAllergies));
    } catch {}
  }, [selectedAllergies]);

  useEffect(() => {
    try {
      localStorage.setItem("elo_health", JSON.stringify(selectedHealth));
    } catch {}
  }, [selectedHealth]);

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

  const completeHealthSetup = () => {
    try {
      localStorage.setItem("elo_preferences_set", "true");
    } catch {}
    setStage("ask");
  };

  const decide = async (isReroll = false) => {
    // Coerce isReroll strictly to boolean true so React SyntheticEvent is not mistaken for a reroll.
    const realIsReroll = isReroll === true;
    const hasActiveSubscription = subStatus === "trialing" || subStatus === "active";

    // 1. Expired / past-due accounts → paywall immediately.
    if (subStatus === "trial_ended_pending_charge" || subStatus === "past_due") {
      console.log("[decide] Blocked: subscription expired / past due");
      setShowPaywall(true);
      return;
    }

    // 2. For free users making a real (non-reroll) decision, ask Supabase whether
    //    this IP is allowed another free decide. Supabase is the ONLY source of truth
    //    — no localStorage counters involved.
    if (!realIsReroll && !hasActiveSubscription) {
      setIsFetching(true);
      try {
        const checkRes = await fetch("/api/check-free-usage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          console.log("[decide] check-free-usage response:", checkData);
          if (checkData && (checkData.allowed === false || (checkData.count && checkData.count > 1))) {
            console.log("[decide] Blocked: Supabase free_usage limit reached", checkData);
            setIsFetching(false);
            setShowPaywall(true);
            return;
          }
        } else {
          // Non-OK response: fail open so a server hiccup doesn't block real users.
          console.warn("[decide] check-free-usage returned non-OK:", checkRes.status);
        }
      } catch (checkErr) {
        // Network error: fail open.
        console.warn("[decide] check-free-usage network error:", checkErr);
      }
    } else {
      setIsFetching(true);
    }

    let meal = null;
    try {
      meal = await fetchOutsourcedRecipe({
        effort,
        pantry,
        diet,
        selectedAllergies,
        selectedHealth,
        selectedMealType,
        rejectedIds: [...rejected, ...(current ? [current.id] : [])]
      });
    } catch (err) {
      console.error("decide outsource error:", err);
    }

    if (!meal) {
      meal = pickMeal({ effort, pantry, diet, rejectedIds: rejected, lastId: current?.id, selectedAllergies, selectedHealth, selectedMealType });
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
      decide(true);
      return;
    }
    setRejected((r) => [...r, current.id]);
    setRejectCount((c) => c + 1);
    setShowRecipe(false);
    decide(true);
  };

  const startOver = () => {
    setStage("ask");
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
    if (!current || !currentRecipe) return;
    setIsCooking(true);
    setCurrentStepIndex(0);
    const duration = currentRecipe.durations?.[0] || 300;
    setTimeLeft(duration);
    setIsTimerActive(true);
    setIsRinging(false);
  };

  const nextStep = () => {
    if (!current || !currentRecipe) return;
    setIsRinging(false);
    const steps = currentRecipe.steps;
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      const duration = currentRecipe.durations?.[nextIdx] || 300;
      setTimeLeft(duration);
      setIsTimerActive(true);
    } else {
      setIsCooking(false);
      setStage("ready");
    }
  };

  const prevStep = () => {
    if (!current || !currentRecipe) return;
    setIsRinging(false);
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      const duration = currentRecipe.durations?.[prevIdx] || 300;
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
  const isFinalStep = currentRecipe ? currentStepIndex === currentRecipe.steps.length - 1 : false;

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
        .tn-root { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        .tn-mono { font-family: 'DM Sans', sans-serif; }
        .tn-chip {
          transition: transform .15s ease, background .15s ease, border-color .15s ease;
        }
        .tn-chip:active { transform: scale(0.96); }
        .tn-btn-primary { transition: transform .12s ease, opacity .12s ease; }
        .tn-btn-primary:hover { transform: translateY(-1px); opacity: 0.95; }
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
          animation: tnLoadingBar 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
            {/* Colorful Chef Bot Logo - No white square background */}
            <div style={{
              width: 130,
              height: 130,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              margin: "0 auto",
            }}>
              <img src="/chef-elo-logo.png" alt="Chef Elo Logo" style={{ width: 120, height: 120, borderRadius: 24, boxShadow: "0 8px 24px rgba(4,81,55,0.18)" }} />
            </div>

            {/* Typography positioned below the logo */}
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <h1 style={{
                color: "#23322D",
                fontSize: 28,
                fontWeight: 800,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.03em",
                margin: "0 0 6px",
                lineHeight: 1.15
              }}>
                Chef Elo
              </h1>
              <p style={{
                color: "#6B8F82",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.01em",
                margin: 0
              }}>
                Instant Meal Decisions & Step-by-Step Cooking Timers
              </p>
            </div>

            {/* Live Loading Progress Bar & Percentage Counter */}
            <div style={{ width: 220, marginTop: 22, textAlign: "center" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
                fontSize: 11,
                fontWeight: 700,
                color: "#045137",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.04em"
              }}>
                <span>{t("loading_label", "LOADING")}</span>
                <span>{Math.min(100, loadPercent)}%</span>
              </div>
              <div style={styles.loaderBarBg}>
                <div style={{
                  ...styles.loaderBarFill,
                  width: `${Math.min(100, loadPercent)}%`,
                  transition: "width 0.15s ease-out"
                }} />
              </div>
            </div>
          </div>
        </div>
      ) : isFetching ? (
        <div style={styles.loaderPage} className="tn-card-enter">
          <div style={styles.loaderContent} className="tn-float">
            <div style={styles.loaderAvatar} className="tn-pulse-hat">
              <ChefBotAvatar isScouting={true} />
            </div>
            <h2 style={styles.loaderTitle}>{t("scouting", "Elo is scouting the web...")}</h2>
            <p style={{ color: "#6B8F82", fontSize: 14, fontFamily: "'Inter', sans-serif", margin: "-8px 0 10px", textAlign: "center" }}>
              {t("scouting_sub", "Finding the perfect recipe matching your pantry and filters.")}
            </p>
            <div style={styles.loaderBarBg}>
              <div style={{ ...styles.loaderBarFill, width: "100%", animation: "tnLoadingBar 2.5s infinite linear" }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="tn-root" style={styles.wrap}>
          {!isCooking && stage !== "done" && (
            <header style={styles.header}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div className="tn-mono" style={{ ...styles.eyebrow, marginBottom: 0 }}>
                  <ChefHat size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                  {t("meal_decision_eyebrow", "MEAL DECISION")}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {!isStandalone && (
                    <button
                      type="button"
                      onClick={handleInstallClick}
                      className="tn-focus"
                      aria-label="Install Chef Elo"
                      style={{
                        background: "#D05F0D",
                        border: "1px solid #D05F0D",
                        borderRadius: 999,
                        padding: "4px 10px",
                        fontSize: 11,
                        color: "#FFFFFF",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.06em",
                        fontWeight: 700,
                        boxShadow: "0 2px 6px rgba(208,95,13,0.25)",
                      }}
                    >
                      <Smartphone size={13} style={{ verticalAlign: "-1px" }} />
                      <span>{t("install_app", "Install App")}</span>
                    </button>
                  )}
                  {/* Menu Button */}
                  <button
                    type="button"
                    onClick={() => setShowMenu(true)}
                    className="tn-focus"
                    aria-label="Open Settings"
                    style={{
                      background: "#F5F9F7",
                      border: "1px solid #C2DDD4",
                      borderRadius: 999,
                      padding: "4px 12px",
                      fontSize: 11,
                      color: "#045137",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontFamily: "'IBM Plex Mono', monospace",
                      letterSpacing: "0.06em",
                      fontWeight: 700,
                    }}
                  >
                    <Settings size={13} style={{ verticalAlign: "-1px" }} />
                    <span>{t("settings", "Settings")}</span>
                  </button>
                </div>
              </div>
              <h1 style={{ ...styles.h1, fontSize: 24 }}>
                {stage === "health"
                  ? t("lets_get_started", "Let's get started")
                  : stage === "reveal"
                  ? t("here_is_pick", "Here's what Chef Elo picked")
                  : ""}
              </h1>
            </header>
          )}

          {isCooking && current && currentRecipe ? (
            <div style={styles.cookingPanel} className="tn-card-enter">
              {/* Kitchen Setting for Chef Elo Says */}
              <ChefEloKitchenStage
                t={t}
                stepText={currentRecipe.steps[currentStepIndex]}
                currentStep={currentStepIndex + 1}
                totalSteps={currentRecipe.steps.length}
                isVoiceActive={isVoiceActive}
                onToggleVoice={() => setIsVoiceActive(!isVoiceActive)}
                lang={lang}
              />

              {/* Timer and Controls */}
              <div 
                style={styles.timerBox} 
                className={timeLeft === 0 ? "tn-timer-alarm" : ""}
              >
                <div className="tn-mono" style={styles.stepIndicator}>
                  STEP {currentStepIndex + 1} OF {currentRecipe.steps.length}
                </div>
                <div style={styles.timerDisplay}>
                  {formatTime(timeLeft)}
                </div>
                
                {/* Progress Bar */}
                <div style={styles.progressBarBg}>
                  <div style={{
                    ...styles.progressBarFill,
                    width: `${(timeLeft / (currentRecipe.durations?.[currentStepIndex] || 300)) * 100}%`
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
                      const duration = currentRecipe.durations?.[currentStepIndex] || 300;
                      setTimeLeft(duration);
                      setIsTimerActive(true);
                      setIsRinging(false);
                    }}
                  >
                    <RotateCcw size={16} />
                  </button>
                  {!isFinalStep && (
                    <button 
                      className="tn-focus"
                      style={styles.timerControlBtn} 
                      onClick={nextStep}
                    >
                      <SkipForward size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Complete or Back actions */}
              <div style={styles.cookingActions}>
                {isFinalStep && timeLeft === 0 ? (
                  <button 
                    className="tn-focus" 
                    style={{
                      background: "#045137",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: 8,
                      padding: "14px 28px",
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: "'Inter', sans-serif",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      boxShadow: "none"
                    }} 
                    onClick={() => {
                      setIsCooking(false);
                      setIsRinging(false);
                      setStage("ready");
                    }}
                  >
                    <Check size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
                    Done
                  </button>
                ) : (
                  <button className="tn-focus" style={styles.quitBtn} onClick={() => {
                    setIsCooking(false);
                    setIsRinging(false);
                  }}>
                    Quit cooking
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {stage === "health" && (
                <div style={styles.askPanel} className="tn-card-enter">
                  <Section title={t("allergies_title", "ALLERGIES & RESTRICTIONS")}>
                    <ChipRow>
                      {ALLERGIES.map((a) => (
                        <Chip key={a.id} active={selectedAllergies.includes(a.id)} onClick={() => toggleAllergy(a.id)}>
                          {t("allergy_" + a.id.replace(/-/g, "_"), a.label)}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <Section title={t("health_title", "HEALTH CONSIDERATIONS")}>
                    <ChipRow>
                      {HEALTH_CONDITIONS.map((hc) => (
                        <Chip key={hc.id} active={selectedHealth.includes(hc.id)} onClick={() => toggleHealth(hc.id)}>
                          {t("health_" + hc.id.replace(/-/g, "_"), hc.label)}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <button className="tn-btn-primary tn-focus" style={styles.decideBtn} onClick={completeHealthSetup}>
                    {t("continue", "Continue")}
                  </button>
                </div>
              )}

              {stage === "ask" && (
                <div style={styles.askPanel}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <span className="tn-mono" style={{ fontSize: 11, color: "#6B8F82", letterSpacing: "0.08em" }}>
                      {(selectedAllergies.length > 0 || selectedHealth.length > 0)
                        ? `${selectedAllergies.length + selectedHealth.length} ${t("filters_active", "FILTER(S) ACTIVE")}`
                        : t("filters_off", "ALL DIETARY FILTERS OFF")}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setStage("health")}
                      style={{ background: "none", border: "none", color: "#045137", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0, textDecoration: "underline", fontFamily: "'Inter', sans-serif" }}
                    >
                      {t("edit_preferences", "Edit preferences")}
                    </button>
                  </div>

                  {/* Meal type selector */}
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{
                      color: "#23322D",
                      fontSize: 20,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      margin: "0 0 12px 0",
                      fontFamily: "'DM Sans', sans-serif"
                    }}>
                      {t("meal_type_title", "WHICH MEAL ARE WE DECIDING FOR?")}
                    </h2>
                    <ChipRow>
                      {MEAL_TYPES.map((mt) => (
                        <Chip
                          key={mt.id}
                          active={selectedMealType === mt.id}
                          onClick={() => setSelectedMealType(mt.id)}
                          style={{
                            fontSize: 14,
                            padding: "12px 20px",
                            fontWeight: selectedMealType === mt.id ? 700 : 500
                          }}
                        >
                          <span style={{ marginRight: 6 }}>{mt.icon}</span>
                          {t("meal_" + mt.id, mt.label)}
                        </Chip>
                      ))}
                    </ChipRow>
                  </div>

                  <Section title={t("pantry_title", "WHAT'S IN THE PANTRY?")}>
                    <ChipRow>
                      {PANTRY.map((p) => (
                        <Chip key={p.id} active={pantry === p.id} onClick={() => setPantry(pantry === p.id ? null : p.id)}>
                          {t("pantry_" + p.id, p.label)}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <Section title={t("time_title", "HOW MUCH TIME DO YOU HAVE?")}>
                    <ChipRow>
                      {EFFORT.map((e) => (
                        <Chip key={e.id} active={effort === e.id} onClick={() => setEffort(effort === e.id ? null : e.id)}>
                          <e.icon size={13} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                          {t("effort_" + e.id, e.label)}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <Section title={t("diet_title", "ANY DIETARY RESTRICTIONS?")}>
                    <ChipRow>
                      {DIET.map((d) => (
                        <Chip key={d.id} active={diet.includes(d.id)} onClick={() => toggleDiet(d.id)}>
                          {t("diet_" + d.id.replace(/-/g, "_"), d.label)}
                        </Chip>
                      ))}
                    </ChipRow>
                  </Section>

                  <button className="tn-btn-primary tn-focus" style={styles.decideBtn} onClick={() => decide(false)}>
                    {t("decide_btn", "Decide for me")}
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
                      <div className="tn-mono" style={styles.cardEyebrow}>{selectedMealType === "breakfast" ? t("breakfast_decision", "YOUR BREAKFAST DECISION IS") : selectedMealType === "lunch" ? t("lunch_decision", "YOUR LUNCH DECISION IS") : t("dinner_decision", "YOUR DINNER DECISION IS")}</div>
                      <div style={styles.cardName}>{current.name}</div>
                      <div style={styles.cardReason}>{current.reason}</div>
                      <div style={styles.cardTagRow}>
                        {[current.effort === "10" ? t("effort_10", "10 min") : current.effort === "30" ? t("effort_30", "30 min") : t("effort_cook", "I'll cook"), ...current.diet]
                          .slice(0, 3)
                          .map((tagItem, i) => (
                            <span key={i} className="tn-mono" style={styles.cardTag}>
                              {typeof tagItem === "string" && (
                                tagItem === "vegetarian" ? t("diet_vegetarian", "veggie") :
                                tagItem === "dairy-free" ? t("diet_dairy_free", "no dairy") :
                                tagItem === "kid-friendly" ? t("diet_kid_friendly", "kid-friendly") : tagItem
                              )}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div style={styles.actionRow}>
                    <button className="tn-focus" style={styles.rejectBtn} onClick={notThis}>
                      {t("not_this", "Not this one")}
                    </button>
                    <button className="tn-focus" style={styles.acceptBtn} onClick={() => setStage("done")}>
                      <Check size={16} style={{ marginRight: 6, verticalAlign: "-3px" }} />
                      {t("doing_this", "Doing this")}
                    </button>
                  </div>
                </div>
              )}

              {stage === "done" && current && (
                <div style={styles.donePanel}>
                  <div className="tn-mono" style={styles.eyebrow}>{t("decided_eyebrow", "DECIDED")}</div>
                  <div style={styles.doneName}>{current.name}</div>
                  {current.image && (
                    <img src={current.image} alt={current.name} style={styles.doneImage} />
                  )}
                  <p style={styles.doneSub}>{t("food_is_on_the_way", "Something amazing is coming!")}</p>

                  {!showRecipe && currentRecipe && (
                    <button className="tn-focus" style={styles.recipeBtn} onClick={() => setShowRecipe(true)}>
                      <Utensils size={14} style={{ marginRight: 7, verticalAlign: "-2px" }} />
                      {t("how_do_i_make_it", "How do I make it")}
                    </button>
                  )}

                  {showRecipe && currentRecipe && (
                    <div style={styles.recipeBox} className="tn-card-enter">
                      <div className="tn-mono" style={styles.recipeTime}>
                        <Clock size={12} style={{ marginRight: 5, verticalAlign: "-2px" }} />
                        {currentRecipe.time} · {t("serves_2", "serves 2")}
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <button className="tn-focus" style={{ ...styles.decideBtn, marginTop: 0, padding: "12px 18px", fontSize: "14px", boxShadow: "none" }} onClick={startCooking}>
                          <ChefHat size={16} style={{ marginRight: 8, verticalAlign: "-3px" }} />
                          {t("cook_step_by_step", "Cook Step-by-Step")}
                        </button>
                      </div>

                      <div className="tn-mono" style={styles.recipeLabel}>{t("ingredients", "INGREDIENTS")}</div>
                      <ul style={styles.ingList}>
                        {currentRecipe.ingredients.map((ing, i) => (
                          <li key={i} style={styles.ingItem}>{ing}</li>
                        ))}
                      </ul>

                      <div className="tn-mono" style={styles.recipeLabel}>{t("steps", "PREPARATION STEPS")}</div>
                      <ol style={styles.stepList}>
                        {currentRecipe.steps.map((step, i) => (
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
                    {t("decide_again_tomorrow", "Decide again tomorrow")}
                  </button>
                </div>
              )}

              {stage === "ready" && (
                <div style={styles.donePanel} className="tn-card-enter">
                  <div className="tn-mono" style={styles.eyebrow}>
                    <ChefHat size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                    BON APPÉTIT
                  </div>
                  <h1 style={{ ...styles.h1, fontSize: 28, marginBottom: 8, textAlign: "center" }}>
                    {t("food_ready", "Food is ready, please serve!")}
                  </h1>
                  {current && (
                    <p style={{ color: "#6B8F82", fontSize: 15, margin: "0 0 16px", fontFamily: "'Inter', sans-serif" }}>
                      {current.name}
                    </p>
                  )}

                  <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 24px" }}>
                    <ChefBotDiningTable />
                  </div>

                  <button 
                    className="tn-focus" 
                    style={{
                      ...styles.decideBtn, 
                      marginTop: 10,
                      boxShadow: "none",
                      width: "100%",
                      maxWidth: 320,
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }} 
                    onClick={() => {
                      setIsCooking(false);
                      setIsRinging(false);
                      setCurrent(null);
                      setShowRecipe(false);
                      setStage("health");
                    }}
                  >
                    {t("thanks_chef", "Thanks Chef")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* 7-Day Free Trial Paywall Modal (Anchor Cards Styling) */}
      {showPaywall && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.78)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 14px",
          overflowY: "auto",
        }} className="tn-card-enter">
          <div style={{
            background: "#FFFFFF",
            borderRadius: 24,
            border: "1px solid #C2DDD4",
            padding: "28px 24px 22px",
            maxWidth: 420,
            width: "100%",
            textAlign: "center",
            position: "relative",
            maxHeight: "94vh",
            overflowY: "auto",
            boxShadow: "0 20px 40px -15px rgba(35, 50, 45, 0.25)",
          }}>
            {/* Close Button - Visible unless trial ended / past due */}
            {subStatus !== "trial_ended_pending_charge" && subStatus !== "past_due" && (
              <button
                onClick={() => setShowPaywall(false)}
                aria-label="Close"
                className="tn-focus"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "#F5F9F7",
                  border: "1px solid #C2DDD4",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6B8F82",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  zIndex: 2,
                }}
              >
                ✕
              </button>
            )}

            {/* Top Row: Pill Badge & Language Switcher */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#CEE9DF", border: "1px solid #A8D5C5", padding: "4px 12px", borderRadius: 999 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#045137" }} />
                <span className="tn-mono" style={{ fontSize: 10.5, color: "#045137", fontWeight: 700, letterSpacing: "0.06em" }}>
                  CHEF ELO PRO · 7-DAY FREE TRIAL
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowLangModal(true)}
                className="tn-focus"
                aria-label="Change Language"
                style={{
                  background: "#F5F9F7",
                  border: "1px solid #C2DDD4",
                  borderRadius: 999,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#045137",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                <Globe size={13} />
                <span>{LANGUAGES.find(l => l.code === lang)?.label || "English"}</span>
                <span style={{ fontSize: 9, opacity: 0.7 }}>▾</span>
              </button>
            </div>

            <h2 style={{ color: "#23322D", fontSize: 24, fontWeight: 800, margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {t("paywall_title", "Decide & Cook Without Limits.")}
            </h2>
            <p style={{ color: "#6B8F82", fontSize: 13.5, margin: "0 0 18px", lineHeight: 1.45, fontFamily: "'Inter', sans-serif" }}>
              {t("paywall_sub", "Unlock daily meal decider, step-by-step cooking timers, and dietary safeguards.")}
            </p>

            {/* Anchor-Style Feature Checklist */}
            <div style={{
              background: "#F8FAF9",
              border: "1px solid #E5EFEA",
              borderRadius: 16,
              padding: "12px 14px",
              marginBottom: 16,
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: 9,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ background: "#045137", color: "#CEE9DF", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>
                  ✓
                </div>
                <div style={{ color: "#23322D", fontSize: 12.5, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  Instant Meal Decisions <span style={{ color: "#6B8F82", fontWeight: 400 }}>· tailored to your pantry</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ background: "#045137", color: "#CEE9DF", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>
                  ✓
                </div>
                <div style={{ color: "#23322D", fontSize: 12.5, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  Smart Step Timers <span style={{ color: "#6B8F82", fontWeight: 400 }}>· cook step-by-step stress-free</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ background: "#045137", color: "#CEE9DF", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>
                  ✓
                </div>
                <div style={{ color: "#23322D", fontSize: 12.5, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  Allergy & Health Protection <span style={{ color: "#6B8F82", fontWeight: 400 }}>· custom diet filters</span>
                </div>
              </div>
            </div>

            {/* Anchor-Style Plan Selection Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {/* Annual Plan (Default / Featured) */}
              <div
                onClick={() => setSelectedPlan("annual")}
                style={{
                  border: selectedPlan === "annual" ? "2px solid #045137" : "1px solid #D5E5DF",
                  background: selectedPlan === "annual" ? "#F1F9F6" : "#FFFFFF",
                  borderRadius: 14,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: selectedPlan === "annual" ? "6px solid #045137" : "2px solid #C2DDD4",
                    background: "#FFF",
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "#23322D", fontSize: 14.5, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
                        Annual Plan
                      </span>
                      <span style={{
                        background: "#D05F0D",
                        color: "#FFFFFF",
                        fontSize: 9.5,
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: 999,
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.04em",
                      }}>
                        SAVE 50%
                      </span>
                    </div>
                    <div style={{ color: "#6B8F82", fontSize: 11.5, fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
                      $29.99/year · only <strong>~$2.50/mo</strong> after trial
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#045137", fontSize: 17, fontWeight: 800, fontFamily: "'DM Sans', sans-serif" }}>
                    $2.50<span style={{ fontSize: 11.5, fontWeight: 500, color: "#6B8F82" }}>/mo</span>
                  </div>
                </div>
              </div>

              {/* Monthly Plan */}
              <div
                onClick={() => setSelectedPlan("monthly")}
                style={{
                  border: selectedPlan === "monthly" ? "2px solid #045137" : "1px solid #D5E5DF",
                  background: selectedPlan === "monthly" ? "#F1F9F6" : "#FFFFFF",
                  borderRadius: 14,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: selectedPlan === "monthly" ? "6px solid #045137" : "2px solid #C2DDD4",
                    background: "#FFF",
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ color: "#23322D", fontSize: 14.5, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
                      Monthly Plan
                    </div>
                    <div style={{ color: "#6B8F82", fontSize: 11.5, fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
                      Standard monthly billing
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#23322D", fontSize: 17, fontWeight: 800, fontFamily: "'DM Sans', sans-serif" }}>
                    $4.99<span style={{ fontSize: 11.5, fontWeight: 500, color: "#6B8F82" }}>/mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Input Field */}
            <div style={{ marginBottom: 14, textAlign: "left" }}>
              <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: "#045137", letterSpacing: "0.08em", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>
                YOUR EMAIL (ACCOUNT ACCESS)
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="alex@example.com"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: emailError ? "1.5px solid #D05F0D" : "1px solid #C2DDD4",
                  borderRadius: 12,
                  fontSize: 14,
                  color: "#23322D",
                  background: "#F8FAF9",
                  fontFamily: "'Inter', sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {emailError && (
                <div style={{ color: "#D05F0D", fontSize: 11.5, marginTop: 4, fontFamily: "'Inter', sans-serif" }}>
                  {emailError}
                </div>
              )}
            </div>

            {/* Anchor-Style Trial Timeline Box */}
            <div style={{
              background: "#F8FAF9",
              border: "1px solid #E5EFEA",
              borderRadius: 14,
              padding: "12px 14px",
              marginBottom: 16,
              textAlign: "left",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
            }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>🛡️</span>
              <div>
                <div style={{ color: "#045137", fontSize: 12, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
                  Day 0: $0.00 Charged Today · 7-Day Free Trial
                </div>
                <div style={{ color: "#6B8F82", fontSize: 11, lineHeight: 1.45, fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
                  Card verified with $1.00 check (refunded immediately). On Day 7, automatic billing begins at {selectedPlan === "annual" ? "$29.99/yr" : "$4.99/mo"}.
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="tn-focus"
              disabled={isVerifyingTrial}
              style={{
                ...styles.decideBtn,
                marginTop: 0,
                boxShadow: "none",
                padding: "15px 20px",
                fontSize: 15.5,
                fontWeight: 700,
                width: "100%",
                background: isVerifyingTrial ? "#B34E09" : "#D05F0D",
                color: "#FFFFFF",
                cursor: isVerifyingTrial ? "wait" : "pointer",
                borderRadius: 14,
              }}
              onClick={() => startFreeTrial(selectedPlan)}
            >
              {isVerifyingTrial ? "Verifying Card..." : t("enter_card", "Enter Card to Activate 7-Day Free Trial")}
            </button>

            {/* Microcopy Under Button */}
            <p style={{ color: "#6B8F82", fontSize: 11.5, margin: "8px 0 14px", fontFamily: "'Inter', sans-serif" }}>
              {selectedPlan === "annual" ? "Free for 7 days, then $29.99/year (~$2.50/mo)." : "Free for 7 days, then $4.99/month."}
            </p>

            {/* Legal / Policy Links */}
            <div style={{ display: "flex", justifyContent: "center", gap: 14, fontSize: 11, color: "#6B8F82", fontFamily: "'Inter', sans-serif" }}>
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => {
                  setRestoreEmail(userEmail || "");
                  setRestoreMessage("");
                  setShowRestoreModal(true);
                }}
              >
                {t("restore_purchases", "Restore Purchases")}
              </span>
              <span>·</span>
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setShowTermsModal(true)}
              >
                {t("terms", "Terms")}
              </span>
              <span>·</span>
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setShowPrivacyModal(true)}
              >
                {t("privacy", "Privacy")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Restore Purchases Modal */}
      {showRestoreModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.8)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 14px",
        }} className="tn-card-enter">
          <div style={{
            background: "#FFFFFF",
            borderRadius: 20,
            border: "1px solid #C2DDD4",
            padding: "24px 20px 20px",
            maxWidth: 360,
            width: "100%",
            textAlign: "center",
            position: "relative",
          }}>
            <button
              onClick={() => setShowRestoreModal(false)}
              aria-label="Close"
              className="tn-focus"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "#F5F9F7",
                border: "1px solid #C2DDD4",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6B8F82",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            <h3 style={{ color: "#23322D", fontSize: 18, fontWeight: 700, margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>
              Restore Purchases
            </h3>
            <p style={{ color: "#6B8F82", fontSize: 13, lineHeight: 1.4, margin: "0 0 16px", fontFamily: "'Inter', sans-serif" }}>
              Enter the email address you used when activating your 7-day free trial or subscription.
            </p>

            <input
              type="email"
              value={restoreEmail}
              onChange={(e) => setRestoreEmail(e.target.value)}
              placeholder="your-email@example.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #C2DDD4",
                borderRadius: 10,
                fontSize: 14,
                color: "#23322D",
                background: "#F5F9F7",
                fontFamily: "'Inter', sans-serif",
                outline: "none",
                boxSizing: "border-box",
                marginBottom: 10,
              }}
            />

            {restoreMessage && (
              <div style={{ color: "#D05F0D", fontSize: 12, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
                {restoreMessage}
              </div>
            )}

            <button
              className="tn-focus"
              disabled={restoreLoading}
              style={{
                ...styles.decideBtn,
                marginTop: 0,
                boxShadow: "none",
                padding: "12px 20px",
                fontSize: 14.5,
                fontWeight: 700,
                width: "100%",
                background: restoreLoading ? "#B34E09" : "#D05F0D",
                color: "#FFFFFF",
                cursor: restoreLoading ? "wait" : "pointer",
                borderRadius: 12,
              }}
              onClick={handleRestorePurchases}
            >
              {restoreLoading ? "Checking..." : "Look Up Account"}
            </button>
          </div>
        </div>
      )}

      {/* Navigation Menu Modal */}
      {showMenu && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.72)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }} className="tn-card-enter" onClick={() => setShowMenu(false)}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: 22,
            border: "1px solid #C2DDD4",
            padding: "24px 22px",
            maxWidth: 360,
            width: "100%",
            boxShadow: "0 20px 40px -15px rgba(35, 50, 45, 0.25)",
            position: "relative",
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div className="tn-mono" style={{ fontSize: 12, color: "#045137", fontWeight: 700, letterSpacing: "0.08em" }}>
                {t("settings_header", "SETTINGS & OPTIONS")}
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="tn-focus"
                style={{
                  background: "#F5F9F7",
                  border: "1px solid #C2DDD4",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6B8F82",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Language Switcher */}
              <button
                onClick={() => { setShowMenu(false); setShowLangModal(true); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 14px",
                  background: "#F5F9F7",
                  border: "1px solid #C2DDD4",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#23322D",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <Globe size={18} color="#045137" />
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: "#6B8F82", fontWeight: 500 }}>{t("language", "LANGUAGE")}</div>
                  <div>{LANGUAGES.find(l => l.code === lang)?.label || "English"}</div>
                </div>
                <span style={{ fontSize: 12, color: "#6B8F82" }}>Change ▾</span>
              </button>

              {/* Live Chat & Support */}
              <button
                onClick={openLiveSupport}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 14px",
                  background: "#F5F9F7",
                  border: "1px solid #C2DDD4",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#23322D",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <MessageCircle size={18} color="#045137" />
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: "#6B8F82", fontWeight: 500 }}>{t("support", "SUPPORT")}</div>
                  <div>{t("live_chat", "Live Chat")}</div>
                </div>
              </button>

              {/* Terms of Service */}
              <button
                onClick={() => { setShowMenu(false); setShowTermsModal(true); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 14px",
                  background: "#F5F9F7",
                  border: "1px solid #C2DDD4",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#23322D",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <FileText size={18} color="#045137" />
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: "#6B8F82", fontWeight: 500 }}>{t("legal", "LEGAL")}</div>
                  <div>{t("terms", "Terms of Service")}</div>
                </div>
              </button>

              {/* Privacy Policy */}
              <button
                onClick={() => { setShowMenu(false); setShowPrivacyModal(true); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 14px",
                  background: "#F5F9F7",
                  border: "1px solid #C2DDD4",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#23322D",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <ShieldCheck size={18} color="#045137" />
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: "#6B8F82", fontWeight: 500 }}>{t("privacy_header", "PRIVACY")}</div>
                  <div>{t("privacy", "Privacy Policy")}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      
      {/* Pre-Chat Lead Capture Modal */}
      {showPreChatModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.76)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }} className="tn-card-enter" onClick={() => setShowPreChatModal(false)}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: 24,
            border: "1px solid #C2DDD4",
            padding: "26px 22px 22px",
            maxWidth: 380,
            width: "100%",
            boxShadow: "0 20px 40px -15px rgba(35, 50, 45, 0.25)",
            position: "relative",
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowPreChatModal(false)}
              className="tn-focus"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "#F5F9F7",
                border: "1px solid #C2DDD4",
                borderRadius: "50%",
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6B8F82",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            <div className="tn-mono" style={{ fontSize: 11, color: "#045137", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4, textAlign: "left" }}>
              {t("prechat_eyebrow", "LIVE CHAT SUPPORT")}
            </div>
            <h3 style={{ color: "#23322D", fontSize: 22, fontWeight: 800, margin: "0 0 6px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em", textAlign: "left" }}>
              {t("prechat_title", "Start Live Chat")}
            </h3>
            <p style={{ color: "#6B8F82", fontSize: 13, margin: "0 0 16px", lineHeight: 1.45, fontFamily: "'Inter', sans-serif", textAlign: "left" }}>
              {t("prechat_sub", "Please enter your details to connect directly with Chef Elo support.")}
            </p>

            <form onSubmit={startChatSession} style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
              {chatError && (
                <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", color: "#DC2626", padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>
                  {chatError}
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#23322D", marginBottom: 4 }}>
                  {t("label_name", "Full Name")} *
                </label>
                <input
                  type="text"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  placeholder={t("ph_name", "e.g. Alex Morgan")}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #C2DDD4",
                    background: "#F5F9F7",
                    fontSize: 14,
                    color: "#23322D",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#23322D", marginBottom: 4 }}>
                  {t("label_email", "Email Address")} *
                </label>
                <input
                  type="email"
                  value={chatEmail}
                  onChange={(e) => setChatEmail(e.target.value)}
                  placeholder={t("ph_email", "e.g. alex@example.com")}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #C2DDD4",
                    background: "#F5F9F7",
                    fontSize: 14,
                    color: "#23322D",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#23322D", marginBottom: 4 }}>
                  {t("label_phone", "Phone Number")} *
                </label>
                <input
                  type="tel"
                  value={chatPhone}
                  onChange={(e) => setChatPhone(e.target.value)}
                  placeholder={t("ph_phone", "e.g. +1 555-0199")}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #C2DDD4",
                    background: "#F5F9F7",
                    fontSize: 14,
                    color: "#23322D",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
              </div>

              <button
                type="submit"
                className="tn-btn-primary tn-focus"
                style={{
                  ...styles.decideBtn,
                  marginTop: 6,
                  width: "100%",
                  padding: "12px 18px",
                  fontSize: 15,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                }}
              >
                <MessageCircle size={16} />
                <span>{t("btn_start_chat", "Start Chat")}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Support Maintenance Modal */}
      {showSupportModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.72)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }} className="tn-card-enter" onClick={() => setShowSupportModal(false)}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: 22,
            border: "1px solid #C2DDD4",
            padding: "28px 24px 24px",
            maxWidth: 360,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 20px 40px -15px rgba(35, 50, 45, 0.25)",
            position: "relative",
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowSupportModal(false)}
              className="tn-focus"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "#F5F9F7",
                border: "1px solid #C2DDD4",
                borderRadius: "50%",
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6B8F82",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            <div style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#FEE2E2",
              border: "1px solid #FCA5A5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              color: "#DC2626"
            }}>
              <MessageCircle size={24} />
            </div>

            <div className="tn-mono" style={{ fontSize: 11, color: "#DC2626", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 6 }}>
              LIVE SUPPORT
            </div>

            <h3 style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#23322D",
              margin: "0 0 10px 0",
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Undergoing maintenance
            </h3>

            <p style={{
              fontSize: 13.5,
              color: "#6B8F82",
              lineHeight: 1.5,
              margin: "0 0 20px 0",
              fontFamily: "'Inter', sans-serif"
            }}>
              Our live chat support system is currently undergoing scheduled maintenance. Please check back shortly or try again later.
            </p>

            <button
              onClick={() => setShowSupportModal(false)}
              className="tn-focus"
              style={{
                background: "#045137",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 12,
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 700,
                width: "100%",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 14px",
        }} className="tn-card-enter">
          <div style={{
            background: "#FFFFFF",
            borderRadius: 22,
            border: "1px solid #C2DDD4",
            padding: "24px 22px 20px",
            maxWidth: 390,
            width: "100%",
            textAlign: "left",
            position: "relative",
            maxHeight: "85vh",
            overflowY: "auto",
          }}>
            <button
              onClick={() => setShowTermsModal(false)}
              aria-label="Close"
              className="tn-focus"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "#F5F9F7",
                border: "1px solid #C2DDD4",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6B8F82",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            <div className="tn-mono" style={{ fontSize: 10, color: "#045137", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4 }}>
              LEGAL AGREEMENT
            </div>
            <h3 style={{ color: "#23322D", fontSize: 20, fontWeight: 700, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>
              Terms of Service
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12.5, color: "#23322D", lineHeight: 1.45, fontFamily: "'Inter', sans-serif" }}>
              <div>
                <strong style={{ color: "#045137" }}>1. 7-Day Free Trial:</strong> Your subscription begins with a 7-day free trial granting full access to Chef Elo Pro. You will not be charged the subscription rate during your trial.
              </div>
              <div>
                <strong style={{ color: "#045137" }}>2. Card Verification:</strong> A temporary $1.00 card verification authorization is processed and refunded immediately ($0.00 net cost) to validate payment method authenticity.
              </div>
              <div>
                <strong style={{ color: "#045137" }}>3. Automatic Renewal:</strong> At the conclusion of your 7-day trial period, your payment method is automatically charged for your selected plan ($29.99/year or $4.99/month).
              </div>
              <div>
                <strong style={{ color: "#045137" }}>4. Cancellation:</strong> You may cancel anytime before Day 7 to avoid recurring charges. Restoring active accounts is supported with your registered email.
              </div>
            </div>

            <button
              className="tn-focus"
              style={{
                marginTop: 18,
                boxShadow: "none",
                padding: "12px 20px",
                fontSize: 14,
                fontWeight: 700,
                width: "100%",
                background: "#D05F0D",
                color: "#FFFFFF",
                borderRadius: 12,
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => setShowTermsModal(false)}
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 14px",
        }} className="tn-card-enter">
          <div style={{
            background: "#FFFFFF",
            borderRadius: 22,
            border: "1px solid #C2DDD4",
            padding: "24px 22px 20px",
            maxWidth: 390,
            width: "100%",
            textAlign: "left",
            position: "relative",
            maxHeight: "85vh",
            overflowY: "auto",
          }}>
            <button
              onClick={() => setShowPrivacyModal(false)}
              aria-label="Close"
              className="tn-focus"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "#F5F9F7",
                border: "1px solid #C2DDD4",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6B8F82",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            <div className="tn-mono" style={{ fontSize: 10, color: "#045137", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4 }}>
              YOUR PRIVACY FIRST
            </div>
            <h3 style={{ color: "#23322D", fontSize: 20, fontWeight: 700, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>
              Privacy Policy
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12.5, color: "#23322D", lineHeight: 1.45, fontFamily: "'Inter', sans-serif" }}>
              <div>
                <strong style={{ color: "#045137" }}>1. Zero Data Selling:</strong> We never sell your personal details, dietary preferences, or pantry history to third parties or data brokers.
              </div>
              <div>
                <strong style={{ color: "#045137" }}>2. Bank-Grade Security:</strong> Payment information is tokenized with 256-bit encryption through Flutterwave. Raw card details never touch our application servers.
              </div>
              <div>
                <strong style={{ color: "#045137" }}>3. Local Storage:</strong> Dietary restrictions, allergy selections, and cooking logs are stored locally on your device for maximum speed and privacy.
              </div>
              <div>
                <strong style={{ color: "#045137" }}>4. Email Identity:</strong> Your email address is strictly used to maintain your subscription state and restore access across devices.
              </div>
            </div>

            <button
              className="tn-focus"
              style={{
                marginTop: 18,
                boxShadow: "none",
                padding: "12px 20px",
                fontSize: 14,
                fontWeight: 700,
                width: "100%",
                background: "#D05F0D",
                color: "#FFFFFF",
                borderRadius: 12,
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => setShowPrivacyModal(false)}
            >
              Close Privacy Policy
            </button>
          </div>
        </div>
      )}

      {/* Language Selection Modal */}
      {showLangModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 14px",
        }} className="tn-card-enter">
          <div style={{
            background: "#FFFFFF",
            borderRadius: 22,
            border: "1px solid #C2DDD4",
            padding: "24px 20px 20px",
            maxWidth: 360,
            width: "100%",
            textAlign: "center",
            position: "relative",
          }}>
            <button
              onClick={() => setShowLangModal(false)}
              aria-label="Close"
              className="tn-focus"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "#F5F9F7",
                border: "1px solid #C2DDD4",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6B8F82",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#CEE9DF", border: "1px solid #A8D5C5", padding: "3px 10px", borderRadius: 999, marginBottom: 8 }}>
              <Globe size={12} color="#045137" />
              <span className="tn-mono" style={{ fontSize: 10, color: "#045137", fontWeight: 700, letterSpacing: "0.06em" }}>
                LANGUAGE / IDIOMA / 语言
              </span>
            </div>

            <h3 style={{ color: "#23322D", fontSize: 19, fontWeight: 700, margin: "0 0 14px", fontFamily: "'DM Sans', sans-serif" }}>
              {t("select_language", "Select Language")}
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxHeight: "55vh", overflowY: "auto" }}>
              {LANGUAGES.map((l) => {
                const isActive = lang === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className="tn-focus"
                    style={{
                      background: isActive ? "#045137" : "#F8FAF9",
                      color: isActive ? "#FFFFFF" : "#23322D",
                      border: isActive ? "1px solid #045137" : "1px solid #E2EBE7",
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      textAlign: "left",
                      transition: "all 0.12s ease",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{l.flag}</span>
                    <span style={{ flex: 1 }}>{l.label}</span>
                    {isActive && <Check size={14} color="#0BE49B" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PWA Install Modal */}
      {showInstallModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 14px",
        }} className="tn-card-enter">
          <div style={{
            background: "#FFFFFF",
            borderRadius: 22,
            border: "1px solid #C2DDD4",
            padding: "24px 20px 20px",
            maxWidth: 370,
            width: "100%",
            textAlign: "center",
            position: "relative",
          }}>
            <button
              onClick={() => {
                setShowInstallModal(false);
                try { sessionStorage.setItem("elo_install_dismissed", "true"); } catch {}
              }}
              aria-label="Close"
              className="tn-focus"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "#F5F9F7",
                border: "1px solid #C2DDD4",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6B8F82",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            {/* Colorful Avatar Badge - No solid white box */}
            <div style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
              background: "transparent",
            }}>
              <ChefBotAvatar style={{ width: 60, height: 60 }} />
            </div>

            <h3 style={{ color: "#23322D", fontSize: 20, fontWeight: 700, margin: "0 0 6px", fontFamily: "'DM Sans', sans-serif" }}>
              Install Chef Elo
            </h3>
            <p style={{ color: "#6B8F82", fontSize: 13, lineHeight: 1.45, margin: "0 0 16px", fontFamily: "'Inter', sans-serif" }}>
              Add Chef Elo to your Home Screen for 1-tap access, offline cooking, and a full-screen experience.
            </p>

            {isInstalling ? (
              <div style={{
                background: "#F8FAF9",
                border: "1px solid #C2DDD4",
                borderRadius: 14,
                padding: "16px",
                margin: "10px 0 16px",
                textAlign: "center"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#045137",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.02em",
                  marginBottom: 8
                }}>
                  <span style={{ fontSize: 11 }}>{installStepText}</span>
                  <span>{installProgress}%</span>
                </div>
                <div style={{
                  width: "100%",
                  height: 8,
                  background: "#E0EDE8",
                  borderRadius: 999,
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${installProgress}%`,
                    background: "linear-gradient(90deg, #D05F0D 0%, #0BE49B 100%)",
                    borderRadius: 999,
                    transition: "width 0.2s ease-out"
                  }} />
                </div>
              </div>
            ) : deferredPrompt ? (
              <button
                className="tn-focus"
                style={{
                  ...styles.decideBtn,
                  marginTop: 0,
                  boxShadow: "none",
                  padding: "14px 20px",
                  fontSize: 15,
                  fontWeight: 700,
                  width: "100%",
                  background: "#D05F0D",
                  color: "#FFFFFF",
                  borderRadius: 14,
                  cursor: "pointer",
                }}
                onClick={handleInstallClick}
              >
                Install App Now
              </button>
            ) : isIOS ? (
              <div style={{
                background: "#F8FAF9",
                border: "1px solid #E2EBE7",
                borderRadius: 14,
                padding: "14px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 16,
                fontSize: 12.5,
                color: "#23322D",
                fontFamily: "'Inter', sans-serif",
              }}>
                <div style={{ fontWeight: 700, color: "#045137", fontSize: 13 }}>
                  📱 How to Install on iOS (Safari):
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>1️⃣</span>
                  <span>Tap the <strong>Share button</strong> 📤 in Safari's bottom toolbar.</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>2️⃣</span>
                  <span>Scroll down & tap <strong>'Add to Home Screen'</strong> ➕.</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>3️⃣</span>
                  <span>Tap <strong>'Add'</strong> in the top-right corner.</span>
                </div>
              </div>
            ) : (
              <div style={{
                background: "#F8FAF9",
                border: "1px solid #E2EBE7",
                borderRadius: 14,
                padding: "14px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 16,
                fontSize: 12.5,
                color: "#23322D",
                fontFamily: "'Inter', sans-serif",
              }}>
                <div style={{ fontWeight: 700, color: "#045137", fontSize: 13 }}>
                  📱 How to Install:
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>1️⃣</span>
                  <span>Tap your browser menu (⋮ or ⠇).</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>2️⃣</span>
                  <span>Select <strong>'Add to Home Screen'</strong> or <strong>'Install App'</strong>.</span>
                </div>
              </div>
            )}

            {!deferredPrompt && (
              <button
                className="tn-focus"
                style={{
                  ...styles.decideBtn,
                  marginTop: 0,
                  boxShadow: "none",
                  padding: "12px 20px",
                  fontSize: 14,
                  fontWeight: 700,
                  width: "100%",
                  background: "#D05F0D",
                  color: "#FFFFFF",
                  borderRadius: 12,
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={() => {
                  setShowInstallModal(false);
                  try { sessionStorage.setItem("elo_install_dismissed", "true"); } catch {}
                }}
              >
                Got It
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mandatory PWA Update Modal */}
      {showUpdateModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          zIndex: 999999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }} className="tn-card-enter">
          <div style={{
            background: "#FFFFFF",
            borderRadius: 24,
            border: "1px solid #C2DDD4",
            padding: "32px 24px 28px",
            maxWidth: 365,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            position: "relative",
          }}>
            {/* Colorful Avatar Badge - No solid white box */}
            <div style={{
              width: 70,
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              background: "transparent",
            }}>
              <ChefBotAvatar style={{ width: 64, height: 64 }} />
            </div>

            <div className="tn-mono" style={{ fontSize: 11, color: "#D05F0D", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 6 }}>
              UPDATE REQUIRED
            </div>

            <h3 style={{ color: "#23322D", fontSize: 22, fontWeight: 800, margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>
              App Update Available
            </h3>
            <p style={{ color: "#6B8F82", fontSize: 13.5, lineHeight: 1.5, margin: "0 0 22px", fontFamily: "'Inter', sans-serif" }}>
              A new version of Chef Elo with fresh recipes, features, and performance enhancements is ready. Please tap <strong>Update Now</strong> to continue using the app.
            </p>

            {isApplyingUpdate ? (
              <div style={{
                background: "#F8FAF9",
                border: "1px solid #C2DDD4",
                borderRadius: 14,
                padding: "16px",
                textAlign: "center"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#045137",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.02em",
                  marginBottom: 8
                }}>
                  <span style={{ fontSize: 11 }}>{updateStepText}</span>
                  <span>{updateProgress}%</span>
                </div>
                <div style={{
                  width: "100%",
                  height: 8,
                  background: "#E0EDE8",
                  borderRadius: 999,
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${updateProgress}%`,
                    background: "linear-gradient(90deg, #D05F0D 0%, #0BE49B 100%)",
                    borderRadius: 999,
                    transition: "width 0.15s ease-out"
                  }} />
                </div>
              </div>
            ) : (
              <button
                className="tn-focus"
                style={{
                  ...styles.decideBtn,
                  marginTop: 0,
                  boxShadow: "0 4px 14px rgba(208,95,13,0.35)",
                  padding: "15px 20px",
                  fontSize: 16,
                  fontWeight: 700,
                  width: "100%",
                  background: "#D05F0D",
                  color: "#FFFFFF",
                  borderRadius: 14,
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={handleApplyUpdate}
              >
                Update Now
              </button>
            )}
          </div>
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
    boxShadow: "none",
    transition: "transform 0.1s ease, opacity 0.1s ease",
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
    background: "#F5F9F7",
    border: "1px solid #C2DDD4",
    color: "#23322D",
    borderRadius: 8,
    padding: "13px 22px",
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
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
    width: 76,
    height: 76,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
