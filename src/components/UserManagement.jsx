import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UserManagement = ({ onBack }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const userList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userList);
                setLoading(false);
            } catch (error) {
                console.error("유저 정보를 불러오는 중 에러 발생:", error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const toggleAccess = async (userId, currentAccess) => {
        const newAccess = !currentAccess;
        const newPaymentStatus = newAccess ? 'paid' : 'unpaid';
        try {
            const userRef = doc(db, 'users', userId);
            await setDoc(userRef, {
                hasAccess: newAccess,
                paymentStatus: newPaymentStatus
            }, { merge: true });
            setUsers(users.map(user =>
                user.id === userId ? { ...user, hasAccess: newAccess, paymentStatus: newPaymentStatus } : user
            ));
        } catch (error) {
            alert("상태 업데이트 실패! 파이어베이스 권한을 확인해주세요.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                    <span className="text-4xl">👥</span> User Management
                </h2>
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                    ← Back to Dashboard
                </button>
            </div>

            <div className="bg-[#12121A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="p-5 text-xs font-bold uppercase tracking-wider text-white/50">User Info</th>
                                {/* ✨ 출석 현황 헤더 추가 */}
                                <th className="p-5 text-xs font-bold uppercase tracking-wider text-white/50">출석/수강완료</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-wider text-white/50">Payment / Access</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-wider text-white/50 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-10 text-center text-white/40">등록된 유저가 없습니다.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-5">
                                            <div className="font-bold text-white">{user.name || '이름 없음'}</div>
                                            <div className="text-xs text-white/40 mt-1">{user.email}</div>
                                        </td>

                                        {/* ✨ 출석 현황 데이터 표시 (completedCourses 배열의 길이) */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-black text-brand-purple">
                                                    {user.completedCourses ? user.completedCourses.length : 0}
                                                </span>
                                                <span className="text-xs text-white/50 font-bold">강의 완료</span>
                                            </div>
                                        </td>

                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${user.hasAccess ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
                                                <span className={`text-sm font-bold ${user.hasAccess ? 'text-green-400' : 'text-red-400'}`}>
                                                    {user.hasAccess ? 'Access Granted' : 'Restricted'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button
                                                onClick={() => toggleAccess(user.id, user.hasAccess)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${user.hasAccess
                                                    ? 'bg-transparent border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white'
                                                    : 'bg-brand-purple/20 border-brand-purple/50 text-brand-purple hover:bg-brand-purple hover:text-white'
                                                    }`}
                                            >
                                                {user.hasAccess ? 'Revoke Access' : 'Grant Access'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
