import { useDb } from "../../../hooks/useDb";

const database = useDb();
const cotationsCollection = database.collection(database.db, "cotations");

export async function addCotation(cotations) {
  const docRef = await database.addDoc(cotationsCollection, cotations);
  return docRef;
}

export async function listCotations() {
  let cotationss;
  await database.getDocs(cotationsCollection).then((querySnapshot) => {
    cotationss = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
  return cotationss;
}

export async function deleteCotation(id) {
  await database.deleteDoc(database.doc(cotationsCollection, id));
}

export async function editCotation(id, newCotation) {
  const docRef = database.doc(cotationsCollection, id);
  await database.updateDoc(docRef, newCotation);
}
