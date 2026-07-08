import {
  Bookmark,
  Sparkles,
  Heart,
  Activity,
  Shield,
  Waves,
  Zap,
  Apple,
  Droplet,
} from "lucide-react";

export const categories = [
  { icon: Bookmark, label: "All Data", value: null, active: true },
  { icon: Sparkles, label: "Longevity Markers", value: "25 yrs" },
  { icon: Heart, label: "Heart Health", value: "72/100" },
  { icon: Activity, label: "Thyroid Health", value: null },
  { icon: Shield, label: "Immune Regulation", value: null },
  { icon: Waves, label: "Hormone Health", value: "Balanced" },
  { icon: Zap, label: "Metabolic Health", value: "78/100" },
  { icon: Apple, label: "Nutrients", value: null },
  { icon: Droplet, label: "Blood", value: "Normal" },
];

export const stats = [
  { value: "106", label: "Total", accent: true },
  { value: "80", label: "Optimal" },
  { value: "21", label: "In range" },
  { value: "5", label: "Out of range" },
];

export const biomarkers = [
  { icon: Heart, label: "Heart Health", value: "103", unit: "mg/dl", sub: "LDL Cholesterol" },
  { icon: Apple, label: "Nutrients", value: "43", unit: "ng/dL", sub: "Vitamin D" },
  { icon: Heart, label: "Heart Health", value: "42", unit: "mg/dl", sub: "Apolipoprotein B" },
];

import suppGreen from "@/assets/supp-green.png";
import suppBlue from "@/assets/supp-blue.png";
import suppOrange from "@/assets/supp-orange.png";

export const supplements = [
  { tag: "Best Seller", name: "Ashwa Balance Extract", price: "$24.30", image: suppGreen },
  { tag: "Best Seller", name: "DeepRest L-Theanine", price: "$19.90", image: suppBlue },
  { tag: "Fair Price", name: "Coen-Shield PS", price: "$45.00", image: suppOrange },
];
