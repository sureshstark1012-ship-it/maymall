import { Hero } from "@/components/home/Hero/Hero";
import { HeritageRibbon } from "@/components/home/HeritageRibbon/HeritageRibbon";
import { BrandStory } from "@/components/home/Story/BrandStory";
import { CollectionsSection } from "@/components/home/Collections/CollectionsSection";
import { WeddingEdit } from "@/components/home/WeddingEdit/WeddingEdit";
import { BrandValues } from "@/components/home/BrandValues/BrandValues";
import { VisitSection } from "@/components/home/Visit/VisitSection";
export default function Home() {
  return (
    <>
      <Hero />
      <HeritageRibbon />
      <BrandStory />
      <CollectionsSection />
      <WeddingEdit />
      <BrandValues />
      <VisitSection />
    </>
  );
}
