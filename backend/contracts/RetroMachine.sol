// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";
import "hardhat/console.sol";

contract RetroMachine is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Retro Machine Token","RMT"){
        // Initialize the tokenIds counter
    }

    function mint(address recipient, string memory machineName, string memory imagePermalink) public returns (uint256) {
        _tokenIds.increment();

        string memory description =string( 
            abi.encodePacked(
                "Retro Machine: ", machineName, "\nImage: ", imagePermalink
                )
            );
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":"',machineName,'","image":"',imagePermalink,'","description":"',description,'"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json,",json)
        );

        uint256 newItemId = _tokenIds.current();
        super._mint(recipient, newItemId);
        super._setTokenURI(newItemId, finalTokenUri);

        // string memory finalSvg = string(
        //     abi.encodePacked(baseSvg, machineName,"</text></svg>")
        // );

        // string memory json = Base64.encode(
        //     bytes(
        //         string(
        //             abi.encodePacked(
        //                 '{"name":"', machineName,
        //                 '", "description": "On-chain zodiac sign",',
        //                 '"attributes": [{"trait_type": "zodiac_sign","value": "', machineName, '"}]},',
        //                 '"image": "data:image/svg+xml;base64,', Base64.encode(bytes(finalSvg)), '"}'
        //             )
        //         )
        //     )
        // );

        // string memory imagePermalink = string(
        //     abi.encodePacked("data:application/json;base64,", json)
        // );


        // uint256 newItemId = _tokenIds.current();
        // _mint(recipient, newItemId);
        // _setTokenURI(newItemId, imagePermalink);

        return newItemId;


    }
}
