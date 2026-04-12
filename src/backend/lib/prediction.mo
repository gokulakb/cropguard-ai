import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Common "../types/common";
import PredictionTypes "../types/prediction";

module {
  public type PredictionRecord = PredictionTypes.PredictionRecord;
  public type DiseaseRecord = PredictionTypes.DiseaseRecord;
  public type PredictionInput = PredictionTypes.PredictionInput;

  public func getPredictionHistory(
    predictions : List.List<PredictionRecord>,
    userId : Common.UserId,
  ) : [PredictionRecord] {
    predictions.filter(func(p) { p.userId == userId }).toArray();
  };

  public func savePrediction(
    predictions : List.List<PredictionRecord>,
    nextId : Nat,
    userId : Common.UserId,
    input : PredictionInput,
    diseaseName : Text,
    confidenceScore : Float,
    severityLevel : Common.SeverityLevel,
  ) : PredictionRecord {
    let record : PredictionRecord = {
      id = nextId;
      userId = userId;
      imageBlob = input.imageBlob;
      diseaseName = diseaseName;
      confidenceScore = confidenceScore;
      severityLevel = severityLevel;
      timestamp = Time.now();
    };
    predictions.add(record);
    record;
  };

  public func getDiseaseRecord(
    diseases : Map.Map<Text, DiseaseRecord>,
    name : Text,
  ) : ?DiseaseRecord {
    diseases.get(name);
  };

  public func listDiseaseRecords(
    diseases : Map.Map<Text, DiseaseRecord>,
  ) : [DiseaseRecord] {
    diseases.values().toArray();
  };

  // Seed the disease database with 15+ diseases across major crops
  public func seedDiseases(diseases : Map.Map<Text, DiseaseRecord>) {
    let records : [DiseaseRecord] = [
      // --- Tomato diseases ---
      {
        id = 1;
        name = "Tomato Early Blight";
        plantType = "Tomato";
        cause = "Fungal infection caused by Alternaria solani, spreading in warm, humid conditions with poor air circulation.";
        severityLevel = #moderate;
        preventionSteps = [
          "Rotate crops every 2-3 years to reduce soil-borne fungal spores.",
          "Avoid overhead irrigation; use drip irrigation to keep foliage dry.",
          "Remove and destroy infected plant debris at end of season.",
          "Maintain adequate plant spacing for good air circulation.",
          "Apply preventive copper-based fungicide sprays early in the season.",
        ];
        treatmentSteps = [
          "Remove and destroy all infected leaves immediately.",
          "Apply chlorothalonil or mancozeb fungicide every 7-10 days.",
          "Increase plant spacing by pruning lower leaves to improve airflow.",
          "Avoid wetting leaves during watering.",
          "Apply a balanced fertilizer to strengthen the plant's immune response.",
        ];
        medicationNames = [
          "Chlorothalonil (Daconil)",
          "Mancozeb (Dithane M-45)",
          "Copper Fungicide",
          "Azoxystrobin (Quadris)",
        ];
      },
      {
        id = 2;
        name = "Tomato Late Blight";
        plantType = "Tomato";
        cause = "Oomycete pathogen Phytophthora infestans, thriving in cool, moist conditions; spreads rapidly through water splash and wind.";
        severityLevel = #severe;
        preventionSteps = [
          "Plant resistant varieties such as Legend or Defiant.",
          "Avoid planting in low-lying, poorly drained areas.",
          "Ensure good air circulation with wide plant spacing.",
          "Apply preventive fungicides before disease onset in wet seasons.",
          "Destroy volunteer potato and tomato plants that harbor the pathogen.",
        ];
        treatmentSteps = [
          "Remove and destroy infected plant parts immediately; do not compost.",
          "Apply systemic fungicides such as metalaxyl or cymoxanil.",
          "Spray copper-based fungicides as a protective measure.",
          "Avoid working in fields when plants are wet to reduce spread.",
          "Monitor neighboring fields and report severe outbreaks to local agricultural extension.",
        ];
        medicationNames = [
          "Metalaxyl (Ridomil Gold)",
          "Cymoxanil (Curzate)",
          "Copper Hydroxide (Kocide)",
          "Dimethomorph (Acrobat)",
        ];
      },
      {
        id = 3;
        name = "Tomato Leaf Mold";
        plantType = "Tomato";
        cause = "Fungal pathogen Passalora fulva (Fulvia fulva), favored by high humidity (>85%) and moderate temperatures in greenhouse environments.";
        severityLevel = #mild;
        preventionSteps = [
          "Maintain greenhouse humidity below 85% using ventilation.",
          "Use resistant tomato varieties where available.",
          "Space plants adequately to promote airflow.",
          "Avoid overhead watering and wetting foliage.",
          "Sanitize greenhouse tools and surfaces regularly.",
        ];
        treatmentSteps = [
          "Remove heavily infected leaves and dispose of them away from the crop.",
          "Improve ventilation in the greenhouse to reduce humidity.",
          "Apply chlorothalonil or copper-based fungicides.",
          "Avoid excessive nitrogen fertilization that promotes lush foliage.",
          "Monitor plants weekly and re-treat if symptoms progress.",
        ];
        medicationNames = [
          "Chlorothalonil (Bravo)",
          "Myclobutanil (Eagle)",
          "Copper Sulfate",
        ];
      },
      {
        id = 4;
        name = "Tomato Bacterial Spot";
        plantType = "Tomato";
        cause = "Bacterial infection by Xanthomonas vesicatoria, spread by rain, wind, insects, and contaminated tools; worsened by warm, wet weather.";
        severityLevel = #moderate;
        preventionSteps = [
          "Use certified disease-free seeds and transplants.",
          "Apply copper bactericides as a preventive spray.",
          "Avoid working in fields when plants are wet.",
          "Rotate crops and remove infected crop debris.",
          "Disinfect tools with 10% bleach solution between plants.",
        ];
        treatmentSteps = [
          "Apply copper-based bactericides combined with mancozeb for enhanced efficacy.",
          "Prune infected branches using sterilized tools.",
          "Reduce overhead irrigation to limit water splash.",
          "Apply streptomycin sulfate if infection is severe (check local regulations).",
          "Destroy heavily infected plants to protect the rest of the crop.",
        ];
        medicationNames = [
          "Copper Hydroxide (Kocide 3000)",
          "Mancozeb + Copper",
          "Streptomycin Sulfate (Agri-Mycin)",
        ];
      },
      // --- Rice diseases ---
      {
        id = 5;
        name = "Rice Blast";
        plantType = "Rice";
        cause = "Fungal pathogen Magnaporthe oryzae, spread by wind-borne spores; favored by high humidity, excessive nitrogen, and temperature fluctuations.";
        severityLevel = #severe;
        preventionSteps = [
          "Plant blast-resistant rice varieties recommended for your region.",
          "Avoid excess nitrogen fertilizer application.",
          "Ensure adequate potassium fertilization to strengthen cell walls.",
          "Maintain proper water management — avoid water stress at booting stage.",
          "Remove and burn infected stubble after harvest.",
        ];
        treatmentSteps = [
          "Apply tricyclazole or isoprothiolane fungicide at the first sign of lesions.",
          "Spray fungicides at booting and heading stages as preventive measures.",
          "Drain fields periodically to reduce humidity at the plant base.",
          "Report severe outbreaks to local agricultural officers.",
          "Use silicon-based fertilizers to improve plant resistance.",
        ];
        medicationNames = [
          "Tricyclazole (Beam)",
          "Isoprothiolane (Fuji-One)",
          "Azoxystrobin (Amistar)",
          "Propiconazole (Tilt)",
        ];
      },
      {
        id = 6;
        name = "Rice Brown Spot";
        plantType = "Rice";
        cause = "Fungal pathogen Cochliobolus miyabeanus (Helminthosporium oryzae), associated with nutrient-deficient soils (especially low potassium) and drought stress.";
        severityLevel = #moderate;
        preventionSteps = [
          "Apply balanced NPK fertilizers, especially adequate potassium.",
          "Use disease-free certified seeds; treat seeds with fungicide before planting.",
          "Maintain optimum soil moisture and avoid drought stress.",
          "Plant resistant varieties if available.",
          "Plow under infected stubble to reduce inoculum.",
        ];
        treatmentSteps = [
          "Seed treatment with thiram or captan before sowing.",
          "Apply mancozeb or edifenphos at early disease onset.",
          "Supplement potassium and phosphorus if soil tests show deficiency.",
          "Spray iprodione fungicide for severe infections.",
          "Ensure proper field drainage to reduce stress conditions.",
        ];
        medicationNames = [
          "Mancozeb (Dithane M-45)",
          "Edifenphos (Hinosan)",
          "Iprodione (Rovral)",
          "Thiram (seed treatment)",
        ];
      },
      {
        id = 7;
        name = "Rice Bacterial Leaf Blight";
        plantType = "Rice";
        cause = "Bacterial pathogen Xanthomonas oryzae pv. oryzae, entering through wounds and water pores; spread by rain, irrigation water, and wind.";
        severityLevel = #severe;
        preventionSteps = [
          "Plant resistant varieties such as IR64 or BPT 5204.",
          "Avoid high nitrogen application, especially in flood-prone areas.",
          "Drain fields immediately after a typhoon or flood event.",
          "Use certified disease-free seeds and seedlings.",
          "Avoid working in fields during wet conditions.",
        ];
        treatmentSteps = [
          "Drain infected fields and reduce nitrogen application immediately.",
          "Apply copper-based bactericides to limit spread.",
          "Remove and burn infected plant material.",
          "Consult agricultural extension officers for severe outbreak management.",
          "In next cycle, use treated seeds and resistant varieties.",
        ];
        medicationNames = [
          "Copper Hydroxide (Kocide)",
          "Streptomycin + Copper mixture",
          "Bismerthiazol (Zhongshengmycin)",
        ];
      },
      // --- Wheat diseases ---
      {
        id = 8;
        name = "Wheat Rust (Stem Rust)";
        plantType = "Wheat";
        cause = "Fungal pathogen Puccinia graminis, producing wind-dispersed urediniospores; thrives in warm (15-35°C) humid conditions; spreads rapidly across fields.";
        severityLevel = #severe;
        preventionSteps = [
          "Plant certified rust-resistant wheat varieties for your region.",
          "Monitor fields from tillering to heading stage for early detection.",
          "Plant early in the season to avoid peak rust periods.",
          "Eliminate barberry (Berberis) plants in the vicinity as alternate host.",
          "Rotate crops to break the disease cycle.",
        ];
        treatmentSteps = [
          "Apply propiconazole or tebuconazole fungicide at first sign of rust pustules.",
          "Spray triadimefon at tillering and stem elongation stages.",
          "Repeat fungicide application after 10-14 days if disease persists.",
          "Harvest as early as possible once grain is mature during an epidemic.",
          "Report large-scale outbreaks to the national plant health authority.",
        ];
        medicationNames = [
          "Propiconazole (Tilt)",
          "Tebuconazole (Folicur)",
          "Triadimefon (Bayleton)",
          "Azoxystrobin + Propiconazole (Quilt)",
        ];
      },
      {
        id = 9;
        name = "Wheat Powdery Mildew";
        plantType = "Wheat";
        cause = "Obligate fungal pathogen Blumeria graminis f. sp. tritici; spread by wind-borne conidia; favored by cool, humid weather with low light and dense canopies.";
        severityLevel = #mild;
        preventionSteps = [
          "Plant resistant varieties where available.",
          "Avoid excessive nitrogen fertilization that encourages lush growth.",
          "Optimize plant density to improve air circulation.",
          "Rotate crops to reduce pathogen carryover in debris.",
          "Apply seed dressings with systemic fungicides.",
        ];
        treatmentSteps = [
          "Apply triadimenol or propiconazole fungicide early in infection.",
          "Use sulfur-based fungicides as a cost-effective option.",
          "Foliar sprays of myclobutanil show good efficacy.",
          "Remove heavily infected plant residues after harvest.",
          "Adjust nitrogen rates in next season to prevent lush canopy.",
        ];
        medicationNames = [
          "Triadimenol (Bayfidan)",
          "Propiconazole (Tilt)",
          "Sulfur fungicide",
          "Myclobutanil (Systhane)",
        ];
      },
      // --- Maize diseases ---
      {
        id = 10;
        name = "Maize Northern Leaf Blight";
        plantType = "Maize";
        cause = "Fungal pathogen Exserohilum turcicum (Setosphaeria turcica); survives on infected debris; spread by wind and rain in moderate temperatures (18-27°C).";
        severityLevel = #moderate;
        preventionSteps = [
          "Plant resistant hybrid maize varieties.",
          "Rotate maize with non-host crops such as soybean or cotton.",
          "Plow under infected crop residues after harvest.",
          "Avoid excessive nitrogen which can prolong canopy density.",
          "Scout fields regularly from silking onwards.",
        ];
        treatmentSteps = [
          "Apply azoxystrobin or propiconazole fungicide at tassel emergence.",
          "Spray chlorothalonil if disease appears before tasseling.",
          "Repeat application 10-14 days later if infection is severe.",
          "Harvest at physiological maturity to minimize yield loss.",
          "Remove infected debris immediately after harvest.",
        ];
        medicationNames = [
          "Azoxystrobin (Amistar)",
          "Propiconazole (Tilt)",
          "Chlorothalonil (Bravo)",
        ];
      },
      {
        id = 11;
        name = "Maize Common Rust";
        plantType = "Maize";
        cause = "Fungal pathogen Puccinia sorghi; spread by wind-borne urediospores from tropical regions; favored by cool temperatures (16-23°C) and high humidity.";
        severityLevel = #mild;
        preventionSteps = [
          "Grow rust-resistant hybrid maize varieties.",
          "Plant early to avoid the primary infection window.",
          "Monitor fields from V6 stage onwards.",
          "Avoid planting near infected fields or volunteer maize plants.",
          "Use balanced fertilization — avoid excessive nitrogen.",
        ];
        treatmentSteps = [
          "Apply mancozeb or chlorothalonil fungicide when rust pustules first appear.",
          "Use strobilurin-based fungicides (azoxystrobin) for systemic control.",
          "Ensure good coverage with fungicide application equipment.",
          "Repeat spray after 14 days in high-pressure seasons.",
          "Harvest as early as possible in severe epidemics.",
        ];
        medicationNames = [
          "Mancozeb (Dithane M-45)",
          "Azoxystrobin (Amistar)",
          "Tebuconazole (Folicur)",
        ];
      },
      {
        id = 12;
        name = "Maize Gray Leaf Spot";
        plantType = "Maize";
        cause = "Fungal pathogen Cercospora zeae-maydis; persists in crop residue; favored by prolonged leaf wetness, high humidity, and warm temperatures (25-30°C).";
        severityLevel = #moderate;
        preventionSteps = [
          "Plant resistant hybrid varieties with proven GLS tolerance.",
          "Rotate crops to reduce pathogen levels in field debris.",
          "Plow infected residue under soil after harvest.",
          "Improve airflow by reducing plant density.",
          "Avoid fields with history of GLS and poor drainage.",
        ];
        treatmentSteps = [
          "Apply strobilurin or triazole fungicides at first sign of lesions.",
          "Use azoxystrobin + propiconazole tank mixture for broad-spectrum control.",
          "Spray at VT to R2 growth stage for maximum protection.",
          "Monitor fields weekly and re-treat if new lesions appear.",
          "Harvest early if >50% of leaves above ear are infected.",
        ];
        medicationNames = [
          "Azoxystrobin + Propiconazole (Quilt Xcel)",
          "Pyraclostrobin (Headline)",
          "Tebuconazole (Folicur)",
        ];
      },
      // --- Potato diseases ---
      {
        id = 13;
        name = "Potato Late Blight";
        plantType = "Potato";
        cause = "Oomycete pathogen Phytophthora infestans; spreads via water, wind, and infected tubers; historically caused the Irish famine; rapid destruction in cool, wet weather.";
        severityLevel = #severe;
        preventionSteps = [
          "Use certified disease-free seed tubers.",
          "Plant resistant varieties such as Sarpo Mira or Defender.",
          "Avoid planting in low-lying, poorly drained areas.",
          "Apply preventive fungicides during wet seasons from early foliage growth.",
          "Destroy cull piles and volunteer potato plants that harbor the pathogen.",
        ];
        treatmentSteps = [
          "Apply metalaxyl or cymoxanil-based fungicide immediately at first symptom.",
          "Spray copper-based fungicide every 5-7 days in wet conditions.",
          "Destroy infected haulms (tops) before harvest to protect tubers.",
          "Harvest during dry weather to minimize tuber infection.",
          "Store tubers in cool, dry, well-ventilated conditions.",
        ];
        medicationNames = [
          "Metalaxyl + Mancozeb (Ridomil Gold MZ)",
          "Cymoxanil + Mancozeb (Curzate M)",
          "Copper Hydroxide (Kocide 3000)",
          "Fluopicolide + Propamocarb (Infinito)",
        ];
      },
      {
        id = 14;
        name = "Potato Early Blight";
        plantType = "Potato";
        cause = "Fungal pathogen Alternaria solani; survives in soil and infected debris; favored by alternating wet and dry weather and stressed or aging plants.";
        severityLevel = #mild;
        preventionSteps = [
          "Maintain soil fertility to keep plants vigorous.",
          "Irrigate consistently to avoid drought stress that accelerates the disease.",
          "Rotate potatoes with non-solanaceous crops for at least 2 years.",
          "Remove and destroy infected plant debris after harvest.",
          "Use certified disease-free seed tubers.",
        ];
        treatmentSteps = [
          "Apply chlorothalonil or mancozeb fungicide at first sign of lesions.",
          "Spray every 7-10 days in favorable conditions.",
          "Use azoxystrobin for enhanced systemic protection.",
          "Remove heavily infected lower leaves to reduce inoculum.",
          "Avoid excessive irrigation that promotes humid microclimate.",
        ];
        medicationNames = [
          "Chlorothalonil (Bravo)",
          "Mancozeb (Dithane M-45)",
          "Azoxystrobin (Quadris)",
        ];
      },
      {
        id = 15;
        name = "Potato Common Scab";
        plantType = "Potato";
        cause = "Soilborne bacterium Streptomyces scabies; thrives in alkaline soils (pH >5.5) and dry soil conditions during tuber initiation.";
        severityLevel = #mild;
        preventionSteps = [
          "Maintain soil pH between 5.0 and 5.2 using sulfur amendments.",
          "Keep soil consistently moist during tuber initiation (2-6 weeks after emergence).",
          "Rotate potatoes with cereals or legumes for 2-3 years.",
          "Use resistant potato varieties such as Russet Burbank.",
          "Avoid applying fresh manure or high-pH amendments before planting.",
        ];
        treatmentSteps = [
          "Treat seed pieces with thiram or PCNB before planting.",
          "Ensure consistent soil moisture especially during tuber set.",
          "Acidify soil with elemental sulfur if pH is above 5.5.",
          "Avoid over-liming fields before potato crop.",
          "Inspect tubers at harvest and remove heavily scabbed material.",
        ];
        medicationNames = [
          "Thiram (seed treatment)",
          "PCNB (Terraclor)",
          "Elemental Sulfur (soil amendment)",
        ];
      },
      {
        id = 16;
        name = "Tomato Septoria Leaf Spot";
        plantType = "Tomato";
        cause = "Fungal pathogen Septoria lycopersici; overwinters in infected debris; spread by rain splash and overhead irrigation in warm, humid conditions.";
        severityLevel = #mild;
        preventionSteps = [
          "Remove and destroy infected leaves and plant debris promptly.",
          "Avoid overhead watering; use drip irrigation.",
          "Stake and prune plants to improve airflow.",
          "Mulch around plants to prevent soil splash onto leaves.",
          "Rotate tomatoes with non-solanaceous crops for 2+ years.",
        ];
        treatmentSteps = [
          "Apply chlorothalonil fungicide at first appearance of spots.",
          "Use mancozeb or copper fungicide every 7-10 days during wet periods.",
          "Remove infected lower leaves promptly to slow upward spread.",
          "Apply azoxystrobin for improved systemic activity.",
          "Avoid fertilizing with excessive nitrogen.",
        ];
        medicationNames = [
          "Chlorothalonil (Daconil)",
          "Mancozeb (Dithane M-45)",
          "Azoxystrobin (Quadris)",
        ];
      },
    ];

    for (record in records.vals()) {
      diseases.add(record.name, record);
    };
  };

  // Map confidence score and disease name to severity level
  public func mapToSeverity(confidenceScore : Float, diseaseName : Text) : Common.SeverityLevel {
    // Known severe diseases get elevated severity regardless of confidence
    let isSevereDisease =
      diseaseName.contains(#text "Late Blight") or
      diseaseName.contains(#text "Blast") or
      diseaseName.contains(#text "Bacterial Leaf Blight") or
      diseaseName.contains(#text "Stem Rust") or
      diseaseName.contains(#text "Bacterial Spot");
    if (isSevereDisease) {
      if (confidenceScore >= 0.6) { #severe } else if (confidenceScore >= 0.3) { #moderate } else { #mild };
    } else {
      if (confidenceScore >= 0.75) { #moderate } else { #mild };
    };
  };
};
