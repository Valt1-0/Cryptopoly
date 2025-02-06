// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Captain is ERC20 {
    // Ajout d'un modificateur pour restreindre l'accès à certaines fonctions
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    address public owner;

    // Le constructeur initialise le jeton avec un approvisionnement initial
    constructor(uint256 initialSupply) ERC20("Captain", "CPT") {
        owner = msg.sender; // Définir le propriétaire du contrat
        _mint(msg.sender, initialSupply); // Créer l'approvisionnement initial et l'envoyer au propriétaire
    }

    // Fonction pour frapper de nouveaux jetons, accessible uniquement par le propriétaire
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Fonction pour brûler des jetons, accessible uniquement par le propriétaire
    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}
