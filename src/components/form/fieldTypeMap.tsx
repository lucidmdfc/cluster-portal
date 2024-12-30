import TextField from './fields/TextField';
import SelectField  from './fields/SelectField';
import FileUploadField from './fields/FileUploadField';
import TextAreaField from './fields/TextAreaField';
import DynamicListField from './fields/DynamicListField';
// import RHFTextField from '../hook-form/rhf-text-field';
// import RHFDropzone from '../hook-form/rhf-dropzone';

export const fieldTypeMap = {
  text: TextField,
  select: SelectField,
  fileUpload: FileUploadField,
  textAreaField: TextAreaField,
  dynamicListField: DynamicListField,
};
