export type DiseaseInfo = {
  title: string;
  description: string;
  symptoms: string;
  prevention: string;
  treatment: string;
};

const generalInfo: DiseaseInfo = {
  title: "Plant leaf condition",
  description: "The model identified a possible plant leaf condition from the uploaded image.",
  symptoms: "Symptoms depend on the plant and disease. Inspect the leaf for spots, discoloration, lesions, or unusual growth.",
  prevention: "Use healthy planting material, keep tools clean, provide appropriate spacing, and avoid unnecessary leaf wetness.",
  treatment: "Confirm the condition before treating the plant. Remove severely affected material where appropriate and consult a local agricultural expert for suitable treatment."
};

export const diseaseInfo: Record<string, DiseaseInfo> = {
  "Apple Scab Leaf": {
    title: "Apple Scab",
    description: "A fungal disease affecting apple leaves and sometimes fruit.",
    symptoms: "Olive-green to dark, scabby spots on leaves; affected leaves may yellow and fall.",
    prevention: "Remove fallen infected leaves and improve airflow through pruning.",
    treatment: "Use locally approved apple-scab management measures; fungicides work best when timed to the disease cycle."
  },
  "Apple leaf": {
    title: "Apple Leaf — Healthy Class",
    description: "The model's general apple leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Maintain good orchard hygiene and regularly inspect leaves.",
    treatment: "No disease treatment is indicated by this label alone."
  },
  "Apple rust leaf": {
    title: "Apple Rust",
    description: "A rust disease that can affect apple leaves.",
    symptoms: "Yellow-orange spots on the upper leaf surface; orange structures may appear on the underside.",
    prevention: "Monitor nearby host plants and remove heavily affected material where appropriate.",
    treatment: "Confirm the rust type and use locally recommended management if needed."
  },
  "Bell_pepper leaf": {
    title: "Bell Pepper Leaf — Healthy Class",
    description: "The model's general bell pepper leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Use healthy seedlings, keep plants well spaced, and inspect regularly.",
    treatment: "No disease treatment is indicated by this label alone."
  },
  "Bell_pepper leaf spot": {
    title: "Bell Pepper Leaf Spot",
    description: "A leaf-spot class for bell pepper; the exact cause requires confirmation.",
    symptoms: "Spots, discoloration, or dead patches on leaves.",
    prevention: "Avoid overhead watering, remove affected debris, and disinfect tools.",
    treatment: "Identify whether the cause is bacterial or fungal before choosing a control."
  },
  "Blueberry leaf": {
    title: "Blueberry Leaf — General Class",
    description: "The model's general blueberry leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Maintain suitable soil acidity, airflow, and regular plant monitoring.",
    treatment: "Treat only if a specific problem is identified."
  },
  "Cherry leaf": {
    title: "Cherry Leaf — General Class",
    description: "The model's general cherry leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Remove fallen leaves and maintain airflow around trees.",
    treatment: "If spots or leaf drop occur, confirm the cause before treatment."
  },
  "Corn Gray leaf spot": {
    title: "Corn Gray Leaf Spot",
    description: "A fungal disease that affects corn foliage.",
    symptoms: "Long, rectangular gray or tan lesions between leaf veins.",
    prevention: "Use resistant varieties where available and manage infected crop residue appropriately.",
    treatment: "Follow local crop guidance; fungicides may be considered when risk and crop stage justify them."
  },
  "Corn leaf blight": {
    title: "Corn Leaf Blight",
    description: "A corn leaf-blight class; the exact pathogen is not specified by the label.",
    symptoms: "Elongated lesions that may spread across the leaf.",
    prevention: "Choose suitable resistant varieties and manage crop residue.",
    treatment: "Confirm the blight type and follow local agricultural recommendations."
  },
  "Corn rust leaf": {
    title: "Corn Rust",
    description: "A rust disease affecting corn leaves.",
    symptoms: "Raised rust-colored pustules on leaf surfaces.",
    prevention: "Grow resistant varieties when available and monitor crops regularly.",
    treatment: "Use locally recommended controls if disease severity and crop stage warrant them."
  },
  "Peach leaf": {
    title: "Peach Leaf — General Class",
    description: "The model's general peach leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Maintain orchard hygiene and inspect for curling, spots, or discoloration.",
    treatment: "Do not select a treatment without identifying a specific disease."
  },
  "Potato leaf early blight": {
    title: "Potato Early Blight",
    description: "A disease commonly associated with the fungus Alternaria solani.",
    symptoms: "Brown spots, often with concentric rings, and yellowing around lesions.",
    prevention: "Rotate crops, avoid plant stress, and remove infected debris.",
    treatment: "Use locally approved management practices and fungicides when appropriate."
  },
  "Potato leaf late blight": {
    title: "Potato Late Blight",
    description: "A potentially destructive disease caused by Phytophthora infestans.",
    symptoms: "Water-soaked dark lesions that can expand rapidly; white growth may appear in humid conditions.",
    prevention: "Use healthy seed potatoes, monitor weather and crops, and avoid prolonged leaf wetness.",
    treatment: "Act promptly: seek local agricultural advice and use approved late-blight controls. Do not rely on this model alone."
  },
  "Raspberry leaf": {
    title: "Raspberry Leaf — General Class",
    description: "The model's general raspberry leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Prune for airflow and remove fallen or diseased plant material.",
    treatment: "Identify any visible symptoms before choosing a treatment."
  },
  "Soyabean leaf": {
    title: "Soybean Leaf — General Class",
    description: "The model's general soybean leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Use healthy seed, rotate crops, and monitor leaves during the growing season.",
    treatment: "No disease-specific treatment can be recommended from this label alone."
  },
  "Squash Powdery mildew leaf": {
    title: "Squash Powdery Mildew",
    description: "A fungal disease affecting squash and related plants.",
    symptoms: "White, powder-like patches on leaf surfaces.",
    prevention: "Provide adequate spacing, improve airflow, and avoid excess nitrogen.",
    treatment: "Remove badly affected leaves where practical and use locally approved controls if needed."
  },
  "Strawberry leaf": {
    title: "Strawberry Leaf — General Class",
    description: "The model's general strawberry leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Use healthy plants, remove dead leaves, and provide good airflow.",
    treatment: "Inspect any spots or discoloration and confirm the cause before treatment."
  },
  "Tomato Early blight leaf": {
    title: "Tomato Early Blight",
    description: "A fungal disease commonly associated with Alternaria species.",
    symptoms: "Dark spots, often with concentric rings, usually on older leaves first.",
    prevention: "Rotate crops, mulch soil to reduce splashing, and avoid overhead watering.",
    treatment: "Remove affected leaves where appropriate and follow local recommendations for approved fungicides."
  },
  "Tomato Septoria leaf spot": {
    title: "Tomato Septoria Leaf Spot",
    description: "A fungal leaf disease caused by Septoria lycopersici.",
    symptoms: "Small circular spots with pale centers and dark margins; tiny dark specks may be visible.",
    prevention: "Remove infected debris, mulch soil, and avoid wetting foliage.",
    treatment: "Remove affected lower leaves when practical and use locally approved controls if needed."
  },
  "Tomato leaf": {
    title: "Tomato Leaf — General Class",
    description: "The model's general tomato leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Water at the base, provide airflow, and inspect leaves regularly.",
    treatment: "No disease treatment is indicated by this label alone."
  },
  "Tomato leaf bacterial spot": {
    title: "Tomato Bacterial Spot",
    description: "A bacterial disease that can affect tomato foliage and fruit.",
    symptoms: "Small dark, sometimes water-soaked spots that may develop yellow halos.",
    prevention: "Use clean seed and transplants, sanitize tools, and avoid handling wet plants.",
    treatment: "Remove heavily affected material where appropriate and seek local advice; antibiotics should not be used unless specifically approved."
  },
  "Tomato leaf late blight": {
    title: "Tomato Late Blight",
    description: "A serious disease caused by Phytophthora infestans.",
    symptoms: "Fast-spreading dark or water-soaked lesions; pale growth may develop in humid weather.",
    prevention: "Monitor plants closely, provide airflow, and avoid prolonged leaf wetness.",
    treatment: "Seek prompt local agricultural advice and use approved controls. Confirm the diagnosis before treatment."
  },
  "Tomato leaf mosaic virus": {
    title: "Tomato Mosaic Virus",
    description: "A viral disease that can affect tomato growth and leaf appearance.",
    symptoms: "Mottled light and dark green patterns, leaf distortion, or stunted growth.",
    prevention: "Use clean seed, disinfect tools, and remove confirmed infected plants carefully.",
    treatment: "There is no curative treatment for an infected plant; prevent spread and follow local guidance."
  },
  "Tomato leaf yellow virus": {
    title: "Tomato Yellow Leaf Virus Class",
    description: "The label may refer to a yellow-leaf viral condition, but the exact virus is not specified.",
    symptoms: "Yellowing, curling, or stunted growth may occur depending on the virus.",
    prevention: "Monitor whiteflies, use healthy seedlings, and remove confirmed infected plants as advised locally.",
    treatment: "Viral diseases generally have no curative treatment; confirm the virus and manage vectors according to local guidance."
  },
  "Tomato mold leaf": {
    title: "Tomato Leaf Mold",
    description: "A fungal disease favored by humid conditions.",
    symptoms: "Pale yellow patches on upper leaf surfaces and olive-green to brown growth underneath.",
    prevention: "Improve ventilation, reduce humidity, and avoid wetting foliage.",
    treatment: "Remove badly affected leaves where appropriate and follow locally approved control guidance."
  },
  "grape leaf": {
    title: "Grape Leaf — General Class",
    description: "The model's general grape leaf class; it may represent a healthy-looking leaf.",
    symptoms: "No specific disease symptoms are defined by this label.",
    prevention: "Prune for airflow and inspect vines regularly.",
    treatment: "No disease-specific treatment is indicated by this label alone."
  },
  "grape leaf black rot": {
    title: "Grape Black Rot",
    description: "A fungal disease affecting grape leaves and fruit.",
    symptoms: "Brown leaf spots that may develop dark margins; infected berries can shrivel into hard, dark mummies.",
    prevention: "Remove mummified berries and infected debris, and maintain an open canopy.",
    treatment: "Use locally approved management measures timed to the disease cycle."
  }
};

export function getDiseaseInfo(label: string): DiseaseInfo {
  return diseaseInfo[label] ?? {
    ...generalInfo,
    title: label || generalInfo.title
  };
}
