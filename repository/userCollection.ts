import { db } from '@config/firebaseConfig';
import type { User } from '@entities/user';

export const updateUserData = async (user: User): Promise<void> => {
  await db.collection('USERS').doc(user.id).set(user);
};

export const fetchUserData = async (id: string): Promise<User | null> => {
  const userSnap = await db.collection('USERS').doc(id).get();
  return userSnap.exists ? (userSnap.data() as User) : null;
};

export const fetchAllUserData = async (): Promise<User[]> => {
  const snapshot = await db.collection('USERS').get();

  const users: User[] = snapshot.docs.map(doc => ({
    ...(doc.data() as User),
    id: doc.id,
  }));

  return users;
};

export const fetchIdbyEmail = async (email: string) => {
	const userDoc = await db.collection('USERS').where('email', '==', email).get();
  return userDoc;
};