import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    // Load Google AdSense script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"; // Replace with your Publisher ID
    document.head.appendChild(script);

    // Push ads
    if (window.adsbygoogle === undefined) {
      window.adsbygoogle = [];
    }
    window.adsbygoogle.push({});
  }, []);

  return (
    <div className="w-full flex justify-center py-6">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot="xxxxxxxxxxxxxxxx"
      />
    </div>
  );
}
