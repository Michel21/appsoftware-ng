import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  static gatValidatorErrorMessage(validatorName: string) {
    let config = {
      'required': 'required input',
      'invalidEmailAddress': 'Invalid e-mail address',
      'invalidName': 'Invalid name!',
      'invalidCountry': 'Please select a country'
    }
    return config[validatorName];
  }

  static nameValidator(control) {
    if (control.value !== null) {
      let regexLetters = /^([A-Zá-úa-z ]+)$/gi;

      if (regexLetters.test(control.value)) {
        return null;
      } else {
        return { 'invalidName': true }
      }
    }
  }

  static emailValidator(control) {
    if (control.value != null) {
      if (control.value.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)) {
        return null
      } else {
        return { 'invalidEmailAddress': true }
      }
    }
  }
  static btgEmailValidator(control) {
    if (control.value != null) {
      if (control.value.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@appsoftware/i)) {
        return null
      } else {
        return { 'invalidEmailAddress': true }
      }
    }
  }
}
