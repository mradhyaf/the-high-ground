import { createSlice } from "@reduxjs/toolkit";
import { auth as firebaseAuth } from "../../api/auth";
import { clearExpense } from "./expensesSlice";

const initialState = {
  currentUser: {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
  },
  loading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: state => {
      state.loading = true;
    },
    authRequestFail: state => {
      state.loading = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFail: (state, action) => {
      state.loading = false;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signUpFail: (state, action) => {
      state.loading = false;
    },
    signOutSuccess: state => {
      state.currentUser = {...initialState.currentUser};
      state.loading = false;
    },
    signOutFail: (state, action) => {
      state.loading = false;
    }
  },
})

export const signIn = ({ email, password }, onSuccess, onError) => {
  return (dispatch) => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const { uid, photoURL, displayName, email: mail } = userCredentials.user;
        dispatch(signInSuccess({ uid, photoURL, displayName, mail }));
        return onSuccess()
      }).catch(error => {
        dispatch(authRequestFail());
        return onError(error);
      })
  }
}

export const signUp = ({ displayName, email, password }, onSuccess, onError) => {
  return async (dispatch) => {
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const { user } = userCredentials;
        user.updateProfile({
          displayName,
          photoURL: "https://image.freepik.com/free-vector/piggy-bank_53876-25494.jpg"
        })
        dispatch(signUpSuccess({ 
          displayName: user.displayName, 
          email: user.email,
          photoURL: user.email,
          uid: user.uid,
        }));
        return onSuccess();
      }).catch(error => {
        dispatch(authRequestFail());
        return onError(error);
      })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    firebaseAuth.signOut()
      .then(() => {
        dispatch(signOutSuccess());
        dispatch(clearExpense());
      }).catch(error => {
        dispatch(authRequestFail())
      })
  }
}

export const passwordRecovery = (email, onSuccess, onError) => {
  return async (dispatch) => {
    firebaseAuth.sendPasswordResetEmail(email)
      .then(() => {
        return onSuccess();
      }).catch(error => {
        dispatch(authRequestFail());
        return onError(error);
      })
  }
}

export const { 
  authRequest,
  authRequestFail,
  signInSuccess, 
  signInFail, 
  signUpSuccess, 
  signUpFail, 
  signOutSuccess
} = authSlice.actions;

export const selectDisplayName = state => state.auth.currentUser.displayName;
export const selectPhotoURL = state => state.auth.currentUser.photoURL;
export const selectUserId = state => state.auth.currentUser.uid;
export const selectLoading = state => state.auth.loading;

export default authSlice.reducer;