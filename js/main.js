import {runRenderGallery} from './render-gallery.js';
import {hideModalForm, setOnFormSubmit} from './form.js';

runRenderGallery();

setOnFormSubmit(hideModalForm);
