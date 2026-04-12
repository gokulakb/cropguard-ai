import List "mo:core/List";
import AgronomyTypes "../types/agronomy";

module {
  // ── helpers ───────────────────────────────────────────────────────────────

  func makeContactId(idx : Nat) : Text {
    "expert-" # debug_show (idx);
  };

  func containsCI(haystack : Text, needle : Text) : Bool {
    haystack.toLower().contains(#text (needle.toLower()));
  };

  // ── Seed data helpers ─────────────────────────────────────────────────────

  public func seedCropCalendar(entries : List.List<AgronomyTypes.CropCalendarEntry>) {
    // Rice
    entries.add({ cropType = "Rice"; region = "General"; sowingMonths = [6, 7]; harvestMonths = [10, 11]; growthDuration = 120; notes = "Requires standing water during most growth stages. Transplant seedlings 3–4 weeks after nursery sowing." });
    entries.add({ cropType = "Rice"; region = "South Asia"; sowingMonths = [6, 7]; harvestMonths = [10, 11]; growthDuration = 120; notes = "Kharif season. Aman variety. Ensure controlled irrigation and good drainage before harvest." });
    entries.add({ cropType = "Rice"; region = "Sub-Saharan Africa"; sowingMonths = [5, 6]; harvestMonths = [9, 10]; growthDuration = 115; notes = "Rainfed lowland rice. Use NERICA varieties for upland conditions with lower water availability." });
    // Wheat
    entries.add({ cropType = "Wheat"; region = "General"; sowingMonths = [10, 11]; harvestMonths = [3, 4]; growthDuration = 150; notes = "Cool season crop. Requires vernalization. Optimal germination temperature 12–25°C." });
    entries.add({ cropType = "Wheat"; region = "South Asia"; sowingMonths = [10, 11]; harvestMonths = [3, 4]; growthDuration = 145; notes = "Rabi (winter) crop. Irrigate at crown root initiation, tillering, jointing, flowering, and grain filling stages." });
    entries.add({ cropType = "Wheat"; region = "Sub-Saharan Africa"; sowingMonths = [11, 12]; harvestMonths = [4, 5]; growthDuration = 140; notes = "Grown at higher altitudes. Varieties like CIMMYT BREAD resistant to stem rust recommended." });
    // Maize
    entries.add({ cropType = "Maize"; region = "General"; sowingMonths = [4, 5]; harvestMonths = [8, 9]; growthDuration = 90; notes = "Warm season crop. Requires well-drained fertile soil. Sensitive to waterlogging." });
    entries.add({ cropType = "Maize"; region = "South Asia"; sowingMonths = [6, 7]; harvestMonths = [9, 10]; growthDuration = 95; notes = "Kharif maize. Requires 500–700mm rainfall. Spacing 60×20cm for optimal yield." });
    entries.add({ cropType = "Maize"; region = "Sub-Saharan Africa"; sowingMonths = [3, 4]; harvestMonths = [7, 8]; growthDuration = 90; notes = "Long rains season planting. Use drought-tolerant hybrids (DT varieties). Intercrop with legumes to fix nitrogen." });
    // Tomato
    entries.add({ cropType = "Tomato"; region = "General"; sowingMonths = [2, 3]; harvestMonths = [6, 7]; growthDuration = 70; notes = "Transplant after 4–6 weeks in nursery. Support with stakes. Scout regularly for late blight." });
    entries.add({ cropType = "Tomato"; region = "South Asia"; sowingMonths = [9, 10]; harvestMonths = [1, 2]; growthDuration = 75; notes = "Rabi season tomato. Avoid excess moisture. Apply mulch to reduce soil splash and blight risk." });
    entries.add({ cropType = "Tomato"; region = "Sub-Saharan Africa"; sowingMonths = [2, 3]; harvestMonths = [5, 6]; growthDuration = 70; notes = "Short rains season. Use grafted plants for Fusarium wilt resistance. Drip irrigation preferred." });
    // Potato
    entries.add({ cropType = "Potato"; region = "General"; sowingMonths = [3, 4]; harvestMonths = [6, 7]; growthDuration = 90; notes = "Plant certified seed potatoes. Earth up as plants grow. Harvest when foliage dies back." });
    entries.add({ cropType = "Potato"; region = "South Asia"; sowingMonths = [10, 11]; harvestMonths = [1, 2]; growthDuration = 90; notes = "Winter crop. Rabi season. Use CIP-recommended varieties for late blight tolerance in humid areas." });
    entries.add({ cropType = "Potato"; region = "Sub-Saharan Africa"; sowingMonths = [3, 4]; harvestMonths = [6, 7]; growthDuration = 85; notes = "Grown in highland areas. Victoria and Kenya Baraka varieties popular. Monitor closely for late blight." });
    // Cotton
    entries.add({ cropType = "Cotton"; region = "General"; sowingMonths = [4, 5]; harvestMonths = [9, 10]; growthDuration = 170; notes = "Long season crop. Requires 180+ frost-free days. Deep, well-drained sandy loam soil preferred." });
    entries.add({ cropType = "Cotton"; region = "South Asia"; sowingMonths = [5, 6]; harvestMonths = [10, 11]; growthDuration = 180; notes = "Kharif crop. Bt cotton widely used for bollworm resistance. Avoid waterlogging in early stages." });
    entries.add({ cropType = "Cotton"; region = "Sub-Saharan Africa"; sowingMonths = [11, 12]; harvestMonths = [5, 6]; growthDuration = 165; notes = "November–December planting aligns with rainy season. Scout for jassids, bollworms, and stainer bugs." });
    // Sugarcane
    entries.add({ cropType = "Sugarcane"; region = "General"; sowingMonths = [2, 3]; harvestMonths = [12, 1]; growthDuration = 365; notes = "Plant setts (stem cuttings) 30cm deep. Ratoon crops can produce for 3–5 cycles." });
    entries.add({ cropType = "Sugarcane"; region = "South Asia"; sowingMonths = [2, 3]; harvestMonths = [1, 2]; growthDuration = 360; notes = "Spring planting preferred. CoJ-64 and CoLk-94184 varieties commonly used in North India." });
    entries.add({ cropType = "Sugarcane"; region = "Sub-Saharan Africa"; sowingMonths = [3, 4]; harvestMonths = [3, 4]; growthDuration = 365; notes = "Irrigated sugarcane. Kenya N14 and N19 varieties. Harvested at 12–18 months for maximum sugar content." });
    // Soybean
    entries.add({ cropType = "Soybean"; region = "General"; sowingMonths = [5, 6]; harvestMonths = [9, 10]; growthDuration = 110; notes = "Inoculate seed with Bradyrhizobium for nitrogen fixation. Excellent rotation crop." });
    entries.add({ cropType = "Soybean"; region = "South Asia"; sowingMonths = [6, 7]; harvestMonths = [10, 11]; growthDuration = 110; notes = "Kharif crop. JS-335 variety widely used. Requires 450–700mm well-distributed rainfall." });
    entries.add({ cropType = "Soybean"; region = "Sub-Saharan Africa"; sowingMonths = [11, 12]; harvestMonths = [3, 4]; growthDuration = 105; notes = "Short rains season. Inoculant application critical where soybeans are grown for first time." });
  };

  public func seedExpertContacts(contacts : List.List<AgronomyTypes.ExpertContact>) {
    contacts.add({ id = "expert-0"; name = "Dr. Priya Sharma"; region = "South Asia"; district = "Punjab"; phone = "+91-9876543210"; email = "priya.sharma@agroinstitute.in"; specialization = "Wheat Disease Management"; available = true });
    contacts.add({ id = "expert-1"; name = "Dr. Rajesh Kumar"; region = "South Asia"; district = "Uttar Pradesh"; phone = "+91-9988776655"; email = "rajesh.kumar@krishi.gov.in"; specialization = "Rice Pest and Disease Control"; available = true });
    contacts.add({ id = "expert-2"; name = "Ms. Anika Patel"; region = "South Asia"; district = "Maharashtra"; phone = "+91-9765432109"; email = "anika.patel@cotton.org.in"; specialization = "Cotton and Soybean Agronomy"; available = false });
    contacts.add({ id = "expert-3"; name = "Dr. Samuel Osei"; region = "Sub-Saharan Africa"; district = "Ashanti Region"; phone = "+233-244123456"; email = "s.osei@mofa.gov.gh"; specialization = "Maize and Cassava Disease Control"; available = true });
    contacts.add({ id = "expert-4"; name = "Ms. Fatima Musa"; region = "Sub-Saharan Africa"; district = "Kaduna State"; phone = "+234-8031234567"; email = "fatima.musa@fmard.gov.ng"; specialization = "Tomato and Vegetable Production"; available = true });
    contacts.add({ id = "expert-5"; name = "Dr. James Kariuki"; region = "Sub-Saharan Africa"; district = "Rift Valley"; phone = "+254-712345678"; email = "j.kariuki@kalro.go.ke"; specialization = "Potato Late Blight Management"; available = true });
    contacts.add({ id = "expert-6"; name = "Dr. Maria Santos"; region = "Latin America"; district = "Minas Gerais"; phone = "+55-31-987654321"; email = "m.santos@embrapa.br"; specialization = "Coffee and Tropical Crop Diseases"; available = true });
    contacts.add({ id = "expert-7"; name = "Dr. Li Wei"; region = "East Asia"; district = "Hunan Province"; phone = "+86-731-12345678"; email = "liwei@caas.cn"; specialization = "Rice Blast and Bacterial Blight"; available = false });
    contacts.add({ id = "expert-8"; name = "Dr. Emily Johnson"; region = "North America"; district = "Iowa"; phone = "+1-515-5551234"; email = "ejohnson@extension.iastate.edu"; specialization = "Corn and Soybean Pathology"; available = true });
  };

  public func seedFertilizerGuides(guides : List.List<AgronomyTypes.FertilizerGuide>) {
    // Rice
    guides.add({ cropType = "Rice"; growthStage = "seedling"; npkRatio = "20:20:0"; organicOptions = ["Vermicompost (2 t/ha)", "Green manure (Sesbania)"]; applicationTiming = "At transplanting or 10–14 days after seeding"; soilPhRange = "5.5–7.0"; notes = "High phosphorus at seedling promotes strong root development. Avoid nitrogen excess to prevent lodging later." });
    guides.add({ cropType = "Rice"; growthStage = "vegetative"; npkRatio = "40:0:20"; organicOptions = ["Poultry manure (5 t/ha)", "Azolla bio-fertilizer"]; applicationTiming = "30–35 days after transplanting (active tillering stage)"; soilPhRange = "5.5–7.0"; notes = "Split nitrogen application: 50% at transplanting, 50% at tillering. Zinc sulfate (25 kg/ha) corrects zinc deficiency." });
    guides.add({ cropType = "Rice"; growthStage = "flowering"; npkRatio = "20:0:30"; organicOptions = ["Wood ash (potassium source)", "Compost tea foliar spray"]; applicationTiming = "At panicle initiation, 60–70 days after transplanting"; soilPhRange = "5.5–7.0"; notes = "Potassium promotes grain filling and disease resistance. Reduce nitrogen to prevent blast infection at heading." });
    // Wheat
    guides.add({ cropType = "Wheat"; growthStage = "seedling"; npkRatio = "30:60:30"; organicOptions = ["Farmyard manure (10 t/ha)", "Biofertilizer (Azotobacter)"]; applicationTiming = "At sowing, incorporated into seedbed"; soilPhRange = "6.0–7.5"; notes = "Full phosphorus and potassium at sowing. First nitrogen split at sowing to establish roots quickly." });
    guides.add({ cropType = "Wheat"; growthStage = "vegetative"; npkRatio = "60:0:0"; organicOptions = ["Urea + neem coating", "Decomposed poultry manure"]; applicationTiming = "Crown root initiation stage (21 DAS) and tillering (45 DAS)"; soilPhRange = "6.0–7.5"; notes = "Nitrogen topdressing at tillering boosts tiller formation. Sulfur (20 kg/ha) improves grain protein content." });
    guides.add({ cropType = "Wheat"; growthStage = "flowering"; npkRatio = "0:0:30"; organicOptions = ["Banana peel extract (foliar)", "Wood ash drench"]; applicationTiming = "Jointing to flag leaf stage (50–60 DAS)"; soilPhRange = "6.0–7.5"; notes = "No nitrogen after jointing — promotes lodging and delays maturity. Potassium and boron (1 kg/ha foliar) improve grain set." });
    // Maize
    guides.add({ cropType = "Maize"; growthStage = "seedling"; npkRatio = "25:50:25"; organicOptions = ["Compost (5 t/ha)", "Rock phosphate for low pH soils"]; applicationTiming = "At planting in furrow or broadcast and incorporated"; soilPhRange = "5.8–7.0"; notes = "Zinc deficiency common in maize — apply ZnSO4 (10 kg/ha) as basal. Starter fertilizer promotes early vigor." });
    guides.add({ cropType = "Maize"; growthStage = "vegetative"; npkRatio = "80:0:40"; organicOptions = ["Urea + farmyard manure (10 t/ha)", "Chicken manure (3 t/ha)"]; applicationTiming = "V4–V6 stage (4–6 leaf), 25–30 DAS"; soilPhRange = "5.8–7.0"; notes = "Side-dress nitrogen near plant base. Potassium improves stalk strength and drought tolerance. Avoid heavy application before rain." });
    guides.add({ cropType = "Maize"; growthStage = "flowering"; npkRatio = "30:0:30"; organicOptions = ["Fish meal foliar", "Compost extract"]; applicationTiming = "Pre-tassel to silk stage, 55–65 DAS"; soilPhRange = "5.8–7.0"; notes = "Final nitrogen and potassium application. Boron foliar spray (0.5 kg/ha) improves pollen viability and cob fill." });
    // Tomato
    guides.add({ cropType = "Tomato"; growthStage = "seedling"; npkRatio = "20:40:20"; organicOptions = ["Vermicompost (3 t/ha)", "Bone meal (250 kg/ha)"]; applicationTiming = "At transplanting — mix into transplanting pit"; soilPhRange = "6.0–6.8"; notes = "Calcium-rich amendments (gypsum 500 kg/ha) prevent blossom end rot from the start. Strong root establishment critical." });
    guides.add({ cropType = "Tomato"; growthStage = "vegetative"; npkRatio = "30:15:15"; organicOptions = ["Seaweed extract foliar", "Compost tea weekly"]; applicationTiming = "2–3 weeks after transplanting, then every 2 weeks"; soilPhRange = "6.0–6.8"; notes = "Regular feeding during rapid growth. Magnesium sulfate (Epsom salt, 10g/L foliar) prevents interveinal chlorosis." });
    guides.add({ cropType = "Tomato"; growthStage = "flowering"; npkRatio = "10:10:40"; organicOptions = ["Banana peel fertilizer", "Wood ash (potassium)"]; applicationTiming = "From first flower bud appearance through fruiting"; soilPhRange = "6.0–6.8"; notes = "Shift to high-potassium formula for fruit development. Boron (0.3g/L foliar) improves fruit set. Reduce nitrogen to prevent excessive foliage." });
    // Potato
    guides.add({ cropType = "Potato"; growthStage = "seedling"; npkRatio = "20:60:20"; organicOptions = ["Well-rotted FYM (20 t/ha)", "Bone meal (500 kg/ha)"]; applicationTiming = "At planting, furrow application"; soilPhRange = "5.0–6.5"; notes = "High phosphorus at planting supports strong tuber initiation. Sulfur (20 kg/ha) helps in acidic soils and controls scab." });
    guides.add({ cropType = "Potato"; growthStage = "vegetative"; npkRatio = "60:0:80"; organicOptions = ["Compost (10 t/ha)", "Potassium-rich wood ash"]; applicationTiming = "At earthing up, 4–5 weeks after planting"; soilPhRange = "5.0–6.5"; notes = "Potassium critical for tuber starch development. Avoid excess nitrogen after earthing up — promotes haulm, not tubers." });
    guides.add({ cropType = "Potato"; growthStage = "flowering"; npkRatio = "0:0:60"; organicOptions = ["Liquid seaweed foliar", "Potassium humate solution"]; applicationTiming = "At tuber bulking stage, 60–70 days after planting"; soilPhRange = "5.0–6.5"; notes = "Maximum potassium demand at bulking. Foliar spray of 0.5% calcium chloride prevents internal browning and hollow heart." });
  };

  // ── Crop Calendar ─────────────────────────────────────────────────────────

  public func getCropCalendar(
    entries : List.List<AgronomyTypes.CropCalendarEntry>,
    cropType : Text,
  ) : ?AgronomyTypes.CropCalendarEntry {
    let lower = cropType.toLower();
    entries.find(func(e) { e.cropType.toLower() == lower });
  };

  // ── Yield Estimation ──────────────────────────────────────────────────────

  // Baseline yields in kg/ha for each crop at full health
  func baselineYield(cropType : Text) : Float {
    let lower = cropType.toLower();
    if (lower == "rice") return 4500.0;
    if (lower == "wheat") return 3500.0;
    if (lower == "maize") return 5000.0;
    if (lower == "tomato") return 25000.0;
    if (lower == "potato") return 20000.0;
    if (lower == "cotton") return 1800.0;
    if (lower == "sugarcane") return 70000.0;
    if (lower == "soybean") return 2200.0;
    2000.0; // generic default
  };

  func healthMultiplier(healthStatus : Text) : Float {
    let lower = healthStatus.toLower();
    if (lower == "healthy") return 1.0;
    if (lower == "mild") return 0.8;
    if (lower == "moderate") return 0.6;
    if (lower == "severe") return 0.3;
    0.8; // unknown status treated as mild impact
  };

  public func estimateYield(
    cropType : Text,
    areaHectares : Float,
    healthStatus : Text,
  ) : AgronomyTypes.YieldEstimation {
    let yieldPerHa = baselineYield(cropType) * healthMultiplier(healthStatus);
    let totalYield = yieldPerHa * areaHectares;
    let noteText = if (healthStatus.toLower() == "healthy") {
      "Optimal conditions. Maintain current practices."
    } else if (healthStatus.toLower() == "mild") {
      "Minor disease impact. Treat promptly to prevent progression."
    } else if (healthStatus.toLower() == "moderate") {
      "Significant yield loss expected. Apply targeted treatment immediately."
    } else if (healthStatus.toLower() == "severe") {
      "Severe disease outbreak. Immediate intervention required to salvage crop."
    } else {
      "Health status unknown. Monitor crop condition closely."
    };
    {
      cropType;
      areaHectares;
      healthStatus;
      estimatedYieldKg = totalYield;
      notes = noteText;
    };
  };

  // ── Expert Contacts ───────────────────────────────────────────────────────

  public func getExpertContacts(
    contacts : List.List<AgronomyTypes.ExpertContact>,
    region : Text,
  ) : [AgronomyTypes.ExpertContact] {
    if (region == "" or region == "all") {
      return contacts.toArray();
    };
    contacts.filter(func(c) { containsCI(c.region, region) }).toArray();
  };

  public func addExpertContact(
    contacts : List.List<AgronomyTypes.ExpertContact>,
    name : Text,
    region : Text,
    district : Text,
    phone : Text,
    email : Text,
    specialization : Text,
    available : Bool,
  ) : AgronomyTypes.ExpertContact {
    let id = makeContactId(contacts.size());
    let contact : AgronomyTypes.ExpertContact = {
      id;
      name;
      region;
      district;
      phone;
      email;
      specialization;
      available;
    };
    contacts.add(contact);
    contact;
  };

  // ── Fertilizer Guide ──────────────────────────────────────────────────────

  public func getFertilizerGuide(
    guides : List.List<AgronomyTypes.FertilizerGuide>,
    cropType : Text,
    growthStage : Text,
  ) : ?AgronomyTypes.FertilizerGuide {
    let lowerCrop = cropType.toLower();
    let lowerStage = growthStage.toLower();
    guides.find(func(g) { g.cropType.toLower() == lowerCrop and g.growthStage.toLower() == lowerStage });
  };
};
