import { useDb } from "../../../hooks/useDb";

const database = useDb();
const providersCollection = database.collection(database.db, "providers");

export async function addProvider(provider) {
  const docRef = await database.addDoc(providersCollection, provider);
  return docRef;
}

export async function listProviders() {
  let providers;
  await database.getDocs(providersCollection).then((querySnapshot) => {
    providers = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
  return providers;
}

export async function deleteProvider(id) {
  await database.deleteDoc(database.doc(providersCollection, id));
}

export async function editProvider(id, newProvider) {
  const docRef = database.doc(providersCollection, id);
  await database.updateDoc(docRef, newProvider);
}
