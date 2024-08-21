export const openStateMessages = (data) => {
    return {
        type: 'OPEN_STATE_MESSAGES',
        payload: data
    }
}

export const countMessagesUnReadAction = (data) => {
    return {
        type: 'COUNT_MESSAGES_UN_READ',
        payload: data
    }
}

// export const showFriends = (data) => {
//     return {
//         type: 'MESSAGES_SHOW_FRIENDS',
//         payload: data
//     }
// }