function validate_email(e) {
    const expReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (e.length == 0) {
        e.classList.add('error');
        return false;
    }

    if (!expReg.test(e.value)) {
        e.classList.add('error');
        return false;
    } else {
        e.classList.remove('error');
    }

    return true;
}

function validate_strings(e) {
    const expReg = /^([a-zA-ZnñÑÁáÉéÍíÓóÚúÜü\s])+$/;

    if (e.length == 0) {
        e.classList.add('error');
        return false;
    } else {
        e.classList.remove('error');
    }

    if (!expReg.test(e.value)) {
        e.classList.add('error');
        return false;
    } else {
        e.classList.remove('error');
    }

    return true;
}

function validate_date(e) {
    const d = Date.parse(e.value);

    if (e.length == 0) {
        e.classList.add('error');
        return false;
    } else {
        e.classList.remove('error');
    }

    if (isNaN(d)) {
        e.classList.add('error');
        return false;
    } else {
        e.classList.remove('error');
    }

    return true;
}