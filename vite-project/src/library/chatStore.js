import { create } from "zustand"
import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"
import { useUserStore } from "./userStore"

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isRecieverBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser

        // NGECEK DI BLOK APA ENGGA PENGIRIMNYA
        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isRecieverBloced: false,
            })
        } else if (currentUser.blocked.includes(user.id)) {
            return set({
                chatId,
                user: user,
                isCurrentUserBlocked: false,
                isRecieverBloced: true,
            })
        } else {
           return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isRecieverBloced: false,
            })
        }


        // CEK PENERIMA DI BLOCK GA

        

        set({
            chatId,
            user,
            isCurrentUserBlocked: false,
            isRecieverBloced: false,
        })
    },

    changeBlock: () => {
        set(state => ({ ...state, isRecieverBlocked: !state.isRecieverBlocked }))
    },
}))