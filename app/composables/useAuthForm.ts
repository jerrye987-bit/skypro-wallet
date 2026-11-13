interface AuthUser {
  token: string;
  name: string;
}

type AuthFields = {
  login: string;
  name: string;
  password: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

type UseAuthFormOptions = {
  withName?: boolean;
};

export const useAuthForm = (
  authenticate: (fields: AuthFields) => Promise<AuthUser>,
  fallbackError: string,
  options: UseAuthFormOptions = {},
) => {
  const withName = options.withName ?? true;
  const name = ref("");
  const email = ref("");
  const password = ref("");

  const nameTouched = ref(false);
  const emailTouched = ref(false);
  const passwordTouched = ref(false);

  const serverError = ref("");
  const isSubmitting = ref(false);

  const isNameValid = computed(() => !withName || name.value.trim().length > 0);
  const isEmailValid = computed(() => EMAIL_PATTERN.test(email.value));
  const isPasswordValid = computed(() => password.value.length >= 6);

  const nameInvalid = computed(() => nameTouched.value && !isNameValid.value);
  const emailInvalid = computed(
    () => emailTouched.value && !isEmailValid.value,
  );
  const passwordInvalid = computed(
    () => passwordTouched.value && !isPasswordValid.value,
  );

  const hasError = computed(
    () => nameInvalid.value || emailInvalid.value || passwordInvalid.value,
  );

  const inputClass = (touched: boolean, valid: boolean) => ({
    "auth__input--valid": touched && valid,
    "auth__input--error": touched && !valid,
  });

  const isSubmitDisabled = computed(() => hasError.value || isSubmitting.value);

  const onSubmit = async () => {
    if (withName) {
      nameTouched.value = true;
    }
    emailTouched.value = true;
    passwordTouched.value = true;
    serverError.value = "";

    if (hasError.value) return;

    isSubmitting.value = true;
    try {
      const user = await authenticate({
        login: email.value,
        name: name.value,
        password: password.value,
      });
      localStorage.setItem("token", user.token);
      localStorage.setItem("userName", user.name);
      await navigateTo("/");
    } catch (error) {
      serverError.value =
        error instanceof Error ? error.message : fallbackError;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    name,
    email,
    password,
    nameTouched,
    emailTouched,
    passwordTouched,
    nameInvalid,
    emailInvalid,
    passwordInvalid,
    isNameValid,
    isEmailValid,
    isPasswordValid,
    hasError,
    inputClass,
    isSubmitDisabled,
    serverError,
    onSubmit,
  };
};
