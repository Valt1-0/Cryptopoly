// Importation de la fonction buildModule de Hardhat Ignition
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CaptainModule", (m) => {
  // Définir un approvisionnement initial pour le jeton, ici 1 million de tokens avec 18 décimales
  const initialSupply = m.getParameter("initialSupply", "1000000");

  // Déployer le contrat Captain avec l'approvisionnement initial
  const captain = m.contract("Captain", [initialSupply]);

  // Retourner l'instance du contrat déployé
  return { captain };
});
