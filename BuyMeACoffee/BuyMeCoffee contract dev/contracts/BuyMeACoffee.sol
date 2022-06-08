//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// deployed to 0x32C0d48a9cD7C88f51EA6Ea0C853E9C26843fC67

contract BuyMeACoffee {
    
    address payable owner;

    constructor(){
        owner= payable(msg.sender);
    }

    event NewMemo (
        uint256 timestamp,
        string message,
        address from,
        string name
    );

    struct Memo{
        uint256 timestamp;
        string message;
        address from;
        string name;
    }

    Memo[] memos;

    function buyCoffee(string memory _name, string memory _message) payable public {
        require(msg.value >0, "cant buy coffee with nothing" );
        memos.push(Memo (block.timestamp, _message, msg.sender, _name));
        emit NewMemo(block.timestamp, _message, msg.sender, _name);

    }


    function withdrawTips () public {
        require(owner.send(address(this).balance));

    }


        function getMemos () public view returns (Memo[] memory) {
            return memos;


}}
