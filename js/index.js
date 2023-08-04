'use strict'

{
    const tabItem = document.querySelectorAll('.foods__main-btn');
    const tabContent  = document.querySelectorAll('.dish__main-act');

    tabItem.forEach(function (element){
        element.addEventListener('click' , open);
    })

    function open(evt){
        const tabTarget = evt.currentTarget;
        const button = tabTarget.dataset.button;

        tabItem.forEach(function (item){
            item.classList.remove('foods__main-btn--active');
        });

        tabContent.forEach(function (item){
            item.classList.remove('dish__main--active');
        });

        tabTarget.classList.add('foods__main-btn--active');
        document.querySelector(`#${button}`).classList.add('dish__main--active');
    }
}

{
    const dropDown = document.querySelector('.dishes__top-dropdown');
    const select = document.getElementById('dropdown-content');

    dropDown.addEventListener('click', showDropDown);
    let toggleButton = true;
    function showDropDown() {
        if (toggleButton) {
            select.style.display = 'flex';
            select.style.flexDirection = 'column';
            dropDown.classList.add('dropdown-select');
        } else {
            select.style.display = 'none';
            dropDown.classList.remove('dropdown-select')
        }

        toggleButton = !toggleButton;

    }

    window.onclick = function (e) {
        if (!e.target.matches('.dishes__top-dropdown')) {
            if (!e.target.matches('.fa-solid')) {
                if (!e.target.matches('.dishes__top-dropdown-p')) {
                    select.style.display = 'none';
                    dropDown.classList.remove('dropdown-select')
                }
            }
        }
    }
}

{
    const tabItem = document.querySelectorAll('.dropdown__p');
    const value = document.querySelector('.dishes__top-dropdown-p');

    tabItem.forEach(function (element){
        element.addEventListener('click' , giveValue);
    })

    function giveValue(evt) {
        let data = value.textContent;
        const tabTarget = evt.currentTarget;

        value.textContent = tabTarget.textContent;
        tabTarget.textContent = data;

        const isMediaQueryMatched = window.matchMedia('(max-width: 420px)').matches;

        if (isMediaQueryMatched) {
            const dropdown = document.querySelector('.dishes__top-dropdown');
            const dropdownP = document.querySelector('.dishes__dropdown-content');

            console.log(value);
            console.log(value.textContent);
            if(value.textContent.length < 7){
                dropdown.style.width = '120px';
                dropdownP.style.width = '120px';
            }
            else{
                dropdown.style.width = '144px';
                dropdownP.style.width = '144px'
            }
        }

    }
}


    const li = document.querySelectorAll('.nav_list');
    const cover = document.getElementById('bg__cover');
    const burgerWrap = document.querySelector('.burger__wrap');
    const burgerInfoWrap = document.querySelector('.burger__information-wrap');
    const orderHistory = document.querySelector('.order__history-wrap');
    const accountWrap = document.querySelector('.account__wrap');
    const orderWrap = document.querySelector('.order__wrap');
    const burgerFunctions = document.querySelectorAll('.burger__inner-img-desc');
    const backArrows = document.querySelectorAll('.burger__information-arrow');
    const toOrder = document.querySelector('.order__wrap-btn');
    const dish = document.querySelector('.dish__wrap');
    const payment = document.querySelector('.payment__wrap');
    const continueBtn = document.getElementById('continue');
    const cancel = document.querySelector('.cancel');
    const confirm = document.querySelector('.confirm');
    localStorage.setItem('ID', JSON.stringify('1234'));
    const body = document.body;

    let changeTabTarget;
    let activeOrderHistory;

    li.forEach(function (element) {
        element.addEventListener('click', change);
    })

    burgerFunctions.forEach(function (element){
        element.addEventListener('click', showFunctions);
    })

    backArrows.forEach(function (element){
        element.addEventListener('click', showFunctions);
    })

    toOrder.addEventListener('click',showFunctions);

    continueBtn.addEventListener('click',showFunctions);
    cancel.addEventListener('click', showFunctions);
    confirm.addEventListener('click', showFunctions);

    function change(evt) {
        const tabTarget = evt.currentTarget;
        changeTabTarget = tabTarget;

        if (tabTarget.classList.contains('li--active')) {
            removeActiveIcon(tabTarget);
            hideRadius();
            changeRadius(li[1]);
        } else {
            li.forEach(function (element) {
                element.classList.remove('li--active');
                element.children[0].classList.remove('nav__menu-btn--active');
                element.children[0].children[0].classList.remove('aside__icon--active');
            });
            tabTarget.classList.add('li--active');
            tabTarget.children[0].classList.add('nav__menu-btn--active');
            tabTarget.children[0].children[0].classList.add('aside__icon--active');
            hideRadius();
            changeRadius(tabTarget);
        }

        let dataset = tabTarget.dataset.tooltip;

        if(dataset !==undefined){
            if(dataset === 'tooltip1') {
                close(dish , 'dish__wrap--active' , 'dish__wrap--not-active');
                close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
                close(orderHistory, 'order__history--active', 'order__history--not-active');
                close(payment, 'payment__wrap--active', 'payment__wrap--not-active');
                if(tabTarget.classList.contains('li--active')){
                   show(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                   body.style.overflow = 'hidden';
                }else {
                   close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                    body.style.overflow = 'visible';
                }
            }
            else if(dataset === 'tooltip7'){
                close(payment, 'payment__wrap--active', 'payment__wrap--not-active');
                close(dish , 'dish__wrap--active' , 'dish__wrap--not-active');
                close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
                close(orderHistory, 'order__history--active', 'order__history--not-active');
                if(tabTarget.classList.contains('li--active')) {
                    const existingItems = JSON.parse(localStorage.getItem("dishes")) || [];
                    if (existingItems.length === 0) {
                        show(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                        body.style.overflow = 'hidden';
                    }
                    else {
                        generateHTML();
                        const orderId = document.querySelector('.dish__wrap-title');
                        let ID = JSON.parse(localStorage.getItem("ID"));
                        orderId.textContent = 'Orders #' + ID;
                        show(dish , 'dish__wrap--active' , 'dish__wrap--not-active');
                        body.style.overflow = 'hidden';
                    }
                }
                else {
                    close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                    body.style.overflow = 'visible';
                }
            }
            else if(dataset === 'tooltip8'){
                close(payment, 'payment__wrap--active', 'payment__wrap--not-active');
                close(dish , 'dish__wrap--active' , 'dish__wrap--not-active');
                close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
                close(orderHistory, 'order__history--active', 'order__history--not-active');
                if(tabTarget.classList.contains('li--active')){
                    show(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                    body.style.overflow = 'hidden';
                }else {
                    close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                    body.style.overflow = 'visible';
                }
            }
        }
        else {
            close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
            close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
            close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
            close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
            close(orderHistory, 'order__history--active', 'order__history--not-active');
            close(dish , 'dish__wrap--active' , 'dish__wrap--not-active');
            close(payment, 'payment__wrap--active', 'payment__wrap--not-active');
            body.style.overflow = 'visible';
        }
    }

    function showFunctions(evt){
        const tabTarget = evt.currentTarget;

        let dataset = tabTarget.dataset.tooltip;

        body.style.overflow = 'hidden';
        console.log(tabTarget);
        if(dataset !== undefined){
            if(dataset === 'information'){
                close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                show(burgerInfoWrap , 'burger__information--active' , 'burger__information--not-active')
            }
            else if(dataset === 'order-history'){
                close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                show(orderHistory , 'order__history--active' , 'order__history--not-active')
                activeOrderHistory = tabTarget.dataset.active;
                console.log(activeOrderHistory);
            }
            else if(dataset === 'burger__info-arrow'){
                close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
                show(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
            }
            else if(dataset === 'order__history-account'){
                close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                show(orderHistory , 'order__history--active' , 'order__history--not-active')
                activeOrderHistory = tabTarget.dataset.active;
            }
            else if(dataset === 'order__history-arrow'){
                if(activeOrderHistory === 'burger') {
                    close(orderHistory, 'order__history--active', 'order__history--not-active');
                    show(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                    body.style.overflow = 'hidden';
                }else {
                    close(orderHistory, 'order__history--active', 'order__history--not-active');
                    show(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                }
            }
            else if(dataset === 'to-order'){
                close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                removeActiveIcon();
                hideRadius();
                body.style.overflow = 'visible';
            }
            else if(dataset === 'order'){
                close(dish , 'dish__wrap--active' , 'dish__wrap--not-active');
                removeActiveIcon();
                body.style.overflow = 'visible';
                hideRadius()
                changeRadius(li[1])
            }
            else if(dataset === 'continue'){
                console.log('here')
                close(dish , 'dish__wrap--active' , 'dish__wrap--not-active');
                show(payment, 'payment__wrap--active', 'payment__wrap--not-active');
            }
            else if(dataset === 'cancel'){
                localStorage.removeItem('dishes');
                close(payment, 'payment__wrap--active', 'payment__wrap--not-active');
                show(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                count();
            }
            else if(dataset === 'confirm'){
                close(payment, 'payment__wrap--active', 'payment__wrap--not-active');
                const currentDate = new Date();
                const formattedDate = formatDate(currentDate);
                saveOrderToLocalStorage(formattedDate);
                alert('Your order is accepted');
                localStorage.removeItem('dishes');
                body.style.overflow = 'visible';
                removeActiveIcon();
                hideRadius()
                changeRadius(li[1]);
                count();
            }
        }
    }

    function removeActiveIcon(tabTarget){
        changeTabTarget.classList.remove('li--active');
        changeTabTarget.children[0].classList.remove('nav__menu-btn--active');
        changeTabTarget.children[0].children[0].classList.remove('aside__icon--active');
        let secondNavMenuListElement = li[1];
        secondNavMenuListElement.classList.add('li--active');
        secondNavMenuListElement.children[0].classList.add('nav__menu-btn--active');
        secondNavMenuListElement.children[0].children[0].classList.add('aside__icon--active');
    }

    function close(element , activeClass , notActiveClass){
        element.classList.remove(activeClass);
        element.classList.add(notActiveClass);
        cover.classList.remove('background__cover');
    }



function show (element , activeClass , notActiveClass){
        element.classList.remove(notActiveClass);
        element.classList.add(activeClass);
        cover.classList.add('background__cover');
    }

    cover.addEventListener('click' , function (){
        hideRadius();
        changeRadius(li[1]);
        close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
        close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
        close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
        close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
        close(orderHistory, 'order__history--active', 'order__history--not-active');
        close(dish , 'dish__wrap--active' , 'dish__wrap--not-active');
        close(payment, 'payment__wrap--active', 'payment__wrap--not-active');
        removeActiveIcon();
    })

    function createDishHTML(dish) {
        let totalPrice = (dish.price * dish.count).toFixed(2);
        return `
        <div id="${dish.id}">
            <div class="dish__wrap-info">
                <img src="${dish.img}" alt="" class="info__img">
                <div class="info-descr">
                    <p class="info__title">${dish.name}</p>
                    <p class="info__price">${dish.price}</p>
                </div>
            </div>
            <div class="dish__wrap-sum">
                <div class="sum__quantity">
                    <button class="plm__icons" data-tooltip="minus">-</button>
                    <p class="sum__quantity">${dish.count}</p>
                    <button class="plm__icons" data-tooltip="plus">+</button>
                </div>
                    <p class="sum__total-price">${totalPrice}</p>
            </div>
            <div class="dish__wrap-edit">
                <input class="edit__input" placeholder="Order Note...">
                <img src="img/Trash.svg" alt="" class="edit__delete-icon">
            </div>
        </div>
  `;
    }

    function generateHTML() {
        const dishesData = JSON.parse(localStorage.getItem('dishes')) || [];
        const dishesHTML = dishesData.map(createDishHTML).join('');

        let sum = 0;
        dishesData.forEach(function (element){
            let price = element.price * element.count;
            sum = sum + price;
        });
        document.querySelector('.total__sub-price').textContent = sum.toFixed(2);

        const dishContainer = document.querySelector('.dish__container');
        dishContainer.innerHTML = '';
        dishContainer.insertAdjacentHTML('beforeend', dishesHTML);

        const plsMns = document.querySelectorAll('.plm__icons');

        plsMns.forEach(function (element){
            element.addEventListener('click', changeQuantity);
        })

        const deleteIcon = document.querySelectorAll('.edit__delete-icon');

        deleteIcon.forEach(function (element){
            element.addEventListener('click', deleteFood);
        })
    }

    function deleteFood(evt){
        let divId = evt.currentTarget.parentElement.parentElement.id;
        const dishWrap = document.querySelector('.dish__wrap');

        let dishesData = JSON.parse(localStorage.getItem('dishes')) || [];


        const index = dishesData.findIndex(item => item.id === divId);

        if (index !== -1) {
            dishesData.splice(index, 1);
            if (dishesData.length === 0) {
                localStorage.clear();
                close(dishWrap, 'dish__wrap--active', 'dish__wrap--not-active');
                show(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
            } else {
                localStorage.setItem('dishes', JSON.stringify(dishesData));
            }
        }
        generateHTML();
        count();
    }

    function changeQuantity(evt){
        let currentTarget = evt.currentTarget.dataset.tooltip;
        let divId = evt.currentTarget.parentElement.parentElement.parentElement.id;
        let div = evt.currentTarget.parentElement.parentElement.parentElement;
        let dishesData = JSON.parse(localStorage.getItem('dishes')) || [];
        const dish = dishesData.find((element) => element.id === divId);
        const dishWrap = document.querySelector('.dish__wrap');

        if (currentTarget === 'plus'){
            if (dish.available < dish.count + 1) {
                alert('Only ' + dish.available + ' available');
                return;
            }
            dish.count++;
        }
        else {
            dish.count--;
            if(dish.count === 0){
                dishesData = dishesData.filter(item => item !== dish);
            }
        }

        const totalPrice = (dish.price * dish.count).toFixed(2);
        div.querySelector('.sum__quantity').textContent = dish.count;
        div.querySelector('.sum__total-price').textContent = totalPrice;
        if(dishesData.length===0){
            localStorage.clear();
                close(dishWrap , 'dish__wrap--active' , 'dish__wrap--not-active');
                show(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                count();
            }
        else {
            localStorage.setItem('dishes', JSON.stringify(dishesData));
        }
        generateHTML();
        count()
    }

    function createOrderHistoryHTML(id , time){
        return `
        <div class="inner-descr">
            <p class="order__history-p">Orders # ${id}</p>
            <p class="order__history-date">${time}</p>
         </div>
  `;
    }

    function generateOrderHTML(){
        const existingItems = JSON.parse(localStorage.getItem("order")) || [];
        const orderHistoryHTML = existingItems.map((element) => createOrderHistoryHTML(element.id, element.time)).join('');

        const dishContainer = document.querySelector('.order__history-inner');
        dishContainer.innerHTML = ''
        dishContainer.insertAdjacentHTML('beforeend', orderHistoryHTML);
    }

    function formatDate(date) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayOfWeek}, ${day} ${month} ${year}`;
    }

    function showAlert(text , error) {
        const customAlertWrapper = document.getElementById("customAlertWrapper");
        const customAlerts = customAlertWrapper.getElementsByClassName("custom-alert");

        for (let i = 0; i < customAlerts.length; i++) {
            if (customAlerts[i].classList.contains("show")) {
                customAlerts[i].classList.add("hide");
            }
        }

        const customAlert = document.createElement("div");
        if(error){
            customAlert.classList.add('custom-alert-error');
        }
        else {
            customAlert.classList.add("custom-alert");
        }
        const customAlertContent = document.createElement("div");
        customAlertContent.classList.add("custom-alert-content");
        customAlertContent.innerHTML = `
            <p>${text}</p>
        `;

        customAlert.appendChild(customAlertContent);

        customAlertWrapper.prepend(customAlert);

        setTimeout(function() {
            customAlert.classList.add("show");
        }, 10);

        setTimeout(function() {
            hideAlert(customAlert);
        }, 3000);
    }

    function hideAlert(alertElement) {
        alertElement.classList.add("hide");

        alertElement.addEventListener("transitionend", function() {
            alertElement.remove();
        });
    }

    function saveOrderToLocalStorage(time ){
        const existingItems = JSON.parse(localStorage.getItem("order")) || [];
        let ID = JSON.parse(localStorage.getItem("ID"));
        existingItems.push({
            id: ID,
            time: time
        });

        parseInt(ID);

        ID++;

        localStorage.setItem("order", JSON.stringify(existingItems));
        localStorage.setItem('ID', JSON.stringify(ID));
        generateOrderHTML();
    }

    window.addEventListener('load' , generateOrderHTML);
    window.addEventListener('load' , count);

    function changeRadius(btn) {
        let previousElementSibling = btn.previousElementSibling;
        let nextElementSibling = btn.nextElementSibling;

        console.log(nextElementSibling);
        if (previousElementSibling) {
            previousElementSibling.style.borderBottomRightRadius = '16px';
        }
        if (nextElementSibling) {
            nextElementSibling.style.borderTopRightRadius = '16px';
        }
    }

    function hideRadius() {
        li.forEach(function (element){
            element.style.borderRadius = '0px';
        })
    }


{
    const dishes = document.querySelectorAll('.dish__items-btn');

    dishes.forEach(function (element){
        element.addEventListener('click',addToLocalStorage);
    })

    function addToLocalStorage(evt) {
        const dishMainItem = evt.currentTarget.parentElement.parentElement;
        const dishItemDesc = evt.currentTarget.parentElement;

        const dishTitleElement = dishItemDesc.querySelector('.dish__item-title');
        const dishTitle = dishTitleElement.textContent

        const priceElement = dishItemDesc.querySelector('.dish__item-price');
        const price = priceElement.textContent.substring(2);

        const availableElement = dishItemDesc.querySelector('.dish__items-p');
        const available = Number(availableElement.textContent.substring(0, 2));

        const imgElement = dishMainItem.querySelector('.dish__item-img');
        const img = imgElement.getAttribute('src');

        let dishId = dishMainItem.id;

        const existingItems = JSON.parse(localStorage.getItem("dishes")) || [];
        const existingItemIndex = existingItems.findIndex((item) => item.id === dishId);

        if (existingItemIndex !== -1) {
            if (existingItems[existingItemIndex].available < existingItems[existingItemIndex].count + 1) {
                showAlert('Only ' + available + ' available', true);
                return;
            }
            existingItems[existingItemIndex].count++;
        } else {
            existingItems.push({
                id: dishId,
                name: dishTitle,
                price: price,
                available: available,
                count: 1,
                img: img,
            });
        }

        localStorage.setItem("dishes", JSON.stringify(existingItems));
        showAlert('Your food successfully added to the cart !!!');
        generateHTML();
        count();
    }
}

    function count(){
    const count = document.querySelector('.count');
    const existingItems = JSON.parse(localStorage.getItem("dishes")) || [];

    count.style.display = 'block';
    count.textContent = existingItems.length;

    if(count.textContent === '0'){
        count.style.display = 'none';
    }
}

{
    let dishBtns = document.querySelectorAll('.dish__wrap-btn');

    dishBtns.forEach(function (value){
        value.addEventListener('click',deliveryType);
    })
     function deliveryType(evt){
        dishBtns.forEach(function (element){
            element.classList.remove('dish__wrap-btn--active');
        })
         evt.currentTarget.classList.add('dish__wrap-btn--active');
     }
}



