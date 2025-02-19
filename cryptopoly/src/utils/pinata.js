import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  pinataGateway: `${import.meta.env.VITE_GATEWAY_URL}`,
});

const formatNameForIPFS = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "_") // Remplace les espaces par des underscores
    .replace(/[^a-z0-9_]/g, ""); // Supprime les caractères spéciaux
};

export const uploadToIPFS = async (file, data, owner) => {
  try {
    // Formatage du nom pour créer un groupe unique sur IPFS
    const groupName = formatNameForIPFS(data.name);

    // Création du groupe sur Pinata
    const group = await pinata.groups.create({
      name: groupName,
    });

    console.log(`✅ Groupe "${groupName}" créé avec succès :`, group);

    // Upload du fichier sur IPFS et ajout au groupe
    const upload = await pinata.upload.file(file, {
      groupId: group.id, // Associe le fichier au groupe
    });

    // Récupération du timestamp actuel
    const timestamp = Math.floor(Date.now() / 1000);

    // Construction des métadonnées avec le CID du fichier
    const metadata = {
      name: data.name,
      type: data.type,
      description: data.description,
      value: data.value,
      currency: "SUP",
      image: `ipfs://${upload.cid}`, // Référence au fichier IPFS
      owner: owner,
      previousOwners: [],
      createdAt: timestamp,
      lastTransferAt: timestamp,
      attributes: {
        size: data.attributes?.size,
        category: data.attributes?.category,
        rarity: data.attributes?.rarity,
      },
    };

    // Upload des métadonnées sur IPFS et ajout au groupe
    const metadataUpload = await pinata.upload.json(metadata, {
      groupId: group.id,
    });

    console.log(
      "✅ Fichier et métadonnées uploadés avec succès :",
      metadataUpload
    );

    return {
      cid: metadataUpload.cid, // CID du groupe
      url: `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${metadataUpload.cid}`,
    };
  } catch (error) {
    console.error("❌ Erreur lors de l'upload sur IPFS :", error);
    throw error;
  }
};
