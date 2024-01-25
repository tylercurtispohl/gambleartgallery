import Link from "next/link";
import { AboutImage } from "../ui/about/aboutImage";
import { fetchAboutPageContent } from "@/app/lib/data";

export default async function Page() {
  const aboutPageContent = await fetchAboutPageContent();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <AboutImage asset={aboutPageContent.image.asset} />
      </div>
      <div className="text-blue-900 tracking-wide ">
        <p className="text-justify">{aboutPageContent.bio}</p>
        <p className="mt-6 lg:mt-4 mb:6 text-center lg:text-left">
          To purchase art please <br className="lg:hidden" />
          <Link href="/contact" className="underline">
            contact Kirsten Gamble
          </Link>
        </p>
      </div>
    </div>
  );
}
