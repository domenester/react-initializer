import React from "react";
import { TextField } from "@material-ui/core";
import { ErrorMessages } from "../../../messages/error";

interface IEmailInputProps {
  errors: any,
  register: any,
  setEmail: Function,
  defaultValue: string
}

export default function EmailInput ({
  errors,
  register,
  setEmail,
  defaultValue
}: IEmailInputProps) {
  return (
    <TextField
      fullWidth
      onChange={(event) => setEmail(event.target.value)}
      error={!!errors.email}
      label={'Email'}
      name='email'
      autoComplete='email'
      margin='normal'
      variant='outlined'
      defaultValue={defaultValue}
      helperText={errors.email ? errors.email.message : ''}
      inputProps={{
        ref: register({
          required: 'Campo Obrigatório',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: ErrorMessages.form.validation.email,
          }
        }),
        'data-testid': 'emailInput'
      }}
    />
  )
}