import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Create, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const CreateProduct = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [{ category: null, price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  const onSubmit = (data) => {
    console.log(data);
    // Reset the form after successful submission
    reset({
      name: "",
      description: "",
      material: "",
      items: [{ category: null, price: "" }],
    });
  };

  return (
    <Create saveButtonProps={{ onClick: handleSubmit(onSubmit) }}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <TextField
          {...register("name")}
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("description")}
          multiline
          label="Description"
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          {...register("material")}
          label="Material"
          error={!!errors.material}
          helperText={errors.material?.message}
        />

        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <Controller
              control={control}
              name={`items.${index}.category`}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  id={`category-${index}`}
                  {...autocompleteProps}
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={(item) => {
                    return (
                      autocompleteProps?.options?.find(
                        (option) => option?.id === item?.id
                      )?.title ?? ""
                    );
                  }}
                  isOptionEqualToValue={(option, value) => {
                    return (
                      value === undefined || option?.id === (value?.id ?? value)
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                      margin="normal"
                      error={!!errors.items?.[index]?.category}
                      helperText={errors.items?.[index]?.category?.message}
                    />
                  )}
                />
              )}
            />
            <TextField
              {...register(`items.${index}.price`)}
              label="Price"
              error={!!errors.items?.[index]?.price}
              helperText={errors.items?.[index]?.price?.message}
            />
            <IconButton onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          type="button"
          variant="contained"
          onClick={() => append({ category: null, price: "" })}
        >
          Add Item
        </Button>
      </Box>
    </Create>
  );
};
