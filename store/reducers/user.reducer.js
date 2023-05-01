const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import {
  createUserHelper,
  loginUserHelper,
} from "@/helper/registration/registration.helper";
const initialState = {
  currentUser: false,
  userData: null,
  error: false,
  errorText: "",
};

export const createUserAsync = createAsyncThunk(
  "user/registration",
  async (data, thunkAPI) => {
    try {
      const response = await createUserHelper(data);
      if (response.status === 201) {
        const data = response.data;
        console.log(data, "formmm");
        return data.user;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle the "Email already in use" error
        console.log("Email already in use");
        return thunkAPI.rejectWithValue({ message: "Email already is Use." });
      } else {
        console.error(error);
        return thunkAPI.rejectWithValue({ message: "something went wrong!" });
      }
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = loginUserHelper(data);
      if (response.status === 200) {
        return response.data.user;
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        return thunkAPI.rejectWithValue({
          message: "Invalid email or password",
        });
      } else {
        return thunkAPI.rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = false;
      state.userData = null;
      (state.errorText = ""), (state.error = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.currentUser = true;
        state.error = false;
        state.userData = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        console.log(action.error);
        state.error = true;
        state.errorText = action.payload.message;
      })
      .addCase(createUserAsync.pending, (state, action) => {
        console.log("creating account...");
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.currentUser = true;
        state.error = false;
        state.userData = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = true;
        state.errorText = action.payload.message;
      });
  },
});
export const { setCurrentUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
