import React from "react";
import { TextField } from "@material-ui/core";

interface IPasswordInputProps {
  errors: any,
  register: any,
  setPassword: Function,
  defaultValue: string,
  disabled?: boolean
}

export default function PasswordInput ({
  errors,
  register,
  setPassword,
  defaultValue,
  disabled = false
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
      value={defaultValue}
      disabled={disabled}
      helperText={errors.password ? errors.password.message : ''}
      onChange={(event) => setPassword(event.target.value)}
      inputProps={{
        ref: register({
          required: !disabled ? 'Campo Obrigatório' : false
        }),
        'data-testid': 'passwordInput'
      }}
    />
  )
}