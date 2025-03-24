export interface formValues {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    content?: string;
  }

export interface TemplateProps {
  formData: { [key: string]: string };
}