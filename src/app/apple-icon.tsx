import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default async function AppleIcon() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost";
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  const imageUrl = `${proto}://${host}/me.png`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={imageUrl}
        alt=""
        width={180}
        height={180}
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          border: "3px solid #ffffff",
          boxShadow: "0 0 0 6px rgba(0,0,0,0.12)",
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
