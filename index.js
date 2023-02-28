"use strict";

import { menuArray } from "./data.js";
const main = document.querySelector("main");
const showOrders = document.querySelector(".orders-order");
const showTotal = document.querySelector(".orders-total");
const orderHeading = document.querySelector(".orders");
const cardForm = document.querySelector(".hide-card-form");
const divContainer = document.querySelector(".container");
const greeting = document.querySelector(".greeting");
const inputName = document.querySelector(".input-name");
const inputNumber = document.querySelector(".input-number");
const inputCvv = document.querySelector(".input-cvv");

let arrayOfOrders = [];
let total = 0;

function createMenuHtml() {
	let html = "";
	for (let menu of menuArray) {
		html += `<div class="item">
                    <div class="item-details">
                        <p class="items-details__emoji">${menu.emoji}</p>
                        <div class="menu-details">
                            <p>${menu.name}</p>
                            <small class="item-ingredients">${
															menu.ingredients
														}</small>
                            <p class="item-price">$${menu.price}</p>
                        </div>
                        <img class="icon" src=${`assets/add-btn.png`} data-id=${
			menu.id
		} />
                    </div>
                    <hr />
                </div>`;
	}
	return html;
}

function getSingleOrder(id) {
	const item = menuArray.filter((item) => item.id === id)[0];
	arrayOfOrders.push(item);
	// Show the heading "Your Order"
	orderHeading.classList.remove("hide-total");
	createOrderHtml(arrayOfOrders);

	greeting.classList.add("hide-greeting");
	return addToTotal(item);
}

function removeSingleOrder(itemId, index) {
	const itemToRemove = arrayOfOrders.filter((item) => item.id === itemId)[0];
	arrayOfOrders.splice(index, 1);
	createOrderHtml(arrayOfOrders);
	return subtractFromTotal(itemToRemove);
}

function addToTotal(item) {
	total += item.price;
	showTotal.innerHTML = `<div class="total_price">Total price:</div>
								<hr />
						   <div class="total_price">$${total}</div>`;
	return showTotal;
}

function subtractFromTotal(itemToRemove) {
	total -= itemToRemove.price;
	showTotal.innerHTML = `<div class="total_price">Total price:</div>
	 					   <div class="total_price">$${total}</div>`;
	return showTotal;
}

function createOrderHtml(orderData) {
	if (orderData.length) {
		const allOrders = orderData.map((order, index) => {
			return `<div class="orders-order__single">
					<div class="order-name">
						${order.name}
						<span data-remove=${order.id} data-index="${index}"
						>remove</span>
						
					</div>
					<div class="order-price">
						$${order.price}
					</div>
				</div>`;
		});
		showOrders.innerHTML = allOrders.join("");
		return showOrders;
	}
}

document.addEventListener("click", function (e) {
	if (e.target.dataset.id) {
		getSingleOrder(Number(e.target.dataset.id));
	} else if (e.target.dataset.remove) {
		removeSingleOrder(
			Number(e.target.dataset.remove),
			Number(e.target.dataset.index)
		);
	}
});

function getThanks() {
	if (inputName.value && inputNumber.value && inputCvv.value) {
		orderHeading.classList.add("hide-total");
		cardForm.classList.add("hide-card-form");
		divContainer.classList.remove("blur-backgroud");
		greeting.innerHTML = `<h3>Thank you ${inputName.value}! Your order is on its way!</h3>`;
		greeting.classList.remove("hide-greeting");
		// Empty the array of orders
		arrayOfOrders = [];
		return greeting;
	}
}

function completeOrder() {
	cardForm.classList.remove("hide-card-form");
	divContainer.classList.add("blur-backgroud");
	return divContainer;
}

/**
 Using event delegation. I placed the event listener on the parent element 
 and used the event object and conditional statement to implement the rest of my logic
 **/

main.addEventListener("click", function (e) {
	if (e.target.className === "complete-order") {
		completeOrder();
	} else if (e.target.className === "pay-btn") {
		e.preventDefault();
		getThanks();
		// Return the total to zero
		total = 0;
	}
});

function render() {
	document.querySelector(".menu-container").innerHTML = createMenuHtml();
}

render();
