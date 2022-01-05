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
})