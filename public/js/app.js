$(document).ready(function () {
    if ($("#signup-form").length) {
        let e = {
            rules: {
                email: {required: !0, email: !0},
                password: {
                    required: !0,
                    minlength: 8,
                },
                re_password: {
                    required: !0,
                    equalTo: "#password"
                }
            },
            messages: {
                email: {required: "Please enter email", email: "Please enter a valid email address"},
                password: {required: "Please enter password", minlength: "Password must have at least 8 characters"},
                re_password: {required: "Please enter password", equalTo: "Password and confirm password are not match"}
            }
        };
        $("#signup-form").validate(e)
    }

    if ($("#login-form").length) {
        e = {
            rules: {
                email: {required: !0, email: !0},
                password: "required"
            },
            messages: {
                email: {required: "Please enter email", email: "Please enter a valid email address"},
                password: "Please enter password",
            },
            onfocus: true
        };
        $("#login-form").validate(e)
    }

    if ($("#change-password-form").length) {
        e = {
            rules: {
                password: "required",
                newPassword: {required: !0, minlength: 8},
                rePassword: {equalTo: "#new-password"}
            },
            messages: {
                password: "Please enter password",
                newPassword: {
                    required: "Please enter new password",
                    minlength: "New password must have at least 8 characters"
                },
                rePassword: {equalTo: "Confirm password and new password are not match"}
            }
        };
        $("#change-password-form").validate(e)
    }

    if ($("#search_text").length) {
        $("#search_text")[0].onfocus = function (e) {
            const $search_text = $("#search_text")[0];
            if ($search_text.value === "Search product")
                $search_text.value = "";
        }


        $("#search_text")[0].onfocusout = function (e) {
            const $search_text = $("#search_text")[0];
            if ($search_text.value === "")
                $search_text.value = "Search product";
        }

// Search product
        $("#search_btn")[0].onclick = function (e) {
            const currentQuery = window.location.search;
            let searchQuery = `search=${$("#search_text").val()}`;
            if (currentQuery !== "") {
                const parts = currentQuery.split("&");
                parts[0] = parts[0].slice(1);
                parts.forEach((part, index) => {
                    var param = part.split("=")[0];
                    if (param !== "search" && param !== "page") {
                        searchQuery += `&${part}`;
                    }
                })
            }
            window.location.href = `/products?${searchQuery}`;
        }
    }

    if ($("#search_all_text").length) {
        $("#search_all_text")[0].onfocus = function (e) {
            const $search_text = $("#search_all_text")[0];
            if ($search_text.value === "Search product")
                $search_text.value = "";
        }


        $("#search_all_text")[0].onfocusout = function (e) {
            const $search_text = $("#search_all_text")[0];
            if ($search_text.value === "")
                $search_text.value = "Search product";
        }

// Search product
        $("#search_all_btn")[0].onclick = function (e) {
            window.location.href = `/products?search=${$("#search_all_text").val()}`;
        }
    }

    function getParentNode(el, level) {
        while (level-- > 0) {
            el = el.parentElement
            if (!el) return null;
        }
        return el;
    }

    // Get the total cart shown in the header
    if ($('#cart-total').length) {
        $.get(`/api/cart`, function (data) {
            $('#cart-total')[0].innerText = `(${data.count})`
        })
    }

    function getInputNode(currentNode, levelParent) {
        const p = getParentNode(currentNode, levelParent);
        return Array
            .from(p.children)
            .filter((value) => value.tagName.toLowerCase() === "input");
    }

    function updateCartCount(count) {
        const $cart = $(".btn.cart");
        $cart.addClass('shake');
        $('#cart-total')[0].innerText = `(${count})`
        setTimeout(function () {
            $cart.removeClass('shake');
        }, 500)
    }

    function updateCartHeader(cart) {
        updateCartCount(cart.count)
    }

    // Add to cart
    if ($(".add-this-to-cart").length) {
        $(".add-this-to-cart").on("click", function (e) {
            event.preventDefault();
            $.post(`/api/cart/add`, {
                id: getInputNode(e.currentTarget, 1)[0].value
            }, updateCartHeader)
        });
    }

    if ($(".add-to-cart").length) {
        $(".add-to-cart").on("click", function (e) {
            event.preventDefault();
            $.post(`/api/cart/add`, {
                id: getInputNode(e.currentTarget, 3)[0].value
            }, updateCartHeader)
        });
    }

    if ($(".add-to-cart-bill").length) {
        $(".add-to-cart-bill").on("click", function (e) {
            event.preventDefault();
            $.post(`/api/cart/add`, {
                id: getInputNode(e.currentTarget, 1)[0].value
            }, updateCartHeader)
        });
    }

    // Buy now
    if ($(".btn.buy-this-now").length) {
        $(".btn.buy-this-now").on("click", function (e) {
            event.preventDefault();
            $.post(`/api/cart/add`, {
                id: getInputNode(e.currentTarget, 1)[0].value
            }, function (data) {
                window.location.href = '/cart'
            })
        })
    }

    if ($(".btn.buy-now").length) {
        $(".btn.buy-now").on("click", function (e) {
            event.preventDefault();
            $.post(`/api/cart/add`, {
                id: getInputNode(e.currentTarget, 2)[0].value
            }, function (data) {
                window.location.href = '/cart'
            })
        })
    }

    function updateTotal(id, cartDetail) {
        const $total = $(`#product-${id} td.in-total`)[0];
        $total.innerText = `${cartDetail.product.price * cartDetail.quantity}₫`;
    }

    function updateCartContent() {
        let subTotal = 0;
        Array.from($(`td.in-total`)).forEach((rowTotal) => {
            const total = rowTotal.innerText
            subTotal += parseInt(total.slice(0, total.length - 1));
        });
        $(`div.cart-content p span`)[0].textContent = `${subTotal}₫`;
        $(`div.cart-content h2 span`)[0].textContent = `${subTotal}₫`;
    }

    if ($(`div.cart-content`).length) {
        updateCartContent()
    }

    // Cart processing
    const $btnMinusCart = $(".btn-minus.in-cart");
    if ($btnMinusCart.length) {
        $btnMinusCart.on("click", function (e) {
                event.preventDefault();
                const id = getInputNode(e.currentTarget, 3)[0].value;
                const $inputQuantity = $(`#product-${id} td div.qty input`)[0];
                if ($inputQuantity.value > 1) {
                    $.post(`/api/cart/update`, {
                        id,
                        quantity: parseInt($inputQuantity.value) - 1
                    }, function (data) {
                        $inputQuantity.value = data.quantity
                        updateTotal(id, data)
                        updateCartContent();
                    })
                }
            }
        )
    }

    const $inputQuantity = $(".product-quantity.in-cart");
    if ($inputQuantity.length) {
        $inputQuantity.blur(function (e) {
                event.preventDefault();
                const id = getInputNode(e.currentTarget, 3)[0].value;
                const quantity = parseInt(e.currentTarget.value)
                if (quantity && quantity > 0) {
                    $.post(`/api/cart/update`, {
                        id,
                        quantity
                    }, function (data) {
                        e.currentTarget.value = data.quantity
                    })
                } else {
                    $.post(`/api/cart/update`, {
                        id,
                        quantity: 1
                    }, function (data) {
                        e.currentTarget.value = data.quantity
                        updateTotal(id, data);
                        updateCartContent();
                    })
                }
            }
        )
    }

    const $btnPlusCart = $(".btn-plus.in-cart");
    if ($btnPlusCart.length) {
        $btnPlusCart.on("click", function (e) {
                event.preventDefault();
                const id = getInputNode(e.currentTarget, 3)[0].value;
                const $inputQuantity = $(`#product-${id} td div.qty input`)[0];
                $.post(`/api/cart/update`, {
                    id,
                    quantity: parseInt($inputQuantity.value) + 1
                }, function (data) {
                    $(`#product-${id} td div.qty input`)[0].value = data.quantity
                    updateTotal(id, data);
                    updateCartContent();
                })
            }
        )
    }

    const $btnDeleteCart = $(`.product-delete`)
    if ($btnDeleteCart.length) {
        $btnDeleteCart.on("click", function (e) {
            const id = getInputNode(e.currentTarget, 2)[0].value;
            $.post(`/api/cart/delete`, {
                id
            }, function (data) {
                const cartCount = $(`.btn.cart span`)[0].innerText;
                const currentCount = parseInt(cartCount.slice(1, cartCount.length - 1));
                $(`#product-${id}`)[0].remove();
                updateCartCount(currentCount - data);
                updateCartContent();
            })
        });
    }

    // CHECK OUT Processing
    if ($(`div.payment-method div input`).length) {
        $(`div.payment-method div input`)[0].checked = true

    }

    const $viewBill = $('.btn.view-bill')
    if ($viewBill.length) {
        $viewBill.on("click", function (e) {
            const id = getInputNode(e.currentTarget, 1)[0].value;
            window.location.href = `/bill?id=${id}`;
        })
    }

    // Address
    if ($("#address-input-form").length) {
        const e = {
            rules: {
                phone: "required",
                address: "required"
            },
            messages: {
                phone: "Please input your phone",
                address: "Please input your address"
            }
        };
        $("#address-input-form").validate(e)
    }

    function createLabelError(errorMsg, id) {
        let label = document.createElement("label");
        label.setAttribute('id', id)
        label.setAttribute('class', 'error')
        label.innerHTML = errorMsg
        return label
    }

    function checkErrorFor(msg, elem) {
        if (elem.value === "") {
            if (!$(`label#${elem.name}-error`).length) {
                const label = createLabelError(msg, `${elem.name}-error`)
                const parent = getParentNode(elem, 1);
                parent.appendChild(label);
                elem.onfocus = function (e) {
                    label.remove()
                }
            }
            return false;
        }
        return true;
    }

    const $checkoutBtn = $(`.checkout-btn`);
    if ($checkoutBtn.length) {
        $checkoutBtn.on("click", function (e) {
            const $paymentMethod = $(`div.payment-method input:checked`);
            const $phoneField = $(`div.billing-address input[name="phone"]`)[0];
            const $addressField = $(`div.billing-address input[name="address"]`)[0];
            if (!$paymentMethod.length) {
                if (!$(`label#payment-error`).length) {
                    const label = createLabelError('Select one payment method', 'payment-error')
                    $(`div.payment-method`).appendChild(label);
                    $(`div.payment-method input`).on("click", function (e) {
                        label.remove();
                    });
                }
                return;
            }
            let valid = checkErrorFor('Please input your phone for shipping', $phoneField);
            valid = checkErrorFor('Please input your address for shipping', $addressField) && valid;
            if (valid) {
                $.post('/api/bill/create', {
                    paymentMethod: $paymentMethod[0].value,
                    address: $addressField.value,
                    phone: $phoneField.value
                }, function (data) {
                    if (data['diffAddress'] !== undefined) {
                        cuteAlert({
                            type: "question",
                            title: "Update address",
                            message: "Do you want to use this address as your main address?",
                            confirmText: "Update",
                            cancelText: "Cancel"
                        }).then((msg) => {
                            if (msg === "confirm") {
                                $.post('/my-account/address/update', {
                                    address: $addressField.value,
                                    phone: $phoneField.value
                                })
                            }
                            window.location.href = `/bill?id=${data.id}`
                        })
                    } else {
                        window.location.href = `/bill?id=${data.id}`
                    }
                }).fail(function () {
                    cuteAlert({
                        type: "question",
                        title: "Unexpected error",
                        message: "Please try again!",
                        img: "error.svg",
                        buttonText: "Try again"
                    }).then((msg) => {
                        window.location.reload()
                    })
                })
            }
        })
    }
})