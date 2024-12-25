import TextField from './fields/TextField';
import SelectField  from './fields/SelectField';
// import FileUploadField from './fields/FileUploadField';

export const fieldTypeMap = {
  text: TextField,
  select: SelectField,
  // fileUpload: FileUploadField,
  // Add other field components as necessary
};
