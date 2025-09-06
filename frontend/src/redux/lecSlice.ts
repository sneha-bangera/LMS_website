import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LectureType {
  _id: string;
  lecTitle: string;
  videoUrl?: string;
  publicId?: string;
  isPreviewFree: boolean;
}

const initialState: LectureType[] = [];

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    setLecture: (_state, action: PayloadAction<LectureType[]>) => {
      return action.payload; 
    },
  },
});

export const { setLecture } = lectureSlice.actions;
export default lectureSlice.reducer;
