export const REPO = "https://github.com/bipul-unexpected/OpeNpaTh";
export const RELEASES = `${REPO}/releases`;
export type Platform = "windows" | "macos" | "linux" | "other";
export type Asset = { name: string; browser_download_url: string; size: number };
export type Release = { tag_name: string; html_url: string; published_at: string; assets: Asset[] };
const base = `${REPO}/releases/download/v1.1.0/`;
// Verified against the v1.1.0 GitHub release. Used when the public GitHub API is unavailable or rate limited.
export const fallbackRelease: Release = {
  tag_name: "v1.1.0", html_url: `${RELEASES}/tag/v1.1.0`, published_at: "2026-11-02T08:53:12Z",
  assets: [
    ["OpeNpaTh-1.1.0-windows-x64-portable.zip", 20900000], ["OpeNpaTh-Setup-1.1.0-windows-x64.exe", 16000000],
    ["OpeNpaTh-1.1.0-macos-arm64.zip", 22200000], ["OpeNpaTh-1.1.0-macos-x86_64.zip", 22700000],
    ["OpeNpaTh-1.1.0-x86_64.AppImage", 52400000], ["openpath_1.1.0_amd64.deb", 33200000],
    ["OpeNpaTh-1.1.0-linux-x86_64.tar.gz", 63900000], ["OpeNpaTh-1.1.0-source.zip", 6890000], ["SHA256SUMS.txt", 693],
  ].map(([name, size]) => ({ name: name as string, size: size as number, browser_download_url: base + name })),
};
export function detectPlatform(ua: string): Platform {
  if (/windows/i.test(ua)) return "windows";
  if (/android/i.test(ua)) return "other";
  if (/iphone|ipad|ipod/i.test(ua)) return "other";
  if (/macintosh|mac os x/i.test(ua)) return "macos";
  if (/linux|x11/i.test(ua)) return "linux";
  return "other";
}
export function assetPlatform(name: string): Platform {
  if (/windows|win64/i.test(name)) return "windows";
  if (/macos|darwin/i.test(name)) return "macos";
  if (/linux|appimage|\.deb$|\.rpm$/i.test(name)) return "linux";
  return "other";
}
export function assetLabel(name: string): string {
  if (/windows.*portable/i.test(name)) return "Windows portable (x64)";
  if (/setup.*windows/i.test(name)) return "Windows installer (x64)";
  if (/macos.*arm64/i.test(name)) return "macOS Apple silicon";
  if (/macos.*(x86_64|x64)/i.test(name)) return "macOS Intel";
  if (/appimage/i.test(name)) return "Linux AppImage (x64)";
  if (/\.deb$/i.test(name)) return "Ubuntu / Debian (x64)";
  if (/linux.*(tar\.gz|portable)/i.test(name)) return "Linux portable (x64)";
  if (/sha256/i.test(name)) return "SHA256 checksums";
  if (/source/i.test(name)) return "Source archive";
  return name;
}
export function isVerifiedAsset(asset: Asset): boolean {
  try { const url = new URL(asset.browser_download_url); return url.protocol === "https:" && url.hostname === "github.com" && url.pathname.startsWith("/bipul-unexpected/OpeNpaTh/releases/download/") && typeof asset.name === "string"; } catch { return false; }
}
