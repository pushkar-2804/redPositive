const validateForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) errors.name = "Name is required";
  else if (
    !/^[a-zA-Z]{2,15}(\s[a-zA-Z.]{1,10})?(\s[a-zA-Z]{2,10})?(\s[a-zA-Z]{2,10})?$/.test(
      formData.name
    )
  ) {
    errors.name = "Name can only contain letters and spaces";
  }
  if (!formData.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^[6-9]([0-9]){9}$/.test(formData.phone)) {
    errors.phone = "Phone can only contain digits";
  }

  if (!formData.email.trim()) errors.email = "Email is required";
  else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
  ) {
    errors.email = "Invalid email format";
  }

  if (!formData.hobbies.trim()) errors.hobbies = "Hobbies is required";

  return errors;
};

export default validateForm;
