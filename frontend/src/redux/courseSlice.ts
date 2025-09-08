import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CourseType {
  _id: string;
  courseTitle: string;
  coursePrice?: number;
  isPublished: boolean;
  courseThumbnail:  string;
  subtitle: string;
  category: string;
  courseLevel: string;
  description: string;
  creator: {
    name: string;
    photoUrl: string;
    description?: string;
  };
}

const initialState: CourseType[] = [];

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (_state, action: PayloadAction<CourseType[]>) => {
      return action.payload; 
    },
  },
});

export const { setCourse } = courseSlice.actions;
export default courseSlice.reducer;
