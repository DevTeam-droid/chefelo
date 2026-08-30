import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChefHat, Flame, Clock, Utensils, Check, RotateCcw, Pin, Play, Pause, SkipForward, SkipBack, Globe, Smartphone, Download } from "lucide-react";

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
    morning_eyebrow: "MORNING'S DECISION",
    morning_title: "What's for breakfast?",
    afternoon_eyebrow: "AFTERNOON'S DECISION",
    afternoon_title: "What's for lunch?",
    tonight_eyebrow: "TONIGHT'S DECISION",
    tonight_title: "What's for dinner?",
    pantry_title: "WHAT'S IN THE PANTRY?",
    time_title: "HOW MUCH TIME DO YOU HAVE?",
    diet_title: "ANY DIETARY RESTRICTIONS?",
    allergies_title: "ALLERGIES & RESTRICTIONS",
    health_title: "HEALTH & DIET GOALS",
    decide_btn: "Decide for me",
    not_this: "Not this one",
    doing_this: "Doing this",
    cook_now: "Cook this now",
    view_recipe: "View recipe",
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
    scouting: "Elo is scouting the web...",
    scouting_sub: "Finding the perfect recipe matching your pantry and filters.",
    continue: "Continue",
    skip: "Skip for now",
    select_language: "Select Language",
    paywall_title: "Decide & Cook Without Limits.",
    paywall_sub: "Unlock daily AI meal decider, step-by-step cooking timers, and dietary safeguards.",
    annual_plan: "Annual Plan",
    monthly_plan: "Monthly Plan",
    save_50: "SAVE 50%",
    enter_card: "Enter Card to Activate 7-Day Free Trial",
    restore_purchases: "Restore Purchases",
    terms: "Terms",
    privacy: "Privacy",
  },
  es: {
    morning_eyebrow: "DECISIÓN DE LA MAÑANA",
    morning_title: "¿Qué desayunamos hoy?",
    afternoon_eyebrow: "DECISIÓN DEL MEDIODÍA",
    afternoon_title: "¿Qué almorzamos hoy?",
    tonight_eyebrow: "DECISIÓN DE LA NOCHE",
    tonight_title: "¿Qué cenamos hoy?",
    pantry_title: "¿QUÉ TIENES EN LA DESPENSA?",
    time_title: "¿CUÁNTO TIEMPO TIENES?",
    diet_title: "¿RESTRICCIONES DIETÉTICAS?",
    allergies_title: "ALERGIAS Y RESTRICCIONES",
    health_title: "OBJETIVOS DE SALUD Y DIETA",
    decide_btn: "Decide por mí",
    not_this: "Esta no",
    doing_this: "Hagamos esta",
    cook_now: "Cocinar ahora",
    view_recipe: "Ver receta",
    ingredients: "INGREDIENTES",
    steps: "PASOS DE PREPARACIÓN",
    step_of: "PASO",
    of: "DE",
    quit_cooking: "Salir",
    next_step: "Siguiente paso",
    prev_step: "Paso anterior",
    done: "Listo",
    thanks_chef: "¡Gracias Chef!",
    food_ready: "¡La comida está lista, a servir!",
    hi_elo: "¡Hola! Soy Elo, tu Chef.",
    scouting: "Elo está explorando recetas...",
    scouting_sub: "Buscando la receta perfecta para tus ingredientes y preferencias.",
    continue: "Continuar",
    skip: "Omitir por ahora",
    select_language: "Seleccionar Idioma",
    paywall_title: "Decide y Cocina Sin Límites.",
    paywall_sub: "Desbloquea el recomendador diario de IA, temporizadores de cocina y filtros dietéticos.",
    annual_plan: "Plan Anual",
    monthly_plan: "Plan Mensual",
    save_50: "AHORRA 50%",
    enter_card: "Ingresar Tarjeta para Prueba de 7 Días",
    restore_purchases: "Restaurar Compras",
    terms: "Términos",
    privacy: "Privacidad",
  },
  fr: {
    morning_eyebrow: "DÉCISION DU MATIN",
    morning_title: "Qu'est-ce qu'on mange ce matin ?",
    afternoon_eyebrow: "DÉCISION DU MIDI",
    afternoon_title: "Qu'est-ce qu'on mange ce midi ?",
    tonight_eyebrow: "DÉCISION DU SOIR",
    tonight_title: "Qu'est-ce qu'on mange ce soir ?",
    pantry_title: "QU'Y A-T-IL DANS VOTRE GARDE-MANGER ?",
    time_title: "COMBIEN DE TEMPS AVEZ-VOUS ?",
    diet_title: "DES RESTRICTIONS ALIMENTAIRES ?",
    allergies_title: "ALLERGIES ET RESTRICTIONS",
    health_title: "OBJECTIFS NUTRITION ET SANTÉ",
    decide_btn: "Décide pour moi",
    not_this: "Pas celle-ci",
    doing_this: "Je fais ça",
    cook_now: "Cuisiner maintenant",
    view_recipe: "Voir la recette",
    ingredients: "INGRÉDIENTS",
    steps: "ÉTAPES DE PRÉPARATION",
    step_of: "ÉTAPE",
    of: "SUR",
    quit_cooking: "Quitter",
    next_step: "Étape suivante",
    prev_step: "Étape précédente",
    done: "Terminé",
    thanks_chef: "Merci Chef !",
    food_ready: "Le repas est prêt, servez !",
    hi_elo: "Salut ! Je suis Elo, votre Chef.",
    scouting: "Elo cherche la meilleure recette...",
    scouting_sub: "Recherche de la recette idéale selon vos ingrédients.",
    continue: "Continuer",
    skip: "Passer pour l'instant",
    select_language: "Choisir la langue",
    paywall_title: "Décidez et Cuisinez Sans Limites.",
    paywall_sub: "Accédez au sélecteur intelligent, aux minuteurs et aux filtres personnalisés.",
    annual_plan: "Plan Annuel",
    monthly_plan: "Plan Mensual",
    save_50: "ÉCONOMISEZ 50%",
    enter_card: "Activer l'Essai Gratuit de 7 Jours",
    restore_purchases: "Restaurer les achats",
    terms: "Conditions",
    privacy: "Confidentialité",
  },
  de: {
    morning_eyebrow: "ENTSCHEIDUNG AM MORGEN",
    morning_title: "Was gibt es zum Frühstück?",
    afternoon_eyebrow: "ENTSCHEIDUNG AM MITTAG",
    afternoon_title: "Was gibt es zum Mittagessen?",
    tonight_eyebrow: "ENTSCHEIDUNG AM ABEND",
    tonight_title: "Was gibt es heute Abend?",
    pantry_title: "WAS IST IN DER VORRATSKAMMER?",
    time_title: "WIE VIEL ZEIT HAST DU?",
    diet_title: "DIÄTVORGABEN ODER ALLERGIEN?",
    allergies_title: "ALLERGIEN & EINSCHRÄNKUNGEN",
    health_title: "GESUNDHEITS- & ERNÄHRUNGSZIELE",
    decide_btn: "Entscheide für mich",
    not_this: "Nicht dieses",
    doing_this: "Das mache ich",
    cook_now: "Jetzt kochen",
    view_recipe: "Rezept ansehen",
    ingredients: "ZUTATEN",
    steps: "ZUBEREITUNGSSCHRITTE",
    step_of: "SCHRITT",
    of: "VON",
    quit_cooking: "Abbrechen",
    next_step: "Nächster Schritt",
    prev_step: "Vorheriger Schritt",
    done: "Fertig",
    thanks_chef: "Danke, Chef!",
    food_ready: "Das Essen ist fertig, bitte servieren!",
    hi_elo: "Hallo! Ich bin Elo, dein Küchenchef.",
    scouting: "Elo sucht nach den besten Rezepten...",
    scouting_sub: "Perfektes Rezept passend zu deinen Zutaten und Filtern wird gesucht.",
    continue: "Weiter",
    skip: "Vorläufig überspringen",
    select_language: "Sprache wählen",
    paywall_title: "Kochen & Entscheiden Ohne Limits.",
    paywall_sub: "Unbegrenzte KI-Mahlzeiten-Entscheidungen, Schritt-für-Schritt-Timer & Schutzfilter.",
    annual_plan: "Jahresplan",
    monthly_plan: "Monatsplan",
    save_50: "50% SPAREN",
    enter_card: "Karte eingeben für 7-Tage-Testversion",
    restore_purchases: "Käufe wiederherstellen",
    terms: "AGB",
    privacy: "Datenschutz",
  },
  it: {
    morning_eyebrow: "DECISIONE DEL MATTINO",
    morning_title: "Cosa mangiamo a colazione?",
    afternoon_eyebrow: "DECISIONE DEL POMERIGGIO",
    afternoon_title: "Cosa mangiamo a pranzo?",
    tonight_eyebrow: "DECISIONE DI STASERA",
    tonight_title: "Cosa mangiamo stasera?",
    pantry_title: "COSA C'È IN DISPENSA?",
    time_title: "QUANTO TEMPO HAI?",
    diet_title: "RESTRIZIONI ALIMENTARI?",
    allergies_title: "ALLERGIE E INTOLLERANZE",
    health_title: "OBIETTIVI DI SALUTE E DIETA",
    decide_btn: "Decidi per me",
    not_this: "Non questo",
    doing_this: "Faccio questo",
    cook_now: "Cucina ora",
    view_recipe: "Vedi ricetta",
    ingredients: "INGREDIENTI",
    steps: "PASSAGGI DI PREPARAZIONE",
    step_of: "PASSO",
    of: "DI",
    quit_cooking: "Esci",
    next_step: "Passo successivo",
    prev_step: "Passo precedente",
    done: "Fatto",
    thanks_chef: "Grazie Chef!",
    food_ready: "Il cibo è pronto, buon appetito!",
    hi_elo: "Ciao! Sono Elo, il tuo Chef.",
    scouting: "Elo sta cercando le ricette migliori...",
    scouting_sub: "Ricerca della ricetta ideale per i tuoi ingredienti.",
    continue: "Continua",
    skip: "Salta per ora",
    select_language: "Seleziona Lingua",
    paywall_title: "Decidi e Cucina Senza Limiti.",
    paywall_sub: "Consigli intelligenti ogni giorno, timer di cottura e sicurezza alimentare.",
    annual_plan: "Piano Annuale",
    monthly_plan: "Piano Mensile",
    save_50: "RISPARMIA 50%",
    enter_card: "Attiva la Prova Gratuita di 7 Giorni",
    restore_purchases: "Ripristina acquisti",
    terms: "Termini",
    privacy: "Privacy",
  },
  pt: {
    morning_eyebrow: "DECISÃO DA MANHÃ",
    morning_title: "O que vamos tomar no café?",
    afternoon_eyebrow: "DECISÃO DA TARDE",
    afternoon_title: "O que vamos almoçar?",
    tonight_eyebrow: "DECISÃO DA NOITE",
    tonight_title: "O que vamos jantar?",
    pantry_title: "O QUE VOCÊ TEM NA DESPENSA?",
    time_title: "QUANTO TEMPO VOCÊ TEM?",
    diet_title: "RESTRIÇÕES ALIMENTARES?",
    allergies_title: "ALERGIAS E RESTRIÇÕES",
    health_title: "OBJETIVOS DE SAÚDE E DIETA",
    decide_btn: "Decida por mim",
    not_this: "Esse não",
    doing_this: "Vou fazer esse",
    cook_now: "Cozinhar agora",
    view_recipe: "Ver receita",
    ingredients: "INGREDIENTES",
    steps: "MODO DE PREPARO",
    step_of: "PASSO",
    of: "DE",
    quit_cooking: "Sair",
    next_step: "Próximo passo",
    prev_step: "Passo anterior",
    done: "Pronto",
    thanks_chef: "Obrigado Chef!",
    food_ready: "A refeição está pronta, pode servir!",
    hi_elo: "Olá! Eu sou o Elo, seu Chef.",
    scouting: "Elo está procurando receitas...",
    scouting_sub: "Encontrando a receita ideal para seus ingredientes.",
    continue: "Continuar",
    skip: "Pular por enquanto",
    select_language: "Selecionar Idioma",
    paywall_title: "Decida e Cozinhe Sem Limites.",
    paywall_sub: "Decisões diárias com IA, temporizadores passo a passo e proteção alimentar.",
    annual_plan: "Plano Anual",
    monthly_plan: "Plano Mensal",
    save_50: "ECONOMIZE 50%",
    enter_card: "Ativar Teste Grátis de 7 Dias",
    restore_purchases: "Restaurar Compras",
    terms: "Termos",
    privacy: "Privacidade",
  },
  zh: {
    morning_eyebrow: "早晨的决定",
    morning_title: "早餐吃什么？",
    afternoon_eyebrow: "中午的决定",
    afternoon_title: "午餐吃什么？",
    tonight_eyebrow: "今晚的决定",
    tonight_title: "晚餐吃什么？",
    pantry_title: "厨房里有什么食材？",
    time_title: "你有多少时间？",
    diet_title: "饮食偏好或限制？",
    allergies_title: "过敏与禁忌",
    health_title: "健康与饮食目标",
    decide_btn: "帮我决定",
    not_this: "换一个",
    doing_this: "就做这个",
    cook_now: "立即烹饪",
    view_recipe: "查看食谱",
    ingredients: "所需食材",
    steps: "烹饪步骤",
    step_of: "第",
    of: "步，共",
    quit_cooking: "退出烹饪",
    next_step: "下一步",
    prev_step: "上一步",
    done: "完成",
    thanks_chef: "谢谢大厨！",
    food_ready: "美食做好了，请享用！",
    hi_elo: "你好！我是主厨 Elo。",
    scouting: "Elo 正在搜索最佳食谱...",
    scouting_sub: "正在根据您的食材和偏好匹配最佳做法。",
    continue: "继续",
    skip: "暂不设置",
    select_language: "选择语言",
    paywall_title: "无限开启智能烹饪灵感",
    paywall_sub: "解锁每日 AI 膳食决策、精准烹饪计时与过敏保护。",
    annual_plan: "包年计划",
    monthly_plan: "按月订阅",
    save_50: "立省 50%",
    enter_card: "输入卡片开启 7 天免费试用",
    restore_purchases: "恢复购买",
    terms: "服务条款",
    privacy: "隐私政策",
  },
  ja: {
    morning_eyebrow: "朝のメニュー決定",
    morning_title: "朝ごはんは何にする？",
    afternoon_eyebrow: "昼のメニュー決定",
    afternoon_title: "お昼ごはんは何にする？",
    tonight_eyebrow: "今夜のメニュー決定",
    tonight_title: "今夜は何を作ろう？",
    pantry_title: "キッチンにある食材は？",
    time_title: "調理時間はどれくらい？",
    diet_title: "アレルギーや食事制限は？",
    allergies_title: "アレルギーと制限",
    health_title: "健康と食事の目標",
    decide_btn: "決めてもらう",
    not_this: "別のメニュー",
    doing_this: "これを作る",
    cook_now: "調理スタート",
    view_recipe: "レシピを見る",
    ingredients: "材料",
    steps: "作り方",
    step_of: "ステップ",
    of: "/",
    quit_cooking: "調理を終了",
    next_step: "次へ",
    prev_step: "戻る",
    done: "完成！",
    thanks_chef: "シェフありがとう！",
    food_ready: "お料理が完成しました！どうぞお召し上がりください。",
    hi_elo: "こんにちは！シェフのEloです。",
    scouting: "Eloが最適なレシピを探しています...",
    scouting_sub: "食材と好みに合わせてベストなレシピをマッチング中。",
    continue: "次へ進む",
    skip: "スキップ",
    select_language: "言語を選択",
    paywall_title: "無制限のスマート料理体験を解放",
    paywall_sub: "AIメニュー提案、スマートタイマー、食事制限サポートをフル活用。",
    annual_plan: "年額プラン",
    monthly_plan: "月額プラン",
    save_50: "50% お得",
    enter_card: "カードを登録して7日間無料体験を開始",
    restore_purchases: "購入を復元",
    terms: "利用規約",
    privacy: "プライバシーポリシー",
  },
  ar: {
    morning_eyebrow: "قرار الصباح",
    morning_title: "ماذا سنأكل على الإفطار؟",
    afternoon_eyebrow: "قرار الظهيرة",
    afternoon_title: "ماذا سنأكل على الغداء؟",
    tonight_eyebrow: "قرار الليلة",
    tonight_title: "ماذا سنطبخ الليلة؟",
    pantry_title: "ما هي المكونات المتوفرة لديك؟",
    time_title: "كم من الوقت لديك؟",
    diet_title: "أي قيود غذائية؟",
    allergies_title: "الحساسية والقيود",
    health_title: "أهداف الصحة والتغذية",
    decide_btn: "اختر لي",
    not_this: "غير هذه",
    doing_this: "سأطبخ هذه",
    cook_now: "ابدأ الطبخ الآن",
    view_recipe: "عرض الوصفة",
    ingredients: "المكونات",
    steps: "خطوات التحضير",
    step_of: "خطوة",
    of: "من",
    quit_cooking: "إنهاء الطبخ",
    next_step: "الخطوة التالية",
    prev_step: "الخطوة السابقة",
    done: "تم",
    thanks_chef: "شكراً شيف!",
    food_ready: "الطعام جاهز، بالهناء والشفاء!",
    hi_elo: "مرحباً! أنا إيلو، طاهيك الذكي.",
    scouting: "إيلو يبحث عن أفضل وصفة...",
    scouting_sub: "جاري البحث عن أنسب وصفة حسب مكوناتك وتفضيلاتك.",
    continue: "متابعة",
    skip: "تخطي الآن",
    select_language: "اختر اللغة",
    paywall_title: "اطبخ وقرر بلا حدود.",
    paywall_sub: "احصل على مقترحات الوجبات الذكية ومؤقتات الطبخ المباشرة وفلاتر الحساسية.",
    annual_plan: "الخطة السنوية",
    monthly_plan: "الخطة الشهرية",
    save_50: "وفر 50%",
    enter_card: "أدخل البطاقة لتفعيل التجربة المجانية 7 أيام",
    restore_purchases: "استعادة المشتريات",
    terms: "الشروط",
    privacy: "الخصوصية",
  },
};

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
  { id: "m27", name: "Spicy peanut sesame noodles", reason: "Creamy, savory peanut sauce tossed with warm noodles and scallions.", effort: "10", pantry: ["pasta"], diet: ["vegetarian"], allergies: ["nuts", "gluten"], health: [], image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80" },
  { id: "m28", name: "Walnut & spinach pesto pasta", reason: "Rich, vibrant nutty pesto ready in fifteen minutes.", effort: "10", pantry: ["pasta", "veg"], diet: ["vegetarian"], allergies: ["nuts", "dairy", "gluten"], health: [], image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80" },
  // --- Extended Meal Library ---
  { id: "m29", name: "Slow-roasted lamb shoulder", reason: "Fork-tender lamb that practically shreds itself.", effort: "cook", pantry: ["beef"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
  { id: "m30", name: "Turkish lamb kofta", reason: "Spiced minced lamb patties, perfect over flatbread.", effort: "30", pantry: ["beef"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly"], image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80" },
  { id: "m31", name: "Scrambled eggs & avocado", reason: "Creamy eggs, buttery avo — breakfast any time.", effort: "10", pantry: ["empty", "veg"], diet: ["vegetarian", "dairy-free", "kid-friendly"], allergies: ["eggs"], health: ["diabetic-friendly", "low-sodium"], image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80" },
  { id: "m32", name: "Shakshuka", reason: "Poached eggs in spiced tomato sauce — one pan wonder.", effort: "30", pantry: ["veg", "empty"], diet: ["vegetarian", "dairy-free"], allergies: ["eggs"], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80" },
  { id: "m33", name: "Fluffy pancakes", reason: "Weekend mood? Stack them high.", effort: "30", pantry: ["empty", "staples"], diet: ["vegetarian", "kid-friendly"], allergies: ["gluten", "eggs", "dairy"], health: [], image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80" },
  { id: "m34", name: "Chicken tikka masala", reason: "Rich, fragrant curry that warms every corner.", effort: "cook", pantry: ["chicken"], diet: ["kid-friendly"], allergies: ["dairy"], health: [], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" },
  { id: "m35", name: "Prawn pad Thai", reason: "Sweet, tangy, nutty — the classic Thai street dish.", effort: "30", pantry: ["seafood", "pasta"], diet: ["dairy-free"], allergies: ["nuts", "gluten", "eggs"], health: [], image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80" },
  { id: "m36", name: "Slow cooker beef stew", reason: "Set it in the morning, eat like a king at dinner.", effort: "cook", pantry: ["beef", "veg"], diet: ["dairy-free"], allergies: [], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=600&q=80" },
  { id: "m37", name: "Pork pulled buns", reason: "Sweet slow-cooked pork piled into soft buns.", effort: "cook", pantry: ["pork"], diet: ["kid-friendly"], allergies: ["gluten"], health: [], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
  { id: "m38", name: "Smoked sausage & bean casserole", reason: "Hearty, smoky, satisfying — done in 30.", effort: "30", pantry: ["pork", "staples"], diet: ["dairy-free"], allergies: [], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80" },
  { id: "m39", name: "Tuna pasta bake", reason: "Store cupboard staples, creamy oven finish.", effort: "30", pantry: ["seafood", "pasta"], diet: ["kid-friendly"], allergies: ["dairy", "gluten"], health: [], image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" },
  { id: "m40", name: "Thai green chicken curry", reason: "Fragrant coconut broth, crisp veg, aromatic herbs.", effort: "30", pantry: ["chicken", "veg"], diet: ["dairy-free"], allergies: [], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80" },
  { id: "m41", name: "Mushroom risotto", reason: "Silky, earthy, properly comforting.", effort: "cook", pantry: ["veg", "staples"], diet: ["vegetarian"], allergies: ["dairy"], health: [], image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80" },
  { id: "m42", name: "Teriyaki salmon bowls", reason: "Sweet-glazed salmon over steaming rice — 20 minutes.", effort: "30", pantry: ["seafood"], diet: ["dairy-free"], allergies: [], health: ["diabetic-friendly", "low-sodium"], image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80" },
  { id: "m43", name: "Mexican black bean quesadillas", reason: "Crispy, melty, no meat needed.", effort: "10", pantry: ["staples", "veg"], diet: ["vegetarian", "kid-friendly"], allergies: ["dairy", "gluten"], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80" },
  { id: "m44", name: "Honey garlic chicken drumsticks", reason: "Sticky, sweet-savory glaze that everyone fights over.", effort: "30", pantry: ["chicken"], diet: ["dairy-free", "kid-friendly"], allergies: [], health: [], image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80" },
  { id: "m45", name: "Beef burger from scratch", reason: "Juicy patty, your toppings, your rules.", effort: "30", pantry: ["beef"], diet: ["kid-friendly"], allergies: ["gluten"], health: [], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
  { id: "m46", name: "Vietnamese pho broth", reason: "Deeply aromatic, restorative, surprisingly simple.", effort: "cook", pantry: ["beef", "veg"], diet: ["dairy-free"], allergies: ["gluten"], health: ["low-sodium"], image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80" },
  { id: "m47", name: "Caprese stuffed chicken breast", reason: "Mozzarella, basil, tomato — baked to perfection.", effort: "30", pantry: ["chicken", "veg"], diet: ["kid-friendly"], allergies: ["dairy"], health: ["diabetic-friendly"], image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=600&q=80" },
  { id: "m48", name: "Japanese gyudon (beef rice bowl)", reason: "Soy-simmered beef slices over fluffy rice — umami heaven.", effort: "30", pantry: ["beef", "staples"], diet: ["dairy-free"], allergies: ["gluten"], health: [], image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80" },
  { id: "m49", name: "Egg fried rice with ham", reason: "The ultimate fridge-clearout meal in 15 minutes.", effort: "10", pantry: ["pork", "leftovers", "staples"], diet: ["dairy-free", "kid-friendly"], allergies: ["eggs"], health: [], image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80" },
  { id: "m50", name: "Minestrone soup", reason: "Hearty Italian vegetable soup — better the next day.", effort: "30", pantry: ["veg", "staples", "leftovers"], diet: ["vegetarian", "dairy-free"], allergies: ["gluten"], health: ["low-sodium", "diabetic-friendly"], image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80" }
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
  m50: { time: "35 min", ingredients: ["1 can cannellini beans", "2 carrots, 2 celery stalks, 1 zucchini, diced", "1 can diced tomatoes", "1L vegetable stock", "100g small pasta, parmesan rind"], steps: ["Sauté carrot and celery in olive oil 5 min.", "Add zucchini, tomatoes and stock; bring to a boil.", "Add beans, pasta and parmesan rind; simmer 12 min.", "Remove rind, season well; serve with grated parmesan and crusty bread."], durations: [300, 120, 720, 60] }
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

// ---------- Reusable Chef Bot Avatar ----------
function ChefBotAvatar({ style, isScouting = false }) {
  return (
    <svg viewBox="0 0 100 100" style={style || styles.botSvg}>
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
      {isScouting ? (
        <>
          <circle cx="45" cy="51" r="2.5" fill="#0BE49B" />
          <circle cx="55" cy="51" r="2.5" fill="#0BE49B" />
        </>
      ) : (
        <>
          <path d="M 41 50 Q 45 46 49 50" fill="none" stroke="#0BE49B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 51 50 Q 55 46 59 50" fill="none" stroke="#0BE49B" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      
      {/* Mouth */}
      <path d="M 46 56 Q 50 60 54 56" fill="none" stroke="#0BE49B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ---------- Reusable Chef Bot at Dining Table ----------
function ChefBotDiningTable({ style }) {
  return (
    <svg viewBox="0 0 240 200" style={style || { width: "100%", maxWidth: 260, height: "auto" }}>
      {/* Background Soft Floor Shadow */}
      <ellipse cx="120" cy="180" rx="95" ry="14" fill="#EBF4F0" />
      
      {/* Table Legs */}
      <rect x="42" y="145" width="8" height="40" rx="3" fill="#23322D" />
      <rect x="190" y="145" width="8" height="40" rx="3" fill="#23322D" />
      
      {/* Table Top Base */}
      <ellipse cx="120" cy="146" rx="100" ry="20" fill="#23322D" />
      {/* Tablecloth */}
      <ellipse cx="120" cy="143" rx="96" ry="18" fill="#CEE9DF" stroke="#045137" strokeWidth="1" />
      
      {/* Plate */}
      <ellipse cx="120" cy="141" rx="46" ry="11" fill="#FFFFFF" stroke="#C2DDD4" strokeWidth="1.5" />
      <ellipse cx="120" cy="140" rx="32" ry="7" fill="#F5F9F7" />
      
      {/* Food on Plate */}
      <ellipse cx="120" cy="138" rx="22" ry="5.5" fill="#D05F0D" />
      <circle cx="112" cy="137" r="3" fill="#0BE49B" />
      <circle cx="124" cy="136" r="2.5" fill="#F2A93B" />
      <circle cx="118" cy="138" r="2" fill="#045137" />
      
      {/* Steaming Wisps */}
      <path d="M 112 128 Q 109 119 114 112" fill="none" stroke="#6B8F82" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
      <path d="M 120 126 Q 124 117 119 108" fill="none" stroke="#6B8F82" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
      <path d="M 128 128 Q 132 119 127 111" fill="none" stroke="#6B8F82" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />

      {/* Fork on Left */}
      <path d="M 58 133 L 58 147 M 55 133 L 55 139 Q 58 141 61 139 L 61 133" fill="none" stroke="#6B8F82" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Knife on Right */}
      <path d="M 182 133 Q 185 138 185 147" fill="none" stroke="#6B8F82" strokeWidth="1.5" strokeLinecap="round" />

      {/* Chef Bot Elo sitting behind the table */}
      <g transform="translate(70, 15)">
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
        
        {/* Eyes (Happy Closed Smiling LED Arches) */}
        <path d="M 41 50 Q 45 45 49 50" fill="none" stroke="#0BE49B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 51 50 Q 55 45 59 50" fill="none" stroke="#0BE49B" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Mouth (Big Joyful Smile) */}
        <path d="M 44 55 Q 50 63 56 55 Z" fill="#0BE49B" />
        
        {/* Cute Robot Hands resting on the table */}
        <rect x="18" y="93" width="14" height="8" rx="4" fill="#CEE9DF" stroke="#045137" strokeWidth="1" />
        <rect x="68" y="93" width="14" height="8" rx="4" fill="#CEE9DF" stroke="#045137" strokeWidth="1" />
      </g>
    </svg>
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
    const areas = ["Indian", "Mexican", "Thai", "Japanese", "Italian", "British", "American", "Chinese", "French", "Moroccan", "Turkish", "Greek", "Spanish", "Vietnamese"];
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
  const [isFetching, setIsFetching] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

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

  const currentRecipe = current?.recipe || (current ? RECIPES[current.id] : null);

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
    if (deferredPrompt) {
      deferredPrompt.prompt();
      try {
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setShowInstallModal(false);
        }
      } catch {}
      setDeferredPrompt(null);
    } else {
      setShowInstallModal(true);
    }
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
        .tn-mono { font-family: 'IBM Plex Mono', monospace; }
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
            <div style={styles.loaderAvatar}>
              <ChefBotAvatar />
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
              <ChefBotAvatar isScouting={true} />
            </div>
            <h2 style={styles.loaderTitle}>Elo is scouting the web...</h2>
            <p style={{ color: "#6B8F82", fontSize: 14, fontFamily: "'Inter', sans-serif", margin: "-8px 0 10px", textAlign: "center" }}>
              Finding the perfect recipe matching your pantry and filters.
            </p>
            <div style={styles.loaderBarBg}>
              <div style={{ ...styles.loaderBarFill, width: "100%", animation: "tnLoadingBar 2.5s infinite linear" }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="tn-root" style={styles.wrap}>
          {!isCooking && (
            <header style={styles.header}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div className="tn-mono" style={{ ...styles.eyebrow, marginBottom: 0 }}>
                  <ChefHat size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                  {timeInfo.mealType === "breakfast" ? t("morning_eyebrow", timeInfo.eyebrow) : timeInfo.mealType === "lunch" ? t("afternoon_eyebrow", timeInfo.eyebrow) : t("tonight_eyebrow", timeInfo.eyebrow)}
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
                        fontWeight: 600,
                        color: "#FFFFFF",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.02em",
                        boxShadow: "0 2px 6px rgba(208,95,13,0.25)",
                      }}
                    >
                      <Smartphone size={13} style={{ verticalAlign: "-1px" }} />
                      <span>Install App</span>
                    </button>
                  )}
                  {/* Language Switcher Pill */}
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
                      letterSpacing: "0.02em",
                    }}
                  >
                    <Globe size={13} style={{ verticalAlign: "-1px" }} />
                    <span>{LANGUAGES.find(l => l.code === lang)?.label || "English"}</span>
                    <span style={{ fontSize: 9, opacity: 0.7 }}>▾</span>
                  </button>
                </div>
              </div>
              <h1 style={styles.h1}>
                {timeInfo.mealType === "breakfast" ? t("morning_title", timeInfo.title) : timeInfo.mealType === "lunch" ? t("afternoon_title", timeInfo.title) : t("tonight_title", timeInfo.title)}
              </h1>
            </header>
          )}

          {isCooking && current && currentRecipe ? (
            <div style={styles.cookingPanel} className="tn-card-enter">
              {/* Chef Bot Header Card */}
              <div style={styles.botCard}>
                <div style={styles.botAvatarContainer}>
                  <ChefBotAvatar />
                </div>
                <div style={styles.speechBubble}>
                  <div className="tn-mono" style={styles.speechTitle}>CHEF BOT SAYS:</div>
                  <div style={styles.speechText}>
                    {currentRecipe.steps[currentStepIndex]}
                  </div>
                </div>
              </div>

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

                  <button className="tn-btn-primary tn-focus" style={styles.decideBtn} onClick={completeHealthSetup}>
                    Continue
                  </button>
                </div>
              )}

              {stage === "ask" && (
                <div style={styles.askPanel}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <span className="tn-mono" style={{ fontSize: 11, color: "#6B8F82", letterSpacing: "0.08em" }}>
                      {(selectedAllergies.length > 0 || selectedHealth.length > 0)
                        ? `${selectedAllergies.length + selectedHealth.length} FILTER(S) ACTIVE`
                        : "ALL DIETARY FILTERS OFF"}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setStage("health")}
                      style={{ background: "none", border: "none", color: "#045137", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0, textDecoration: "underline", fontFamily: "'Inter', sans-serif" }}
                    >
                      Edit preferences
                    </button>
                  </div>

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

                  <button className="tn-btn-primary tn-focus" style={styles.decideBtn} onClick={() => decide(false)}>
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
                  <p style={styles.doneSub}>Something amazing</p>

                  {!showRecipe && currentRecipe && (
                    <button className="tn-focus" style={styles.recipeBtn} onClick={() => setShowRecipe(true)}>
                      <Utensils size={14} style={{ marginRight: 7, verticalAlign: "-2px" }} />
                      How do I make it
                    </button>
                  )}

                  {showRecipe && currentRecipe && (
                    <div style={styles.recipeBox} className="tn-card-enter">
                      <div className="tn-mono" style={styles.recipeTime}>
                        <Clock size={12} style={{ marginRight: 5, verticalAlign: "-2px" }} />
                        {currentRecipe.time} · serves 2
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <button className="tn-focus" style={{ ...styles.decideBtn, marginTop: 0, padding: "12px 18px", fontSize: "14px", boxShadow: "none" }} onClick={startCooking}>
                          <ChefHat size={16} style={{ marginRight: 8, verticalAlign: "-3px" }} />
                          Cook Step-by-Step
                        </button>
                      </div>

                      <div className="tn-mono" style={styles.recipeLabel}>INGREDIENTS</div>
                      <ul style={styles.ingList}>
                        {currentRecipe.ingredients.map((ing, i) => (
                          <li key={i} style={styles.ingItem}>{ing}</li>
                        ))}
                      </ul>

                      <div className="tn-mono" style={styles.recipeLabel}>STEPS</div>
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
                    Decide again tomorrow
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
                    Food is ready, please serve!
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
                    Thanks Chef
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Immediate App Install Prompt Modal */}
      {showInstallModal && !isStandalone && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(35, 50, 45, 0.65)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }} className="tn-card-enter">
          <div style={{
            background: "#FFFFFF",
            borderRadius: 20,
            border: "1px solid #C2DDD4",
            padding: "30px 24px 26px",
            maxWidth: 360,
            width: "100%",
            textAlign: "center",
            boxShadow: "none",
            position: "relative",
          }}>
            {/* Chef Bot Head Icon Badge */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#23322D",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              padding: 6,
            }}>
              <img src="/favicon.svg" alt="Chef Elo" style={{ width: "100%", height: "100%" }} />
            </div>

            <div className="tn-mono" style={{ fontSize: 11, color: "#045137", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 6 }}>
              APP INSTALLATION
            </div>
            <h2 style={{ color: "#23322D", fontSize: 22, fontWeight: 700, margin: "0 0 10px", fontFamily: "'DM Sans', sans-serif" }}>
              Install Chef Elo
            </h2>

            {isIOS ? (
              <div style={{ background: "#F3FAF7", border: "1px solid #C2DDD4", borderRadius: 12, padding: "14px 16px", margin: "14px 0 20px", textAlign: "left" }}>
                <p style={{ color: "#23322D", fontSize: 13.5, lineHeight: 1.5, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                  To add to your home screen:
                </p>
                <ol style={{ margin: "8px 0 0", paddingLeft: 20, color: "#23322D", fontSize: 13, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                  <li>Tap the <strong>Share</strong> button in Safari</li>
                  <li>Scroll down and tap <strong>Add to Home Screen</strong></li>
                </ol>
              </div>
            ) : (
              <p style={{ color: "#6B8F82", fontSize: 14, lineHeight: 1.5, margin: "0 0 22px", fontFamily: "'Inter', sans-serif" }}>
                Add to your home screen for quick daily meal decisions and instant full-screen cooking mode.
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                className="tn-focus"
                style={{
                  ...styles.decideBtn,
                  marginTop: 0,
                  boxShadow: "none",
                  padding: "14px 20px",
                  fontSize: 15,
                }}
                onClick={handleInstallClick}
              >
                {isIOS ? "Got it" : "Install App"}
              </button>
              <button
                className="tn-focus"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#6B8F82",
                  fontSize: 13.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "8px 12px",
                  fontFamily: "'Inter', sans-serif",
                }}
                onClick={() => setShowInstallModal(false)}
              >
                Maybe later
              </button>
            </div>
          </div>
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
              {t("paywall_sub", "Unlock daily AI meal decider, step-by-step cooking timers, and dietary safeguards.")}
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
                  Instant AI Meal Decisions <span style={{ color: "#6B8F82", fontWeight: 400 }}>· tailored to your pantry</span>
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
              {isVerifyingTrial ? "Verifying Card..." : "Enter Card to Activate 7-Day Free Trial"}
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
                Restore Purchases
              </span>
              <span>·</span>
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setShowTermsModal(true)}
              >
                Terms
              </span>
              <span>·</span>
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setShowPrivacyModal(true)}
              >
                Privacy
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

            <div style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: "#045137",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0 4px 14px rgba(4,81,55,0.22)",
            }}>
              <ChefHat size={28} />
            </div>

            <h3 style={{ color: "#23322D", fontSize: 20, fontWeight: 700, margin: "0 0 6px", fontFamily: "'DM Sans', sans-serif" }}>
              Install Chef Elo
            </h3>
            <p style={{ color: "#6B8F82", fontSize: 13, lineHeight: 1.45, margin: "0 0 16px", fontFamily: "'Inter', sans-serif" }}>
              Add Chef Elo to your Home Screen for 1-tap access, offline cooking, and a full-screen experience.
            </p>

            {deferredPrompt ? (
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
