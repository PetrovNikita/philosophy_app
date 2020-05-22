class RegisterForm extends HTMLFormElement { 
    constructor() {
      super();
      this.innerHTML = `<div class="formHeader"><span>Fill the form to register</span></div>
      <div is="input-container" data-name="userName" data-value="Enter your first name"></div>
      <div is="input-container" data-name="userLogin" data-value="Enter login"></div>
      <div class="inputContainer">
        <input class="registrFormField" type="text" name="userPassword" value="Enter password">
        <button class="showPassword">show</button>
      </div>
      <div class="inputContainer"><input class="registrFormField" type="text" name="userPhone" value="Enter mobile phone number"></div>
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
      <div class="inputContainer">
        <input class="registrFormField" type="text" name="userPassword" value="Enter password">
        <button class="showPassword">show</button>
      </div>
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

