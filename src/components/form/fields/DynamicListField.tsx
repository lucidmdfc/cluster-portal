import React, { useState } from "react";
import { Grid, TextField as MuiTextField, Button, Chip, Box } from "@mui/material";
import { useController, Control, FieldValues, Path } from "react-hook-form";

interface DynamicListFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
}

const DynamicListField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
}: DynamicListFieldProps<TFieldValues>) => {
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const updatedItems = [...value, inputValue.trim()];
      onChange(updatedItems); // Update the field value
      setInputValue("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = value.filter((_: string, i: number) => i !== index);
    onChange(updatedItems); // Update the field value
  };

  return (
    <Grid item xs={12} sm={12} key={name} sx={{ mb: 2 }}>
      <MuiTextField
        label={label}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        error={!!error}
        helperText={error ? error.message : ""}
        size="small"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        sx={{ mt: 1 }}
      >
        Add
      </Button>
      <Box mt={2}>
        {value.map((item: string, index: number) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => handleRemoveItem(index)}
            sx={{ marginRight: 1, marginBottom: 1 }}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default DynamicListField;
