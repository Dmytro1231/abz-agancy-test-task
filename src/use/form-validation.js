import * as yup from "yup";
import { useField, useForm } from "vee-validate";

export function formValidation(fn) {
  const { handleSubmit, isSubmitting } = useForm();

  const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
    "name",
    yup
      .string()
      .trim()
      .required("This field is required")
      .min(2)
      .max(60)
  );

  const { meta: metaName } = useField("name", value => !!value);
  const { meta: metaPhone } = useField("phone", value => !!value);
  const { meta: metaEmail } = useField("email", value => !!value);
  const { meta: metaCheckbox } = useField("checkbox", value => !!value);

  const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
    "phone",
    yup
      .string()
      .trim()
      .required("Number should start with code of Ukraine +380")
  );

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("This field is required")
      .email("User email, must be a valid email according to RFC2822")
  );

  const { value: checkbox, errorMessage: chboxError } = useField(
    "checkbox",
    yup.string().required("Checkbox cannot be empty, bro ^-^")
  );

  const onSubmit = handleSubmit(fn);

  return {
    name,
    nError,
    nBlur,
    phone,
    pError,
    pBlur,
    email,
    eError,
    eBlur,
    checkbox,
    chboxError,
    onSubmit,
    isSubmitting,
    metaName,
    metaPhone,
    metaEmail,
    metaCheckbox
  };
}
