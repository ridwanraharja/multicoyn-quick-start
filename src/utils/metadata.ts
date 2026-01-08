export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export function decodeMetadataURI(uri: string): NFTMetadata | null {
  try {
    if (uri.startsWith("data:application/json;base64,")) {
      const base64Data = uri.replace("data:application/json;base64,", "");
      const jsonString = atob(base64Data);
      const metadata = JSON.parse(jsonString) as NFTMetadata;
      return metadata;
    }

    if (uri.startsWith("ipfs://")) {
      return null;
    }

    return JSON.parse(uri) as NFTMetadata;
  } catch (error) {
    console.error("Failed to decode metadata URI:", error);
    return null;
  }
}

export function ipfsToHttp(ipfsUri: string): string {
  if (!ipfsUri.startsWith("ipfs://")) {
    return ipfsUri;
  }

  const cid = ipfsUri.replace("ipfs://", "");

  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}

export function getImageUrl(metadata: NFTMetadata | null): string {
  if (!metadata || !metadata.image) {
    return "https://api.dicebear.com/7.x/bottts/svg?seed=default&backgroundColor=191c34";
  }

  return ipfsToHttp(metadata.image);
}

export function getRarity(metadata: NFTMetadata | null): string {
  if (!metadata || !metadata.attributes) {
    return "Common";
  }

  const rarityAttr = metadata.attributes.find(
    (attr) => attr.trait_type === "Rarity"
  );

  return rarityAttr ? String(rarityAttr.value) : "Common";
}
