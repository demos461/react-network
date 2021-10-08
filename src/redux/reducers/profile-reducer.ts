import {Dispatch} from 'redux';
import {usersAPI} from '../../api/API';

enum ACTION_TYPE {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT',
    SET_USER_PROFILE = 'SET_USER_PROFILE'
}

export type PostType = {
    id: number;
    message: string;
};

export type UserProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

export type ProfileStateType = {
    profile: UserProfileType
    posts: Array<PostType>;
    newPostText: string;
}


const initialState: ProfileStateType = {
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: 0,
        photos: {
            small: '',
            large: '',
        },
    },
    posts: [
        {id: 1, message: 'Hello World!'},
        {id: 2, message: '=^.^='},
        {id: 3, message: 'Cat)0))'},
    ],
    newPostText: '',
}


export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case ACTION_TYPE.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: state.newPostText}],
                newPostText: ''
            }
        case ACTION_TYPE.UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                ...action.payload,
            }
        case ACTION_TYPE.SET_USER_PROFILE:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export type ProfileActionsType =
    ReturnType<typeof addPost> |
    ReturnType<typeof updateNewPostText> |
    ReturnType<typeof setUserProfile>

export const addPost = () => {
    return {
        type: ACTION_TYPE.ADD_POST,
    } as const
}

export const updateNewPostText = (newPostText: string) => {
    return {
        type: ACTION_TYPE.UPDATE_NEW_POST_TEXT,
        payload: {
            newPostText,
        },
    } as const
}

export const setUserProfile = (profile: UserProfileType) => {
    return {
        type: ACTION_TYPE.SET_USER_PROFILE,
        payload: {
            profile,
        },
    } as const
}


export const getUserProfile = (userId: number) => (dispatch: Dispatch<ProfileActionsType>) => {
    usersAPI.getUserProfile(userId).then(data => {
        dispatch(setUserProfile(data))
    })
}