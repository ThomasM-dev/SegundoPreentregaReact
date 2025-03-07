import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const uploadProducts = async () => {
  try {
    // Cargar JSON desde public/
    const response = await fetch("/products.json");
    const productos = await response.json();

    const collectionRef = collection(db, "productos");

    for (const product of productos.products) {
      await addDoc(collectionRef, product);
    }

    console.log("✅ Productos subidos correctamente a Firestore.");
  } catch (error) {
    console.error("❌ Error subiendo productos:", error);
  }
};

export default uploadProducts;
