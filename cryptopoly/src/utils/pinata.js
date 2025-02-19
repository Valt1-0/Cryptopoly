import { PinataSDK } from "pinata-web3";

const pinataGateway = `${import.meta.env.VITE_GATEWAY_URL}`;
export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  pinataGateway: pinataGateway,
});

export const uploadToIPFS = async (file, data) => {
  try {
    // Récupération du timestamp actuel
    const timestamp = Math.floor(Date.now() / 1000);

    // Construction des métadonnées avec le CID du fichier
    // const metadata = {
    //   name: data.name,
    //   type: data.type,
    //   description: data.description,
    //   owner: owner,
    //   previousOwners: [],
    //   createdAt: timestamp,
    //   lastTransferAt: timestamp,
    //   attributes: {
    //     size: data.attributes?.size,
    //     category: data.attributes?.category,
    //     rarity: data.attributes?.rarity,
    //   },
    // };

    // Upload du fichier sur IPFS et ajout au groupe
    const upload = await pinata.upload.file(file).addMetadata({
      name: data.name,
      keyValues: {
        type: data.type,
        owner: data.owner,
        createdAt: timestamp,
        lastTransferAt: timestamp,
        rarity: data.rarity,
      },
    });

    // // Upload des métadonnées sur IPFS et ajout au groupe
    // const metadataUpload = await pinata.upload.json(metadata, {
    //   groupId: group.id,
    // });

    // console.log(metadataUpload);
    console.log("✅ Fichier uploadé avec succès :", upload);

    // console.log(
    //   "✅ Fichier et métadonnées uploadés avec succès :",
    //   metadataUpload
    // );

    return {
      cid: upload.IpfsHash, // CID du groupe
      url: `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
        upload.IpfsHash
      }`,
    };
  } catch (error) {
    console.error("❌ Erreur lors de l'upload sur IPFS :", error);
    throw error;
  }
};

export const fetchFromIPFS = async (cid) => {
  try {
    // Récupération des fichiers sur IPFS
    const data = await pinata.listFiles().cid(cid);

    console.log("✅ Fichier récupéré avec succès :", data);
    // // Récupération des métadonnées
    // const metadataFile = files.find((file) => file.name === "metadata.json");
    // const { data: metadata, contentType: metadataContentType } =
    //   await pinata.gateways.get(metadataFile.cid);

    // console.log("✅ Métadonnées récupérées avec succès :", metadata);

    // // Récupération de l'image sur IPFS
    // const imageCid = metadata.image.replace("ipfs://", "");
    // const { data: image, contentType: imageContentType } =
    //   await pinata.gateways.get(imageCid);

    // console.log("✅ Image récupérée avec succès :", image);

    // return {
    //   metadata: metadata,
    //   image: image,
    // };
    return;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération sur IPFS :", error);
    throw error;
  }
};
