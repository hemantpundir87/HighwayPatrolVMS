import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  // 🔹 Common Regex Patterns
  static patterns = {
    latitude: /^[-+]?[0-9]*\.?[0-9]+$/,
    longitude: /^[-+]?[0-9]*\.?[0-9]+$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    mobile: /^[0-9]{10}$/,
    alphaNumSpace: /^[a-zA-Z0-9 ]+$/,
    chainage: /^(?:\d{1,3})\.\d{3}$/, // ✅ Example: 0.900, 12.345, 125.678
  };

  // 🔹 Common Error Messages
  static messages: Record<string, string> = {
    required: 'This field is required',
    invalidLatitude: 'Invalid latitude format',
    invalidLongitude: 'Invalid longitude format',
    invalidEmail: 'Invalid email address',
    invalidMobile: 'Mobile number must be 10 digits',
    invalidAlphaNumSpace: 'Only letters, numbers, and spaces allowed',
    invalidChainage: 'Invalid format (use KM.MMM, e.g. 12.345)',
  };

  // 🔹 Custom Validator Generator
  static patternValidator(pattern: RegExp, errorKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return pattern.test(control.value)
        ? null
        : { [errorKey]: true };
    };
  }

  // 🔹 Get message for a specific control
  static getErrorMessage(control: AbstractControl): string | null {
    if (!control || !control.errors) return null;
    const firstError = Object.keys(control.errors)[0];
    return this.messages[firstError] || 'Invalid input';
  }
}
