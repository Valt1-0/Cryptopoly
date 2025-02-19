// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract ResourceToken is ERC721URIStorage {
    uint256 private _tokenIds;
    IERC20 private paymentToken;
    address public municipality; // Adresse de la mairie

    struct House {
        string name;
        uint256 price;
        string ipfsHash;
        address[] previousOwners;
        uint256 createdAt;
        uint256 lastTransferAt;
        bool available;
    }

    mapping(uint256 => House) public houses;

    constructor(address paymentTokenAddress) ERC721("ResourceToken", "RTK") {
        _tokenIds = 0;
        paymentToken = IERC20(paymentTokenAddress);
        municipality = msg.sender; // La mairie est l'initial propriétaire des maisons
    }

    // Fonction de minting (création d'une maison par la mairie)
    function mintHouse(
        string memory name,
        uint256 price,
        string memory ipfsHash
    ) public returns (uint256) {
        require(msg.sender == municipality, "Only the municipality can mint houses");

        _tokenIds += 1;
        uint256 newItemId = _tokenIds;
        _mint(municipality, newItemId);
        _setTokenURI(newItemId, ipfsHash);

        houses[newItemId] = House({
            name: name,
            price: price,
            ipfsHash: ipfsHash,
            previousOwners: new address[](0),
            createdAt: block.timestamp,
            lastTransferAt: block.timestamp,
            available: true
        });

        return newItemId;
    }

    // Fonction pour acheter une maison mise en vente par la mairie
    function purchaseHouse(uint256 tokenId) public {
        require(houses[tokenId].available == true, "House not available for sale");
        require(paymentToken.transferFrom(msg.sender, municipality, houses[tokenId].price), "Payment failed");

        // Transférer la maison au nouvel acheteur
        _transfer(municipality, msg.sender, tokenId);

        // Mettre à jour les informations de la maison
        houses[tokenId].previousOwners.push(municipality);
        houses[tokenId].lastTransferAt = block.timestamp;
        houses[tokenId].available = false;
    }

    // Fonction pour récupérer les maisons appartenant à l'utilisateur
    function getMyHouses() public view returns (uint256[] memory) {
        uint256 count = balanceOf(msg.sender);
        uint256[] memory ownedHouses = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (ownerOf(i) == msg.sender) {
                ownedHouses[index] = i;
                index++;
            }
        }
        return ownedHouses;
    }

    // Fonction pour obtenir le nombre total de maisons créées
    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }

    // Fonction pour récupérer les maisons disponibles à la vente
    function getAvailableHouses() public view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (houses[i].available) {
                count++;
            }
        }

        uint256[] memory availableHouses = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (houses[i].available) {
                availableHouses[index] = i;
                index++;
            }
        }
        return availableHouses;
    }
}