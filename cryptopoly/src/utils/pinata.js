import { PinataSDK } from "pinata-web3";

const pinataGateway = `${import.meta.env.VITE_GATEWAY_URL}`;
export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  pinataGateway: pinataGateway,
});

export const uploadToIPFS = async (file, data) => {
  try {
    const group = await pinata.groups.create({
      name: Math.random().toString(36).substring(2, 12),
    });

    const upload = await pinata.upload.file(file, { groupId: group.id });

    const timestamp = Math.floor(Date.now() / 1000);
    const uniqueFileName = `metadata_${timestamp}.json`;

    // Construction des métadonnées
    const metadata = {
      name: data.name,
      type: data.type,
      image: `https://${pinataGateway}/ipfs/${upload.IpfsHash}`,
      createdAt: timestamp,
      rarity: data.rarity,
    };

    // Convertir le JSON en fichier
    const jsonBlob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    });

    const jsonFile = new File([jsonBlob], uniqueFileName, {
      type: "application/json",
    });

    // Upload en tant que fichier
    const metadataUpload = await pinata.upload.file(jsonFile, {
      groupId: group.id,
    });

    return {
      cid: metadataUpload.IpfsHash,
      url: `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
        metadataUpload.IpfsHash
      }`,
    };
  } catch (error) {
    console.error("❌ Erreur lors de l'upload sur IPFS :", error);
    throw error;
  }
};


export const fetchFromIPFS = async (cid) => {
  try {
    console.log("cid", cid);
    // Récupération des fichiers sur IPFS
    const {data} = await pinata.gateways.get(cid);

    return data ;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération sur IPFS :", error);
    throw error;
  }
};
