import { useDb } from "../../../hooks/useDb";

const database = useDb();
const contactCollection = database.collection(database.db, "contacts");

export async function addContact(contact) {
  const docRef = await database.addDoc(contactCollection, contact);
  return docRef;
}

export async function listContacts() {
  let contacts;
  await database.getDocs(contactCollection).then((querySnapshot) => {
    contacts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
  return contacts;
}

export async function deleteContact(id) {
  await database.deleteDoc(database.doc(contactCollection, id));
}

export async function editContact(id, newContact) {
  const docRef = database.doc(contactCollection, id);
  await database.updateDoc(docRef, newContact);
}
