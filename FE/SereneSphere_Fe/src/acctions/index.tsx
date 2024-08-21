import { loadPostActions, openStatePost, openStatePostImages } from "./postActions";
import { openStateComment } from "./commentActions";
import { openStateFollowFriends } from "./followActions";
import { openStateMessages } from "./messagesActions";
import { openStateProfile } from "./profileActions";
import {load_data_search} from './searchActions';
const allActions = {
    loadPostActions,
    openStatePost,
    openStatePostImages,
    openStateComment,
    openStateFollowFriends,
    openStateMessages,
    openStateProfile,
    load_data_search
}
export default allActions