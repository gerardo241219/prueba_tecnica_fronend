import 'normalize.css'
import './style.css'
import calcAge from './public/calcAge';
// import javascriptLogo from './javascript.svg'

document.querySelector('#app').innerHTML = `
  <header class="header">
    <navbar class="header__navbar">
    </navbar>
  </header>

  <div class="container">
    <div class="container__form">
      <form action="">
        <div class="form__inputs">
          <label class="form__inputs-label" for="">Email</label>
          <input class="form__inputs-input" type="email" id="email" placeholder="Email" autocomplete="off">
        </div>
        <div class="form__inputs">
          <label class="form__inputs-label" for="">Nombre(s)</label>
          <input class="form__inputs-input" type="text" id="names" placeholder="Nombre(s)" autocomplete="off">
        </div>
        <div class="form__inputs">
          <label class="form__inputs-label" for="">Apellidos(s)</label>
          <input class="form__inputs-input" type="text" id="lastNames" placeholder="Apellidos(s)" autocomplete="off">
        </div>
        <div class="form__inputs">
          <label class="form__inputs-label" for="">Fecha de nacimiento</label>
          <input class="form__inputs-input" type="date" id="dayBirth">
        </div>
        <div class="form__inputs">
          <button id="btn_register" class="btn btn__primary">Registrar</button>
        </div>
      </form>
    </div>

    <div class="container__table">
      <table class="table">
        <thead class="table__thead">
          <tr class="table__tr">
            <th class="table__th">Id</th>
            <th class="table__th">Nombre</th>
            <th class="table__th">Edad</th>
            <th class="table__th">Email</th>
          </tr>
        </thead>
        <tbody id="tb_body"></tbody>
      </table>
    </div>
  </div>
`

const email = document.querySelector('#email');
const names = document.querySelector('#names');
const lastNames = document.querySelector('#lastNames');
const dayBirth = document.querySelector('#dayBirth');
const btnRegister = document.querySelector('#btn_register');
const tb_body = document.querySelector('#tb_body');
let users = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://reqres.in/api/users?page=1', {
    method: "GET",
    header: { "Content-type": "application/json;charset=UTF-8" }
  })
    .then(response => response.json())
    .then(json => localStorage.setItem('users', JSON.stringify(json.data)));

  showTable();
})

email.addEventListener('input', e => {
  validate_email(e.target);
});

names.addEventListener('input', e => {
  validate_strings(e.target);
});

lastNames.addEventListener('input', e => {
  validate_strings(e.target);
});

dayBirth.addEventListener('change', e => {
  validate_date(e.target);
});

btnRegister.addEventListener('click', e => {
  e.preventDefault();

  const v_email = validate_email(email);
  const v_names = validate_strings(names);
  const v_lastNames = validate_strings(lastNames);
  const v_date = validate_date(dayBirth);

  if (v_email && v_names && v_lastNames && v_date) {

    users = JSON.parse(localStorage.getItem('users'));

    const obj = {
      id: users.length + 1,
      email: email.value,
      first_name: names.value,
      last_name: lastNames.value,
      dayBirth: dayBirth.value
    }

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Se ha registrado correctamente un nuevo usuario",
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        users.push(obj);

        localStorage.setItem('users', JSON.stringify(users));
        cleanTable();
        showTable();
      }
    })
  } else {
    Swal.fire({
      icon: "error",
      title: "Error al realizar el registro",
      text: "Revisa que todos los datos esten correctamente ingresados",
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "Aceptar"
    })
  }
});

const showTable = () => {
  const users = JSON.parse(localStorage.getItem('users'));

  users.forEach(user => {
    tb_body.innerHTML += tb_body.innerHTML = `<tr id="register" class="table__tbody-tr">
      <td id="r_id" class="table__td">${user.id}</td>
      <td id="r_name" class="table__td">${user.first_name + ' ' + user.last_name}</td>
      <td id="r_birth" class="table__td">${user.dayBirth ? calcAge(user.dayBirth) + ' años' : '-'}</td>
      <td id="r_email" class="table__td">${user.email}</td>
    </tr>
    `;
  });
}

const cleanTable = () => {
  $('#tb_body').empty();
  $('#email').val("");
  $('#names').val("");
  $('#lastNames').val("");
  $('#dayBirth').val("");
}

