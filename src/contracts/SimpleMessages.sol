// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title SimpleMessages
 * @dev Messaging server for a proposed SMS protocol.
 */
contract SimpleMessages {
    struct User {
        address userAddress;
        string name;
    }
    struct Message {
        address userAddress;
        string body;
        uint256 blockTimestamp; // block timestamp
        uint256 unixTimestamp; // message send time
    }
    struct Chat {
        uint256 chatID;
        string name;
        address[] currentUsers;
        Message[] messages;
        uint256 length; // Allows for easy interrogation in app
    }

    address public minter;
    mapping(uint256 => Chat) public chats;
    mapping(address => User) public users;
    // quickly indexed chat-getting.
    // Includes chats user has been removed from.
    mapping(address => uint256[]) public userChats;
    mapping(address => uint256) public userChatCount;
    uint256 private chatCount;

    event chatCreated(address _createdBy, uint256 _chatID);
    event userAddedToChat(address _userAddress, uint256 _chatID);
    event userRemovedFromChat(
        address _userAddress,
        address _removedBy,
        uint256 _chatID
    );
    event messagePosted(address _postedBy, uint256 _chatID); //do not emit message data - let clients decide whether to refresh

    constructor() {
        minter = msg.sender;
        chatCount = 0;
    }

    /// Create a chat.
    /// @dev creates a chat and returns the new chat's ID
    /// @return ID of the new chat
    function createChat(string memory _name) public returns (uint256) {
        // DO NOT USE '0'
        // "0" is the default value of any member - even unassigned ones.
        // we will use "!= 0" as a check for "this thing exists"
        uint256 _chatID = chatCount + 1;
        ++chatCount;
        chats[_chatID].chatID = _chatID; // instantiates chat
        chats[_chatID].name = _name;
        emit chatCreated(msg.sender, _chatID);
        addUserToChat(msg.sender, _chatID);
        return _chatID;
    }

    function addUserToChat(address _userAddress, uint256 _chatID) public {
        assert(chats[_chatID].chatID != 0); // assert chat exists
        assert(
            findUser(msg.sender, _chatID) > -1 ||
                chats[_chatID].currentUsers.length == 0
        ); //assert sender in chat (or chat is being initialised)
        chats[_chatID].currentUsers.push(_userAddress);
        emit userAddedToChat(_userAddress, _chatID);
        userChats[_userAddress].push(_chatID);
    }

    function removeUserFromChat(address _userAddress, uint256 _chatID) public {
        int256 userIndex = findUser(_userAddress, _chatID);
        assert(userIndex > -1);
        chats[_chatID].currentUsers[uint256(userIndex)] = chats[_chatID]
            .currentUsers[chats[_chatID].currentUsers.length - 1];
        chats[_chatID].currentUsers.pop();
        emit userRemovedFromChat(_userAddress, msg.sender, _chatID);
    }

    function findUser(address _userAddress, uint256 _chatID)
        public
        view
        returns (int256)
    {
        for (uint256 i = 0; i < chats[_chatID].currentUsers.length; i++) {
            // do something
            if (chats[_chatID].currentUsers[i] == _userAddress) {
                return int256(i);
            }
        }
        return -1; // possible better solution than -1? forces use of signed int.
    }

    /// Get all messages.
    /// @dev returns entire message array
    /// @return Message array
    function getChatMessages(uint256 _chatID)
        public
        view
        returns (Message[] memory)
    {
        assert(chats[_chatID].chatID != 0); // Chat exists
        assert(findUser(msg.sender, _chatID) > -1); // User is in chat
        return chats[_chatID].messages;
    }

    /// Get start:end messages - FROM THE REAR OF THE ARRAY
    /// e.g. 0:3 gets 5 : 2 messages of a len 6 array.
    /// @dev returns N messages from the chat
    /// @return Message array
    function getMessagesSlice(
        uint256 _chatID,
        uint256 start,
        uint256 end
    ) public view returns (Message[] memory) {
        assert(chats[_chatID].chatID != 0); // Chat exists
        assert(findUser(msg.sender, _chatID) > -1); // User is in chat
        // dynamic slices are not available in solidity 0.8.0 - must reconstruct array

        if (chats[_chatID].messages.length < end) {
            end = chats[_chatID].messages.length - 1;
        }
        if (chats[_chatID].messages.length > start) {
            uint256 len = end - start + 1;
            Message[] memory slice = new Message[](len);
            // start at the the end of the array
            start = (chats[_chatID].messages.length - 1) - start;
            end = (chats[_chatID].messages.length - 1) - end;
            // reverse through chat
            uint256 iSlice = 0;
            for (uint256 i = start; i >= end; --i) {
                slice[iSlice] = chats[_chatID].messages[i];
                ++iSlice;
            }
            return slice;
        }

        revert("No messages above given start index");

        // TODO investigate whether this is cheaper than just returning the whole array
        // Below is non-working code example of simply returning a slice (unsupported in 0.8.0)
        // if (chats[_chatID].messages.length < end) {
        //     end = chats[_chatID].messages.length;
        // }
        // if (chats[_chatID].messages.length > start) {
        //     Message[] calldata myArray = chats[_chatID].messages[(chats[_chatID].messages.length - 1) - start : (chats[_chatID].messages.length - 1) - end];
        //     return myArray;
        // }
    }

    function postMessage(
        uint256 _chatID,
        string memory _message,
        uint256 _unixTimestamp
    ) public {
        Message memory _newMessage = Message(
            msg.sender,
            _message,
            block.timestamp,
            _unixTimestamp
        );
        chats[_chatID].messages.push(_newMessage);
        ++chats[_chatID].length;
        emit messagePosted(msg.sender, _chatID);
    }
}
