import set from "lodash/set";
import {isEmpty, isFunction, get} from "lodash";

const required = ({formValue, message}) => (formValue ? undefined : message);

const maxLength = ({formValue, max_length, message}) =>
  formValue && formValue.length >= max_length ? message : undefined;

const minLength = ({formValue, min_length, message}) =>
  formValue && formValue.length <= min_length ? message : undefined;

const number = ({formValue, message}) =>
  formValue && isNaN(Number(formValue)) ? message : undefined;

const email = ({formValue, message}) =>
  formValue && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValue)
    ? message
    : undefined;

const regex = ({ formValue, message, value, regex }) =>
  formValue && !new RegExp(value || regex, "i").test(formValue)
    ? message
    : undefined;

const empty = ({ formValue, message }) => isEmpty(formValue) ? undefined : message;

const mapping = {
  presence: required,
  maxLength,
  minLength,
  empty,
  regex,
  email,
  number,
};
const validate = (formValues, props) => {
  const errors = {};
  const { validations = [] } = props;

  validations.forEach(validation => {
    const { type, field } = validation;
    const formValue = get(formValues, field);
    if (isFunction(mapping[type])) {
      set(
        errors,
        field,
        mapping[type]({ formValue, ...validation })
      );
    }
  })
  return errors
};

export default validate;
