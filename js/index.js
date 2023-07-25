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

    function giveValue(evt){
        let data = value.textContent;
        const tabTarget = evt.currentTarget;

        value.textContent = tabTarget.textContent;
        tabTarget.textContent = data;
    }
}

{
    const li = document.querySelectorAll('.nav_list');
    const cover = document.getElementById('bg__cover');
    const burgerWrap = document.querySelector('.burger__wrap');
    const burgerInfoWrap = document.querySelector('.burger__information-wrap');
    const orderHistory = document.querySelector('.order__history-wrap');
    const accountWrap = document.querySelector('.account__wrap');
    const orderWrap = document.querySelector('.order__wrap');
    const burgerFunctions = document.querySelectorAll('.burger__inner-img-desc');
    const backArrows = document.querySelectorAll('.burger__information-arrow');

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

    function change(evt) {
        const tabTarget = evt.currentTarget;
        changeTabTarget = tabTarget;

        if (tabTarget.classList.contains('li--active')) {
            removeActiveIcon(tabTarget);
        } else {
            li.forEach(function (element) {
                element.classList.remove('li--active');
                element.children[0].classList.remove('nav__menu-btn--active');
                element.children[0].children[0].classList.remove('aside__icon--active');
            });
            tabTarget.classList.add('li--active');
            tabTarget.children[0].classList.add('nav__menu-btn--active');
            tabTarget.children[0].children[0].classList.add('aside__icon--active');
        }

        let dataset = tabTarget.dataset.tooltip;

        if(dataset !==undefined){
            if(dataset === 'tooltip1') {
                close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
                close(orderHistory, 'order__history--active', 'order__history--not-active');
               if(tabTarget.classList.contains('li--active')){
                   show(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                }else {
                   close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                }
            }
            else if(dataset === 'tooltip7'){
                close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
                close(orderHistory, 'order__history--active', 'order__history--not-active');
                if(tabTarget.classList.contains('li--active')){
                    show(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                }else {
                    close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                }
            }
            else if(dataset === 'tooltip8'){
                close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
                close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
                close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
                close(orderHistory, 'order__history--active', 'order__history--not-active');
                if(tabTarget.classList.contains('li--active')){
                    show(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                }else {
                    close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                }
            }
        }
        else {
            close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
            close(burgerInfoWrap, 'burger__information--active', 'burger__information--not-active');
            close(orderHistory, 'order__history--active', 'order__history--not-active');
            close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
            close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
        }
    }

    function showFunctions(evt){
        const tabTarget = evt.currentTarget;

        let dataset = tabTarget.dataset.tooltip;

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
                }else {
                    close(orderHistory, 'order__history--active', 'order__history--not-active');
                    show(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
                }
            }
        }
    }

    function removeActiveIcon(){
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
        close(orderWrap, 'order__wrap--active', 'order__wrap--not-active');
        close(burgerWrap, 'burger__wrap--active', 'burger__wrap--not-active');
        close(accountWrap, 'account__wrap--active', 'account__wrap--not-active');
        removeActiveIcon();
    })
}




