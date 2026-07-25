import {
  Cherry,
  Droplets,
  Dumbbell,
  Flame,
  Shield,
  ShieldPlus,
  Sparkles,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { createElement, type ReactNode } from "react";

function createBoosterIcon(Icon: LucideIcon) {
  return createElement(Icon, {
    "aria-hidden": true,
    className: "size-12",
    strokeWidth: 1.75,
  });
}

const fallbackIcon = createBoosterIcon(Sparkles);

const boosterIcons: Readonly<Record<string, ReactNode>> = {
  "best defense": createBoosterIcon(ShieldPlus),
  collagen: fallbackIcon,
  "cr7 drive": createBoosterIcon(Zap),
  fiber: createBoosterIcon(Wheat),
  h3o: createBoosterIcon(Droplets),
  immune: createBoosterIcon(Shield),
  "prolessa duo": createBoosterIcon(Flame),
  protein: createBoosterIcon(Dumbbell),
  "wild berry": createBoosterIcon(Cherry),
};

export function getBoosterIcon(productName: string): ReactNode {
  return boosterIcons[productName.trim().toLowerCase()] ?? fallbackIcon;
}
