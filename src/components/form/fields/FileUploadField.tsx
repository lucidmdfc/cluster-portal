// import React from "react";
// import { useController, Control, FieldValues, Path, useFormContext } from "react-hook-form";
// import { FileUploader } from "../file-uploader";
// import { useDialog } from "src/hooks/use-dialog";
// import { Button, Grid, SvgIcon } from "@mui/material";
// import Upload01 from "@untitled-ui/icons-react/build/esm/Upload01";

// // Define the types for the props
// interface FileUploadFieldProps<TFieldValues extends FieldValues> {
//   name: Path<TFieldValues>;
//   label: string;
//   required?: boolean;
//   control: Control<TFieldValues>;
//   onFileSelect?: (files: FileList | null) => void;
// }

// const FileUploadField = <TFieldValues extends FieldValues>({
//   name,
//   label,
//   required = false,
//   control,
//   onFileSelect,
// }: FileUploadFieldProps<TFieldValues>) => {
//   const uploadDialog = useDialog();

//   const {
//     field,
//     fieldState: { error },
//   } = useController<TFieldValues>({
//     name,
//     control,
//     rules: { required },
//   });

//   const handleFileSelect = (files: FileList | null) => {
//   };

//   return (
//     <Grid item xs={12}>
//       <Button
//         sx={{
//             width: '100%',
//             py: 1.3,
//           }}
//         startIcon={
//           <SvgIcon>
//             <Upload01 />
//           </SvgIcon>
//         }
//         color="info"
//         variant="outlined"
//         onClick={uploadDialog.handleOpen}
//         >
//         {/* {buttonText} */}
//         upload file
//       </Button>

//       <FileUploader
//         onSelectFiles={handleFileSelect}
//         onClose={uploadDialog.handleClose}
//         open={uploadDialog.open}
//       />
//       {error && <div style={{ color: "red" }}>{error.message}</div>}
//     </Grid>
//   );
// };

// export default FileUploadField;
