export const loadPostActions = (posts) => {
    return {
        type: 'LOAD_POST_DATA_SUCCESS',
        payload: posts
    }
}

export const openStatePost = (status) => {
    return {
        type: 'OPEN_STATE_POST',
        payload: status
    }
}

export const openStatePostImages = (status) => {
    return {
        type: 'OPEN_STATE_POST_IMAGES',
        payload: status
    }
}