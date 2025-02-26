import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

document.getElementById("orderForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const eventDate = document.getElementById("eventDate").value;
    const service = document.getElementById("service").value;

    try {
        await addDoc(collection(db, "orders"), {
            name: name,
            eventDate: eventDate,
            service: service
        });
        alert("Pesanan berhasil disimpan!");
        loadOrders();
    } catch (error) {
        console.error("Error: ", error);
    }
});

async function loadOrders() {
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "orders"));
    querySnapshot.forEach(doc => {
        const order = doc.data();
        const li = document.createElement("li");
        li.textContent = `${order.name} - ${order.service} - ${order.eventDate}`;
        orderList.appendChild(li);
    });
}

loadOrders();
