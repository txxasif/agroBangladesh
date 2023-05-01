const { createSelector } = require("@reduxjs/toolkit");
const user = (state) => state.user;

export const currentUserSelector = createSelector([user],(user)=>user.currentUser);
export const currentUserErrorSelector = createSelector([user],(user)=>user.error);
export const currentUserErrorTextSelector = createSelector([user],(user)=>user.errorText);
