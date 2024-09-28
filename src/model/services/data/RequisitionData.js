import { useDb } from "../../../hooks/useDb";
import { query, where, getDocs } from "firebase/firestore";

const database = useDb();
const requisitionCollection = database.collection(database.db, "requisitions");

export async function deleteRequisition(id) {
  await database.deleteDoc(database.doc(requisitionCollection, id));
}

export async function editRequisition(id, newRequisition) {
  const docRef = database.doc(requisitionCollection, id);
  await database.updateDoc(docRef, newRequisition);
}

export async function addRequisition(requisition, currentUser) {
  const requisitionWithMeta = {
    ...requisition,
    createdBy: currentUser?.email || "Unknown",
    createdAt: new Date().toISOString(),
  };

  const docRef = await database.addDoc(
    requisitionCollection,
    requisitionWithMeta
  );
  return docRef;
}

export async function listRequisitionsByUser(currentUser) {
  let requisitions;

  if (currentUser?.isAdmin) {
    const querySnapshot = await getDocs(requisitionCollection);
    requisitions = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } else {
    const q = query(
      requisitionCollection,
      where("createdBy", "==", currentUser.email)
    );
    const querySnapshot = await getDocs(q);
    requisitions = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }

  return requisitions;
}

export async function countQuotations(requisitionId) {
  const quotationCollection = database.collection(
    database.db,
    `requisitions/${requisitionId}/quotations`
  );
  const snapshot = await database.getDocs(quotationCollection);
  return snapshot.size;
}

export async function getQuotationsByRequisition(requisitionId) {
  const quotationCollection = database.collection(
    database.db,
    `requisitions/${requisitionId}/quotations`
  );

  const snapshot = await database.getDocs(quotationCollection);
  const quotations = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return quotations;
}

export async function addQuotation(requisitionId, quotation, currentUser) {
  const quotationCollection = database.collection(
    database.db,
    `requisitions/${requisitionId}/quotations`
  );

  const quotationWithMeta = {
    ...quotation,
    requestedBy: currentUser?.email || "Unknown",
    date: new Date().toISOString(),
  };

  await database.addDoc(quotationCollection, quotationWithMeta);
}

export async function updateQuotation(
  requisitionId,
  quotationId,
  updatedQuotation
) {
  const quotationCollection = database.collection(
    database.db,
    `requisitions/${requisitionId}/quotations`
  );

  const docRef = database.doc(quotationCollection, quotationId);
  await database.updateDoc(docRef, updatedQuotation);
}

export async function deleteQuotation(requisitionId, quotationId) {
  const quotationCollection = database.collection(
    database.db,
    `requisitions/${requisitionId}/quotations`
  );

  await database.deleteDoc(database.doc(quotationCollection, quotationId));
}

export async function updateRequisitionStatus(requisitionId, status) {
  const docRef = database.doc(requisitionCollection, requisitionId);
  await database.updateDoc(docRef, { status });
}

export async function getQuotationStatus(requisitionId) {
  const count = await countQuotations(requisitionId);
  if (count === 0) return { status: "unlisted", color: "bg-red-200" };
  if (count === 1 || count === 2)
    return { status: "In quotation", color: "bg-yellow-200" };
  if (count >= 3) return { status: "quoted", color: "bg-green-200" };
  return { status: "Undefined", color: "bg-gray-200" };
}
