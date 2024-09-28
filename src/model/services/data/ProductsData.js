import { useDb } from "../../../hooks/useDb";

const database = useDb();
const productCollection = database.collection(database.db, "products");

export async function addProduct(product) {
  const docRef = await database.addDoc(productCollection, {
    name: product.name,
    description: product.description,
    provider: product.provider,
    isActive: product.isActive,
  });
  return docRef;
}

export async function listProducts() {
  let products = [];
  const querySnapshot = await database.getDocs(productCollection);
  products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    description: doc.data().description,
    provider: doc.data().provider,
    isActive: doc.data().isActive,
  }));
  return products;
}

export async function deleteProduct(id) {
  await database.deleteDoc(database.doc(productCollection, id));
}

export async function editProduct(id, newProduct) {
  const docRef = database.doc(productCollection, id);
  await database.updateDoc(docRef, newProduct);
}
