import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // ✨ db(Firestore) 추가
import {
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // ✨ Firestore 함수 추가

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [hasPremium, setHasPremium] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribeUserDoc = () => { };

        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const idTokenResult = await currentUser.getIdTokenResult();
                setIsAdmin(!!idTokenResult.claims.admin);

                // Listen for user document changes (including premium status)
                const { onSnapshot } = await import('firebase/firestore');
                unsubscribeUserDoc = onSnapshot(doc(db, 'users', currentUser.uid), (docSnap) => {
                    if (docSnap.exists()) {
                        setHasPremium(!!docSnap.data().hasPremium);
                    }
                });
            } else {
                setIsAdmin(false);
                setHasPremium(false);
                unsubscribeUserDoc();
            }
            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeUserDoc();
        };
    }, []);

    // ✨ 이메일 회원가입 시 DB에 정보 저장 로직 추가
    const signUpWithEmail = async (email, password, displayName, role = "student") => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: displayName
        });

        // 🎯 가입 성공 시 Firestore 'users' 컬렉션에 데이터 생성
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: displayName,
            email: email,
            role: role,              // 선택된 역할 저장
            paymentStatus: "unpaid", // 기본: 미결제
            hasPremium: false,       // 기본: 권한 없음
            createdAt: new Date().toISOString()
        });

        return userCredential;
    };

    const grantPremiumAccess = async () => {
        if (!user) return;
        const { updateDoc } = await import('firebase/firestore');
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            hasPremium: true,
            paymentStatus: "paid",
            paymentDate: new Date().toISOString()
        });
    };

    const signInWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => signOut(auth);

    const value = {
        user,
        isAdmin,
        hasPremium,
        signUpWithEmail,
        signInWithEmail,
        grantPremiumAccess,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

