import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Array "mo:core/Array";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import ChatTypes "../types/chat";
import ChatLib "../lib/chat";
import OutCallLib "../lib/outcall";

mixin (
  accessControlState : AccessControl.AccessControlState,
  chatMessages : List.List<ChatTypes.ChatMessage>,
  apiConfig : Common.ApiConfig,
  xform : OutCall.Transform,
) {
  public query ({ caller }) func getChatHistory() : async [ChatTypes.ChatMessage] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ChatLib.getChatHistory(chatMessages, caller);
  };

  public shared ({ caller }) func saveChatMessage(
    message : Text,
    role : Common.ChatRole,
  ) : async ChatTypes.ChatMessage {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let nextId = chatMessages.size();
    ChatLib.saveChatMessage(chatMessages, nextId, caller, message, role);
  };

  // Send a user message and return a response.
  // Uses OpenAI when key is configured; falls back to built-in agricultural knowledge base otherwise.
  // Saves both user message and assistant response to chat history.
  public shared ({ caller }) func sendChatMessage(
    userMessage : Text,
  ) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };

    // Save user message to history
    let userMsgId = chatMessages.size();
    ignore ChatLib.saveChatMessage(chatMessages, userMsgId, caller, userMessage, #user);

    let assistantReply : Text = if (apiConfig.openAiApiKey == "") {
      // No API key — use built-in agricultural knowledge base (demo mode)
      fallbackAgriResponse(userMessage);
    } else {
      // OpenAI enhanced mode
      let history = ChatLib.getChatHistory(chatMessages, caller);
      let contextSize = if (history.size() > 10) { 10 } else { history.size() };
      let recentHistory = history.sliceToArray(history.size() - contextSize : Int, history.size());

      var messagesJson = "[{\"role\":\"system\",\"content\":\"You are an expert agricultural AI assistant specializing in crop disease diagnosis, prevention, and treatment. Provide accurate, practical advice about plant diseases, farming practices, and crop management. Keep responses concise and actionable.\"}";
      for (msg in recentHistory.vals()) {
        let roleStr = switch (msg.role) {
          case (#user) { "user" };
          case (#assistant) { "assistant" };
        };
        let escapedMsg = msg.message.replace(#text "\"", "\\\"").replace(#text "\n", "\\n");
        messagesJson := messagesJson # ",{\"role\":\"" # roleStr # "\",\"content\":\"" # escapedMsg # "\"}";
      };
      messagesJson := messagesJson # "]";

      let rawResponse = await OutCallLib.chatWithOpenAI(messagesJson, apiConfig.openAiApiKey, xform);
      extractOpenAIReply(rawResponse);
    };

    // Save assistant response to history
    let assistantMsgId = chatMessages.size();
    ignore ChatLib.saveChatMessage(chatMessages, assistantMsgId, caller, assistantReply, #assistant);

    assistantReply;
  };

  public shared ({ caller }) func clearChatHistory() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ChatLib.clearChatHistory(chatMessages, caller);
  };

  // Built-in agricultural knowledge base for demo/fallback mode.
  // Uses keyword matching on the user message to return relevant crop disease and farming advice.
  func fallbackAgriResponse(msg : Text) : Text {
    let m = msg.toLower();

    // Greeting / introduction
    if (
      m.contains(#text "hello") or m.contains(#text "hi ") or m.contains(#text "hey") or
      m.contains(#text "who are you") or m.contains(#text "what can you do") or
      m.contains(#text "help") or m.contains(#text "start")
    ) {
      return "Hello! I'm AgriBot 🌱 — your agricultural assistant running in basic advice mode. I can help you with crop disease identification, treatment recommendations, pest management, fertilizer guidance, irrigation tips, and general farming advice. Just describe your crop problem or ask me anything about plant care!";
    };

    // Tomato diseases
    if (m.contains(#text "tomato blight") or (m.contains(#text "tomato") and m.contains(#text "blight"))) {
      return "🍅 Tomato Blight (Early & Late Blight):\n\n**Symptoms:** Dark brown spots on leaves with yellow halos (early blight) or water-soaked lesions turning brown-black (late blight).\n\n**Treatment:**\n• Apply copper-based fungicide (copper oxychloride) every 7–10 days\n• Remove and destroy infected leaves immediately\n• Use Mancozeb or Chlorothalonil fungicide sprays\n\n**Prevention:**\n• Ensure good air circulation between plants\n• Avoid overhead watering — use drip irrigation\n• Rotate crops — don't plant tomatoes in the same spot for 3 years\n• Use disease-resistant tomato varieties (e.g., Legend, Defiant)";
    };

    // Tomato general
    if (m.contains(#text "tomato")) {
      return "🍅 Common Tomato Diseases:\n\n1. **Early/Late Blight** — brown spots; treat with copper fungicide\n2. **Fusarium Wilt** — yellowing and wilting; use resistant varieties\n3. **Leaf Curl Virus** — curling leaves; control whitefly vectors\n4. **Bacterial Canker** — brown streaks in stem; remove infected plants\n5. **Septoria Leaf Spot** — small round spots with dark borders; apply Mancozeb\n\nDescribe your tomato's symptoms in detail and I can give more targeted advice!";
    };

    // Blight (general)
    if (m.contains(#text "blight")) {
      return "🌿 Blight Disease Overview:\n\nBlight is a fungal/oomycete disease causing rapid browning and death of plant tissue.\n\n**Types:**\n• **Early Blight** — affects lower leaves first, brown rings in concentric pattern\n• **Late Blight** — spreads fast in cool, wet weather; water-soaked patches turn dark\n• **Fire Blight** — bacterial; common in apples/pears; causes 'burned' look\n\n**General Treatment:**\n• Copper-based or systemic fungicides (Metalaxyl for late blight)\n• Remove infected plant material immediately\n• Improve drainage and air circulation\n• Avoid wetting foliage during irrigation\n\nWhich crop is affected? I can give more specific recommendations!";
    };

    // Rust disease
    if (m.contains(#text "rust") and (m.contains(#text "plant") or m.contains(#text "crop") or m.contains(#text "leaf") or m.contains(#text "wheat") or m.contains(#text "coffee") or m.contains(#text "disease"))) {
      return "🟠 Rust Disease:\n\n**Symptoms:** Orange, yellow, or brown powdery pustules on leaf undersides; leaves may yellow and drop.\n\n**Common types:** Wheat Rust, Coffee Rust, Bean Rust, Soybean Rust\n\n**Treatment:**\n• Fungicides: Propiconazole, Tebuconazole, or Trifloxystrobin\n• Apply at first sign of infection; repeat every 14 days\n• Remove severely infected leaves\n\n**Prevention:**\n• Plant rust-resistant varieties\n• Avoid overcrowding — ensure airflow\n• Rotate crops annually\n• Scout fields regularly during humid weather (rust spreads in moisture)";
    };

    // Powdery mildew
    if (m.contains(#text "mildew") or m.contains(#text "powdery")) {
      return "⬜ Powdery Mildew:\n\n**Symptoms:** White or grey powdery coating on leaves, stems, and buds. Affected leaves may curl, yellow, and drop.\n\n**Treatment:**\n• Spray with potassium bicarbonate solution (most effective organic option)\n• Neem oil spray (2–3 tbsp per liter of water) every 7 days\n• Sulfur-based fungicides (Sulfur dust or wettable sulfur)\n• Chemical: Myclobutanil or Triadimefon for severe cases\n\n**Prevention:**\n• Ensure good air circulation — avoid crowding plants\n• Water at the base, keep foliage dry\n• Remove infected leaves promptly\n• Choose mildew-resistant varieties where available";
    };

    // Leaf spot
    if (m.contains(#text "leaf spot") or m.contains(#text "brown spot") or m.contains(#text "black spot")) {
      return "🟤 Leaf Spot Disease:\n\n**Symptoms:** Circular or irregular spots (brown, black, or grey) on leaves, often with yellow halos. Spots may merge, causing leaf death.\n\n**Common causes:** Fungal (Cercospora, Alternaria, Septoria) or Bacterial\n\n**Treatment:**\n• Fungal: Mancozeb, Chlorothalonil, or Copper hydroxide spray\n• Bacterial: Copper-based bactericides\n• Remove and destroy all spotted leaves\n• Apply fungicide every 7–14 days during wet season\n\n**Prevention:**\n• Avoid overhead irrigation\n• Mulch around plants to prevent soil splash\n• Practice 2–3 year crop rotation\n• Keep tools clean and disinfected";
    };

    // Wilt diseases
    if (m.contains(#text "wilt") or m.contains(#text "wilting")) {
      return "🥀 Wilt Disease:\n\n**Types & Causes:**\n• **Fusarium Wilt** — soil fungus; yellowing starts on one side\n• **Verticillium Wilt** — causes V-shaped yellow lesions; affects many crops\n• **Bacterial Wilt** — spreads via insects; plant collapses suddenly\n• **Root Rot Wilt** — overwatering + poor drainage kills roots\n\n**Treatment:**\n• Fusarium/Verticillium: No cure once infected — remove plants; use resistant varieties next season\n• Bacterial wilt: Control cucumber beetles/aphids with insecticide; remove infected plants\n• Root rot: Improve drainage; reduce watering; apply Metalaxyl drench\n\n**Prevention:**\n• Use certified disease-free seeds\n• Solarize soil before planting\n• Rotate with non-host crops for 3–4 years";
    };

    // Pest management
    if (m.contains(#text "pest") or m.contains(#text "insect") or m.contains(#text "aphid") or m.contains(#text "caterpillar") or m.contains(#text "whitefly") or m.contains(#text "mite") or m.contains(#text "beetle")) {
      return "🐛 Pest Management:\n\n**Common Crop Pests & Controls:**\n\n🔸 **Aphids** — Neem oil spray, insecticidal soap, or introduce ladybugs\n🔸 **Whiteflies** — Yellow sticky traps + Pyrethrin spray; Imidacloprid for severe cases\n🔸 **Spider Mites** — Miticide spray (Abamectin); increase humidity; neem oil\n🔸 **Caterpillars/Armyworms** — Bt (Bacillus thuringiensis) spray; Chlorpyrifos for heavy infestation\n🔸 **Beetles** — Hand-pick; Spinosad or Carbaryl insecticide\n🔸 **Thrips** — Blue sticky traps; Spinosad or Imidacloprid\n\n**IPM Best Practices:**\n• Scout crops weekly for early detection\n• Use resistant crop varieties\n• Maintain beneficial insect habitats\n• Rotate chemical classes to prevent resistance";
    };

    // Fertilizer advice
    if (m.contains(#text "fertilizer") or m.contains(#text "fertiliser") or m.contains(#text "nutrient") or m.contains(#text "npk") or m.contains(#text "nitrogen") or m.contains(#text "phosphorus") or m.contains(#text "potassium")) {
      return "🌿 Fertilizer & Nutrient Guide:\n\n**NPK Basics:**\n• **N (Nitrogen)** — promotes leaf and stem growth; deficiency causes yellowing\n• **P (Phosphorus)** — root development and flowering; deficiency causes purple discoloration\n• **K (Potassium)** — fruit quality and disease resistance; deficiency causes leaf margin browning\n\n**General Recommendations:**\n• Vegetable crops: Apply balanced 10-10-10 NPK at planting, then nitrogen top-dress every 3–4 weeks\n• Cereals (wheat, maize): High nitrogen needs — split applications (basal + top-dress at tillering)\n• Legumes: Low nitrogen needed (fix own N); focus on P and K\n• Fruiting crops: Reduce N, increase K and P during flowering/fruiting\n\n**Tip:** Always conduct a soil test before fertilizing for precise recommendations!";
    };

    // Irrigation advice
    if (m.contains(#text "irrigation") or m.contains(#text "water") or m.contains(#text "watering") or m.contains(#text "drought") or m.contains(#text "dry")) {
      return "💧 Irrigation & Water Management:\n\n**General Guidelines:**\n• Most crops need 25–50mm of water per week\n• Water deeply and infrequently — encourages deep root growth\n• Best time: Early morning (reduces evaporation and fungal risk)\n\n**Methods:**\n🔸 **Drip Irrigation** — Most efficient; 30–50% water savings; reduces foliar disease\n🔸 **Sprinkler** — Good for large areas; avoid in hot midday sun\n🔸 **Furrow** — Low cost; works well for row crops; higher water use\n\n**Drought Stress Signs:**\n• Wilting during hottest part of day\n• Leaf rolling or curling\n• Reduced fruit size\n\n**Drought Management:**\n• Mulch heavily (5–10cm) to retain moisture\n• Use drought-tolerant varieties\n• Apply potassium fertilizer to improve drought tolerance";
    };

    // Soil health
    if (m.contains(#text "soil") or m.contains(#text "ph") or m.contains(#text "compost") or m.contains(#text "organic")) {
      return "🌍 Soil Health & Management:\n\n**Ideal Soil pH by Crop:**\n• Most vegetables: 6.0–7.0\n• Blueberries: 4.5–5.5 (acidic)\n• Potatoes: 5.0–6.0\n• Legumes: 6.0–7.0\n• Wheat/Maize: 6.0–7.0\n\n**Improving Soil Health:**\n• Add compost (5–10 tonnes/hectare annually)\n• Use cover crops (legumes fix nitrogen naturally)\n• Minimize tillage to preserve soil structure\n• Apply lime to raise pH; sulfur or acidic peat to lower pH\n\n**Signs of Unhealthy Soil:**\n• Compaction (water pools on surface)\n• Poor drainage\n• Low earthworm activity\n• Stunted plant growth despite adequate fertilizer";
    };

    // Planting / seeds
    if (m.contains(#text "planting") or m.contains(#text "seed") or m.contains(#text "sowing") or m.contains(#text "germination") or m.contains(#text "seedling")) {
      return "🌱 Planting & Seed Guide:\n\n**Seed Selection:**\n• Use certified, disease-free seeds from reputable suppliers\n• Choose varieties suited to your region's climate\n• For disease-prone areas, select resistant varieties\n\n**Seed Treatment Before Planting:**\n• Hot water treatment (50°C for 25 min) for bacterial diseases\n• Fungicide seed dressing (Thiram, Captan) for fungal diseases\n• Bio-inoculants (Rhizobium) for legume seeds\n\n**Planting Tips:**\n• Plant at correct depth (2–3× seed diameter)\n• Ensure soil temperature is appropriate for germination\n• Maintain proper spacing for airflow and disease prevention\n• Water gently after sowing to avoid seed displacement";
    };

    // Harvest / post-harvest
    if (m.contains(#text "harvest") or m.contains(#text "storage") or m.contains(#text "post-harvest") or m.contains(#text "yield")) {
      return "🌾 Harvest & Post-Harvest Management:\n\n**Harvest Timing:**\n• Harvest at physiological maturity for best quality\n• Avoid harvesting during rain (increases disease risk)\n• Use clean, sanitized tools and containers\n\n**Post-Harvest Disease Prevention:**\n• Cool produce quickly after harvest\n• Sort and remove any damaged or diseased produce immediately\n• Apply approved post-harvest fungicides where necessary (e.g., Thiabendazole for citrus)\n\n**Storage Tips:**\n• Maintain proper temperature and humidity per crop type\n• Ensure good ventilation in storage facilities\n• Keep storage areas clean and pest-free\n• Monitor stored produce regularly for early signs of rot";
    };

    // Weather / season
    if (m.contains(#text "weather") or m.contains(#text "rain") or m.contains(#text "season") or m.contains(#text "humidity") or m.contains(#text "temperature")) {
      return "🌤️ Weather & Seasonal Crop Management:\n\n**High Humidity / Rainy Season:**\n• Increase fungicide spray frequency (fungal diseases thrive in moisture)\n• Improve drainage in fields\n• Avoid excessive nitrogen fertilizer (promotes lush growth susceptible to disease)\n• Scout for blight, mildew, and rust more frequently\n\n**Hot / Dry Season:**\n• Ensure adequate irrigation; use mulch to conserve moisture\n• Watch for heat stress: wilting, leaf scorch, blossom drop\n• Monitor for spider mites (prefer hot dry conditions)\n\n**Cool Season:**\n• Late blight risk increases in cool, wet conditions\n• Protect against frost with row covers or irrigation\n• Slow growth — reduce fertilizer applications";
    };

    // Rice diseases
    if (m.contains(#text "rice") or m.contains(#text "paddy")) {
      return "🌾 Rice Disease Management:\n\n**Common Rice Diseases:**\n\n🔸 **Rice Blast** (most destructive) — diamond-shaped lesions on leaves; spray Tricyclazole or Isoprothiolane\n🔸 **Brown Spot** — oval brown spots; treat with Mancozeb; ensure adequate potassium\n🔸 **Sheath Blight** — water-soaked lesions on leaf sheaths; apply Validamycin or Hexaconazole\n🔸 **Bacterial Leaf Blight** — yellowing from leaf tips; drain fields; avoid excess nitrogen\n🔸 **Tungro Virus** — yellow-orange discoloration; control green leafhoppers with insecticide\n\n**General Tips:**\n• Maintain proper water management (intermittent flooding reduces blast risk)\n• Use certified seeds and resistant varieties\n• Balance NPK fertilization — excess N increases disease susceptibility";
    };

    // Maize / corn diseases
    if (m.contains(#text "maize") or m.contains(#text "corn")) {
      return "🌽 Maize (Corn) Disease Management:\n\n**Common Diseases:**\n\n🔸 **Gray Leaf Spot** — rectangular grey lesions; apply Azoxystrobin fungicide; use resistant varieties\n🔸 **Northern Corn Leaf Blight** — long cigar-shaped lesions; treat with Propiconazole\n🔸 **Maize Streak Virus** — yellow streaks on leaves; control leafhopper vectors\n🔸 **Stalk Rot** (Fusarium/Pythium) — soft, discolored stalk base; improve drainage; avoid plant stress\n🔸 **Fall Armyworm** — ragged feeding damage in whorl; apply Bt spray or Chlorpyrifos\n\n**Management:**\n• Rotate with soybean or legumes\n• Plant early to avoid peak pest pressure\n• Adequate potassium reduces stalk rot risk";
    };

    // Potato diseases
    if (m.contains(#text "potato")) {
      return "🥔 Potato Disease Management:\n\n**Common Diseases:**\n\n🔸 **Late Blight** (Phytophthora infestans) — most devastating; dark water-soaked lesions; apply Metalaxyl+Mancozeb every 7 days\n🔸 **Early Blight** — concentric ring spots; Chlorothalonil spray\n🔸 **Common Scab** — rough corky lesions on tubers; maintain soil pH 5.0–5.2; avoid over-liming\n🔸 **Blackleg** — black stem base, yellowing; use certified seed; improve drainage\n🔸 **Viral Diseases** — mosaic, leaf roll; use certified seed potatoes; control aphids\n\n**Tips:**\n• Always use certified seed tubers\n• Hill up soil around stems to prevent tuber greening\n• Harvest in dry conditions and cure before storage";
    };

    // Fungicide / pesticide
    if (m.contains(#text "fungicide") or m.contains(#text "pesticide") or m.contains(#text "spray") or m.contains(#text "chemical") or m.contains(#text "treatment")) {
      return "🧪 Fungicide & Pesticide Guide:\n\n**Common Fungicides:**\n• **Mancozeb** — broad spectrum; preventive; use for blight, leaf spot, downy mildew\n• **Copper Oxychloride** — bacterial & fungal; safe for organic farming\n• **Propiconazole** — systemic; rust, leaf spot, blight\n• **Metalaxyl** — oomycete diseases (late blight, downy mildew)\n• **Azoxystrobin** — broad spectrum systemic; good for cereals\n\n**Application Tips:**\n• Spray early morning or evening (avoid midday heat)\n• Ensure thorough coverage — both leaf surfaces\n• Rotate fungicide classes to prevent resistance\n• Follow label rates — over-application causes crop damage\n• Observe pre-harvest intervals (PHI) strictly\n\n**Safety:** Wear PPE (gloves, mask, goggles) when handling pesticides.";
    };

    // Disease identification / diagnosis
    if (
      m.contains(#text "identify") or m.contains(#text "diagnosis") or m.contains(#text "what disease") or
      m.contains(#text "symptoms") or m.contains(#text "yellow") or m.contains(#text "brown") or
      m.contains(#text "spot") or m.contains(#text "lesion") or m.contains(#text "dying")
    ) {
      return "🔍 Disease Diagnosis Tips:\n\nTo identify your crop disease accurately, please describe:\n1. **Crop type** (tomato, wheat, rice, potato, etc.)\n2. **Symptoms** — color, shape, and location of spots/lesions\n3. **Pattern** — does it start on lower leaves? One side of the plant?\n4. **Spread rate** — sudden or gradual?\n5. **Recent weather** — hot, humid, rainy, dry?\n6. **Recent inputs** — any new fertilizer or pesticide applied?\n\n**Common symptom clues:**\n🟡 Yellow leaves → nutrient deficiency or virus\n🟤 Brown spots with halos → fungal leaf spot or blight\n⬜ White powder → powdery mildew\n🟠 Orange pustules → rust disease\n🥀 Wilting → wilt disease or root rot\n\nYou can also use the **Disease Prediction** feature to upload a photo of your plant for AI-powered diagnosis!";
    };

    // Thanks / positive feedback
    if (m.contains(#text "thank") or m.contains(#text "thanks") or m.contains(#text "great") or m.contains(#text "helpful") or m.contains(#text "good job")) {
      return "You're welcome! 😊 I'm glad I could help. Feel free to ask me anything else about crop diseases, pest management, fertilizers, or farming practices. Happy farming! 🌱";
    };

    // Default / unrecognized
    "Hi! I'm AgriBot 🌱 running in basic advice mode. I'm here to help with crop disease diagnosis, treatment, pest management, fertilizer guidance, and general farming advice.\n\nI can assist with topics like:\n• 🍅 Tomato, rice, maize, potato diseases\n• 🌿 Blight, rust, mildew, leaf spot, wilt\n• 🐛 Pest management and insecticide advice\n• 💧 Irrigation and water management\n• 🌿 Fertilizer and soil health\n• 🌱 Planting and seed selection\n\nPlease describe your crop problem or ask a specific question, and I'll do my best to help!";
  };

  // Extract the assistant's reply text from OpenAI JSON response.
  // Format: {"choices":[{"message":{"role":"assistant","content":"..."}}]}
  // Returns a descriptive user-facing message on any failure.
  func extractOpenAIReply(json : Text) : Text {
    // outcall.mo prefixes errors with "ERROR:" — surface them clearly
    if (json.startsWith(#text "ERROR:")) {
      return "I'm having trouble connecting to the AI service right now. Please try again later.";
    };

    if (json == "") {
      return "I'm having trouble connecting to the AI service right now. Please try again later.";
    };

    let contentMarker = "\"content\":\"";
    let arr = json.toArray();
    let markerArr = contentMarker.toArray();
    let tLen = arr.size();
    let mLen = markerArr.size();

    // Find "content":"  pattern
    var i = 0;
    var found = false;
    var contentStart = 0;
    label search while (i + mLen <= tLen) {
      var match_ = true;
      var j = 0;
      while (j < mLen) {
        if (arr[i + j] != markerArr[j]) {
          match_ := false;
        };
        j += 1;
      };
      if (match_) {
        found := true;
        contentStart := i + mLen;
        break search;
      };
      i += 1;
    };

    if (not found) {
      return "I couldn't process the AI response. Please consult your local agricultural officer for disease management advice.";
    };

    // Find closing quote (handling escaped quotes \")
    var k = contentStart;
    var resultChars = "";
    var ended = false;
    while (k < tLen and not ended) {
      if (arr[k] == '\\' and k + 1 < tLen and arr[k + 1] == '\"') {
        resultChars := resultChars # "\"";
        k += 2;
      } else if (arr[k] == '\\' and k + 1 < tLen and arr[k + 1] == 'n') {
        resultChars := resultChars # "\n";
        k += 2;
      } else if (arr[k] == '\"') {
        ended := true;
      } else {
        resultChars := resultChars # Text.fromChar(arr[k]);
        k += 1;
      };
    };

    if (resultChars == "") {
      "I'm ready to help with your crop disease questions. Please describe your plant's symptoms.";
    } else {
      resultChars;
    };
  };
};
