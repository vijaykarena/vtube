import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "./constant";

export interface ChatMessage {
    name: string;
    message: string;
}

interface ChatState {
    messages: ChatMessage[];
}

const initialState: ChatState = {
    messages: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.messages.splice(LIVE_CHAT_COUNT, 1);
            state.messages.push(action.payload);
        },
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;