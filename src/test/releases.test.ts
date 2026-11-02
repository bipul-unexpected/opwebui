import { describe, expect, it } from "vitest";
import { assetLabel, assetPlatform, detectPlatform, fallbackRelease, isVerifiedAsset } from "@/lib/releases";
describe("release downloads", () => {
  it("detects desktops but does not claim mobile is Linux or macOS", () => {
    expect(detectPlatform("Mozilla/5.0 Windows NT 10.0 Win64 x64")).toBe("windows");
    expect(detectPlatform("Macintosh; Intel Mac OS X")).toBe("macos");
    expect(detectPlatform("X11; Linux x86_64")).toBe("linux");
    expect(detectPlatform("Linux; Android 14")).toBe("other");
    expect(detectPlatform("iPhone; CPU iPhone OS 17_0 like Mac OS X")).toBe("other");
  });
  it("classifies verified fallback files and recommends the portable Windows build", () => {
    const portable = fallbackRelease.assets[0]!;
    expect(assetPlatform(portable.name)).toBe("windows"); expect(assetLabel(portable.name)).toContain("portable");
    expect(fallbackRelease.assets.every(isVerifiedAsset)).toBe(true);
    expect(isVerifiedAsset({ ...portable, browser_download_url: "https://evil.example/fake.zip" })).toBe(false);
  });
});
