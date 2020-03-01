class RegisterForm extends HTMLFormElement { 
    constructor() {
      super();
      //this.addEventListener('click', () => alert("Привет!"));
      this.innerHTML = `<div class="formHeader"><span>Fill the form to register</span></div>
      <div is="input-container" data-name="userName" data-value="Enter your first name"></div>
      <div is="input-container" data-name="userLogin" data-value="Enter login"></div>
      <div class="inputContainer"><input class="registrFormField" type="text" name="userPassword" value="Enter password"></div>
      <div class="inputContainer"><input class="registrFormField" type="text" name="userPhone" value="8(999)111-11-11"></div>
      <div class="inputContainer">
          <div class="registrFormPolicyAgree">
              <span>Agree private data policy</span>
              <input class="policyAgree" type="checkbox" name="policyAgree" checked>
          </div>
      </div>
      <div class="registrFormSubmit">
          <input class="formSubmitButton" name="submitButton" type="submit" value="Enter">
      </div>`;
      this.className = 'registrForm';
    }
  
  }
customElements.define('reg-form', RegisterForm, {extends: 'form'});
  

class LoginForm extends HTMLFormElement { 
    constructor() {
      super();
      //this.addEventListener('click', () => alert("Привет!"));
      this.innerHTML = `<div class="formHeader"><span>Fill the form to register</span></div>
      <div is="input-container" data-name="userLogin" data-value="Enter login"></div>
      <div is="input-container" data-name="userPassword" data-value="Enter password"></div>
      <div class="registrFormSubmit">
          <input class="formSubmitButton" name="submitButton" type="submit" value="Enter">
      </div>`;
      this.className = 'loginForm';
    }
  
  }
customElements.define('login-form', LoginForm, {extends: 'form'});

  
  class InputContainer extends HTMLDivElement {
      constructor() {
          super();
          this.className = 'inputContainer';
      }
  
      connectedCallback() {
          this.innerHTML = `<input class="registrFormField" type="text" name=${this.dataset.name} value="${this.dataset.value}">`;
      }
  }
  customElements.define('input-container', InputContainer, {extends: 'div'});

  //костылек для формы логина
console.log(document.querySelector('.loginFormContainer'), document.querySelector('.loginForm').hidden)
document.querySelector('.loginFormContainer').hidden = true;