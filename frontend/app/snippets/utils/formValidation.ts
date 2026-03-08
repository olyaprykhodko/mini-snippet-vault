import { FormData, FormErrors } from '../types';

export const validateForm = (formData: FormData) => {
  const formErrors: FormErrors = {
    title: '',
    content: '',
    tags: '',
    type: '',
  };

  if (!formData.title.trim()) {
    formErrors.title = 'Title is required';
  }

  if (!formData.content.trim()) {
    formErrors.content = 'Content is required';
  }

  if (!formData.type) {
    formErrors.type = 'Type is required';
  }

  return formErrors;
};
