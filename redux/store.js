// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
//store is the place where we put all global states.Store is like a database of our state in whch we can take a slice from our store and put it inside any screen or components 
//Actions specifies what actions we are gonna perform like login, addtodo
//PayLoad is the data for example if we want to perform some actions like login we need email and password so those are payloads and pass it to reducers
//Reducers is a function that take data from action,payload and update the state depend on those things
//useSelector is a hook to pick data from store
export const store = configureStore({
    reducer: {
        auth: authReducer,  
        // Add more reducers if needed
    },
});
