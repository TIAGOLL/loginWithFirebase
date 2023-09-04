import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/connectionDB';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({});
