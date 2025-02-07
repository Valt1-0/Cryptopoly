// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ResourceToken is ERC721URIStorage {
    uint256 private _tokenIds;
    IERC20 private supCoin;

    struct Resource {
        string name;
        string resourceType;
        uint256 value;
        string ipfsHash;
        address[] previousOwners;
        uint256 createdAt;
        uint256 lastTransferAt;
    }

    mapping(uint256 => Resource) public resources;

    constructor(address supCoinAddress) ERC721("ResourceToken", "RST") {
        _tokenIds = 0;
        supCoin = IERC20(supCoinAddress);
    }

    function mintResource(
        address to,
        string memory name,
        string memory resourceType,
        uint256 value,
        string memory ipfsHash
    ) public returns (uint256) {
        require(supCoin.transferFrom(msg.sender, address(this), value), "Payment failed");

        _tokenIds += 1;
        uint256 newItemId = _tokenIds;
        _mint(to, newItemId);
        _setTokenURI(newItemId, ipfsHash);

        resources[newItemId] = Resource({
            name: name,
            resourceType: resourceType,
            value: value,
            ipfsHash: ipfsHash,
            previousOwners: new address[](0),
            createdAt: block.timestamp,
            lastTransferAt: block.timestamp
        });

        return newItemId;
    }

    function transferResource(address from, address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == from, "You do not own this token");
        _transfer(from, to, tokenId);

        resources[tokenId].previousOwners.push(from);
        resources[tokenId].lastTransferAt = block.timestamp;
    }
}