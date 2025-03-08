import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const uploadProducts = async () => {
  try {
    
    const response = await fetch("/products.json");
    const productos = await response.json();

    const collectionRef = collection(db, "productos");

    for (const product of productos.products) {
      await addDoc(collectionRef, product);
    }

    console.log("Productos subidos correctamente a firestore.");
  } catch (error) {
    console.error(" Error al subir los productos:", error);
  }
};

export default uploadProducts;
