import React from "react";
import { TextField } from "@material-ui/core";

interface IPasswordInputProps {
  errors: any,
  register: any,
  setPassword: Function,
  defaultValue: string
}

export default function PasswordInput ({
  errors,
  register,
  setPassword,
  defaultValue
}: IPasswordInputProps) {
  return (
    <TextField
      fullWidth
      label='Senha'
      error={!!errors.password}
      type='password'
      name='password'
      autoComplete='current-password'
      margin='normal'
      variant='outlined'
      defaultValue={defaultValue}
      helperText={errors.password ? errors.password.message : ''}
      onChange={(event) => setPassword(event.target.value)}
      inputProps={{
        ref: register({
          required: 'Campo Obrigatório'
        }),
        'data-testid': 'passwordInput'
      }}
    />
  )
}