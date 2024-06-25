import { useDb } from "../../../hooks/useDb";

const database = useDb();
const productCollection = database.collection(database.db, "products");

export async function addProduct(product) {
  const docRef = await database.addDoc(productCollection, product);
  return docRef;
}

export async function listProducts() {
  let products;
  await database.getDocs(productCollection).then((querySnapshot) => {
    products = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });
  return products;
}

export async function deleteProduct(id) {
  await database.deleteDoc(database.doc(productCollection, id));
}

export async function editProduct(id, newProduct) {
  const docRef = database.doc(productCollection, id);
  await database.updateDoc(docRef, newProduct);
}
