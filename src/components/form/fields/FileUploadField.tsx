import React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { FileUploader } from "../file-uploader";
import { useDialog } from "src/hooks/use-dialog";
import { Button, Grid, SvgIcon } from "@mui/material";
import Upload01 from "@untitled-ui/icons-react/build/esm/Upload01";

// Define the types for the props
interface FileUploadFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  control: Control<TFieldValues>;
}

const FileUploadField = <TFieldValues extends FieldValues>({
  name,
  label,
  required = false,
  control,
}: FileUploadFieldProps<TFieldValues>) => {
  const uploadDialog = useDialog();
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    control,
    rules: { required },
  });
  // console.log(field)
  const handleFileSelect =  (file: File[]) => {
    if (file.length > 0) {
      console.log("Selected files:", file);
      field.onChange(file); // Update form state with the file
    }
    uploadDialog.handleClose();
  };


  return (
    <Grid item xs={12}>
      <Button
        sx={{
            width: '100%',
            py: 1.3,
          }}
        startIcon={
          <SvgIcon>
            <Upload01 />
          </SvgIcon>
        }
        color="info"
        variant="outlined"
        onClick={uploadDialog.handleOpen}
        >
        {label}
      </Button>

      <FileUploader
        onSelectFiles={handleFileSelect}
        onClose={uploadDialog.handleClose}
        open={uploadDialog.open}
      />
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </Grid>
  );
};

export default FileUploadField;
