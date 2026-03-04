import Gacha from "@/components/Pages/Gacha";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Gacha Simulator",
    description: "SuicaoDex88 - The leading gacha house in VN",
    keywords: ["Gacha", "SuicaoDex", "Blue Archive", "Pokemon TCG", "Honkai Star Rail"],
  };
}

export default function Page() {
  return <Gacha />;
}
