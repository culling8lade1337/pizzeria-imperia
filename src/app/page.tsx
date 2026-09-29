import { Hero } from "@/components/Hero";
import { Contact, LargeOrders, Loyalty, Lunch, MenuTeaser, Popular, Story } from "@/components/HomeSections";

export default function Home() {
  return (<><Hero /><Popular /><MenuTeaser /><Lunch /><Loyalty /><LargeOrders /><Story /><Contact /></>);
}
