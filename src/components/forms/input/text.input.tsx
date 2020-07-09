import React from "react";
import { TextField } from "@material-ui/core";

interface ITextInputProps {
  errors: any,
  register: any,
  setValue: Function,
  defaultValue: string,
  name: string,
  label: string
}

export default function TextInput ({
  errors,
  register,
  setValue,
  defaultValue,
  name,
  label
}: ITextInputProps) {
  return (
    <TextField
      onChange={(event) => setValue(event.target.value)}
      fullWidth
      error={!!errors[name]}
      label={label}
      name={name}
      autoComplete={label}
      margin='normal'
      variant='outlined'
      defaultValue={defaultValue}
      helperText={errors[name] ? errors[name].message : ''}
      inputProps={{
        ref: register({
          required: 'Campo Obrigatório'
        }),
        'data-testid': `${name}Input`
      }}
    />
  )
}