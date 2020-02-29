/*MVC*/
import {FormModel} from './FormModel.js';
import {FormView} from './FormView.js';
import {FormController} from './FormController.js';

export {model, view, controller};

let model = new FormModel();
let view = new FormView();
let controller = new FormController();
