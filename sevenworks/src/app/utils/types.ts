// This file defines types used across the application

// FormData type for resume templates
export interface TemplateFormData {
  font?: string;
  fontSize?: number; // Add fontSize property
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
  // Education related fields
  education?: { 
    degree: string; 
    institution: string; 
    years: string;
  }[];
  educationSchool?: string;
  educationGraduation?: string;
  educationDegree?: string;
  educationDescription?: string;
  educationGPA?: string;
  // Experience related fields
  experience?: { 
    title: string; 
    company: string; 
    years: string;
  }[];
  // Leadership related fields
  leadership?: { 
    title: string; 
    description: string;
  }[];
  // Other sections
  ubsProgram?: string;
  honors?: string;
  honorsList?: { honor: string }[];
  skillsInterests?: string;
  // Allow for additional properties
  [key: string]: unknown;
}

// Props interface for template components
export interface TemplateProps {
  formData: TemplateFormData;
}