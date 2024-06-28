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

export async function getProvider(providerId) {
  const docRef = database.doc(providersCollection, providerId);
  return await database.getDoc(docRef);
}

export async function addProviderContact(providerId, contact) {
  const contactsCollecionRef = database.collection(
    database.db,
    "providers",
    providerId,
    "contacts"
  );
  await database.addDoc(contactsCollecionRef, contact);
}

export async function listProviderContacts(providerId) {
  let contacts;
  await database
    .getDocs(
      database.collection(database.db, "providers", providerId, "contacts")
    )
    .then((querySnapshot) => {
      contacts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    });

  return contacts;
}

export async function deleteProviderContact(providerId, contactId) {
  await database.deleteDoc(
    database.doc(
      database.collection(database.db, "providers", providerId, "contacts"),
      contactId
    )
  );
}

export async function editProviderContact(providerId, contactId, newContact) {
  const docRef = database.doc(
    database.collection(database.db, "providers", providerId, "contacts"),
    contactId
  );
  await database.updateDoc(docRef, newContact);
}

export async function deleteProvider(providerId) {
  await database.deleteDoc(database.doc(providersCollection, providerId));
}

export async function editProvider(providerId, newProvider) {
  const docRef = database.doc(providersCollection, providerId);
  await database.updateDoc(docRef, newProvider);
}
